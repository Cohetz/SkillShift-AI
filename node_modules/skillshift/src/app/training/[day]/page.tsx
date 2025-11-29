interface Props { params: { day: string } }
export default function TrainingDayPage({ params }: Props) {
  const day = params.day;
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dia {day} do Plano 30</h1>
      <div className="p-4 rounded-lg border bg-white shadow-sm">
        <h2 className="text-xl font-semibold">Tarefa do Dia</h2>
        <p>Simulação de atendimento ao cliente (exemplo)</p>
      </div>
      <a className="btn-primary w-full" href="/simulation">Iniciar Simulador</a>
    </div>
  );
}
