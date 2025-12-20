import { template } from './color-picker-template.js';
import { styles } from './color-picker-styles.js';
import { translations } from './color-picker-i18n.js';

/**
 * @class ColorPicker
 * @extends HTMLElement
 * @description A component that allows users to select text colors
 * @fires color-picker-update - Fired when color selection changes
 * @fires debug-log - Emits debug information about component actions
 */
class ColorPicker extends HTMLElement {
    static get observedAttributes() {
        return ['lang'];
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

        this.select = this.shadowRoot.querySelector('select');
        this.select.addEventListener('change', this.handleColorChange.bind(this));

        this.logDebug('render', 'Component rendered', {
            currentLang: this.lang,
            availableColors: Object.keys(this.translations.colors)
        });
    }

    connectedCallback() {
        this.render();
        
        document.addEventListener('current-status-color', this.updateColor.bind(this));
        
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
        document.removeEventListener('current-status-color', this.updateColor.bind(this));
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

    handleColorChange(e) {
        const oldColor = this.select.value;
        const newColor = e.target.value;
        
        this.logDebug('color-change', 'Color changed by user', {
            from: oldColor,
            to: newColor
        });

        this.dispatchEvent(new CustomEvent('color-picker-update', {
            detail: { color: newColor },
            bubbles: true,
            composed: true
        }));
    }

    updateColor(e) {
        if (e.detail.value) {
            const oldColor = this.select.value;
            const newColor = e.detail.value;
            
            this.select.value = newColor;
            
            this.logDebug('color-sync', 'Color synced from status', {
                from: oldColor,
                to: newColor
            });
        }
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
                source: 'color-picker',
                type,
                message,
                data
            }
        }));
    }
}

customElements.define('color-picker', ColorPicker); 
