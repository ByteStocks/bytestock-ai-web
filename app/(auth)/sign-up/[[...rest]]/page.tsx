'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth/context';
import { toast } from 'sonner';

export default function SignUpPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const result = await signup(email, password, name || undefined);
    if (!result.success) toast.error(result.error);
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4 p-8">
        <h1 className="text-2xl font-bold text-white">Sign Up</h1>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 rounded bg-gray-800 border border-gray-600 text-white"
        />
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
          {loading ? 'Creating account...' : 'Sign Up'}
        </button>
        <p className="text-center text-gray-400">
          Already have an account? <Link href="/sign-in" className="text-yellow-500 hover:text-yellow-400">Sign In</Link>
        </p>
      </form>
    </div>
  );
}
