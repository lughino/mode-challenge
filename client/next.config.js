/* eslint-disable no-undef */
// @ts-check

/** @type {import('next').NextConfig} */
module.exports = {
  pageExtensions: ['page.tsx', 'page.ts', 'page.jsx', 'page.js'],
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      // eslint-disable-next-line no-param-reassign
      config.resolve.fallback = {
        fs: false,
        path: false,
      };
    }

    return config;
  },
};
