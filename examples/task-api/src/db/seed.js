/**
 * Seed runner
 */

import { db } from './client.js';
import { readdir } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const seedsDir = join(__dirname, 'seeds');

export async function seed() {
  const files = await readdir(seedsDir);
  const seeds = files
    .filter(f => f.endsWith('.js') && !f.startsWith('.'))
    .sort();

  if (seeds.length === 0) {
    console.log('No seed files found');
    return;
  }

  console.log('Running seeds:\n');
  for (const file of seeds) {
    console.log(`  ${file}`);
    const seedModule = await import(join(seedsDir, file));
    await seedModule.seed(db);
  }

  console.log('\nSeeding complete');
}

export async function reset() {
  console.log('⚠️  Resetting database (dev only)\n');

  const { rows } = await db.query(`
    SELECT tablename FROM pg_tables
    WHERE schemaname = 'public' AND tablename != 'migrations'
  `);

  for (const { tablename } of rows) {
    console.log(`  Truncating: ${tablename}`);
    await db.query(`TRUNCATE TABLE ${tablename} CASCADE`);
  }

  await seed();
}

const command = process.argv[2];
switch (command) {
  case 'reset':
    reset().then(() => process.exit(0));
    break;
  default:
    seed().then(() => process.exit(0));
}
