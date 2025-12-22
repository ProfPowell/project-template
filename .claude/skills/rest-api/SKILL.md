---
name: rest-api
description: Write REST API endpoints with HTTP methods, status codes, versioning, and OpenAPI documentation. Use when creating API endpoints or implementing backend services.
allowed-tools: Read, Write, Edit, Glob, Grep
---

# REST API Skill

Write REST API endpoints following project conventions for consistency, security, and progressive enhancement.

---

## When to Use

- Creating API endpoints
- Handling HTTP methods and status codes
- Supporting both JSON and form-encoded requests
- Implementing versioning strategies
- Building endpoints that support HTML form fallback

---

## HTTP Methods

### Standard Methods

```javascript
// Express example
app.get('/api/users/:id', getUser);      // Read
app.post('/api/users', createUser);       // Create
app.put('/api/users/:id', replaceUser);   // Replace entire resource
app.patch('/api/users/:id', updateUser);  // Partial update
app.delete('/api/users/:id', deleteUser); // Delete
```

### Form Fallback with API_METHOD

HTML forms only support GET and POST. For progressive enhancement, support `API_METHOD` field:

```javascript
/**
 * Middleware to support API_METHOD for HTML forms
 * Allows PUT/PATCH/DELETE via POST when JavaScript unavailable
 */
function methodOverride(req, res, next) {
  if (req.method === 'POST' && req.body?.API_METHOD) {
    const method = req.body.API_METHOD.toUpperCase();
    if (['PUT', 'PATCH', 'DELETE'].includes(method)) {
      req.method = method;
      delete req.body.API_METHOD;
    }
  }
  next();
}

app.use(methodOverride);
```

**HTML Form Example:**

```html
<form method="post" action="/api/users/123">
  <input type="hidden" name="API_METHOD" value="DELETE"/>
  <button type="submit">Delete User</button>
</form>
```

---

## Content Types

### Accept Both JSON and Form Data

```javascript
import express from 'express';

const app = express();

// Parse both content types
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * Unified request body access
 * Works regardless of Content-Type
 */
app.post('/api/users', (req, res) => {
  // req.body works for both:
  // - application/json
  // - application/x-www-form-urlencoded
  const { name, email } = req.body;
  // ...
});
```

### Response Content Negotiation

```javascript
/**
 * Respond with JSON or HTML based on Accept header
 * @param {Request} req
 * @param {Response} res
 * @param {object} data - Data to send
 * @param {string} template - HTML template path
 */
function respond(req, res, data, template) {
  const acceptsHtml = req.accepts(['html', 'json']) === 'html';

  if (acceptsHtml && template) {
    res.render(template, data);
  } else {
    res.json(data);
  }
}

// Usage
app.get('/api/users/:id', async (req, res) => {
  const user = await getUser(req.params.id);
  respond(req, res, { user }, 'users/show');
});
```

---

## Status Codes

### Success Codes

| Code | When to Use | Example |
|------|-------------|---------|
| `200 OK` | Successful read/update | GET /users/123, PATCH /users/123 |
| `201 Created` | Resource created | POST /users |
| `204 No Content` | Successful delete | DELETE /users/123 |

### Client Error Codes

| Code | When to Use | Example |
|------|-------------|---------|
| `400 Bad Request` | Invalid input | Missing required field |
| `401 Unauthorized` | Not authenticated | Missing/invalid token |
| `403 Forbidden` | Not authorized | Accessing another user's data |
| `404 Not Found` | Resource doesn't exist | GET /users/999 |
| `409 Conflict` | State conflict | Duplicate email |
| `422 Unprocessable Entity` | Validation failed | Email format invalid |
| `429 Too Many Requests` | Rate limit exceeded | Too many API calls |

### Server Error Codes

| Code | When to Use |
|------|-------------|
| `500 Internal Server Error` | Unexpected error |
| `502 Bad Gateway` | Upstream service failed |
| `503 Service Unavailable` | Temporarily unavailable |

### Error Response Pattern

