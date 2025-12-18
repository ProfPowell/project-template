import { template } from './component-card-template.js';
import { styles } from './component-card-styles.js';
import { translations } from './component-card-i18n.js';

/**
 * @typedef {Object} ComponentCardProps
 * @property {string} title - The title for the card
 * @property {string} [icon] - Optional icon for the card
 */

/**
 * A card component that displays a title and content
 * @element component-card
 * 
 * @attr {string} type - The card type, used as the localization key
 * @attr {string} lang - Optional language code (inherits from parent if not set)
 * 
 * @slot - The main content of the card
 */
export class ComponentCard extends HTMLElement {
    static get observedAttributes() {
        return ['type', 'lang'];
    }

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.handleLangChange = this.handleLangChange.bind(this);
    }

    /**
     * @readonly
     * @returns {string} The current language code for the component
     */
    get lang() {
        return this.getAttribute('lang') || 
               this.closest('[lang]')?.getAttribute('lang') ||
               document.documentElement.lang ||
               'en';
    }

    connectedCallback() {
        this.render();
        // Listen for language changes for accessibility
        document.addEventListener('langchange', this.handleLangChange);
    }

    disconnectedCallback() {
        document.removeEventListener('langchange', this.handleLangChange);
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            this.render();
        }
    }

    handleLangChange() {
        this.render();
    }

    getCardStrings() {
        const type = this.getAttribute('type') || '';
        const lang = this.lang;
        const langTable = translations[lang] || translations['en'] || {};
        return langTable[type] || { title: '', icon: '' };
    }

    render() {
        const { title, icon } = this.getCardStrings();
        this.shadowRoot.innerHTML = `
            <style>
                ${styles}
            </style>
            ${template({ title, icon })}
        `;
    }
}

customElements.define('component-card', ComponentCard); 
