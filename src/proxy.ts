import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('session')?.value;

  console.log("All Cookies:", request.cookies.getAll());

  // PUBLIC PATHS
  const isPublicPath = pathname === '/login' || pathname === '/';

  // BYPASS
  if (pathname.startsWith("/api") || pathname.startsWith("/_next")) {
    return NextResponse.next();
  }

  if (request.nextUrl.pathname.startsWith("/api") || request.nextUrl.pathname === '/') {
    return NextResponse.next();
  }

  // VERIFICATION LOGIC
  let payload = null;
  if (token) {
    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      const verified = await jwtVerify(token, secret);
      payload = verified.payload;
    } catch (err) {
      console.error("Token invalid:", err);
      // If token is invalid, clear it and redirect to login
      if (!isPublicPath) {
        const response = NextResponse.redirect(new URL('/login', request.url));
        response.cookies.delete('session');
        return response;
      }
    }
  }

  // REDIRECT LOGIC
  // User is logged in and trying to access /login -> Send to Dashboard
  if (isPublicPath && payload) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // User is NOT logged in and trying to access Protected Route -> Send to Login
  if (!isPublicPath && !payload) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)'],
};