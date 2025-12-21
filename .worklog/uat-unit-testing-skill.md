# UAT: Unit Testing Skill

**Feature**: Unit Testing Skill (xhtml-test-al5)
**Branch**: `feature/xhtml-test-al5-unit-testing-skill`
**Status**: ✅ APPROVED
**Approved**: 2025-12-20

## Summary

Added a unit-testing skill to enforce test creation for JavaScript files in `scripts/`, with PostToolUse hook integration and coverage checking.

## Test Instructions

### 1. Run Test Coverage Check

```bash
npm run test:coverage
```

**Expected**: Shows which scripts have tests and which are missing. Should show ~18% coverage.

### 2. View the Skill Documentation

Check these skill files:
- `.claude/skills/unit-testing/SKILL.md`
- `.claude/skills/unit-testing/PATTERNS.md`
- `.claude/skills/unit-testing/FIXTURES.md`

**Verify**:
- [ ] SKILL.md has frontmatter with name, description, allowed-tools
- [ ] Documents when tests are required
- [ ] Shows test file naming conventions
- [ ] Includes quick start template
- [ ] References related documentation

### 3. Test the PostToolUse Hook

Create a test script file:
```bash
echo 'console.log("test")' > scripts/test-hook.js
```

Then delete it:
```bash
rm scripts/test-hook.js
```

**Expected**: When editing scripts/*.js, you should see a message about missing test file if one doesn't exist.

### 4. Verify Pre-flight Check Update

Read `.claude/skills/pre-flight-check/SKILL.md` and check the completion checklist.

**Verify**:
- [ ] `npm run test:coverage` added to test commands
- [ ] "New scripts have corresponding test files" checklist item added

### 5. Run All Tests

```bash
npm test
```

**Expected**: All 136 tests pass.

## Approval

- [x] **Approved** - Merge to main

## History

| Date | Action | Notes |
|------|--------|-------|
| 2025-12-20 | Requested | Initial UAT request |
| 2025-12-20 | Approved | User approved via `/uat approve` |
