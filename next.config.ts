import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['images.unsplash.com'],
  },
  // Add this for i18n
  trailingSlash: false,
  
  // Remove any existing i18n config if present
};

export default nextConfig;
