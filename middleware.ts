import { NextRequest, NextResponse } from 'next/server';

const PUBLIC_PATHS = ['/', '/support', '/privacy', '/terms', '/sign-in', '/sign-up', '/api/webhooks'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isPublic = PUBLIC_PATHS.some(
    (p) => pathname === p || pathname.startsWith(p + '/')
  );

  const token = request.cookies.get('bytestock_token')?.value;

  if (!isPublic && !token) {
    const url = request.nextUrl.clone();
    url.pathname = '/sign-in';
    return NextResponse.redirect(url);
  }

  if (isPublic && token && (pathname.startsWith('/sign-in') || pathname.startsWith('/sign-up'))) {
    const url = request.nextUrl.clone();
    url.pathname = '/';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|assets).*)'],
};
