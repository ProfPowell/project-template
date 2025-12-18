# XHTML-Test Roadmap

Future enhancements for the HTML-first quality feedback loop system.

---

## Current State (Implemented)

### Validation Pipeline
| Layer | Tools | Status |
|-------|-------|--------|
| HTML Structure | html-validate, htmlhint | ✅ |
| Accessibility | pa11y (WCAG2AA) | ✅ |
| CSS Quality | stylelint | ✅ |
| JavaScript | eslint (vanilla JS, Web Components) | ✅ |
| Image Files | image-check.js (size, formats) | ✅ |
| Image HTML | image-html-check.js (attributes) | ✅ |
| Spelling | cspell | ✅ |
| Grammar | textlint | ✅ |
| Links | link-checker, linkinator | ✅ |
| Metadata | metadata-check.js (profiles) | ✅ |

### Claude Integration
| Feature | Count | Status |
|---------|-------|--------|
| Skills | 14 | ✅ |
| Slash Commands | 7 | ✅ |
| PostToolUse Hooks | HTML + CSS + JS | ✅ |
| Custom Elements | 15+ | ✅ |
| Test Suite | 46 tests | ✅ |
| Task Tracking | bd (beads) | ✅ |

---

## Phase 5: JavaScript Quality

### 5.1 ESLint for Vanilla JavaScript ✅ COMPLETE
**Purpose**: Lint JavaScript files with progressive enhancement patterns.

**Implemented**:
- `eslint` with `@eslint/js` (flat config format)
- Rules: no-var, prefer-const, named exports only, JSDoc, camelcase
- PostToolUse hook for `.js` files
- `npm run lint:js` and `lint:js:fix` scripts
- Skill: `javascript-author` with 6 documentation files
- Test suite: 3 ESLint-specific tests

**Configuration**: `eslint.config.js`

---

### 5.2 Code Complexity Analysis ✅ COMPLETE
**Purpose**: Prevent overly complex JavaScript that's hard to maintain.

**Implemented**:
- ESLint complexity rules (integrated into `eslint.config.js`)
- `scripts/complexity-check.js` for focused complexity reporting
- `npm run lint:complexity` script

**Metrics**:
- Cyclomatic complexity (target: < 10 per function)
- Max nesting depth (target: < 4)
- Max lines per function (target: < 50)
- Max nested callbacks (target: < 3)

**Complexity**: Low

---

## Phase 6: Performance Validation

### 6.1 Lighthouse CI
**Purpose**: Automated performance audits on every change.

**Tools**:
- `@lhci/cli` (Lighthouse CI)
- GitHub Actions integration

**Metrics**:
- Performance score (target: > 90)
- Accessibility score (target: 100)
- Best Practices score (target: > 90)
- SEO score (target: 100)

**Features**:
- Performance budgets
- Regression detection
- Historical tracking

**Integration**:
- `npm run lighthouse`
- CI/CD pipeline step
- Budget configuration file

**Complexity**: Medium

---

### 6.2 Web Vitals Monitoring
**Purpose**: Track Core Web Vitals in development.

**Tools**:
- `web-vitals` library (2KB)
- Custom reporting script

**Metrics**:
- LCP (Largest Contentful Paint) < 2.5s
- INP (Interaction to Next Paint) < 200ms
- CLS (Cumulative Layout Shift) < 0.1

**Integration**:
- Development server overlay
- Build-time injection (optional)
- Skill: `performance`

**Complexity**: Low

---

### 6.3 Resource Budget Checker
**Purpose**: Enforce size limits on page resources.

**Script**: `scripts/resource-budget.js`

**Checks**:
- Total page weight (target: < 500KB)
- Critical CSS (target: < 14KB)
- JavaScript per page (target: < 100KB)
- Image count per page
- Font file sizes

**Integration**:
- `npm run lint:budget`
- PostToolUse for HTML files (optional)

**Complexity**: Medium

---

## Phase 7: Security

### 7.1 Dependency Auditing
**Purpose**: Catch vulnerable npm packages.

**Tools**:
- `npm audit` (built-in)
- `better-npm-audit` for CI-friendly output

