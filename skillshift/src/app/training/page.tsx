import Link from 'next/link';

export default function TrainingIndex() {
  const days = Array.from({ length: 30 }).map((_, i) => i + 1);
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Plano 30 Dias</h1>
      <ul className="grid grid-cols-6 gap-2 text-sm">
        {days.map(d => (
          <li key={d} className="p-2 bg-white rounded shadow text-center">
            <Link href={`/training/${d}`}>Dia {d}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
