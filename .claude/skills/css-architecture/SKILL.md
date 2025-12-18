---
name: css-architecture
description: Modern CSS organization with native @import, @layer cascade control, CSS nesting, and element-focused selectors. Use when structuring stylesheets for maintainable, build-tool-free projects.
allowed-tools: Read, Write, Edit
---

# CSS Architecture Skill

This skill provides patterns for organizing CSS in modern, maintainable ways **without build tools**. We leverage native CSS features: `@import` for modularization, `@layer` for cascade control, and nesting for readability.

## Philosophy

CSS should be:
1. **Native** - No preprocessors or build steps required
2. **Modular** - Organized by scope and purpose
3. **Predictable** - Cascade layers eliminate specificity wars
4. **Semantic** - Target elements, not class soup

---

## File Organization Hierarchy

```
styles/
├── main.css                 # Entry point - imports everything
├── _reset.css               # CSS reset/normalize
├── _tokens.css              # Design tokens (custom properties)
├── _layout.css              # Site-wide layout (grid, body structure)
├── _components.css          # Shared components (buttons, cards)
├── sections/
│   ├── _header.css          # Site header/nav
│   ├── _footer.css          # Site footer
│   └── _sidebar.css         # Sidebar patterns
├── pages/
│   ├── _home.css            # Homepage-specific styles
│   ├── _blog.css            # Blog listing/post styles
│   └── _contact.css         # Contact page styles
└── components/
    ├── _gallery.css         # Gallery grid component
    ├── _tag-list.css        # Tag component styles
    └── _data-table.css      # Table wrapper styles
```

### Naming Convention

- **Underscore prefix** (`_reset.css`): Partial files, imported by main.css
- **No prefix** (`main.css`): Entry point, linked in HTML
- **Lowercase with hyphens**: `_tag-list.css`, `_data-table.css`

---

## The Entry Point (`main.css`)

The main stylesheet declares layers and imports partials:

```css
/* Layer declaration - controls cascade order */
@layer reset, tokens, layout, sections, components, pages, responsive;

/* Reset (lowest priority) */
@import "_reset.css" layer(reset);

/* Design system tokens */
@import "_tokens.css" layer(tokens);

/* Site-wide layout */
@import "_layout.css" layer(layout);

/* Recurring sections */
@import "sections/_header.css" layer(sections);
@import "sections/_footer.css" layer(sections);
@import "sections/_sidebar.css" layer(sections);

/* Shared components */
@import "_components.css" layer(components);
@import "components/_gallery.css" layer(components);
@import "components/_tag-list.css" layer(components);
@import "components/_data-table.css" layer(components);

/* Page-specific styles */
@import "pages/_home.css" layer(pages);
@import "pages/_blog.css" layer(pages);
@import "pages/_contact.css" layer(pages);

/* Responsive overrides (highest priority) */
@layer responsive {
  @media (max-width: 768px) {
    /* Mobile overrides */
  }
}
```

---

## CSS Layers (`@layer`)

### Why Layers?

Layers provide **explicit cascade control** regardless of selector specificity:

```css
@layer base, theme, utilities;

@layer utilities {
  .hidden { display: none !important; }
}

@layer base {
  button { display: inline-block; }
}

/* utilities wins over base, even with lower specificity */
```

### Recommended Layer Order

| Layer | Priority | Purpose |
|-------|----------|---------|
| `reset` | Lowest | Normalize browser defaults |
| `tokens` | Low | CSS custom properties |
| `layout` | Medium-Low | Body grid, main structure |
| `sections` | Medium | Header, footer, sidebar |
| `components` | Medium-High | Buttons, cards, form elements |
| `pages` | High | Page-specific overrides |
| `responsive` | Highest | Media query adjustments |

### Layer Benefits

1. **No specificity wars** - Later layers always win
2. **Predictable overrides** - Page styles override components
3. **Safe imports** - Third-party CSS can be isolated
4. **Clear organization** - Find styles by layer purpose

---

## Native CSS Nesting

Modern browsers support CSS nesting, reducing repetition:

```css
/* Without nesting */
nav { }
nav ul { }
nav a { }
nav a:hover { }

/* With nesting */
nav {
  & ul {
    display: flex;
    gap: var(--spacing-lg);
  }

  & a {
    padding: var(--spacing-sm) var(--spacing-md);

    &:hover {
      background: var(--overlay-light);
    }

    &[aria-current="page"] {
      background: var(--overlay-strong);
    }
  }
}
```

### Nesting Rules

1. **Use `&` for clarity** - Always prefix nested selectors with `&`
2. **Limit depth** - No more than 3-4 levels deep
3. **Keep related styles together** - Element and its states
4. **Avoid over-nesting** - If selectors get complex, flatten

### Nesting with Media Queries

Media queries can be nested inside selectors:

```css
header {
  padding: var(--spacing-lg);

  @media (max-width: 768px) {
    padding: var(--spacing-md);
  }
}
```

---

## Element-Focused CSS (Classless)

### Target Semantic HTML

Instead of inventing classes, style semantic elements:

```css
/* Avoid */
.header-nav { }
.nav-list { }
.nav-link { }

/* Prefer */
header nav { }
header nav ul { }
header nav a { }
```

