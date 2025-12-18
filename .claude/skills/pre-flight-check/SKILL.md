---
name: pre-flight-check
description: Validate intent before writing code. Use this skill to verify you have the right approach, check for common issues, and match patterns before creating or editing files.
allowed-tools: Read, Glob, Grep
---

# Pre-Flight Check Skill

Before writing code, run through these checklists to validate your approach and catch potential issues early.

## When to Use This Skill

Activate pre-flight checks when:
- Creating a new file
- Making significant edits to existing code
- Implementing a new feature
- Uncertain about the right approach

## Quick Decision Tree

```
What are you creating?
│
├─ HTML page/component
│  └─ Use: HTML Pre-Flight Checklist
│     └─ Check: xhtml-author, accessibility-checker, metadata skills
│
├─ CSS file
│  └─ Use: CSS Pre-Flight Checklist
│     └─ Check: css-architecture, design-tokens skills
│
├─ JavaScript file
│  └─ Use: JavaScript Pre-Flight Checklist
│     └─ Check: javascript-author skill
│
├─ Form
│  └─ Use: Forms Pre-Flight Checklist
│     └─ Check: forms skill
│
└─ Image addition
   └─ Use: Images Pre-Flight Checklist
      └─ Check: responsive-images skill
```

---

## HTML Pre-Flight Checklist

Before writing HTML, verify:

### Structure
- [ ] What page type is this? (homepage, article, product, contact, etc.)
- [ ] What semantic landmark elements are needed? (`<header>`, `<nav>`, `<main>`, `<aside>`, `<footer>`)
- [ ] Is there existing content to preserve or migrate?
- [ ] What heading hierarchy makes sense? (single `<h1>`, logical `<h2>`-`<h6>`)

### Patterns to Consider
- [ ] Does this match an existing pattern in `examples/`?
- [ ] Are there custom elements in `elements.json` that apply?
- [ ] Should this use a documented page pattern from the `patterns` skill?

### Metadata
- [ ] What metadata profile applies? (default, article, product, etc.)
- [ ] Is Open Graph data needed for social sharing?
- [ ] What canonical URL should be used?

### Accessibility
- [ ] Will all interactive elements be keyboard accessible?
- [ ] Are proper ARIA labels planned for navigation regions?
- [ ] Will images have meaningful alt text?

### Potential Issues
| Issue | Check For |
|-------|-----------|
| Multiple `<h1>` | Only one per page allowed |
| Missing landmarks | Every page needs `<main>` |
| Div soup | Use semantic elements instead |
| Inline styles | Will fail validation |
| Missing lang | `<html lang="...">` required |

---

## CSS Pre-Flight Checklist

Before writing CSS, verify:

### Architecture
- [ ] Which layer does this belong to? (`base`, `components`, `utilities`, `overrides`)
- [ ] Does a token already exist for this value in `_tokens.css`?
- [ ] Is this component-scoped, section-scoped, or page-scoped?

### Patterns to Consider
- [ ] Can this use existing custom properties?
- [ ] Should this use native nesting (max depth 3)?
- [ ] Would `:has()` enable CSS-only interactivity?
- [ ] Are there existing patterns in `demo-site/styles/`?

### Selectors
- [ ] Using element or attribute selectors? (preferred over classes)
- [ ] Using `data-*` attributes for state? (not classes)
- [ ] Avoiding overly specific selectors?

### Potential Issues
| Issue | Check For |
|-------|-----------|
| Nesting > 3 levels | Will trigger stylelint warning |
| Magic numbers | Use tokens for spacing, colors |
| Class-based state | Use `data-*` attributes |
| Missing layer | CSS should use `@layer` |
| Duplicate properties | Same property twice in block |

---

## JavaScript Pre-Flight Checklist

Before writing JavaScript, verify:

### Architecture
- [ ] Is JavaScript actually needed? (CSS-only alternatives?)
- [ ] Is this a Web Component? (needs Shadow DOM, lifecycle methods)
- [ ] What's the functional core? (pure getters, computed values)
- [ ] What's the imperative shell? (DOM updates, event handlers)

