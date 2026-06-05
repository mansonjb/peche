import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Le dossier parent contient d'autres lockfiles : on fixe la racine ici.
  turbopack: {
    root: import.meta.dirname,
  },
  images: {
    // AVIF d'abord pour des photos de pêche légères et nettes
    formats: ["image/avif", "image/webp"],
  },
  // Récits 100 % statiques → chargement instantané et SEO solide
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
};

export default nextConfig;
