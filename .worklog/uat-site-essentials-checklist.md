# UAT: Site Essentials Pre-Flight Checklist

**Feature**: xhtml-test-8hb
**Status**: Pending Review

## Summary

Added a Site Essentials pre-flight checklist to help developers remember commonly forgotten files when building sites, plus new templates for security.txt, offline.html, and noscript.html.

## Changes Made

### 1. Pre-Flight Check Skill
- Added "New site/project" branch to Quick Decision Tree
- New "Site Essentials Pre-Flight Checklist" section covering:
  - Core Files: robots.txt, sitemap.xml, humans.txt, manifest.json
  - Error Pages: 404.html, 500.html, offline.html, noscript.html
  - Security: .well-known/security.txt
  - Favicon Set: svg, ico, apple-touch-icon, PWA icons, og-image
  - Quick check bash command
  - "When to Create" decision table

### 2. Site Scaffold Skill
- Updated directory structure diagram
- Added templates:
  - `security.txt` - RFC 9116 format with required/optional fields
  - `offline.html` - Service worker fallback with SW registration code
  - `noscript.html` - JS-disabled fallback with browser instructions
- Reorganized checklist into categories

## Test Checklist

### Pre-Flight Check Skill
- [ ] Quick Decision Tree includes "New site/project" option
- [ ] Site Essentials checklist is comprehensive
- [ ] Quick check command works correctly
- [ ] "When to Create" table is accurate

### Site Scaffold Skill
- [ ] Directory structure includes new files
- [ ] security.txt template follows RFC 9116
- [ ] offline.html includes service worker example
- [ ] noscript.html has browser enable instructions
- [ ] Checklist is properly categorized

### Integration
- [ ] Pre-flight check references site-scaffold skill
- [ ] Templates are consistent with existing style

## Files to Review

```
.claude/skills/pre-flight-check/SKILL.md  (lines 84-91, 254-302)
.claude/skills/site-scaffold/SKILL.md     (lines 14-28, 274-415, 442-473)
```

## Approval

- [x] Approved by: TAP
- [x] Date: 2025-12-20