### File Structure
- [ ] Does this need separate template/styles/i18n files?
- [ ] Where should this file live? (`demo-code/components/`, `scripts/`)
- [ ] What should be exported? (named exports only)

### Patterns to Consider
- [ ] Language fallback chain pattern for i18n?
- [ ] CustomEvent for component communication?
- [ ] MutationObserver for lang changes?
- [ ] Cleanup in `disconnectedCallback`?

### Potential Issues
| Issue | Check For |
|-------|-----------|
| `var` usage | Use `const` or `let` |
| Default exports | Use named exports only |
| Missing cleanup | Memory leaks from listeners |
| No JSDoc | Document classes and public methods |
| Complexity > 10 | Refactor into smaller functions |

---

## Forms Pre-Flight Checklist

Before building forms, verify:

### Structure
- [ ] Using `<form-field>` custom element pattern?
- [ ] Is there a submit action and method defined?
- [ ] What validation is needed? (HTML5 attributes vs custom)

### Accessibility
- [ ] Every input has a `<label>` with matching `for`/`id`?
- [ ] Error messages have `<output>` containers?
- [ ] Required fields marked with `required` attribute?
- [ ] Field descriptions linked via `aria-describedby`?

### Patterns to Consider
- [ ] `<output>` for real-time validation feedback?
- [ ] `autocomplete` attributes for user convenience?
- [ ] `inputmode` for mobile keyboards?

### Potential Issues
| Issue | Check For |
|-------|-----------|
| Unlabeled inputs | Major accessibility violation |
| Missing autocomplete | Hurts user experience |
| No error containers | Where will errors display? |
| Hidden labels | Use `.visually-hidden`, not `display: none` |

---

## Images Pre-Flight Checklist

Before adding images, verify:

### Files
- [ ] Do WebP and AVIF alternatives exist?
- [ ] Is the file under 200KB?
- [ ] Are multiple sizes available for srcset?

### HTML Attributes
- [ ] `alt` attribute with meaningful description?
- [ ] `loading="lazy"` for below-fold images?
- [ ] `decoding="async"` for non-critical images?
- [ ] `width` and `height` for layout stability?

### Patterns to Consider
- [ ] Should this use `<picture>` for art direction?
- [ ] What `sizes` attribute values are needed?
- [ ] Should this be a `<figure>` with `<figcaption>`?

### Potential Issues
| Issue | Check For |
|-------|-----------|
| Missing alt | Accessibility violation |
| No modern formats | Large file sizes |
| Missing dimensions | Layout shift |
| No lazy loading | Performance impact |

---

## Pattern Matching Guide

When the user says... suggest this pattern:

| User Intent | Suggested Pattern/Skill |
|-------------|------------------------|
| "add a page" | `patterns` skill, page templates |
| "create a form" | `forms` skill, `<form-field>` pattern |
| "add navigation" | `<nav>` with `aria-label` |
| "make it accessible" | `accessibility-checker` skill |
| "add an image" | `responsive-images` skill, `<picture>` |
| "style this" | `css-architecture` skill, layers |
| "add interactivity" | First check `progressive-enhancement` for CSS-only |
| "create a component" | `javascript-author` skill, Web Component |
| "add metadata" | `metadata` skill, profiles |
| "add dark mode" | `design-tokens` skill, color-scheme |

---

## Red Flags to Watch For

Stop and reconsider if you notice:

1. **"Just add a div"** - There's almost always a semantic element
2. **"Add a class for state"** - Use `data-*` attributes instead
3. **"Quick inline style"** - Will fail validation
4. **"Just copy this code"** - Check if a pattern/skill exists first
5. **"Add JavaScript for..."** - Check if CSS can do it first
6. **"Skip the alt text"** - Never acceptable
7. **"We'll fix it later"** - Validation catches issues now

---

## Verification Commands

After writing, verify with:

```bash
# HTML validation
npm run lint

# CSS validation
npm run lint:css

# JavaScript validation
npm run lint:js

# Accessibility check
npm run a11y

# Full validation
npm run lint:all
```
