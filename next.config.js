/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  images: {
    unoptimized: true,
    // Allow images from live server during development
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'zelfontspanners.nl',
        pathname: '/images/**',
      },
    ],
  },
  // Disable static optimization for pages that use localStorage
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
  // Add cache headers to prevent old builds from being cached - AGGRESSIVE
  async headers() {
    return [
      {
        source: '/_next/static/chunks/app/layout-:hash.js',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, must-revalidate, max-age=0',
          },
          {
            key: 'Pragma',
            value: 'no-cache',
          },
          {
            key: 'Expires',
            value: '0',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
        ],
      },
      {
        source: '/_next/static/chunks/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, must-revalidate, max-age=0',
          },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, must-revalidate, max-age=0',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
