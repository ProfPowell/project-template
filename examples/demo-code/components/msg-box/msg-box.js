import { template } from './msg-box-template.js';
import { styles } from './msg-box-styles.js';
import { translations } from './msg-box-i18n.js';

/**
 * @class MsgBox
 * @extends HTMLElement
 * @description A message input component that supports internationalization
 * @fires msg-box-update - Fired when a new message is set
 * @fires debug-log - Emits debug information about component actions
 */
class MsgBox extends HTMLElement {
    /**
     * @static
     * @returns {string[]} List of attributes to observe for changes
     */
    static get observedAttributes() {
        return ['lang'];
    }

    /**
     * @constructor
     * @description Initializes the shadow DOM
     */
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    /**
     * @readonly
     * @returns {string} The current language code for the component
     * @description Gets the language from component attribute, closest ancestor, document, or defaults to 'en'
     */
    get lang() {
        return this.getAttribute('lang') || 
               this.closest('[lang]')?.getAttribute('lang') ||
               document.documentElement.lang ||
               'en';
    }

    /**
     * @readonly
     * @returns {Object} The translation strings for the current language
     * @description Gets translations for current language or falls back to English
     */
    get translations() {
        return translations[this.lang] || translations.en;
    }

    /**
     * @private
     * @description Renders the component's shadow DOM content
     */
    render() {
        this.shadowRoot.innerHTML = `
            <style>
                ${styles}
            </style>
            ${template(this.translations)}
        `;

        this.input = this.shadowRoot.querySelector('input');
        this.button = this.shadowRoot.querySelector('button');
        this.button.addEventListener('click', this.setMessage.bind(this));

        this.logDebug('render', 'Component rendered', {
            currentLang: this.lang
        });
    }

    /**
     * @description Lifecycle callback when element is added to DOM
     * Sets up event listeners and language change observers
     */
    connectedCallback() {
        this.render();
        
        document.addEventListener('current-status-message', this.updateInput.bind(this));
        
        this.langObserver = new MutationObserver(this.handleLangChange.bind(this));
        
        this.langObserver.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['lang']
        });
        
        let ancestor = this.parentElement;
        while (ancestor) {
            if (ancestor.hasAttribute('lang')) {
                this.langObserver.observe(ancestor, {
                    attributes: true,
                    attributeFilter: ['lang']
                });
            }
            ancestor = ancestor.parentElement;
        }

        this.logDebug('connected', 'Component connected to DOM');
    }

    /**
     * @description Lifecycle callback when element is removed from DOM
     * Cleans up event listeners and observers
     */
    disconnectedCallback() {
        document.removeEventListener('current-status-message', this.updateInput.bind(this));
        this.langObserver.disconnect();
        this.logDebug('disconnected', 'Component removed from DOM');
    }

    /**
     * @private
     * @description Handler for language change events
     */
    handleLangChange() {
        const oldLang = this.lang;
        this.render();
        this.logDebug('language-change', 'Language changed', {
            from: oldLang,
            to: this.lang
        });
    }

    /**
     * @private
     * @description Handles the message setting action
     * @fires msg-box-update
     */
    setMessage() {
        const message = this.input.value.trim();
        if (message) {
            this.logDebug('message-set', 'New message set by user', {
                message
            });

            this.dispatchEvent(new CustomEvent('msg-box-update', {
                detail: { message },
                bubbles: true,
                composed: true
            }));
        } else {
            this.logDebug('message-error', 'Attempted to set empty message');
        }
    }

    /**
     * @private
     * @param {CustomEvent} event - The event containing the new input value
     * @description Updates the input value when a current-status-message event is received
     */
    updateInput(e) {
        const oldValue = this.input.value;
        const newValue = e.detail.value;
        
        this.input.value = newValue;
        
        this.logDebug('input-sync', 'Input synced from status', {
            from: oldValue,
            to: newValue
        });
    }

    /**
     * @private
     * @param {string} type - The type of debug event
     * @param {string} message - The debug message
     * @param {Object} [data] - Optional data to include in the log
     */
    logDebug(type, message, data = null) {
        this.dispatchEvent(new CustomEvent('debug-log', {
            bubbles: true,
            composed: true,
            detail: {
                source: 'msg-box',
                type,
                message,
                data
            }
        }));
    }
}

customElements.define('msg-box', MsgBox);
