import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // /mentor/login sayfasını korumadan geçir
  if (pathname === '/mentor/login') {
    return NextResponse.next();
  }

  // Diğer korumalı sayfalar için localStorage kontrolü client-side'da yapılacak
  return NextResponse.next();
}

export const config = {
  matcher: ['/denetim/:path*', '/mentor/:path*', '/kayit/:path*'],
};
