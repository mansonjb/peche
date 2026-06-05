import type { ReactNode } from "react";
import Image from "next/image";
import { CoverArt } from "@/components/cover-art";

/* Figure éditoriale : vraie photo (ratio naturel, sans recadrage) + légende.
 * Repli sur un visuel généré si aucune `src`. */
function Figure({
  src,
  width,
  height,
  caption,
  seed = "figure",
}: {
  src?: string;
  width?: number;
  height?: number;
  caption?: string;
  seed?: string;
}) {
  return (
    <figure className="my-10">
      {src ? (
        <Image
          src={src}
          alt={caption ?? ""}
          width={width ?? 1600}
          height={height ?? 1067}
          sizes="(max-width: 768px) 100vw, 680px"
          className="h-auto w-full rounded-xl border border-line bg-bark-2"
        />
      ) : (
        <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-line bg-bark-2">
          <CoverArt seed={seed} />
        </div>
      )}
      {caption && (
        <figcaption className="mt-3 flex gap-2.5 text-sm text-mist">
          <span className="mt-[2px] h-4 w-[2px] shrink-0 bg-amber/70" />
          <span className="italic">{caption}</span>
        </figcaption>
      )}
    </figure>
  );
}

/* Citation mise en avant. */
function Pull({ children }: { children: ReactNode }) {
  return (
    <p className="my-10 font-display text-2xl italic leading-snug text-paper sm:text-3xl">
      {children}
    </p>
  );
}

export const mdxComponents = { Figure, Pull };
