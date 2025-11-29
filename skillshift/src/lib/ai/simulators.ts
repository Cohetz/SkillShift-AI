export async function runSimulation(userId: string, input: string, simulatorType: string) {
  // Placeholder - integrate Genkit chatFlow and Firestore persistence later
  return {
    output: `Resposta simulada (${simulatorType}): análise da entrada '${input}'`,
    score: Math.floor(Math.random() * 10),
    feedback: 'Mantenha clareza e empatia.'
  };
}
