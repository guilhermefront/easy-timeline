import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  if (
    request.nextUrl.pathname === '/' &&
    request.cookies.get('next-auth.csrf-token')?.value
  ) {
    return NextResponse.redirect(new URL('/my-timelines', request.url));
  }
}
