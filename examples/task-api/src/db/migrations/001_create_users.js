/**
 * Migration: Create users table
 * @param {import('pg').Pool} db - Database pool
 */
export async function up(db) {
  await db.query(`
    CREATE TABLE users (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      email VARCHAR(255) NOT NULL UNIQUE,
      name VARCHAR(255) NOT NULL,
      password_hash VARCHAR(255) NOT NULL,
      role VARCHAR(50) NOT NULL DEFAULT 'user',
      email_verified BOOLEAN NOT NULL DEFAULT FALSE,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );

    CREATE INDEX idx_users_email ON users(email);
    CREATE INDEX idx_users_role ON users(role);

    COMMENT ON TABLE users IS 'Application users';
    COMMENT ON COLUMN users.role IS 'User role: user, admin';
  `);
}

/**
 * Rollback migration
 * @param {import('pg').Pool} db - Database pool
 */
export async function down(db) {
  await db.query(`DROP TABLE IF EXISTS users CASCADE`);
}

export const description = 'Create users table with auth fields';
