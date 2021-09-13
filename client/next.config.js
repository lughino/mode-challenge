/** @type {import('next').NextConfig} */
// eslint-disable-next-line no-undef
module.exports = {
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
