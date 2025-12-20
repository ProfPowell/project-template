// Import components
import '../components/msg-box/msg-box.js';
import '../components/color-picker/color-picker.js';
import '../components/current-status/current-status.js';
import '../components/debug-log/debug-log.js';
import '../components/theme-picker/theme-picker.js';
import '../components/lang-picker/lang-picker.js';
import '../components/component-card/component-card.js';

// Remove i18n import and all related logic

// Initialize any global event listeners or app-level functionality
document.addEventListener('DOMContentLoaded', () => {
    // Check for stored preferences and apply them
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
        document.documentElement.dataset.theme = storedTheme;
    }

    const storedLang = localStorage.getItem('lang');
    if (storedLang) {
        document.documentElement.lang = storedLang;
    }

    // Log application startup
    const startupEvent = new CustomEvent('app-log', {
        detail: {
            type: 'info',
            message: 'Application initialized'
        }
    });
    window.dispatchEvent(startupEvent);
}); 
