/**
 * Database Client
 * PostgreSQL connection pool with query helpers
 */

import pg from 'pg';
import { config } from '../config/index.js';
import { logger } from '../lib/logger.js';

const { Pool } = pg;

const pool = new Pool({
  connectionString: config.db.url,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

/**
 * Execute a query
 * @param {string} sql - SQL query
 * @param {Array} params - Query parameters
 * @returns {Promise<pg.QueryResult>}
 */
async function query(sql, params = []) {
  const start = Date.now();
  try {
    const result = await pool.query(sql, params);
    logger.debug({
      query: sql.slice(0, 100),
      duration: Date.now() - start,
      rows: result.rowCount
    });
    return result;
  } catch (error) {
    logger.error({ query: sql, error: error.message });
    throw error;
  }
}

/**
 * Execute a transaction
 * @param {Function} fn - Function receiving client
 * @returns {Promise<*>}
 */
async function transaction(fn) {
  const client = await pool.connect();
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

export const db = {
  query,
  transaction,
  pool
};
