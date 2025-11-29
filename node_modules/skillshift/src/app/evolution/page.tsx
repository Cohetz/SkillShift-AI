export default function EvolutionPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Evolução</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-white rounded shadow">
          <h2 className="font-semibold">Progresso Diário</h2>
          <progress value={45} max={100} className="w-full" />
        </div>
        <div className="p-4 bg-white rounded shadow">
          <h2 className="font-semibold">Feedback da IA</h2>
          <p>Mensagens e recomendações recentes.</p>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <h2 className="font-semibold">Metas Semanais</h2>
          <ul className="list-disc ml-4 text-sm">
            <li>Dominar fundamentos</li>
            <li>Concluir 3 simulações</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
