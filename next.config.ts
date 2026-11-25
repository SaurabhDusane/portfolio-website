import type { NextConfig } from "next";

/**
 * The site is a static export everywhere (local builds, CI, Netlify, and Vercel
 * by default). The one exception: on Vercel, once ANTHROPIC_API_KEY is set,
 * the build also includes the "Ask about my work" endpoint
 * (app/api/ask/route.vercel.ts), which needs a server, so that build is a
 * regular Next.js deployment instead of an export. Pages are prerendered the
 * same way in both.
 */
const askEnabled = process.env.VERCEL === "1" && Boolean(process.env.ANTHROPIC_API_KEY);

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1", "localhost"],
  ...(askEnabled ? {} : { output: "export" as const }),
  // "*.vercel.ts" files are routes only in the Ask-enabled build.
  pageExtensions: askEnabled ? ["vercel.ts", "tsx", "ts"] : ["tsx", "ts"],
  env: { NEXT_PUBLIC_ASK_ENABLED: askEnabled ? "1" : "" },
  images: { unoptimized: true },
  experimental: {
    // Animated page transitions with React's <ViewTransition> (see app/template.tsx).
    viewTransition: true,
  },
};

export default nextConfig;
