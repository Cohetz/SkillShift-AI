import { NextResponse } from 'next/server';
import { diagnoseFlow } from '@/lib/ai/diagnosis';
import { getTenantIdFromRequest, getUserIdFromRequest } from '@/lib/auth/claims';
import { provider } from '@/lib/data';

export async function POST(req: Request) {
  const { userId: bodyUserId, answers } = await req.json();
  const tenantId = await getTenantIdFromRequest(req);
  const userId = bodyUserId || (await getUserIdFromRequest(req)) || 'anonymous';
  const result = await diagnoseFlow(answers);
  const saved = await provider.saveDiagnosis(userId, tenantId, result);
  return NextResponse.json({ diagnosticId: saved.id, tenantId, result });
}
