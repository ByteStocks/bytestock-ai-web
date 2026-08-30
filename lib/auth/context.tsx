'use client';

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://server-omega-eight-85.vercel.app';

interface WebUser {
  id: number;
  email: string;
  name: string | null;
  role?: string;
  onboarded: boolean;
  subscribed: boolean;
  trialStartedAt: string | null;
}

interface AuthContextType {
  user: WebUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (email: string, password: string, name?: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<WebUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchUser = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/api/auth/me`, { credentials: 'include' });
      if (res.ok) {
        const data = await res.json();
        setUser(data.user ?? null);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const login = async (email: string, password: string) => {
    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) return { success: false, error: data.error || 'Login failed' };
      document.cookie = `bytestock_token=${data.token}; path=/; max-age=${30 * 24 * 60 * 60}; SameSite=Lax`;
      setUser(data.user);
      router.push('/');
      return { success: true };
    } catch {
      return { success: false, error: 'Network error' };
    }
  };

  const signup = async (email: string, password: string, name?: string) => {
    try {
      const res = await fetch(`${API_URL}/api/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name }),
      });
      const data = await res.json();
      if (!res.ok) return { success: false, error: data.error || 'Signup failed' };
      document.cookie = `bytestock_token=${data.token}; path=/; max-age=${30 * 24 * 60 * 60}; SameSite=Lax`;
      setUser(data.user);
      router.push('/');
      return { success: true };
    } catch {
      return { success: false, error: 'Network error' };
    }
  };

  const logout = async () => {
    document.cookie = 'bytestock_token=; path=/; max-age=0';
    setUser(null);
    router.push('/sign-in');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
