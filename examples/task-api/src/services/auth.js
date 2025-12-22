/**
 * Authentication service
 */

import { query } from '../db/client.js';
import {
  hashPassword,
  verifyPassword,
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
  validatePassword
} from '../lib/auth.js';
import {
  BadRequestError,
  UnauthorizedError,
  ConflictError,
  NotFoundError
} from '../lib/errors.js';

/**
 * Register new user
 */
export async function register({ email, name, password }) {
  const validation = validatePassword(password);
  if (!validation.valid) {
    throw new BadRequestError('Invalid password', validation.errors);
  }

  const { rows: existing } = await query(
    'SELECT id FROM users WHERE email = $1',
    [email.toLowerCase()]
  );
  if (existing.length > 0) {
    throw new ConflictError('Email already registered');
  }

  const passwordHash = await hashPassword(password);
  const { rows } = await query(`
    INSERT INTO users (email, name, password_hash)
    VALUES ($1, $2, $3)
    RETURNING id, email, name, role, created_at
  `, [email.toLowerCase(), name, passwordHash]);

  const user = rows[0];
  const accessToken = generateAccessToken({ sub: user.id, role: user.role });
  const refreshToken = generateRefreshToken({ sub: user.id });

  return { user, accessToken, refreshToken };
}

/**
 * Login user
 */
export async function login({ email, password }) {
  const { rows } = await query(`
    SELECT id, email, name, role, password_hash
    FROM users WHERE email = $1
  `, [email.toLowerCase()]);

  if (rows.length === 0) {
    throw new UnauthorizedError('Invalid email or password');
  }

  const user = rows[0];
  const valid = await verifyPassword(user.password_hash, password);
  if (!valid) {
    throw new UnauthorizedError('Invalid email or password');
  }

  await query('UPDATE users SET updated_at = NOW() WHERE id = $1', [user.id]);

  const accessToken = generateAccessToken({ sub: user.id, role: user.role });
  const refreshToken = generateRefreshToken({ sub: user.id });

  delete user.password_hash;
  return { user, accessToken, refreshToken };
}

/**
 * Refresh access token
 */
export async function refresh(refreshToken) {
  const payload = verifyRefreshToken(refreshToken);

  const { rows } = await query(
    'SELECT id, role FROM users WHERE id = $1',
    [payload.sub]
  );

  if (rows.length === 0) {
    throw new UnauthorizedError('User not found');
  }

  const user = rows[0];
  const accessToken = generateAccessToken({ sub: user.id, role: user.role });

  return { accessToken };
}

/**
 * Get current user
 */
export async function getCurrentUser(userId) {
  const { rows } = await query(`
    SELECT id, email, name, role, email_verified, created_at, updated_at
    FROM users WHERE id = $1
  `, [userId]);

  if (rows.length === 0) {
    throw new NotFoundError('User not found');
  }

  return rows[0];
}
