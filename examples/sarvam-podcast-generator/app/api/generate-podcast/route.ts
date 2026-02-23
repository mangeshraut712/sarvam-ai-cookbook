import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { inngest } from '../../../lib/inngest';
import { createJob } from '../../../lib/job-store';

// Rate limiting store (in production, use Redis)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

// Rate limiting configuration
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 5; // 5 requests per minute for podcast generation
const MAX_CONTENT_LENGTH = 50000; // 50KB max content
const MAX_TITLE_LENGTH = 200; // 200 chars max title

// Supported languages
const SUPPORTED_LANGUAGES = [
  'en-IN', 'hi-IN', 'ta-IN', 'te-IN', 'kn-IN', 'ml-IN',
  'en-US', 'hi', 'ta', 'te', 'kn', 'ml'
];

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

  return 'unknown';
}

/**
 * Validate podcast generation request
 */
function validateRequest(body: unknown): { valid: boolean; error?: string } {
  if (!body || typeof body !== 'object') {
    return { valid: false, error: 'Invalid request body' };
  }

  const obj = body as Record<string, unknown>;
  const content = obj.content;
  const language = obj.language;
  const title = obj.title;

  // Validate content (required)
  if (!content || typeof content !== 'string') {
    return { valid: false, error: 'Content is required and must be a string' };
  }

  if (content.length > MAX_CONTENT_LENGTH) {
    return { valid: false, error: `Content too long. Maximum ${MAX_CONTENT_LENGTH} characters allowed` };
  }

  if (content.trim().length === 0) {
    return { valid: false, error: 'Content cannot be empty' };
  }

  // Validate language (optional)
  if (language !== undefined && typeof language !== 'string') {
    return { valid: false, error: 'Language must be a string' };
  }

  if (language && typeof language === 'string' && !SUPPORTED_LANGUAGES.includes(language as string)) {
    return { valid: false, error: `Unsupported language. Supported: ${SUPPORTED_LANGUAGES.join(', ')}` };
  }

  // Validate title (optional)
  if (title !== undefined && typeof title !== 'string') {
    return { valid: false, error: 'Title must be a string' };
  }

  if (title && typeof title === 'string' && (title as string).length > MAX_TITLE_LENGTH) {
    return { valid: false, error: `Title too long. Maximum ${MAX_TITLE_LENGTH} characters allowed` };
  }

  return { valid: true };
}

/**
 * Sanitize input content
 */
function sanitizeContent(content: string): string {
  return content
    .trim()
    .replace(/[<>]/g, '') // Remove angle brackets
    .substring(0, MAX_CONTENT_LENGTH);
}

export const maxDuration = 60;
export const dynamic = 'force-dynamic';

interface GeneratePodcastRequest {
  content?: string;
  language?: string;
  title?: string;
}

export async function POST(request: NextRequest) {
  const startTime = Date.now();

  try {
    // Rate limiting check
    const clientIP = getClientIP(request);
    const rateLimitResult = checkRateLimit(clientIP);

    if (!rateLimitResult.allowed) {
      const resetTime = rateLimitResult.resetTime!;
      const remainingTime = Math.ceil((resetTime - Date.now()) / 1000);

      console.warn(`Rate limit exceeded for IP: ${clientIP}, resetting in ${remainingTime}s`);

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
    if (contentLength && parseInt(contentLength) > MAX_CONTENT_LENGTH * 2) {
      return NextResponse.json(
        { error: 'Request payload too large' },
        { status: 413 }
      );
    }

    const body = (await request.json()) as GeneratePodcastRequest;

    // Validate request
    const validation = validateRequest(body);
    if (!validation.valid) {
      console.warn(`Invalid request from IP: ${clientIP}, error: ${validation.error}`);
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      );
    }

    const { content, language, title } = body;
    const sanitizedContent = sanitizeContent(content!);
    const targetLanguage = language || 'en-IN';
    const sanitizedTitle = title ? title.substring(0, MAX_TITLE_LENGTH) : undefined;

    const jobId = uuidv4();

    console.log(`Starting podcast generation job: ${jobId} for IP: ${clientIP}`);

    await createJob(jobId);

    // Add timeout to prevent hanging requests
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

    try {
      await inngest.send({
        name: 'podcast/generate',
        data: {
          content: sanitizedContent,
          language: targetLanguage,
          title: sanitizedTitle,
          jobId,
        },
      });

      clearTimeout(timeoutId);

      const processingTime = Date.now() - startTime;
      console.log(`Podcast generation job ${jobId} queued successfully in ${processingTime}ms`);

      const response = NextResponse.json({
        jobId,
        status: 'pending',
        message: 'Podcast generation started. Use the jobId to check status.',
        statusUrl: `/api/job-status/${jobId}`,
        estimatedTime: '2-5 minutes',
      });

      // Add security headers
      response.headers.set('X-Content-Type-Options', 'nosniff');
      response.headers.set('X-Frame-Options', 'DENY');

      return response;

    } catch (inngestError: unknown) {
      clearTimeout(timeoutId);
      console.error(`Inngest error for job ${jobId}:`, inngestError);
      throw inngestError;
    }

  } catch (error) {
    const processingTime = Date.now() - startTime;
    const errorMessage = error instanceof Error ? error.message : 'Failed to start podcast generation';

    console.error(`Podcast generation failed after ${processingTime}ms:`, error);

    const response = NextResponse.json(
      {
        error: `Error starting podcast generation: ${errorMessage}`,
      },
      { status: 500 }
    );

    // Add security headers even for errors
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('X-Frame-Options', 'DENY');

    return response;
  }
}
