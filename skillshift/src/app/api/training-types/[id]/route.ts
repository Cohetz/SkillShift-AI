import { NextResponse } from 'next/server';
import { provider } from '@/lib/data';
import { getRoleFromRequest } from '@/lib/auth/claims';

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const roleClaim = await getRoleFromRequest(req);
  if (roleClaim !== 'admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  const patch = await req.json();
  await provider.updateTrainingType(params.id, patch);
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const roleClaim = await getRoleFromRequest(req);
  if (roleClaim !== 'admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  await provider.deleteTrainingType(params.id);
  return NextResponse.json({ ok: true });
}
