/**
 * Route definitions
 */

import { authenticate } from './middleware/auth.js';
import { authRateLimit, apiRateLimit } from './middleware/rateLimit.js';
import * as authHandlers from './handlers/auth.js';
import * as taskHandlers from './handlers/tasks.js';
import * as healthHandlers from './handlers/health.js';
import { readFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

export function setupRoutes(app) {
  // Health check
  app.get('/health', healthHandlers.healthCheck);

  // API docs
  app.get('/api-docs', (req, res) => {
    const openapiPath = join(__dirname, '../../openapi.yaml');
    if (existsSync(openapiPath)) {
      res.type('text/yaml').send(readFileSync(openapiPath, 'utf-8'));
    } else {
      res.status(404).json({ error: 'OpenAPI spec not found' });
    }
  });

  // Auth routes (with rate limiting)
  app.post('/api/auth/register', authRateLimit, authHandlers.register);
  app.post('/api/auth/login', authRateLimit, authHandlers.login);
  app.post('/api/auth/refresh', authRateLimit, authHandlers.refresh);
  app.post('/api/auth/logout', authHandlers.logout);
  app.get('/api/auth/me', authenticate, authHandlers.me);

  // Task routes (protected + rate limited)
  app.get('/api/tasks', authenticate, apiRateLimit, taskHandlers.listTasks);
  app.get('/api/tasks/:id', authenticate, apiRateLimit, taskHandlers.getTask);
  app.post('/api/tasks', authenticate, apiRateLimit, taskHandlers.createTask);
  app.patch('/api/tasks/:id', authenticate, apiRateLimit, taskHandlers.updateTask);
  app.delete('/api/tasks/:id', authenticate, apiRateLimit, taskHandlers.deleteTask);

  // 404 handler
  app.use((req, res) => {
    res.status(404).json({
      error: {
        code: 'NOT_FOUND',
        message: 'Endpoint not found'
      }
    });
  });
}
