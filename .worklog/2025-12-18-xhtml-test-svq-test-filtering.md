# Worklog: Test Filtering Fix

**Issue**: xhtml-test-svq
**Title**: npm test doesn't filter to specific test file
**Branch**: fix/xhtml-test-svq-test-filtering
**Date**: 2025-12-18

---

## Problem

Running `npm test test/validators/resource-budget.test.js` ran ALL tests instead of just the specified file.

**Root cause**: The npm script was defined as:
```json
"test": "node --test test/**/*.test.js"
```

The shell expanded the glob pattern before npm could pass additional arguments, so every test file was always included.

---

## Solution

Created `scripts/test-runner.js` - a wrapper script that:

1. Checks if test file arguments were passed
2. If yes: runs only those specific files
3. If no: expands the glob programmatically and runs all tests

This allows:
- `npm test` - runs all tests
- `npm test -- test/validators/foo.test.js` - runs only that file
- `npm test -- --test-name-pattern='Foo'` - filters by test name

---

## Changes

### New file: `scripts/test-runner.js`
- Wrapper for Node.js test runner
- Uses `node:fs` glob to expand patterns without shell
- Properly forwards arguments to `node --test`

### Modified: `package.json`
- `"test"`: Now uses `node scripts/test-runner.js`
- Added `"test:all"`: Direct glob pattern for all tests
- Updated `"test:watch"`: Quoted glob pattern

---

## Testing

```bash
# Run specific file
npm test -- test/validators/resource-budget.test.js
# Result: Only runs Resource Budget tests (16 tests)

# Run all tests
npm test
# Result: Runs all 84 tests
```

---

## Related

- Also fixed xhtml-test-52x (Stylelint JSON output) in same branch
