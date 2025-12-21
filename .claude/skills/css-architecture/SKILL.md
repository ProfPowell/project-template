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

## Container Queries (`@container`)

Container queries enable **component-scoped responsive design**. Unlike media queries (which respond to viewport size), container queries respond to the size of a parent container.

### Why Container Queries?

| Media Queries | Container Queries |
|---------------|-------------------|
| Respond to viewport | Respond to container |
| Global breakpoints | Component-specific |
| Same component, same layout everywhere | Same component adapts to context |

**Use case:** A card component that displays horizontally in a wide sidebar but stacks vertically in a narrow sidebar—without knowing where it's placed.

### Defining a Container

Use `container-type` to establish a containment context:

```css
/* Any element can be a container */
sidebar-panel {
  container-type: inline-size;  /* Width-based queries */
  container-name: sidebar;      /* Optional: name for targeting */
}

/* Shorthand */
main-content {
  container: content / inline-size;  /* name / type */
}
```

#### Container Types

| Type | Queries On | Use When |
|------|-----------|----------|
| `inline-size` | Width only | Most common - responsive layouts |
| `size` | Width and height | Rare - when height matters |
| `normal` | No size queries | Style queries only |

**Recommendation:** Use `inline-size` for 99% of cases.

### Writing Container Queries

```css
/* Query any ancestor container */
@container (min-width: 400px) {
  blog-card {
    display: grid;
    grid-template-columns: 200px 1fr;
  }
}

/* Query a specific named container */
@container sidebar (max-width: 300px) {
  blog-card {
    flex-direction: column;
  }
}
```

### Container Query Units

Container-relative units for truly fluid components:

| Unit | Meaning |
|------|---------|
| `cqw` | 1% of container width |
| `cqh` | 1% of container height |
| `cqi` | 1% of container inline size |
| `cqb` | 1% of container block size |
| `cqmin` | Smaller of `cqi` or `cqb` |
| `cqmax` | Larger of `cqi` or `cqb` |

```css
blog-card h3 {
  /* Font scales with container width */
  font-size: clamp(1rem, 4cqi, 1.5rem);
}
```

### Container Queries with Layers

Container queries integrate naturally with the layer system:

```css
@layer components {
  /* Define containers at the component wrapper level */
  card-container {
    container-type: inline-size;
  }

  /* Base card styles */
  blog-card {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
  }

  /* Container-responsive layout */
  @container (min-width: 500px) {
    blog-card {
      flex-direction: row;
    }

    blog-card img {
      width: 40%;
      flex-shrink: 0;
    }
  }
}
```

### Pattern: Self-Contained Responsive Components

Make components that adapt without external configuration:

```css
/* components/_product-card.css */
@layer components {
  product-card {
    /* The card IS its own container */
    container-type: inline-size;

    display: grid;
    gap: var(--spacing-md);
    padding: var(--spacing-lg);
  }

  /* Compact layout (narrow) */
  @container (max-width: 299px) {
    product-card {
      text-align: center;

      & img {
        margin-inline: auto;
        max-width: 150px;
      }
    }
  }

  /* Standard layout (medium) */
  @container (min-width: 300px) and (max-width: 499px) {
    product-card {
      grid-template-columns: 1fr;
    }
  }

  /* Wide layout (large) */
  @container (min-width: 500px) {
    product-card {
      grid-template-columns: 200px 1fr;
      grid-template-rows: auto 1fr auto;

      & img {
        grid-row: 1 / -1;
      }
    }
  }
}
```

### Container Queries vs Media Queries

Use both—they serve different purposes:

```css
@layer components {
  blog-card {
    container-type: inline-size;
  }

  /* Container query: responds to where card is placed */
  @container (min-width: 400px) {
    blog-card {
      grid-template-columns: 150px 1fr;
    }
  }
}

@layer responsive {
  /* Media query: global layout changes */
  @media (max-width: 768px) {
    .card-grid {
      grid-template-columns: 1fr;  /* Stack cards on mobile */
    }
  }
}
```

### Nesting Container Queries

Container queries can be nested inside element selectors:

```css
sidebar-panel {
  container-type: inline-size;

  & blog-card {
    padding: var(--spacing-md);

    @container (min-width: 350px) {
      padding: var(--spacing-lg);
      display: grid;
      grid-template-columns: 100px 1fr;
    }
  }
}
```

### Container Query Checklist

When implementing container queries:

- [ ] Set `container-type: inline-size` on the containing element
- [ ] Use `container-name` when multiple containers need targeting
- [ ] Prefer `min-width` for progressive enhancement
- [ ] Use container units (`cqi`, `cqw`) for fluid typography/spacing
- [ ] Keep container queries in the same layer as component styles
- [ ] Test components in various container widths

---

## CSS Logical Properties

Logical properties replace physical direction properties (left, right, top, bottom) with **flow-relative** alternatives. This enables layouts that automatically adapt to different writing modes and text directions.

### Why Logical Properties?

| Physical Properties | Logical Properties |
|--------------------|-------------------|
| Fixed to screen edges | Adapt to text direction |
| Break in RTL languages | Work in any writing mode |
| Require RTL overrides | Automatically flip |
| `margin-left: 1rem` | `margin-inline-start: 1rem` |

**Benefits:**

- **Internationalization** - Layouts work in Arabic, Hebrew, and other RTL languages
- **Future-proof** - Vertical writing modes (CJK) work automatically
- **Consistency** - One codebase for all languages
- **Semantic** - Properties describe intent, not position

### The Logical Model

CSS logical properties use two axes:

