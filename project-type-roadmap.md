# Project Type Roadmap

Future starter project types to consider for the project template.

## Current Inventory

| Starter | Category | Description |
|---------|----------|-------------|
| Static Website | Frontend | Multi-page HTML/CSS/JS, no build step |
| Astro Site | Frontend | Content collections, component islands |
| PWA/SPA | Frontend | Web Components, client-side routing, offline |
| Dashboard | Frontend | Admin UI, sidebar layout, data tables |
| REST API | Backend | Express/Fastify, PostgreSQL, JWT |
| Chrome Extension | Browser | Manifest V3, popup/content scripts |
| CLI Tool | Tooling | Zero-dependency Node.js CLI |

---

## Proposed New Starters

### Tier 1: High Priority (Strong Skill Support)

#### 1. Documentation Site (Eleventy or Astro)

**What it does**: Static documentation/knowledge base using 11ty or Astro based upon a user choice with search, versioning, and code highlighting.

**Use cases**:
- Project documentation
- API references
- Knowledge bases
- Technical guides

**Skills leveraged**: `eleventy`, `astro`, `markdown-author`, `xhtml-author`, `metadata`, `accessibility-checker`, `performance`

**Why include**:
- Eleventy skill exists but unused in starters
- Complements Astro for simpler doc-focused sites
- Documentation is a universal developer need
- Minimal dependencies, fast builds

---

#### 2. E-commerce Storefront

**What it does**: Product catalog with cart, checkout flow, and order management UI. Frontend-focused with API integration points.

**Use cases**:
- Online stores
- Product catalogs
- Booking/reservation systems
- Digital product sales

**Skills leveraged**: `responsive-images`, `forms`, `state-management`, `api-client`, `data-storage`, `accessibility-checker`

**Why include**:
- COMPOSITIONS.md already defines e-commerce patterns
- High demand project type
- Exercises multiple skills together
- Can pair with REST API starter for full-stack

---

#### 3. Blog

**What it does**: Full-featured blog with markdown content, RSS feed, categories/tags, and optional comments.

**Use cases**:
- Personal blogs
- Company blogs
- News sites
- Content marketing

**Skills leveraged**: `astro` or `eleventy`, `markdown-author`, `metadata`, `responsive-images`, `i18n`, `performance`

**Why include**:
- Blog composition pattern exists
- Very common project type
- Could be variant of Astro starter or 11ty
- Good demonstration of content workflows

---

#### 4. Form Builder

**What it does**: Dynamic form creation, validation, conditional logic, and submission handling.

**Use cases**:
- Survey tools
- Application forms
- Quiz/assessment builders
- Lead capture

**Skills leveraged**: `forms`, `validation`, `state-management`, `data-storage`, `rest-api`

**Why include**:
- Forms skill is sophisticated but starter doesn't showcase it
- High utility for internal tools
- Demonstrates dynamic UI generation
- JSON Schema integration opportunity

---

#### 5. Design System / Component Library

**What it does**: Reusable Web Component library with documentation, visual testing, and npm publishing setup.

**Use cases**:
- Enterprise design systems
- Shared component packages
- White-label UI kits

**Skills leveraged**: `custom-elements`, `css-author`, `typography`, `layout-grid`, `icons`, `unit-testing`, `e2e-testing`

**Why include**:
- Demonstrates component development patterns
- Reusable across other starters
- Enterprise/team use case
- Good for learning Web Components

---

#### 6. Full Stack Site with Headless CMS Integration

**What it does**: Frontend connected to headless CMS (Sanity, Strapi, or generic) with preview mode and webhooks.

**Use cases**:
- Marketing sites with CMS
- Content-managed applications
- Multi-channel publishing

**Skills leveraged**: `sanity-cms`, `astro`, `api-client`, `responsive-images`

**Why include**:
- sanity-cms skill exists but unused
- Decoupled architecture is popular
- Could be variant/add-on rather than standalone

---

## Selection Criteria

When evaluating new starters, consider:

1. **Skill Leverage**: Does it use existing skills effectively?
2. **Gap Coverage**: Does it address an unmet need?
3. **Developer Demand**: Is this a common project type?
4. **Neutrality**: Avoids vendor/framework lock-in where possible
5. **Composability**: Can it combine with other starters?
6. **Complexity Balance**: Not too simple (use patterns), not too complex (maintain focus)

---

## Implementation Notes

### Starter Anatomy
Each starter requires:
- `manifest.yaml` - Configuration and prompts
- Template files with `{{PLACEHOLDER}}` variables
- `README.md` - Documentation
- Skills list in manifest

### Shared Resources
Consider expanding `.claude/starters/_shared/` with:
- Common authentication UI patterns
- More page layouts
- Form component library
- Real-time connection utilities

### Variants vs. New Starters
Some proposals might work better as variants or extensions:
- **Documentation Site** → Could extend Astro starter with docs-specific config
- **Blog** → Could extend Astro starter with blog-specific layouts
- **Headless CMS** → Add-on capability for multiple starters

---

## Open Questions

1. How do we handle starters that naturally compose (e.g., E-commerce + REST API)?
   They should do both the starters then and compose properly which may mean REST needs to be revisited