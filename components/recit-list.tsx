import Link from "next/link";
import Image from "next/image";
import type { RecitMeta } from "@/lib/recits";
import { formatDate } from "@/lib/utils";

function Thumb({
  recit,
  className,
  sizes,
}: {
  recit: RecitMeta;
  className?: string;
  sizes: string;
}) {
  if (!recit.cover) return <div className={`${className} bg-paper-2`} />;
  return (
    <div className={`${className} relative overflow-hidden`}>
      <Image
        src={recit.cover}
        alt={recit.title}
        fill
        sizes={sizes}
        className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
      />
    </div>
  );
}

/* Une (récit en vedette) — traitement magazine. */
export function FeatureRecit({ recit }: { recit: RecitMeta }) {
  return (
    <article className="group">
      <Link href={`/recits/${recit.slug}`} className="block">
        <Thumb
          recit={recit}
          className="aspect-[16/9] w-full"
          sizes="(max-width: 1024px) 100vw, 1024px"
        />
      </Link>
      <div className="mt-7 grid gap-x-12 gap-y-5 md:grid-cols-[1fr_minmax(15rem,21rem)]">
        <div>
          <p className="kicker kicker-accent mb-3">
            À la une — {recit.location ?? recit.category}
          </p>
          <h2 className="font-display text-[2.1rem] leading-[1.05] sm:text-5xl">
            <Link
              href={`/recits/${recit.slug}`}
              className="transition-colors group-hover:text-accent"
            >
              {recit.title}
            </Link>
          </h2>
        </div>
        <div>
          <p className="lede">{recit.excerpt}</p>
          <div className="mt-5 flex items-center gap-4 text-sm text-muted">
            <span>{formatDate(recit.date)}</span>
            <span className="h-3 w-px bg-rule" />
            <span>{recit.readingMinutes} min</span>
          </div>
          <Link
            href={`/recits/${recit.slug}`}
            className="rule-link mt-5 inline-block font-display text-lg italic"
          >
            Lire le récit →
          </Link>
        </div>
      </div>
    </article>
  );
}

/* Ligne de sommaire numérotée. */
export function IndexRow({
  recit,
  index,
}: {
  recit: RecitMeta;
  index: number;
}) {
  return (
    <Link
      href={`/recits/${recit.slug}`}
      className="group grid grid-cols-1 items-start gap-5 border-t border-rule py-7 sm:grid-cols-[1fr_10rem] sm:gap-10"
    >
      <div className="flex gap-5 sm:gap-7">
        <span className="font-display text-xl tabular-nums text-accent">
          {String(index).padStart(2, "0")}
        </span>
        <div>
          <p className="kicker mb-2">
            {recit.location ?? recit.category} — {formatDate(recit.date)}
          </p>
          <h3 className="font-display text-[1.6rem] leading-tight transition-colors group-hover:text-accent sm:text-[1.75rem]">
            {recit.title}
          </h3>
          <p className="mt-2 max-w-2xl text-soft">{recit.excerpt}</p>
          <span className="mt-3 inline-block text-sm text-muted">
            {recit.readingMinutes} min de lecture
          </span>
        </div>
      </div>
      <Thumb
        recit={recit}
        className="hidden aspect-[4/3] w-40 self-center sm:block"
        sizes="160px"
      />
    </Link>
  );
}
