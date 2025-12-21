# Worklog: Site Essentials Pre-Flight Checklist

**Issue**: xhtml-test-8hb
**Branch**: feature/xhtml-test-8hb-site-essentials-checklist
**Status**: In Progress

## Objective

Add a Site Essentials pre-flight checklist to remind developers about commonly forgotten files like favicon, robots.txt, error pages, security.txt, and offline fallbacks.

## Gap Analysis

User identified that small but important site files were being forgotten:

| File | Previous State | Action Taken |
|------|----------------|--------------|
| robots.txt | Template in site-scaffold | Added to pre-flight checklist |
| sitemap.xml | Template in site-scaffold | Added to pre-flight checklist |
| 404.html, 500.html | Template in site-scaffold | Added to pre-flight checklist |
| favicon set | Template in site-scaffold | Added to pre-flight checklist |
| humans.txt | Minimal template | Added to pre-flight checklist |
| security.txt | Missing | Added template + checklist |
| offline.html | Missing | Added template + checklist |
| noscript.html | Missing (only patterns) | Added template + checklist |

## Files Modified

### `.claude/skills/pre-flight-check/SKILL.md`
- Added "New site/project" to Quick Decision Tree
- Added full "Site Essentials Pre-Flight Checklist" section with:
  - Core Files (robots.txt, sitemap.xml, humans.txt, manifest.json)
  - Error & Fallback Pages (404, 500, offline, noscript)
  - Security (security.txt)
  - Favicon Set
  - Quick check command
  - When to Create table

### `.claude/skills/site-scaffold/SKILL.md`
- Updated directory structure to include offline.html, noscript.html, .well-known/security.txt
- Added security.txt template (RFC 9116 compliant)
- Added offline.html template with service worker registration example
- Added noscript.html template with browser instructions
- Reorganized checklist into categories (Core Files, Error Pages, Security, Assets, Validation)

## Design Decisions

1. **Excluded browserconfig.xml** - User specified not needed in checklist
2. **Excluded .htaccess** - User specified not needed (server config varies)
3. **security.txt in .well-known/** - Follows RFC 9116 standard location
4. **Inline styles in error pages** - These pages must work even when main CSS fails
5. **noindex on fallback pages** - Error/offline pages shouldn't be indexed

## Notes

- noscript.html is only needed for JS-required applications
- offline.html requires service worker to be useful
- security.txt requires annual renewal (Expires field)
