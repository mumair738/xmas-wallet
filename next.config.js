/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  experimental: {
    appDir: true,
  },
  // Avoid static export of /page (SSR fallback)
  generateStaticParams: async () => [],
};

export default nextConfig;