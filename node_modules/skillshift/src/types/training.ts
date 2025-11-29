export interface TrainingType {
  id?: string;
  tenantId: string | null;
  role: string;
  name: string;
  description?: string;
  createdAt?: number;
  updatedAt?: number;
}
