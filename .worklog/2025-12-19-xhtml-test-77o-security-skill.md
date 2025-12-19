# Worklog: Security Skill for Secure Web Development

**Issue**: xhtml-test-77o
**Date**: 2025-12-19
**Status**: Complete

## Summary

Created a new Claude Code skill for writing secure web pages and applications, covering both client-side and server-side security considerations.

## Changes Made

### New Files
- `.claude/skills/security/SKILL.md` - Comprehensive security guidance

### Modified Files
- `README.md` - Updated skills count (17 → 18) and added security to skills table

## Skill Coverage

The security skill provides guidance for:

### OWASP Top 10 Awareness
- Injection prevention
- Authentication security
- Sensitive data exposure
- Security misconfiguration
- XSS prevention

### Transport Security
- HTTPS requirements
- Mixed content prevention
- HSTS guidance

### Security Headers
- X-Frame-Options
- X-Content-Type-Options
- Referrer-Policy
- Permissions-Policy
- Meta tag equivalents

### Content Security Policy (CSP)
- Basic restrictive policy template
- All directives documented
- Source values reference
- Nonce-based scripts
- Hash-based scripts

### Subresource Integrity (SRI)
- External resource protection
- Hash generation instructions
- When to use SRI

### Form Security
- CSRF token patterns
- Secure form attributes
- Form action security

### Input Validation
- HTML5 validation attributes
- Pattern examples
- Client vs server validation

### Output Encoding
- XSS prevention
- Context-specific encoding

### Secure Links
- rel="noopener noreferrer"
- User-generated link handling

### Clickjacking Prevention
- Frame options
- CSP frame-ancestors
- Frame-busting fallback

### Sensitive Data
- No secrets in HTML
- Password field best practices
- Cache control

### Cookie Security
- Secure, HttpOnly, SameSite
- Cookie attribute reference

### JavaScript Security
- Safe DOM manipulation
- Dangerous functions to avoid
- URL validation

### Error Handling
- No stack trace exposure
- Generic user messages

## Cross-Skill Integration

The security skill notes integration with:
- `forms` - Form validation, autocomplete
- `javascript-author` - Safe DOM manipulation
- `metadata` - Security meta tags
- `performance` - SRI-compatible resource loading

## Evaluation: Additional Skills Needed?

Analyzed whether the security skill should be split or if additional skills are needed:

### Recommendation: Single Comprehensive Skill

The security skill covers the main use cases well as a unified resource. Breaking it into multiple skills would:
- Fragment related security concerns
- Make it harder to see the full security picture
- Create confusion about which skill to consult

### Potential Future Skills (Backlog Candidates)

If scope expands, these could become separate skills:

1. **privacy** - GDPR compliance, cookie consent banners, privacy-focused patterns
   - Currently not in scope for HTML-first development
   - Would require legal/compliance knowledge

2. **authentication** - Login flows, session management, OAuth patterns
   - Heavy overlap with security skill
   - More backend-focused than HTML-first

3. **server-config** - nginx/Apache security headers, TLS configuration
   - Outside HTML-first scope
   - Better suited as documentation reference

### Current Cross-Triggering

The security skill should auto-activate when:
- Building forms (with forms skill)
- Adding external resources (with performance skill)
- Writing JavaScript (with javascript-author skill)
- Configuring meta tags (with metadata skill)

No new skills needed at this time.

## Testing

```bash
# Verify skill is loadable
cat .claude/skills/security/SKILL.md

# Verify README updates
grep -c "security" README.md
```
