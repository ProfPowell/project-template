# XHTML-Test

A comprehensive HTML validation and authoring system enforcing XHTML-strict syntax with HTML5 semantic elements. Designed for use with Claude Code to create valid, accessible, semantic HTML pages using modern HTML-first development patterns.

## Philosophy

**HTML first, CSS for enhancement, JavaScript only when necessary.**

This project embraces progressive enhancement where every feature starts with semantic HTML that works without CSS or JavaScript:

### Core Principles

- Use **HTML5 semantic elements** (`<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<aside>`, `<footer>`)
- Apply **XHTML-strict syntax** (self-closing tags, lowercase elements, quoted attributes)
- Avoid `<div>` elements except for simple grouping
- Use **custom elements** (`<element-name>`) as semantic wrappers without JavaScript
- Enforce **WCAG2AA accessibility** standards
- Validate **spelling and grammar** in content
- Use **data-* attributes** for state, variants, and configuration (not classes)
- Apply **CSS layers** (`@layer`) for cascade control
- Leverage **native CSS** features (nesting, custom properties, `:has()`)
- Build **responsive images** with `<picture>`, `srcset`, and modern formats

### The Enhancement Layers

```
Layer 1: HTML      → Works in any browser, screen readers, search engines
Layer 2: CSS       → Layout, theming, validation feedback, animations
Layer 3: JS (opt)  → Enhanced interactions (Web Components, functional core)
```

When JavaScript is needed, follow these patterns:

- **Web Components** for encapsulation (Shadow DOM, custom elements)
- **Functional core, imperative shell** architecture
- **JSDoc** for types and documentation
- **Named exports only** (no default exports)
- **i18n support** with language fallback chains

## How Claude Code Uses This System

### The Feedback Loop

Claude Code integrates with this validation system through **PostToolUse hooks** - shell commands that run automatically after Claude edits or creates files. This creates a tight feedback loop:

```
┌─────────────────────────────────────────────────────────────┐
│  1. Claude writes/edits HTML file                           │
│                     ↓                                       │
│  2. PostToolUse hook triggers automatically                 │
│                     ↓                                       │
│  3. Validators run and output results                       │
│                     ↓                                       │
│  4. Claude sees errors immediately                          │
│                     ↓                                       │
│  5. Claude fixes issues in next edit                        │
│                     ↓                                       │
│  6. Loop repeats until validation passes                    │
└─────────────────────────────────────────────────────────────┘
```

This means Claude **cannot produce invalid HTML** without immediately knowing about it. The validators act as guardrails, teaching Claude the project's standards through immediate feedback.

### Hook Configuration

