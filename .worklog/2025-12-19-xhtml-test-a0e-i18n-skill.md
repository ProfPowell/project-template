# Worklog: i18n Skill for Internationalized Web Pages

**Issue**: xhtml-test-a0e
**Date**: 2025-12-19
**Status**: Pending UAT

## Summary

Created a new Claude Code skill for writing internationalization-friendly HTML pages.

## Changes Made

### New Files
- `.claude/skills/i18n/SKILL.md` - Comprehensive i18n authoring guidance

### Modified Files
- `README.md` - Updated skills count (15 → 16) and added i18n to skills table

## Skill Coverage

The i18n skill provides guidance for:

### Essential Attributes
- `lang` attribute with BCP 47 language tags
- `dir` attribute for RTL languages (Arabic, Hebrew, etc.)
- Inline `lang` for foreign phrases

### Language Alternatives
- `hreflang` link elements for alternate language versions
- Language switcher pattern
- `x-default` for fallback pages

### Character Encoding
- UTF-8 declaration requirements
- Unicode character usage vs HTML entities

### Translation-Friendly Markup
- Avoiding concatenation that breaks translation
- Using `<data>` for values
- `translate="no"` for brand names and code
- Avoiding text in images

### Date, Time, and Numbers
- `<time datetime="...">` for machine-readable dates
- `<data value="...">` for currency and numbers
- Locale-agnostic raw values

### Pluralization
- CLDR plural categories
- Structure for translation systems

### Accessibility
- Language changes for screen readers
- Reading direction for mixed content

### Meta Tags
- `og:locale` and alternates
- `content-language` meta tag

## Testing

```bash
# Verify skill is loadable
cat .claude/skills/i18n/SKILL.md

# Verify README updates
grep -c "i18n" README.md
```

## UAT Checklist

- [ ] SKILL.md contains comprehensive i18n guidance
- [ ] Examples use XHTML syntax (self-closing tags)
- [ ] README updated with skill count and table entry
- [ ] Skill description matches project patterns
