import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { adminAuth } from '@/lib/firebase/admin';

// POST /api/auth/session
// Body: { idToken: string }
// Creates a Firebase session cookie (__session) for middleware-friendly auth.
export async function POST(req: Request) {
  try {
    const { idToken } = await req.json();
    if (!idToken) return NextResponse.json({ error: 'Missing idToken' }, { status: 400 });

    const fiveDays = 5 * 24 * 60 * 60 * 1000;
    const sessionCookie = await adminAuth.createSessionCookie(idToken, { expiresIn: fiveDays });
    const cookieStore = await cookies();
    cookieStore.set('__session', sessionCookie, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/',
      maxAge: fiveDays / 1000,
    });
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: 'Failed to create session' }, { status: 400 });
  }
}

// DELETE /api/auth/session
// Clears the session cookie
export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.set('__session', '', { httpOnly: true, secure: true, sameSite: 'lax', path: '/', maxAge: 0 });
  return NextResponse.json({ ok: true });
}
