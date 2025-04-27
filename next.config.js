/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Only use these settings for production builds
  ...(process.env.NODE_ENV === 'production' ? {
    output: 'export',
    distDir: 'dist',
    images: {
      unoptimized: true,
    },
    trailingSlash: true,
  } : {})
}

module.exports = nextConfig 