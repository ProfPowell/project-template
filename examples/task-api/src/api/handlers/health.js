/**
 * Health check handler
 */

import { db } from '../../db/client.js';

/**
 * GET /health
 */
export async function healthCheck(req, res) {
  const checks = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    checks: {}
  };

  // Check database
  try {
    await db.query('SELECT 1');
    checks.checks.database = 'ok';
  } catch (error) {
    checks.status = 'degraded';
    checks.checks.database = 'error';
  }

  const statusCode = checks.status === 'ok' ? 200 : 503;
  res.status(statusCode).json(checks);
}
