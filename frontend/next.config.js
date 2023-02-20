const withSvgr = require('next-plugin-svgr');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: { domains: ['lh3.googleusercontent.com'] },
  experimental: {
    appDir: true,
  },
};

module.exports = withSvgr({
  ...nextConfig,
  svgrOptions: {
    dimensions: false,
    icon: 24,
  },
});
