/**
 * Guards for public, unauthenticated form endpoints.
 *
 * These endpoints are reachable by anyone, so they need protection beyond the
 * Mongoose schema. Rate limiting is applied in server.js; this adds:
 *   - a honeypot check (bots fill hidden fields, humans never see them)
 *   - length caps, so a script can't store megabytes of junk per record
 *
 * Deliberately NOT a CAPTCHA: the site talks to a JWT/Bearer API with no
 * cookie auth, and adding a third-party widget would mean loosening the CSP.
 * Cloudflare Turnstile is the recommended next step if spam gets through —
 * see the notes in the deployment docs.
 */

/**
 * Rejects submissions where the hidden honeypot field was filled in.
 * Responds with the normal success shape so bots can't detect the trap.
 */
export const honeypot = (fieldName = 'website') => (req, res, next) => {
  const value = req.body?.[fieldName];
  if (typeof value === 'string' && value.trim() !== '') {
    console.warn(`[spam] honeypot "${fieldName}" filled from ${req.ip} — discarded`);
    return res.status(201).json({ message: 'Submitted successfully' });
  }
  if (req.body) delete req.body[fieldName];
  return next();
};

/**
 * Caps the length of string fields in the body. Anything longer is rejected
 * rather than silently truncated, so the user is told what went wrong.
 */
export const maxLengths = (limits, { defaultMax = 500 } = {}) => (req, res, next) => {
  const body = req.body || {};
  for (const [key, value] of Object.entries(body)) {
    if (typeof value !== 'string') continue;
    const limit = limits[key] ?? defaultMax;
    if (value.length > limit) {
      return res.status(400).json({
        status: 'error',
        message: `The "${key}" field is too long (maximum ${limit} characters).`,
      });
    }
  }
  return next();
};
