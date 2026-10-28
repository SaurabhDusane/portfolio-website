import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1", "localhost"],
  output: "export",
  images: { unoptimized: true },
  experimental: {
    // Animated page transitions with React's <ViewTransition> (see app/template.tsx).
    viewTransition: true,
  },
};

export default nextConfig;
