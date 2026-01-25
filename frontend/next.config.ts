// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ✅ Enables Cache Components (replaces experimental.ppr)
  cacheComponents: true,

  // ✅ Use React Compiler (stable)
  reactCompiler: true,

  // ✅ Turbopack file-system cache for faster restarts
  experimental: {
    turbopackFileSystemCacheForDev: true,
  },

  // ✅ Image optimization
  images: {
    // Remote images (production, external)
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "5000",
      },
    ],

    // Optional: allow local query-string image sources
    localPatterns: [
      {
        pathname: "/**",
      },
    ],

    // Optional security config if you optimize images from private network
    dangerouslyAllowLocalIP: true,
  },
};

export default nextConfig;
