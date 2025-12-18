---
name: design-tokens
description: CSS custom property systems for consistent design. Use when creating or extending design token systems for colors, spacing, typography, and effects.
allowed-tools: Read, Write, Edit
---

# Design Tokens Skill

This skill covers CSS custom property (variable) systems for maintaining consistent, themeable designs. Design tokens are the foundational values that define a design system.

## Philosophy

Design tokens provide:
1. **Consistency** - Same values used everywhere
2. **Maintainability** - Change once, apply everywhere
3. **Theming** - Swap token values for different themes
4. **Documentation** - Token names describe purpose

---

## Token Categories

### Core Token Categories

| Category | Purpose | Examples |
|----------|---------|----------|
| Colors | Brand, semantic, surface colors | `--primary-color`, `--error-color` |
| Spacing | Consistent gaps and padding | `--spacing-sm`, `--spacing-lg` |
| Typography | Font sizes, weights, heights | `--font-size-lg`, `--line-height-normal` |
| Effects | Shadows, transitions, borders | `--shadow-md`, `--transition-normal` |
| Layout | Widths, breakpoints | `--content-width`, `--sidebar-width` |

---

## Complete Token System

### File Structure

```css
/* _tokens.css */
@layer tokens {
  :root {
    /* ==================== COLORS ==================== */

    /* Brand colors */
    --primary-color: #2563eb;
    --primary-hover: #1d4ed8;
    --primary-light: #dbeafe;

    --secondary-color: #64748b;
    --secondary-hover: #475569;

    /* Semantic colors */
    --success-color: #059669;
    --success-light: #d1fae5;

    --warning-color: #d97706;
    --warning-light: #fef3c7;

    --error-color: #dc2626;
    --error-light: #fee2e2;

    --info-color: #0891b2;
    --info-light: #cffafe;

    /* Surface colors */
    --background-main: #ffffff;
    --background-alt: #f9fafb;
    --surface-color: #ffffff;
    --surface-elevated: #ffffff;

    /* Text colors */
    --text-color: #1f2937;
    --text-muted: #6b7280;
    --text-inverted: #ffffff;

    /* Border colors */
    --border-color: #e5e7eb;
    --border-strong: #d1d5db;

    /* Overlay colors */
    --overlay-light: rgba(0, 0, 0, 0.05);
    --overlay-medium: rgba(0, 0, 0, 0.1);
    --overlay-strong: rgba(0, 0, 0, 0.2);

    /* ==================== SPACING ==================== */

    --spacing-xs: 0.25rem;   /* 4px */
    --spacing-sm: 0.5rem;    /* 8px */
    --spacing-md: 1rem;      /* 16px */
    --spacing-lg: 1.5rem;    /* 24px */
    --spacing-xl: 2rem;      /* 32px */
    --spacing-2xl: 3rem;     /* 48px */
    --spacing-3xl: 4rem;     /* 64px */

    /* ==================== TYPOGRAPHY ==================== */

    /* Font families */
    --font-sans: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    --font-mono: ui-monospace, "Cascadia Code", "Source Code Pro", Menlo, monospace;
    --font-serif: Georgia, Cambria, "Times New Roman", Times, serif;

    /* Font sizes */
    --font-size-xs: 0.75rem;   /* 12px */
    --font-size-sm: 0.875rem;  /* 14px */
    --font-size-base: 1rem;    /* 16px */
    --font-size-lg: 1.125rem;  /* 18px */
    --font-size-xl: 1.25rem;   /* 20px */
    --font-size-2xl: 1.5rem;   /* 24px */
    --font-size-3xl: 1.875rem; /* 30px */
    --font-size-4xl: 2.25rem;  /* 36px */

    /* Font weights */
    --font-weight-normal: 400;
    --font-weight-medium: 500;
    --font-weight-semibold: 600;
    --font-weight-bold: 700;

    /* Line heights */
    --line-height-tight: 1.25;
    --line-height-normal: 1.5;
    --line-height-relaxed: 1.625;
    --line-height-loose: 2;

    /* Letter spacing */
    --letter-spacing-tight: -0.025em;
    --letter-spacing-normal: 0;
    --letter-spacing-wide: 0.025em;

    /* ==================== EFFECTS ==================== */

    /* Shadows */
    --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
    --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
    --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
    --shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.1);

    /* Transitions */
    --transition-fast: 0.15s ease;
    --transition-normal: 0.3s ease;
    --transition-slow: 0.5s ease;

    /* Border radius */
    --radius-sm: 0.25rem;    /* 4px */
    --radius-md: 0.375rem;   /* 6px */
    --radius-lg: 0.5rem;     /* 8px */
    --radius-xl: 0.75rem;    /* 12px */
    --radius-full: 9999px;

    /* ==================== LAYOUT ==================== */

    /* Content widths */
    --content-width: 65ch;
    --content-width-wide: 80rem;
    --sidebar-width: 16rem;

    /* Z-index scale */
    --z-dropdown: 100;
    --z-sticky: 200;
    --z-modal: 300;
    --z-tooltip: 400;
  }
}
```

