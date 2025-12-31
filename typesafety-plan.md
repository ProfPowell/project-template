# Type Safety Plan for project-template

## Executive Summary

Add deterministic type safety across the stack using:
1. **tsc --checkJs** - TypeScript compiler validates JavaScript with JSDoc annotations (no `.ts` files)
2. **JSON Schema + AJV** - Runtime validation at all data boundaries
3. **Single source of truth** - Schemas used for validation, OpenAPI docs, and type generation

This approach aligns with the project's philosophy: deterministic checking, no unnecessary build steps, progressive enhancement.

---

## Phase 1: Foundation - jsconfig.json Configuration

Add TypeScript checking to JavaScript files without changing to TypeScript.

### Create jsconfig.json

Location: Project root (and in REST API starter)

```json
{
  "$schema": "https://json.schemastore.org/jsconfig",
  "compilerOptions": {
    "checkJs": true,
    "strict": true,
    "noImplicitAny": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "baseUrl": ".",
    "paths": {
      "@schemas/*": ["schemas/*"],
      "@types/*": ["src/types/*"]
    }
  },
  "include": ["src/**/*.js", "schemas/**/*.js"],
  "exclude": ["node_modules", "dist"]
}
```

### Key Settings Explained

| Setting | Purpose |
|---------|---------|
| `checkJs: true` | Enable TypeScript checking on `.js` files |
| `strict: true` | Catch null/undefined, implicit any |
| `noUncheckedIndexedAccess` | Array access returns `T \| undefined` |
| `exactOptionalPropertyTypes` | Distinguish missing vs undefined |

### Files to Create/Modify

- `jsconfig.json` (new - project root)
- `.claude/starters/rest-api/jsconfig.json` (new)

---

## Phase 2: JSON Schema + AJV Integration

### Install Dependencies

Add to `.claude/starters/rest-api/package.json`:

```json
{
  "dependencies": {
    "ajv": "^8.17.0",
    "ajv-formats": "^3.0.0"
  },
  "devDependencies": {
    "json-schema-to-typescript": "^15.0.0"
  },
  "scripts": {
    "generate:types": "json2ts -i schemas -o src/types/generated",
    "typecheck": "tsc --noEmit"
  }
}
```

### Schema Directory Structure

```
project/
schemas/                         # All JSON Schemas
  common/
    error-response.schema.json   # Standard error format
    pagination.schema.json       # Pagination params
    uuid.schema.json             # UUID format
  entities/
    user.schema.json             # Full user entity
    user.create.schema.json      # Create input (no id, timestamps)
    user.update.schema.json      # Partial update
  api/
    login.schema.json            # Login request
    register.schema.json         # Registration request
src/
  lib/
    validator.js                 # AJV instance + helpers
  api/
    middleware/
      validate.js                # Validation middleware
  types/
    generated/                   # Auto-generated from schemas
      *.d.ts
    domain.types.js              # Manual JSDoc types
```

### Naming Convention

| Pattern | Example | Purpose |
|---------|---------|---------|
| `{entity}.schema.json` | `user.schema.json` | Full entity with all fields |
| `{entity}.create.schema.json` | `user.create.schema.json` | Create input (no id/timestamps) |
| `{entity}.update.schema.json` | `user.update.schema.json` | Partial update (all optional) |

---

## Phase 3: Core Implementation

### 3.1 Validator Module

Create `src/lib/validator.js`:

```javascript
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import { readFileSync, readdirSync, statSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

/**
 * @typedef {import('ajv').ValidateFunction} ValidateFunction
 */

/**
 * Create configured AJV instance
 * @returns {Ajv}
 */
function createValidator() {
  const ajv = new Ajv({
    allErrors: true,
    removeAdditional: 'all',
    useDefaults: true,
    coerceTypes: false,
    strict: true
  });

  addFormats(ajv);
  loadSchemas(ajv);
  return ajv;
}

/**
 * Load all schemas from /schemas directory
 * @param {Ajv} ajv
 */
function loadSchemas(ajv) {
  const schemasDir = join(__dirname, '../../schemas');
  loadRecursive(ajv, schemasDir);
}

/**
 * @param {Ajv} ajv
 * @param {string} dir
 */
function loadRecursive(ajv, dir) {
  for (const entry of readdirSync(dir)) {
    const fullPath = join(dir, entry);
    if (statSync(fullPath).isDirectory()) {
      loadRecursive(ajv, fullPath);
    } else if (entry.endsWith('.schema.json')) {
      const schema = JSON.parse(readFileSync(fullPath, 'utf-8'));
      if (schema.$id) ajv.addSchema(schema);
    }
  }
}

/** @type {Ajv | null} */
let instance = null;

/**
 * Get shared validator instance (compile once)
 * @returns {Ajv}
 */
export function getValidator() {
  if (!instance) instance = createValidator();
  return instance;
}
```

