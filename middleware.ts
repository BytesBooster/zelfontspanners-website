import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Redirect oude HTML routes naar Next.js routes
  if (pathname === '/login.html') {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  
  if (pathname === '/portfolio-manage.html') {
    const member = request.nextUrl.searchParams.get('member')
    if (member) {
      return NextResponse.redirect(new URL(`/portfolio-manage?member=${member}`, request.url))
    }
    return NextResponse.redirect(new URL('/portfolio-manage', request.url))
  }

  // Blokkeer directe toegang tot oude HTML bestanden
  if (pathname.endsWith('.html')) {
    // Redirect naar homepage als iemand oude HTML probeert te openen
    return NextResponse.redirect(new URL('/', request.url))
  }
  
  // Blokkeer directe toegang tot oude JS bestanden die modals kunnen bevatten
  const blockedJsFiles = [
    '/auth.js',
    '/login.js',
    '/portfolio-manage.js',
    '/components.js',
    '/script.js'
  ]
  if (blockedJsFiles.includes(pathname)) {
    return new NextResponse('File not found', { status: 404 })
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|woff|woff2|ttf|eot)).*)',
  ],
}


