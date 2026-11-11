import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './i18n/routing';

const handleI18nRouting = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const host = request.headers.get('x-forwarded-host') || request.headers.get('host') || '';
  const isCvSubdomain = host.startsWith('cv.') || host.includes('cv.saktiarif.my.id');

  // Let next-intl handle internationalization routing first
  const response = handleI18nRouting(request);

  // If next-intl returned a redirect (e.g. / -> /en or / -> /id), respect it
  if (response.headers.get('location')) {
    return response;
  }

  // Handle dedicated subdomain cv.saktiarif.my.id
  if (isCvSubdomain) {
    const { pathname } = request.nextUrl;

    if (pathname === '/en' || pathname === '/id') {
      const rewriteUrl = new URL(`${pathname}/cv`, request.url);
      return NextResponse.rewrite(rewriteUrl, {
        headers: response.headers,
      });
    }

    if (pathname === '/') {
      const rewriteUrl = new URL('/en/cv', request.url);
      return NextResponse.rewrite(rewriteUrl, {
        headers: response.headers,
      });
    }
  }

  return response;
}

export const config = {
  matcher: ['/', '/(en|id)/:path*', '/((?!api|_next|_vercel|.*\\..*).*)'],
};
