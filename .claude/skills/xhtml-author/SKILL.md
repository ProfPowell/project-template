---
name: xhtml-author
description: Write valid XHTML-strict HTML5 markup. Use when creating HTML files, editing markup, building web pages, or writing any HTML content. Ensures semantic structure and XHTML syntax.
allowed-tools: Read, Write, Edit, Glob, Grep
---

# XHTML Authoring Skill

## Syntax Rules (MUST follow)

1. **Self-closing void elements**: `<br/>`, `<hr/>`, `<img/>`, `<meta/>`, `<link/>`, `<input/>`
2. **Lowercase everything**: Tags and attributes must be lowercase
3. **Quote all attributes**: Always use double quotes `attr="value"`
4. **Close all tags**: No implicit closing
5. **Single h1**: One `<h1>` per page only
6. **Lowercase doctype**: Use `<!doctype html>` not `<!DOCTYPE html>`

## Semantic Structure (MUST use)

Use semantic HTML5 elements instead of `<div>`:

| Element | Purpose |
|---------|---------|
| `<header>` | Page or section header |
| `<nav>` | Navigation blocks |
| `<main>` | Primary content (one per page) |
| `<article>` | Self-contained content |
| `<section>` | Thematic grouping with heading |
| `<aside>` | Tangentially related content |
| `<footer>` | Page or section footer |
| `<figure>` | Self-contained media with caption |
| `<figcaption>` | Caption for figure |
| `<hgroup>` | Heading group |

## Div Alternatives (NEVER use `<div>`)

The `<div>` element is **blacklisted** in this project. Always use semantic alternatives:

| Instead of... | Use... |
|---------------|--------|
| `<div class="header">` | `<header>` |
| `<div class="nav">` | `<nav>` |
| `<div class="footer">` | `<footer>` |
| `<div class="sidebar">` | `<aside>` |
| `<div class="content">` | `<main>` or `<article>` |
| `<div class="section">` | `<section>` with heading |
| `<div class="card">` | `<article>` or custom element like `<product-card>` |
| `<div class="wrapper">` | Style the parent element directly |
| `<div class="container">` | Use CSS on `<body>` or parent landmark |
| `<div class="grid">` | `<ul>` or `<ol>` with CSS grid |

### Layout Wrappers

For layout constraints (centering, max-width), apply CSS directly to semantic elements:

```css
/* Instead of <div class="header-content"> inside <header> */
header {
  max-width: var(--max-width);
  margin-inline: auto;
  padding-inline: var(--space-md);
}

/* For edge-to-edge backgrounds with centered content */
header {
  background: var(--color-primary);
  /* Use padding for the content area */
  padding: var(--space-md) max(var(--space-md), calc((100% - var(--max-width)) / 2));
}
```

### When No Semantic Element Exists

If you truly need a generic container (rare), use a custom element with semantic naming:

```html
<x-layout-grid>...</x-layout-grid>
<x-card-group>...</x-card-group>
```

## Template

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1"/>
  <title>Page Title</title>
</head>
<body>
  <header>
    <nav aria-label="Main navigation">
      <ul>
        <li><a href="#main">Skip to content</a></li>
      </ul>
    </nav>
    <h1>Main Heading</h1>
  </header>

  <main id="main">
    <article>
      <h2>Article Title</h2>
      <p>Content here.</p>
    </article>
  </main>

  <footer>
    <p>Footer content</p>
  </footer>
</body>
</html>
```

## Void Elements (self-closing)

These elements MUST use self-closing syntax:

```html
<area/>
<base/>
<br/>
<col/>
<embed/>
<hr/>
<img src="photo.jpg" alt="Description"/>
<input type="text" name="field"/>
<link rel="stylesheet" href="style.css"/>
<meta charset="utf-8"/>
<source src="video.mp4" type="video/mp4"/>
<track src="captions.vtt" kind="captions"/>
<wbr/>
```

## Custom Elements

- Defined elements: Check `elements.json` for available custom elements
- Ad-hoc elements: Use `x-*` prefix for one-off custom elements

See [SYNTAX.md](SYNTAX.md) for complete syntax rules.
See [ELEMENTS.md](ELEMENTS.md) for semantic element guidance.
See [EXAMPLES.md](EXAMPLES.md) for code examples.

## Related Skills

- **css-author** - Modern CSS organization with native @import, @layer casca...
- **javascript-author** - Write vanilla JavaScript for Web Components with function...
- **accessibility-checker** - Ensure WCAG2AA accessibility compliance
- **forms** - HTML-first form patterns with CSS-only validation
