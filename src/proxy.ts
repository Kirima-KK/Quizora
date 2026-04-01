import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';
import serverConfig from './app/_config/server.config';

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // PUBLIC PATHS
  const isPublicPath = pathname === '/login' || pathname === '/';

  // BYPASS
  if (pathname.startsWith("/api") || pathname.startsWith("/_next")) {
    return NextResponse.next();
  }

  // VERIFICATION LOGIC
  let payload = null;
  try {
    // This fetch MUST have credentials: 'include'
    const user = await fetch(`${serverConfig.backendHost}/api/current-user`, {
      method: 'GET',
      credentials: 'include',
    });

    if (!user) {
      NextResponse.redirect(new URL('/login', request.url));
    }
  } catch (error) {
    console.error("Auth check failed", error);
    NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)'],
};