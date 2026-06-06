import type { ReactNode } from "react";
import Image from "next/image";

/* Figure : photo en pleine largeur de colonne, ratio naturel, légende centrée. */
function Figure({
  src,
  width,
  height,
  caption,
}: {
  src?: string;
  width?: number;
  height?: number;
  caption?: string;
}) {
  return (
    <figure className="my-12">
      {src ? (
        <Image
          src={src}
          alt={caption ?? ""}
          width={width ?? 1600}
          height={height ?? 1067}
          sizes="(max-width: 768px) 100vw, 720px"
          className="h-auto w-full"
        />
      ) : null}
      {caption && (
        <figcaption className="mx-auto mt-3 max-w-xl text-center font-body text-sm italic text-muted">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

/* Citation pleine page. */
function Pull({ children }: { children: ReactNode }) {
  return (
    <p className="my-12 text-center font-display text-3xl italic leading-[1.25] sm:text-4xl">
      {children}
    </p>
  );
}

/* Séparateur en astérisme. */
function Sep() {
  return <div className="sep">✳ ✳ ✳</div>;
}

export const mdxComponents = { Figure, Pull, hr: Sep };
