/**
 * Rate limiting middleware
 */

export function rateLimit(options = {}) {
  const {
    windowMs = 60000,
    max = 100,
    message = 'Too many requests, please try again later'
  } = options;

  const hits = new Map();

  // Cleanup old entries
  setInterval(() => {
    const now = Date.now();
    for (const [key, data] of hits) {
      if (now - data.resetTime > windowMs) {
        hits.delete(key);
      }
    }
  }, windowMs).unref();

  return (req, res, next) => {
    const key = req.ip || req.headers['x-forwarded-for']?.split(',')[0] || 'unknown';
    const now = Date.now();

    let data = hits.get(key);
    if (!data || now > data.resetTime) {
      data = { count: 0, resetTime: now + windowMs };
      hits.set(key, data);
    }

    data.count++;

    res.setHeader('X-RateLimit-Limit', max);
    res.setHeader('X-RateLimit-Remaining', Math.max(0, max - data.count));
    res.setHeader('X-RateLimit-Reset', Math.ceil(data.resetTime / 1000));

    if (data.count > max) {
      res.setHeader('Retry-After', Math.ceil((data.resetTime - now) / 1000));
      return res.status(429).json({
        error: {
          code: 'RATE_LIMIT_EXCEEDED',
          message
        }
      });
    }

    next();
  };
}

// Preset for auth endpoints
export const authRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: 'Too many login attempts, please try again later'
});

// Preset for API endpoints
export const apiRateLimit = rateLimit({
  windowMs: 60 * 1000,
  max: 100
});
