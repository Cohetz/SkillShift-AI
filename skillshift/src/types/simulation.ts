export interface SimulationRecord {
  simulationId: string;
  userId: string;
  tenantId: string;
  simulatorType: string;
  conversation: { user: string; ia: string; }[];
  score?: number;
  feedback?: string;
  createdAt: number;
  updatedAt: number;
}
