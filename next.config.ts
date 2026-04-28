import type { NextConfig } from 'next';

const longTermCacheHeaders = [
  {
    key: 'Cache-Control',
    value: 'public, max-age=31536000, immutable',
  },
];

const nextConfig: NextConfig = {
  turbopack: {},
  compress: true,
  poweredByHeader: false,
  experimental: {
    serverActions: {
      bodySizeLimit: '8mb',
    },
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  async headers() {
    return [
      { source: '/images/:path*', headers: longTermCacheHeaders },
      { source: '/generated/:path*', headers: longTermCacheHeaders },
      { source: '/previews/:path*', headers: longTermCacheHeaders },
      { source: '/lottie/:path*', headers: longTermCacheHeaders },
      { source: '/videos/:path*', headers: longTermCacheHeaders },
    ];
  },
};

export default nextConfig;
