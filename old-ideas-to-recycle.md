# Demo-Site Analysis: Modern HTML-First Web Development

## Overview

The `demo-site/` directory contains a **progressive enhancement** demonstration site showcasing modern HTML and CSS techniques. This is a 23-page static site with **zero JavaScript** that demonstrates how far native browser capabilities have come.

**Core Philosophy:** HTML first, CSS for enhancement, JavaScript only when absolutely necessary.

---

## Architecture Summary

| Aspect | Implementation |
|--------|----------------|
| Pages | 23 total (5 main sections + blog posts + tag pages + gallery items) |
| JavaScript | None |
| CSS | Single file, 1150 lines, 5 `@layer` blocks |
| Build Tools | None required |
| Images | JPG format only |
| Interactivity | CSS checkboxes, native `<dialog>`, HTML5 form validation |

---

## Key Concepts & Approaches

### 1. HTML-First Development

Every feature starts with semantic HTML that works without CSS or JavaScript:

- **Semantic structure**: `<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<aside>`, `<footer>`
- **Native elements**: `<dialog>` for modals, `<details>` for accordions, `<time>` for dates
- **Form validation**: HTML5 attributes (`required`, `minlength`, `type="email"`) provide baseline validation
- **Accessibility built-in**: Proper heading hierarchy, `aria-*` attributes, `<label>` associations

### 2. Custom Elements (Inert/Semantic)

The site uses 13+ custom elements as **semantic wrappers** without JavaScript:

```html
<app-brand>Site Name</app-brand>
<blog-card>...</blog-card>
<form-field>...</form-field>
<tag-list><tag-topic data-topic="css">...</tag-topic></tag-list>
<table-wrapper>...</table-wrapper>
<spacer-element></spacer-element>
```

**Benefits:**
- Self-documenting markup
- CSS targeting without classes
- Validated structure (via html-validate)
- No JavaScript runtime required

### 3. CSS Layers (`@layer`)

The stylesheet uses explicit cascade layers for maintainability:

```css
@layer reset, tokens, layout, components, responsive;
```

| Layer | Purpose |
|-------|---------|
| `reset` | Universal box-sizing and margin reset |
| `tokens` | Design system variables (60+ custom properties) |
| `layout` | Body grid, view transitions |
| `components` | All UI component styles |
| `responsive` | Media query overrides |

### 4. Design Tokens (CSS Custom Properties)

Comprehensive token system covering:

```css
/* Colors */
--primary-color: #2563eb;
--background-main: white;
--text-color: #1f2937;

/* Spacing scale */
--spacing-xs: 0.25rem;
--spacing-sm: 0.5rem;
--spacing-md: 1rem;
--spacing-lg: 2rem;

/* Typography */
--font-size-base: 1rem;
--font-weight-semibold: 600;
--line-height-normal: 1.6;

/* Effects */
--shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
--transition-normal: 0.3s;
--border-radius: 0.5rem;
```

### 5. Native CSS Nesting

Modern CSS nesting reduces selector repetition:

```css
nav {
  & ul { display: flex; gap: var(--spacing-lg); }
  & a {
    &:hover { background: var(--overlay-light); }
    &.active { background: var(--overlay-strong); }
  }
}
```

### 6. Classless/Element-Focused CSS

Styles target semantic HTML elements directly:

```css
/* Instead of .header-nav { } */
header nav { }

/* Instead of .form-input { } */
form-field input { }

/* Instead of .table-container { } */
table-wrapper { }
```

Classes should be used sparingly and only for:
- Multi-variant components (`.card`, `.card-grid`)
- View transition names (when element-based naming insufficient)

**Avoid classes for state.** Use `data-*` attributes instead (see below).

### 7. Data Attributes as the HTML/CSS/JS Bridge

**`data-*` attributes are the preferred approach** for state, variants, and configuration:

