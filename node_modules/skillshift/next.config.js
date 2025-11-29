/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: '',
  assetPrefix: '',
  distDir: '.next',
  experimental: {
    typedRoutes: true,
  },
};

module.exports = nextConfig;
