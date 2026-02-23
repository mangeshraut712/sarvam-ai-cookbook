import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Remove Next.js fingerprinting header and trim deploy output
  poweredByHeader: false,

  // Performance optimizations
  compress: true,

  // Image optimization
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), autoplay=()',
          },
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
        ],
      },
      {
        source: '/api/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, must-revalidate',
          },
        ],
      },
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },

  // Experimental features for performance
  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
    optimizePackageImports: ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu', 'lucide-react'],
  },

  // Build optimization
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Bundle analyzer (conditionally enabled)
  ...(process.env.ANALYZE === 'true' && {
    webpack: (config: any) => {
      if (process.env.NODE_ENV === 'production') {
        const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
        config.plugins.push(
          new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            openAnalyzer: false,
            reportFilename: './analyze/client.html',
          })
        );
      }
      return config;
    },
  }),

  // Environment variables validation
  env: {
    NEXT_PUBLIC_APP_NAME: 'Sarvam AI Podcast Generator',
    NEXT_PUBLIC_APP_VERSION: process.env.npm_package_version,
    NEXT_PUBLIC_ENVIRONMENT: process.env.NODE_ENV,
  },

  // Webpack configuration for better performance
  webpack: (config: any, { dev, isServer }: any) => {
    // Add custom webpack optimizations
    if (!dev && !isServer) {
      config.optimization.splitChunks.chunks = 'all';
    }

    return config;
  },

  // Output configuration for better deployment
  output: 'standalone',
  outputFileTracingRoot: undefined,
};

export default nextConfig;
