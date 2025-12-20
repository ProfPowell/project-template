import { template } from './debug-log-template.js';
import { styles } from './debug-log-styles.js';
import { translations } from './debug-log-i18n.js';

/**
 * @class DebugLog
 * @extends HTMLElement
 * @description A component that logs debug events from other components
 * @listens debug-log - Generic debug event that all components can emit
 */
class DebugLog extends HTMLElement {
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

        this.logArea = this.shadowRoot.querySelector('textarea');
    }

    connectedCallback() {
        this.render();
        
        // Listen for debug events
        document.addEventListener('debug-log', this.logEvent.bind(this));

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
    }

    disconnectedCallback() {
        document.removeEventListener('debug-log', this.logEvent.bind(this));
        this.langObserver.disconnect();
    }

    handleLangChange() {
        this.render();
    }

    /**
     * @private
     * @param {CustomEvent} e - The debug event to log
     */
    logEvent(e) {
        const timestamp = new Date().toISOString();
        const source = e.detail.source || 'unknown';
        const type = e.detail.type || 'info';
        const message = e.detail.message || '';
        const data = e.detail.data ? `\n${JSON.stringify(e.detail.data, null, 2)}` : '';
        
        const logEntry = `[${timestamp}] ${source} (${type}): ${message}${data}\n\n`;
        this.logArea.value = logEntry + this.logArea.value;
    }
}

customElements.define('debug-log', DebugLog); 
