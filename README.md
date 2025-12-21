# Project Template

A web project template with validation, automation, and Claude Code integration for building accessible, semantic HTML websites and webapps.

## What This Template Provides

### Claude Code Integration

**28 Skills** - Guidance that activates when Claude recognizes relevant context:

| Skill | Purpose |
|-------|---------|
| `xhtml-author` | XHTML-strict syntax, semantic HTML5 |
| `accessibility-checker` | WCAG2AA patterns |
| `content-writer` | Spelling, grammar awareness |
| `custom-elements` | Custom element definitions |
| `forms` | Accessible form patterns with `<output>` |
| `css-architecture` | `@layer`, `@import`, nesting, container queries |
| `design-tokens` | CSS custom properties |
| `data-attributes` | State management with `data-*` |
| `responsive-images` | `<picture>`, `srcset`, modern formats |
| `placeholder-images` | SVG placeholder generation for prototypes |
| `fake-content` | Realistic fake content with @faker-js/faker |
| `progressive-enhancement` | CSS-only interactivity |
| `animation-motion` | Animations with prefers-reduced-motion |
| `performance` | Resource hints, Core Web Vitals |
| `print-styles` | `@media print` patterns for printable pages |
| `security` | CSP, SRI, XSS prevention |
| `metadata` | SEO, Open Graph, social sharing |
| `i18n` | Internationalization, lang, RTL |
| `patterns` | Reusable page patterns |
| `icons` | Lucide icon library with `<x-icon>` |
| `markdown-author` | Markdown structure and formatting |
| `javascript-author` | Web Components, JSDoc |
| `service-worker` | Offline support, caching strategies, PWA |
| `unit-testing` | Node.js native test runner patterns |
| `e2e-testing` | Playwright browser testing patterns |
| `git-workflow` | Conventional commits, branching |
| `pre-flight-check` | Checklists before work begins |
| `site-scaffold` | Standard site structure |

**17 Slash Commands**:

| Command | Purpose |
|---------|---------|
| `/add-element` | Define custom HTML elements |
| `/add-word` | Add words to spelling dictionary |
| `/add-picture` | Convert `<img>` to `<picture>` |
| `/placeholder-image` | Generate SVG placeholder images |
| `/fake-content` | Generate realistic fake content |
| `/fake-product` | Generate product data |
| `/fake-testimonial` | Generate testimonials |
| `/add-css-tokens` | Generate design token system |
| `/add-css-file` | Create scoped CSS file |
| `/add-form-field` | Generate accessible form field |
| `/add-toc` | Generate table of contents |
| `/add-frontmatter` | Add YAML frontmatter |
| `/add-callout` | Insert callout block |
| `/add-code-block` | Insert fenced code block |
| `/scaffold-icons` | Set up Lucide icon library |
| `/health` | Project health dashboard |
| `/uat` | User acceptance testing workflow |

**PostToolUse Hooks** - Validators run automatically when Claude edits files:

- **HTML**: html-validate, htmlhint, pa11y (accessibility)
- **CSS**: stylelint
- **JavaScript**: eslint
- **Markdown**: markdownlint

### Validation Scripts

| Command | Purpose |
|---------|---------|
| `npm run lint` | HTML validation |
| `npm run lint:css` | CSS linting |
| `npm run lint:js` | JavaScript linting |
| `npm run lint:markdown` | Markdown linting |
| `npm run lint:spelling` | Spell check |
| `npm run lint:grammar` | Grammar check |
| `npm run lint:readability` | Readability scoring |
| `npm run lint:content` | Combined spelling+grammar+readability |
| `npm run lint:images` | Image optimization check |
| `npm run lint:links` | Local link validation |
| `npm run lint:links:remote` | Remote URL validation |
| `npm run lint:meta` | Metadata validation |
| `npm run lint:jsonld` | JSON-LD structured data |
| `npm run lint:seo` | SEO content analysis |
| `npm run lint:complexity` | JavaScript complexity |
| `npm run lint:budget` | Resource budget checks |
| `npm run lint:vitals` | Web Vitals analysis |
| `npm run lint:site` | Site-wide checks |
| `npm run lint:manifest` | PWA manifest validation |
| `npm run lint:darkmode` | Dark mode token coverage |
| `npm run lint:fonts` | Web font loading validation |
| `npm run a11y` | Accessibility testing |
| `npm run lint:all` | All validators |
| `npm run lint:changed` | Incremental (changed files) |
| `npm run lint:staged` | Staged files only |
| `npm run health` | Health dashboard |
| `npm run lighthouse` | Lighthouse CI |
| `npm test` | Run test suite |
| `npm run test:watch` | Test with watch mode |
| `npm run test:coverage` | Test coverage check |
| `npm run optimize:images` | Optimize images |
| `npm run generate:tokens` | Document design tokens |
| `npm run generate:a11y` | Generate a11y statement |
| `npm run generate:patterns` | Generate pattern docs |

### Issue Tracking

Beads (`bd`) for AI-native issue tracking:

```bash
bd create --title="Add feature" --type=feature
bd ready                # Find work
bd update <id> --status in_progress
bd close <id>
```

## Quick Start

1. **Clone or copy this template**

```bash
git clone <this-repo> my-project
cd my-project
npm install
```

1. **Create your source files**

Create a `src/` directory with your HTML, CSS, and JavaScript files.

1. **Sync icons** (optional)

```bash
npm run icons:sync
```

1. **Start building**

Open in Claude Code. The skills and hooks will guide your development.

## Configuration Files

| File | Purpose |
|------|---------|
| `.htmlvalidate.json` | XHTML validation rules |
| `.htmlhintrc` | HTML linting |
| `.pa11yci` | Accessibility (WCAG2AA) |
| `.stylelintrc.json` | CSS linting |
| `eslint.config.js` | JavaScript linting |
| `.cspell.json` | Spell checking |
| `.textlintrc.json` | Grammar checking |
| `.markdownlint.json` | Markdown linting |
| `elements.json` | Custom element definitions |
| `project-words.txt` | Custom dictionary |
| `lighthouserc.json` | Lighthouse CI |

## Customization

### Add Custom Elements

Edit `elements.json`:

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

### Add Dictionary Words

Edit `project-words.txt` or use `/add-word`:

```
MyBrandName
kubernetes
microservice
```

### Adjust Accessibility Standard

Edit `.pa11yci`:

```json
{
  "defaults": {
    "standard": "WCAG2AAA"
  }
}
```

## Philosophy

**HTML first, CSS for enhancement, JavaScript when necessary.**

- Use semantic HTML5 elements
- Apply XHTML-strict syntax (self-closing tags, lowercase, quoted attributes)
- Use custom elements as semantic wrappers
- Enforce WCAG2AA accessibility
- Use `data-*` attributes for state (not classes)
- Apply CSS `@layer` for cascade control
- Build responsive images with `<picture>` and `srcset`

## Requirements

- Node.js 18+
- npm
- Claude Code (for skill and hook integration)
- bd (beads) for issue tracking: `brew install steveyegge/beads/bd`
