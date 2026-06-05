import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";

const CONTENT_DIR = path.join(process.cwd(), "content", "recits");

export interface Recit {
  slug: string;
  title: string;
  date: string; // ISO YYYY-MM-DD
  excerpt: string;
  category: string;
  tags: string[];
  location?: string;
  cover?: string; // chemin /public optionnel ; sinon visuel généré
  featured: boolean;
  readingMinutes: number;
  /** Corps MDX brut, rendu côté serveur. */
  content: string;
}

export type RecitMeta = Omit<Recit, "content">;

let cache: Recit[] | null = null;

function loadAll(): Recit[] {
  // En prod on met en cache ; en dev on relit pour voir les nouveaux récits.
  if (cache && process.env.NODE_ENV === "production") return cache;

  if (!fs.existsSync(CONTENT_DIR)) {
    cache = [];
    return cache;
  }

  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".mdx"));

  const recits = files.map((file): Recit => {
    const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf8");
    const { data, content } = matter(raw);
    const slug = (data.slug as string) ?? file.replace(/\.mdx$/, "");

    const minutes =
      typeof data.readingMinutes === "number"
        ? data.readingMinutes
        : Math.max(1, Math.round(readingTime(content).minutes));

    return {
      slug,
      title: data.title ?? slug,
      date: data.date ?? "1970-01-01",
      excerpt: data.excerpt ?? "",
      category: data.category ?? "Récits de pêche",
      tags: Array.isArray(data.tags) ? data.tags : [],
      location: data.location,
      cover: data.cover,
      featured: Boolean(data.featured),
      readingMinutes: minutes,
      content,
    };
  });

  recits.sort((a, b) => (a.date < b.date ? 1 : -1));
  cache = recits;
  return cache;
}

/** Tous les récits, métadonnées seules (du plus récent au plus ancien). */
export function getAllRecits(): RecitMeta[] {
  return loadAll().map(({ content: _content, ...meta }) => meta);
}

export function getRecitSlugs(): string[] {
  return loadAll().map((r) => r.slug);
}

export function getRecitBySlug(slug: string): Recit | undefined {
  return loadAll().find((r) => r.slug === slug);
}

/** Le récit mis en avant (frontmatter `featured: true`) ou le plus récent. */
export function getFeaturedRecit(): RecitMeta {
  const all = loadAll();
  const featured = all.find((r) => r.featured) ?? all[0];
  const { content: _content, ...meta } = featured;
  return meta;
}

/** Récit précédent / suivant pour la navigation en bas d'article. */
export function getAdjacentRecits(slug: string): {
  prev?: RecitMeta;
  next?: RecitMeta;
} {
  const all = getAllRecits();
  const i = all.findIndex((r) => r.slug === slug);
  return {
    next: i > 0 ? all[i - 1] : undefined, // plus récent
    prev: i >= 0 && i < all.length - 1 ? all[i + 1] : undefined, // plus ancien
  };
}

export function getAllTags(): { tag: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const r of loadAll()) {
    for (const t of r.tags) counts.set(t, (counts.get(t) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
}
