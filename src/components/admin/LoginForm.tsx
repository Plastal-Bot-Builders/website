import React, { useState } from 'react';
import { login, saveToken } from '../../api/auth';
import { AdminContainer, Panel, FormGroup, Label, Input, Button } from './AdminStyles';

interface LoginFormProps {
  onLoginSuccess: (token: string) => void;
}

export function LoginForm({ onLoginSuccess }: LoginFormProps) {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('changeMe123');
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
      <Panel>
        <h1 style={{ marginBottom: '20px' }}>Admin Login</h1>
        {error && <p style={{ color: '#e53e3e', marginBottom: '15px' }}>{error}</p>}
        
        <form onSubmit={handleLogin}>
          <FormGroup>
            <Label>Username</Label>
            <Input 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              required 
              disabled={loading}
            />
          </FormGroup>
          
          <FormGroup>
            <Label>Password</Label>
            <Input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
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