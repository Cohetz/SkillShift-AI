export default function HealthPage() {
  return (
    <div className="p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold">Health Check</h1>
      <p>App Router is serving pages. Static chunks should load.</p>
      <ul className="list-disc ml-6 text-sm">
        <li>Try navigating to /login and /dashboard</li>
        <li>If chunks 404, ensure dev server runs from skillshift/</li>
      </ul>
    </div>
  );
}
