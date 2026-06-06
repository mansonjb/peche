import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import {
  getRecitBySlug,
  getRecitSlugs,
  getAdjacentRecits,
} from "@/lib/recits";
import { mdxComponents } from "@/components/mdx";
import { site } from "@/lib/site";
import { formatDate } from "@/lib/utils";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getRecitSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const recit = getRecitBySlug(slug);
  if (!recit) return {};
  return {
    title: recit.title,
    description: recit.excerpt,
    alternates: { canonical: `/recits/${slug}` },
    openGraph: {
      type: "article",
      title: recit.title,
      description: recit.excerpt,
      publishedTime: recit.date,
      authors: [site.author.name],
      url: `/recits/${slug}`,
      images: recit.cover ? [recit.cover] : undefined,
    },
  };
}

export default async function RecitPage({ params }: Params) {
  const { slug } = await params;
  const recit = getRecitBySlug(slug);
  if (!recit) notFound();

  const { prev, next } = getAdjacentRecits(slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: recit.title,
    description: recit.excerpt,
    datePublished: recit.date,
    image: recit.cover ? `${site.url}${recit.cover}` : undefined,
    author: { "@type": "Person", name: site.author.name },
    publisher: { "@type": "Organization", name: site.name },
    keywords: recit.tags.join(", "),
    mainEntityOfPage: `${site.url}/recits/${slug}`,
  };

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ----------------------- EN-TÊTE ----------------------- */}
      <header className="mx-auto max-w-3xl px-5 pt-14 sm:px-8 sm:pt-20">
        <Link
          href="/recits"
          className="kicker text-muted transition-colors hover:text-ink"
        >
          ← Le carnet
        </Link>

        <p className="kicker kicker-accent mt-9">{recit.category}</p>
        <h1 className="mt-4 font-display text-[clamp(2.1rem,6vw,4rem)] font-medium leading-[1.02] tracking-tight">
          {recit.title}
        </h1>
        <p className="lede mt-6">{recit.excerpt}</p>
        <p className="mt-7 text-sm text-muted">
          Par {site.author.name} — {formatDate(recit.date)} —{" "}
          {recit.readingMinutes} min
          {recit.location ? ` — ${recit.location}` : ""}
        </p>
      </header>

      {/* ----------------------- PHOTO ------------------------ */}
      {recit.cover && (
        <figure className="mx-auto mt-10 max-w-4xl px-5 sm:px-8">
          <div className="relative aspect-[16/9] w-full overflow-hidden">
            <Image
              src={recit.cover}
              alt={recit.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 896px"
              className="object-cover"
            />
          </div>
        </figure>
      )}

      {/* ------------------------ CORPS ------------------------ */}
      <div className="mx-auto max-w-[680px] px-5 py-12 sm:px-8">
        <div className="article-body">
          <MDXRemote
            source={recit.content}
            components={mdxComponents}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
                rehypePlugins: [rehypeSlug],
              },
            }}
          />
        </div>

        {recit.tags.length > 0 && (
          <p className="kicker mt-12 border-t border-rule pt-6 text-muted">
            Classé sous — {recit.tags.join(", ")}
          </p>
        )}

        <div className="mt-8 border-t border-rule pt-6">
          <p className="font-display text-xl italic">
            Écrit par {site.author.name}, au bord de l'eau.
          </p>
          <p className="mt-2 text-soft">
            Aimé ce récit ?{" "}
            <a
              href={site.social.instagram}
              target="_blank"
              rel="noreferrer"
              className="rule-link"
            >
              Instagram
            </a>{" "}
            ·{" "}
            <a href={`mailto:${site.author.email}`} className="rule-link">
              écris-moi
            </a>
            .
          </p>
        </div>
      </div>

      {/* --------------------- PRÉC. / SUIV. ------------------- */}
      {(prev || next) && (
        <nav className="mx-auto max-w-5xl px-5 pb-6 sm:px-8">
          <div className="grid border-t border-rule sm:grid-cols-2">
            {prev ? (
              <Link
                href={`/recits/${prev.slug}`}
                className="group border-b border-rule py-7 sm:border-b-0 sm:border-r sm:pr-8"
              >
                <span className="kicker text-muted">← Récit précédent</span>
                <p className="mt-2 font-display text-xl transition-colors group-hover:text-accent">
                  {prev.title}
                </p>
              </Link>
            ) : (
              <span />
            )}
            {next && (
              <Link
                href={`/recits/${next.slug}`}
                className="group py-7 sm:pl-8 sm:text-right"
              >
                <span className="kicker text-muted">Récit suivant →</span>
                <p className="mt-2 font-display text-xl transition-colors group-hover:text-accent">
                  {next.title}
                </p>
              </Link>
            )}
          </div>
        </nav>
      )}
    </article>
  );
}