**Integration**:
- `npm run audit:deps`
- Pre-commit hook
- CI pipeline requirement

**Complexity**: Low

---

### 7.2 Content Security Policy Validation
**Purpose**: Validate CSP headers and inline content.

**Script**: `scripts/csp-check.js`

**Checks**:
- CSP meta tag presence
- Inline script detection
- Inline style detection
- External resource whitelist

**Integration**:
- `npm run lint:csp`
- Skill: `security`

**Complexity**: Medium

---

### 7.3 HTTPS/Mixed Content Detection
**Purpose**: Ensure all resources use HTTPS.

**Script**: `scripts/https-check.js`

**Checks**:
- HTTP URLs in src/href attributes
- Mixed content warnings
- Protocol-relative URLs

**Integration**:
- Part of `npm run lint:all`

**Complexity**: Low

---

## Phase 8: Structured Data

### 8.1 JSON-LD Validation
**Purpose**: Validate Schema.org structured data.

**Tools**:
- Custom validator using Schema.org specs
- Google Rich Results Test API (optional)

**Checks**:
- Valid JSON-LD syntax
- Required Schema.org properties
- Recommended properties warnings
- Type validation

**Integration**:
- `npm run lint:schema`
- Metadata profile extension
- Skill: `structured-data`

**Complexity**: Medium

---

### 8.2 OpenGraph/Twitter Card Completeness
**Purpose**: Extend metadata validation for social sharing.

**Enhancement**: Extend `metadata-check.js`

**Checks**:
- Image dimensions (1200x630 for OG)
- Title length optimization
- Description length optimization
- Twitter card type validation

**Integration**:
- New metadata profile: `social`

**Complexity**: Low

---

## Phase 9: Visual & Browser Testing

### 9.1 Visual Regression Testing
**Purpose**: Catch unintended visual changes.

**Tools**:
- `backstopjs` (open source)
- `puppeteer` for screenshots

**Features**:
- Baseline screenshot capture
- Diff comparison
- Responsive breakpoint testing
- Component-level screenshots

**Integration**:
- `npm run test:visual`
- `npm run test:visual:approve`
- CI integration

**Complexity**: High

---

### 9.2 Browser Compatibility Checking
**Purpose**: Validate CSS/JS feature support.

**Tools**:
- `caniuse-api` or custom integration
- `browserslist` for target definition

**Checks**:
- CSS features vs browserslist targets
- JavaScript API usage
- Polyfill recommendations

**Integration**:
- `npm run lint:compat`
- Skill: `browser-support`

**Complexity**: Medium

---

### 9.3 Print Stylesheet Validation
**Purpose**: Ensure pages print correctly.

**Script**: `scripts/print-check.js`

**Checks**:
- `@media print` rules exist
- Hidden navigation/interactive elements
- Readable font sizes
- URL expansion for links

**Integration**:
- `npm run lint:print`

**Complexity**: Low

---

## Phase 10: Documentation & Patterns

### 10.1 Pattern Library Generator
**Purpose**: Auto-generate a living pattern library.

**Script**: `scripts/generate-patterns.js`

**Features**:
- Extract custom element usage examples
- Generate HTML previews
- Document attributes and variants
- Link to skill documentation

**Output**: `docs/patterns/index.html`

**Complexity**: High

---

### 10.2 CSS Token Documentation
**Purpose**: Auto-document design tokens.

**Script**: `scripts/document-tokens.js`

**Features**:
- Parse `_tokens.css`
- Generate color swatches
- Document spacing scale
- Typography preview

**Output**: `docs/tokens/index.html`

**Complexity**: Medium

---

### 10.3 Accessibility Statement Generator
**Purpose**: Generate WCAG conformance documentation.

**Script**: `scripts/generate-a11y-statement.js`

**Features**:
- Compile pa11y results
- Generate conformance claims
- List known issues
- Contact information template

**Output**: `docs/accessibility.html`

**Complexity**: Low

---

## Phase 11: Advanced Claude Integration

### 11.1 Pre-Write Validation Skill ✅ COMPLETE
**Purpose**: Validate intent before writing code.

