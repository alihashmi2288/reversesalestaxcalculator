import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/vat-calculator/india',
        destination: '/vat-calculator',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
