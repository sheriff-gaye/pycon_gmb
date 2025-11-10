/** @type {import('next').NextConfig} */
const nextConfig = {
  
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.codearmo.com",
        pathname: "/**",
      },
      
    ],
  },
  trailingSlash: false,
};

export default nextConfig;