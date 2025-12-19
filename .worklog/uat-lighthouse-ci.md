# UAT: Lighthouse CI Implementation

**Feature**: Phase 6.1 Lighthouse CI - Automated Performance Audits
**Issue**: xhtml-test-dzu
**Branch**: feature/xhtml-test-dzu-lighthouse-ci
**Requested**: 2025-12-18
**Status**: PENDING

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

**Status**: [x] Pass [ ] Fail

---

### 2. Configuration File Exists

**Test**: Verify lighthouserc.json configuration file

```bash
cat lighthouserc.json
```

**Expected Result**:
- File exists in project root
- Valid JSON format
- Has `ci.collect`, `ci.assert`, and `ci.upload` sections

**Status**: [ x] Pass [ ] Fail

---

### 3. Budget Thresholds Configured

**Test**: Verify budget thresholds in lighthouserc.json

**Expected Result**:
- Performance threshold: `minScore: 0.9` (> 90%)
- Accessibility threshold: `minScore: 1.0` (100%)
- Best Practices threshold: `minScore: 0.9` (> 90%)
- SEO threshold: `minScore: 1.0` (100%)

**Status**: [ x] Pass [ ] Fail

---

### 4. NPM Script Available

**Test**: Check package.json for lighthouse script

```bash
grep '"lighthouse"' package.json
```

**Expected Result**:
- Shows the lighthouse script line
- Script uses `lhci autorun`

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

**Status**: [ x] Pass [ ] Fail

---

### 6. Configuration Structure Valid

**Test**: Verify configuration can be parsed

```bash
node --eval "import('fs').then(fs => { const c = JSON.parse(fs.readFileSync('lighthouserc.json')); console.log('Config valid:', Boolean(c.ci)); })"
```

**Expected Result**:
- Output: `Config valid: true`
- No parse errors

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

**Status**: [ x] Pass [ ] Fail

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

**Status**: [ x] Pass [ ] Fail [ ] Skipped

---

## Quality Checklist

### Code Quality
- [x ] lighthouserc.json is valid JSON
- [x ] Test file follows existing validator test patterns
- [ x] No eslint errors in new files

### Documentation
- [x ] Worklog entry created and complete
- [x ] UAT instructions clear and detailed
- [ x] Configuration comments explain purpose

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