---

## Color Token Patterns

### Naming Convention

```css
/* Pattern: --{category}-{variant} */
--primary-color      /* Base primary */
--primary-hover      /* Primary on hover */
--primary-light      /* Light variant for backgrounds */

/* Pattern: --{semantic}-{variant} */
--success-color      /* Success state */
--success-light      /* Success background */
--error-color        /* Error state */
--error-light        /* Error background */

/* Pattern: --{element}-{property} */
--text-color         /* Main text */
--text-muted         /* Secondary text */
--border-color       /* Default borders */
--background-main    /* Main background */
```

### Semantic Color Usage

| Token | Use For |
|-------|---------|
| `--primary-color` | Buttons, links, active states |
| `--success-color` | Confirmations, valid states |
| `--warning-color` | Warnings, caution indicators |
| `--error-color` | Errors, invalid states |
| `--info-color` | Informational messages |

### Surface vs Background

```css
/* Backgrounds: page-level surfaces */
--background-main    /* Primary page background */
--background-alt     /* Alternating sections */

/* Surfaces: component-level backgrounds */
--surface-color      /* Cards, dialogs at page level */
--surface-elevated   /* Cards, dialogs above surfaces */
```

---

## Spacing Scale

### The Scale Pattern

Use a consistent scale with meaningful jumps:

```css
--spacing-xs: 0.25rem;   /* 4px - tight internal spacing */
--spacing-sm: 0.5rem;    /* 8px - small gaps */
--spacing-md: 1rem;      /* 16px - standard gaps */
--spacing-lg: 1.5rem;    /* 24px - section spacing */
--spacing-xl: 2rem;      /* 32px - major sections */
--spacing-2xl: 3rem;     /* 48px - page sections */
--spacing-3xl: 4rem;     /* 64px - hero/major breaks */
```

### Usage Guidelines

| Token | Use For |
|-------|---------|
| `xs` | Icon margins, tight inline spacing |
| `sm` | Small padding, tight gaps |
| `md` | Default padding, grid gaps |
| `lg` | Card padding, section margins |
| `xl` | Section gaps, major spacing |
| `2xl`/`3xl` | Page-level vertical rhythm |

---

## Typography Tokens

### Font Size Scale

A modular scale (1.125 ratio) provides harmonious sizing:

```css
--font-size-xs: 0.75rem;   /* 12px - labels, captions */
--font-size-sm: 0.875rem;  /* 14px - small text */
--font-size-base: 1rem;    /* 16px - body text */
--font-size-lg: 1.125rem;  /* 18px - lead text */
--font-size-xl: 1.25rem;   /* 20px - h4 */
--font-size-2xl: 1.5rem;   /* 24px - h3 */
--font-size-3xl: 1.875rem; /* 30px - h2 */
--font-size-4xl: 2.25rem;  /* 36px - h1 */
```

### Using Typography Tokens

```css
body {
  font-family: var(--font-sans);
  font-size: var(--font-size-base);
  line-height: var(--line-height-normal);
  color: var(--text-color);
}

h1 {
  font-size: var(--font-size-4xl);
  font-weight: var(--font-weight-bold);
  line-height: var(--line-height-tight);
}

.lead {
  font-size: var(--font-size-lg);
  line-height: var(--line-height-relaxed);
  color: var(--text-muted);
}
```

---

## Theme Switching

### CSS-Only Theme Toggle

```css
/* Default (light) theme */
:root {
  --background-main: #ffffff;
  --text-color: #1f2937;
  --surface-color: #ffffff;
}

/* Dark theme via :has() */
:root:has(#theme-dark:checked) {
  --background-main: #1f2937;
  --text-color: #f9fafb;
  --surface-color: #374151;
}

/* System preference */
:root:has(#theme-auto:checked) {
  @media (prefers-color-scheme: dark) {
    --background-main: #1f2937;
    --text-color: #f9fafb;
    --surface-color: #374151;
  }
}
```

### Complete Dark Theme Tokens

