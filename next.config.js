/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",

  // App router enabled (Next.js 13+)
  experimental: {
    appDir: true,
  },

  // Ensures serverless/standalone bundling is stable
  poweredByHeader: false,
  swcMinify: true,

  // Required for many hosting providers (Render, Railway, Docker)
  images: {
    unoptimized: true,
  },

  // Make build more stable
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
};

export default nextConfig;
