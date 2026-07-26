export function asset(p: string): string {
  if (!p) return '';

  // Pass through absolute URLs and data URIs
  if (/^(https?:)?\/\//i.test(p) || p.startsWith('data:')) return p;

  // Normalize base and path
  const base = (process.env.PUBLIC_URL || '').replace(/\/+$/, '');
  const path = p.startsWith('/') ? p : `/${p}`;

  return `${base}${path}`;
}