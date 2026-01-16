/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",

  // Required for many hosting providers (Render, Railway, Docker)
  images: {
    unoptimized: true,
  },

  // Make build more stable
  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