```html
<!-- State management -->
<nav data-expanded="false">...</nav>
<button data-state="loading">Submit</button>
<article data-view="card">...</article>

<!-- Variants -->
<tag-topic data-topic="css">CSS</tag-topic>
<status-badge data-type="success">Active</status-badge>

<!-- Configuration -->
<gallery-grid data-columns="3" data-gap="md">...</gallery-grid>
```

**CSS targeting with data attributes:**
```css
/* State-based styling */
nav[data-expanded="true"] { max-height: 500px; }
button[data-state="loading"] { opacity: 0.6; pointer-events: none; }

/* Variant styling */
tag-topic[data-topic="css"] { background: var(--tag-css-bg); }
tag-topic[data-topic="a11y"] { background: var(--tag-a11y-bg); }

/* Configuration-driven */
gallery-grid[data-columns="2"] { grid-template-columns: repeat(2, 1fr); }
gallery-grid[data-columns="3"] { grid-template-columns: repeat(3, 1fr); }
```

**Why data-* over classes:**

| Aspect | Classes | Data Attributes |
|--------|---------|-----------------|
| Semantics | Presentation-focused | Meaning-focused |
| State | `.is-active`, `.is-loading` | `data-state="active"` |
| JS access | `classList.toggle()` | `dataset.state = "active"` |
| CSS selectors | `.btn.primary.large` | `button[data-variant="primary"][data-size="large"]` |
| Validation | Cannot validate | Can define allowed values |
| Readability | Class soup | Self-documenting |

**The bridge pattern:**
```
HTML: <element data-state="value">     → Declares state/config
CSS:  [data-state="value"] { }         → Styles based on state
JS:   element.dataset.state = "new"    → Updates state (if needed)
```

This creates a clean separation where HTML declares intent, CSS responds to it, and JavaScript (when needed) only manipulates data attributes rather than classes.

### 8. Form Field Pattern with `<output>` for Validation

The site uses a sophisticated form pattern combining custom elements with the `<output>` element for accessible validation messaging:

**The `<form-field>` Pattern:**
```html
<form-field>
  <label for="email">Email</label>
  <input type="email"
         id="email"
         name="email"
         required
         aria-describedby="email-message"/>
  <output id="email-message"
          for="email"
          aria-live="polite">
    Please enter a valid email address
  </output>
</form-field>
```

**Key Components:**

| Element | Purpose | Attributes |
|---------|---------|------------|
| `<form-field>` | Groups label, input, and message | `data-valid`, `data-invalid` for state |
| `<label>` | Accessible label | `for` matches input `id` |
| `<input>` | Form control | `required`, `minlength`, `type`, `aria-describedby` |
| `<output>` | Validation/help message | `for`, `id`, `aria-live="polite"` |

**Why `<output>` for Validation Messages:**

The `<output>` element is semantically ideal for validation messages:
- Represents the **result of a calculation or user action** (validation result)
- Has native `for` attribute to associate with input(s)
- Works naturally with `aria-live` for screen reader announcements
- Semantically distinct from static help text (`<span>`) or errors (`<div>`)

**CSS-Only Validation Styling:**
```css
/* Show/hide messages based on validation state */
form-field:has(input:user-valid) output {
  color: var(--success-color);
}

form-field:has(input:user-invalid) output {
  color: var(--error-color);
}

/* Auto-generate required indicator */
form-field:has(input:required) label::after {
  content: " *";
  color: var(--error-color);
}
```

**Complete Form Field Variants:**

```html
<!-- Text input with minlength -->
<form-field>
  <label for="name">Name</label>
  <input type="text" id="name" name="name"
         required minlength="2"
         aria-describedby="name-msg"/>
  <output id="name-msg" for="name" aria-live="polite">
    At least 2 characters required
  </output>
</form-field>

<!-- Select dropdown -->
<form-field>
  <label for="category">Category</label>
  <select id="category" name="category" required>
    <option value="" disabled>Select a category...</option>
    <option value="general">General Inquiry</option>
    <option value="support">Technical Support</option>
  </select>
</form-field>

<!-- Textarea -->
<form-field>
  <label for="message">Message</label>
  <textarea id="message" name="message"
            required minlength="10"
            aria-describedby="message-msg"></textarea>
  <output id="message-msg" for="message" aria-live="polite">
    At least 10 characters required
  </output>
</form-field>
```

