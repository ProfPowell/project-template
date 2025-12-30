/**
 * Database Migration Runner
 * Applies and reverts database migrations
 */

import { readdir } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { db } from './client.js';
import { logger } from '../lib/logger.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const MIGRATIONS_DIR = join(__dirname, 'migrations');

/**
 * Ensure migrations tracking table exists
 */
async function ensureMigrationsTable() {
  await db.query(`
    CREATE TABLE IF NOT EXISTS migrations (
      id SERIAL PRIMARY KEY,
      name TEXT UNIQUE NOT NULL,
      applied_at TIMESTAMPTZ DEFAULT NOW()
    )
  `);
}

/**
 * Get list of applied migrations
 */
async function getAppliedMigrations() {
  const result = await db.query('SELECT name FROM migrations ORDER BY id');
  return result.rows.map(row => row.name);
}

/**
 * Get list of migration files
 */
async function getMigrationFiles() {
  const files = await readdir(MIGRATIONS_DIR);
  return files
    .filter(f => f.endsWith('.js'))
    .sort();
}

/**
 * Run all pending migrations
 */
export async function up() {
  await ensureMigrationsTable();

  const applied = await getAppliedMigrations();
  const files = await getMigrationFiles();
  const pending = files.filter(f => !applied.includes(f));

  if (pending.length === 0) {
    logger.info('No pending migrations');
    return;
  }

  for (const file of pending) {
    const migration = await import(join(MIGRATIONS_DIR, file));

    logger.info(`Applying migration: ${file}`);

    await db.transaction(async (client) => {
      await migration.up({ query: (sql, params) => client.query(sql, params) });
      await client.query('INSERT INTO migrations (name) VALUES ($1)', [file]);
    });

    logger.info(`Applied: ${file}`);
  }

  logger.info(`Applied ${pending.length} migration(s)`);
}

/**
 * Revert the last migration
 */
export async function down() {
  await ensureMigrationsTable();

  const applied = await getAppliedMigrations();

  if (applied.length === 0) {
    logger.info('No migrations to revert');
    return;
  }

  const lastMigration = applied[applied.length - 1];
  const migration = await import(join(MIGRATIONS_DIR, lastMigration));

  logger.info(`Reverting migration: ${lastMigration}`);

  await db.transaction(async (client) => {
    await migration.down({ query: (sql, params) => client.query(sql, params) });
    await client.query('DELETE FROM migrations WHERE name = $1', [lastMigration]);
  });

  logger.info(`Reverted: ${lastMigration}`);
}

/**
 * Show migration status
 */
export async function status() {
  await ensureMigrationsTable();

  const applied = await getAppliedMigrations();
  const files = await getMigrationFiles();

  console.log('\nMigration Status:\n');

  for (const file of files) {
    const status = applied.includes(file) ? '✓' : '○';
    console.log(`  ${status} ${file}`);
  }

  console.log('');
}

// CLI runner
const command = process.argv[2];

if (command === 'up') {
  up().then(() => process.exit(0)).catch(err => {
    logger.error(err);
    process.exit(1);
  });
} else if (command === 'down') {
  down().then(() => process.exit(0)).catch(err => {
    logger.error(err);
    process.exit(1);
  });
} else if (command === 'status') {
  status().then(() => process.exit(0)).catch(err => {
    logger.error(err);
    process.exit(1);
  });
} else {
  console.log('Usage: node src/db/migrate.js [up|down|status]');
  process.exit(1);
}
