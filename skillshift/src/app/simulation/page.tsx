"use client";
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getTenantAndToken } from '@/lib/auth/tenant';
import { useEffect } from 'react';

export default function SimulationPage() {
  const [input, setInput] = useState('');
  const [conversation, setConversation] = useState<{ user: string; ia: string }[]>([]);
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/simulations').then(r => r.json()).then(d => setHistory(d.simulations || []));
  }, []);

  async function enviar() {
    const { token, tenantId } = await getTenantAndToken();
    const res = await fetch('/api/simulation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: token ? `Bearer ${token}` : '' },
      body: JSON.stringify({ simulatorType: 'vendas', input, userId: 'demo', tenantId })
    }).then(r => r.json());
    setConversation(prev => [...prev, { user: input, ia: res.output }]);
    setInput('');
    // refresh history
    const sims = await fetch('/api/simulations').then(r => r.json());
    setHistory(sims.simulations || []);
    // history persisted on backend
  }

  return (
    <div className="space-y-4">
      <h1 className="text-3xl">Simulador de Vendas</h1>
      <div className="bg-gray-100 p-4 rounded min-h-[200px] space-y-2">
        {conversation.map((c, i) => (
          <p key={i}><strong>Você:</strong> {c.user} <br/> <strong>IA:</strong> {c.ia}</p>
        ))}
      </div>
      <Input placeholder="Digite sua resposta..." value={input} onChange={e => setInput(e.target.value)} />
      <Button onClick={enviar}>Enviar</Button>
      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-semibold mb-2">Histórico de Simulações</h2>
        <ul className="text-sm space-y-1 max-h-48 overflow-auto">
          {history.map(h => (
            <li key={h.id} className="flex justify-between">
              <span>{h.simulatorType}</span>
              <span>Score: {h.score ?? '-'}</span>
            </li>
          ))}
          {history.length === 0 && <li>Nenhuma simulação ainda.</li>}
        </ul>
      </div>
    </div>
  );
}
