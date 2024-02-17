/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'patchwiki.biligame.com',
        port: '',
        pathname: '/images/**',
      },
    ],
  },
};

export default nextConfig;
