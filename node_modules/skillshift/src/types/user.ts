export type Role = 'admin' | 'gestor' | 'funcionario';
export interface UserProfile {
  userId: string;
  tenantId: string;
  role: Role;
  name: string;
  email: string;
  skills: string[];
  gaps: string[];
  learningStyle?: string;
  level?: string;
  createdAt: number;
  updatedAt: number;
}
