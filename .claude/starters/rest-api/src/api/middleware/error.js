/**
 * Error Handling Middleware
 * Global error handler
 */

import { logger } from '../../lib/logger.js';
import { config } from '../../config/index.js';
import { AppError } from '../../lib/errors.js';

/**
 * Global error handler
 */
export function errorHandler(err, req, res, next) {
  // Log error
  logger.error({
    error: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method
  });

  // Handle known errors
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      error: {
        code: err.code,
        message: err.message,
        ...(err.details && { details: err.details })
      }
    });
  }

  // Handle validation errors
  if (err.name === 'ValidationError') {
    return res.status(422).json({
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Validation failed',
        details: err.details
      }
    });
  }

  // Handle unknown errors
  const isDev = config.env === 'development';

  res.status(500).json({
    error: {
      code: 'INTERNAL_ERROR',
      message: isDev ? err.message : 'An unexpected error occurred',
      ...(isDev && { stack: err.stack })
    }
  });
}
