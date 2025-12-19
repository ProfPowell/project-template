# UAT: Web Vitals Monitoring

**Feature**: web-vitals-monitoring
**Issue**: xhtml-test-j5i
**Branch**: feature/xhtml-test-j5i-web-vitals
**Requested**: 2025-12-18
**Status**: APPROVED
**Approved**: 2025-12-18
**Approver**: Human (via /uat approve)

---

## Summary

New Web Vitals instrumentation checker that validates HTML files include Core Web Vitals monitoring.

**Problem solved**: No automated way to verify that HTML pages include performance monitoring for Core Web Vitals (LCP, INP, CLS).

**Solution**: Created `scripts/web-vitals-check.js` that analyzes:
- Presence of web-vitals library import (various patterns supported)
- Initialization of core metrics (LCP, INP, CLS)
- Provides helpful instrumentation snippets for missing monitoring
- Skips minimal HTML files without JavaScript

---

## Testing Instructions

### 1. Run web vitals check on examples

```bash
npm run lint:vitals
```

**Expected**: Output shows analysis of all HTML files in examples/ directory, reporting which files have web vitals monitoring.

### 2. Test complete instrumentation detection

```bash
node scripts/web-vitals-check.js test/fixtures/valid/web-vitals/with-instrumentation.html
```

**Expected**:
- Exit code 0 (success)
- Shows "1 instrumented" file
- Lists metrics being monitored: LCP, INP, CLS
- Green checkmark indicating pass

### 3. Test partial instrumentation with warnings

```bash
node scripts/web-vitals-check.js test/fixtures/valid/web-vitals/partial-instrumentation.html
```

**Expected**:
- Exit code 0 (success, but with warnings)
- Warning message: "Missing Core Web Vitals metrics: INP"
- Shows metrics being monitored: LCP, CLS

### 4. Test missing instrumentation

```bash
node scripts/web-vitals-check.js test/fixtures/invalid/web-vitals/no-instrumentation.html
```

**Expected**:
- Exit code 1 (failure)
- Error message: "Missing web-vitals library import"
- Shows Core Web Vitals thresholds (LCP < 2.5s, INP < 200ms, CLS < 0.1)
- Displays instrumentation snippet with example code

### 5. Test skipped files

```bash
node scripts/web-vitals-check.js test/fixtures/valid/minimal.html
```

**Expected**:
- Exit code 0 (skipped files don't cause failures)
- Shows "1 skipped" file
- Reason: "No JavaScript - minimal template"

### 6. View help documentation

```bash
node scripts/web-vitals-check.js --help
```

**Expected**:
- Shows script name: "Web Vitals Instrumentation Checker"
- Lists usage and options
- Documents all three Core Web Vitals with thresholds
- Provides example commands
- Links to web.dev/vitals and GitHub resources

### 7. Get instrumentation snippet

```bash
node scripts/web-vitals-check.js --snippet
```

**Expected**:
- Shows complete code snippet for adding web vitals monitoring
- Includes import statement for onLCP, onINP, onCLS
- Includes sendToAnalytics function
- Includes all three metric initializations with comments
- Shows example Google Analytics integration (commented out)

### 8. Run automated test suite

```bash
npm test -- test/validators/web-vitals.test.js
```

**Expected**: All 10 tests pass:
- ✓ passes files with complete web vitals instrumentation
- ✓ passes files with partial instrumentation but shows warnings
- ✓ fails files with JavaScript but no web vitals
- ✓ skips files without JavaScript
- ✓ shows help with --help flag
- ✓ shows instrumentation snippet with --snippet flag
- ✓ detects all three core metrics in complete instrumentation
- ✓ detects partial metrics and warns about missing ones
- ✓ shows Core Web Vitals thresholds for failed files
- ✓ shows instrumentation snippet for failed files

---

## Expected Results

- [ ] `npm run lint:vitals` runs without crashing
- [ ] Complete instrumentation passes with green checkmark
- [ ] Partial instrumentation passes but shows warning for missing metric
- [ ] Missing instrumentation fails with helpful error message
- [ ] Files without JavaScript are skipped (not failed)
- [ ] Help output is clear and documents all metrics with thresholds
- [ ] Snippet output provides ready-to-use code
- [ ] All 10 automated tests pass
- [ ] Output uses color coding (green=pass, red=fail, yellow=warn, dim=skip)
- [ ] Instrumentation snippet includes all three core metrics

---

## How to Respond

After testing, respond with one of:

```
/uat approve web-vitals
```
The web vitals monitoring checker works correctly and is useful

```
/uat deny web-vitals
```
Needs changes (please provide feedback)

---

## Technical Details

### Core Web Vitals Checked

1. **LCP (Largest Contentful Paint)** - Threshold: < 2.5s
   - Measures loading performance
   - Largest content element rendered

2. **INP (Interaction to Next Paint)** - Threshold: < 200ms
   - Measures interactivity responsiveness
   - Replaced FID (First Input Delay) in 2024

3. **CLS (Cumulative Layout Shift)** - Threshold: < 0.1
   - Measures visual stability
   - Unexpected layout shifts during page load

### Supported Import Patterns

The script detects local import patterns (no CDN/network dependencies):

```javascript
// ES module from npm package (requires bundler or importmap)
import { onLCP, onINP, onCLS } from 'web-vitals';

// Dynamic import from npm package
import('web-vitals').then(({ onLCP, onINP, onCLS }) => { ... });

// Local bundled script
<script src="/js/web-vitals.min.js"></script>
```

**Note**: CDN imports (e.g., unpkg.com) are intentionally NOT supported to ensure all dependencies are local.

---

## History

| Date | Action | Notes |
|------|--------|-------|
| 2025-12-18 | Requested | Initial UAT request for Phase 6.2 implementation |
