"use client";
import { useState } from 'react';
import { reset as realOrMockReset } from '@/lib/auth';

export default function ResetPage() {
  const [email, setEmail] = useState('');

  async function reset() {
    await realOrMockReset(email);
  }

  return (
    <div className="flex flex-col items-center justify-center p-10">
      <h1 className="text-3xl font-bold">Resetar Senha</h1>
      <input className="input" placeholder="E-mail" onChange={e => setEmail(e.target.value)} />
      <button className="btn-primary" onClick={reset}>Enviar Link</button>
    </div>
  );
}
