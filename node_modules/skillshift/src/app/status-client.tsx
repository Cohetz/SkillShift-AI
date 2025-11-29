"use client";
import { useEffect, useState } from 'react';

export default function ClientStatus() {
  const [status, setStatus] = useState<{ tenantId?: string | null; userId?: string | null } | null>(null);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const res = await fetch('/api/dashboard');
        if (!res.ok) throw new Error('API dashboard falhou');
        const data = await res.json();
        if (!cancelled) setStatus({ tenantId: data.tenantId, userId: data.userId });
      } catch (e: any) {
        if (!cancelled) setError(e?.message || 'erro');
      }
    }
    load();
    return () => { cancelled = true; };
  }, []);

  return (
    <div className="text-xs text-gray-600 flex items-center gap-2">
      <span className="px-2 py-1 rounded bg-gray-200">Env: mock</span>
      {status && (
        <>
          <span className="px-2 py-1 rounded bg-gray-200">tenant: {status.tenantId ?? 'n/a'}</span>
          <span className="px-2 py-1 rounded bg-gray-200">user: {status.userId ?? 'n/a'}</span>
        </>
      )}
      {error && <span className="px-2 py-1 rounded bg-red-100 text-red-700">{error}</span>}
    </div>
  );
}
