import { headers } from 'next/headers';
import { adminAuth } from '@/lib/firebase/admin';

export async function getTenantIdFromRequest(req?: Request): Promise<string | null> {
  const authHeader = req?.headers?.get('authorization') ?? headers().get('authorization');
  const cookieHeader = req?.headers?.get('cookie') ?? headers().get('cookie');
  try {
    if (authHeader) {
      const [, token] = authHeader.split(' ');
      if (token) {
        const decoded = await adminAuth.verifyIdToken(token);
        return (decoded as any).tenantId ?? null;
      }
    }
    if (cookieHeader) {
      const session = parseCookie(cookieHeader)['__session'];
      if (session) {
        const decoded = await adminAuth.verifySessionCookie(session, true);
        return (decoded as any).tenantId ?? null;
      }
    }
  } catch {
    // ignore
  }
  return null;
}

export async function getUserIdFromRequest(req?: Request): Promise<string | null> {
  const authHeader = req?.headers?.get('authorization') ?? headers().get('authorization');
  const cookieHeader = req?.headers?.get('cookie') ?? headers().get('cookie');
  try {
    if (authHeader) {
      const [, token] = authHeader.split(' ');
      if (token) {
        const decoded = await adminAuth.verifyIdToken(token);
        return decoded.uid ?? null;
      }
    }
    if (cookieHeader) {
      const session = parseCookie(cookieHeader)['__session'];
      if (session) {
        const decoded = await adminAuth.verifySessionCookie(session, true);
        return decoded.uid ?? null;
      }
    }
  } catch {
    // ignore
  }
  return null;
}

export async function getClaimsFromRequest(req?: Request): Promise<any | null> {
  const authHeader = req?.headers?.get('authorization') ?? headers().get('authorization');
  const cookieHeader = req?.headers?.get('cookie') ?? headers().get('cookie');
  try {
    if (authHeader) {
      const [, token] = authHeader.split(' ');
      if (token) {
        return await adminAuth.verifyIdToken(token);
      }
    }
    if (cookieHeader) {
      const session = parseCookie(cookieHeader)['__session'];
      if (session) {
        return await adminAuth.verifySessionCookie(session, true);
      }
    }
  } catch {
    // ignore
  }
  return null;
}

export async function getRoleFromRequest(req?: Request): Promise<string | null> {
  const claims = await getClaimsFromRequest(req);
  return claims?.role ?? null;
}

function parseCookie(header: string): Record<string, string> {
  return header.split(';').reduce((acc, part) => {
    const [k, ...v] = part.trim().split('=');
    if (k) acc[k] = decodeURIComponent(v.join('='));
    return acc;
  }, {} as Record<string, string>);
}
