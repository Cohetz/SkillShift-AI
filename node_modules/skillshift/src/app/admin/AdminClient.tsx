"use client";
import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { getTenantAndToken } from '@/lib/auth/tenant';

interface TrainingType { id?: string; role: string; name: string; description?: string }

export default function AdminClient() {
  const [items, setItems] = useState<TrainingType[]>([]);
  const [role, setRole] = useState('employee');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState<string | null>(null);

  async function load() {
    const res = await fetch('/api/training-types').then(r => r.json());
    setItems(res.items || []);
  }
  useEffect(() => { load(); }, []);

  async function create() {
    setError(null);
    try {
      const { token } = await getTenantAndToken();
      const r = await fetch('/api/training-types', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
        body: JSON.stringify({ role, name, description })
      });
      if (!r.ok) throw new Error(await r.text());
      setName(''); setDescription('');
      await load();
    } catch (e: any) {
      setError(e?.message ?? 'Failed to create');
    }
  }

  async function remove(id: string) {
    const { token } = await getTenantAndToken();
    await fetch(`/api/training-types/${id}`, { method: 'DELETE', headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}) } });
    await load();
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Administração</h1>
      <section className="p-4 bg-white rounded shadow space-y-3">
        <h2 className="font-semibold">Tipos de Treinamento (por cargo/role)</h2>
        <div className="flex flex-col md:flex-row gap-2">
          <select value={role} onChange={e => setRole(e.target.value)} className="border rounded px-2 py-1">
            <option value="employee">employee</option>
            <option value="manager">manager</option>
            <option value="sales">sales</option>
            <option value="support">support</option>
          </select>
          <Input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
          <Input placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
          <Button onClick={create}>Add</Button>
        </div>
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <ul className="text-sm divide-y">
          {items.map(it => (
            <li key={it.id} className="py-2 flex items-center justify-between">
              <div>
                <p className="font-medium">{it.name}</p>
                <p className="opacity-70">role: {it.role} — {it.description}</p>
              </div>
              <button className="text-red-600 hover:underline" onClick={() => it.id && remove(it.id)}>Delete</button>
            </li>
          ))}
          {items.length === 0 && <li className="py-2 opacity-70">No training types yet.</li>}
        </ul>
      </section>
    </div>
  );
}