### 9. CSS-Only Interactivity

**Mobile navigation** (checkbox hack with data attribute):
```html
<input type="checkbox" id="nav-toggle"/>
<label for="nav-toggle">Menu</label>
<nav data-mobile-nav>...</nav>
```
```css
nav[data-mobile-nav] { max-height: 0; overflow: hidden; }
#nav-toggle:checked ~ nav[data-mobile-nav] { max-height: 500px; }
```

**Theme switching** (`:has()` selector):
```css
:root:has(#theme-dark:checked) {
  --background-main: #1f2937;
  --text-color: #f9fafb;
}
```

**Form validation** (`:user-valid`/`:user-invalid`):
```css
input:user-valid { border-color: var(--success-color); }
input:user-invalid { border-color: var(--error-color); }
```

### 10. View Transitions API

Smooth page-to-page animations without JavaScript:

```html
<meta name="view-transition" content="same-origin"/>
```

```css
::view-transition-old(card-1) { animation: fade-out 0.3s; }
::view-transition-new(card-1) { animation: fade-in 0.3s; }
```

### 11. Progressive Enhancement Layering

```
Layer 1: HTML      → Works in any browser, screen readers, search engines
Layer 2: CSS       → Layout, theming, validation feedback, animations
Layer 3: JS (opt)  → Enhanced interactions (not used in demo-site)
```

---

## CSS File Architecture with @import

While we avoid complex build tools, CSS `@import` provides **native modularization** for organizing stylesheets at scale.

### File Organization Hierarchy

```
styles/
├── main.css                 # Entry point - imports everything
├── _reset.css               # CSS reset/normalize
├── _tokens.css              # Design tokens (custom properties)
├── _layout.css              # Site-wide layout (grid, body structure)
├── _components.css          # Shared components (buttons, cards, forms)
├── sections/
│   ├── _header.css          # Site header/nav
│   ├── _footer.css          # Site footer
│   └── _sidebar.css         # Sidebar patterns
├── pages/
│   ├── _home.css            # Homepage-specific styles
│   ├── _blog.css            # Blog listing/post styles
│   └── _contact.css         # Contact form styles
└── components/
    ├── _gallery.css         # Gallery grid component
    ├── _tag-list.css        # Tag component styles
    └── _data-table.css      # Table wrapper styles
```

### The Entry Point (`main.css`)

```css
/* Layer declaration - controls cascade order */
@layer reset, tokens, layout, sections, components, pages, responsive;

/* Reset */
@import "_reset.css" layer(reset);

/* Design system */
@import "_tokens.css" layer(tokens);

/* Site-wide layout */
@import "_layout.css" layer(layout);

/* Sections */
@import "sections/_header.css" layer(sections);
@import "sections/_footer.css" layer(sections);

/* Shared components */
@import "_components.css" layer(components);
@import "components/_gallery.css" layer(components);
@import "components/_tag-list.css" layer(components);
@import "components/_data-table.css" layer(components);

/* Page-specific */
@import "pages/_home.css" layer(pages);
@import "pages/_blog.css" layer(pages);
@import "pages/_contact.css" layer(pages);

/* Responsive overrides (last = highest priority in cascade) */
@layer responsive {
  @media (max-width: 768px) {
    /* Mobile overrides */
  }
}
```

### Scope Hierarchy

