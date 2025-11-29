"use client";
import { useState } from 'react';
import { register as realOrMockRegister } from '@/lib/auth';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function register() {
    await realOrMockRegister(email, password);
  }

  return (
    <div className="flex flex-col items-center justify-center p-10">
      <h1 className="text-3xl font-bold">Criar Conta</h1>
      <input className="input" placeholder="E-mail" onChange={e => setEmail(e.target.value)} />
      <input type="password" className="input" placeholder="Senha" onChange={e => setPassword(e.target.value)} />
      <button className="btn-primary" onClick={register}>Registrar</button>
    </div>
  );
}
