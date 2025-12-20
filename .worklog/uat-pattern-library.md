# UAT: Pattern Library Generator

**Feature**: Pattern Library Generator (xhtml-test-y6o)
**Branch**: `feature/xhtml-test-y6o-pattern-library`
**Status**: ✅ APPROVED
**Approved**: 2025-12-20

## Summary

Added a script to auto-generate a living pattern library documenting all custom elements with usage examples from the codebase.

## Test Instructions

### 1. Generate the Pattern Library

```bash
npm run generate:patterns
```

**Expected**: Script runs and reports 24 elements, 35 examples found.

### 2. View the Generated Documentation

Open `docs/patterns/index.html` in a browser.

**Verify**:
- [x] Table of contents lists all 24 custom elements
- [x] Each element section shows:
  - Type (void/inline/block)
  - Permitted content
  - Related skill link
  - Attributes table
  - Usage examples with source file paths
- [x] Dark mode works if your system is in dark mode
- [x] Navigation links work to jump between elements

### 3. Validate the Output

```bash
npx html-validate docs/patterns/index.html
```

**Expected**: No errors (validation passes silently).

### 4. Check Some Specific Elements

- [x] `<form-field>` shows 3 examples from contact forms
- [x] `<faq-list>` shows examples from faq/index.html
- [x] `<product-card>` shows example from sample.html
- [x] Elements without examples (like `<icon-element>`) show "No usage examples found"

### 5. Verify Accessibility

- [x] Tables have `scope="col"` on headers
- [x] Sections have proper `aria-labelledby` linking
- [x] Navigation has descriptive label

## Approval

- [x] **Approved** - Merge to main

## History

| Date | Action | Notes |
|------|--------|-------|
| 2025-12-20 | Requested | Initial UAT request |
| 2025-12-20 | Approved | User approved via `/uat approve` |
