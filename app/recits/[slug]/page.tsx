import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  Calendar,
  MapPin,
  Mail,
} from "lucide-react";
import { InstagramIcon } from "@/components/social-icons";
import {
  getRecitBySlug,
  getRecitSlugs,
  getAdjacentRecits,
} from "@/lib/recits";
import { mdxComponents } from "@/components/mdx";
import { CoverArt } from "@/components/cover-art";
import { HookMark } from "@/components/hook-mark";
import { ReadingProgress } from "@/components/reading-progress";
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
      <ReadingProgress />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ----------------------- EN-TÊTE PHOTO ----------------------- */}
      <header className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          {recit.cover ? (
            <Image
              src={recit.cover}
              alt={recit.title}
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
          ) : (
            <CoverArt seed={recit.slug} />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/60 to-black/55" />
        </div>

        <div className="mx-auto max-w-3xl px-5 pt-32 pb-16 sm:pt-40">
          <Link
            href="/recits"
            className="group inline-flex items-center gap-2 text-sm text-white/80 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Tous les récits
          </Link>

          <p className="mt-8 text-xs font-semibold uppercase tracking-[0.22em] text-[#e9b36b]">
            {recit.category}
          </p>
          <h1 className="mt-4 font-display text-[clamp(2rem,5.5vw,3.5rem)] font-medium leading-[1.04] tracking-tight text-white">
            {recit.title}
          </h1>

          <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/85">
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-4 w-4 text-[#e9b36b]" />
              {formatDate(recit.date)}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-[#e9b36b]" />
              {recit.readingMinutes} min de lecture
            </span>
            {recit.location && (
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-[#e9b36b]" />
                {recit.location}
              </span>
            )}
          </div>
        </div>
      </header>

      {/* ------------------------ CORPS ------------------------ */}
      <div className="mx-auto max-w-[680px] px-5 py-14">
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

        {/* tags */}
        {recit.tags.length > 0 && (
          <div className="mt-12 flex flex-wrap gap-2 border-t border-line pt-8">
            {recit.tags.map((t) => (
              <span
                key={t}
                className="rounded-full border border-line bg-bark px-3 py-1 text-xs text-mist"
              >
                #{t}
              </span>
            ))}
          </div>
        )}

        {/* signature auteur */}
        <div className="mt-10 flex flex-col gap-4 rounded-2xl border border-line bg-bark p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <span className="flex h-12 w-12 items-center justify-center rounded-full border border-amber/40 bg-bark-2">
              <HookMark className="h-6 w-6 text-amber" />
            </span>
            <div>
              <p className="font-display text-lg text-paper">
                Écrit par {site.author.name}
              </p>
              <p className="text-sm text-mist">
                Aimé ce récit ? Écris-moi, ça fait toujours plaisir.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a
              href={site.social.instagram}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-mist transition-colors hover:border-amber/60 hover:text-amber"
            >
              <InstagramIcon className="h-[18px] w-[18px]" />
            </a>
            <a
              href={`mailto:${site.author.email}`}
              aria-label="Email"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-mist transition-colors hover:border-amber/60 hover:text-amber"
            >
              <Mail className="h-[18px] w-[18px]" />
            </a>
          </div>
        </div>
      </div>

      {/* --------------------- PRÉC. / SUIV. ------------------- */}
      {(prev || next) && (
        <nav className="mx-auto max-w-6xl px-5 pb-4 sm:px-8">
          <div className="grid gap-4 border-t border-line pt-10 sm:grid-cols-2">
            {prev ? (
              <Link
                href={`/recits/${prev.slug}`}
                className="group rounded-2xl border border-line bg-bark p-6 shadow-sm transition-colors hover:border-amber/40"
              >
                <span className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-mist">
                  <ArrowLeft className="h-3.5 w-3.5" /> Récit précédent
                </span>
                <p className="mt-2 font-display text-lg text-paper transition-colors group-hover:text-amber">
                  {prev.title}
                </p>
              </Link>
            ) : (
              <span />
            )}
            {next && (
              <Link
                href={`/recits/${next.slug}`}
                className="group rounded-2xl border border-line bg-bark p-6 text-right shadow-sm transition-colors hover:border-amber/40"
              >
                <span className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-mist">
                  Récit suivant <ArrowRight className="h-3.5 w-3.5" />
                </span>
                <p className="mt-2 font-display text-lg text-paper transition-colors group-hover:text-amber">
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