```javascript
/**
 * Standard error response format
 * @param {Response} res
 * @param {number} status
 * @param {string} code - Machine-readable error code
 * @param {string} message - Human-readable message
 * @param {object} [details] - Additional context
 */
function sendError(res, status, code, message, details = null) {
  const error = {
    error: {
      code,
      message,
      ...(details && { details })
    }
  };
  res.status(status).json(error);
}

// Usage examples
sendError(res, 400, 'VALIDATION_ERROR', 'Email is required');
sendError(res, 401, 'UNAUTHORIZED', 'Invalid or expired token');
sendError(res, 404, 'NOT_FOUND', 'User not found');
sendError(res, 422, 'INVALID_EMAIL', 'Email format is invalid', {
  field: 'email',
  value: req.body.email
});
```

---

## Versioning

### Header-Based Versioning (Preferred)

```javascript
/**
 * Extract API version from Accept-Version header
 * Default to latest stable version
 */
function getApiVersion(req) {
  const version = req.get('Accept-Version') || req.get('API-Version');
  return version || '1';
}

/**
 * Version routing middleware
 */
function versionRouter(versions) {
  return (req, res, next) => {
    const version = getApiVersion(req);
    const handler = versions[version] || versions.default;

    if (!handler) {
      return sendError(res, 400, 'INVALID_VERSION',
        `API version ${version} not supported`);
    }

    handler(req, res, next);
  };
}

// Usage
app.get('/api/users', versionRouter({
  '1': getUsersV1,
  '2': getUsersV2,
  'default': getUsersV2
}));
```

**Client Usage:**

```javascript
fetch('/api/users', {
  headers: {
    'Accept-Version': '2'
  }
});
```

### URL Versioning (Major Changes Only)

Reserve URL versioning for breaking changes that require complete API redesign:

```javascript
// Only for major breaking changes
app.use('/api/v2', v2Router);  // New architecture
app.use('/api/v1', v1Router);  // Legacy, deprecated
```

---

## Streaming Large Responses

### JSON Streaming

For large datasets, stream JSON to reduce memory and improve TTFB:

```javascript
import { Transform } from 'stream';

/**
 * Stream JSON array without loading all items in memory
 * @param {Response} res
 * @param {AsyncIterable} items - Async iterator of items
 */
async function streamJsonArray(res, items) {
  res.setHeader('Content-Type', 'application/json');
  res.write('[\n');

  let first = true;
  for await (const item of items) {
    if (!first) res.write(',\n');
    res.write(JSON.stringify(item));
    first = false;
  }

  res.write('\n]');
  res.end();
}

// Usage with database cursor
app.get('/api/export/users', async (req, res) => {
  const cursor = db.query('SELECT * FROM users').cursor();
  await streamJsonArray(res, cursor);
});
```

### NDJSON (Newline Delimited JSON)

Alternative format for streaming:

```javascript
/**
 * Stream as NDJSON (one JSON object per line)
 */
async function streamNdjson(res, items) {
  res.setHeader('Content-Type', 'application/x-ndjson');

  for await (const item of items) {
    res.write(JSON.stringify(item) + '\n');
  }

  res.end();
}
```

---

## Rate Limiting

```javascript
/**
 * Simple in-memory rate limiter
 * Use Redis for production/multi-instance
 */
function rateLimit(options = {}) {
  const {
    windowMs = 60000,    // 1 minute
    max = 100,           // requests per window
    keyGenerator = (req) => req.ip
  } = options;

  const hits = new Map();

  // Cleanup old entries periodically
  setInterval(() => {
    const now = Date.now();
    for (const [key, data] of hits) {
      if (now - data.start > windowMs) hits.delete(key);
    }
  }, windowMs);

  return (req, res, next) => {
    const key = keyGenerator(req);
    const now = Date.now();

    let data = hits.get(key);
    if (!data || now - data.start > windowMs) {
      data = { count: 0, start: now };
      hits.set(key, data);
    }

    data.count++;

    res.setHeader('X-RateLimit-Limit', max);
    res.setHeader('X-RateLimit-Remaining', Math.max(0, max - data.count));
    res.setHeader('X-RateLimit-Reset', Math.ceil((data.start + windowMs) / 1000));

    if (data.count > max) {
      return sendError(res, 429, 'RATE_LIMIT_EXCEEDED',
        'Too many requests, please try again later');
    }

    next();
  };
}

// Apply to all API routes
app.use('/api', rateLimit({ max: 100, windowMs: 60000 }));

// Stricter limit for sensitive endpoints
app.use('/api/auth', rateLimit({ max: 10, windowMs: 60000 }));
```

