/**
 * Seed users table
 */

import { faker } from '@faker-js/faker';

// Pre-hashed password for 'Password123' using argon2id
const HASHED_PASSWORD = '$argon2id$v=19$m=65536,t=3,p=4$dGVzdHNhbHQ$KjR8TkNrMVd4N0R6WjV3R1dLM0Y0QQ';

export async function seed(db) {
  // Admin user (always same for testing)
  await db.query(`
    INSERT INTO users (id, email, name, password_hash, role, email_verified)
    VALUES (
      '00000000-0000-0000-0000-000000000001',
      'admin@example.com',
      'Admin User',
      $1,
      'admin',
      TRUE
    )
    ON CONFLICT (email) DO NOTHING
  `, [HASHED_PASSWORD]);

  // Test user
  await db.query(`
    INSERT INTO users (id, email, name, password_hash, role, email_verified)
    VALUES (
      '00000000-0000-0000-0000-000000000002',
      'user@example.com',
      'Test User',
      $1,
      'user',
      TRUE
    )
    ON CONFLICT (email) DO NOTHING
  `, [HASHED_PASSWORD]);

  // Random users
  const users = Array.from({ length: 18 }, () => ({
    email: faker.internet.email().toLowerCase(),
    name: faker.person.fullName(),
    role: 'user',
    email_verified: faker.datatype.boolean()
  }));

  for (const user of users) {
    await db.query(`
      INSERT INTO users (email, name, password_hash, role, email_verified)
      VALUES ($1, $2, $3, $4, $5)
      ON CONFLICT (email) DO NOTHING
    `, [user.email, user.name, HASHED_PASSWORD, user.role, user.email_verified]);
  }

  console.log('  Seeded 20 users (admin + test + 18 random)');
}

export const description = 'Seed users with admin and test accounts';
