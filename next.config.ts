import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'nkitworlglmmbbmvwawf.supabase.co',
        pathname: '/storage/v1/object/public/images/**', // ensure this is the correct path
      },
    ],
  },
};

export default nextConfig;
