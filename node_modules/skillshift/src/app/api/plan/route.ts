import { NextResponse } from 'next/server';
import { generatePlan30 } from '@/lib/ai/plan30';
import { getTenantIdFromRequest, getUserIdFromRequest } from '@/lib/auth/claims';
import { provider } from '@/lib/data';

export async function POST(req: Request) {
  const { userId: bodyUserId, diagnostic } = await req.json();
  const tenantId = await getTenantIdFromRequest(req);
  const userId = bodyUserId || (await getUserIdFromRequest(req)) || 'anonymous';
  const plan = await generatePlan30(diagnostic);
  const saved = await provider.createPlan(userId, tenantId, plan.tasks);
  return NextResponse.json({ planId: saved.id, tenantId, plan });
}
