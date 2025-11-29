import { redirect } from 'next/navigation';
import { getRoleFromRequest } from '@/lib/auth/claims';

async function fetchMetrics() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/gestor/metrics`, { cache: 'no-store' });
  if (!res.ok) return null;
  return res.json();
}

export default async function GestorDashboardPage() {
  const role = await getRoleFromRequest();
  if (role !== 'admin' && role !== 'manager') {
    redirect('/dashboard');
  }
  const data = await fetchMetrics();
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="p-4 bg-white rounded shadow"><h2 className="font-semibold">Funcionários Ativos</h2><p>{data?.funcionariosAtivos ?? '...'}</p></div>
      <div className="p-4 bg-white rounded shadow"><h2 className="font-semibold">Média de Progresso</h2><p>{data?.mediaProgresso ?? 0}%</p></div>
      <div className="p-4 bg-white rounded shadow"><h2 className="font-semibold">Simulações Mês</h2><p>{data?.simulacoesMes ?? '...'}</p></div>
      <div className="p-4 bg-white rounded shadow col-span-1 md:col-span-3">
        <h2 className="font-semibold">Top Performers</h2>
        <ul className="list-disc ml-4 text-sm">
          {data?.topPerformers?.map((tp: any) => <li key={tp.userId}>{tp.nome}</li>) || <li>Carregando...</li>}
        </ul>
      </div>
    </div>
  );
}
