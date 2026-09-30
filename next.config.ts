import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: ["http://localhost:3000", "http://localhost:3001"],
  images: { unoptimized: true },

  
};

export default nextConfig;
