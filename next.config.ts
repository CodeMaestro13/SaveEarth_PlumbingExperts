import type { NextConfig } from "next";

function getAllowedOrigins() {
  return [
    process.env.NEXT_PUBLIC_SITE_URL,
    process.env.SITE_URL,
    process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined,
    process.env.ADMIN_ALLOWED_ORIGINS
  ]
    .filter(Boolean)
    .flatMap((value) => String(value).split(","))
    .map((value) => value.trim().replace(/^https?:\/\//, "").replace(/\/$/, ""))
    .filter(Boolean);
}

const allowedOrigins = getAllowedOrigins();

const nextConfig: NextConfig = {
  experimental: allowedOrigins.length
    ? {
        serverActions: {
          allowedOrigins
        }
      }
    : undefined,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com"
      }
    ]
  }
};

export default nextConfig;
