import { apiFetch, handleJson } from './client';

// Types for auth responses
export type LoginResponse = { 
  token: string;
  data?: { token: string; user?: any };
  status?: string;
  expiresIn?: string;
};

export type TokenValidationResponse = {
  authenticated: boolean;
  user?: any;
  status?: string;
};

/**
 * Login to the admin panel
 */
export async function login(username: string, password: string): Promise<LoginResponse> {
  try {
    const res = await apiFetch('/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    
    const data = await handleJson<LoginResponse>(res);
    
    // Handle different response formats (token could be at root or in data object)
    const token = data.token || data.data?.token;
    if (!token) {
      throw new Error('No token received from server');
    }
    
    return { token };
  } catch (error: any) {
    console.error('Login error:', error);
    throw new Error(error?.message || 'Login failed');
  }
}

/**
 * Save auth token to localStorage
 */
export function saveToken(token: string): void {
  if (!token) return;
  localStorage.setItem('authToken', token);
}

/**
 * Get auth token from localStorage
 */
export function getToken(): string | null {
  return localStorage.getItem('authToken');
}

/**
 * Remove auth token from localStorage
 */
export function logout(): void {
  localStorage.removeItem('authToken');
}

/**
 * Check if token is valid by making a verification request
 */
export async function validateToken(token: string | null): Promise<boolean> {
  if (!token) return false;
  
  try {
    const res = await apiFetch('/api/auth/verify', {
      method: 'GET',
      token
    });
    
    const data = await handleJson<TokenValidationResponse>(res);
    return Boolean(data.authenticated);
  } catch (error) {
    console.error('Token validation error:', error);
    return false;
  }
}

/**
 * Refresh the current token
 */
export async function refreshToken(token: string): Promise<LoginResponse> {
  try {
    const res = await apiFetch('/api/auth/refresh', {
      method: 'POST',
      token
    });
    
    const data = await handleJson<LoginResponse>(res);
    const newToken = data.token || data.data?.token;
    
    if (!newToken) {
      throw new Error('No token received from server');
    }
    
    return { token: newToken };
  } catch (error: any) {
    console.error('Token refresh error:', error);
    throw new Error(error?.message || 'Failed to refresh token');
  }
}

/**
 * Check if user is currently authenticated
 */
export function isAuthenticated(): boolean {
  return Boolean(getToken());
}