The hooks are defined in `.claude/settings.json`:

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          { "type": "command", "command": "... HTML validators ..." },
          { "type": "command", "command": "... CSS validators ..." },
          { "type": "command", "command": "... JS validators ..." }
        ]
      }
    ]
  }
}
```

**How it works:**

1. **Matcher**: `Edit|Write` triggers on any file edit or creation
2. **File detection**: Extracts the file path from Claude's tool input
3. **Filter by extension**:
   - `.html/.xhtml/.htm` → html-validate, htmlhint, pa11y
   - `.css` → stylelint
   - `.js` → eslint
4. **Fix suggestions**: Output is piped through `fix-suggestions.js` which analyzes errors and suggests fixes
5. **Output**: Results appear in Claude's context with actionable fix commands

### Slash Commands

Custom slash commands extend Claude's capabilities:

| Command | Purpose |
|---------|---------|
| `/add-element` | Define a new custom HTML element with validation rules |
| `/add-word` | Add words to the spelling dictionary |
| `/add-picture` | Convert `<img>` to `<picture>` with AVIF/WebP sources |
| `/add-css-tokens` | Generate a CSS design token system |
| `/add-css-file` | Create a scoped CSS file (component/section/page) |
| `/add-form-field` | Generate an accessible form field with `<output>` |
| `/add-toc` | Generate table of contents from markdown headings |
| `/add-frontmatter` | Add YAML frontmatter template (blog, docs, changelog) |
| `/add-callout` | Insert callout block (note, tip, warning, danger) |
| `/add-code-block` | Insert fenced code block with language identifier |
| `/health` | Run project health dashboard across all validators |
| `/uat` | Request, approve, or deny user acceptance testing |

These are markdown files in `.claude/commands/` that Claude interprets as instructions.

### Why This Architecture?

| Approach | Pros | Cons |
|----------|------|------|
| **Pre-commit hooks** | Catches errors before commit | Too late - errors already written |
| **IDE plugins** | Real-time feedback | Doesn't help AI assistants |
| **CI/CD validation** | Comprehensive | Way too late - PR already created |
| **PostToolUse hooks** | Immediate feedback to AI | Specific to Claude Code |

The PostToolUse hook approach is ideal for AI-assisted development because:

- Feedback is **immediate** (same conversation turn)
- Errors are **contextual** (Claude knows what it just wrote)
- Fixes are **automatic** (Claude corrects without user intervention)
- Standards are **enforced** (not just suggested)

### Skills - Front-Loading Knowledge

In addition to hooks (which catch errors AFTER writing), this project uses **Claude Code Skills** to provide guidance BEFORE writing. Skills are automatically activated when Claude recognizes relevant context.

```
┌─────────────────────────────────────────────────────────────┐
│  1. Skills activate (BEFORE writing)                        │
│     - xhtml-author: XHTML syntax rules loaded               │
│     - accessibility-checker: Form/image patterns loaded     │
│     - forms: Form-field patterns with validation loaded     │
│     - css-architecture: CSS organization patterns loaded    │
│     - responsive-images: Picture/srcset patterns loaded     │
│     - data-attributes: State management patterns loaded     │
│                                                             │
│  2. Claude writes HTML/CSS with skills guidance             │
│     - Uses semantic elements correctly                      │
│     - Self-closes void elements                             │
│     - Applies form-field pattern with <output>              │
│     - Uses data-* attributes for state                      │
│     - Includes responsive images with srcset                │
│                                                             │
│  3. Hook triggers (AFTER writing)                           │
│     - Validators verify: ✓ passes on first attempt          │
└─────────────────────────────────────────────────────────────┘
```

**Available Skills (20 total):**

| Skill | Auto-Triggers When | Purpose |
|-------|-------------------|---------|
| `xhtml-author` | Creating/editing HTML | XHTML syntax rules, semantic elements |
| `accessibility-checker` | Creating forms, images, nav | WCAG2AA patterns |
| `content-writer` | Writing content/prose | Spelling, grammar awareness |
| `custom-elements` | Using custom components | Element definitions, schemas |
| `i18n` | Multilingual content, lang attributes | Internationalization, RTL, hreflang |
| `patterns` | Building common page types | Reusable content blocks, page structures |
| `performance` | Optimizing page load | Resource hints, lazy loading, Core Web Vitals |
| `metadata` | Writing `<head>` content | SEO, Open Graph, performance hints |
| `markdown-author` | Creating/editing .md files | CommonMark/GFM, frontmatter, structure |
| `forms` | Building forms | `<form-field>` pattern, `<output>` validation, HTML5 attributes |
| `css-architecture` | Organizing CSS | `@layer`, `@import`, nesting, element-focused selectors |
| `data-attributes` | Managing state/variants | `data-*` as HTML/CSS/JS bridge |
| `responsive-images` | Adding images | `<picture>`, `srcset`, `sizes`, modern formats |
| `security` | Forms, user input, external resources | CSP, SRI, XSS prevention, HTTPS |
| `progressive-enhancement` | CSS-only interactivity | `:has()`, checkbox hacks, View Transitions |
| `design-tokens` | Design system setup | CSS custom properties, theming |
| `javascript-author` | Creating/editing JS | Web Components, JSDoc, i18n, events, accessibility |
| `pre-flight-check` | Before creating/editing files | Checklists, pattern matching, issue prevention |
| `git-workflow` | Starting work on issues | Conventional commits, feature branches, UAT workflow |
| `site-scaffold` | Creating new sites | Standard structure, favicon set, PWA, SEO files |

Skills are located in `.claude/skills/` and contain:

- `SKILL.md` - Main skill definition with YAML frontmatter
- Supporting files - Detailed references (SYNTAX.md, FORMS.md, etc.)

### The Complete Architecture

```
┌─────────────────────────────────────────────────────────────┐
│  Skills         → Guidance BEFORE writing (14 auto-activated)│
│  Hooks          → Enforcement AFTER writing (auto-run)      │
│  Slash Commands → User-triggered actions (/add-element)     │
│  Config Files   → Validator rules (.htmlvalidate.json, etc) │
│  Profiles       → Page-type metadata requirements (JSON)    │
│  npm Scripts    → Manual validation (npm run lint:all)      │
│  Task Tracking  → Issue management (bd/beads)               │
│  Demo Site      → Reference implementation (examples/demo-site/) │
│  Demo Code      → JavaScript patterns (examples/demo-code/)      │
└─────────────────────────────────────────────────────────────┘
```

### Task Tracking with Beads

This project uses **bd** (Beads) for AI-native issue tracking. Beads stores issues in `.beads/` alongside your code, making it ideal for AI-assisted development.

```bash
# Find available work
bd ready

