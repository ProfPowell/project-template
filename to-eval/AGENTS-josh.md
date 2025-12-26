---
applyTo: '**'
---

Never create "overview/comprehensive documentation". Only edit existing README's/documentation if appropriate. (If documentation is lacking and it seems "not appropriate", ask, as we probably want to add it.)

## General Structure

- assets
  - img
  - css
  - js
  - components
    - foo-option-1
      - foo.js
      - foo.css
    - bar-option-2
      - bar.php

## HTML Coding Standards

### Architecture & Organization
- Use component-based architecture with components loaded via PHP's render function
- Keep HTML components modular and reusable
- Organize components in their own directories with associated CSS and JavaScript files
- Use PHP variables and functions to generate dynamic content rather than extensive inline JavaScript
- Structure HTML to work without JavaScript first (progressive enhancement)

### Semantic Elements & Accessibility
- Use semantic HTML elements for their intended purpose (`section`, `nav`, `main`, etc.)
- Include proper ARIA attributes on all interactive and dynamic elements
- Add descriptive `aria-label` attributes to elements that need additional context
- Ensure all form elements have associated labels
- Use `hidden` attribute instead of CSS `display: none` when appropriate
- Add `role` attributes to clarify element purpose when needed

### Custom Elements
- Use custom elements with descriptive, hyphenated names: `pint-slider`, `pint-content-width`, etc.
- Ensure custom elements have appropriate ARIA attributes and roles
- Create custom elements that work with keyboard navigation
- Use attributes on custom elements to define variations rather than creating new elements
- Ensure custom elements maintain semantic meaning through proper ARIA roles

### Images & Media
- Use `picture` element with multiple `source` elements for responsive images
- Include modern image formats (AVIF, WebP) with appropriate fallbacks
- Set explicit width and height attributes on images to prevent layout shifts
- Add descriptive alt text to all images
- Use `loading="lazy"` for below-the-fold images

### Data Attributes
- Use data attributes for component variants: `data-type="page-intro"`
- Use data attributes for JavaScript hooks prefixed with a namespace: `data-jsref="btn-submit"`
- Prefer data attributes over classes for JavaScript selections
- Use consistent naming patterns for data attributes across similar components
- Add analytics-specific attributes with a dedicated prefix: `data-gtm="btn-contact"`

### Forms
- Use appropriate input types with validation attributes (`required`, `pattern`, etc.)
- Include helpful placeholder text that doesn't replace labels
- Group related form fields with `fieldset` elements
- Use appropriate error handling and validation feedback
- Include accessible form validation messages

### Best Practices
- Nest heading levels properly without skipping (h1 → h2 → h3)
- Keep inline JavaScript to a minimum, preferring external files
- Use HTML comments for developer documentation when needed
- Include empty alt attributes for decorative images (`alt=""`)
- Use unique `id` attributes that follow a consistent naming pattern

## JavaScript DOM Manipulation Standards

### HTML Injection
- Use `insertAdjacentHTML()` as the preferred method for HTML injection
- Store HTML fragments in template literals (backticks) for better readability
- Choose appropriate insertion positions ('beforebegin', 'afterbegin', 'beforeend', 'afterend') based on semantic structure
- Validate and sanitize any user-provided content before insertion into the DOM

### Element Creation and Management
- Use descriptive variable names for dynamically created elements
- Check if elements exist before manipulating them using optional chaining (`?.`)
- Store references to frequently accessed DOM elements to avoid repeated queries
- Remove event listeners before removing elements from the DOM

### Progressive Enhancement
- Ensure basic functionality works without JavaScript when possible
- Add ARIA attributes to dynamically created interactive elements
- Add appropriate keyboard event handlers for all dynamically created interactive elements
- Ensure proper focus management when adding or removing elements

### State Management
- Use attributes instead of classes to reflect component states
- Follow a consistent naming pattern for custom attributes (e.g., `data-io-inview`)
- Store state in attributes rather than in JavaScript variables when possible for better debugging
- Use attributes with empty values (present/absent pattern) for boolean states

