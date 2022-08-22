/**
 * @type {import('next').NextConfig}
 */
module.exports = {
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