# View issue details
bd show <id>

# Create an issue
bd create --title="Add dark mode" --type=feature

# Claim and complete work
bd update <id> --status in_progress
bd close <id>

# Sync with git
bd sync
```

Claude Code hooks automatically call `bd prime` at session start to load issue context. See `AGENTS.md` for detailed workflow instructions.

---

## Using This System in Other Projects

### Option 1: Copy the Configuration Files

Copy these files to your project:

```bash
# Required files
.htmlvalidate.json    # XHTML validation rules
.htmlhintrc           # HTML linting rules
.pa11yci              # Accessibility config
.stylelintrc.json     # CSS linting rules
eslint.config.js      # JavaScript linting rules
.cspell.json          # Spelling config
.textlintrc.json      # Grammar config
elements.json         # Custom element definitions
project-words.txt     # Custom dictionary

# Claude Code integration
.claude/settings.json # Hook configuration
.claude/commands/     # Slash commands
.claude/skills/       # Guidance skills (19 skills)

# Custom scripts
scripts/metadata-check.js  # Metadata validation
```

Then install dependencies:

```bash
npm install --save-dev html-validate htmlhint pa11y stylelint stylelint-config-standard eslint @eslint/js cspell textlint textlint-plugin-html textlint-rule-write-good link-checker linkinator
```

### Option 2: Extend Your Existing Project

Add to your `package.json`:

```json
{
  "scripts": {
    "lint:html": "html-validate '**/*.html' && htmlhint '**/*.html'",
    "lint:css": "stylelint '**/*.css'",
    "lint:js": "eslint '**/*.js'",
    "lint:a11y": "pa11y",
    "lint:spelling": "cspell '**/*.html'",
    "lint:grammar": "textlint '**/*.html'",
    "lint:meta": "node scripts/metadata-check.js",
    "lint:all": "npm run lint:html && npm run lint:css && npm run lint:js && npm run lint:spelling && npm run lint:meta"
  },
  "devDependencies": {
    "html-validate": "^8.24.0",
    "htmlhint": "^1.1.4",
    "pa11y": "^8.0.0",
    "stylelint": "^16.0.0",
    "stylelint-config-standard": "^39.0.0",
    "eslint": "^9.0.0",
    "@eslint/js": "^9.0.0",
    "cspell": "^8.0.0",
    "textlint": "^14.0.0",
    "textlint-plugin-html": "^1.0.0",
    "textlint-rule-write-good": "^2.0.0",
    "link-checker": "^1.4.2"
  }
}
```

### Option 3: Use as a Template

Fork or clone this repository as a starting point:

```bash
git clone https://github.com/your-org/xhtml-test my-html-project
cd my-html-project
rm -rf examples/pages/  # Remove example pages
npm install
```

### Customizing for Your Project

#### Adjust XHTML Strictness

Edit `.htmlvalidate.json` to relax or tighten rules:

```json
{
  "rules": {
    "void-style": ["error", { "style": "selfclosing" }],  // or "omit" for HTML5 style
    "no-inline-style": "warn",  // Downgrade to warning
    "heading-level": "off"      // Disable entirely
  }
}
```

#### Add Project-Specific Elements

Edit `elements.json` to define your component library:

```json
{
  "my-component": {
    "flow": true,
    "permittedContent": ["@flow"],
    "attributes": {
      "variant": { "enum": ["primary", "secondary"] }
    }
  }
}
```

#### Configure Accessibility Standard

Edit `.pa11yci` to change WCAG level:

```json
{
  "defaults": {
    "standard": "WCAG2A"    // or "WCAG2AA" or "WCAG2AAA"
  }
}
```

#### Build Your Dictionary

Add industry terms to `project-words.txt`:

```
# Company terms
Acme
AcmeCloud
AcmeDB

# Product names
ProWidget
SuperService