### 3.2 Validation Middleware

Create `src/api/middleware/validate.js`:

```javascript
import { getValidator } from '../../lib/validator.js';

/**
 * Format AJV errors to standard API format
 * @param {import('ajv').ErrorObject[]} errors
 * @returns {Array<{path: string, message: string, keyword: string}>}
 */
function formatErrors(errors) {
  return errors.map(e => ({
    path: e.instancePath || '/',
    message: getErrorMessage(e),
    keyword: e.keyword
  }));
}

/**
 * @param {import('ajv').ErrorObject} error
 * @returns {string}
 */
function getErrorMessage(error) {
  switch (error.keyword) {
    case 'required': return `Missing required field: ${error.params.missingProperty}`;
    case 'type': return `Expected ${error.params.type}`;
    case 'format': return `Invalid ${error.params.format} format`;
    case 'enum': return `Must be one of: ${error.params.allowedValues.join(', ')}`;
    case 'minLength': return `Must be at least ${error.params.limit} characters`;
    case 'maxLength': return `Must be at most ${error.params.limit} characters`;
    case 'additionalProperties': return `Unknown field: ${error.params.additionalProperty}`;
    default: return error.message || 'Invalid value';
  }
}

/**
 * Create body validation middleware
 * @param {string} schemaId - Schema $id
 * @returns {import('express').RequestHandler}
 */
export function validateBody(schemaId) {
  const ajv = getValidator();
  const validate = ajv.getSchema(schemaId);
  if (!validate) throw new Error(`Schema not found: ${schemaId}`);

  return (req, res, next) => {
    if (!validate(req.body)) {
      return res.status(422).json({
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Request validation failed',
          details: formatErrors(validate.errors)
        }
      });
    }
    next();
  };
}

/**
 * Create query validation middleware
 * @param {string} schemaId
 * @returns {import('express').RequestHandler}
 */
export function validateQuery(schemaId) {
  const ajv = getValidator();
  const validate = ajv.getSchema(schemaId);
  if (!validate) throw new Error(`Schema not found: ${schemaId}`);

  return (req, res, next) => {
    if (!validate(req.query)) {
      return res.status(400).json({
        error: {
          code: 'INVALID_QUERY',
          message: 'Query parameter validation failed',
          details: formatErrors(validate.errors)
        }
      });
    }
    next();
  };
}
```

### 3.3 Route Usage

```javascript
// src/api/routes.js
import { validateBody, validateQuery } from './middleware/validate.js';

// Validate request body
app.post('/api/users',
  validateBody('https://api.example.com/schemas/entities/user.create'),
  createUser
);

// Validate query parameters
app.get('/api/users',
  validateQuery('https://api.example.com/schemas/api/list-users'),
  listUsers
);
```

---

## Phase 4: Type Generation Workflow

### Generate Types Script

Create `scripts/generate-types.js`:

```javascript
#!/usr/bin/env node
import { compileFromFile } from 'json-schema-to-typescript';
import { writeFileSync, mkdirSync, readdirSync, statSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SCHEMAS = join(__dirname, '../schemas');
const OUTPUT = join(__dirname, '../src/types/generated');

async function generate() {
  mkdirSync(OUTPUT, { recursive: true });
  await processDir(SCHEMAS);
}

async function processDir(dir) {
  for (const entry of readdirSync(dir)) {
    const path = join(dir, entry);
    if (statSync(path).isDirectory()) {
      await processDir(path);
    } else if (entry.endsWith('.schema.json')) {
      const ts = await compileFromFile(path, {
        bannerComment: '/* Auto-generated. Do not edit. */'
      });
      const outPath = join(OUTPUT, entry.replace('.schema.json', '.d.ts'));
      writeFileSync(outPath, ts);
      console.log(`Generated: ${outPath}`);
    }
  }
}

generate();
```

### JSDoc Usage of Generated Types

