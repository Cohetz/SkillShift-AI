export type DiagnosisResult = any;
export type Plan = { tasks: any[] };

export interface DataProvider {
  saveDiagnosis(userId: string, tenantId: string | null, results: DiagnosisResult): Promise<{ id: string }>;
  createPlan(userId: string, tenantId: string | null, tasks: any[]): Promise<{ id: string }>;
  saveSimulation(input: { userId: string; tenantId: string | null; simulatorType: string; conversation: any[]; score: number; feedback: string }): Promise<void>;
  listSimulations(tenantId: string | null): Promise<Array<any>>;
  saveProgress(userId: string, day: number, completed: boolean): Promise<{ id: string }>;
  listProgress(userId?: string): Promise<Array<any>>;
  getDashboard(tenantId: string | null): Promise<any>;
  getGestorMetrics(tenantId: string | null): Promise<any>;
  createTrainingType(input: { tenantId: string | null; role: string; name: string; description?: string }): Promise<{ id: string }>;
  listTrainingTypes(tenantId: string | null, role?: string): Promise<Array<any>>;
  updateTrainingType(id: string, patch: Partial<{ role: string; name: string; description: string }>): Promise<void>;
  deleteTrainingType(id: string): Promise<void>;
}
