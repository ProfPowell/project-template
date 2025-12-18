# Worklog Directory

This directory contains markdown files documenting each development effort.

## Purpose

- **Recovery**: Restore work if something goes wrong
- **Context**: Understand what was done and why
- **Audit Trail**: Track changes over time
- **Onboarding**: Help new contributors understand history

## File Naming Convention

```
YYYY-MM-DD-<issue-id>-<short-description>.md
```

Examples:
- `2025-01-15-xhtml-test-123-dark-mode.md`
- `2025-01-16-xhtml-test-456-form-validation.md`

## Template

Use `TEMPLATE.md` as a starting point for new worklog entries.

## Workflow

1. Create worklog entry when starting significant work
2. Update as work progresses
3. Mark complete when UAT is approved
4. Keep for historical reference

## Finding Worklogs

```bash
# Recent worklogs
ls -la .worklog/*.md | tail -10

# Search by issue ID
grep -l "xhtml-test-123" .worklog/*.md

# Search by keyword
grep -r "dark mode" .worklog/
```
