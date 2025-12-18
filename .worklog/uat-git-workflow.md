# UAT: Git Workflow

**Feature**: git-workflow
**Issue**: xhtml-test-6bt
**Branch**: main
**Requested**: 2025-12-18
**Status**: PENDING

---

## Summary

This feature adds a structured git workflow to the project including:
- Git repository initialization
- Conventional commits format
- Feature branch workflow
- Work logging in `.worklog/`
- UAT (User Acceptance Testing) mechanism
- Git workflow skill for Claude Code guidance

---

## Testing Instructions

### Part 1: Verify Git Setup

1. **Check git status**:
   ```bash
   git status
   git log --oneline -5
   ```
   Expected: Repository initialized with initial commit

2. **Check skill exists**:
   ```bash
   cat .claude/skills/git-workflow/SKILL.md | head -20
   ```
   Expected: Skill file with proper YAML frontmatter

3. **Check UAT command exists**:
   ```bash
   cat .claude/commands/uat.md | head -20
   ```
   Expected: UAT command documentation

4. **Check worklog structure**:
   ```bash
   ls -la .worklog/
   ```
   Expected: README.md, TEMPLATE.md, and worklog entries

### Part 2: Test the Workflow (Trivial Example)

Create a trivial issue and complete the full workflow:

1. **Create a test issue**:
   ```bash
   bd create --title "Add test comment to README" --type chore --priority P4
   ```
   Note the issue ID (e.g., `xhtml-test-xxx`)

2. **Create feature branch**:
   ```bash
   git checkout -b chore/xhtml-test-xxx-test-comment
   ```

3. **Make a trivial change**:
   Add a comment line to README.md (or any file)

4. **Commit with conventional format**:
   ```bash
   git add README.md
   git commit -m "chore(docs): add test comment to verify workflow"
   ```

5. **Merge to main**:
   ```bash
   git checkout main
   git merge --no-ff chore/xhtml-test-xxx-test-comment
   ```

6. **Close the issue**:
   ```bash
   bd close xhtml-test-xxx --reason "Verified git workflow"
   ```

7. **Delete feature branch**:
   ```bash
   git branch -d chore/xhtml-test-xxx-test-comment
   ```

### Part 3: Verify UAT Command

1. In Claude Code, try the UAT command:
   ```
   /uat status git-workflow
   ```
   Expected: Shows this UAT file status

---

## Expected Results

- [ ] Git repository is properly initialized
- [ ] Initial commit uses conventional commit format
- [ ] Skill file is properly formatted and in correct location
- [ ] UAT command file is properly formatted
- [ ] Worklog directory has README and TEMPLATE
- [ ] Trivial workflow test completes successfully
- [ ] Feature branch can be created, merged, and deleted
- [ ] Issue can be created, updated, and closed with bd

---

## How to Respond

After testing, respond with one of:

```
/uat approve git-workflow
```
Feature works as expected - ready to finalize

```
/uat deny git-workflow
```
Feature needs changes - you'll be asked for feedback on what to fix

---

## History

| Date | Action | Notes |
|------|--------|-------|
| 2025-12-18 | Requested | Initial UAT request |
