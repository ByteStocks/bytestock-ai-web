'use server';

import { cookies } from 'next/headers';

const API_URL = process.env.API_URL || 'https://server-omega-eight-85.vercel.app';

export interface WebUser {
  id: number;
  email: string;
  name: string | null;
  role?: string;
  onboarded: boolean;
  subscribed: boolean;
  trialStartedAt: string | null;
}

export async function getToken(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get('bytestock_token')?.value ?? null;
}

export async function auth(): Promise<{ userId: number | null; user: WebUser | null }> {
  try {
    const token = await getToken();
    if (!token) return { userId: null, user: null };

    const res = await fetch(`${API_URL}/api/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: 'no-store',
    });

    if (!res.ok) return { userId: null, user: null };

    const data = await res.json();
    if (!data.user) return { userId: null, user: null };

    return { userId: data.user.id, user: data.user };
  } catch {
    return { userId: null, user: null };
  }
}

export async function currentUser(): Promise<WebUser | null> {
  const { user } = await auth();
  return user;
}
