/**
 * Authentication route handlers
 */

import * as authService from '../../services/auth.js';

/**
 * POST /api/auth/register
 */
export async function register(req, res) {
  const { email, name, password } = req.body;

  const result = await authService.register({ email, name, password });

  res.status(201).json({
    user: result.user,
    accessToken: result.accessToken,
    refreshToken: result.refreshToken
  });
}

/**
 * POST /api/auth/login
 */
export async function login(req, res) {
  const { email, password } = req.body;

  const result = await authService.login({ email, password });

  res.json({
    user: result.user,
    accessToken: result.accessToken,
    refreshToken: result.refreshToken
  });
}

/**
 * POST /api/auth/refresh
 */
export async function refresh(req, res) {
  const { refreshToken } = req.body;

  const result = await authService.refresh(refreshToken);

  res.json({ accessToken: result.accessToken });
}

/**
 * POST /api/auth/logout
 */
export async function logout(req, res) {
  res.json({ message: 'Logged out successfully' });
}

/**
 * GET /api/auth/me
 */
export async function me(req, res) {
  const user = await authService.getCurrentUser(req.user.sub);

  res.json({ user });
}