# Technical jargon
sharding
microservice
kubernetes
```

#### Create Custom Metadata Profiles

Add page-type metadata profiles to `.claude/skills/metadata/profiles/`:

```json
{
  "name": "landing-page",
  "extends": "default",
  "required": [
    { "property": "og:image", "message": "Landing pages need social share images" }
  ],
  "recommended": [
    { "name": "twitter:card", "content": "summary_large_image" }
  ]
}
```

Then validate with: `node scripts/metadata-check.js --profile=landing-page`

### Integration with CI/CD

Add validation to your build pipeline:

```yaml
# GitHub Actions example
- name: Validate HTML
  run: |
    npm run lint:html
    npm run lint:a11y -- examples/pages/*.html
    npm run lint:spelling
    npm run lint:meta
```

### Integration with Pre-commit Hooks

Using husky and lint-staged:

```json
{
  "lint-staged": {
    "*.html": [
      "html-validate",
      "htmlhint",
      "cspell --no-must-find-files"
    ]
  }
}
```

---

## Modern Development Patterns

This project promotes several modern HTML and CSS patterns that prioritize native browser capabilities over JavaScript frameworks.

### Data Attributes Over Classes

Use `data-*` attributes for state, variants, and configuration instead of classes:

```html
<!-- State management -->
<nav data-expanded="false">...</nav>
<button data-state="loading">Submit</button>

<!-- Variants -->
<status-badge data-type="success">Active</status-badge>
<tag-topic data-topic="css">CSS</tag-topic>

<!-- Configuration -->
<gallery-grid data-columns="3">...</gallery-grid>
```

```css
/* CSS targets data attributes */
nav[data-expanded="true"] { max-height: 500px; }
button[data-state="loading"] { opacity: 0.6; }
tag-topic[data-topic="css"] { background: var(--tag-css-bg); }
```

**Why data-* over classes:**

- Semantically meaningful (describes what, not how)
- Clean JS integration via `dataset` API
- Can validate allowed values in `elements.json`
- Self-documenting markup

### The Form Field Pattern

Forms use the `<form-field>` custom element with `<output>` for accessible validation:

```html
<form-field>
  <label for="email">Email</label>
  <input type="email" id="email" name="email"
         required aria-describedby="email-msg"/>
  <output id="email-msg" for="email" aria-live="polite">
    Please enter a valid email address
  </output>
</form-field>
```

CSS provides validation feedback without JavaScript:

```css
form-field:has(input:user-valid) output { color: var(--success-color); }
form-field:has(input:user-invalid) output { color: var(--error-color); }
```

### Responsive Images

Images should use `srcset` and `sizes` for optimal file selection, and `<picture>` for format fallbacks:

```html
<picture>
  <source type="image/avif"
          srcset="photo-400.avif 400w, photo-800.avif 800w"
          sizes="(max-width: 600px) 100vw, 800px"/>
  <source type="image/webp"
          srcset="photo-400.webp 400w, photo-800.webp 800w"
          sizes="(max-width: 600px) 100vw, 800px"/>
  <img src="photo-800.jpg"
       srcset="photo-400.jpg 400w, photo-800.jpg 800w"
       sizes="(max-width: 600px) 100vw, 800px"
       alt="Description"
       loading="lazy"
       decoding="async"/>
</picture>
```

### CSS Architecture

Stylesheets use native `@import` with `@layer` for organization without build tools:

```css
/* main.css */
@layer reset, tokens, layout, sections, components, pages, responsive;

@import "_reset.css" layer(reset);
@import "_tokens.css" layer(tokens);
@import "_layout.css" layer(layout);
@import "sections/_header.css" layer(sections);
@import "components/_gallery.css" layer(components);
@import "pages/_home.css" layer(pages);
```

**File hierarchy:**

- `_tokens.css` - Design system variables (colors, spacing, typography)
- `_layout.css` - Site-wide structure
- `sections/` - Recurring parts (header, footer)
- `components/` - Reusable elements (cards, forms)
- `pages/` - Page-specific styles

### CSS-Only Interactivity

Many interactive patterns work without JavaScript:

```css
/* Theme toggle with :has() */
:root:has(#theme-dark:checked) {
  --background: #1f2937;
  --text: #f9fafb;
}

/* Mobile nav with checkbox hack */
#nav-toggle:checked ~ nav { max-height: 500px; }

/* Form validation with :user-valid/:user-invalid */
input:user-valid { border-color: var(--success-color); }
input:user-invalid { border-color: var(--error-color); }
```

### View Transitions

Enable smooth page-to-page animations with a single meta tag:

```html
<meta name="view-transition" content="same-origin"/>
```

See the `examples/demo-site/` directory and `demosite-summary.md` for comprehensive examples of all these patterns in action.

---

## Quick Start

```bash
# Install dependencies
npm install

# Run all structural validators
npm run lint

# Run accessibility check
npm run a11y:all

# Run content quality checks
npm run lint:content

# Run tests
npm test
```

## Validation Pipeline

### Automatic (Claude Code Hook)

When editing files in Claude Code, validators run automatically:

**HTML files** (`.html`, `.xhtml`, `.htm`):

```
=== html-validate ===
(XHTML strictness, custom elements, semantics)

=== htmlhint ===
(Inline checks, structure, special chars)

