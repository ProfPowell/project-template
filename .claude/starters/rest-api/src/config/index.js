/**
 * Configuration
 * Environment-based configuration with validation
 */

const isDev = process.env.NODE_ENV !== 'production';

/**
 * Require environment variable (throws in production if missing)
 */
function requireEnv(name, devDefault = null) {
  const value = process.env[name];
  if (!value) {
    if (isDev && devDefault !== null) {
      return devDefault;
    }
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

/**
 * Optional environment variable with default
 */
function optionalEnv(name, defaultValue) {
  return process.env[name] || defaultValue;
}

export const config = {
  env: process.env.NODE_ENV || 'development',
  isDev,
  port: parseInt(optionalEnv('PORT', '{{PORT}}'), 10),

  db: {
    url: requireEnv('DATABASE_URL', 'postgresql://postgres:postgres@localhost:5432/{{PROJECT_NAME}}'),
  },

  jwt: {
    secret: requireEnv('JWT_SECRET', 'dev-secret-change-in-production'),
    expiresIn: optionalEnv('JWT_EXPIRES_IN', '15m'),
    refreshExpiresIn: optionalEnv('REFRESH_TOKEN_EXPIRES_IN', '7d'),
  },

  rateLimit: {
    windowMs: parseInt(optionalEnv('RATE_LIMIT_WINDOW_MS', '60000'), 10),
    max: parseInt(optionalEnv('RATE_LIMIT_MAX', '100'), 10),
  },

  cors: {
    origin: optionalEnv('CORS_ORIGIN', 'http://localhost:3000'),
  },

  argon2: {
    memoryCost: 65536,
    timeCost: 3,
    parallelism: 4,
  },
};
