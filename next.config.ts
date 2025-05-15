import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.karnataka.com',
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
      },
      {
        protocol: 'https',
        hostname: 'threebestrated.in',
      },
      {
        protocol: 'https',
        hostname: 'fastly.4sqi.net',
      },
      {
        protocol: 'https',
        hostname: 'www.enchanting-south-india-vacations.com',
      },
      {
        protocol: 'https',
        hostname: 'img.staticmb.com',
      },
    ],
  },
};

export default nextConfig;
