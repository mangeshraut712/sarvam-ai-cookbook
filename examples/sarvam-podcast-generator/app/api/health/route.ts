import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Basic health check for podcast generator
    const healthCheck = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      version: process.env.npm_package_version || '0.1.0',
      environment: process.env.NODE_ENV || 'development',
      service: 'sarvam-podcast-generator',
      checks: {
        inngest: 'unknown',
        redis: 'unknown',
        uploadthing: 'unknown',
        mistral: 'unknown',
        sarvam: 'unknown',
        memory_usage: process.memoryUsage(),
        cpu_usage: process.cpuUsage(),
      },
    };

    // Check environment variables (not actual connectivity)
    const requiredEnvVars = [
      'SARVAM_API_KEY',
      'MISTRAL_API_KEY',
      'UPLOADTHING_TOKEN',
      'INNGEST_SIGNING_KEY',
    ];

    const optionalEnvVars = [
      'REDIS_URL',
      'DATABASE_URL',
    ];

    const missingRequired = requiredEnvVars.filter(key => !process.env[key]);
    const missingOptional = optionalEnvVars.filter(key => !process.env[key]);

    healthCheck.checks.configuration = {
      required: missingRequired.length === 0 ? 'configured' : 'missing_required',
      optional: missingOptional.length === 0 ? 'configured' : 'missing_optional',
      missing_required: missingRequired,
      missing_optional: missingOptional,
    };

    // Basic service checks (placeholder - could be enhanced with actual connectivity tests)
    healthCheck.checks.inngest = process.env.INNGEST_SIGNING_KEY ? 'configured' : 'not_configured';
    healthCheck.checks.redis = process.env.REDIS_URL ? 'configured' : 'not_configured';
    healthCheck.checks.uploadthing = process.env.UPLOADTHING_TOKEN ? 'configured' : 'not_configured';
    healthCheck.checks.mistral = process.env.MISTRAL_API_KEY ? 'configured' : 'not_configured';
    healthCheck.checks.sarvam = process.env.SARVAM_API_KEY ? 'configured' : 'not_configured';

    // Determine overall health status
    const criticalServices = ['sarvam', 'mistral', 'inngest', 'uploadthing'];
    const hasCriticalFailures = criticalServices.some(service =>
      healthCheck.checks[service] === 'not_configured'
    );
    const hasRequiredConfigMissing = missingRequired.length > 0;

    const isHealthy = !hasCriticalFailures && !hasRequiredConfigMissing;

    return NextResponse.json(healthCheck, {
      status: isHealthy ? 200 : 503,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Health check failed:', error);

    return NextResponse.json(
      {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        service: 'sarvam-podcast-generator',
        error: 'Health check failed',
      },
      { status: 503 }
    );
  }
}
