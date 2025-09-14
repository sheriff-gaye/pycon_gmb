import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { match as matchLocale } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isPublicRoute = createRouteMatcher([
  '/sign-in(.*)',
  '/sign-up(.*)'
]);

// Routes to exclude from locale processing
const isApiRoute = createRouteMatcher([
  '/api/(.*)',
]);

const isWebhookRoute = createRouteMatcher([
  '/api/webhooks/(.*)',
]);

export default clerkMiddleware(async (auth, req) => {
  // Skip auth for webhook routes
  if (isWebhookRoute(req)) {
    return NextResponse.next();
  }
  
  // Skip auth for API routes (optional, depending on your needs)
  if (isApiRoute(req)) {
    return NextResponse.next();
  }

  if (!isPublicRoute(req)) {
    await auth.protect();
  }
});

const locales = ['en', 'fr'];
const defaultLocale = 'en';

function getLocale(request: NextRequest): string {
  try {
    const acceptedLanguage = request.headers.get('accept-language') ?? undefined;
    
    // If no accept-language header, return default locale
    if (!acceptedLanguage) {
      return defaultLocale;
    }
    
    const headers = { 'accept-language': acceptedLanguage };
    const languages = new Negotiator({ headers }).languages();
    
    // Filter out invalid locale strings that might cause errors
    const validLanguages = languages.filter((lang) => {
      try {
        // Test if the language code is valid
        new Intl.Locale(lang);
        return true;
      } catch {
        return false;
      }
    });

    return matchLocale(validLanguages.length > 0 ? validLanguages : [defaultLocale], locales, defaultLocale);
  } catch (error) {
    console.error('Error determining locale:', error);
    return defaultLocale;
  }
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Skip middleware for API routes (including webhooks)
  if (isApiRoute(request)) {
    return NextResponse.next();
  }
  
  // Skip middleware for static files
  if (pathname.includes('.') || pathname.startsWith('/_next')) {
    return NextResponse.next();
  }
  
  // Check if there is any supported locale in the pathname route
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);
    return NextResponse.redirect(
      new URL(`/${locale}${pathname}`, request.url)
    );
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public folder)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public|.*\\.(?:png|jpg|jpeg|gif|webp|svg|ico|css|js|woff|woff2|ttf|eot|pdf|txt|xml|json)).*)',
  ],
};