=== pa11y (WCAG2AA) ===
(Accessibility: contrast, labels, ARIA, focus)
```

**CSS files** (`.css`):

```
=== stylelint ===
(Nesting depth, layer patterns, duplicates, specificity)
```

**JavaScript files** (`.js`):

```
=== eslint ===
(no-var, named exports, JSDoc, modern patterns)
```

### Manual Scripts

| Command | Purpose |
|---------|---------|
| `npm run lint` | Run html-validate + htmlhint on all HTML files |
| `npm run lint:css` | Run stylelint on all CSS files |
| `npm run lint:css:fix` | Auto-fix CSS issues |
| `npm run lint:js` | Run eslint on all JavaScript files |
| `npm run lint:js:fix` | Auto-fix JavaScript issues |
| `npm run lint:markdown` | Run markdownlint on all Markdown files |
| `npm run lint:markdown:fix` | Auto-fix Markdown issues |
| `npm run lint:complexity` | Analyze JavaScript code complexity |
| `npm run lint:images` | Check image files (size, modern formats) |
| `npm run lint:images:html` | Check `<img>` elements (loading, srcset) |
| `npm run lint:links` | Check internal links |
| `npm run lint:links:remote` | Check external links (network required) |
| `npm run lint:spelling` | Spell check with custom dictionary |
| `npm run lint:grammar` | Grammar/style suggestions (advisory) |
| `npm run lint:readability` | Check content readability (Flesch-Kincaid scores) |
| `npm run lint:meta` | Check metadata completeness (SEO, Open Graph, etc.) |
| `npm run lint:seo` | Analyze SEO content quality (keyword density, structure) |
| `npm run lint:budget` | Check resource budgets (JS, CSS, images, fonts) |
| `npm run lint:vitals` | Analyze Core Web Vitals readiness |
| `npm run lint:site` | Check site infrastructure (favicon, robots.txt, 404, etc.) |
| `npm run lint:content` | Combined spelling + grammar + readability |
| `npm run lint:all` | Full validation (HTML + CSS + JS + images + content + metadata) |
| `npm run lint:changed` | Validate only git-changed files (incremental) |
| `npm run lint:staged` | Validate only git-staged files (pre-commit) |
| `npm run optimize:images` | Generate WebP/AVIF versions of images |
| `npm run a11y:all` | Run pa11y on all example files |
| `npm run health` | Project health dashboard (all validators summary) |
| `npm test` | Run test suite (136 tests) |
| `npm run test:all` | Run all tests with Node.js test runner |
| `npm run test:watch` | Run tests in watch mode |
| `npm run lighthouse` | Run Lighthouse CI audit |

## Validators

### html-validate

Enforces XHTML-strict syntax rules:

- **Self-closing void elements**: `<br/>`, `<hr/>`, `<img/>`, `<meta/>`, `<link/>`, `<input/>`
- **Lowercase elements and attributes**
- **Double-quoted attribute values**
- **Proper tag nesting and closing**
- **Single `<h1>` per page**
- **No inline styles**
- **Semantic elements preferred over `<div>`**

Configuration: `.htmlvalidate.json`

### htmlhint

Additional syntax and best practice checks:

- DOCTYPE required (HTML5)
- Title tag required
- Alt text required on images
- Form inputs require labels
- No inline scripts or styles
- ID uniqueness
- Special character escaping

Configuration: `.htmlhintrc`

### pa11y

WCAG2AA accessibility testing with dual engines (HTML CodeSniffer + axe-core):

- Color contrast ratios
- Form labels and ARIA
- Heading hierarchy
- Link text clarity
- Keyboard navigation
- Screen reader compatibility

Configuration: `.pa11yci`

### stylelint

CSS validation with modern feature support:

- Max nesting depth (3 levels)
- Layer name patterns (`@layer`)
- Duplicate property detection
- Descending specificity warnings
- Custom property validation

Configuration: `.stylelintrc.json`

### eslint

JavaScript validation for vanilla JS and Web Components:

- **no-var, prefer-const** - Use `const` exclusively
- **no-restricted-exports** - Named exports only (no default)
- **prefer-template** - Template literals for strings
- **camelcase** - Consistent naming conventions
- **eqeqeq** - Strict equality only
- **object-shorthand** - Modern object syntax
- **no-console** - Encourage logDebug pattern (warning)
- **no-nested-ternary** - Clear code structure

**Complexity analysis** (run via `npm run lint:complexity`):

| Rule | Threshold | Purpose |
|------|-----------|---------|
| `complexity` | 10 | Max cyclomatic complexity per function |
| `max-depth` | 4 | Max nesting depth |
| `max-lines-per-function` | 50 | Max logical lines per function |
| `max-nested-callbacks` | 3 | Max callback nesting |

Configuration: `eslint.config.js` (flat config format)

### Image Validation

Two scripts validate images:

**`scripts/image-check.js`** - File validation:

- Max file size (200KB)
- Requires WebP/AVIF alternatives for JPEG/PNG
- Dimension and compression checks

**`scripts/image-html-check.js`** - HTML validation:

- `loading` attribute required
- `decoding` attribute recommended
- `srcset`/`sizes` consistency
- `<picture>` element suggestions

**`scripts/optimize-images.js`** - Generate optimized versions:

- WebP (82% quality)
- AVIF (65% quality)
- Multiple sizes for srcset (`--sizes` flag)

### cspell

Spell checking with custom dictionary support:

- Project-specific word list (`project-words.txt`)
- Ignores URLs, IDs, class names, and code
- Supports technical terms and product names

Configuration: `.cspell.json`

### textlint

Grammar and style checking (advisory):

- Passive voice detection
- Weasel words
- Wordy phrases
- Cliches

Configuration: `.textlintrc.json`

### link-checker

Internal link validation:

- Anchor references (`#section-id`)
- Relative paths
- File existence