| Level | Scope | Example |
|-------|-------|---------|
| **Tokens** | Entire site | `--primary-color`, `--spacing-md` |
| **Layout** | Body structure | Grid areas, view transitions |
| **Sections** | Recurring site parts | Header, footer, sidebar |
| **Components** | Reusable blocks | Cards, buttons, forms, tables |
| **Pages** | Single page types | Homepage hero, blog post styles |

### Benefits of This Approach

1. **No build step required** - Native CSS imports work in browsers
2. **Clear organization** - Find styles by scope/purpose
3. **Cascade control** - `@layer` ensures predictable specificity
4. **Incremental loading** - Browser can cache individual files
5. **Team-friendly** - Multiple developers can work on separate files

### When to Create a New File

| Scenario | Action |
|----------|--------|
| New custom element | Add `components/_element-name.css` |
| New page type | Add `pages/_page-name.css` |
| Site-wide section | Add `sections/_section-name.css` |
| New design token category | Extend `_tokens.css` |

---

## Responsive Images (Needs Improvement)

### Current State

The site currently uses basic `<img>` elements:

```html
<img src="photo.jpg"
     alt="Description"
     loading="eager"
     decoding="async"
     fetchpriority="high"/>
```

### What's Missing

**1. Resolution switching with `srcset` and `sizes`:**
```html
<img src="photo-800.jpg"
     srcset="photo-400.jpg 400w,
             photo-800.jpg 800w,
             photo-1200.jpg 1200w"
     sizes="(max-width: 600px) 100vw,
            (max-width: 1200px) 50vw,
            800px"
     alt="Description"/>
```

**2. Art direction with `<picture>`:**
```html
<picture>
  <source media="(max-width: 600px)" srcset="photo-mobile.jpg"/>
  <source media="(max-width: 1200px)" srcset="photo-tablet.jpg"/>
  <img src="photo-desktop.jpg" alt="Description"/>
</picture>
```

**3. Modern formats with fallbacks:**
```html
<picture>
  <source srcset="photo.avif" type="image/avif"/>
  <source srcset="photo.webp" type="image/webp"/>
  <img src="photo.jpg" alt="Description" loading="lazy"/>
</picture>
```

**4. Complete responsive image pattern:**
```html
<picture>
  <!-- AVIF for modern browsers -->
  <source type="image/avif"
          srcset="photo-400.avif 400w,
                  photo-800.avif 800w,
                  photo-1200.avif 1200w"
          sizes="(max-width: 600px) 100vw, 800px"/>
  <!-- WebP fallback -->
  <source type="image/webp"
          srcset="photo-400.webp 400w,
                  photo-800.webp 800w,
                  photo-1200.webp 1200w"
          sizes="(max-width: 600px) 100vw, 800px"/>
  <!-- JPEG fallback -->
  <img src="photo-800.jpg"
       srcset="photo-400.jpg 400w,
               photo-800.jpg 800w,
               photo-1200.jpg 1200w"
       sizes="(max-width: 600px) 100vw, 800px"
       alt="Descriptive alt text"
       loading="lazy"
       decoding="async"/>
</picture>
```

### Image Sizing Strategy

| Context | `sizes` Value | Rationale |
|---------|---------------|-----------|
| Full-width hero | `100vw` | Spans viewport |
| Content image | `(max-width: 800px) 100vw, 800px` | Max content width |
| Gallery thumbnail | `(max-width: 600px) 50vw, 220px` | Grid column width |
| Card image | `(max-width: 600px) 100vw, 300px` | Card max width |

### Loading Strategy

| Image Type | `loading` | `fetchpriority` | `decoding` |
|------------|-----------|-----------------|------------|
| Hero/LCP | `eager` | `high` | `async` |
| Above fold | `eager` | `auto` | `async` |
| Below fold | `lazy` | `auto` | `async` |
| Thumbnails | `lazy` | `low` | `async` |

---

## Skill/Hook/Command Improvements Needed

Based on the demo-site patterns, our xhtml-test project needs these enhancements:

### New Skills to Create

