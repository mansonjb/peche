import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock } from "lucide-react";
import type { RecitMeta } from "@/lib/recits";
import { CoverArt } from "@/components/cover-art";
import { formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";

function Cover({ recit, className }: { recit: RecitMeta; className?: string }) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border border-line bg-bark",
        className
      )}
    >
      {recit.cover ? (
        <Image
          src={recit.cover}
          alt={recit.title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        />
      ) : (
        <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-[1.04]">
          <CoverArt seed={recit.slug} />
        </div>
      )}
      <span className="absolute left-3 top-3 rounded-full border border-white/20 bg-black/45 px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-white backdrop-blur">
        {recit.location ?? recit.category}
      </span>
    </div>
  );
}

function Meta({ recit }: { recit: RecitMeta }) {
  return (
    <div className="flex items-center gap-3 text-xs text-mist">
      <time dateTime={recit.date}>{formatDate(recit.date)}</time>
      <span className="h-1 w-1 rounded-full bg-ash" />
      <span className="inline-flex items-center gap-1">
        <Clock className="h-3.5 w-3.5" />
        {recit.readingMinutes} min
      </span>
    </div>
  );
}

/** Carte standard pour les grilles. */
export function StoryCard({ recit }: { recit: RecitMeta }) {
  return (
    <article className="group">
      <Link href={`/recits/${recit.slug}`} className="block">
        <Cover recit={recit} className="aspect-[3/2]" />
        <div className="mt-4">
          <Meta recit={recit} />
          <h3 className="mt-2 font-display text-xl leading-snug text-paper transition-colors group-hover:text-amber">
            {recit.title}
          </h3>
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-mist">
            {recit.excerpt}
          </p>
        </div>
      </Link>
    </article>
  );
}

/** Carte "à la une", format horizontal sur grand écran. */
export function FeatureCard({ recit }: { recit: RecitMeta }) {
  return (
    <article className="group grid items-center gap-7 md:grid-cols-2 md:gap-12">
      <Link
        href={`/recits/${recit.slug}`}
        className="order-1 block md:order-none"
      >
        <Cover recit={recit} className="aspect-[4/3]" />
      </Link>
      <div>
        <p className="eyebrow">À la une · {recit.location ?? recit.category}</p>
        <h2 className="mt-4 font-display text-3xl leading-[1.08] text-paper sm:text-4xl lg:text-[2.75rem]">
          <Link
            href={`/recits/${recit.slug}`}
            className="transition-colors hover:text-amber"
          >
            {recit.title}
          </Link>
        </h2>
        <p className="mt-4 max-w-prose text-pretty leading-relaxed text-mist">
          {recit.excerpt}
        </p>
        <div className="mt-5">
          <Meta recit={recit} />
        </div>
        <Link
          href={`/recits/${recit.slug}`}
          className="group/btn mt-7 inline-flex items-center gap-2 text-sm font-semibold text-amber"
        >
          Lire le récit
          <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
        </Link>
      </div>
    </article>
  );
}
