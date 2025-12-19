# UAT: Performance Skill for Performant Web Pages

**Feature**: performance-skill
**Issue**: xhtml-test-tw9
**Branch**: feature/xhtml-test-tw9-performance-skill
**Requested**: 2025-12-19
**Status**: APPROVED
**Approved**: 2025-12-19
**Approver**: Human (via /uat approve)

---

## Summary

New Claude Code skill for writing performance-friendly HTML pages.

**Problem solved**: No guidance existed for optimizing page load, resource hints, or Core Web Vitals.

**Solution**: Created `.claude/skills/performance/SKILL.md` with comprehensive performance guidance covering:
- Core Web Vitals (LCP, INP, CLS)
- Resource hints (preconnect, preload, prefetch)
- Fetch priority hints
- Image optimization (lazy loading, dimensions)
- CSS loading strategies (critical CSS, async)
- JavaScript loading (async, defer, modules)
- Font loading strategies
- Resource budgets

---

## Testing Instructions

### 1. Review skill content

```bash
cat .claude/skills/performance/SKILL.md
```

**Expected**:
- YAML frontmatter with name, description, allowed-tools
- Core Web Vitals section with targets
- Resource hints section (preconnect, preload, prefetch)
- Fetch priority guidance
- Image optimization patterns
- CSS and JS loading strategies
- Font loading best practices
- Resource budgets table
- Performance checklist

### 2. Verify XHTML syntax in examples

```bash
grep -E "<(meta|link|img|script)" .claude/skills/performance/SKILL.md | head -20
```

**Expected**:
- All void elements use self-closing syntax (`/>`)
- Examples follow XHTML conventions

### 3. Verify README updates

```bash
grep "performance" README.md
```

**Expected**:
- performance appears in skills table with description
- Skills count updated to 17
- performance directory listed in project structure

### 4. Verify skill count consistency

```bash
grep -E "\(1[67] (skills|total)\)" README.md
```

**Expected**:
- All references show 17 skills (not 16)

### 5. Test skill discovery

```bash
ls .claude/skills/ | wc -l
```

**Expected**: 17 directories

---

## Expected Results

- [ ] SKILL.md has proper YAML frontmatter
- [ ] All code examples use XHTML syntax
- [ ] Core Web Vitals targets documented (LCP < 2.5s, INP < 200ms, CLS < 0.1)
- [ ] Resource hints cover preconnect, preload, prefetch
- [ ] Fetch priority examples show high/low usage
- [ ] Image optimization covers lazy loading and dimensions
- [ ] CSS loading includes critical CSS inlining
- [ ] JavaScript loading explains async vs defer
- [ ] Font loading covers font-display and preloading
- [ ] Resource budgets table with limits
- [ ] Performance checklist at end
- [ ] References lint:budget and lint:vitals scripts
- [ ] README shows 17 skills everywhere
- [ ] performance skill appears in skills table
- [ ] performance directory listed in project structure

---

## How to Respond

After testing, respond with one of:

```
/uat approve performance-skill
```
The performance skill provides comprehensive performance optimization guidance

```
/uat deny performance-skill
```
Needs changes (please provide feedback)

---

## Technical Details

### Skill Triggers

The performance skill should auto-activate when:
- Adding `<link rel="preload">` or `<link rel="preconnect">`
- Setting `loading="lazy"` on images
- Adding `fetchpriority` attributes
- Discussing page load optimization
- Adding `async` or `defer` to scripts
- Working with font loading

### Key Patterns Documented

| Pattern | Purpose |
|---------|---------|
| `<link rel="preconnect">` | Early connection to origins |
| `<link rel="preload">` | Critical resource loading |
| `fetchpriority="high"` | Prioritize LCP images |
| `loading="lazy"` | Defer below-fold images |
| Critical CSS inline | Avoid render-blocking |
| `<script defer>` | Non-blocking scripts |
| `font-display: swap` | Avoid FOIT |

### Integration Points

- Works with `responsive-images` for image optimization
- Works with `metadata` for resource hints in head
- References `lint:budget` for resource budget checking
- References `lint:vitals` for Web Vitals validation

---

## History

| Date | Action | Notes |
|------|--------|-------|
| 2025-12-19 | Created | Initial performance skill implementation |
| 2025-12-19 | Approved | UAT passed |
