import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './i18n/routing';

const handleI18nRouting = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const host =
    request.headers.get('x-forwarded-host') ||
    request.headers.get('host') ||
    request.nextUrl.host ||
    '';

  const isCvSubdomain =
    host.startsWith('cv.') ||
    host.includes('cv.saktiarif.my.id') ||
    host.startsWith('cv.localhost');

  const { pathname } = request.nextUrl;

  // =========================================================================
  // 1. DEDICATED CV SUBDOMAIN ROUTING (cv.saktiarif.my.id)
  // =========================================================================
  if (isCvSubdomain) {
    // Indonesian version requested
    if (pathname === '/id' || pathname.startsWith('/id/')) {
      if (pathname === '/id/cv') {
        return NextResponse.next();
      }
      return NextResponse.rewrite(new URL('/id/cv', request.url));
    }

    // Direct /en/cv request
    if (pathname === '/en/cv') {
      return NextResponse.next();
    }

    // Default: Serve English CV for /, /en, /cv, or any other base path on subdomain
    return NextResponse.rewrite(new URL('/en/cv', request.url));
  }

  // =========================================================================
  // 2. MAIN PORTFOLIO DOMAIN ISOLATION (saktiarif.my.id / www.saktiarif.my.id)
  // Redirect legacy or direct /cv visits on main domain to dedicated subdomain
  // =========================================================================
  if (pathname === '/cv' || pathname === '/en/cv') {
    return NextResponse.redirect('https://cv.saktiarif.my.id', 307);
  }
  if (pathname === '/id/cv') {
    return NextResponse.redirect('https://cv.saktiarif.my.id/id', 307);
  }

  // =========================================================================
  // 3. MAIN PORTFOLIO LOCALIZATION (next-intl standard handling)
  // =========================================================================
  return handleI18nRouting(request);
}

export const config = {
  matcher: ['/', '/(en|id)/:path*', '/((?!api|_next|_vercel|.*\\..*).*)'],
};