#### 1. `css-architecture` Skill
Guidance for modern CSS organization and approaches:
- **File organization** with `@import` (tokens, layout, sections, components, pages)
- CSS Layers (`@layer`) for cascade control
- Native CSS nesting patterns
- Element-focused selector strategies
- Classless CSS patterns
- When to create new CSS files

#### 2. `responsive-images` Skill
Modern image handling:
- `<picture>` element for art direction
- `srcset` and `sizes` for resolution switching and optimal image selection
- WebP/AVIF with fallbacks
- Lazy loading strategies
- `fetchpriority` and `decoding` usage
- Image sizing strategy by context

#### 3. `data-attributes` Skill
The HTML/CSS/JS bridge pattern:
- State management with `data-state`, `data-expanded`, etc.
- Variant styling with `data-variant`, `data-type`, `data-topic`
- Configuration via `data-columns`, `data-gap`, `data-size`
- CSS attribute selectors for styling
- JavaScript `dataset` API for manipulation
- Validation of allowed attribute values

#### 4. `progressive-enhancement` Skill
HTML-first development patterns:
- CSS-only interactivity (checkbox hacks, `:has()`)
- Native `<dialog>` for modals
- HTML5 form validation with `:user-valid`/`:user-invalid`
- View Transitions API
- Feature detection approaches
- Data attribute state management (no class toggling)

#### 5. `design-tokens` Skill
CSS custom property systems:
- Color token naming conventions
- Spacing scales (xs, sm, md, lg, xl)
- Typography systems (sizes, weights, line-heights)
- Shadow/effect tokens
- Theme switching with `:has()` and `prefers-color-scheme`
- Token organization in `_tokens.css`

#### 6. `forms` Skill
HTML-first form patterns with CSS-only validation:
- `<form-field>` custom element pattern
- `<output>` element for validation messages
- `aria-describedby` linking inputs to messages
- `aria-live="polite"` for screen reader announcements
- HTML5 validation attributes (`required`, `minlength`, `type`, `pattern`)
- CSS `:user-valid` and `:user-invalid` pseudo-classes
- Auto-generated required indicators via CSS `::after`
- Accessible error messaging without JavaScript

### Skills to Update

#### `xhtml-author` Skill
Add sections for:
- Inert custom elements (semantic wrappers)
- View Transition meta tag
- `loading`, `decoding`, `fetchpriority` attributes

#### `patterns` Skill
Add patterns for:
- Blog card layouts
- Tag/taxonomy systems
- Gallery grids
- Table wrappers with scroll
- Theme selector fieldsets

#### `metadata` Skill
Add:
- View Transition meta tag
- Theme color for dark mode
- Prefers-color-scheme considerations

### New Custom Elements to Define

Add to `elements.json`:

```json
{
  "form-field": {
    "flow": true,
    "permittedContent": ["label", "input", "textarea", "select", "output", "@phrasing"],
    "attributes": {
      "data-required": { "boolean": true },
      "data-valid": { "boolean": true },
      "data-invalid": { "boolean": true }
    }
  },
  "app-brand": { "flow": true, "phrasing": true },
  "app-credits": { "flow": true },
  "app-help": { "flow": true },
  "app-settings": { "flow": true },
  "spacer-element": { "flow": true, "void": true },
  "table-wrapper": { "flow": true, "permittedContent": ["table"] },
  "theme-selector": { "flow": true, "permittedContent": ["fieldset"] },
  "blog-card": { "flow": true, "permittedContent": ["@flow"] },
  "tag-list": { "flow": true, "permittedContent": ["tag-topic"] },
  "tag-topic": { "flow": true, "phrasing": true, "attributes": { "data-topic": {} } },
  "tag-index": { "flow": true },
  "tag-index-item": { "flow": true, "attributes": { "data-topic": {} } }
}
```

**Note:** `form-field` has already been added to `elements.json` with the correct content model.

### New Validation Rules

