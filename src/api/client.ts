type Query = Record<string, string | number | boolean | null | undefined>;

const RAW_BASE =
  process.env.REACT_APP_API_BASE ||
  process.env.NEXT_PUBLIC_API_URL ||
  'http://localhost:5001/api';

// Normalize base (no trailing slash)
export const API_BASE = RAW_BASE.replace(/\/+$/, '');

function toQueryString(query?: Query): string {
  if (!query) return '';
  const sp = new URLSearchParams();
  for (const [k, v] of Object.entries(query)) {
    if (v === undefined || v === null) continue;
    sp.append(k, String(v));
  }
  const s = sp.toString();
  return s ? `?${s}` : '';
}

function joinUrl(base: string, path: string): string {
  const b = base.replace(/\/+$/, '');
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${b}${p}`;
}

/**
 * Creates Authorization header with Bearer token (optional)
 */
export function authHeader(token?: string): Record<string, string> {
  return token ? { Authorization: `Bearer ${token}` } : {};
}

/**
 * Wrapper for fetch that:
 * - prefixes API_BASE
 * - supports query params and timeout
 * - merges JSON headers
 */
export async function apiFetch(
  path: string,
  options: RequestInit & {
    token?: string;
    query?: Query;
    timeoutMs?: number;
    json?: unknown; // if provided, will be JSON.stringified and headers set
  } = {}
): Promise<Response> {
  const { token, query, timeoutMs, json, headers, ...rest } = options;

  const url = joinUrl(API_BASE, path) + toQueryString(query);

  const controller = new AbortController();
  const t = timeoutMs
    ? setTimeout(() => controller.abort(), Math.max(1, timeoutMs))
    : null;

  const finalHeaders: HeadersInit = {
    Accept: 'application/json',
    ...(json !== undefined ? { 'Content-Type': 'application/json' } : {}),
    ...authHeader(token),
    ...(headers || {})
  };
  console.log(`API Request: ${url}`, { method: rest.method || 'GET' })
  const res = await fetch(url, {
    ...rest,
    headers: finalHeaders,
    body: json !== undefined ? JSON.stringify(json) : (rest.body as BodyInit | null | undefined),
    signal: controller.signal
  }).finally(() => {
    if (t) clearTimeout(t);
  });

  return res;
}

/**
 * Helper to handle JSON responses and throw informative errors
 */
export async function handleJson<T>(response: Response): Promise<T> {
  const text = await response.text().catch(() => '');
  const data = text ? safeJson(text) : undefined;

  if (!response.ok) {
    const message =
      (data && (data as any).error) ||
      (data && (data as any).message) ||
      response.statusText ||
      'Request failed';
    const err = new Error(message);
    (err as any).status = response.status;
    (err as any).body = data ?? text;
    throw err;
  }

  // If no body, return undefined as any
  if (!text) return undefined as unknown as T;
  return (data as T);
}

function safeJson(s: string) {
  try {
    return JSON.parse(s);
  } catch {
    return undefined;
  }
}

/**
 * Convenience JSON methods
 */
export async function getJson<T>(path: string, opts?: { token?: string; query?: Query; timeoutMs?: number }) {
  const res = await apiFetch(path, { method: 'GET', ...opts });
  return handleJson<T>(res);
}

export async function postJson<T>(path: string, body: unknown, opts?: { token?: string; query?: Query; timeoutMs?: number }) {
  const res = await apiFetch(path, { method: 'POST', json: body, ...opts });
  return handleJson<T>(res);
}

export async function putJson<T>(path: string, body: unknown, opts?: { token?: string; query?: Query; timeoutMs?: number }) {
  const res = await apiFetch(path, { method: 'PUT', json: body, ...opts });
  return handleJson<T>(res);
}

export async function delJson<T>(path: string, opts?: { token?: string; query?: Query; timeoutMs?: number }) {
  const res = await apiFetch(path, { method: 'DELETE', ...opts });
  return handleJson<T>(res);
}