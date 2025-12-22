/**
 * Task API Server
 * Demo application showcasing project template backend features
 */

import express from 'express';
import { config } from './config/index.js';
import { setupRoutes } from './api/routes.js';
import { errorHandler } from './api/middleware/error.js';
import { logger } from './lib/logger.js';
import { db } from './db/client.js';

const app = express();

// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    logger.info({
      method: req.method,
      path: req.path,
      status: res.statusCode,
      duration: Date.now() - start
    });
  });
  next();
});

// Routes
setupRoutes(app);

// Error handling (must be last)
app.use(errorHandler);

// Graceful shutdown
const shutdown = async () => {
  logger.info('Shutting down...');
  await db.end();
  process.exit(0);
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);

// Start server
const port = config.port;
app.listen(port, () => {
  logger.info({ message: 'Server started', port });
  console.log(`Task API running at http://localhost:${port}`);
  console.log(`API docs: http://localhost:${port}/api-docs`);
});
