import { styles } from './theme-picker-styles.js';
import { template } from './theme-picker-template.js';
import { translations } from './theme-picker-i18n.js';

/**
 * @class ThemePicker
 * @extends HTMLElement
 * @description A component that allows users to switch between different themes using Open Props tokens
 * @fires theme-changed - Fired when theme selection changes
 * @fires debug-log - Emits debug information about component actions
 */
class ThemePicker extends HTMLElement {
    /**
     * @static
     * @returns {string[]} List of attributes to observe for changes
     */
    static get observedAttributes() {
        return ['lang'];
    }

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        
        // Initialize system preference tracking
        this.systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)');
        this.systemPrefersDark.addEventListener('change', this.handleSystemPreference.bind(this));
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

    /**
     * @readonly
     * @returns {Object} The translation strings for the current language
     */
    get translations() {
        return translations[this.lang] || translations.en;
    }

    /**
     * @readonly
     * @returns {string} The current theme
     */
    get currentTheme() {
        return localStorage.getItem('preferred-theme') || 
               (this.systemPrefersDark.matches ? 'dark' : 'light');
    }

    /**
     * @private
     * @description Handles system color scheme preference changes
     * @param {MediaQueryListEvent} e - The change event
     */
    handleSystemPreference(e) {
        // Only update if user hasn't set a preference
        if (!localStorage.getItem('preferred-theme')) {
            const newTheme = e.matches ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', newTheme);
            
            // Update select element if it exists
            const select = this.shadowRoot?.querySelector('select');
            if (select) select.value = newTheme;

            this.logDebug('system-theme-change', 'System theme preference changed', {
                isDark: e.matches,
                newTheme
            });
        }
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

        const select = this.shadowRoot.querySelector('select');
        select.value = this.currentTheme;
        select.addEventListener('change', this.handleThemeChange.bind(this));

        // Log initial render
        this.logDebug('render', 'Component rendered', {
            currentTheme: this.currentTheme,
            currentLang: this.lang
        });
    }

    /**
     * @description Lifecycle callback when element is added to DOM
     */
    connectedCallback() {
        // Set initial theme
        const initialTheme = this.currentTheme;
        document.documentElement.setAttribute('data-theme', initialTheme);
        
        this.render();
        
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

        this.logDebug('connected', 'Component connected to DOM', {
            initialTheme,
            systemPreference: this.systemPrefersDark.matches ? 'dark' : 'light',
            storedPreference: localStorage.getItem('preferred-theme')
        });
    }

    /**
     * @description Lifecycle callback when element is removed from DOM
     */
    disconnectedCallback() {
        this.langObserver.disconnect();
        this.systemPrefersDark.removeEventListener('change', this.handleSystemPreference);
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
     * @param {Event} e - The change event from the select element
     * @fires theme-changed
     */
    handleThemeChange(e) {
        const oldTheme = this.currentTheme;
        const newTheme = e.target.value;
        
        // Store user preference
        localStorage.setItem('preferred-theme', newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
        
        this.dispatchEvent(new CustomEvent('theme-changed', {
            detail: { 
                theme: newTheme,
                source: 'user-selection',
                previousTheme: oldTheme
            },
            bubbles: true,
            composed: true
        }));

        this.logDebug('theme-change', 'Theme changed by user', {
            from: oldTheme,
            to: newTheme,
            stored: true
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
                source: 'theme-picker',
                type,
                message,
                data
            }
        }));
    }
}

customElements.define('theme-picker', ThemePicker); 
