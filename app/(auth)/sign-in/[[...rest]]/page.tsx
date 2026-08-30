'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/lib/auth/context';
import { toast } from 'sonner';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const result = await login(email, password);
    if (!result.success) toast.error(result.error);
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4 p-8">
        <h1 className="text-2xl font-bold text-white">Sign In</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 rounded bg-gray-800 border border-gray-600 text-white"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 rounded bg-gray-800 border border-gray-600 text-white"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full p-3 rounded bg-yellow-500 text-black font-bold hover:bg-yellow-400 disabled:opacity-50"
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
        <p className="text-center text-gray-400">
          Don&apos;t have an account? <Link href="/sign-up" className="text-yellow-500 hover:text-yellow-400">Sign Up</Link>
        </p>
      </form>
    </div>
  );
}
