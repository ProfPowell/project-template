# UAT: Lighthouse CI Implementation

**Feature**: Phase 6.1 Lighthouse CI - Automated Performance Audits
**Issue**: xhtml-test-dzu
**Branch**: feature/xhtml-test-dzu-lighthouse-ci
**Date**: 2025-12-18

---

## Overview

This UAT validates the Lighthouse CI implementation for automated performance, accessibility, best practices, and SEO audits.

---

## Prerequisites

- [ ] Branch checked out: `git checkout feature/xhtml-test-dzu-lighthouse-ci`
- [ ] Dependencies installed: `npm install`
- [ ] Familiar with Lighthouse performance metrics

---

## Test Cases

### 1. Installation Verification

**Test**: Verify @lhci/cli is installed

```bash
npx lhci --version
```

**Expected Result**:
- Command executes successfully
- Version number displayed (should be 0.15.x or higher)

**Status**: [ ] Pass [ ] Fail

---

### 2. Configuration File Exists

**Test**: Verify lighthouserc.js configuration file

```bash
cat lighthouserc.js
```

**Expected Result**:
- File exists in project root
- Contains ES module export (`export default`)
- Has `ci.collect`, `ci.assert`, and `ci.upload` sections

**Status**: [ ] Pass [ ] Fail

---

### 3. Budget Thresholds Configured

**Test**: Verify budget thresholds in lighthouserc.js

**Expected Result**:
- Performance threshold: `minScore: 0.9` (> 90%)
- Accessibility threshold: `minScore: 1.0` (100%)
- Best Practices threshold: `minScore: 0.9` (> 90%)
- SEO threshold: `minScore: 1.0` (100%)

**Status**: [ ] Pass [ ] Fail

---

### 4. NPM Script Available

**Test**: Check package.json for lighthouse script

```bash
npm run lighthouse --help
```

**Expected Result**:
- Script exists in package.json
- Command shows LHCI help/usage information
- No errors about missing script

**Status**: [ ] Pass [ ] Fail

---

### 5. Validator Tests Pass

**Test**: Run Lighthouse validator tests

```bash
npm test -- test/validators/lighthouse.test.js
```

**Expected Result**:
- All tests pass (approximately 7 tests)
- Tests verify CLI installation
- Tests verify configuration structure
- Tests verify budget thresholds
- Tests verify npm script

**Status**: [ ] Pass [ ] Fail

---

### 6. Configuration Structure Valid

**Test**: Verify configuration can be imported

```bash
node -e "import('./lighthouserc.js').then(c => console.log('Config valid:', !!c.default.ci))"
```

**Expected Result**:
- Output: `Config valid: true`
- No import errors

**Status**: [ ] Pass [ ] Fail

---

### 7. Full Test Suite Passes

**Test**: Ensure implementation doesn't break existing tests

```bash
npm test
```

**Expected Result**:
- All existing tests pass
- New Lighthouse tests included in output
- No test failures

**Status**: [ ] Pass [ ] Fail

---

### 8. Optional: Run Full Lighthouse Audit

**Test**: Execute actual Lighthouse audit (requires serving files)

```bash
npm run lighthouse
```

**Note**: This test requires the examples directory to be served. LHCI will automatically start a server using staticDistDir configuration.

**Expected Result**:
- LHCI starts server on localhost
- Audits 5 configured URLs
- Runs 3 audits per URL
- Shows performance scores
- May show warnings/errors based on actual page performance
- Generates HTML report

**Status**: [ ] Pass [ ] Fail [ ] Skipped

---

## Quality Checklist

### Code Quality
- [ ] lighthouserc.js uses ES module syntax
- [ ] Configuration is well-documented with comments
- [ ] Test file follows existing validator test patterns
- [ ] No eslint errors in new files

### Documentation
- [ ] Worklog entry created and complete
- [ ] UAT instructions clear and detailed
- [ ] Configuration comments explain purpose

### Integration
- [ ] npm script added correctly
- [ ] Tests integrate with existing test suite
- [ ] No conflicts with existing tooling

---

## Issues Found

Document any issues discovered during UAT:

1. 
2. 
3. 

---

## Approval

**Tester**: ___________________
**Date**: ___________________

**Result**: [ ] Approved [ ] Denied [ ] Needs Revision

**Notes**:


---

## Next Steps

Upon approval:
1. Merge feature branch to main
2. Close issue xhtml-test-dzu
3. Update roadmap to mark Phase 6.1 complete
4. Consider Phase 6.2: Screenshot diffing (next roadmap phase)

---

## Additional Notes

### Performance Considerations
- Full Lighthouse audits can be slow (3 runs × 5 URLs = 15 audits)
- Consider running full audits only on CI/CD or before releases
- Validator tests are fast and suitable for regular test runs

### Future Enhancements
- Set up Lighthouse CI Server for historical tracking
- Integrate into GitHub Actions workflow
- Add budget configuration for resource sizes
- Create performance regression alerts
