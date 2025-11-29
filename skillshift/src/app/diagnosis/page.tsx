"use client";
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getTenantAndToken } from '@/lib/auth/tenant';

export default function DiagnosisPage() {
  const [answers, setAnswers] = useState<Record<string, any>>({ q1: '', q2: '' });
  const [result, setResult] = useState<any>(null);

  async function submit() {
    const { token, tenantId } = await getTenantAndToken();
    const res = await fetch('/api/diagnosis', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: token ? `Bearer ${token}` : '' },
      body: JSON.stringify({ userId: 'demo', tenantId, answers })
    }).then(r => r.json());
    setResult(res.result);
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Diagnóstico de Habilidades</h1>
      <Input placeholder="Descreva sua experiência" onChange={e => setAnswers(a => ({ ...a, q1: e.target.value }))} />
      <Input placeholder="Principais dificuldades" onChange={e => setAnswers(a => ({ ...a, q2: e.target.value }))} />
      <Button onClick={submit}>Enviar</Button>
      {result && (
        <div className="p-4 bg-white rounded shadow">
          <h2 className="font-semibold">Resultado</h2>
          <pre className="text-xs">{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
