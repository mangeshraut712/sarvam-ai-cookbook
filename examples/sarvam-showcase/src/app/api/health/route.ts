import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Basic health check
    const healthCheck = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      version: process.env.npm_package_version || '1.0.0',
      environment: process.env.NODE_ENV || 'development',
      checks: {
        database: 'not_implemented', // Could be added for database health
        external_api: 'unknown', // Could test Sarvam API connectivity
        memory_usage: process.memoryUsage(),
        cpu_usage: process.cpuUsage(),
      },
    };

    // Check external API connectivity (optional)
    try {
      const apiKey = process.env.SARVAM_API_KEY;
      if (apiKey) {
        // Simple connectivity test without using actual API calls
        healthCheck.checks.external_api = 'configured';
      } else {
        healthCheck.checks.external_api = 'not_configured';
      }
    } catch (error) {
      healthCheck.checks.external_api = 'error';
    }

    // Determine overall health status
    const isHealthy = healthCheck.checks.external_api !== 'error';

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
        error: 'Health check failed',
      },
      { status: 503 }
    );
  }
}
