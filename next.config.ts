import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Quality values used by next/image across the site (Next 16 requires
    // non-default qualities to be declared)
    qualities: [75, 85, 90],
  },
};

export default nextConfig;
