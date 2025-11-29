import { NextResponse } from 'next/server';
import { getClaimsFromRequest, getTenantIdFromRequest, getRoleFromRequest } from '@/lib/auth/claims';
import { provider } from '@/lib/data';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const role = searchParams.get('role') || undefined;
  const tenantId = await getTenantIdFromRequest(req);
  const items = await provider.listTrainingTypes(tenantId, role);
  return NextResponse.json({ tenantId, items });
}

export async function POST(req: Request) {
  const roleClaim = await getRoleFromRequest(req);
  if (roleClaim !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }
  const tenantId = await getTenantIdFromRequest(req);
  const { role, name, description } = await req.json();
  if (!role || !name) return NextResponse.json({ error: 'Missing role or name' }, { status: 400 });
  const created = await provider.createTrainingType({ tenantId, role, name, description });
  return NextResponse.json({ id: created.id, tenantId, role, name, description });
}
