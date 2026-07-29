import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Pin the workspace root explicitly — unrelated lockfiles in parent
  // directories on this machine otherwise make Next.js/Turbopack infer the
  // wrong project root and break the "@/*" path alias.
  turbopack: {
    root: path.resolve(__dirname),
  },
  images: {
    // Admins can paste any hosted image URL into the CMS (hero photo, team
    // photos, gallery), plus our own /api/uploads/[id] route — so allow any
    // https host rather than maintaining an allowlist.
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
};

export default nextConfig;
