import { NextResponse } from 'next/server';
import { provider } from '@/lib/data';

export async function POST(req: Request) {
  const { userId, day, completed } = await req.json();
  const saved = await provider.saveProgress(userId, day, completed);
  return NextResponse.json({ progressId: saved.id, userId, day, completed });
}

export async function GET() {
  const items = await provider.listProgress();
  return NextResponse.json({ progress: items });
}
