/**
 * Method Override Middleware
 * Supports PUT/PATCH/DELETE via POST with _method field
 * Enables progressive enhancement for HTML forms
 */

/**
 * Override HTTP method based on _method field in body
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export function methodOverride(req, res, next) {
  if (req.method === 'POST' && req.body?._method) {
    const method = req.body._method.toUpperCase();
    if (['PUT', 'PATCH', 'DELETE'].includes(method)) {
      req.method = method;
      delete req.body._method;
    }
  }
  next();
}