**Implemented**:
- `pre-flight-check` skill with 3 documentation files
- Checklists for HTML, CSS, JavaScript, Forms, Images
- Pattern matching guide (user intent → suggested skill)
- Troubleshooting guide for common validation errors
- Quick reference card

**Files**:
- `.claude/skills/pre-flight-check/SKILL.md`
- `.claude/skills/pre-flight-check/QUICK-REFERENCE.md`
- `.claude/skills/pre-flight-check/TROUBLESHOOTING.md`

**Complexity**: Low

---

### 11.2 Automated Fix Suggestions ✅ COMPLETE
**Purpose**: Provide fix commands for common errors.

**Implemented**:
- `scripts/fix-suggestions.js` - Parses validator output and suggests fixes
- PostToolUse hooks pipe output through fix-suggestions script
- Detects common error patterns for JS, CSS, and HTML

**Features**:
- Parse error output (ESLint, Stylelint, html-validate, pa11y)
- Suggest auto-fix commands (`npm run lint:js:fix`, etc.)
- Provide manual fix guidance for non-auto-fixable issues
- Colorized output with auto-fixable vs manual sections

**Supported Patterns**:
- JS: no-var, prefer-const, prefer-template, eqeqeq, no-console, complexity, no-unused-vars
- CSS: max-nesting-depth, block-no-empty, duplicate properties, vendor prefixes
- HTML: void-style, element-case, attr-quotes, missing alt, form accessibility
- Accessibility: color contrast, empty link text

**Complexity**: Medium

---

### 11.3 Project Health Dashboard ✅ COMPLETE
**Purpose**: Summary view of all validation status.

**Implemented**:
- `scripts/health-check.js` - Runs all validators and displays dashboard
- `npm run health` script
- `/health` slash command

**Checks Performed**:
- HTML validation (html-validate)
- CSS validation (stylelint)
- JavaScript validation (eslint)
- Image format coverage
- Spelling (cspell)
- Internal links (link-checker)
- Security (npm audit)
- Test suite status

**Options**:
- `--json` for machine-readable output
- `--quiet` for summary only

**Complexity**: Medium

---

### 11.4 Incremental Validation ✅ COMPLETE
**Purpose**: Only validate changed files.

**Implemented**:
- `scripts/incremental-validate.js` - Git-aware incremental validation
- `npm run lint:changed` - Validate only changed files
- `npm run lint:staged` - Validate only staged files (for pre-commit hooks)

**Features**:
- Git-aware file detection (staged, unstaged, untracked, or since specific commit)
- MD5-based result caching in `.cache/validation-cache.json`
- Faster feedback loop - skips unchanged files
- Type filtering (`--type=html|css|js`)
- JSON output (`--json`) for automation
- Verbose mode (`--verbose`) for detailed output

**Options**:
```bash
node scripts/incremental-validate.js              # All changed files
node scripts/incremental-validate.js --staged     # Only staged files
node scripts/incremental-validate.js --since=HEAD~3  # Since specific commit
node scripts/incremental-validate.js --type=html  # Only HTML files
node scripts/incremental-validate.js --no-cache   # Skip cache
```

**Complexity**: Medium

---

## Phase 12: Build & Deploy Integration

### 12.1 Pre-commit Hooks
**Purpose**: Catch issues before commit.

**Tools**:
- `husky` for git hooks
- `lint-staged` for file filtering

**Hooks**:
- HTML: html-validate
- CSS: stylelint --fix
- JS: eslint --fix
- Spelling: cspell
- Images: size check

**Complexity**: Low

---

### 12.2 GitHub Actions Workflow
**Purpose**: CI/CD validation pipeline.

**File**: `.github/workflows/validate.yml`

**Jobs**:
- Lint all (HTML, CSS, JS)
- Accessibility audit
- Performance budget check
- Link validation
- Security audit

**Complexity**: Medium

---

### 12.3 Deploy Preview Validation
**Purpose**: Validate before production.

**Features**:
- Full Lighthouse audit
- Visual regression vs production
- Link check on deployed preview
- Schema validation

**Complexity**: High

---

## Phase 13: Content Authoring

