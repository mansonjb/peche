import type { MetadataRoute } from "next";
import { getAllRecits } from "@/lib/recits";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const recits = getAllRecits().map((r) => ({
    url: `${site.url}/recits/${r.slug}`,
    lastModified: new Date(r.date),
    changeFrequency: "yearly" as const,
    priority: 0.8,
  }));

  const routes = ["", "/recits", "/a-propos"].map((path) => ({
    url: `${site.url}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  return [...routes, ...recits];
}