| Axis | Direction | Physical Equivalent |
|------|-----------|---------------------|
| **Block** | Vertical (in LTR/RTL) | Top ↔ Bottom |
| **Inline** | Horizontal (in LTR/RTL) | Left ↔ Right |

Each axis has two edges:

| Edge | Block Axis | Inline Axis (LTR) | Inline Axis (RTL) |
|------|------------|-------------------|-------------------|
| **Start** | Top | Left | Right |
| **End** | Bottom | Right | Left |

### Property Mappings

#### Margins

| Physical | Logical |
|----------|---------|
| `margin-top` | `margin-block-start` |
| `margin-bottom` | `margin-block-end` |
| `margin-left` | `margin-inline-start` |
| `margin-right` | `margin-inline-end` |

**Shorthand properties:**

```css
/* Two values: start and end */
margin-block: 1rem 2rem;   /* top: 1rem, bottom: 2rem */
margin-inline: 1rem 2rem;  /* left: 1rem (LTR), right: 1rem (RTL) */

/* Single value: both start and end */
margin-block: 1rem;        /* top and bottom */
margin-inline: 1rem;       /* left and right */
```

#### Padding

Same pattern as margins:

```css
padding-block: var(--spacing-lg);
padding-inline: var(--spacing-md);

/* Individual sides */
padding-block-start: var(--spacing-lg);
padding-inline-end: var(--spacing-sm);
```

#### Sizing

| Physical | Logical |
|----------|---------|
| `width` | `inline-size` |
| `height` | `block-size` |
| `min-width` | `min-inline-size` |
| `max-height` | `max-block-size` |

```css
blog-card {
  inline-size: 100%;
  max-inline-size: 40rem;
  min-block-size: 200px;
}
```

#### Positioning

| Physical | Logical |
|----------|---------|
| `top` | `inset-block-start` |
| `bottom` | `inset-block-end` |
| `left` | `inset-inline-start` |
| `right` | `inset-inline-end` |

**Shorthand:**

```css
/* All four sides */
inset: 0;  /* Same as top: 0; right: 0; bottom: 0; left: 0; */

/* Block and inline axes */
inset-block: 0;   /* top and bottom */
inset-inline: 0;  /* left and right */
```

#### Borders

```css
/* Border on one logical side */
border-inline-start: 3px solid var(--primary-color);

/* Border radius */
border-start-start-radius: var(--radius-lg);  /* top-left in LTR */
border-end-start-radius: var(--radius-lg);    /* bottom-left in LTR */
```

#### Text Alignment

| Physical | Logical |
|----------|---------|
| `text-align: left` | `text-align: start` |
| `text-align: right` | `text-align: end` |

### Common Patterns

#### Centering with Logical Properties

```css
/* Center horizontally (works in RTL) */
blog-card {
  margin-inline: auto;
  max-inline-size: 40rem;
}
```

#### Icon + Text Spacing

```css
/* Space between icon and text, flips in RTL */
button svg {
  margin-inline-end: var(--spacing-sm);
}
```

#### Sidebar Layout

```css
/* Sidebar on the start edge (left in LTR, right in RTL) */
main-layout {
  display: grid;
  grid-template-columns: 250px 1fr;
}

sidebar-panel {
  border-inline-end: 1px solid var(--border-color);
  padding-inline-end: var(--spacing-lg);
}
```

#### Card with Accent Border

```css
/* Accent border on start edge */
blog-card[data-featured] {
  border-inline-start: 4px solid var(--accent-color);
  padding-inline-start: var(--spacing-lg);
}
```

### Migration Guide

When converting existing CSS:

```css
/* Before */
.card {
  margin-left: 1rem;
  margin-right: 1rem;
  padding-top: 2rem;
  padding-bottom: 1rem;
  border-left: 3px solid blue;
  text-align: left;
}

/* After */
.card {
  margin-inline: 1rem;
  padding-block: 2rem 1rem;
  border-inline-start: 3px solid blue;
  text-align: start;
}
```

### When to Keep Physical Properties

Some properties should remain physical:

| Property | Keep Physical When |
|----------|-------------------|
| `top`, `left`, etc. | Fixed position relative to viewport |
| `transform` | Animations that shouldn't flip |
| `box-shadow` | Light source should stay consistent |
| `background-position` | Image positioning shouldn't flip |

```css
/* Physical: shadow direction stays consistent */
blog-card {
  box-shadow: 2px 2px 8px var(--shadow-color);
}

/* Logical: border flips with text direction */
blog-card {
  border-inline-start: 3px solid var(--accent-color);
}
```

### Integration with Design Tokens

Define spacing tokens and use them with logical properties:

```css
/* _tokens.css */
:root {
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;
}

/* Component using logical properties with tokens */
article {
  padding-block: var(--spacing-xl);
  padding-inline: var(--spacing-lg);
  margin-block-end: var(--spacing-lg);
}
```

### Browser Support

Logical properties have excellent browser support (95%+). For older browsers:

```css
/* Fallback pattern (only if supporting very old browsers) */
blog-card {
  margin-left: 1rem;  /* Fallback */
  margin-inline-start: 1rem;  /* Modern browsers */
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
- [ ] Container queries used for component-scoped responsiveness
- [ ] Components define `container-type` when children need to adapt
- [ ] Logical properties used for margins, padding, and borders
- [ ] `margin-inline` / `padding-block` instead of physical directions
- [ ] `text-align: start` instead of `text-align: left`
- [ ] Physical properties only where semantically appropriate (shadows, transforms)
