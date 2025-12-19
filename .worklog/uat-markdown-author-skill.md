# UAT: Markdown Author Skill for Quality Markdown Content

**Feature**: markdown-author-skill
**Issue**: xhtml-test-nii
**Branch**: feature/xhtml-test-nii-markdown-author-skill
**Requested**: 2025-12-19
**Status**: APPROVED
**Approved**: 2025-12-19
**Approver**: Human (via /uat approve)

---

## Summary

New Claude Code skill for writing quality markdown content.

**Problem solved**: No guidance existed for writing well-structured markdown with proper syntax, accessibility, and content quality.

**Solution**: Created `.claude/skills/markdown-author/SKILL.md` with comprehensive markdown guidance covering:
- CommonMark and GFM syntax
- Document structure (single H1, heading hierarchy)
- YAML frontmatter patterns
- Links, images, code blocks, tables, lists
- Accessibility (alt text, descriptive links, heading structure)
- Content quality integration with content-writer skill

---

## Testing Instructions

### 1. Review skill content

```bash
cat .claude/skills/markdown-author/SKILL.md
```

**Expected**:
- YAML frontmatter with name, description, allowed-tools
- Markdown flavors section (CommonMark, GFM)
- Document structure guidance
- YAML frontmatter patterns
- Text formatting reference
- Links section with accessibility guidance
- Images with alt text guidelines
- Code blocks with language identifiers
- Lists (ordered, unordered, task)
- Tables with alignment
- Blockquotes and callouts
- Accessibility section
- Content quality integration
- Markdown checklist

### 2. Verify heading hierarchy guidance

```bash
grep -A 10 "Single H1 Rule" .claude/skills/markdown-author/SKILL.md
```

**Expected**:
- Clear guidance on one H1 per document
- Example showing proper structure

### 3. Verify accessibility coverage

```bash
grep -A 15 "## Accessibility" .claude/skills/markdown-author/SKILL.md
```

**Expected**:
- Heading structure for screen readers
- Descriptive link text
- Image alt text guidelines
- Code block language hints

### 4. Verify README updates

```bash
grep "markdown-author" README.md
```

**Expected**:
- markdown-author appears in skills table
- Skills count updated to 19
- markdown-author directory listed in project structure

### 5. Verify skill count consistency

```bash
grep -E "\(1[89] (skills|total)\)" README.md
```

**Expected**:
- All references show 19 skills (not 18)

### 6. Test skill discovery

```bash
ls .claude/skills/ | wc -l
```

**Expected**: 19 directories

### 7. Verify related skills section

```bash
grep -A 8 "Related Skills" .claude/skills/markdown-author/SKILL.md
```

**Expected**:
- References to content-writer, i18n, git-workflow skills

---

## Expected Results

- [ ] SKILL.md has proper YAML frontmatter
- [ ] CommonMark and GFM differences documented
- [ ] Single H1 rule clearly stated
- [ ] Heading hierarchy guidance with examples
- [ ] YAML frontmatter templates provided
- [ ] Link types covered (inline, reference, internal, anchor)
- [ ] Accessible link text guidance ("not click here")
- [ ] Image alt text guidelines
- [ ] Code block language identifiers table
- [ ] Table alignment syntax shown
- [ ] Task list syntax included
- [ ] Callout/admonition patterns
- [ ] Accessibility section comprehensive
- [ ] Content quality integration noted
- [ ] Markdown checklist at end
- [ ] Common mistakes table
- [ ] Related skills section
- [ ] README shows 19 skills everywhere
- [ ] markdown-author appears in skills table

---

## How to Respond

After testing, respond with one of:

```
/uat approve markdown-author-skill
```
The markdown-author skill provides comprehensive markdown guidance

```
/uat deny markdown-author-skill
```
Needs changes (please provide feedback)

---

## Technical Details

### Skill Triggers

The markdown-author skill should auto-activate when:
- Creating or editing .md files
- Writing README files
- Creating documentation
- Working with frontmatter
- Discussing markdown syntax

### Key Patterns Documented

| Pattern | Purpose |
|---------|---------|
| Single H1 | Document title structure |
| Heading hierarchy | Accessibility, navigation |
| YAML frontmatter | Document metadata |
| Reference links | Clean, maintainable links |
| Alt text | Image accessibility |
| Language hints | Code syntax highlighting |
| Task lists | Checkboxes in markdown |
| Callouts | Highlight important info |

### Integration Points

- Works with `content-writer` for spelling/grammar
- Works with `i18n` for multilingual docs
- Works with `git-workflow` for changelogs/commits

### Unblocks Other Issues

This skill unblocks:
- xhtml-test-q70: Markdown validation hooks
- xhtml-test-lvf: Markdown slash commands

---

## History

| Date | Action | Notes |
|------|--------|-------|
| 2025-12-19 | Created | Initial markdown-author skill implementation |
| 2025-12-19 | Approved | UAT passed |
