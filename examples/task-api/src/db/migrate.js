/**
 * Database migration runner
 */

import { db } from './client.js';
import { readdir } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const migrationsDir = join(__dirname, 'migrations');

async function ensureMigrationsTable() {
  await db.query(`
    CREATE TABLE IF NOT EXISTS migrations (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL UNIQUE,
      executed_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);
}

async function getExecutedMigrations() {
  const { rows } = await db.query('SELECT name FROM migrations ORDER BY id');
  return new Set(rows.map(r => r.name));
}

export async function migrate() {
  await ensureMigrationsTable();
  const executed = await getExecutedMigrations();

  const files = await readdir(migrationsDir);
  const migrations = files
    .filter(f => f.endsWith('.js') && !f.startsWith('.'))
    .sort();

  let count = 0;
  for (const file of migrations) {
    if (executed.has(file)) continue;

    console.log(`Migrating: ${file}`);
    const migration = await import(join(migrationsDir, file));

    await db.query('BEGIN');
    try {
      await migration.up(db);
      await db.query('INSERT INTO migrations (name) VALUES ($1)', [file]);
      await db.query('COMMIT');
      console.log(`  ✓ ${migration.description || 'Complete'}`);
      count++;
    } catch (error) {
      await db.query('ROLLBACK');
      console.error(`  ✗ Failed: ${error.message}`);
      process.exit(1);
    }
  }

  if (count === 0) {
    console.log('No pending migrations');
  } else {
    console.log(`\nCompleted ${count} migration(s)`);
  }
}

export async function rollback() {
  await ensureMigrationsTable();

  const { rows } = await db.query(
    'SELECT name FROM migrations ORDER BY id DESC LIMIT 1'
  );

  if (rows.length === 0) {
    console.log('No migrations to rollback');
    return;
  }

  const file = rows[0].name;
  console.log(`Rolling back: ${file}`);

  const migration = await import(join(migrationsDir, file));

  await db.query('BEGIN');
  try {
    await migration.down(db);
    await db.query('DELETE FROM migrations WHERE name = $1', [file]);
    await db.query('COMMIT');
    console.log('  ✓ Rollback complete');
  } catch (error) {
    await db.query('ROLLBACK');
    console.error(`  ✗ Rollback failed: ${error.message}`);
    process.exit(1);
  }
}

export async function status() {
  await ensureMigrationsTable();
  const executed = await getExecutedMigrations();

  const files = await readdir(migrationsDir);
  const migrations = files
    .filter(f => f.endsWith('.js') && !f.startsWith('.'))
    .sort();

  console.log('Migration Status:\n');
  for (const file of migrations) {
    const mark = executed.has(file) ? '✓' : '○';
    console.log(`  ${mark} ${file}`);
  }
}

// CLI handler
const command = process.argv[2];
switch (command) {
  case 'rollback':
    rollback().then(() => process.exit(0));
    break;
  case 'status':
    status().then(() => process.exit(0));
    break;
  default:
    migrate().then(() => process.exit(0));
}