---

## Token Authentication

```javascript
/**
 * Bearer token authentication middleware
 */
function authenticate(req, res, next) {
  const authHeader = req.get('Authorization');

  if (!authHeader?.startsWith('Bearer ')) {
    return sendError(res, 401, 'MISSING_TOKEN',
      'Authorization header required');
  }

  const token = authHeader.slice(7);

  try {
    const payload = verifyToken(token);  // Your JWT/token verification
    req.user = payload;
    next();
  } catch (err) {
    return sendError(res, 401, 'INVALID_TOKEN',
      'Token is invalid or expired');
  }
}

// Protected routes
app.get('/api/users/me', authenticate, getCurrentUser);
app.patch('/api/users/me', authenticate, updateCurrentUser);
```

---

## Third-Party API Proxying

Proxy third-party APIs to keep secrets safe and allow replacements:

```javascript
/**
 * Proxy to third-party API
 * - Keeps API keys server-side
 * - Allows switching providers without frontend changes
 * - Can add caching, rate limiting, transformation
 */
app.get('/api/geocode', authenticate, async (req, res) => {
  const { address } = req.query;

  if (!address) {
    return sendError(res, 400, 'MISSING_ADDRESS', 'Address is required');
  }

  try {
    // Third-party API call with server-side secret
    const response = await fetch(
      `https://api.geocoder.example/v1/search?` +
      new URLSearchParams({
        q: address,
        key: process.env.GEOCODER_API_KEY  // Never exposed to client
      })
    );

    if (!response.ok) {
      throw new Error(`Geocoder API error: ${response.status}`);
    }

    const data = await response.json();

    // Transform response to your own format
    // (allows changing providers without frontend changes)
    res.json({
      results: data.features.map(f => ({
        lat: f.geometry.coordinates[1],
        lng: f.geometry.coordinates[0],
        address: f.properties.formatted
      }))
    });
  } catch (err) {
    console.error('Geocode proxy error:', err);
    sendError(res, 502, 'UPSTREAM_ERROR',
      'Geocoding service temporarily unavailable');
  }
});
```

---

## Input Validation

Validate at the boundary - trust nothing from clients:

```javascript
/**
 * Validation helper using JSON Schema
 */
import Ajv from 'ajv';
const ajv = new Ajv({ allErrors: true });

function validate(schema) {
  const validateFn = ajv.compile(schema);

  return (req, res, next) => {
    if (!validateFn(req.body)) {
      return sendError(res, 422, 'VALIDATION_ERROR',
        'Request body validation failed', {
          errors: validateFn.errors.map(e => ({
            path: e.instancePath,
            message: e.message
          }))
        });
    }
    next();
  };
}

// Usage
const createUserSchema = {
  type: 'object',
  required: ['email', 'name'],
  properties: {
    email: { type: 'string', format: 'email' },
    name: { type: 'string', minLength: 1, maxLength: 100 },
    role: { type: 'string', enum: ['user', 'admin'], default: 'user' }
  },
  additionalProperties: false
};

app.post('/api/users', validate(createUserSchema), createUser);
```

---

## Checklist

When creating REST endpoints:

- [ ] Use appropriate HTTP methods (GET/POST/PUT/PATCH/DELETE)
- [ ] Support API_METHOD for form fallback if progressive enhancement needed
- [ ] Accept both JSON and form-urlencoded content types
- [ ] Return appropriate status codes (2xx, 4xx, 5xx)
- [ ] Use consistent error response format
- [ ] Implement header-based versioning
- [ ] Add rate limiting
- [ ] Validate input at the boundary
- [ ] Use token authentication for protected routes
- [ ] Proxy third-party APIs to hide secrets
- [ ] Stream large responses when appropriate
- [ ] Document with OpenAPI (see OPENAPI.md)