#### html-validate rules to consider:
- `prefer-picture` - Warn when `<img>` could use `<picture>`
- `require-srcset` - Require srcset for images over certain size
- `prefer-modern-formats` - Suggest WebP/AVIF
- `require-loading-attr` - Require `loading` attribute on images

#### Metadata validation:
- Check for `view-transition` meta tag
- Validate theme-color for light/dark modes

### New Slash Commands

#### `/add-css-tokens`
Generate a starter design token system:
```css
@layer tokens {
  :root {
    /* Colors */
    /* Spacing */
    /* Typography */
    /* Effects */
  }
}
```

#### `/add-picture`
Convert `<img>` to `<picture>` with modern format sources:
```html
<picture>
  <source srcset="image.avif" type="image/avif"/>
  <source srcset="image.webp" type="image/webp"/>
  <img src="image.jpg" alt="..."/>
</picture>
```

#### `/add-theme-toggle`
Generate CSS-only theme toggle pattern with radio buttons and `:has()`.

#### `/add-css-file`
Create a new CSS file in the correct location based on scope:
```
/add-css-file component gallery-grid
→ Creates components/_gallery-grid.css and adds @import to main.css

/add-css-file page product-detail
→ Creates pages/_product-detail.css and adds @import to main.css

/add-css-file section hero
→ Creates sections/_hero.css and adds @import to main.css
```

### Hook Improvements

#### PostToolUse Hook for CSS
Add CSS validation when editing `.css` files:
- Lint for unused custom properties
- Check layer organization
- Validate nesting depth

#### Image Optimization Hook
When images are added:
- Suggest modern format alternatives
- Check for missing `alt`, `loading`, `decoding`
- Warn if `srcset` missing on large images

---

## Implementation Priority

### Phase 1: Core Skills
1. Create `css-architecture` skill (file organization with @import, layers, nesting)
2. Create `data-attributes` skill (state/variant/config patterns)
3. Create `forms` skill (`<form-field>`, `<output>`, CSS-only validation)
4. Create `responsive-images` skill (`<picture>`, srcset, sizes, modern formats)
5. Update `xhtml-author` with View Transitions and image attributes

### Phase 2: Validation ✅
6. ~~Add image-related html-validate rules~~ (wcag/h36, h37, h67 + image-html-check.js)
7. ~~Add new custom elements to `elements.json`~~ (13 elements added)
8. ~~Update metadata profiles for view-transition~~ (+ theme-color)

### Phase 3: Automation ✅
9. ~~Create `/add-picture` slash command~~ (converts img to picture with AVIF/WebP)
10. ~~Create `/add-css-tokens` slash command~~ (generates design token system)
11. ~~Create `/add-css-file` slash command~~ (creates CSS in correct scope/location)
12. ~~Create `/add-form-field` slash command~~ (generates accessible form-field pattern)
13. ~~Add CSS linting to hooks~~ (PostToolUse triggers stylelint on .css edits)

### Phase 4: Documentation ✅
14. ~~Create `progressive-enhancement` skill~~ (already existed, 547 lines)
15. ~~Create `design-tokens` skill~~ (already existed, 528 lines)
16. ~~Update README with new capabilities~~ (CSS, images, commands added)

---

## Files to Create/Modify

| Action | File |
|--------|------|
| Create | `.claude/skills/css-architecture/SKILL.md` |
| Create | `.claude/skills/responsive-images/SKILL.md` |
| Create | `.claude/skills/data-attributes/SKILL.md` |
| Create | `.claude/skills/progressive-enhancement/SKILL.md` |
| Create | `.claude/skills/design-tokens/SKILL.md` |
| Create | `.claude/commands/add-picture.md` |
| Create | `.claude/commands/add-css-tokens.md` |
| Create | `.claude/commands/add-css-file.md` |
| Update | `.claude/skills/xhtml-author/SKILL.md` |
| Update | `.claude/skills/patterns/SKILL.md` |
| Update | `elements.json` |
| Update | `project-words.txt` |
| Update | `README.md` |

