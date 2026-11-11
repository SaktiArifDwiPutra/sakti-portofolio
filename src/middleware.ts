import createMiddleware from 'next-intl/middleware';
import { NextRequest } from 'next/server';
import { routing } from './i18n/routing';

const handleI18nRouting = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const host = request.headers.get('host') || '';
  const { pathname } = request.nextUrl;

  // Handle dedicated subdomain cv.saktiarif.my.id or cv.localhost
  if (host.startsWith('cv.')) {
    if (pathname === '/') {
      const url = request.nextUrl.clone();
      url.pathname = '/en/cv';
      return handleI18nRouting(new NextRequest(url, request));
    }
    if (pathname === '/en' || pathname === '/id') {
      const url = request.nextUrl.clone();
      url.pathname = `${pathname}/cv`;
      return handleI18nRouting(new NextRequest(url, request));
    }
  }

  return handleI18nRouting(request);
}

export const config = {
  matcher: ['/', '/(en|id)/:path*', '/((?!api|_next|_vercel|.*\\..*).*)'],
};
