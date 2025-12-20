# UAT: Accessibility Statement Generator

**Feature**: Accessibility Statement Generator (xhtml-test-7cs)
**Branch**: `feature/xhtml-test-7cs-a11y-statement`
**Status**: 🔄 PENDING

## Summary

Added a script to auto-generate WCAG conformance documentation based on pa11y test results, including conformance status, known issues, and contact template.

## Test Instructions

### 1. Generate the Accessibility Statement

```bash
npm run generate:a11y
```

**Expected**: Script runs pa11y on 18 HTML files and reports:
- Files tested: 18
- Files with issues: 13
- Total issues: ~151
- Conformance: WCAG 2.1 Level AA - Partially Conformant

### 2. View the Generated Documentation

Open `docs/accessibility.html` in a browser.

**Verify**:
- [ ] Commitment statement section at top
- [ ] Conformance badge shows "WCAG 2.1 Level AA - Partially Conformant"
- [ ] Summary grid shows pages tested, passing, issues found, unique issues
- [ ] Known issues table lists issues with severity and occurrence count
- [ ] WCAG criteria sections show Level A and Level AA success criteria
- [ ] Methodology section lists testing tools
- [ ] Contact section has placeholder email, phone, address
- [ ] Dark mode works if your system is in dark mode

### 3. Validate the Output

```bash
npx html-validate docs/accessibility.html
```

**Expected**: Validation passes with no errors.

### 4. Test with Different Directory

```bash
node scripts/generate-a11y-statement.js examples/demo-site-claude-2/pages
```

**Expected**: Generates statement based on that directory's files.

### 5. Verify Known Issues Content

- [ ] Issues truncated to 100 chars with "..." if longer
- [ ] Severity column shows "error" or "warning"
- [ ] Status shows "Under Review" for all issues

## Approval

- [ ] **Approved** - Merge to main
- [ ] **Changes Requested** - See comments below

## History

| Date | Action | Notes |
|------|--------|-------|
| 2025-12-20 | Requested | Initial UAT request |
