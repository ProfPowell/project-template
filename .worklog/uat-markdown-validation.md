# UAT: Markdown Validation Hooks and Linting

**Feature**: markdown-validation
**Issue**: xhtml-test-q70
**Branch**: feature/xhtml-test-q70-markdown-validation
**Requested**: 2025-12-19
**Status**: PENDING

---

## Summary

Added comprehensive markdown validation with PostToolUse hooks that automatically validate .md files when edited.

**Problem solved**: No automatic validation existed for markdown files, leading to inconsistent formatting, missing code languages, and spelling errors.

**Solution**: Integrated markdownlint with hooks, fix suggestions, and extended spelling/grammar to cover markdown content.

---

## Testing Instructions

### 1. Verify markdownlint configuration

```bash
cat .markdownlint.json
```

**Expected**:
- `"MD003": { "style": "atx" }` - ATX headings
- `"MD004": { "style": "dash" }` - Dash lists
- `"MD025": true` - Single H1
- `"MD040": true` - Code language required

### 2. Run markdown linting on valid file

```bash
npm run lint:markdown -- test/fixtures/valid/markdown/sample.md
```

**Expected**: No errors

### 3. Run markdown linting on invalid file

```bash
npm run lint:markdown -- test/fixtures/invalid/markdown/bad-headings.md
```

**Expected**: Errors for MD001, MD004, MD025, MD034, MD036, MD040

### 4. Verify npm scripts

```bash
grep "lint:markdown" package.json
```

**Expected**:
- `lint:markdown` command exists
- `lint:markdown:fix` command exists

### 5. Verify hooks configuration

```bash
grep -A 5 '\.md\$' .claude/settings.json
```

**Expected**:
- Hook for .md files
- Excludes `.worklog` and `node_modules`
- Runs markdownlint and cspell

### 6. Verify fix-suggestions handles markdown

```bash
grep "type === 'md'" scripts/fix-suggestions.js
```

**Expected**: Markdown section exists with rule patterns

### 7. Verify spelling covers markdown

```bash
grep -E "\\*\\.\\{html,md\\}" package.json
```

**Expected**: `lint:spelling` and `lint:grammar` include `.md` files

### 8. Run markdown tests

```bash
node --test test/validators/markdownlint.test.js
```

**Expected**: 14 tests pass

### 9. Verify total test count

```bash
node --test test/**/*.test.js 2>&1 | grep "ℹ tests"
```

**Expected**: 137 tests

### 10. Verify README updates

```bash
grep "lint:markdown" README.md
```

**Expected**: Markdown lint commands documented

---

## Expected Results

- [ ] .markdownlint.json has project-specific rules
- [ ] npm scripts exist for markdown linting
- [ ] PostToolUse hook triggers on .md file edits
- [ ] fix-suggestions.js handles markdown errors
- [ ] Spelling/grammar extended to .md files
- [ ] 14 new tests for markdownlint validation
- [ ] All 137 tests pass
- [ ] README documents markdown commands

---

## How to Respond

After testing, respond with one of:

```
/uat approve markdown-validation
```
Markdown validation hooks work correctly with fix suggestions

```
/uat deny markdown-validation
```
Needs changes (please provide feedback)

---

## Technical Details

### Hook Behavior

When you edit a .md file:
1. markdownlint runs on the file
2. cspell checks spelling
3. Output pipes to fix-suggestions.js
4. Suggestions displayed with auto-fix commands

### Excluded Paths

The hook excludes:
- `.worklog/` - Worklog markdown files
- `node_modules/` - Dependencies

### Auto-fixable Issues

The following can be auto-fixed with `npm run lint:markdown:fix`:
- MD003: Heading style
- MD004: List style
- MD007: List indentation
- MD009: Trailing spaces
- MD010: Hard tabs
- MD012: Multiple blanks
- MD022: Heading spacing
- MD029: Ordered list prefix
- MD031: Code block spacing
- MD032: List spacing
- MD037: Emphasis spacing
- MD038: Code spacing
- MD047: File ending
- MD048: Fence style
- MD049: Emphasis style
- MD050: Strong style

### Integration with markdown-author Skill

This validation enforces the patterns documented in the markdown-author skill:
- Single H1 rule
- Heading hierarchy
- Code language identifiers
- Link syntax
- Alt text requirements

---

## History

| Date | Action | Notes |
|------|--------|-------|
| 2025-12-19 | Created | Implementation of markdown validation hooks |
