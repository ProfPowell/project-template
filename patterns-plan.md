# Patterns System Plan

A component and pattern library for building predictable sites and applications.

## Vision

Create a unified pattern system that:
- Works for both content sites and web applications
- Provides HTML-only baselines with optional Web Component enhancements
- Organizes patterns by function (Open UI style)
- Enables rapid, predictable assembly of pages and interfaces

## Inspiration Sources

- **Nordhealth Design System** - Template-based, multi-theme, component categories
- **Open UI** - Specification-driven, research-based component definitions
- **Our Philosophy** - HTML-first, progressive enhancement, semantic elements

---

## Pattern Categories (Open UI Style)

### 1. Form Patterns
Interactive input components for data collection.

| Pattern | Description | Baseline HTML | Enhancement |
|---------|-------------|---------------|-------------|
| `text-field` | Single-line input with label, validation | `<form-field>` | Live validation |
| `text-area` | Multi-line input | `<form-field>` | Auto-resize |
| `select-field` | Dropdown selection | `<form-field>` + `<select>` | Searchable |
| `checkbox-group` | Multiple choice | `<fieldset>` + checkboxes | Select all |
| `radio-group` | Single choice | `<fieldset>` + radios | - |
| `toggle-switch` | On/off toggle | checkbox + CSS | Animated |
| `date-picker` | Date selection | `<input type="date">` | Calendar popover |
| `file-upload` | File selection | `<input type="file">` | Drag-drop, preview |
| `range-slider` | Value range | `<input type="range">` | Dual-handle |
| `search-field` | Search input | `<input type="search">` | Autocomplete |

**Composite Form Patterns:**
| Pattern | Description |
|---------|-------------|
| `login-form` | Email/password + remember me + forgot link |
| `signup-form` | Registration with validation |
| `contact-form` | Name, email, message, submit |
| `checkout-form` | Multi-step payment flow |
| `settings-form` | Grouped preference sections |
| `filter-form` | Inline filtering controls |

### 2. Navigation Patterns
Wayfinding and page structure elements.

| Pattern | Description | Baseline HTML | Enhancement |
|---------|-------------|---------------|-------------|
| `site-header` | Primary navigation bar | `<header>` + `<nav>` | Sticky, animated |
| `site-footer` | Footer with links | `<footer>` | - |
| `nav-menu` | Navigation list | `<nav>` + `<ul>` | Dropdowns |
| `breadcrumbs` | Location trail | `<nav>` + `<ol>` | - |
| `tabs` | Tabbed interface | radios + CSS | ARIA tabs |
| `sidebar` | Side navigation | `<aside>` + `<nav>` | Collapsible |
| `pagination` | Page navigation | `<nav>` + links | Infinite scroll |
| `steps` | Progress steps | `<ol>` + data attrs | Animated |
| `toc` | Table of contents | `<nav>` + `<ol>` | Scroll spy |
| `skip-link` | Accessibility skip | `<a>` hidden | - |

### 3. Content Patterns
Display and presentation of information.

| Pattern | Description | Baseline HTML | Enhancement |
|---------|-------------|---------------|-------------|
| `hero` | Large header section | `<section>` | Parallax, video bg |
| `feature-grid` | Feature highlights | grid of `<article>` | Animations |
| `card` | Content container | `<article>` | Hover effects |
| `product-card` | Product display | `<article>` with schema | Quick view |
| `blog-card` | Blog post preview | `<article>` | - |
| `testimonial` | Customer quote | `<blockquote>` | Carousel |
| `pricing-table` | Price comparison | `<table>` or grid | Toggle annual/monthly |
| `team-grid` | Team members | grid of `<article>` | Modal bios |
| `timeline` | Chronological events | `<ol>` | Scroll animations |
| `stats` | Key metrics | `<dl>` | Count-up animation |
| `gallery` | Image collection | `<figure>` grid | Lightbox |
| `faq-list` | Q&A accordion | `<details>` | - |
| `press-list` | Press releases | `<article>` list | - |
| `logo-cloud` | Partner/client logos | `<ul>` of images | - |

### 4. Feedback Patterns
User communication and status indication.

