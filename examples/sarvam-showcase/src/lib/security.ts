// Security configuration for Next.js
export const securityHeaders = [
  // Content Security Policy
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' *.vercel-analytics.com *.vercel-speed-insights.com",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: https: *.vercel.app",
      "font-src 'self' data:",
      "connect-src 'self' https://api.sarvam.ai",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join('; '),
  },
  // Prevent MIME type sniffing
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  // Prevent clickjacking
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  // XSS protection
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block',
  },
  // Referrer policy
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  // Permissions policy
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=()',
  },
  // HSTS (only for HTTPS)
  ...(process.env.NODE_ENV === 'production' ? [{
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains; preload',
  }] : []),
];

// CORS configuration for API routes
export const corsHeaders = {
  'Access-Control-Allow-Origin': process.env.NODE_ENV === 'production'
    ? process.env.ALLOWED_ORIGINS || 'https://sarvam-ai-cookbook.vercel.app'
    : 'http://localhost:3000',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
  'Access-Control-Max-Age': '86400', // 24 hours
};

// API key validation
export function validateApiKey(apiKey: string | null): { valid: boolean; error?: string } {
  if (!apiKey) {
    return { valid: false, error: 'API key is required' };
  }

  // Basic format validation (adjust based on actual API key format)
  if (typeof apiKey !== 'string' || apiKey.length < 20) {
    return { valid: false, error: 'Invalid API key format' };
  }

  // Check for potentially malicious content
  const suspiciousPatterns = [
    /<script/i,
    /javascript:/i,
    /on\w+=/i,
    /<iframe/i,
    /<object/i,
  ];

  if (suspiciousPatterns.some(pattern => pattern.test(apiKey))) {
    return { valid: false, error: 'Invalid API key format' };
  }

  return { valid: true };
}

// Input sanitization
export function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, '') // Remove angle brackets
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
    .trim()
    .substring(0, 10000); // Limit length
}

// CSRF protection helper
export function generateCsrfToken(): string {
  return crypto.randomUUID();
}

export function validateCsrfToken(token: string, expectedToken: string): boolean {
  if (!token || !expectedToken) {
    return false;
  }

  // Use simple string comparison for CSRF tokens
  // In production, consider using a proper crypto library
  return token === expectedToken;
}
