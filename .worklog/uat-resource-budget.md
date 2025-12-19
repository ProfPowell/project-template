# UAT: Resource Budget Checker

**Feature**: Phase 6.3 Resource Budget Checker
**Issue**: xhtml-test-5wi
**Branch**: feature/xhtml-test-5wi-resource-budget
**Status**: Awaiting Approval

---

## Overview

The Resource Budget Checker enforces performance budgets on HTML pages by analyzing their total weight and resource sizes. This helps maintain fast page load times and good user experience.

---

## Testing Instructions

### 1. Basic Functionality Test

Run the budget checker on example files:

```bash
npm run lint:budget
```

**Expected Result**:
- Script analyzes all HTML files in examples/
- Shows budget analysis with resource breakdown
- Reports pass/fail status for each page
- Displays budget thresholds at end

### 2. Help Documentation Test

View the help documentation:

```bash
node scripts/resource-budget.js --help
```

**Expected Result**:
- Shows usage information
- Lists all budget thresholds:
  - Total page weight: 500KB
  - Critical CSS: 14KB
  - JavaScript per page: 100KB
  - Images per page: 20 max
  - Font file: 100KB
  - CSS file: 50KB
- Shows example commands

### 3. Single File Analysis Test

Test with a single HTML file:

```bash
node scripts/resource-budget.js examples/sample.html
```

**Expected Result**:
- Analyzes only the specified file
- Shows resource breakdown (HTML, CSS, JS, images, fonts)
- Reports total page weight
- Exits with 0 if within budget, 1 if exceeded

### 4. Test Fixtures Validation

Run tests on the test fixtures:

```bash
npm test test/validators/resource-budget.test.js
```

**Expected Result**:
- All tests pass
- Tests verify:
  - Script execution
  - Budget thresholds
  - Resource detection
  - Output format
  - Multiple file analysis
  - Edge cases

### 5. Budget Enforcement Test

Test with the large CSS fixture:

```bash
node scripts/resource-budget.js test/fixtures/budget/large-inline-css.html
```

**Expected Result**:
- Script exits with code 1 (failure)
- Shows ERROR indicating inline CSS exceeds 14KB budget
- Displays actual size vs budget limit
- Shows percentage of budget used

### 6. Directory Analysis Test

Test analyzing a directory:

```bash
node scripts/resource-budget.js examples/
```

**Expected Result**:
- Finds and analyzes all HTML files in directory
- Shows summary with total pages, passed, and failed counts
- Groups output by passing and failing pages
- Color-codes output (green for pass, red for fail, yellow for warnings)

### 7. Resource Detection Test

Verify resource detection works correctly:

```bash
node scripts/resource-budget.js test/fixtures/budget/with-inline-css.html
```

**Expected Result**:
- Detects inline CSS in <style> tags
- Reports CSS size separately
- Includes CSS size in total page weight
- Shows info messages for detected resources

---

## Budget Verification Checklist

Verify the following budgets are enforced:

- [ ] Total page weight limit: 500KB (512,000 bytes)
- [ ] Critical CSS (inline) limit: 14KB (14,336 bytes)
- [ ] JavaScript per page limit: 100KB (102,400 bytes)
- [ ] Maximum images per page: 20
- [ ] Font file recommendation: 100KB per file
- [ ] CSS file recommendation: 50KB per file
- [ ] Warning threshold: 80% of budget

---

## Output Verification Checklist

Verify the output includes:

- [ ] Header: "=== Resource Budget Analysis ==="
- [ ] Section for pages exceeding budgets (if any)
- [ ] Section for pages within budget
- [ ] Resource breakdown for each page:
  - [ ] HTML size
  - [ ] Inline CSS size (if present)
  - [ ] Total CSS size
  - [ ] Total JS size (if present)
  - [ ] Image count and size
  - [ ] Font size (if present)
  - [ ] Total page weight
- [ ] Summary line with total pages, passed, and failed counts
- [ ] Budget thresholds list at end
- [ ] Color coding (green ✓, red ✗, yellow ⚠)

---

## Edge Cases to Test

Test these scenarios:

1. **Empty directory**: Should exit 0 with "No HTML files found"
2. **Minimal HTML**: Should pass with just HTML size reported
3. **Large inline CSS**: Should fail with clear error message
4. **Non-existent file**: Should handle gracefully
5. **External resources**: Should detect but not measure (outside scope)

---

## Integration Verification

Verify integration with project:

- [ ] Script is executable (`chmod +x scripts/resource-budget.js`)
- [ ] npm script works: `npm run lint:budget`
- [ ] Follows same patterns as other validators
- [ ] Uses consistent output formatting
- [ ] Exits with proper codes (0 = pass, 1 = fail)

---

## Acceptance Criteria

The feature is approved if:

1. Script executes successfully via `npm run lint:budget`
2. All tests pass
3. Budget limits are correctly enforced
4. Output is clear, readable, and color-coded
5. Help documentation is accurate and helpful
6. Script handles edge cases gracefully
7. Resource detection works for CSS, JS, images, and fonts
8. Exit codes are correct (0 for pass, 1 for fail)

---

## Approval

**Tester**: _____________________
**Date**: _____________________
**Status**: [ ] Approved [ ] Denied [ ] Needs Changes

**Comments**:


---

## Follow-up Actions

After approval:
- [ ] Merge feature branch to main
- [ ] Close issue xhtml-test-5wi
- [ ] Update roadmap.md to mark Phase 6.3 as complete
- [ ] Consider adding to CI/CD pipeline
- [ ] Document in project README if needed
