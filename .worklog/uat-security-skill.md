# UAT: Security Skill for Secure Web Development

**Feature**: security-skill
**Issue**: xhtml-test-77o
**Branch**: feature/xhtml-test-77o-security-skill
**Requested**: 2025-12-19
**Status**: PENDING

---

## Summary

New Claude Code skill for writing secure web pages and applications.

**Problem solved**: No guidance existed for security best practices including CSP, SRI, XSS prevention, secure forms, or HTTPS requirements.

**Solution**: Created `.claude/skills/security/SKILL.md` with comprehensive security guidance covering:
- OWASP Top 10 awareness
- HTTPS and transport security
- Security headers (server and meta tag)
- Content Security Policy (CSP) configuration
- Subresource Integrity (SRI) for external resources
- Form security (CSRF, validation, secure attributes)
- Input validation patterns
- Output encoding (XSS prevention)
- Secure link handling
- Clickjacking prevention
- Sensitive data handling
- Cookie security
- JavaScript security patterns
- Error handling without information disclosure

---

## Testing Instructions

### 1. Review skill content

```bash
cat .claude/skills/security/SKILL.md
```

**Expected**:
- YAML frontmatter with name, description, allowed-tools
- OWASP Top 10 reference table
- HTTPS and mixed content guidance
- Security headers section
- Comprehensive CSP documentation with directives table
- SRI examples with hash generation
- Form security with CSRF patterns
- Input validation attributes
- Output encoding guidance
- Secure links with rel attributes
- Cookie security attributes
- JavaScript security patterns
- Security checklist at end

### 2. Verify CSP coverage

```bash
grep -A 5 "CSP Directives Reference" .claude/skills/security/SKILL.md
```

**Expected**:
- Table with default-src, script-src, style-src, img-src, etc.
- Source values reference ('self', 'none', 'unsafe-inline', nonce, hash)
- Nonce and hash examples

### 3. Verify XHTML syntax in examples

```bash
grep -E "<(meta|link|input|img)" .claude/skills/security/SKILL.md | head -20
```

**Expected**:
- All void elements use self-closing syntax (`/>`)
- Examples follow XHTML conventions

### 4. Verify README updates

```bash
grep "security" README.md
```

**Expected**:
- security appears in skills table with description
- Skills count updated to 18
- security directory listed in project structure

### 5. Verify skill count consistency

```bash
grep -E "\(1[78] (skills|total)\)" README.md
```

**Expected**:
- All references show 18 skills (not 17)

### 6. Test skill discovery

```bash
ls .claude/skills/ | wc -l
```

**Expected**: 18 directories

### 7. Verify related skills section

```bash
grep -A 10 "Related Skills" .claude/skills/security/SKILL.md
```

**Expected**:
- Cross-references to forms, javascript-author, metadata, performance skills

---

## Expected Results

- [ ] SKILL.md has proper YAML frontmatter
- [ ] All code examples use XHTML syntax
- [ ] OWASP Top 10 vulnerabilities referenced
- [ ] HTTPS requirements documented
- [ ] Security headers covered (X-Frame-Options, X-Content-Type-Options, etc.)
- [ ] CSP directives table complete
- [ ] CSP source values documented ('self', 'nonce-*', 'sha256-*')
- [ ] SRI examples with integrity attribute
- [ ] CSRF token pattern shown
- [ ] Form validation attributes documented
- [ ] Output encoding for XSS prevention
- [ ] rel="noopener noreferrer" for external links
- [ ] Cookie security attributes (Secure, HttpOnly, SameSite)
- [ ] JavaScript security (textContent vs innerHTML)
- [ ] Security checklist comprehensive
- [ ] Related skills section present
- [ ] README shows 18 skills everywhere
- [ ] security skill appears in skills table
- [ ] security directory listed in project structure

---

## How to Respond

After testing, respond with one of:

```
/uat approve security-skill
```
The security skill provides comprehensive security guidance

```
/uat deny security-skill
```
Needs changes (please provide feedback)

---

## Technical Details

### Skill Triggers

The security skill should auto-activate when:
- Building forms with sensitive data
- Adding external scripts or stylesheets
- Implementing authentication/login pages
- Handling user input
- Adding target="_blank" links
- Discussing CSP or security headers
- Working with cookies or storage

### Key Patterns Documented

| Pattern | Purpose |
|---------|---------|
| CSP meta tag | Content Security Policy |
| SRI integrity | Verify external resources |
| CSRF token | Prevent cross-site request forgery |
| rel="noopener" | Prevent tab nabbing |
| textContent | Safe DOM text insertion |
| autocomplete | Secure form attributes |
| Secure cookie | HttpOnly, Secure, SameSite |

### Integration Points

- Works with `forms` for secure form patterns
- Works with `javascript-author` for safe DOM manipulation
- Works with `metadata` for security meta tags
- Works with `performance` for SRI on preloaded resources

### Evaluation: No Additional Skills Needed

The security skill is comprehensive enough as a single skill. Potential future skills (privacy, authentication, server-config) were evaluated and determined to be either:
- Outside HTML-first scope
- Too overlapping with existing skills
- Better as documentation references

---

## History

| Date | Action | Notes |
|------|--------|-------|
| 2025-12-19 | Created | Initial security skill implementation |
