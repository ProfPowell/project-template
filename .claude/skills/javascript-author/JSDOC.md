# JSDoc Documentation Guide

## Class Documentation

```javascript
/**
 * @class ComponentName
 * @extends HTMLElement
 * @description A component that handles user preferences and displays settings
 * @fires settings-change - Fired when user changes a setting
 * @fires debug-log - Emits debug information for logging
 *
 * @example
 * <settings-panel lang="en"></settings-panel>
 */
class ComponentName extends HTMLElement {
```

## Method Documentation

### Public Methods

```javascript
/**
 * Updates the component's displayed value
 * @param {string} value - The new value to display
 * @returns {void}
 */
setValue(value) {
    this.setAttribute('value', value);
}
```

### Private Methods

```javascript
/**
 * @private
 * Internal handler for click events
 * @param {MouseEvent} event - The click event
 */
handleClick(event) {
    event.preventDefault();
    this.processClick();
}
```

### Async Methods

```javascript
/**
 * Fetches data from the API
 * @async
 * @param {string} endpoint - The API endpoint
 * @returns {Promise<Object>} The fetched data
 * @throws {Error} If the fetch fails
 */
async fetchData(endpoint) {
    const response = await fetch(endpoint);
    if (!response.ok) {
        throw new Error(`Fetch failed: ${response.status}`);
    }
    return response.json();
}
```

## Getter Documentation

```javascript
/**
 * @readonly
 * @returns {string} The current language code from attribute, ancestor, or document
 */
get lang() {
    return this.getAttribute('lang') ||
           this.closest('[lang]')?.getAttribute('lang') ||
           document.documentElement.lang ||
           'en';
}
```

## Setter Documentation

```javascript
/**
 * @param {string} value - The message to display
 */
set message(value) {
    this.setAttribute('message', value);
}
```

## Static Methods

```javascript
/**
 * @static
 * @returns {string[]} List of attributes that trigger attributeChangedCallback
 */
static get observedAttributes() {
    return ['lang', 'value', 'disabled'];
}
```

## Type Annotations

| Type | Syntax | Example |
|------|--------|---------|
| String | `{string}` | `@param {string} name` |
| Number | `{number}` | `@param {number} count` |
| Boolean | `{boolean}` | `@param {boolean} enabled` |
| Object | `{Object}` | `@param {Object} options` |
| Array of strings | `{string[]}` | `@param {string[]} items` |
| Array of objects | `{Object[]}` | `@param {Object[]} users` |
| Custom Event | `{CustomEvent}` | `@param {CustomEvent} event` |
| HTML Element | `{HTMLElement}` | `@param {HTMLElement} element` |
| Specific Element | `{HTMLInputElement}` | `@param {HTMLInputElement} input` |
| Optional | `{string} [name]` | `@param {string} [name]` |
| With Default | `{string} [name='default']` | `@param {string} [name='guest']` |
| Nullable | `{?string}` | `@param {?string} nickname` |
| Union Type | `{string\|number}` | `@param {string\|number} id` |

## Event Documentation

Document custom events fired by the component:

```javascript
/**
 * @fires component-update
 * @type {CustomEvent}
 * @property {Object} detail - Event detail object
 * @property {string} detail.value - The updated value
 * @property {string} detail.previousValue - The previous value
 * @property {string} detail.source - Source of the update ('user' or 'api')
 */
```

## Callback Documentation

```javascript
/**
 * @callback FilterCallback
 * @param {Object} item - The item to filter
 * @param {number} index - The item's index
 * @returns {boolean} True if item should be included
 */

/**
 * Filters items using the provided callback
 * @param {FilterCallback} callback - The filter function
 * @returns {Object[]} Filtered items
 */
filterItems(callback) {
    return this.items.filter(callback);
}
```

## Common Tags Reference

| Tag | Purpose |
|-----|---------|
| `@class` | Class declaration |
| `@extends` | Parent class |
| `@description` | Detailed explanation |
| `@fires` | Events the component dispatches |
| `@param` | Function/method parameter |
| `@returns` | Return value |
| `@private` | Internal use only |
| `@readonly` | Getter property |
| `@static` | Static method/property |
| `@async` | Async function |
| `@throws` | Exceptions thrown |
| `@example` | Usage example |
| `@see` | Related documentation |
| `@deprecated` | Marked for removal |
