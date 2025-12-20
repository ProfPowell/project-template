# Worklog: Pattern Library Generator (xhtml-test-y6o)

## Summary

Implemented an auto-generating pattern library that documents all custom elements defined in the project with usage examples extracted from the codebase.

## Changes Made

### New Files

- `scripts/generate-patterns.js` - Main generator script
- `docs/patterns/index.html` - Generated pattern library output

### Modified Files

- `package.json` - Added `generate:patterns` npm script

## Features Implemented

1. **Element Definition Parsing**
   - Reads `elements.json` for all custom element definitions
   - Extracts attributes, content models, and types

2. **Usage Example Extraction**
   - Scans `examples/` directory for HTML files
   - Finds actual usage of each custom element
   - Extracts up to 3 representative code snippets per element
   - Searches for contextual examples with surrounding parent elements

3. **HTML Documentation Generation**
   - Generates accessible, valid XHTML output
   - Includes table of contents with links to each element
   - Documents element type (void, inline, block)
   - Lists permitted content
   - Shows attributes with type, required status
   - Displays code examples from the codebase
   - Links to related skill documentation
   - Supports dark mode via `prefers-color-scheme`

4. **Skill Mapping**
   - Maps elements to their related skills (forms, patterns, etc.)
   - Defaults to custom-elements skill for unmapped elements

## Output Statistics

- **24 custom elements** documented
- **35 usage examples** extracted
- **17 elements** with examples found
- **7 elements** with no usage yet (documented but not used)

## Commands

```bash
# Generate pattern library
npm run generate:patterns

# Generate to custom location
node scripts/generate-patterns.js --output=./my-docs
```

## Validation

- Generated HTML passes html-validate
- Script passes ESLint (3 warnings for function length, acceptable for generators)
- All 136 project tests pass

## Notes

- Elements without usage examples show "No usage examples found" message
- Output uses CSS custom properties for theming
- Tables have proper `scope="col"` for accessibility
- No trailing whitespace in generated output
