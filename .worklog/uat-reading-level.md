# UAT: Reading Level Analysis (Round 2)

**Feature**: reading-level
**Issue**: xhtml-test-8ow
**Branch**: main
**Requested**: 2025-12-18
**Status**: APPROVED

---

## Summary

Analyzes HTML content for reading level using Flesch-Kincaid scoring. Helps ensure content is accessible to the target audience.

- **General content**: Grade level ≤ 8 (8th grade reading level)
- **Technical content**: Grade level ≤ 12 (high school level)

**Changes from Round 1**: Renamed `content-type` to `content-style` to avoid confusion with HTTP Content-Type header.

---

## Testing Instructions

### 1. Verify the attribute name change

```bash
grep -n "content-style" scripts/readability-check.js
```

**Expected**: Shows `content-style` (NOT `content-type`)

### 2. Run the readability check on test fixtures

```bash
npm run lint:readability -- test/fixtures/valid/readability
```

**Expected**: Both files pass, technical content shows `/12` threshold

### 3. Check the help output

```bash
npm run lint:readability -- test/fixtures/valid/readability 2>&1 | tail -5
```

**Expected**: Shows `<meta name="content-style" content="technical"/>` (NOT content-type)

### 4. Run unit tests

```bash
npm test -- test/validators/readability.test.js
```

**Expected**: All 5 tests pass

---

## Expected Results

- [ ] Script uses `content-style` attribute (not `content-type`)
- [ ] Help text shows correct attribute name
- [ ] Tests pass
- [ ] No confusion with HTTP Content-Type header

---

## How to Respond

After testing, respond with one of:

```
/uat approve reading-level
```
Feature works as expected

```
/uat deny reading-level
```
Feature needs more changes

---

## History

| Date | Action | Notes |
|------|--------|-------|
| 2025-12-18 | Requested | Initial UAT request |
| 2025-12-18 | Denied | Change content-type to content-style |
| 2025-12-18 | Re-requested | Fixed attribute naming |
| 2025-12-18 | Approved | Human verified content-style attribute works correctly |
