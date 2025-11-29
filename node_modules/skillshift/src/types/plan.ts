export interface DailyTask {
  day: number;
  description: string;
  activity: 'leitura' | 'pratica' | 'simulacao' | 'quiz' | 'reflexao';
  expectedTime: string; // "15-25 min"
  resources: string[];
  simulatorId?: string;
  quiz?: Record<string, unknown>;
}

export interface Plan30 {
  planId: string;
  userId: string;
  tenantId: string;
  startDate: string;
  endDate: string;
  dailyTasks: DailyTask[];
  weeklyGoals: string[];
  status: 'ativo' | 'concluido' | 'pausado';
  createdAt: number;
  updatedAt: number;
}
