import type { NextConfig } from "next";

const backendUrl = process.env.BACKEND_API_URL
  ? new URL(process.env.BACKEND_API_URL)
  : new URL("http://127.0.0.1/apisbackend/index.php/api");
const backendBasePath = backendUrl.pathname
  .replace(/\/index\.php\/api\/?$/, "")
  .replace(/\/api\/?$/, "");

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com"
      },
      {
        protocol: backendUrl.protocol.replace(":", "") as "http" | "https",
        hostname: backendUrl.hostname,
        port: backendUrl.port,
        pathname: `${backendBasePath}/uploads/**`
      },
      {
        protocol: "https",
        hostname: "apis.saveearthplumbing.com",
        pathname: "/uploads/**"
      }
    ]
  }
};

export default nextConfig;
