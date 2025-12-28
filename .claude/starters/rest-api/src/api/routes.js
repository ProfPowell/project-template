/**
 * API Routes
 * Route definitions and middleware composition
 */

import { Router } from 'express';
import { healthHandler, readyHandler } from './handlers/health.js';
{{#IF_ENABLE_AUTH}}
import { authenticate } from './middleware/auth.js';
{{/IF_ENABLE_AUTH}}

const router = Router();

// Health checks
router.get('/health', healthHandler);
router.get('/ready', readyHandler);

// API v1
const v1 = Router();

// Public routes
v1.get('/', (req, res) => {
  res.json({
    name: '{{PROJECT_NAME}}',
    version: '1.0.0',
    docs: '/openapi.yaml'
  });
});

{{#IF_ENABLE_AUTH}}
// Protected routes
v1.use(authenticate);
{{/IF_ENABLE_AUTH}}

// Mount v1
router.use('/api/v1', v1);

// 404 handler
router.use((req, res) => {
  res.status(404).json({
    error: {
      code: 'NOT_FOUND',
      message: `Cannot ${req.method} ${req.path}`
    }
  });
});

export { router as routes };
