/**
 * The site's public origin, used for canonical URLs and social preview links.
 *
 * Set REACT_APP_SITE_URL in .env.production when the real domain is decided
 * (e.g. https://plastalbotbuilders.com or https://plastalbot.tech). Until then
 * it falls back to whatever host is actually serving the page, so canonical
 * tags never point at a domain that isn't live.
 */
export const SITE_URL: string =
  process.env.REACT_APP_SITE_URL?.replace(/\/+$/, '') ||
  (typeof window !== 'undefined' ? window.location.origin : '');

/** Build an absolute URL for a site-relative path. */
export const absoluteUrl = (path = '/'): string =>
  `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