```css
:root:has(#theme-dark:checked),
:root:has(#theme-auto:checked) {
  @media (prefers-color-scheme: dark) {
    /* Surface colors */
    --background-main: #111827;
    --background-alt: #1f2937;
    --surface-color: #1f2937;
    --surface-elevated: #374151;

    /* Text colors */
    --text-color: #f9fafb;
    --text-muted: #9ca3af;

    /* Border colors */
    --border-color: #374151;
    --border-strong: #4b5563;

    /* Overlays (inverted for dark) */
    --overlay-light: rgba(255, 255, 255, 0.05);
    --overlay-medium: rgba(255, 255, 255, 0.1);
    --overlay-strong: rgba(255, 255, 255, 0.2);

    /* Shadows (more prominent in dark mode) */
    --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.3);
    --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.4);
    --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.4);
  }
}
```

---

## Component-Specific Tokens

### Form Tokens

```css
:root {
  /* Form-specific tokens */
  --form-border-color: var(--border-color);
  --form-focus-color: var(--primary-color);
  --form-valid-color: var(--success-color);
  --form-invalid-color: var(--error-color);

  --form-input-padding: var(--spacing-sm) var(--spacing-md);
  --form-input-radius: var(--radius-md);
  --form-gap: var(--spacing-lg);
}
```

### Button Tokens

```css
:root {
  --button-padding: var(--spacing-sm) var(--spacing-lg);
  --button-radius: var(--radius-md);
  --button-font-weight: var(--font-weight-semibold);

  --button-primary-bg: var(--primary-color);
  --button-primary-text: var(--text-inverted);
  --button-primary-hover: var(--primary-hover);
}
```

### Card Tokens

```css
:root {
  --card-padding: var(--spacing-lg);
  --card-radius: var(--radius-lg);
  --card-shadow: var(--shadow-sm);
  --card-shadow-hover: var(--shadow-md);
  --card-bg: var(--surface-color);
}
```

---

## Token Usage Patterns

### Responsive Tokens

Tokens can be overridden in media queries:

```css
:root {
  --content-padding: var(--spacing-lg);
}

@media (max-width: 768px) {
  :root {
    --content-padding: var(--spacing-md);
  }
}
```

### Scoped Tokens

Override tokens for specific components:

```css
dialog {
  --surface-color: var(--background-main);
  --shadow: var(--shadow-xl);
}

nav {
  --link-color: var(--text-inverted);
  --link-hover-bg: var(--overlay-light);
}
```

---

## Naming Guidelines

### Do

```css
/* Descriptive, purpose-based names */
--primary-color
--spacing-md
--font-size-lg
--shadow-sm
--border-radius
```

### Don't

```css
/* Avoid value-based names */
--blue
--16px
--large
--light-shadow
--8px-radius
```

### Semantic vs Literal

| ❌ Literal | ✅ Semantic |
|-----------|-------------|
| `--blue` | `--primary-color` |
| `--red` | `--error-color` |
| `--gray-500` | `--text-muted` |
| `--16px` | `--spacing-md` |

---

## Checklist

When creating or extending tokens:

- [ ] All values use tokens (no magic numbers)
- [ ] Token names describe purpose, not value
- [ ] Spacing uses the consistent scale (xs, sm, md, lg, xl)
- [ ] Colors include semantic variants (success, error, etc.)
- [ ] Typography includes size, weight, and line-height tokens
- [ ] Effects include shadows, transitions, and radii
- [ ] Dark theme overrides all necessary tokens
- [ ] Tokens are organized in `_tokens.css`
- [ ] Tokens are in the `tokens` layer

---

## Starter Template

Copy this as a starting point:

```css
/* _tokens.css */
@layer tokens {
  :root {
    /* Colors */
    --primary-color: #2563eb;
    --secondary-color: #64748b;
    --success-color: #059669;
    --warning-color: #d97706;
    --error-color: #dc2626;

    --background-main: #ffffff;
    --surface-color: #ffffff;
    --text-color: #1f2937;
    --text-muted: #6b7280;
    --border-color: #e5e7eb;

    /* Spacing */
    --spacing-xs: 0.25rem;
    --spacing-sm: 0.5rem;
    --spacing-md: 1rem;
    --spacing-lg: 1.5rem;
    --spacing-xl: 2rem;

    /* Typography */
    --font-sans: system-ui, sans-serif;
    --font-size-sm: 0.875rem;
    --font-size-base: 1rem;
    --font-size-lg: 1.125rem;
    --font-weight-normal: 400;
    --font-weight-semibold: 600;
    --line-height-normal: 1.5;

    /* Effects */
    --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
    --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
    --transition-normal: 0.3s ease;
    --radius-md: 0.375rem;
  }
}
```
