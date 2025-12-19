# UAT: i18n Skill for Internationalized Web Pages

**Feature**: i18n-skill
**Issue**: xhtml-test-a0e
**Branch**: feature/xhtml-test-a0e-i18n-skill
**Requested**: 2025-12-19
**Status**: APPROVED
**Approved**: 2025-12-19
**Approver**: Human (via /uat approve)

---

## Summary

New Claude Code skill for writing internationalization-friendly HTML pages.

**Problem solved**: No guidance existed for creating multilingual content, handling RTL languages, or preparing content for translation.

**Solution**: Created `.claude/skills/i18n/SKILL.md` with comprehensive i18n authoring guidance covering:
- Language attributes (`lang`, `dir`, `hreflang`)
- Character encoding (UTF-8)
- Translation-friendly markup patterns
- Date/time/number formatting
- Pluralization considerations
- Accessibility for i18n

---

## Testing Instructions

### 1. Review skill content

```bash
cat .claude/skills/i18n/SKILL.md
```

**Expected**:
- YAML frontmatter with name, description, allowed-tools
- Comprehensive sections on lang, dir, hreflang
- BCP 47 language tag reference table
- RTL language guidance
- Translation-friendly markup patterns
- Date/time/number formatting examples
- i18n checklist at the end

### 2. Verify XHTML syntax in examples

```bash
grep -E "<(meta|link|input|br|hr|img)" .claude/skills/i18n/SKILL.md
```

**Expected**:
- All void elements use self-closing syntax (`/>`)
- Examples follow XHTML conventions

### 3. Verify README updates

```bash
grep "i18n" README.md
```

**Expected**:
- i18n appears in skills table with description
- Skills count updated to 16
- i18n directory listed in project structure

### 4. Verify skill count consistency

```bash
grep -E "\(1[56] (skills|total)\)" README.md
```

**Expected**:
- All references show 16 skills (not 15)

### 5. Test skill discovery

```bash
ls .claude/skills/ | wc -l
```

**Expected**: 16 directories

---

## Expected Results

- [ ] SKILL.md has proper YAML frontmatter
- [ ] All code examples use XHTML syntax
- [ ] BCP 47 language tag table is comprehensive
- [ ] RTL guidance includes Arabic, Hebrew examples
- [ ] hreflang pattern includes x-default
- [ ] Translation-friendly patterns avoid concatenation
- [ ] Date/time uses `<time datetime="...">`
- [ ] Numbers/currency use `<data value="...">`
- [ ] i18n checklist covers all key points
- [ ] README shows 16 skills everywhere
- [ ] i18n skill appears in skills table
- [ ] i18n directory listed in project structure

---

## How to Respond

After testing, respond with one of:

```
/uat approve i18n-skill
```
The i18n skill provides comprehensive internationalization guidance

```
/uat deny i18n-skill
```
Needs changes (please provide feedback)

---

## Technical Details

### Skill Triggers

The i18n skill should auto-activate when:
- Setting `lang` attributes on HTML elements
- Working with RTL content
- Adding `hreflang` links
- Discussing translation or localization
- Formatting dates, times, or currency for multiple locales

### Key Patterns Documented

| Pattern | Purpose |
|---------|---------|
| `<html lang="en">` | Document language declaration |
| `<html dir="rtl">` | Right-to-left text direction |
| `<link hreflang="...">` | Alternate language versions |
| `<span lang="fr">` | Inline language changes |
| `<time datetime="...">` | Machine-readable dates |
| `<data value="...">` | Raw values for formatting |
| `translate="no"` | Exclude from translation |

### Integration Points

- Works with `xhtml-author` for syntax compliance
- Works with `content-writer` for text quality
- Works with `metadata` for `og:locale` tags
- Works with `accessibility-checker` for screen reader considerations

---

## History

| Date | Action | Notes |
|------|--------|-------|
| 2025-12-19 | Created | Initial i18n skill implementation |
| 2025-12-19 | Approved | UAT passed |
