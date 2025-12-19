# Worklog: Stylelint Test Output Fix

**Issue**: xhtml-test-52x
**Title**: Stylelint test produces duplicated JSON output
**Branch**: fix/xhtml-test-svq-test-filtering
**Date**: 2025-12-18

---

## Problem

When running all tests, the Stylelint CSS Validation tests produced messy output:
```
[{"source":"...sample.css",...}][{"source":"...sample.css",...}][{"source":"...bad-nesting.css",...}]...
```

This was multiple JSON objects concatenated together, making test output hard to read.

**Root cause**: The `runStylelint()` function used `execSync()` without specifying `stdio`, which defaults to inheriting stdout. Each of the 9 tests ran `npx stylelint --formatter json`, and the JSON output was printed to the console.

---

## Solution

Added explicit stdio configuration to capture output without printing:

```javascript
const output = execSync(`npx stylelint "${filePath}" --formatter json`, {
  cwd: projectRoot,
  encoding: 'utf-8',
  stdio: ['pipe', 'pipe', 'pipe'],  // <-- Added this
});
```

The `stdio: ['pipe', 'pipe', 'pipe']` captures stdin, stdout, and stderr instead of inheriting from the parent process.

---

## Changes

### Modified: `test/validators/stylelint.test.js`
- Added `stdio: ['pipe', 'pipe', 'pipe']` to `execSync()` call
- JSON output is now captured but not printed to console

---

## Testing

```bash
# Before: Showed messy JSON output
npm test -- test/validators/stylelint.test.js

# After: Clean test output with no JSON dump
npm test -- test/validators/stylelint.test.js
```

Output now shows only:
```
▶ Stylelint CSS Validation
  ▶ Valid CSS Files
    ✔ should pass validation for sample.css with modern CSS features
    ...
```

---

## Related

- Fixed alongside xhtml-test-svq (test filtering) in same branch
