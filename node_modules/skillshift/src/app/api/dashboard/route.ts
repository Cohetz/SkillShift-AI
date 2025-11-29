import { NextResponse } from 'next/server';
import { getTenantIdFromRequest } from '@/lib/auth/claims';
import { provider } from '@/lib/data';

export async function GET(req: Request) {
  const tenantId = await getTenantIdFromRequest(req);
  const data = await provider.getDashboard(tenantId);
  return NextResponse.json(data);
}