```javascript
// src/services/user.js

/**
 * @typedef {import('../types/generated/user.create').UserCreate} CreateUserInput
 * @typedef {import('../types/generated/user').User} User
 */

/**
 * Create a new user
 * @param {CreateUserInput} data - Validated input
 * @returns {Promise<User>}
 */
export async function createUser(data) {
  const { email, name, role } = data;
  // data already validated by middleware
  // types provide autocomplete + tsc checking
}
```

---

## Phase 5: PostToolUse Hook Integration

### Add Type Check Script

Create `.claude/scripts/type-check.js`:

```javascript
#!/usr/bin/env node
import { execSync } from 'child_process';
import { extname } from 'path';

const file = process.argv[2];
if (!file || extname(file) !== '.js') process.exit(0);
if (!file.includes('/src/')) process.exit(0);

console.log('=== tsc --checkJs ===');
try {
  execSync(`npx tsc --noEmit "${file}"`, { encoding: 'utf-8', stdio: 'pipe' });
  console.log('No type errors');
} catch (err) {
  const output = err.stdout || err.stderr || '';
  for (const line of output.split('\n')) {
    if (line.includes('error TS')) console.log(`error: ${line}`);
  }
}
```

### Update settings.json Hooks

Add to `.claude/settings.json` PostToolUse hooks:

```json
{
  "type": "command",
  "command": "file_path=$(jq -r '.tool_input.file_path // empty' 2>/dev/null); if [ -n \"$file_path\" ] && echo \"$file_path\" | grep -qE '\\.js$'; then node .claude/scripts/type-check.js \"$file_path\" 2>&1 | head -20; fi"
}
```

---

## Phase 6: New Validation Skill

Create `.claude/skills/validation/SKILL.md` covering:

1. JSON Schema authoring patterns
2. AJV configuration and custom formats
3. Validation middleware usage
4. Schema-to-type generation
5. Frontend form validation (same schemas)
6. OpenAPI integration with $ref

---

## Phase 7: Update Related Skills

### Files to Update

| Skill | Change |
|-------|--------|
| `rest-api/SKILL.md` | Add validation middleware section |
| `forms/SKILL.md` | Add server-side schema validation reference |
| `error-handling/SKILL.md` | Add ValidationError with AJV error format |
| `security/SKILL.md` | Reference validation as input sanitization layer |

---

## Validation Boundaries Summary

| Boundary | Mechanism | Status Code |
|----------|-----------|-------------|
| API Request Body | `validateBody()` middleware | 422 |
| Query Parameters | `validateQuery()` middleware | 400 |
| Path Parameters | `validateParams()` middleware | 400 |
| Database Writes | Pre-insert validation in services | 500 (internal) |
| HTML Forms | HTML5 attributes (UX) + server validation | 422 |

---

## Implementation Order

1. **jsconfig.json** - Enable tsc checking immediately
2. **Dependencies** - Add AJV, ajv-formats, json-schema-to-typescript
3. **Schema directory** - Create structure with common schemas
4. **Validator module** - `src/lib/validator.js`
5. **Validation middleware** - `src/api/middleware/validate.js`
6. **Type generation script** - `scripts/generate-types.js`
7. **PostToolUse hook** - `.claude/scripts/type-check.js`
8. **Validation skill** - `.claude/skills/validation/SKILL.md`
9. **Skill updates** - Cross-references in related skills

---

## Critical Files

**New Files:**
- `jsconfig.json`
- `.claude/starters/rest-api/jsconfig.json`
- `.claude/starters/rest-api/schemas/` (directory with initial schemas)
- `.claude/starters/rest-api/src/lib/validator.js`
- `.claude/starters/rest-api/src/api/middleware/validate.js`
- `.claude/starters/rest-api/scripts/generate-types.js`
- `.claude/scripts/type-check.js`
- `.claude/skills/validation/SKILL.md`

**Files to Modify:**
- `.claude/starters/rest-api/package.json` (add dependencies)
- `.claude/settings.json` (add type-check hook)
- `.claude/skills/rest-api/SKILL.md` (add validation section)
- `.claude/skills/error-handling/SKILL.md` (add ValidationError)

---

## Success Criteria

- [ ] `npm run typecheck` passes with no errors
- [ ] All API endpoints have request validation
- [ ] Validation errors return consistent `{error: {code, message, details}}` format
- [ ] Types are auto-generated from schemas
- [ ] PostToolUse hook reports type errors on save
- [ ] Validation skill documents all patterns
