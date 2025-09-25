import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true, // Temporário para Railway
  },
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true, // Temporário para Railway
  },
  // Configuration for Railway
  output: 'standalone',
  experimental: {
    outputFileTracingRoot: undefined,
  },
  // Remove webpack polling for production
  webpack: (config, { dev, isServer }) => {
    // Only apply webpack watch options in development
    if (dev && !isServer) {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
      };
    }
    return config;
  },
};

export default nextConfig;
