# Worklog: xhtml-test-5wi - Resource Budget Checker

**Date**: 2025-12-18
**Issue**: xhtml-test-5wi
**Branch**: feature/xhtml-test-5wi-resource-budget
**Status**: complete

---

## Summary

Implemented Phase 6.3 Resource Budget Checker to enforce performance budgets on HTML pages. The script analyzes HTML files and their referenced resources (CSS, JavaScript, images, fonts) to ensure they stay within performance-critical size limits.

---

## Changes Made

### Files Created
- `scripts/resource-budget.js` - Main script that analyzes HTML files and enforces resource budgets for total page weight, critical CSS, JavaScript, images, and fonts
- `test/validators/resource-budget.test.js` - Comprehensive test suite for the resource budget checker
- `test/fixtures/budget/minimal.html` - Test fixture with minimal HTML
- `test/fixtures/budget/with-inline-css.html` - Test fixture with small inline CSS
- `test/fixtures/budget/large-inline-css.html` - Test fixture with large inline CSS exceeding 14KB budget
- `.worklog/2025-12-18-xhtml-test-5wi-resource-budget.md` - This worklog
- `.worklog/uat-resource-budget.md` - UAT instructions

### Files Modified
- `package.json` - Added `lint:budget` script to run resource budget checks

---

## Key Decisions

1. **Decision**: Enforce 500KB total page weight budget
   - **Reason**: Aligns with performance best practices for fast page loads on mobile networks
   - **Alternatives Considered**: 1MB was considered but 500KB is more aggressive and ensures better performance

2. **Decision**: Set critical CSS limit at 14KB
   - **Reason**: This is the standard recommendation for above-the-fold CSS that can be inlined for initial render
   - **Alternatives Considered**: None, this is an industry standard based on TCP slow start

3. **Decision**: Limit JavaScript to 100KB per page
   - **Reason**: Balances functionality with parse/execute time on mobile devices
   - **Alternatives Considered**: 50KB was too restrictive, 200KB too lenient

4. **Decision**: Analyze only local resources, skip external URLs
   - **Reason**: Cannot control or measure external resource sizes reliably
   - **Alternatives Considered**: Could add external resource checks but would require HTTP requests

5. **Decision**: Warn at 80% of budget
   - **Reason**: Gives developers early warning before hitting hard limits
   - **Alternatives Considered**: 90% was considered but 80% provides more buffer

6. **Decision**: Track images, CSS, JS, fonts, and total page weight separately
   - **Reason**: Provides granular insight into which resource types are causing issues
   - **Alternatives Considered**: Could only check total weight, but breakdown helps debugging

---

## Testing

- [x] Linting passes (`npm run lint:all`)
- [x] Tests pass (`npm test`)
- [x] Manual testing complete
- [ ] UAT requested

---

## UAT Instructions

Steps for human to verify this work:

1. Run `npm run lint:budget` to analyze all HTML files in examples/
2. Verify the output shows resource budget analysis with:
   - Total page weight for each file
   - Breakdown by resource type (HTML, CSS, JS, images, fonts)
   - Pass/fail status based on budgets
3. Run `npm test test/validators/resource-budget.test.js` to verify all tests pass
4. Test with `node scripts/resource-budget.js --help` to see help output
5. Test with individual file: `node scripts/resource-budget.js examples/sample.html`
6. Verify budgets are enforced:
   - Total page weight: 500KB
   - Critical CSS (inline): 14KB
   - JavaScript per page: 100KB
   - Images per page: 20 max
   - Font files: 100KB each
   - CSS files: 50KB each

Expected results:
- Script should exit 0 for pages within budget
- Script should exit 1 for pages exceeding budgets
- Clear error and warning messages for budget violations
- Color-coded output for easy reading

---

## Recovery Instructions

If this work needs to be recovered or continued:

1. **Branch**: `git checkout feature/xhtml-test-5wi-resource-budget`
2. **Key Commits**:
   - Initial commit: feat(performance): add resource budget checker script
   - Tests commit: test(performance): add resource budget tests
   - Docs commit: docs(performance): add resource budget worklog and UAT
3. **Dependencies**: None - uses built-in Node.js modules only
4. **State**: Implementation complete, ready for UAT

---

## Notes

- The script uses regex parsing for HTML rather than a full DOM parser to keep dependencies minimal
- External resources (http://, https://, //) are detected but not measured since they're outside project scope
- Data URIs are detected and excluded from file size calculations
- The script follows the same patterns as existing validators (image-check.js, seo-content.js)
- Color output uses ANSI escape codes for terminal formatting
- Budget thresholds are configurable via the BUDGETS constant in the script
- The 80% warning threshold helps catch issues before they become hard errors

---

## Related

- Issue: xhtml-test-5wi
- Roadmap: Phase 6.3 Resource Budget Checker
- Related Issues: xhtml-test-2rh (Lighthouse CI), xhtml-test-aul (Web Vitals)
