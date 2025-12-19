# Worklog: xhtml-test-j5i - Web Vitals Monitoring

**Date**: 2025-12-18
**Issue**: xhtml-test-j5i
**Branch**: feature/xhtml-test-j5i-web-vitals
**Status**: complete

---

## Summary

Implemented Phase 6.2 Web Vitals Monitoring from the roadmap. Created a validation script that checks HTML files for Core Web Vitals instrumentation and provides helpful snippets for adding monitoring.

This feature enables developers to track Core Web Vitals (LCP, INP, CLS) in their HTML pages during development, ensuring performance metrics are being monitored.

---

## Changes Made

### Files Created
- `scripts/web-vitals-check.js` - CLI tool to analyze HTML files for web-vitals library import and metric initialization. Checks for LCP, INP, and CLS monitoring.
- `test/validators/web-vitals.test.js` - Comprehensive test suite with 10 tests covering valid/invalid files, skipped files, help output, metric detection, and output formatting.
- `test/fixtures/valid/web-vitals/with-instrumentation.html` - Test fixture demonstrating complete web vitals monitoring with all three core metrics.
- `test/fixtures/valid/web-vitals/partial-instrumentation.html` - Test fixture showing partial monitoring (missing INP metric) to test warning detection.
- `test/fixtures/invalid/web-vitals/no-instrumentation.html` - Test fixture with JavaScript but no web-vitals library to test failure cases.
- `.worklog/2025-12-18-xhtml-test-j5i-web-vitals.md` - This worklog entry.
- `.worklog/uat-web-vitals.md` - UAT instructions for human verification.

### Files Modified
- `package.json` - Added `lint:vitals` script that runs `node scripts/web-vitals-check.js`.

---

## Key Decisions

1. **Decision**: Check for library import patterns rather than just script tags
   - **Reason**: Web vitals can be imported via ES modules, CDN script tags, or dynamic imports. Supporting all patterns ensures flexibility.
   - **Alternatives Considered**: Could have required a specific import method, but this would be too restrictive.

2. **Decision**: Skip files without any JavaScript rather than failing them
   - **Reason**: Minimal HTML templates (like test fixtures) don't need web vitals monitoring. Skipping with informative output is more helpful than failing.
   - **Alternatives Considered**: Could fail all files without instrumentation, but this creates noise for legitimate minimal files.

3. **Decision**: Provide instrumentation snippet in error output
   - **Reason**: Following the pattern from other scripts (readability-check, seo-content), providing actionable guidance helps developers fix issues quickly.
   - **Alternatives Considered**: Could just report errors, but snippets reduce friction.

4. **Decision**: Support partial instrumentation with warnings
   - **Reason**: Some pages may only need specific metrics. Passing with warnings allows flexibility while still encouraging complete monitoring.
   - **Alternatives Considered**: Could fail on missing metrics, but this is too strict for real-world use cases.

---

## Testing

- [x] Linting passes (`npm run lint:all`)
- [x] Tests pass (`npm test`)
- [x] Manual testing complete
- [x] UAT requested

### Test Results
All 10 web-vitals tests pass:
- ✓ Complete instrumentation detection
- ✓ Partial instrumentation with warnings
- ✓ Missing instrumentation detection
- ✓ Skipping files without JavaScript
- ✓ Help and snippet output
- ✓ Metric detection (LCP, INP, CLS)
- ✓ Output formatting with thresholds

---

## UAT Instructions

See `.worklog/uat-web-vitals.md` for detailed testing instructions.

Quick verification:
1. Run `npm run lint:vitals` to check examples directory
2. Run `node scripts/web-vitals-check.js --help` to see documentation
3. Run `node scripts/web-vitals-check.js --snippet` to see instrumentation code
4. Run `npm test -- test/validators/web-vitals.test.js` to verify all tests pass

---

## Recovery Instructions

If this work needs to be recovered or continued:

1. **Branch**: `git checkout feature/xhtml-test-j5i-web-vitals`
2. **Key Commits**:
   - Initial implementation of web-vitals-check.js script
   - Added test fixtures and comprehensive test suite
   - Added npm script and documentation
3. **Dependencies**: No new dependencies added (uses built-in fs/path)
4. **State**: Complete and ready for UAT approval

---

## Notes

### Core Web Vitals Thresholds
- **LCP** (Largest Contentful Paint): < 2.5s - Measures loading performance
- **INP** (Interaction to Next Paint): < 200ms - Measures interactivity
- **CLS** (Cumulative Layout Shift): < 0.1 - Measures visual stability

### Implementation Pattern
The script follows the same pattern as other validation scripts in the project:
- Uses `findHtmlFiles()` for directory traversal
- Skips `node_modules`, `.git`, `.beads`, and `test/fixtures/invalid`
- Provides colored terminal output for readability
- Supports `--help` and custom flags (e.g., `--snippet`)
- Returns exit code 1 on failures for CI/CD integration

### Future Enhancements
Potential additions (not in scope for this phase):
- Integration with performance skill when created
- Build-time injection option (mentioned in roadmap)
- Development server overlay (mentioned in roadmap)
- Support for additional metrics (FCP, FID, TTFB)

---

## Related

- Issue: xhtml-test-j5i
- Roadmap: Phase 6.2 Web Vitals Monitoring
- Related Issues: Phase 6.1 Lighthouse CI (xhtml-test-30l)
