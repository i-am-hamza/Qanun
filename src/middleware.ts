import { NextResponse, type NextRequest } from 'next/server'

// Middleware function signature requires the request param even when not consumed.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function middleware(_req: NextRequest) {
  const response = NextResponse.next()

  if (process.env.NEXT_PUBLIC_SITE_INDEXING !== 'true') {
    response.headers.set('X-Robots-Tag', 'noindex, nofollow')
  }

  return response
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
