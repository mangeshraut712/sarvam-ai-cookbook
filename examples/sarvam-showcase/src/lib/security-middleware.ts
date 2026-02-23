import { NextRequest, NextResponse } from 'next/server';
import { logger } from './logger';

// Security configuration
export const SECURITY_CONFIG = {
  // CORS settings
  cors: {
    allowedOrigins: [
      'http://localhost:3000',
      'http://localhost:3001',
      'https://sarvam-ai-cookbook.vercel.app',
      'https://sarvam-podcast-generator.vercel.app',
    ],
    allowedMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'X-Requested-With',
      'Accept',
      'Accept-Encoding',
    ],
    exposedHeaders: ['X-RateLimit-Reset', 'X-RateLimit-Remaining'],
    maxAge: 86400, // 24 hours
  },

  // Rate limiting (per IP)
  rateLimit: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 100, // requests per window
  },

  // Input validation
  inputValidation: {
    maxBodySize: 1024 * 1024, // 1MB
    maxQueryParams: 50,
    maxHeaders: 100,
  },

  // Security headers
  securityHeaders: {
    'X-Frame-Options': 'DENY',
    'X-Content-Type-Options': 'nosniff',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=()',
    'Cross-Origin-Embedder-Policy': 'require-corp',
    'Cross-Origin-Opener-Policy': 'same-origin',
    'Cross-Origin-Resource-Policy': 'same-origin',
  },
};

// In-memory rate limiting store (use Redis in production)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

/**
 * Rate limiting check
 */
export function checkRateLimit(ip: string): {
  allowed: boolean;
  remaining: number;
  resetTime: number;
  retryAfter?: number;
} {
  const now = Date.now();
  const windowMs = SECURITY_CONFIG.rateLimit.windowMs;
  const maxRequests = SECURITY_CONFIG.rateLimit.maxRequests;

  const userLimit = rateLimitStore.get(ip);

  if (!userLimit || now > userLimit.resetTime) {
    // Reset or initialize limit
    const resetTime = now + windowMs;
    rateLimitStore.set(ip, { count: 1, resetTime });
    return {
      allowed: true,
      remaining: maxRequests - 1,
      resetTime,
    };
  }

  if (userLimit.count >= maxRequests) {
    return {
      allowed: false,
      remaining: 0,
      resetTime: userLimit.resetTime,
      retryAfter: Math.ceil((userLimit.resetTime - now) / 1000),
    };
  }

  userLimit.count++;
  return {
    allowed: true,
    remaining: maxRequests - userLimit.count,
    resetTime: userLimit.resetTime,
  };
}

/**
 * CORS middleware
 */
export function handleCORS(request: NextRequest): NextResponse | null {
  const origin = request.headers.get('origin');
  const method = request.method;

  // Handle preflight requests
  if (method === 'OPTIONS') {
    const corsResponse = new NextResponse(null, { status: 204 });

    // Set CORS headers
    if (origin && SECURITY_CONFIG.cors.allowedOrigins.includes(origin)) {
      corsResponse.headers.set('Access-Control-Allow-Origin', origin);
    } else if (process.env.NODE_ENV === 'development') {
      // Allow any origin in development
      corsResponse.headers.set('Access-Control-Allow-Origin', origin || '*');
    }

    corsResponse.headers.set('Access-Control-Allow-Methods', SECURITY_CONFIG.cors.allowedMethods.join(', '));
    corsResponse.headers.set('Access-Control-Allow-Headers', SECURITY_CONFIG.cors.allowedHeaders.join(', '));
    corsResponse.headers.set('Access-Control-Max-Age', SECURITY_CONFIG.cors.maxAge.toString());

    return corsResponse;
  }

  return null;
}

/**
 * Input validation middleware
 */
export function validateInput(request: NextRequest): { valid: boolean; error?: string } {
  try {
    // Check Content-Length header
    const contentLength = request.headers.get('content-length');
    if (contentLength && parseInt(contentLength) > SECURITY_CONFIG.inputValidation.maxBodySize) {
      return { valid: false, error: 'Request body too large' };
    }

    // Check query parameters count
    const url = new URL(request.url);
    if (url.searchParams.size > SECURITY_CONFIG.inputValidation.maxQueryParams) {
      return { valid: false, error: 'Too many query parameters' };
    }

    // Check headers count
    const headerCount = Array.from(request.headers.keys()).length;
    if (headerCount > SECURITY_CONFIG.inputValidation.maxHeaders) {
      return { valid: false, error: 'Too many headers' };
    }

    // Check for malicious headers
    const suspiciousHeaders = ['x-forwarded-for', 'x-real-ip', 'x-client-ip'];
    const hasMultipleIPs = suspiciousHeaders.filter(h => request.headers.has(h)).length > 1;

    if (hasMultipleIPs) {
      logger.warn('Multiple IP headers detected', {
        headers: Object.fromEntries(request.headers),
        ip: (request as any).ip,
      });
    }

    return { valid: true };
  } catch (error: any) {
    logger.error('Input validation failed', { error: error.message });
    return { valid: false, error: 'Input validation failed' };
  }
}

