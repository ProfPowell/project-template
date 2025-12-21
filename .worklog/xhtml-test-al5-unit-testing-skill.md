# Worklog: Unit Testing Skill (xhtml-test-al5)

## Summary

Created a unit-testing skill to enforce test creation for JavaScript files in `scripts/`, using Node.js native test runner patterns.

## Changes Made

### New Files

- `.claude/skills/unit-testing/SKILL.md` - Main skill documentation
- `.claude/skills/unit-testing/PATTERNS.md` - Common test patterns reference
- `.claude/skills/unit-testing/FIXTURES.md` - Fixture organization guide
- `scripts/test-coverage-check.js` - Script to check test coverage for scripts/

### Modified Files

- `.claude/settings.json` - Added PostToolUse hook to check for missing tests
- `scripts/fix-suggestions.js` - Added test file suggestion pattern
- `package.json` - Added `test:coverage` npm script
- `.claude/skills/pre-flight-check/SKILL.md` - Added test checklist item

## Features Implemented

1. **Skill Documentation**
   - When tests are required (new scripts, bug fixes)
   - Test file naming conventions
   - Node.js test runner basics (describe, it, assert)
   - Minimum test requirements

2. **Test Patterns Documentation**
   - CLI tool testing pattern (execSync + JSON parsing)
   - Async fixture setup pattern
   - Binary data generation
   - Configuration validation
   - Error message validation

3. **Fixture Documentation**
   - Directory structure (valid/ vs invalid/)
   - Naming conventions
   - Temporary fixture handling
   - Binary data generation (PNG, WebP)

4. **Test Coverage Check Script**
   - Finds scripts without corresponding test files
   - Reports coverage percentage
   - Suggests test file paths
   - Exits with error if tests missing

5. **PostToolUse Hook**
   - Checks for missing tests when editing scripts/
   - Suggests using `/skill unit-testing`
   - Integrated with fix-suggestions.js

## Test Coverage Results

Current project state:
- **17 scripts** in scripts/
- **3 scripts** have tests (18% coverage)
- **14 scripts** missing tests

## Commands

```bash
# Check test coverage for scripts/
npm run test:coverage

# Run all tests
npm test

# Run specific test file
node --test test/validators/foo.test.js
```

## Validation

- test-coverage-check.js passes ESLint (1 complexity warning)
- All 136 project tests pass
- Skill markdown files pass markdownlint
