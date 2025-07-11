import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // 모든 호스트 허용 (개발 단계에서만 사용)
      },
    ],
  },
};

export default nextConfig;