| Pattern | Description | Baseline HTML | Enhancement |
|---------|-------------|---------------|-------------|
| `alert` | Inline message | `<div role="alert">` | Dismissible |
| `toast` | Temporary notification | - (JS required) | Auto-dismiss |
| `banner` | Site-wide message | `<div role="banner">` | Dismissible |
| `badge` | Status indicator | `<span>` | Animated |
| `progress-bar` | Progress indicator | `<progress>` | Animated |
| `skeleton` | Loading placeholder | CSS shapes | Shimmer |
| `spinner` | Loading indicator | CSS animation | - |
| `empty-state` | No content message | `<div>` | Action CTA |
| `error-page` | Error display | `<main>` | - |
| `tooltip` | Hover information | `[popover]` | Positioned |
| `modal` | Dialog overlay | `<dialog>` | Transitions |
| `popover` | Contextual overlay | `[popover]` | - |
| `confirm` | Confirmation dialog | `<dialog>` | - |

### 5. Layout Patterns
Structural page organization.

| Pattern | Description | Baseline HTML | Enhancement |
|---------|-------------|---------------|-------------|
| `page-shell` | Basic page wrapper | `<body>` structure | - |
| `content-width` | Centered content | container CSS | - |
| `full-bleed` | Edge-to-edge section | CSS layout | - |
| `split-layout` | Two-column | CSS grid | - |
| `sidebar-layout` | Main + sidebar | CSS grid | Collapsible |
| `dashboard-layout` | App shell | CSS grid | - |
| `card-grid` | Responsive card grid | auto-fit grid | - |
| `masonry` | Pinterest-style | CSS columns | JS masonry |
| `stack` | Vertical spacing | CSS gap | - |
| `cluster` | Horizontal grouping | CSS flexbox | - |
| `divider` | Section separator | `<hr>` | - |
| `spacer` | Vertical space | CSS margin | - |

### 6. Data Patterns
Structured data display and interaction.

| Pattern | Description | Baseline HTML | Enhancement |
|---------|-------------|---------------|-------------|
| `data-table` | Tabular data | `<table-wrapper>` | Sorting, filtering |
| `data-list` | List of records | `<ul>` or `<dl>` | Virtual scroll |
| `definition-list` | Key-value pairs | `<dl>` | - |
| `key-value` | Single pair | `<div>` | - |
| `comparison-table` | Feature comparison | `<table>` | Sticky headers |
| `tree-view` | Hierarchical data | nested `<ul>` | Expand/collapse |
| `calendar` | Date grid | `<table>` | Event support |
| `chart-wrapper` | Chart container | `<figure>` | Chart.js/etc |

---

## Page Templates

Complete page compositions from patterns.

### Marketing/Content Pages

| Template | Patterns Used |
|----------|---------------|
| `homepage` | hero, feature-grid, testimonial, stats, cta, logo-cloud |
| `about` | hero, team-grid, timeline, stats |
| `contact` | hero, contact-form, map-embed |
| `pricing` | hero, pricing-table, faq-list |
| `product-listing` | hero, filter-form, product-card grid, pagination |
| `product-detail` | gallery, product-info, tabs, testimonial |
| `blog-listing` | hero, blog-card grid, sidebar, pagination |
| `blog-post` | article layout, toc, author-bio, related-posts |
| `press` | hero, press-list, logo-cloud |
| `legal` | content-width, prose, toc |
| `faq` | hero, faq-list |

### Application Pages

| Template | Patterns Used |
|----------|---------------|
| `login` | centered login-form |
| `signup` | centered signup-form |
| `dashboard` | dashboard-layout, stats, data-table, charts |
| `settings` | sidebar-layout, settings-form |
| `profile` | split-layout, avatar, settings-form |
| `list-view` | filter-form, data-table, pagination |
| `detail-view` | tabs, data sections, actions |
| `error-404` | error-page |
| `error-500` | error-page |

---

## Pattern Definition Structure

Each pattern should be documented with:

```markdown
## Pattern Name

### Description
What this pattern is and when to use it.

### Anatomy
- Part 1: Description
- Part 2: Description

### States
- Default
- Hover/Focus
- Active
- Disabled
- Loading
- Error

### Variants
- Size: small, medium, large
- Style: primary, secondary, ghost

### Baseline HTML
\`\`\`html
<!-- Semantic HTML that works without JS -->
\`\`\`

### Enhanced HTML
\`\`\`html
<!-- With Web Component wrapper -->
\`\`\`

### CSS
\`\`\`css
/* Styling with tokens and data attributes */
\`\`\`

### JavaScript (optional)
\`\`\`javascript
/* Web Component enhancement */
\`\`\`

### Accessibility
- ARIA requirements
- Keyboard navigation
- Screen reader behavior

### Examples
- Basic usage
- With variants
- In composition
```

