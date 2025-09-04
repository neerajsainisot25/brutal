import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Security headers for all routes
  const response = NextResponse.next()
  
  // Add security headers
  response.headers.set('X-DNS-Prefetch-Control', 'off')
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  response.headers.set('X-XSS-Protection', '1; mode=block')
  
  // API route specific security
  if (request.nextUrl.pathname.startsWith('/api/')) {
    // Validate request size (prevent large payloads)
    const contentLength = request.headers.get('content-length')
    if (contentLength && parseInt(contentLength) > 1024 * 10) { // 10KB limit
      return new NextResponse('Payload too large', { status: 413 })
    }
    
    // Only allow POST for API routes
    if (request.method !== 'POST' && request.method !== 'OPTIONS') {
      return new NextResponse('Method not allowed', { status: 405 })
    }
    
    // Validate Content-Type for POST requests
    if (request.method === 'POST') {
      const contentType = request.headers.get('content-type')
      if (!contentType || !contentType.includes('application/json')) {
        return new NextResponse('Invalid content type', { status: 400 })
      }
    }
  }
  
  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}