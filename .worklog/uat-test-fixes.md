# UAT: Test Runner Fixes

**Features**: Test filtering + Stylelint output cleanup
**Issues**: xhtml-test-svq, xhtml-test-52x
**Branch**: fix/xhtml-test-svq-test-filtering
**Requested**: 2025-12-18
**Status**: PENDING

---

## Summary

Two bug fixes for the test infrastructure:

1. **Test Filtering (xhtml-test-svq)**: `npm test` now correctly filters to specific test files when provided
2. **Stylelint Output (xhtml-test-52x)**: Stylelint tests no longer dump JSON to stdout

---

## Testing Instructions

### 1. Test specific file filtering

Run a single test file:

```bash
npm test -- test/validators/resource-budget.test.js
```

**Expected**:
- Only Resource Budget tests run (16 tests)
- No other test suites appear
- Clean output with test names and results

### 2. Test all tests still work

Run all tests:

```bash
npm test
```

**Expected**:
- All 84 tests pass
- All test suites run
- No errors or warnings

### 3. Verify Stylelint output is clean

Run Stylelint tests specifically:

```bash
npm test -- test/validators/stylelint.test.js
```

**Expected**:
- Clean output showing test names and checkmarks
- NO JSON output like `[{"source":"...","deprecations":[],...}]`
- 9 tests pass

### 4. Test pattern filtering

Test the name pattern feature:

```bash
npm test -- --test-name-pattern='Budget'
```

**Expected**:
- Only tests with "Budget" in the name run
- Other tests are skipped (shown as passing with 0 duration)

---

## Expected Results

- [ ] `npm test -- specific-file.test.js` runs only that file
- [ ] `npm test` runs all 84 tests
- [ ] Stylelint tests produce clean output (no JSON dump)
- [ ] `--test-name-pattern` filtering works
- [ ] No deprecation warnings

---

## How to Respond

After testing, respond with one of:

```
/uat approve test-fixes
```

```
/uat deny test-fixes
```

---

## History

| Date | Action | Notes |
|------|--------|-------|
| 2025-12-18 | Requested | Initial UAT request for test fixes |
