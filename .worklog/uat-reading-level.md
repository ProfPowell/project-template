# UAT: Reading Level Analysis

**Feature**: reading-level
**Issue**: xhtml-test-8ow
**Branch**: main (retroactive UAT)
**Requested**: 2025-12-18
**Status**: PENDING

---

## Summary

Analyzes HTML content for reading level using Flesch-Kincaid scoring. Helps ensure content is accessible to the target audience.

- **General content**: Grade level ≤ 8 (8th grade reading level)
- **Technical content**: Grade level ≤ 12 (high school level)

---

## Testing Instructions

### 1. Run the readability check on test fixtures

```bash
# Should PASS - easy reading content
npm run lint:readability -- test/fixtures/valid/readability

# Should FAIL - overly complex content
npm run lint:readability -- test/fixtures/invalid/readability
```

**Expected**: First command passes (exit 0), second fails (exit 1)

### 2. Check a specific file

```bash
npm run lint:readability -- examples/sample.html
```

**Expected**: Shows grade level with /12 threshold (marked as technical content)

### 3. Run unit tests

```bash
npm test -- test/validators/readability.test.js
```

**Expected**: All 5 tests pass

### 4. Verify skill documentation

```bash
cat .claude/skills/content-writer/SKILL.md | grep -A 20 "Reading Level"
```

**Expected**: Shows reading level guidelines section

### 5. Test content type detection

Create a temp file and test:
```bash
echo '<!doctype html><html lang="en"><head><meta charset="UTF-8"/><title>Test</title></head><body><p>This is a simple test with easy words. We use short sentences here. The content should pass the grade eight reading level test easily.</p></body></html>' > /tmp/test-general.html

npm run lint:readability -- /tmp/test-general.html
```

**Expected**: Shows grade level with /8 threshold (general content)

---

## Expected Results

- [ ] Valid fixtures pass, invalid fixtures fail
- [ ] sample.html detected as technical (uses /12 threshold)
- [ ] Unit tests pass (5/5)
- [ ] Skill documentation includes readability section
- [ ] General content uses /8 threshold by default

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
Feature needs changes (you'll be asked for feedback)

---

## History

| Date | Action | Notes |
|------|--------|-------|
| 2025-12-18 | Requested | Retroactive UAT request |
