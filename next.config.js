/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  // Disable static optimization for pages that use localStorage
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb', // Verhoogd voor foto uploads
    },
  },
}

module.exports = nextConfig
