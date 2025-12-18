# UAT: Pre-Flight Workflow Enforcement

**Feature**: pre-flight-workflow
**Issue**: xhtml-test-9cx
**Branch**: chore/xhtml-test-9cx-pre-flight-workflow
**Requested**: 2025-12-18
**Status**: PENDING

---

## Summary

Enhanced the pre-flight-check skill to enforce git workflow compliance. The skill now has mandatory checklists at the START and END of every task.

**Problem solved**: Claude was skipping git branches, worklogs, and UAT when working on issues.

**Solution**: Added explicit checklists that Claude must follow before and after code changes.

---

## Testing Instructions

### 1. Review the enhanced skill

```bash
cat .claude/skills/pre-flight-check/SKILL.md | head -60
```

**Expected**: See the new "MANDATORY: Git Workflow Check" section at the top.

### 2. Check for completion checklist

```bash
cat .claude/skills/pre-flight-check/SKILL.md | tail -50
```

**Expected**: See the new "MANDATORY: Completion Checklist" section at the bottom.

### 3. Verify skill description

```bash
head -5 .claude/skills/pre-flight-check/SKILL.md
```

**Expected**: Description says "INVOKE FIRST before any code work" and includes Bash in allowed-tools.

### 4. Test the workflow in practice

Start a new conversation and ask Claude to work on an issue. Observe whether Claude:
- Checks/creates an issue first
- Creates a feature branch
- Creates worklog entry
- Requests UAT before completing

---

## Expected Results

- [ ] Git workflow check section visible at top of skill
- [ ] Completion checklist section visible at bottom of skill
- [ ] Description emphasizes "INVOKE FIRST"
- [ ] Bash is in allowed-tools for git commands
- [ ] Red flags tables help identify workflow mistakes

---

## How to Respond

After testing, respond with one of:

```
/uat approve pre-flight-workflow
```
The workflow enforcement is clear and helpful

```
/uat deny pre-flight-workflow
```
Needs changes (you'll be asked for feedback)

---

## History

| Date | Action | Notes |
|------|--------|-------|
| 2025-12-18 | Requested | Initial UAT request |
