/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  images: {
    domains: [],
  },
  // Enable static exports for Vercel deployment
  output: 'standalone',
}

module.exports = nextConfig