## JavaScript Coding Standards

### Architecture & Organization
- Organize JavaScript files by component, mirroring the component directory structure
- Use ES modules with clear exports for shared functionality
- Keep JavaScript files self-contained and focused on a single responsibility
- Implement progressive enhancement to ensure functionality works without JavaScript
- Structure code with initialized variables at the top, init functions in the middle, and helper functions at the bottom

### Documentation & Comments
- Include a JSDoc comment block at the top of each file explaining its purpose
- Document all functions with JSDoc comments, including parameters and return values
- Add explanatory comments for complex logic or accessibility considerations
- Use clear section comments to separate code sections (INIT, EVENT METHODS, HELPER METHODS, etc.)
- Include inline "Note:" comments to explain edge cases or implementation details

### Variables & Naming
- Use camelCase for variable and function names
- Use descriptive variable names that indicate purpose, not just type
- Define configuration variables at the top of the file
- Use `const` and `let` appropriately; avoid `var`
- Use meaningful, semantic names for functions and custom elements

### DOM Interaction
- Use `querySelector` and `querySelectorAll` for DOM selection
- Check if elements exist before interacting with them
- Store frequently accessed DOM elements as variables at the top of the file
- Use data attributes for JavaScript hooks, prefixed with appropriate namespaces
- Get computed CSS values when needed using `getComputedStyle()`

### Event Handling
- Use descriptive named functions for event handlers
- Delegate event listeners to parent elements when appropriate
- Organize event handlers in a separate section from helper functions
- Add proper cleanup by removing event listeners when components are destroyed
- Handle both mouse and keyboard interactions for all interactive elements

### Accessibility
- Ensure all interactive elements have appropriate ARIA attributes
- Set `tabindex` appropriately to create logical keyboard navigation flow
- Handle Escape key to close modals, dropdowns, and expanded content
- Focus management: return focus to trigger elements when closing expanded content
- Support both mouse and keyboard navigation patterns for interactive components

### Custom Elements
- Use descriptive, hyphenated names for custom elements: `pint-slider`, `pint-nav`, etc.
- Add or remove attributes to reflect component states instead of toggling classes
- Use custom attribute names that clearly indicate purpose: `data-io-inview`, `data-card-grid`
- Export component initialization methods to allow importing in other modules
- Ensure custom elements have appropriate styling fallbacks when JavaScript is disabled

### Best Practices
- Always check if elements exist before manipulating them
- Use feature detection before using modern browser APIs
- Implement accessible patterns for complex UI components
- Handle browser variations (Safari detection, reduced motion preferences, etc.)
- Add explicit `init()` functions for initialization that can be imported/exported

## CSS Coding Standards

### Architecture & Organization
- Use the `@layer` system to organize CSS code by priority and purpose
- Create separate CSS files for each component in the component's directory
- Keep component CSS self-contained within its own layer
- Always include print styles for components when appropriate
- Use media queries for responsive design and `prefers-color-scheme` for dark mode

### Variables & Custom Properties
- Use the `--theme-` prefix for all global design tokens
- Define component-specific variables at the top of the component's CSS file
- Use the `@property` rule for custom properties that need animations or transitions
- Include both oklch color format and hex color comments: `--theme-black: oklch(23.82% 0.014 196.24); /* #172121 */`
- Define dark mode value overrides within the `@media (prefers-color-scheme: dark)` query

### Responsive Design
- Use `clamp()` for fluid typography and spacing values
- Implement container queries using `@container` for component-specific responsive behavior
- Define breakpoints using em units in container queries: `@container main (min-width: 48rem)`
- Use viewport units (svw, svh) appropriately for viewport-specific measurements
- Define responsive variables using `clamp()` and calc() with viewport-relative calculations

