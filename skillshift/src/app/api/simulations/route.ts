import { NextResponse } from 'next/server';
import { getTenantIdFromRequest } from '@/lib/auth/claims';
import { provider } from '@/lib/data';

export async function GET(req: Request) {
  const tenantId = await getTenantIdFromRequest(req);
  const sims = await provider.listSimulations(tenantId);
  // Return only summary fields for now
  return NextResponse.json({
    tenantId,
    simulations: sims.map((s: any) => ({ id: s.id, simulatorType: s.simulatorType, score: s.score, feedback: s.feedback, turns: s.conversation?.length ?? 0 }))
  });
}
