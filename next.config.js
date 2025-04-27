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
    distDir: 'out',
    images: {
      unoptimized: true,
    },
    trailingSlash: true,
  } : {
    output: 'export',
    images: {
      unoptimized: true,
    },
  }),
  // Disable server-side features for static export
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    };
    return config;
  },
}

module.exports = nextConfig 