---

## Implementation Phases

### Phase 1: Foundation (Priority)
Establish the pattern infrastructure.

**Tasks:**
1. Create pattern documentation structure in `/docs/patterns/`
2. Define pattern definition schema (JSON Schema for validation)
3. Create `/add-pattern` slash command for scaffolding
4. Update `elements.json` schema to support pattern metadata
5. Create pattern generator script

**Deliverables:**
- `/docs/patterns/` directory structure
- Pattern definition template
- Slash command for pattern creation
- Updated elements.json

### Phase 2: Navigation & Layout
Core structural patterns for page assembly.

**Patterns to implement:**
- `site-header` with responsive nav
- `site-footer`
- `sidebar-layout`
- `page-shell`
- `content-width` / `full-bleed`
- `breadcrumbs`
- `skip-link`

**Deliverables:**
- 7 navigation/layout patterns documented
- Updated elements.json with new elements
- Example page using these patterns

### Phase 3: Content Blocks
Marketing and content display patterns.

**Patterns to implement:**
- `hero` (multiple variants)
- `feature-grid`
- `card` / `product-card` / `blog-card`
- `testimonial`
- `stats`
- `cta`
- `logo-cloud`
- `faq-list` (already exists, enhance)

**Deliverables:**
- 8+ content patterns documented
- Homepage example using content patterns
- Landing page template

### Phase 4: Form Patterns
Input and form composition patterns.

**Patterns to implement:**
- Enhance existing `form-field`
- `checkbox-group` / `radio-group`
- `toggle-switch`
- `file-upload`
- `search-field`
- `login-form` / `signup-form` / `contact-form`

**Deliverables:**
- 6+ form patterns documented
- Auth page templates
- Form validation examples

### Phase 5: Feedback & Data
Status indication and data display.

**Patterns to implement:**
- `alert` / `banner`
- `toast`
- `modal` / `popover`
- `empty-state`
- `skeleton`
- `data-table` (enhance existing)
- `pagination`

**Deliverables:**
- 7+ feedback/data patterns documented
- Dashboard template example
- Data-heavy page template

### Phase 6: Templates & Composition
Complete page templates and composition guidelines.

**Tasks:**
- Create all marketing page templates
- Create all application page templates
- Document composition patterns
- Create template generator command

**Deliverables:**
- 10+ page templates
- `/scaffold-page` slash command
- Composition guidelines document

---

## File Structure

```
project-template/
├── .claude/
│   └── skills/
│       └── patterns/
│           ├── SKILL.md              # Updated pattern guidance
│           ├── PATTERNS.md           # Pattern catalog
│           ├── TEMPLATES.md          # Template catalog
│           └── COMPOSITION.md        # Combining patterns
├── docs/
│   └── patterns/
│       ├── index.html                # Pattern library browser
│       ├── form/                     # Form patterns
│       ├── navigation/               # Navigation patterns
│       ├── content/                  # Content patterns
│       ├── feedback/                 # Feedback patterns
│       ├── layout/                   # Layout patterns
│       └── data/                     # Data patterns
├── examples/
│   └── patterns/
│       ├── components/               # Individual pattern examples
│       └── pages/                    # Full page template examples
├── elements.json                     # Custom element registry
└── patterns.json                     # Pattern metadata registry
```

---

## Success Criteria

1. **Discoverability**: Patterns are easy to find and understand
2. **Composability**: Patterns combine predictably
3. **Consistency**: All patterns follow the same structure
4. **Accessibility**: All patterns meet WCAG2AA
5. **Progressive**: Works without JS, enhanced with Web Components
6. **Themeable**: Works with our token system and dark mode
7. **Documented**: Clear examples and usage guidelines
8. **Validated**: Linting catches pattern misuse

---

## Open Questions

1. Should patterns have their own CSS files or stay in skill documentation?
2. Do we need a pattern "registry" beyond elements.json?
3. Should we generate TypeScript types for pattern props?
4. How do we handle pattern versioning/deprecation?
5. Should patterns include microdata/JSON-LD schemas?

---

## Next Steps

1. Review and approve this plan
2. Create beads for Phase 1 foundation work
3. Establish pattern documentation format with first pattern
4. Build out patterns incrementally by phase
