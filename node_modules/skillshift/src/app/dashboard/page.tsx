"use client";
import { useEffect, useState } from 'react';

interface DashboardData {
  currentDay: number;
  progressPct: number;
  nextTask: any;
  simulationsCount: number;
  nextSteps: string[];
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [simHistory, setSimHistory] = useState<any[]>([]);
  useEffect(() => {
    (async () => {
      const res = await fetch('/api/dashboard').then(r => r.json());
      setData(res);
      const sims = await fetch('/api/simulations').then(r => r.json());
      setSimHistory(sims.simulations || []);
    })();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="p-4 bg-white rounded shadow">
        <h2 className="font-semibold">Seu Plano Atual</h2>
        {data ? (
          <>
            <p>Dia {data.currentDay} / 30</p>
            <p>Tarefa: {data.nextTask?.description || '—'}</p>
          </>
        ) : <p>Carregando...</p>}
      </div>
      <div className="p-4 bg-white rounded shadow">
        <h2 className="font-semibold">Progresso Geral</h2>
        <progress value={data?.progressPct || 0} max={100} className="w-full" />
        <p className="text-sm mt-1">{data?.progressPct || 0}%</p>
      </div>
      <div className="p-4 bg-white rounded shadow">
        <h2 className="font-semibold">Próximos Passos</h2>
        <ul className="list-disc ml-4 text-sm">
          {data?.nextSteps?.map(s => <li key={s}>{s}</li>) || <li>Carregando...</li>}
        </ul>
      </div>
      <div className="p-4 bg-white rounded shadow col-span-1 md:col-span-3">
        <h2 className="font-semibold">Últimas Simulações</h2>
        <div className="text-xs grid grid-cols-2 md:grid-cols-6 gap-2">
          {simHistory.slice(0,6).map(h => (
            <div key={h.id} className="border rounded p-2">
              <p>{h.simulatorType}</p>
              <p className="opacity-70">Score: {h.score ?? '-'}</p>
            </div>
          ))}
          {simHistory.length === 0 && <p>Nenhuma simulação registrada.</p>}
        </div>
      </div>
    </div>
  );
}
