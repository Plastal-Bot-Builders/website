import React, { useState } from 'react';
import { login, saveToken } from '../../api/auth';
import { AdminContainer, Panel, FormGroup, Label, Input, Button } from './AdminStyles';

interface LoginFormProps {
  onLoginSuccess: (token: string) => void;
}

export function LoginForm({ onLoginSuccess }: LoginFormProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    
    try {
      const { token } = await login(username, password);
      saveToken(token);
      onLoginSuccess(token);
    } catch (e: any) {
      setError(e?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <AdminContainer>
      <Panel style={{ maxWidth: 480, margin: '48px auto', padding: 32 }}>
        <h1 style={{ marginBottom: '20px' }}>Welcome back</h1>
        <p style={{ marginBottom: 24 }}>Sign in to manage the Plastal-Bot Builders website.</p>
        {error && <p role="alert" style={{ color: '#e53e3e', marginBottom: '15px' }}>{error}</p>}
        
        <form onSubmit={handleLogin}>
          <FormGroup>
            <Label htmlFor="admin-username">Username</Label>
            <Input 
              id="admin-username" name="username" autoComplete="username" value={username}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.currentTarget.value)}
              required 
              disabled={loading}
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="admin-password">Password</Label>
            <Input 
              id="admin-password" name="password" autoComplete="current-password" type="password"
              value={password} 
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.currentTarget.value)}
              required 
              disabled={loading}
            />
          </FormGroup>
          
          <Button type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Log in'}
          </Button>
        </form>
      </Panel>
    </AdminContainer>
  );
}