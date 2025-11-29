import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Lightweight guard: require presence of __session cookie for protected pages.
// Note: Middleware runs on Edge; we only check presence, verification happens in APIs.
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  // Allow public and auth pages without cookie
  const publicPaths = ['/', '/login', '/register', '/reset', '/health'];
  if (publicPaths.includes(pathname) || pathname.startsWith('/_next') || pathname.startsWith('/static') || pathname.startsWith('/favicon')) {
    return NextResponse.next();
  }
  const session = req.cookies.get('__session')?.value;
  if (!session) {
    const url = req.nextUrl.clone();
    url.pathname = '/login';
    url.searchParams.set('next', pathname);
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = { matcher: ['/((?!api).*)'] };
