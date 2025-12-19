# Worklog: Performance Skill for Performant Web Pages

**Issue**: xhtml-test-tw9
**Date**: 2025-12-19
**Status**: Complete

## Summary

Created a new Claude Code skill for writing performance-friendly HTML pages.

## Changes Made

### New Files
- `.claude/skills/performance/SKILL.md` - Comprehensive performance guidance

### Modified Files
- `README.md` - Updated skills count (16 → 17) and added performance to skills table

## Skill Coverage

The performance skill provides guidance for:

### Core Web Vitals
- LCP (Largest Contentful Paint) < 2.5s
- INP (Interaction to Next Paint) < 200ms
- CLS (Cumulative Layout Shift) < 0.1

### Resource Hints
- `preconnect` for critical third-party origins
- `dns-prefetch` for less critical origins
- `preload` for critical resources (CSS, fonts, images)
- `prefetch` for likely next pages
- Speculation rules for prerendering

### Fetch Priority
- `fetchpriority="high"` for LCP images
- `fetchpriority="low"` for below-fold content

### Image Optimization
- Lazy loading with `loading="lazy"`
- Async decoding with `decoding="async"`
- Dimensions for CLS prevention
- Modern formats (AVIF, WebP)

### CSS Loading
- Critical CSS inlining
- Non-blocking CSS with media trick
- CSS containment and content-visibility

### JavaScript Loading
- `async` vs `defer` guidance
- Module scripts
- Third-party script optimization
- Facade pattern for heavy embeds

### Font Loading
- `font-display` strategies
- Font preloading
- System font stacks

### Resource Budgets
- Page weight limits
- Per-resource-type budgets
- Integration with lint:budget script

## Testing

```bash
# Verify skill is loadable
cat .claude/skills/performance/SKILL.md

# Verify README updates
grep -c "performance" README.md
```
