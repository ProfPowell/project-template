# Project Template

A web project template with validation, automation, and Claude Code integration for building accessible, semantic HTML websites and webapps.

## What This Template Provides

### Claude Code Integration

**20 Skills** - Guidance that activates when Claude recognizes relevant context:

| Skill | Purpose |
|-------|---------|
| `xhtml-author` | XHTML-strict syntax, semantic HTML5 |
| `accessibility-checker` | WCAG2AA patterns |
| `content-writer` | Spelling, grammar awareness |
| `custom-elements` | Custom element definitions |
| `forms` | Accessible form patterns with `<output>` |
| `css-architecture` | `@layer`, `@import`, nesting |
| `design-tokens` | CSS custom properties |
| `data-attributes` | State management with `data-*` |
| `responsive-images` | `<picture>`, `srcset`, modern formats |
| `progressive-enhancement` | CSS-only interactivity |
| `performance` | Resource hints, Core Web Vitals |
| `security` | CSP, SRI, XSS prevention |
| `metadata` | SEO, Open Graph, social sharing |
| `i18n` | Internationalization, lang, RTL |
| `patterns` | Reusable page patterns |
| `icons` | Lucide icon library with `<x-icon>` |
| `markdown-author` | Markdown structure and formatting |
| `javascript-author` | Web Components, JSDoc |
| `git-workflow` | Conventional commits, branching |
| `pre-flight-check` | Checklists before work begins |
| `site-scaffold` | Standard site structure |

**13 Slash Commands**:

| Command | Purpose |
|---------|---------|
| `/add-element` | Define custom HTML elements |
| `/add-word` | Add words to spelling dictionary |
| `/add-picture` | Convert `<img>` to `<picture>` |
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
| `npm run lint:images` | Image optimization check |
| `npm run lint:meta` | Metadata validation |
| `npm run lint:a11y` | Accessibility testing |
| `npm run lint:all` | All validators |
| `npm run health` | Health dashboard |
| `npm test` | Run test suite |

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

2. **Create your source files**

Create a `src/` directory with your HTML, CSS, and JavaScript files.

3. **Sync icons** (optional)

```bash
npm run icons:sync
```

4. **Start building**

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
