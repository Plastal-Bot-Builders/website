import { apiFetch, handleJson } from './client';
export type LoginResponse = { token: string };

export async function login(username: string, password: string): Promise<LoginResponse> {
  const res = await apiFetch('/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  return handleJson<LoginResponse>(res);
}

export function saveToken(token: string) {
  localStorage.setItem('authToken', token);
}
export function getToken(): string | null {
  return localStorage.getItem('authToken');
}
export function logout() {
  localStorage.removeItem('authToken');
}