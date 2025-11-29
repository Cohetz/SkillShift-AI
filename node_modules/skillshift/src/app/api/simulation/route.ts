import { NextResponse } from 'next/server';
import { runSimulation } from '@/lib/ai/simulators';
import { getTenantIdFromRequest, getUserIdFromRequest } from '@/lib/auth/claims';
import { provider } from '@/lib/data';

export async function POST(req: Request) {
  const { userId: bodyUserId, input, simulatorType } = await req.json();
  const tenantId = await getTenantIdFromRequest(req);
  const userId = bodyUserId || (await getUserIdFromRequest(req)) || 'anonymous';
  const result = await runSimulation(userId, input, simulatorType);
  await provider.saveSimulation({ userId, tenantId, simulatorType, conversation: [{ user: input, ia: result.output }], score: result.score, feedback: result.feedback });
  return NextResponse.json({ tenantId, ...result });
}