### 13.1 Reading Level Analysis
**Purpose**: Ensure content accessibility.

**Tools**:
- `text-readability` or custom
- Flesch-Kincaid scoring

**Targets**:
- Grade level < 8 for general content
- Grade level < 12 for technical content

**Integration**:
- `npm run lint:readability`
- Content-writer skill enhancement

**Complexity**: Low

---

### 13.2 Inclusive Language Checker
**Purpose**: Flag non-inclusive terminology.

**Tools**:
- `alex` linter
- Custom word list

**Integration**:
- `npm run lint:inclusive`
- Part of `lint:content`

**Complexity**: Low

---

### 13.3 SEO Content Analysis
**Purpose**: Optimize content for search.

**Script**: `scripts/seo-content.js`

**Checks**:
- Keyword density
- Heading structure
- Internal linking
- Content length
- Image alt text keywords

**Integration**:
- `npm run lint:seo`
- Metadata profile extension

**Complexity**: Medium

---

## Phase 14: Advanced Accessibility

### 14.1 Cognitive Accessibility Checks
**Purpose**: Beyond WCAG2AA compliance.

**Enhancements**:
- Reading order validation
- Focus indicator visibility
- Animation/motion checks
- Color-only information

**Integration**:
- Extended pa11y configuration
- Custom rules

**Complexity**: Medium

---

### 14.2 Screen Reader Testing Automation
**Purpose**: Automated screen reader output capture.

**Tools**:
- `nvda-test-driver` (experimental)
- Guidepup

**Integration**:
- `npm run test:screenreader`

**Complexity**: High

---

### 14.3 Keyboard Navigation Validation
**Purpose**: Ensure full keyboard accessibility.

**Script**: `scripts/keyboard-check.js`

**Checks**:
- Tab order logic
- Skip link presence
- Focus trap detection
- Keyboard handler coverage

**Integration**:
- `npm run lint:keyboard`

**Complexity**: Medium

---

## Priority Matrix

| Phase | Effort | Impact | Status |
|-------|--------|--------|--------|
| 5.1 ESLint | Medium | High | ✅ Complete |
| 7.1 Dependency Audit | Low | High | Next |
| 6.1 Lighthouse CI | Medium | High | Recommended |
| 12.1 Pre-commit Hooks | Low | Medium | Recommended |
| 8.1 JSON-LD Validation | Medium | Medium | 5 |
| 5.2 Complexity Analysis | Low | Medium | ✅ Complete |
| 6.3 Resource Budget | Medium | Medium | 7 |
| 7.2 CSP Validation | Medium | Medium | 8 |
| 9.2 Browser Compat | Medium | Medium | 9 |
| 11.3 Health Dashboard | Medium | Medium | 10 |
| 13.2 Inclusive Language | Low | Medium | 11 |
| 6.2 Web Vitals | Low | Low | 12 |
| 10.1 Pattern Library | High | Medium | 13 |
| 9.1 Visual Regression | High | Medium | 14 |

---

## Implementation Notes

### Adding a New Validator

1. Create script in `scripts/`
2. Add npm script to `package.json`
3. Add to `lint:all` pipeline
4. Create test fixtures in `test/fixtures/`
5. Write tests in `test/validators/`
6. Update PostToolUse hook if real-time feedback needed
7. Create/update skill documentation
8. Update README.md

### Skill Creation Template

```
.claude/skills/<skill-name>/
├── SKILL.md          # Main guidance (YAML frontmatter + markdown)
├── EXAMPLES.md       # Usage examples (optional)
└── REFERENCE.md      # Detailed reference (optional)
```

### Hook Integration Pattern

```json
{
  "type": "command",
  "command": "file_path=$(jq -r '.tool_input.file_path'); if echo \"$file_path\" | grep -qE '\\.ext$'; then npx tool \"$file_path\"; fi"
}
```

---

## Versioning

This roadmap covers potential improvements beyond the initial 4 phases.
- Phases 1-4 complete (HTML, CSS, images, commands, documentation)
- Phase 5.1 complete (ESLint for JavaScript)
- Future phases (5.2+) are proposals for continued enhancement

Last updated: 2025-01
