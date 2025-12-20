import { template } from './current-status-template.js';
import { styles } from './current-status-styles.js';
import { translations } from './current-status-i18n.js';

/**
 * @class CurrentStatus
 * @extends HTMLElement
 * @description Displays and manages the current status message and color
 * @fires current-status-message - When message attribute changes
 * @fires current-status-color - When color attribute changes
 * @fires debug-log - Emits debug information about component actions
 */
class CurrentStatus extends HTMLElement {
    static get observedAttributes() {
        return ['message', 'color', 'lang'];
    }

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    get lang() {
        return this.getAttribute('lang') || 
               this.closest('[lang]')?.getAttribute('lang') ||
               document.documentElement.lang ||
               'en';
    }

    get translations() {
        return translations[this.lang] || translations.en;
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                ${styles}
            </style>
            ${template(this.translations)}
        `;

        this.statusElement = this.shadowRoot.querySelector('.status');
        this.updateStatus();

        this.logDebug('render', 'Component rendered', {
            currentLang: this.lang,
            message: this.getAttribute('message'),
            color: this.getAttribute('color')
        });
    }

    updateStatus() {
        if (this.statusElement) {
            const message = this.getAttribute('message') || '';
            const color = this.getAttribute('color');
            
            this.statusElement.textContent = message;
            if (color) {
                this.statusElement.style.color = color;
            }

            this.logDebug('status-update', 'Status display updated', {
                message,
                color
            });
        }
    }

    connectedCallback() {
        this.render();
        
        document.addEventListener('msg-box-update', this.handleMessageUpdate.bind(this));
        document.addEventListener('color-picker-update', this.handleColorUpdate.bind(this));

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

    disconnectedCallback() {
        document.removeEventListener('msg-box-update', this.handleMessageUpdate.bind(this));
        document.removeEventListener('color-picker-update', this.handleColorUpdate.bind(this));
        this.langObserver.disconnect();
        this.logDebug('disconnected', 'Component removed from DOM');
    }

    handleLangChange() {
        const oldLang = this.lang;
        this.render();
        this.logDebug('language-change', 'Language changed', {
            from: oldLang,
            to: this.lang
        });
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            if (name === 'message') {
                this.logDebug('message-change', 'Message attribute changed', {
                    from: oldValue,
                    to: newValue
                });

                this.dispatchEvent(new CustomEvent('current-status-message', {
                    detail: { value: newValue },
                    bubbles: true,
                    composed: true
                }));
                this.updateStatus();
            } else if (name === 'color') {
                this.logDebug('color-change', 'Color attribute changed', {
                    from: oldValue,
                    to: newValue
                });

                this.dispatchEvent(new CustomEvent('current-status-color', {
                    detail: { value: newValue },
                    bubbles: true,
                    composed: true
                }));
                this.updateStatus();
            } else if (name === 'lang') {
                this.render();
            }
        }
    }

    handleMessageUpdate(e) {
        this.logDebug('message-received', 'Message update received from msg-box', {
            message: e.detail.message
        });
        this.setAttribute('message', e.detail.message);
    }

    handleColorUpdate(e) {
        this.logDebug('color-received', 'Color update received from color-picker', {
            color: e.detail.color
        });
        this.setAttribute('color', e.detail.color);
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
                source: 'current-status',
                type,
                message,
                data
            }
        }));
    }
}

customElements.define('current-status', CurrentStatus);
