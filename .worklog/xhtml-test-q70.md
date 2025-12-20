# Worklog: Markdown Validation Hooks

**Issue**: xhtml-test-q70
**Branch**: feature/xhtml-test-q70-markdown-validation
**Started**: 2025-12-19
**Status**: Ready for UAT

---

## Summary

Added comprehensive markdown validation with PostToolUse hooks, fix suggestions, and integrated linting for syntax, spelling, and style.

## Changes Made

### 1. Markdownlint Configuration

**File**: `.markdownlint.json`

Created project-specific markdownlint configuration:
- ATX-style headings (`# Heading`)
- Dash-style unordered lists (`-`)
- 2-space indentation for nested lists
- Backtick code fences (not tildes)
- Asterisk emphasis (not underscores)
- Single H1 per document
- Fenced code blocks with language identifiers
- Allowed HTML elements: br, details, summary, kbd, sub, sup

### 2. npm Scripts

**File**: `package.json`

Added markdown linting scripts:
- `lint:markdown` - Run markdownlint on all .md files
- `lint:markdown:fix` - Auto-fix markdown issues

Updated existing scripts:
- `lint:spelling` - Now includes .md files
- `lint:grammar` - Now includes .md files
- `lint:all` - Now includes `lint:markdown`

### 3. PostToolUse Hooks

**File**: `.claude/settings.json`

Added markdown hook that runs on Edit/Write of .md files:
- Runs `markdownlint` for structure/syntax
- Runs `cspell` for spelling
- Pipes to fix-suggestions.js for actionable suggestions
- Excludes `.worklog/` and `node_modules/` directories

### 4. Fix Suggestions

**File**: `scripts/fix-suggestions.js`

Added markdown pattern detection for 25+ rules:

**Heading Issues**:
- MD001: Heading increment (skipped levels)
- MD003: Heading style (ATX vs setext)
- MD025: Multiple H1s
- MD041: First line not H1

**List Issues**:
- MD004: List style consistency
- MD007: List indentation
- MD029: Ordered list numbering

**Code Blocks**:
- MD040: Missing language identifier
- MD046: Code block style
- MD048: Code fence style

**Whitespace**:
- MD009: Trailing spaces
- MD010: Hard tabs
- MD012: Multiple blank lines
- MD022: Blanks around headings
- MD031: Blanks around fences
- MD032: Blanks around lists
- MD047: File ending newline

**Links/Images**:
- MD034: Bare URLs
- MD042: Empty links
- MD045: Missing alt text
- MD051: Invalid fragments

**Emphasis**:
- MD036: Emphasis as heading
- MD037: Space in emphasis
- MD049: Emphasis style
- MD050: Strong style

**Inline Code**:
- MD038: Space in code

### 5. Spelling Configuration

**File**: `.cspell.json`

Enhanced for markdown:
- Added software-terms dictionary
- Added `.worklog/` to ignorePaths
- Added markdown-specific ignoreRegExpList:
  - `[text](url)` links
  - Fenced code blocks
  - Inline code
  - YAML frontmatter

### 6. Tests

**Files**:
- `test/validators/markdownlint.test.js` (new, 14 tests)
- `test/fixtures/valid/markdown/sample.md` (valid fixture)
- `test/fixtures/invalid/markdown/bad-headings.md` (invalid fixture)

Test coverage:
- Valid markdown passes all checks
- Invalid markdown detects: MD001, MD004, MD025, MD034, MD036, MD040
- Best practices enforcement

## Testing

```bash
# Run markdown linter
npm run lint:markdown

# Run markdown tests
node --test test/validators/markdownlint.test.js

# Run all tests (now 137 total)
npm run test:all
```

## Dependencies

- markdownlint-cli: ^0.47.0 (already installed)

## Integration Points

- Works with markdown-author skill for content guidance
- Hooks trigger on all .md file edits
- Fix suggestions show auto-fix commands where available
- Spelling extended to cover markdown content

## Unblocks

- xhtml-test-lvf: Markdown slash commands (can now reference validation)
