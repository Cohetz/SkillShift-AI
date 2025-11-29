import { db } from '@/lib/firebase/config';
import { collection, addDoc, serverTimestamp, query, where, getDocs } from 'firebase/firestore';

export async function addTenantScoped(collectionName: string, tenantId: string, data: Record<string, any>) {
  return addDoc(collection(db, collectionName), {
    ...data,
    tenantId,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  });
}

export async function listByTenant(collectionName: string, tenantId: string) {
  const q = query(collection(db, collectionName), where('tenantId', '==', tenantId));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}
