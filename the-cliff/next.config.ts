import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // This app lives inside a repo that has its own Next.js app at the root.
  turbopack: {
    root: path.join(__dirname),
  },
  images: {
    // Placeholder scenes are local SVGs; swap for real photos in public/images.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
  },
};

export default nextConfig;
