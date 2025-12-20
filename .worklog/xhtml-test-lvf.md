# Worklog: Markdown Slash Commands

**Issue**: xhtml-test-lvf
**Branch**: feature/xhtml-test-lvf-markdown-commands
**Started**: 2025-12-19
**Status**: Ready for UAT

---

## Summary

Added 4 slash commands for common markdown authoring tasks.

## Commands Created

### 1. /add-toc

Generate a table of contents from markdown headings.

**File**: `.claude/commands/add-toc.md`

Features:
- Scans markdown file for headings
- Generates anchor links
- Supports max depth parameter
- Uses `<!-- TOC -->` markers for regeneration
- Skips headings inside code blocks

### 2. /add-frontmatter

Add YAML frontmatter template to markdown file.

**File**: `.claude/commands/add-frontmatter.md`

Templates:
- `blog` - Blog post (title, author, date, tags, image)
- `docs` - Documentation (title, description, sidebar_position)
- `changelog` - Release notes (version, date, breaking)
- `default` - Minimal (title, description)

### 3. /add-callout

Insert callout/admonition block.

**File**: `.claude/commands/add-callout.md`

Types:
- `note` - General information
- `tip` - Helpful suggestions
- `warning` - Caution messages
- `danger` - Critical warnings
- `info` - Informational context

Uses GFM-compatible blockquote syntax with optional emoji.

### 4. /add-code-block

Insert fenced code block with language identifier.

**File**: `.claude/commands/add-code-block.md`

Features:
- Prompts for language if not specified
- Common language identifiers table
- Supports filename hints
- Diff syntax for showing changes

## README Updates

- Added 4 new commands to slash commands table
- Updated project structure with new command files
- Command count updated to 12

## Integration

Works with:
- `markdown-author` skill for content guidance
- `markdownlint` for validation
- `cspell` for spelling

## Testing

```bash
# Verify commands exist
ls .claude/commands/add-*.md

# Test a command
/add-callout warning
/add-frontmatter blog
/add-toc README.md
/add-code-block javascript
```
