# Skill Update Notes

Issues observed during the session that could be improved in skill definitions or Claude's behavior.

## Session: 2025-12-26

### 1. Skills Not Invoked Automatically on First Task

**Issue:** When asked to create `examples/hello.html`, I attempted to write the file directly without invoking any skills. User had to ask "You did not use any of your skills here why?"

**Expected behavior:** Should automatically invoke relevant skills before code work:
- `pre-flight-check` - Always first for any code changes
- `xhtml-author` - When creating/editing HTML files

**Recommendation:** Add stronger triggers in skill descriptions, or add a meta-instruction that certain skills should be auto-invoked based on file type:
- `.html` files → `xhtml-author`, `accessibility-checker`
- `.css` files → `css-author`
- `.js` files → `javascript-author`

---

### 2. Icons Skill Not Used for Theme Switcher

**Issue:** When implementing the theme switcher, I used inline SVG icons instead of the project's `<x-icon>` component pattern defined in the `icons` skill.

**What I did:**
```html
<label for="theme-light" title="Light theme">
  <svg aria-hidden="true" viewBox="0 0 24 24"><path d="..."/></svg>
  <span class="sr-only">Light</span>
</label>
```

**What I should have done:**
```html
<label for="theme-light" title="Light theme">
  <x-icon name="sun" label="Light"></x-icon>
</label>
```

**Root cause:**
- The `icons` skill wasn't in my mental checklist when adding visual elements
- I was focused on the theme switching mechanism, not the icon implementation
- The skill should perhaps be linked from `xhtml-author` or `css-author` when adding visual elements

**Recommendation:**
- Add "icons" to the pre-flight checklist under "Images Pre-Flight" or create a new "Visual Elements" section
- Cross-reference icons skill in xhtml-author skill
- Consider: "When adding any visual indicator or icon, invoke the icons skill"

---

### 3. Pre-flight Check Could Be More Directive

**Issue:** The pre-flight check skill lists what to verify but doesn't strongly enforce that I should create issues/branches for small tasks in example/demo projects.

**Observation:** For a simple "create hello.html" task, the full git workflow (create issue, feature branch, etc.) may be overhead. The skill could distinguish between:
- Production code changes (full workflow required)
- Example/demo/prototype work (simplified workflow acceptable)

**Recommendation:** Add context-awareness to pre-flight check:
- If working in `examples/`, `demo/`, `test/` directories, allow streamlined workflow
- Or explicitly state "Always follow full workflow regardless of directory"

---

### 4. Skill Discovery During Multi-Step Tasks

**Issue:** When implementing features that span multiple skills (theme system = CSS + JS + data-storage + progressive-enhancement), it's easy to miss one.

**Example:** I invoked `css-author`, `javascript-author`, `data-storage`, and `progressive-enhancement`, but missed `icons`.

**Recommendation:**
- Skills could have a "related skills for common tasks" section
- Example: `progressive-enhancement` could say "For theme toggles, also consider: icons, data-storage, animation-motion"
- Or add a "Common Patterns" skill that lists which skills to combine for typical features

---

## Suggested Skill Improvements

### For `pre-flight-check`:
```markdown
## Auto-Invoke Rules

These skills should be invoked automatically based on context:

| Context | Auto-invoke |
|---------|-------------|
| Any code change | pre-flight-check (this skill) |
| Creating/editing .html | xhtml-author, accessibility-checker |
| Creating/editing .css | css-author |
| Creating/editing .js | javascript-author |
| Adding icons/visual indicators | icons |
| Adding images | responsive-images, placeholder-images |
```

### For `icons`:
```markdown
## When to Use This Skill

ALWAYS use this skill when:
- Adding any icon to the UI
- Creating buttons with visual indicators
- Building navigation with icons
- Adding status indicators

DO NOT use inline SVGs - use the <x-icon> component instead.
```

### For `xhtml-author`:
```markdown
## Related Skills to Consider

When writing HTML, also consider:
- **icons** - For any icon or visual indicator
- **forms** - For any form elements
- **responsive-images** - For any images
- **metadata** - For page head content
```

---

## Action Items

1. [ ] Update `pre-flight-check` with auto-invoke guidance
2. [ ] Add cross-references between related skills
3. [ ] Consider a "Common Patterns" skill for multi-skill features
4. [ ] Update `icons` skill to be more emphatic about when to use it