### metadata-check

Custom metadata validation script:

- Checks `<head>` content against profiles
- Validates essential meta tags (charset, viewport, title, description)
- Warns about missing Open Graph and Twitter Card tags
- Supports page-type profiles (default, article, product)
- Extensible via JSON profile definitions

Configuration: `.claude/skills/metadata/profiles/`

## Custom Elements

Define custom elements in `elements.json`:

```json
{
  "product-card": {
    "flow": true,
    "permittedContent": ["@flow"],
    "attributes": {
      "sku": { "required": false },
      "price": { "required": false }
    }
  }
}
```

### Pre-defined Elements

**Form Elements:**

- `form-field` - Form field wrapper with label, input, and output for validation

**Components:**

- `product-card` - Product display with sku/price attributes
- `icon-element` - Void element for icons
- `user-avatar` - User avatar with src/alt/size
- `status-badge` - Status indicator with type enum (success, warning, error, info)
- `data-table` - Sortable data table
- `nav-menu` - Navigation with orientation (horizontal, vertical)

**Content Patterns:**

- `faq-list` - FAQ container with category attribute
- `faq-question` - Question text (phrasing content)
- `faq-answer` - Answer content (flow content)

Ad-hoc custom elements matching `x-*` pattern are allowed without registration.

## Content Patterns

Pages are composed of reusable **blocks** - content patterns that appear across many pages. Custom elements make these patterns explicit and self-documenting.

### FAQ Pattern

```html
<section id="products" aria-labelledby="products-heading">
  <h2 id="products-heading">Products</h2>
  <faq-list category="products">
    <faq-question id="faq-returns">What is your return policy?</faq-question>
    <faq-answer>We offer a 30-day hassle-free return policy.</faq-answer>

    <faq-question id="faq-shipping">How long does shipping take?</faq-question>
    <faq-answer>Standard shipping takes 5-7 business days.</faq-answer>
  </faq-list>
</section>
```

### Why Custom Elements for Patterns?

| Approach | Example | Drawback |
|----------|---------|----------|
| CSS classes | `<div class="faq-q">` | Intent unclear, no validation |
| Data attributes | `<div data-faq="question">` | Verbose, no content model |
| Custom elements | `<faq-question>` | Clear intent, validated structure |

Benefits of custom elements:

- **Self-documenting** - `<faq-question>` is clearer than `<dt class="faq-q">`
- **Validated** - html-validate enforces correct usage
- **Styleable** - CSS can target `faq-question { }` directly
- **Extensible** - Add attributes as needed

### Page Type Patterns

Common page structures documented in the `patterns` skill:

| Page Type | Key Sections |
|-----------|--------------|
| Homepage | Hero, featured products, news, CTA |
| About | History, mission, values, leadership |
| Product List | Category nav, product grid, filters |
| Product Detail | Hero, specs, reviews, related |
| Contact | Info, form, map, hours |
| FAQ | TOC nav, categorized Q&A sections |
| Press Release | Headline, dateline, body, boilerplate |
| Legal | Numbered sections, definitions |

See `examples/pages/` directory for implementations.

## Metadata

The `metadata` skill provides comprehensive guidance for `<head>` content. It covers:

### Categories

| Category | Elements |
|----------|----------|
| Essential | charset, viewport, title, description |
| Authorship | author, canonical, copyright |
| Bot Control | robots, googlebot directives |
| Social Sharing | Open Graph (og:*), Twitter Cards |
| Performance | preconnect, dns-prefetch, preload |
| Security | referrer policy, CSP |
| Mobile/PWA | theme-color, manifest |

### Page Type Profiles

Different pages need different metadata. Profiles define requirements:

```bash
# Check with default profile
npm run lint:meta

# Check with article profile
node scripts/metadata-check.js --profile=article examples/pages/press-release/index.html
```

Available profiles:

- `default` - Essential metadata for all pages
- `article` - Blog posts, news, press releases (adds author, published_time)
- `product` - Product pages (adds price, availability)

### Example Head

```html
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1"/>
  <title>Page Title - Site Name</title>
  <meta name="description" content="Page description (150-160 chars)."/>
  <link rel="canonical" href="https://example.com/page"/>
  <meta name="robots" content="index, follow"/>
  <meta property="og:title" content="Page Title"/>
  <meta property="og:description" content="Social description."/>
  <meta property="og:image" content="https://example.com/share.jpg"/>
  <meta name="twitter:card" content="summary_large_image"/>
</head>
```

See `.claude/skills/metadata/SKILL.md` for complete documentation.

## Adding Words to Dictionary

### Using the slash command

```
/add-word ProductName
/add-word OAuth OpenID
```

### Manual editing

Add words to `project-words.txt` (one per line).

## Project Structure

```
xhtml-test/
├── .beads/                       # Beads issue tracking
│   ├── beads.db                  # Local issue database
│   ├── config.yaml               # Beads configuration
│   └── README.md                 # Beads documentation
├── .worklog/                     # Development work logs
│   ├── README.md                 # Worklog documentation
│   ├── TEMPLATE.md               # Template for new entries
│   └── uat-*.md                  # UAT request files
├── .claude/
│   ├── settings.json          # Claude Code hooks
│   ├── commands/              # 12 slash commands
│   │   ├── add-element.md     # /add-element command
│   │   ├── add-word.md        # /add-word command
│   │   ├── add-picture.md     # /add-picture command
│   │   ├── add-css-tokens.md  # /add-css-tokens command
│   │   ├── add-css-file.md    # /add-css-file command
│   │   ├── add-form-field.md  # /add-form-field command
│   │   ├── add-toc.md         # /add-toc command (markdown)
│   │   ├── add-frontmatter.md # /add-frontmatter command (markdown)
│   │   ├── add-callout.md     # /add-callout command (markdown)
│   │   ├── add-code-block.md  # /add-code-block command (markdown)
│   │   ├── health.md          # /health command
│   │   └── uat.md             # /uat command
│   └── skills/                # 20 authoring skills
│       ├── xhtml-author/      # XHTML syntax guidance
│       ├── accessibility-checker/  # WCAG2AA patterns
│       ├── content-writer/    # Spelling/grammar awareness
│       ├── custom-elements/   # Element definitions
│       ├── patterns/          # Page type patterns
│       ├── performance/       # Resource hints, lazy loading, Web Vitals
│       ├── metadata/          # SEO, Open Graph, performance hints
│       ├── markdown-author/   # CommonMark/GFM, frontmatter, structure
│       ├── forms/             # Form-field pattern, <output> validation
│       ├── i18n/              # Internationalization, lang, dir, hreflang
│       ├── css-architecture/  # @layer, @import, nesting patterns
│       ├── data-attributes/   # State/variant management with data-*
│       ├── responsive-images/ # <picture>, srcset, sizes, formats
│       ├── security/         # CSP, SRI, XSS prevention, HTTPS
│       ├── progressive-enhancement/  # CSS-only interactivity
│       ├── design-tokens/     # CSS custom properties, theming
│       ├── javascript-author/ # Web Components, JSDoc, i18n, events
│       ├── pre-flight-check/  # Checklists, pattern matching, troubleshooting
│       ├── git-workflow/      # Conventional commits, branches, UAT workflow
│       └── site-scaffold/     # Standard site structure, PWA, SEO, favicons
├── examples/                  # All example implementations
│   ├── pages/                 # DemoCompany mock site
│   │   ├── sample.html        # Reference implementation
│   │   ├── constitution.html  # Complex document example
│   │   ├── images/            # Placeholder images
│   │   ├── homepage/          # Homepage example
│   │   ├── about/             # About page example
│   │   ├── faq/               # FAQ page example
│   │   ├── products/          # Product pages
│   │   ├── contact/           # Contact page
│   │   └── ...                # More page types
│   ├── demo-site/             # Reference HTML implementation (23 pages)
│   │   ├── index.html         # Homepage
│   │   ├── about/             # About page
│   │   ├── blog/              # Blog listing and posts
│   │   ├── contact/           # Contact form
│   │   ├── gallery/           # Gallery with grid
│   │   └── styles/            # CSS architecture example
│   ├── demo-code/             # Reference JavaScript patterns
│   │   ├── components/        # Web Component examples
│   │   └── scripts/           # Main entry point
│   └── demo-site-claude-2/    # Second demo site (Horizon Data Systems)
├── test/
│   ├── validators/            # Unit tests per validator
│   ├── integration.test.js    # Full pipeline tests
│   └── fixtures/              # Test HTML files
│       ├── valid/             # Files that should pass
│       └── invalid/           # Files that should fail
├── scripts/
│   ├── complexity-check.js    # JavaScript complexity analysis
│   ├── fix-suggestions.js     # Analyzes errors, suggests fixes
│   ├── health-check.js        # Project health dashboard
│   ├── image-check.js         # Image file validation
│   ├── image-html-check.js    # Image HTML best practices
│   ├── incremental-validate.js # Git-aware incremental validation
│   ├── metadata-check.js      # Metadata validation script
│   ├── optimize-images.js     # WebP/AVIF generation
│   ├── readability-check.js   # Content readability analysis
│   ├── resource-budget.js     # Resource budget checking
│   ├── seo-content.js         # SEO content analysis
│   ├── site-check.js          # Site infrastructure checker
│   ├── test-runner.js         # Test execution wrapper
│   └── web-vitals-check.js    # Core Web Vitals readiness
├── AGENTS.md                  # AI agent workflow instructions
├── demosite-summary.md        # Analysis of demo-site patterns
├── roadmap.md                 # Future enhancement plans
├── .htmlvalidate.json         # html-validate config
├── .htmlhintrc                # htmlhint config
├── .pa11yci                   # pa11y config
├── .stylelintrc.json          # stylelint config
├── eslint.config.js           # eslint config (flat format)
├── .cspell.json               # cspell config
├── .textlintrc.json           # textlint config
├── elements.json              # Custom element definitions
├── project-words.txt          # Custom dictionary
└── package.json               # Scripts and dependencies
```

