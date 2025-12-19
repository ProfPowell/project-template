# Worklog: Site Infrastructure Checker

**Issue**: xhtml-test-xg2
**Date**: 2025-12-18
**Status**: Complete

## Summary

Created unified site infrastructure checker that consolidates validation for essential production site assets into a single tool with grouped output.

## Changes Made

### New Files
- `scripts/site-check.js` - Main checker script (800+ lines)
- `test/validators/site-check.test.js` - 23 automated tests
- `test/fixtures/valid/site-check/` - Complete valid site fixture
  - index.html, favicon.ico, icon.svg, apple-touch-icon.png
  - robots.txt, sitemap.xml, manifest.webmanifest
  - 404.html, 500.html, 403.html
  - llms.txt, humans.txt, opensearch.xml
  - .well-known/security.txt
- `test/fixtures/invalid/site-check/` - Minimal invalid fixture
- `webhint-exploration.md` - Research document

### Modified Files
- `package.json` - Added `lint:site` script

## Checks Implemented

### 9 Check Categories

1. **Favicons** - favicon.ico, icon.svg, apple-touch-icon.png
2. **Crawlers & Robots** - robots.txt with AI bot detection
3. **Sitemap** - sitemap.xml validation
4. **PWA Manifest** - manifest.webmanifest with icon checks
5. **Error Pages** - 404.html, 500.html, 403.html
6. **AI/LLM Support** - llms.txt content analysis
7. **Security (.well-known)** - security.txt RFC 9116 validation
8. **OpenSearch** - opensearch.xml browser search integration
9. **Site Credits** - humans.txt team info

### Output Format

Grouped output by category with status indicators:
```
✓ Favicons
    ✓ favicon.ico exists
    ✓ icon.svg exists
    ✓ apple-touch-icon.png exists

✗ Crawlers & Robots
    ✗ Missing robots.txt
```

## Research

Evaluated webhint as potential consolidated tool. Decided against due to:
- Deprecated dependencies
- Local file errors (jsdom canvas issues)
- Missing key checks (robots.txt, 404, LLM support)
- Slow maintenance velocity

See `webhint-exploration.md` for full analysis.

## Consolidated Issues

This implementation replaces 4 individual planning beads:
- xhtml-test-c1f (Favicon Handling Plan)
- xhtml-test-mfl (404 Pages and Handling Plan)
- xhtml-test-ry3 (Robots.txt Handling and Plan)
- xhtml-test-e8l (LLM Support for Sites Handling and Plan)

## Testing

```bash
# Run checker
npm run lint:site
node scripts/site-check.js test/fixtures/valid/site-check/

# Run tests
npm test -- test/validators/site-check.test.js
```

## UAT History

- v1: Initial implementation - denied (missing .well-known, error pages)
- v2: Added security.txt, 500/403, opensearch, humans.txt - denied (output not grouped)
- v3: Grouped output by category - approved
