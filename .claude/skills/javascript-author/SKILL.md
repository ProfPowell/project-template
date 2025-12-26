---
name: javascript-author
description: Write vanilla JavaScript for Web Components with functional core, imperative shell. Use when creating JavaScript files, building interactive components, or writing any client-side code.
allowed-tools: Read, Write, Edit, Glob, Grep
---

# JavaScript Authoring Skill

Write modern vanilla JavaScript following functional core with imperative shell architecture.

## Core Principles

| Principle | Description |
|-----------|-------------|
| Functional Core | Pure functions, getters, computed values - no side effects |
| Imperative Shell | DOM manipulation, event handlers, side effects in lifecycle hooks |
| Dependency Injection | Import templates, styles, i18n from separate files |
| Named Exports Only | No default exports - explicit named exports |
| JSDoc Documentation | Document classes, public methods, and events |

## File Structure Pattern

```
components/
└── my-component/
    ├── my-component.js           # Main component class
    ├── my-component-template.js  # Template function
    ├── my-component-styles.js    # CSS-in-JS styles
    └── my-component-i18n.js      # Translations object
```

## Web Component Template

```javascript
import { template } from './my-component-template.js';
import { styles } from './my-component-styles.js';
import { translations } from './my-component-i18n.js';

/**
 * @class MyComponent
 * @extends HTMLElement
 * @description Brief description of component purpose
 * @fires my-component-update - Fired when state changes
 */
class MyComponent extends HTMLElement {
    static get observedAttributes() {
        return ['lang', 'value'];
    }

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    // FUNCTIONAL CORE - Pure getters
    get lang() {
        return this.getAttribute('lang') ||
               this.closest('[lang]')?.getAttribute('lang') ||
               document.documentElement.lang ||
               'en';
    }

    get translations() {
        return translations[this.lang] || translations.en;
    }

    // IMPERATIVE SHELL - Side effects
    render() {
        this.shadowRoot.innerHTML = `
            <style>${styles}</style>
            ${template(this.translations)}
        `;
    }

    connectedCallback() {
        this.render();
        // Set up observers and listeners
    }

    disconnectedCallback() {
        // Clean up observers and listeners - REQUIRED
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            this.render();
        }
    }
}

customElements.define('my-component', MyComponent);

export { MyComponent };
```

## Quick Reference

### ESLint Rules Enforced

| Rule | Requirement |
|------|-------------|
| `no-var` | Use `const` or `let` only |
| `prefer-const` | Use `const` when variable is never reassigned |
| `prefer-template` | Use template literals for string concatenation |
| `eqeqeq` | Use `===` and `!==` only |
| `camelcase` | Use camelCase for variables and functions |
| `object-shorthand` | Use `{ foo }` not `{ foo: foo }` |
| Named exports | No default exports |

### Naming Conventions

| Context | Convention | Example |
|---------|------------|---------|
| Variables/Functions | camelCase | `handleClick`, `userName` |
| Classes | PascalCase | `MyComponent`, `UserService` |
| Custom Elements | kebab-case | `<my-component>`, `<user-card>` |
| Events | kebab-case | `'user-updated'`, `'form-submit'` |
| CSS Classes | kebab-case | `.card-header`, `.nav-item` |

## Related Documentation

- [WEB-COMPONENTS.md](WEB-COMPONENTS.md) - Lifecycle and Shadow DOM
- [JSDOC.md](JSDOC.md) - Documentation patterns
- [I18N.md](I18N.md) - Internationalization
- [EVENTS.md](EVENTS.md) - Event handling
- [ACCESSIBILITY.md](ACCESSIBILITY.md) - a11y in JavaScript
- [DEFENSIVE.md](DEFENSIVE.md) - Type guards, error handling, feature detection

## Related Skills

- **typescript-author** - Write TypeScript for Web Components and Node.js with stri...
- **custom-elements** - Define and use custom HTML elements
- **unit-testing** - Write unit tests for JavaScript files using Node.js nativ...
- **api-client** - Fetch API patterns with error handling, retry logic, and ...
