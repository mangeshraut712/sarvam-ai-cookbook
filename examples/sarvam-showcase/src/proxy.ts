import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@/lib/logger';

export function proxy(request: NextRequest) {
  const startTime = Date.now();
  const requestId = crypto.randomUUID().substring(0, 8);

  // Add request ID to headers for tracking
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-request-id', requestId);

  // Clone request with new headers
  const newRequest = new NextRequest(request.url, {
    ...request,
    headers: requestHeaders,
  });

  // Log incoming request
  logger.info(`Incoming request: ${request.method} ${request.nextUrl.pathname}`, {
    requestId,
    method: request.method,
    path: request.nextUrl.pathname,
    userAgent: request.headers.get('user-agent'),
    ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown',
  });

  // Create response wrapper for logging
  const response = NextResponse.next();

  // Add response headers
  response.headers.set('x-request-id', requestId);
  response.headers.set('x-powered-by', 'Sarvam AI Cookbook');

  // Log response when it's sent (this is a simplified version)
  // In a real implementation, you'd use a response transformer
  const endTime = Date.now();
  const responseTime = endTime - startTime;

  logger.logRequest(request, responseTime, response.status);

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/health (health checks)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api/health|_next/static|_next/image|favicon.ico|public/).*)',
  ],
};
