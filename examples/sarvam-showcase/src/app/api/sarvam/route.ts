import { NextRequest, NextResponse } from 'next/server';

// Rate limiting store (in production, use Redis)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

// Rate limiting configuration
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 10; // 10 requests per minute

// Allowed endpoints for security
const ALLOWED_ENDPOINTS = [
  '/v1/chat/completions',
  '/translate',
  '/speech-to-text',
  '/text-to-speech',
];

// Input validation
const MAX_PAYLOAD_SIZE = 1024 * 1024; // 1MB
const MAX_MESSAGE_LENGTH = 10000; // characters

/**
 * Rate limiting check
 */
function checkRateLimit(ip: string): { allowed: boolean; resetTime?: number } {
  const now = Date.now();
  const userLimit = rateLimitStore.get(ip);

  if (!userLimit || now > userLimit.resetTime) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return { allowed: true };
  }

  if (userLimit.count >= RATE_LIMIT_MAX_REQUESTS) {
    return { allowed: false, resetTime: userLimit.resetTime };
  }

  userLimit.count++;
  return { allowed: true };
}

/**
 * Validate API endpoint
 */
function isValidEndpoint(endpoint: string): boolean {
  return ALLOWED_ENDPOINTS.some(allowed => endpoint.startsWith(allowed));
}

/**
 * Sanitize and validate payload
 */
function validatePayload(payload: any): { valid: boolean; error?: string } {
  if (!payload || typeof payload !== 'object') {
    return { valid: false, error: 'Invalid payload format' };
  }

  // Check message length for chat endpoints
  if (payload.messages) {
    const totalLength = payload.messages.reduce((acc: number, msg: any) =>
      acc + (msg.content?.length || 0), 0);
    if (totalLength > MAX_MESSAGE_LENGTH) {
      return { valid: false, error: 'Message too long' };
    }
  }

  // Check text length for translation endpoints
  if (payload.input && payload.input.length > MAX_MESSAGE_LENGTH) {
    return { valid: false, error: 'Input text too long' };
  }

  return { valid: true };
}

/**
 * Get client IP address
 */
function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  const clientIP = request.headers.get('x-client-ip');

  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  if (realIP) {
    return realIP;
  }
  if (clientIP) {
    return clientIP;
  }

  return (request as any).ip || 'unknown';
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting check
    const clientIP = getClientIP(request);
    const rateLimitResult = checkRateLimit(clientIP);

    if (!rateLimitResult.allowed) {
      const resetTime = rateLimitResult.resetTime!;
      const remainingTime = Math.ceil((resetTime - Date.now()) / 1000);

      return NextResponse.json(
        {
          error: `Rate limit exceeded. Try again in ${remainingTime} seconds.`,
          retryAfter: remainingTime
        },
        {
          status: 429,
          headers: {
            'Retry-After': remainingTime.toString(),
            'X-RateLimit-Reset': resetTime.toString(),
          }
        }
      );
    }

    // Content-Length check
    const contentLength = request.headers.get('content-length');
    if (contentLength && parseInt(contentLength) > MAX_PAYLOAD_SIZE) {
      return NextResponse.json(
        { error: 'Request payload too large' },
        { status: 413 }
      );
    }

    const body = await request.json();
    const { endpoint, payload, customApiKey, isTranslate } = body;

    // Validate endpoint
    if (!endpoint || typeof endpoint !== 'string' || !isValidEndpoint(endpoint)) {
      return NextResponse.json(
        { error: 'Invalid or unauthorized endpoint' },
        { status: 400 }
      );
    }

    // Validate payload
    const payloadValidation = validatePayload(payload);
    if (!payloadValidation.valid) {
      return NextResponse.json(
        { error: payloadValidation.error },
        { status: 400 }
      );
    }

    const apiKey = customApiKey || process.env.SARVAM_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: 'API Key not provided. Set it in .env or provide it in the UI.' },
        { status: 401 }
      );
    }

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (isTranslate) {
      headers['api-subscription-key'] = apiKey;
    } else {
      headers['Authorization'] = `Bearer ${apiKey}`;
    }

    // Add timeout to prevent hanging requests
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

    try {
      const response = await fetch(`https://api.sarvam.ai${endpoint}`, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorText = await response.text();
        return NextResponse.json(
          { error: `Sarvam API Error: ${response.status} - ${errorText}` },
          { status: response.status }
        );
      }

      const data = await response.json();

      // Add security headers to response
      const secureResponse = NextResponse.json(data);
      secureResponse.headers.set('X-Content-Type-Options', 'nosniff');
      secureResponse.headers.set('X-Frame-Options', 'DENY');
      secureResponse.headers.set('X-XSS-Protection', '1; mode=block');

      return secureResponse;

    } catch (fetchError: any) {
      clearTimeout(timeoutId);

      if (fetchError.name === 'AbortError') {
        return NextResponse.json(
          { error: 'Request timeout - please try again' },
          { status: 408 }
        );
      }

      throw fetchError;
    }

  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Internal Server Error';
    console.error('API Route Error:', error);

    return NextResponse.json(
      { error: message },
      {
        status: 500,
        headers: {
          'X-Content-Type-Options': 'nosniff',
          'X-Frame-Options': 'DENY',
        }
      }
    );
  }
}
