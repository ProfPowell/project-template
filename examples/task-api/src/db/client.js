/**
 * PostgreSQL database client with connection pooling
 */

import pg from 'pg';
import { config } from '../config/index.js';
import { logger } from '../lib/logger.js';

const { Pool } = pg;

export const db = new Pool({
  host: config.db.host,
  port: config.db.port,
  database: config.db.database,
  user: config.db.user,
  password: config.db.password,
  ssl: config.db.ssl ? { rejectUnauthorized: false } : false,
  max: config.db.max
});

// Log connection events in development
if (config.env === 'development') {
  db.on('connect', () => logger.debug('DB: Client connected'));
  db.on('error', (err) => logger.error({ message: 'DB error', error: err.message }));
}

/**
 * Execute parameterized query
 */
export async function query(sql, params = []) {
  const start = Date.now();
  try {
    const result = await db.query(sql, params);
    logger.debug({
      sql: sql.slice(0, 100),
      duration: Date.now() - start,
      rows: result.rowCount
    });
    return result;
  } catch (error) {
    logger.error({ sql: sql.slice(0, 100), error: error.message });
    throw error;
  }
}

/**
 * Execute queries in a transaction
 */
export async function transaction(fn) {
  const client = await db.connect();
  try {
    await client.query('BEGIN');
    const result = await fn(client);
    await client.query('COMMIT');
    return result;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}
