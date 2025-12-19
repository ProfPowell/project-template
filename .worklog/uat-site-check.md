# UAT: Site Infrastructure Checker

**Feature**: site-check
**Issue**: xhtml-test-xg2
**Branch**: main (direct implementation)
**Requested**: 2025-12-18
**Status**: APPROVED
**Approved**: 2025-12-18
**Approver**: Human (via /uat approve)

---

## Summary

Unified site infrastructure validator that consolidates checks for essential production site assets.

**Problem solved**: Multiple individual tools needed for favicon, robots.txt, sitemap, manifest, 404, and LLM support validation.

**Solution**: Created `scripts/site-check.js` that validates all site infrastructure in one pass:
- Favicon files (ico, svg, apple-touch-icon)
- robots.txt (syntax, directives, AI crawler rules)
- sitemap.xml (existence, structure, URL count)
- manifest.webmanifest (name, icons, PWA requirements)
- Error pages (404, 500, 403)
- llms.txt (AI/LLM crawler guidance)
- .well-known/security.txt (RFC 9116 vulnerability disclosure)
- opensearch.xml (browser search integration)
- humans.txt (site credits)

---

## Testing Instructions

### 1. View help documentation

```bash
node scripts/site-check.js --help
```

**Expected**:
- Shows "Site Infrastructure Checker" title
- Lists all checks: Favicons, Crawlers, PWA, Error Handling
- Documents favicon.ico, robots.txt, llms.txt, etc.
- Shows usage examples

### 2. Run on valid test fixture

```bash
node scripts/site-check.js test/fixtures/valid/site-check/
```

**Expected**:
- Exit code 0 (success)
- Shows "PASS" status
- Lists all passed checks with green checkmarks:
  - favicon.ico exists
  - icon.svg exists
  - apple-touch-icon.png exists
  - robots.txt exists with User-agent and Sitemap
  - sitemap.xml with URL count
  - manifest.webmanifest with name and icons
  - 404.html with title
  - llms.txt with content info
- Shows "All checks passed" summary

### 3. Run on invalid test fixture

```bash
node scripts/site-check.js test/fixtures/invalid/site-check/
```

**Expected**:
- Exit code 1 (failure)
- Shows "FAIL" status
- Reports missing required files as errors:
  - Missing required: favicon.ico
  - Missing required: apple-touch-icon.png
  - Missing robots.txt
- Reports missing recommended files as warnings:
  - Missing recommended: icon.svg
- Shows error count summary

### 4. Test strict mode

```bash
node scripts/site-check.js --strict test/fixtures/invalid/site-check/
```

**Expected**:
- Exit code 1 (warnings treated as errors in strict mode)
- Output includes warning count

### 5. Run npm script

```bash
npm run lint:site
```

**Expected**:
- Runs site-check.js on examples/ directory
- Reports findings for any site roots found

### 6. Run automated test suite

```bash
npm test -- test/validators/site-check.test.js
```

**Expected**: All 18 tests pass:
- Help and Options (2 tests)
- Valid Site Fixtures (8 tests)
- Invalid Site Fixtures (5 tests)
- Strict Mode (1 test)
- Edge Cases (2 tests)

### 7. Test robots.txt AI directive detection

```bash
node scripts/site-check.js test/fixtures/valid/site-check/
```

**Expected**:
- Shows "Contains AI/LLM crawler directives" info message
- Detects GPTBot, anthropic-ai, or similar bot names

### 8. Verify manifest icon validation

```bash
node scripts/site-check.js test/fixtures/valid/site-check/
```

**Expected**:
- Reports icon count: "Has 3 icon(s) defined"
- Shows display mode info
- Confirms start_url presence

### 9. Verify error pages (404, 500, 403)

```bash
node scripts/site-check.js test/fixtures/valid/site-check/
```

**Expected**:
- "Custom 404 page: 404.html"
- "Custom 500 page: 500.html"
- "Custom 403 page: 403.html"
- Each page shows "has title" info

### 10. Verify .well-known/security.txt validation

```bash
node scripts/site-check.js test/fixtures/valid/site-check/
```

