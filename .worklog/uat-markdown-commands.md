# UAT: Markdown Slash Commands

**Feature**: markdown-commands
**Issue**: xhtml-test-lvf
**Branch**: feature/xhtml-test-lvf-markdown-commands
**Requested**: 2025-12-19
**Status**: PENDING

---

## Summary

Added 4 slash commands for common markdown authoring tasks.

**Problem solved**: No quick way to insert common markdown structures like TOC, frontmatter, callouts, or code blocks.

**Solution**: Created 4 slash commands that Claude interprets as instructions for generating markdown content.

---

## Testing Instructions

### 1. Verify command files exist

```bash
ls -la .claude/commands/add-toc.md .claude/commands/add-frontmatter.md .claude/commands/add-callout.md .claude/commands/add-code-block.md
```

**Expected**: All 4 files exist

### 2. Review /add-toc command

```bash
cat .claude/commands/add-toc.md
```

**Expected**:
- Instructions for scanning headings
- Anchor link generation rules
- TOC marker format (`<!-- TOC -->`)
- Max depth option

### 3. Review /add-frontmatter command

```bash
cat .claude/commands/add-frontmatter.md
```

**Expected**:
- Templates for blog, docs, changelog, default
- YAML syntax examples
- Field descriptions table

### 4. Review /add-callout command

```bash
cat .claude/commands/add-callout.md
```

**Expected**:
- 5 callout types (note, tip, warning, danger, info)
- Blockquote syntax examples
- Emoji options
- Accessibility notes

### 5. Review /add-code-block command

```bash
cat .claude/commands/add-code-block.md
```

**Expected**:
- Language identifier table
- Filename hint format
- Diff syntax example
- Common languages listed

### 6. Verify README updates

```bash
grep "add-toc\|add-frontmatter\|add-callout\|add-code-block" README.md
```

**Expected**: All 4 commands appear in slash commands table

### 7. Count total commands

```bash
ls .claude/commands/*.md | wc -l
```

**Expected**: 12 commands

---

## Expected Results

- [ ] /add-toc.md exists with TOC generation instructions
- [ ] /add-frontmatter.md exists with 4 template types
- [ ] /add-callout.md exists with 5 callout types
- [ ] /add-code-block.md exists with language identifiers
- [ ] README lists all 4 new commands
- [ ] Project structure shows 12 commands

---

## How to Respond

After testing, respond with one of:

```
/uat approve markdown-commands
```
All 4 markdown slash commands work as documented

```
/uat deny markdown-commands
```
Needs changes (please provide feedback)

---

## Command Reference

| Command | Purpose | Arguments |
|---------|---------|-----------|
| `/add-toc` | Generate table of contents | `[file] [max-depth]` |
| `/add-frontmatter` | Add YAML frontmatter | `blog\|docs\|changelog\|default` |
| `/add-callout` | Insert callout block | `note\|tip\|warning\|danger\|info` |
| `/add-code-block` | Insert code block | `[language]` |

---

## History

| Date | Action | Notes |
|------|--------|-------|
| 2025-12-19 | Created | 4 markdown slash commands |
