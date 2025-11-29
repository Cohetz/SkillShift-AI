import { DailyTask } from '@/types/plan';

interface DiagnosticInput { skills: string[]; gaps: string[]; learningStyle?: string; }

export async function generatePlan30(diagnostic: DiagnosticInput) {
  // Placeholder mock; integrate Genkit flow or Cloud Function later
  const tasks: DailyTask[] = Array.from({ length: 30 }).map((_, i) => ({
    day: i + 1,
    description: `Tarefa do dia ${i + 1} focada em ${diagnostic.gaps[0] || 'fundamentos'}`,
    activity: 'pratica',
    expectedTime: '20 min',
    resources: []
  }));
  return { weeks: ['Fundamentos', 'Prática guiada', 'Casos reais', 'Maestria'], tasks };
}
