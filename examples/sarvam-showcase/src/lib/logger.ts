// Logging utility for Sarvam Showcase
type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  userId?: string;
  sessionId?: string;
  requestId?: string;
  metadata?: Record<string, any>;
}

class Logger {
  private isProduction = process.env.NODE_ENV === 'production';

  private formatMessage(level: LogLevel, message: string, metadata?: Record<string, any>): LogEntry {
    return {
      timestamp: new Date().toISOString(),
      level,
      message,
      metadata,
    };
  }

  private log(level: LogLevel, message: string, metadata?: Record<string, any>) {
    const entry = this.formatMessage(level, message, metadata);

    if (this.isProduction) {
      // In production, use structured logging
      console.log(JSON.stringify(entry));
    } else {
      // In development, use colored console output
      const colors = {
        debug: '\x1b[36m', // Cyan
        info: '\x1b[32m',  // Green
        warn: '\x1b[33m',  // Yellow
        error: '\x1b[31m', // Red
      };
      const reset = '\x1b[0m';
      console.log(`${colors[level]}[${level.toUpperCase()}]${reset} ${message}`, metadata || '');
    }
  }

  debug(message: string, metadata?: Record<string, any>) {
    this.log('debug', message, metadata);
  }

  info(message: string, metadata?: Record<string, any>) {
    this.log('info', message, metadata);
  }

  warn(message: string, metadata?: Record<string, any>) {
    this.log('warn', message, metadata);
  }

  error(message: string, metadata?: Record<string, any>) {
    this.log('error', message, metadata);
  }

  // Request logging helper
  logRequest(request: Request, responseTime?: number, statusCode?: number) {
    const url = new URL(request.url);
    const metadata = {
      method: request.method,
      path: url.pathname,
      userAgent: request.headers.get('user-agent'),
      ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip'),
      responseTime,
      statusCode,
    };

    if (statusCode && statusCode >= 400) {
      this.warn(`Request failed: ${request.method} ${url.pathname}`, metadata);
    } else {
      this.info(`Request: ${request.method} ${url.pathname}`, metadata);
    }
  }

  // Error logging helper
  logError(error: Error, context?: Record<string, any>) {
    this.error(`Error: ${error.message}`, {
      stack: error.stack,
      ...context,
    });
  }
}

export const logger = new Logger();
