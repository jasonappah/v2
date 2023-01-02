/**
 * @type {import('next').NextConfig}
 */
module.exports = {
  experimental: {
    appDir: true,
  },
    rewrites() {
      return {
        fallback: [
          {
            source: '/:path*',
            destination: `/api/link/?slug=:path*`,
          },
        ],
      };
    }
};