### Naming Conventions
- We use TAC CSS, "Tags, Attributes, Classes" for naming conventions and cascade priority
- Organize CSS using @layer with TAC hierarchy: tags (highest priority), attributes (medium), classes (lowest)
- Prefer element selectors (tags) for base styling, attributes for state/variants, classes for layout exceptions
- Use kebab-case for all CSS class names and custom properties
- Use data attributes for component variants: `[data-card-grid="blog"]`
- Follow the structure: `--theme-[category]-[property]-[variant]` for variable naming
- Use descriptive class names based on purpose rather than appearance
- Use logical properties (block/inline) instead of physical properties (top/bottom/left/right)

### Custom Elements
- Use custom elements with descriptive, hyphenated names: `pint-content-width`, `pint-grid`, etc.
- Style custom elements using the element selector directly rather than classes when possible
- Use the `display: block` property for custom elements that need to behave as block-level elements
- Define appropriate default styles for custom elements in the base layer

### Best Practices
- Use CSS comments to document sections and complex calculations
- Use `text-wrap: balance` for better typography in headings
- Include appropriate focus styles for all interactive elements using `:focus-visible`
- Use `content-visibility: auto` with `contain-intrinsic-height` for performance optimization
- Always use logical properties (margin-block, padding-inline) instead of physical properties

## PHP Coding Standards

### Architecture & Organization
- Use component-based architecture with each component in its own directory
- Organize components by functional area (base, content, etc.) with separate PHP, CSS, and JS files
- Use the render() function to include component files: `<?php render('/components/path/component.php'); ?>`
- Keep PHP files small, focused, and modular with a single responsibility
- Follow the pattern of configuration/state variables at the top, main content in the middle, helper functions at the bottom

### Component Structure
- Components should load their own CSS: `<?php render('/components/content/component/component.css'); ?>`
- Use semantic HTML within component files with accessibility attributes
- Add appropriate PHP comments for complex logic or regex patterns
- Include CSS and JS in the same directory as the component PHP file
- Create reusable functions for commonly used features like icons

### Variables & Functions
- Use descriptive variable names in camelCase: `$pageTitle`, `$fieldName`, `$userComment`
- Define global variables in config.php and access them with the global keyword
- Use function parameters with default values when appropriate: `function icon($type = '')`
- Document functions with PHPDoc style comments including description, parameters, and return values
- Return early from functions when possible rather than deeply nesting conditions

### Security & Data Handling
- Always sanitize user input before processing or storing
- Set explicit content types and character encoding in HTTP headers
- Use prepared statements for database queries to prevent SQL injection
- Remove PHP version info from headers using `header_remove('X-Powered-By')`
- Store sensitive configuration details outside web root or in environment variables

### Error Handling
- Set appropriate error reporting levels based on environment
- Use try/catch blocks for operations that might fail
- Provide user-friendly error messages while logging detailed errors for developers
- Check if files or directories exist before trying to access them
- Validate form input on the server side even when validated on the client

### Output & Templates
- Use short echo syntax `<?= $variable ?>` for simple output
- Use regular PHP tags `<?php ?>` for logic and control structures
- Escape output with appropriate functions to prevent XSS: `htmlspecialchars()`, `urlencode()`
- Separate business logic from presentation where possible
- Use consistent indentation and formatting in mixed HTML/PHP files

### PHP in HTML Context
- Keep inline PHP logic minimal and readable
- Prefer PHP functions or variables over complex inline expressions
- Use alternative syntax for control structures in templates: `<?php if(): ?>...<?php endif; ?>`
- Format multi-line PHP blocks with consistent indentation relative to the HTML
- Add clear comments for closing PHP blocks in complex templates: `<?php // end foreach users ?>`

### Performance Considerations
- Minimize database queries and cache results when possible
- Use output buffering when building complex content before display
- Implement appropriate caching strategies for static content
- Minify CSS and JavaScript for production using built-in helper functions
- Optimize resource loading and rendering for critical content

### Best Practices
- Follow PSR-12 coding style for PHP files
- Maintain backward compatibility with supported PHP versions
- Use strict comparison operators (`===`, `!==`) when comparing values
- Organize global functions into namespaced classes when appropriate
- Include clear comments for complex logic, regular expressions, or workarounds