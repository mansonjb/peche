import Link from "next/link";
import Image from "next/image";
import { getAllRecits, getFeaturedRecit } from "@/lib/recits";
import { FeatureRecit, IndexRow } from "@/components/recit-list";

export default function Home() {
  const all = getAllRecits();
  const featured = all.length ? getFeaturedRecit() : null;
  const rest = all.filter((r) => r.slug !== featured?.slug);

  return (
    <>
      {/* ---------------------- OUVERTURE ---------------------- */}
      <section className="mx-auto max-w-5xl px-5 pb-14 pt-16 sm:px-8 sm:pt-24">
        <p className="kicker kicker-accent">
          Carnet de pêche à la carpe · 100&nbsp;% authentique
        </p>
        <h1 className="mt-6 font-display text-[clamp(2.9rem,8.5vw,6rem)] font-medium leading-[0.95] tracking-tight">
          À la poursuite des <span className="italic">carpes sauvages</span>.
        </h1>
        <div className="mt-9 grid gap-6 border-t border-rule pt-7 md:grid-cols-[1fr_auto] md:items-end">
          <p className="lede max-w-2xl">
            Le carnet de bord d'un carpiste qui se livre sans concession. De la
            Seine en plein Paris aux petites rivières oubliées — des aventures
            racontées telles qu'elles ont été vécues.
          </p>
          <Link
            href="/recits"
            className="rule-link whitespace-nowrap font-display text-lg italic"
          >
            Lire les récits →
          </Link>
        </div>
      </section>

      {/* ------------------------ LA UNE ----------------------- */}
      {featured && (
        <section className="mx-auto max-w-5xl px-5 pb-16 sm:px-8">
          <FeatureRecit recit={featured} />
        </section>
      )}

      {/* -------------------- PLANCHE PHOTO --------------------- */}
      <section className="my-8">
        <div className="relative aspect-[16/10] w-full sm:aspect-[5/2]">
          <Image
            src="/brand/global.jpg"
            alt="Pêche de nuit sur les quais de Seine, Paris"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <p className="mx-auto mt-3 max-w-5xl px-5 text-sm italic text-muted sm:px-8">
          Nuit blanche sur les quais de Seine — là où tout a commencé.
        </p>
      </section>

      {/* ------------------------ SOMMAIRE --------------------- */}
      {rest.length > 0 && (
        <section className="mx-auto max-w-5xl px-5 pb-8 pt-12 sm:px-8">
          <div className="flex items-baseline justify-between border-b-2 border-ink pb-3">
            <h2 className="font-display text-2xl">Le carnet</h2>
            <span className="kicker text-muted">
              {all.length} récits
            </span>
          </div>
          <div>
            {rest.map((recit, i) => (
              <IndexRow key={recit.slug} recit={recit} index={i + 1} />
            ))}
          </div>
        </section>
      )}

      {/* ------------------------ L'ESPRIT --------------------- */}
      <section className="mx-auto max-w-5xl px-5 py-20 sm:px-8">
        <div className="grid items-center gap-10 border-t border-rule pt-16 md:grid-cols-2 md:gap-16">
          <div className="relative aspect-[4/3] w-full overflow-hidden">
            <Image
              src="/recits/echec-dans-la-peche-de-la-carpe/cover.jpg"
              alt="Les quais de Seine au crépuscule, près du Pont-Neuf"
              fill
              sizes="(max-width: 768px) 100vw, 45vw"
              className="object-cover"
            />
          </div>
          <div>
            <p className="kicker kicker-accent">L'esprit Wild Carp Chaser</p>
            <p className="mt-5 font-display text-3xl italic leading-[1.2] sm:text-[2.5rem]">
              Pas de poses, pas de records gonflés. Juste l'eau, et la vérité.
            </p>
            <p className="mt-6 leading-relaxed text-soft">
              Onze mois sans le moindre départ. Des nuits à dormir sur le béton
              des quais. Des casses qui hantent. Et puis, parfois, la
              consécration. Ici, on raconte la pêche de la carpe comme elle se
              vit vraiment.
            </p>
            <Link
              href="/a-propos"
              className="rule-link mt-7 inline-block font-display text-lg italic"
            >
              Découvrir le pêcheur →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
