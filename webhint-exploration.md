# Webhint Exploration: Consolidated Validation Assessment

**Issue**: xhtml-test-kdx
**Date**: 2025-12-18
**Status**: Research Complete

## Executive Summary

**Recommendation**: Do not adopt webhint as a consolidated validation tool. Continue with targeted custom scripts, but consider architectural improvements for better organization.

### Key Findings

1. **webhint has maintenance concerns** - Deprecated dependencies, errors on local files
2. **webhint lacks key checks we need** - No robots.txt, limited favicon, no LLM/AI support
3. **Our current tooling is comprehensive** - 13 scripts covering most validation needs
4. **SaaS alternatives don't fit** - ValidBot and similar require network, violate local-only philosophy

---

## Webhint Analysis

### What It Is

[Webhint](https://webhint.io) is a Microsoft-backed "hinting engine for the web" that checks HTML/CSS/JS for best practices. Originally called Sonarwhal, it was donated to the JS Foundation.

### Installation & Usage

```bash
# Quick test
npx hint https://example.com

# Local files
npx hint ./path/to/file.html

# Project install
npm install hint --save-dev
```

### Available Hints

webhint provides ~50 hints organized as npm packages (`@hint/hint-*`):

| Category | Available Hints |
|----------|----------------|
| **Icons** | `apple-touch-icons`, `manifest-icons` |
| **Manifest** | `manifest-exists`, `manifest-is-valid`, `manifest-app-name` |
| **Meta** | `meta-charset-utf-8`, `meta-viewport`, `meta-theme-color` |
| **Accessibility** | `axe` (integrates axe-core) |
| **Performance** | `http-compression`, `http-cache`, `image-optimization-cloudinary` |
| **Security** | `https-only`, `no-vulnerable-javascript-libraries` |
| **Links** | `no-broken-links` |

### What's Missing

| Need | webhint Support |
|------|-----------------|
| robots.txt validation | **None** |
| 404 page checking | **None** |
| Favicon completeness (ico, svg, apple, manifest icons) | **Partial** (apple-touch-icon only) |
| LLM/AI crawler support (llms.txt) | **None** |
| Content quality (spelling, grammar, readability) | **None** |
| Resource budgets | **None** |
| Web Vitals instrumentation | **None** |
| SEO content analysis | **None** |

### Problems Encountered

**1. Deprecated Dependencies**
```
npm warn deprecated inflight@1.0.6: This module is not supported, and leaks memory
npm warn deprecated rimraf@3.0.2: Rimraf versions prior to v4 are no longer supported
npm warn deprecated glob@7.2.3: Glob versions prior to v9 are no longer supported
npm warn deprecated q@1.5.1: You or someone you depend on is using Q...
```

**2. Local File Errors**
```
Error: Not implemented: HTMLCanvasElement.prototype.getContext
(without installing the canvas npm package)
```

Testing `npx hint examples/sample.html` failed with jsdom canvas errors.

**3. Maintenance Velocity**

Last commits (Sept 2024) focus on dependency bumps, not new features. The project is maintained but not actively developed.

---

## Current xhtml-test Tooling

We already have 13 validation scripts:

| Script | Purpose |
|--------|---------|
| `metadata-check.js` | Meta tags, Open Graph, Twitter cards |
| `image-check.js` | Image sizes, formats, optimization |
| `image-html-check.js` | Image usage in HTML (alt, dimensions) |
| `complexity-check.js` | Code complexity metrics |
| `health-check.js` | Overall project health dashboard |
| `readability-check.js` | Content readability scores |
| `web-vitals-check.js` | Core Web Vitals instrumentation |
| `resource-budget.js` | Performance budgets |
| `seo-content.js` | SEO content analysis |
| `incremental-validate.js` | Changed-file validation |
| `fix-suggestions.js` | Auto-fix recommendations |
| `optimize-images.js` | Image optimization |
| `test-runner.js` | Test file filtering |

Plus external tools: html-validate, htmlhint, pa11y, stylelint, eslint, cspell, textlint, lighthouse.

---

## Alternative: ValidBot

[ValidBot](https://www.validbot.com/) checks 100+ elements including favicon, robots.txt, accessibility.

**Pros**: Comprehensive, includes robots.txt and favicon
**Cons**: SaaS only ($10/mo), no CLI, no local execution

**Verdict**: Violates our local-only, no-network-dependency philosophy.

---

## Consolidation Options

### Option 1: Stay Current (Recommended)

Keep individual scripts. Benefits:
- Each script is focused and testable
- Easy to add new checks
- No external dependency risk
- Full control over output format

**Improvement**: Create a unified runner that orchestrates all checks.

### Option 2: Create Unified Checker

Build `scripts/site-check.js` that consolidates:
- Favicon validation
- robots.txt validation
- 404 page detection
- sitemap.xml validation
- manifest.webmanifest validation

This would be a new "site infrastructure" checker complementing existing content/code validators.

### Option 3: Adopt webhint + Custom Scripts

Use webhint for what it does well (axe, manifest, meta), keep custom scripts for gaps.

**Problems**:
- Adds complexity (two validation systems)
- webhint's deprecated deps are concerning
- Local file support is buggy

---

## Recommendation

**Proceed with Option 2**: Create a unified "site infrastructure" checker.

### Proposed: `scripts/site-check.js`

Validates site-level assets that every production site needs:

```javascript
// Checks to implement:
const CHECKS = {
  favicon: {
    'favicon.ico': { required: true, sizes: '32x32' },
    'icon.svg': { required: false, note: 'Modern browsers' },
    'apple-touch-icon.png': { required: true, sizes: '180x180' },
  },
  robotsTxt: {
    exists: true,
    allowsGooglebot: true,
    hasSitemap: true,
  },
  sitemapXml: {
    exists: true,
    validXml: true,
    referencedInRobots: true,
  },
  manifest: {
    exists: true,
    hasName: true,
    hasIcons: true,
  },
  notFound: {
    custom404: true,
    returns404Status: true,
  },
  llmSupport: {
    'llms.txt': { required: false, note: 'AI crawler guidance' },
  },
};
```

### Benefits

1. Single script for all "site infrastructure" concerns
2. Consistent output format with other checkers
3. No external dependencies beyond Node.js
4. Testable with our existing test framework
5. Aligns with local-only philosophy

---

## Next Steps

1. Close planning beads for individual features (favicon, robots.txt, 404, LLM)
2. Create new consolidated bead for `site-check.js`
3. Implement unified checker with all site infrastructure validations
4. Add `npm run lint:site` script
5. Create skill guide for site infrastructure requirements

---

## Sources

- [webhint.io](https://webhint.io) - Official documentation
- [GitHub webhintio/hint](https://github.com/webhintio/hint) - Source repository
- [Evil Martians Favicon Guide](https://evilmartians.com/chronicles/how-to-favicon-in-2021-six-files-that-fit-most-needs) - Modern favicon requirements
- [ValidBot](https://www.validbot.com/) - SaaS validation alternative
- [@hint/configuration-web-recommended](https://www.npmjs.com/package/@hint/configuration-web-recommended) - webhint configuration