### Examples Directory

The `examples/` directory consolidates all example implementations:

- **`pages/`** - DemoCompany mock corporate website (widgets, gadgets, thingamajigs). Each subdirectory contains `original.html` (low-quality source) and `index.html` (high-quality XHTML conversion by Claude).
- **`demo-site/`** - Reference HTML implementation with 23 pages demonstrating CSS architecture, responsive images, and modern patterns.
- **`demo-code/`** - Reference JavaScript patterns including Web Components, i18n, and functional core/imperative shell architecture.
- **`demo-site-claude-2/`** - Second demo site (Horizon Data Systems) built with full skill enforcement, demonstrating div-free semantic HTML.

This structure allows testing the full workflow: Claude reads the original, applies skills, produces valid XHTML, and hooks validate the output.

## Testing

The test suite verifies all validators work correctly:

```bash
npm test
```

### Test Coverage

- **136 tests** across 16 validators + integration
- **Positive tests**: Valid files pass all validators
- **Negative tests**: Invalid files fail with expected errors
- **Integration tests**: Full pipeline verification

Validators tested: html-validate, htmlhint, pa11y, stylelint, eslint, cspell, textlint, link-checker, image-check, metadata-check, readability-check, seo-content, resource-budget, web-vitals-check, site-check

### Test Fixtures

- `test/fixtures/valid/` - Files that should pass all validators
- `test/fixtures/invalid/` - Files targeting specific validator rules

## XHTML Syntax Rules

### Do

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <title>Page Title</title>
</head>
<body>
  <header>
    <h1>Main Heading</h1>
  </header>
  <main>
    <article>
      <p>Content with <br/> line break.</p>
      <img src="photo.jpg" alt="Description"/>
    </article>
  </main>
</body>
</html>
```

### Don't

```html
<!-- Uppercase tags -->
<HTML>

<!-- Missing self-close on void elements -->
<br>
<img src="photo.jpg">

<!-- Unquoted attributes -->
<div class=container>

<!-- Multiple h1 tags -->
<h1>First</h1>
<h1>Second</h1>

<!-- Inline styles -->
<p style="color: red;">

<!-- Missing alt text -->
<img src="photo.jpg">

<!-- Unlabeled form inputs -->
<input type="text" name="email">
```

## Dependencies

- **html-validate** - XHTML syntax validation
- **htmlhint** - HTML linting
- **pa11y** - Accessibility testing (WCAG2AA)
- **stylelint** - CSS linting with modern CSS support
- **eslint** - JavaScript linting for vanilla JS and Web Components
- **sharp** - Image processing (WebP/AVIF generation)
- **cspell** - Spell checking
- **textlint** - Grammar checking
- **link-checker** - Internal link validation
- **linkinator** - External link validation
- **bd (beads)** - AI-native issue tracking (install separately: `brew install steveyegge/beads/bd`)

## Requirements

- Node.js 18+
- npm