/**
 * Security headers middleware
 */
export function applySecurityHeaders(response: NextResponse): void {
  const origin = response.headers.get('origin') || '*';

  // Apply security headers
  Object.entries(SECURITY_CONFIG.securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  // Set CORS headers for API responses
  if (origin && SECURITY_CONFIG.cors.allowedOrigins.includes(origin)) {
    response.headers.set('Access-Control-Allow-Origin', origin);
  } else if (process.env.NODE_ENV === 'development') {
    response.headers.set('Access-Control-Allow-Origin', '*');
  }

  response.headers.set('Access-Control-Allow-Methods', SECURITY_CONFIG.cors.allowedMethods.join(', '));
  response.headers.set('Access-Control-Allow-Headers', SECURITY_CONFIG.cors.allowedHeaders.join(', '));
}

/**
 * Audit logging middleware
 */
export function logRequest(request: NextRequest, response?: NextResponse): void {
  const ip = request.headers.get('x-forwarded-for') ||
    request.headers.get('x-real-ip') ||
    request.headers.get('x-client-ip') ||
    (request as any).ip ||
    'unknown';

  const userAgent = request.headers.get('user-agent') || 'unknown';
  const method = request.method;
  const url = request.url;
  const statusCode = response?.status;

  // Log security-relevant information
  const logData = {
    ip,
    method,
    url,
    userAgent,
    statusCode,
    timestamp: new Date().toISOString(),
    userId: 'anonymous', // Could be enhanced with authentication
  };

  // Log warnings for suspicious activity
  if (statusCode && statusCode >= 400) {
    logger.warn('Failed request', logData);
  } else if (method === 'POST' && url.includes('/api/')) {
    logger.info('API request', logData);
  }
}

/**
 * Comprehensive security middleware
 */
export function createSecurityMiddleware(
  handler: (request: NextRequest) => Promise<NextResponse> | NextResponse
) {
  return async function securityHandler(request: NextRequest): Promise<NextResponse> {
    try {
      // 1. Handle CORS preflight
      const corsResponse = handleCORS(request);
      if (corsResponse) {
        return corsResponse;
      }

      // 2. Validate input
      const inputValidation = validateInput(request);
      if (!inputValidation.valid) {
        logger.warn('Input validation failed', {
          error: inputValidation.error,
          ip: (request as any).ip,
          url: request.url,
        });

        const errorResponse = NextResponse.json(
          { error: inputValidation.error },
          { status: 400 }
        );
        applySecurityHeaders(errorResponse);
        return errorResponse;
      }

      // 3. Check rate limiting
      const clientIP = request.headers.get('x-forwarded-for') ||
        request.headers.get('x-real-ip') ||
        request.headers.get('x-client-ip') ||
        (request as any).ip ||
        'unknown';

      const rateLimit = checkRateLimit(clientIP);
      if (!rateLimit.allowed) {
        logger.warn('Rate limit exceeded', {
          ip: clientIP,
          retryAfter: rateLimit.retryAfter,
        });

        const errorResponse = NextResponse.json(
          {
            error: 'Rate limit exceeded',
            retryAfter: rateLimit.retryAfter,
          },
          {
            status: 429,
            headers: {
              'Retry-After': rateLimit.retryAfter!.toString(),
              'X-RateLimit-Reset': rateLimit.resetTime.toString(),
              'X-RateLimit-Remaining': '0',
            },
          }
        );
        applySecurityHeaders(errorResponse);
        return errorResponse;
      }

      // 4. Execute handler
      const response = await handler(request);

      // 5. Apply security headers
      applySecurityHeaders(response);

      // 6. Add rate limit headers
      response.headers.set('X-RateLimit-Remaining', rateLimit.remaining.toString());
      response.headers.set('X-RateLimit-Reset', rateLimit.resetTime.toString());
      response.headers.set('X-RateLimit-Limit', SECURITY_CONFIG.rateLimit.maxRequests.toString());

      // 7. Log request
      logRequest(request, response);

      return response;

    } catch (error: any) {
      logger.error('Security middleware error', {
        error: error.message,
        stack: error.stack,
        url: request.url,
        method: request.method,
      });

      const errorResponse = NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      );
      applySecurityHeaders(errorResponse);
      return errorResponse;
    }
  };
}
