import type { DataProvider } from './provider';
import { adminDb } from '@/lib/firebase/admin';

function col(name: string) {
  return adminDb.collection(name);
}

export const firebaseProvider: DataProvider = {
  async saveDiagnosis(userId, tenantId, results) {
    const ref = await col('diagnostics').add({ userId, tenantId, results, createdAt: Date.now() });
    return { id: ref.id };
  },
  async createPlan(userId, tenantId, tasks) {
    const ref = await col('plans').add({ userId, tenantId, dailyTasks: tasks, status: 'ativo', createdAt: Date.now() });
    return { id: ref.id };
  },
  async saveSimulation({ userId, tenantId, simulatorType, conversation, score, feedback }) {
    await col('simulations').add({ userId, tenantId, simulatorType, conversation, score, feedback, createdAt: Date.now() });
  },
  async listSimulations(tenantId) {
    let q = col('simulations') as FirebaseFirestore.Query<FirebaseFirestore.DocumentData>;
    if (tenantId) q = q.where('tenantId', '==', tenantId);
    const snap = await q.get();
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
  },
  async saveProgress(userId, day, completed) {
    const ref = await col('progress').add({ userId, day, completed, createdAt: Date.now() });
    return { id: ref.id };
  },
  async listProgress(userId) {
    let q = col('progress') as FirebaseFirestore.Query<FirebaseFirestore.DocumentData>;
    if (userId) q = q.where('userId', '==', userId);
    const snap = await q.get();
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
  },
  async getDashboard(tenantId) {
    // Simplified: pick first employee user under tenant (adjust as needed)
    let uq = col('users') as FirebaseFirestore.Query<FirebaseFirestore.DocumentData>;
    if (tenantId) uq = uq.where('tenantId', '==', tenantId);
    const u = await uq.limit(1).get();
    const user = u.docs[0]?.data() as any;
    if (!user) return { error: 'No user' };
    const plans = await (col('plans').where('userId', '==', user.userId).limit(1).get());
    const plan = plans.docs[0]?.data() as any;
    const progressEntries = await (col('progress').where('userId', '==', user.userId).get());
    const simulations = await (col('simulations').where('userId', '==', user.userId).get());
    const currentDay = progressEntries.size + 1;
    const progressPct = Math.min(Math.round((progressEntries.size / 30) * 100), 100);
    return {
      tenantId,
      userId: user.userId,
      planId: plans.docs[0]?.id || null,
      currentDay,
      progressPct,
      nextTask: plan?.dailyTasks?.[currentDay - 1] || null,
      simulationsCount: simulations.size,
      nextSteps: ['Revisar feedback', 'Executar próxima simulação', 'Fazer quiz fundamentos']
    };
  },
  async getGestorMetrics(tenantId) {
    let uq = col('users') as FirebaseFirestore.Query<FirebaseFirestore.DocumentData>;
    if (tenantId) uq = uq.where('tenantId', '==', tenantId);
    const usersSnap = await uq.get();
    const funcionarios = usersSnap.docs.map(d => d.data()).filter(u => u.role === 'funcionario');
    const progressCount = (await col('progress').get()).size;
    const simsCount = (await col('simulations').get()).size;
    const avgProgress = funcionarios.length === 0 ? 0 : Math.round((progressCount / (funcionarios.length * 30)) * 100);
    return {
      tenantId,
      funcionariosAtivos: funcionarios.length,
      mediaProgresso: avgProgress,
      simulacoesMes: simsCount,
      alertas: [],
      topPerformers: funcionarios.slice(0, 3).map((f: any) => ({ userId: f.userId, nome: f.name }))
    };
  }
  ,
  async createTrainingType({ tenantId, role, name, description }) {
    const ref = await col('trainingTypes').add({ tenantId, role, name, description: description || '', createdAt: Date.now(), updatedAt: Date.now() });
    return { id: ref.id };
  },
  async listTrainingTypes(tenantId, role) {
    let q = col('trainingTypes') as FirebaseFirestore.Query<FirebaseFirestore.DocumentData>;
    if (tenantId) q = q.where('tenantId', '==', tenantId);
    if (role) q = q.where('role', '==', role);
    const snap = await q.get();
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
  },
  async updateTrainingType(id, patch) {
    await col('trainingTypes').doc(id).set({ ...patch, updatedAt: Date.now() }, { merge: true });
  },
  async deleteTrainingType(id) {
    await col('trainingTypes').doc(id).delete();
  }
};
