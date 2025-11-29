import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="space-y-8">
      <section className="text-center space-y-4 py-10">
        <h1 className="text-4xl font-heading font-bold text-brand">SkillShift</h1>
        <p className="text-lg max-w-2xl mx-auto">
          Plataforma de aceleração de habilidades: diagnóstico, plano 30 dias, simuladores inteligentes e evolução contínua.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/login" className="btn-primary">Entrar</Link>
          <Link href="/register" className="btn-primary bg-brand-dark">Criar Conta</Link>
          <Link href="/dashboard" className="btn-primary bg-brand/80">Dashboard</Link>
        </div>
      </section>
      <section className="grid md:grid-cols-3 gap-4">
        <div className="p-4 bg-white rounded shadow">
          <h2 className="font-semibold mb-1">Diagnóstico</h2>
          <p className="text-sm">Mapeie habilidades, lacunas e estilo de aprendizagem.</p>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <h2 className="font-semibold mb-1">Plano 30 Dias</h2>
            <p className="text-sm">Sequência progressiva de tarefas práticas e simuladores.</p>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <h2 className="font-semibold mb-1">Simuladores IA</h2>
          <p className="text-sm">Cenários realistas com feedback imediato e adaptação.</p>
        </div>
      </section>
      <section className="bg-white rounded shadow p-6 space-y-2">
        <h2 className="font-semibold">Próximos Passos</h2>
        <ol className="list-decimal ml-5 text-sm space-y-1">
          <li>Realizar diagnóstico inicial.</li>
          <li>Gerar plano de 30 dias.</li>
          <li>Executar tarefa do Dia 1.</li>
          <li>Rodar primeira simulação.</li>
        </ol>
      </section>
    </main>
  );
}