**Expected**:
- ".well-known/security.txt exists"
- "Has Contact field"
- "Has Expires field"
- Optional fields detected: Encryption, Preferred-Languages, Canonical, Policy

### 11. Verify opensearch.xml validation

```bash
node scripts/site-check.js test/fixtures/valid/site-check/
```

**Expected**:
- "opensearch.xml exists"
- "Valid OpenSearch structure"
- "Has search URL template"
- "Has ShortName" and "Has Description" info

### 12. Verify humans.txt validation

```bash
node scripts/site-check.js test/fixtures/valid/site-check/
```

**Expected**:
- "humans.txt exists"
- "Includes team/author information"
- "Includes site/technology information"

---

## Expected Results

- [ ] Help output documents all checks (including new ones)
- [ ] Valid fixture passes with all checks green (23 passed)
- [ ] Invalid fixture fails with clear error messages
- [ ] Strict mode treats warnings as errors
- [ ] npm run lint:site executes correctly
- [ ] All 23 automated tests pass
- [ ] AI/LLM crawler directives detected in robots.txt
- [ ] Manifest validation checks icons, name, start_url
- [ ] All error pages detected (404, 500, 403)
- [ ] llms.txt content analysis works
- [ ] .well-known/security.txt validated with Contact/Expires fields
- [ ] opensearch.xml structure validated
- [ ] humans.txt content detected

---

## How to Respond

After testing, respond with one of:

```
/uat approve site-check
```
The site infrastructure checker works correctly and consolidates validation needs

```
/uat deny site-check
```
Needs changes (please provide feedback)

---

## Technical Details

### Checks Performed

| Check | Severity | Description |
|-------|----------|-------------|
| favicon.ico | Error | Legacy browser fallback (32x32) |
| icon.svg | Warning | Modern scalable icon with dark mode |
| apple-touch-icon.png | Error | iOS home screen (180x180) |
| robots.txt | Error | Search engine crawler directives |
| sitemap.xml | Info | Site structure for crawlers |
| manifest.webmanifest | Info | PWA app manifest |
| 404.html | Info | Not Found error page |
| 500.html | Info | Internal Server Error page |
| 403.html | Info | Forbidden error page |
| llms.txt | Info | AI/LLM crawler guidance |
| .well-known/security.txt | Info | Vulnerability disclosure (RFC 9116) |
| opensearch.xml | Info | Browser search integration |
| humans.txt | Info | Site credits and team info |

### robots.txt Validation

- Checks for User-agent directive
- Checks for Sitemap reference
- Warns if Disallow: / blocks all crawlers
- Detects AI bot directives (GPTBot, anthropic-ai, Claude, CCBot, Google-Extended)

### manifest.webmanifest Validation

- Validates JSON syntax
- Checks for name/short_name
- Verifies icons array with 192x192 and 512x512 sizes
- Checks for maskable icon purpose
- Validates start_url presence

### security.txt Validation (RFC 9116)

- Checks .well-known/security.txt location (preferred)
- Falls back to root /security.txt with warning
- Required field: Contact
- Recommended field: Expires
- Optional fields: Encryption, Preferred-Languages, Canonical, Policy

### opensearch.xml Validation

- Checks for OpenSearchDescription root element
- Validates ShortName and Description elements
- Verifies Url template is present

### Error Pages

- Checks for 404.html, 500.html, 403.html
- Also checks alternate locations: {code}/index.html, error/{code}.html
- Validates each page has a title element

### Consolidates Previous Planning Issues

- xhtml-test-c1f (Favicon Handling Plan)
- xhtml-test-mfl (404 Pages and Handling Plan)
- xhtml-test-ry3 (Robots.txt Handling and Plan)
- xhtml-test-e8l (LLM Support for Sites Handling and Plan)

---

## History

| Date | Action | Notes |
|------|--------|-------|
| 2025-12-18 | Created | Consolidates 4 planning issues into unified checker |
| 2025-12-18 | Updated | Added security.txt, opensearch.xml, humans.txt, 500/403 pages |
| 2025-12-18 | Updated | Grouped output by category, removed Resources from help |
| 2025-12-18 | Approved | UAT passed |
