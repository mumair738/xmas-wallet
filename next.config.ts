import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },

  // Enable SWC minify (faster builds)
  swcMinify: true,

  // Experimental features (safe)
  experimental: {
    optimizePackageImports: ["react", "react-dom"],
  },

  // TypeScript settings
  typescript: {
    ignoreBuildErrors: false,
  },

  // ESLint settings
  eslint: {
    ignoreDuringBuilds: false,
  },
};

export default nextConfig;
