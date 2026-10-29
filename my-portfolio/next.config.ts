import type { NextConfig } from "next";

const sections = ["experience", "skills", "education", "contact"];

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/projects", destination: "/#projects", permanent: false },
      ...sections.map((section) => ({ source: `/${section}`, destination: `/#${section}`, permanent: false })),
    ];
  },
};

export default nextConfig;
