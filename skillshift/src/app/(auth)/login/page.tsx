"use client";
import { useEffect, useState } from 'react';
import { signIn } from '@/lib/auth';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function handleLogin() {
    setError(null);
    try {
      await signIn(identifier, password);
      router.push('/dashboard');
    } catch (e: any) {
      setError(e?.message ?? 'Falha no login');
    }
  }

  return (
    <div className="flex flex-col items-center justify-center p-10">
      <h1 className="text-3xl font-bold">Login</h1>
      <input className="input" placeholder="Email" onChange={e => setIdentifier(e.target.value)} />
      <input type="password" className="input" placeholder="Password" onChange={e => setPassword(e.target.value)} />
      <button className="btn-primary" onClick={handleLogin}>Sign in</button>
      {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
      {/* After login, a session cookie is issued for server routes. */}
    </div>
  );
}