### Custom Elements as Styling Hooks

Custom elements provide semantic styling targets without classes:

```css
/* Instead of .form-group { } */
form-field { }

/* Instead of .product-card { } */
product-card { }

/* Instead of .table-wrapper { } */
table-wrapper { }
```

### When Classes Are Appropriate

Use classes sparingly for:

| Use Case | Example |
|----------|---------|
| Multi-variant components | `.card`, `.card-featured` |
| View transition names | `.vt-card-1` (when data-* insufficient) |
| Third-party integration | Classes required by libraries |

**Never use classes for state.** Use `data-*` attributes instead.

---

## Scope Hierarchy

| Level | Scope | Contents |
|-------|-------|----------|
| **Tokens** | Entire site | Colors, spacing, typography, effects |
| **Layout** | Body structure | Grid areas, view transitions, body rules |
| **Sections** | Recurring site parts | Header, footer, sidebar, navigation |
| **Components** | Reusable blocks | Cards, buttons, forms, tables, tags |
| **Pages** | Single page types | Homepage hero, blog post, contact form |

### When to Create a New File

| Scenario | Action |
|----------|--------|
| New custom element | Create `components/_element-name.css` |
| New page type with unique styles | Create `pages/_page-name.css` |
| New recurring section | Create `sections/_section-name.css` |
| New design token category | Extend `_tokens.css` |

---

## Adding a New CSS File

### 1. Create the Partial

```css
/* components/_gallery.css */
@layer components {
  gallery-grid {
    display: grid;
    gap: var(--spacing-md);

    &[data-columns="2"] { grid-template-columns: repeat(2, 1fr); }
    &[data-columns="3"] { grid-template-columns: repeat(3, 1fr); }
    &[data-columns="4"] { grid-template-columns: repeat(4, 1fr); }
  }
}
```

### 2. Add Import to main.css

```css
/* In main.css, add to appropriate section */
@import "components/_gallery.css" layer(components);
```

### 3. File Template

Every partial should follow this structure:

```css
/* components/_example.css */
@layer components {
  /* Element styles */
  example-element {
    /* Base styles */

    /* State variants via data attributes */
    &[data-state="active"] { }

    /* Nested elements */
    & .inner { }

    /* Responsive adjustments */
    @media (max-width: 768px) { }
  }
}
```

---

## CSS Import Performance

### Browser Behavior

Modern browsers handle `@import` efficiently:
- Parallel fetching when imports are at the start
- Caching of individual files
- No render-blocking beyond the cascade order

### Best Practices

1. **All imports at the top** - Before any other CSS
2. **Layer declaration first** - `@layer` before `@import`
3. **Use HTTP/2** - Multiplexing handles multiple files well
4. **Consider concatenation** for production if needed

### When to Consolidate

For very high-traffic sites, you may want to concatenate CSS:

```bash
# Simple concatenation for production
cat styles/_reset.css styles/_tokens.css styles/_layout.css > styles/bundle.css
```

But for most projects, native imports work well.

---

## Responsive Design Pattern

### Mobile-First vs Desktop-First

We use **desktop-first** with `max-width` queries, grouped in the `responsive` layer:

```css
@layer responsive {
  @media (max-width: 1024px) {
    /* Tablet adjustments */
  }

  @media (max-width: 768px) {
    /* Mobile adjustments */
  }

  @media (max-width: 480px) {
    /* Small mobile adjustments */
  }
}
```

### Breakpoint Tokens

Define breakpoints as documentation (CSS can't use variables in media queries):

```css
/* _tokens.css */
:root {
  /* Breakpoints (for reference - use literal values in @media) */
  /* --breakpoint-xl: 1280px; */
  /* --breakpoint-lg: 1024px; */
  /* --breakpoint-md: 768px; */
  /* --breakpoint-sm: 480px; */
}
```

---

## Example: Complete Component File

```css
/* components/_blog-card.css */
@layer components {
  blog-card {
    display: grid;
    gap: var(--spacing-md);
    padding: var(--spacing-lg);
    background: var(--surface-color);
    border-radius: var(--border-radius);
    box-shadow: var(--shadow-sm);
    transition: box-shadow var(--transition-normal);

    /* Hover effect */
    &:hover {
      box-shadow: var(--shadow-md);
    }

    /* Featured variant */
    &[data-featured] {
      border-left: 4px solid var(--primary-color);
    }

    /* Child elements */
    & h3 {
      margin: 0;
      font-size: var(--font-size-lg);
    }

    & time {
      color: var(--text-muted);
      font-size: var(--font-size-sm);
    }

    & p {
      margin: 0;
      line-height: var(--line-height-relaxed);
    }

    /* Responsive */
    @media (max-width: 768px) {
      padding: var(--spacing-md);
    }
  }
}
```

---

## Checklist for CSS Architecture

When setting up or reviewing CSS:

- [ ] Layer declaration at top of main.css
- [ ] All imports use `layer()` syntax
- [ ] Files organized by scope (tokens, layout, sections, components, pages)
- [ ] No classes used for state (use `data-*` attributes)
- [ ] Custom elements used as styling hooks
- [ ] Nesting limited to 3-4 levels
- [ ] Responsive styles in `responsive` layer
- [ ] Design tokens in `_tokens.css`