---

## Validation Tools Pipeline

The project enforces quality through automated validation at multiple levels.

### The Virtuous Cycle

```
┌─────────────────────────────────────────────────────────────┐
│  Edit HTML file → html-validate + htmlhint + pa11y          │
│  Edit CSS file  → stylelint                                 │
│  Add images     → image-check.js                            │
│                                                             │
│  npm run lint:all                                           │
│  ├── lint (HTML: html-validate + htmlhint)                  │
│  ├── lint:css (CSS: stylelint)                              │
│  ├── lint:images (Images: image-check.js)                   │
│  ├── lint:content (Spelling + Grammar)                      │
│  └── lint:meta (Metadata profiles)                          │
└─────────────────────────────────────────────────────────────┘
```

### CSS Validation (Stylelint)

**Configuration:** `.stylelintrc.json`

| Rule | Purpose |
|------|---------|
| `max-nesting-depth: 3` | Prevent over-nested selectors |
| `layer-name-pattern` | Enforce @layer naming (lowercase, hyphens) |
| `custom-property-no-missing-var-function` | Catch missing var() |
| `declaration-block-no-duplicate-properties` | Prevent duplicates |
| `no-descending-specificity` | Maintain selector order |

**Usage:**
```bash
npm run lint:css          # Lint all CSS files
npm run lint:css:fix      # Auto-fix issues
```

**PostToolUse Hook:** Automatically runs when editing `.css` files.

### Image Validation

**Script:** `scripts/image-check.js`

| Check | Threshold | Action |
|-------|-----------|--------|
| File size | > 200KB | Error |
| Missing WebP | Any JPEG/PNG | Error |
| Missing AVIF | Any JPEG/PNG | Error |
| Large dimensions | > 4000px | Warning |
| High bytes/pixel | > 1.5 bpp | Warning |

**Usage:**
```bash
npm run lint:images       # Validate images
npm run optimize:images   # Generate WebP/AVIF versions
```

### Image Optimization

**Script:** `scripts/optimize-images.js`

Automatically generates:
- WebP versions (82% quality)
- AVIF versions (65% quality)
- Multiple sizes for srcset (with `--sizes` flag)

**Usage:**
```bash
npm run optimize:images              # Generate WebP/AVIF
npm run optimize:images -- --sizes   # Also generate 400w, 800w, 1200w
npm run optimize:images -- --dry-run # Preview changes
```

### Image HTML Best Practices

**Script:** `scripts/image-html-check.js`

Validates `<img>` elements in HTML for modern best practices:

| Check | Type | Recommendation |
|-------|------|----------------|
| Missing `loading` | Warning | Add `loading="lazy"` or `loading="eager"` |
| Missing `decoding` | Warning | Add `decoding="async"` |
| Missing `width`/`height` | Warning | Prevents layout shift (CLS) |
| Large images without `srcset` | Warning | Use responsive images |
| JPEG/PNG not in `<picture>` | Warning | Use modern formats with fallback |
| `srcset` with `w` but no `sizes` | Error | Required by HTML spec |

**Usage:**
```bash
npm run lint:images:html   # Check image HTML best practices
```

### WCAG Image Rules (html-validate)

The `.htmlvalidate.json` includes accessibility rules for images:

| Rule | Purpose |
|------|---------|
| `wcag/h36` | Require alt on image submit buttons |
| `wcag/h37` | Require alt on all images |
| `wcag/h67` | Validate null alt with no title |

### Complete Validation

Run all validators:
```bash
npm run lint:all
```

This runs:
1. `lint` - HTML structure (html-validate + htmlhint)
2. `lint:css` - CSS quality (stylelint)
3. `lint:images` - Image optimization (image-check.js)
4. `lint:content` - Spelling and grammar
5. `lint:meta` - Metadata completeness
