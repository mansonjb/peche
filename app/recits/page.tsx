import type { Metadata } from "next";
import { getAllRecits } from "@/lib/recits";
import { IndexRow } from "@/components/recit-list";

export const metadata: Metadata = {
  title: "Récits",
  description:
    "Tous les récits de pêche à la carpe de Wild Carp Chaser — Seine parisienne, petites rivières sauvages, échecs et consécrations.",
  alternates: { canonical: "/recits" },
};

export default function RecitsPage() {
  const recits = getAllRecits();

  return (
    <div>
      <section className="mx-auto max-w-5xl px-5 pb-10 pt-16 sm:px-8 sm:pt-24">
        <p className="kicker kicker-accent">Le carnet</p>
        <h1 className="mt-5 font-display text-[clamp(2.6rem,7vw,4.5rem)] font-medium leading-[0.98] tracking-tight">
          Tous les récits
        </h1>
        <p className="lede mt-7 max-w-2xl">
          Chaque sortie, racontée sans filtre : l'attente, les casses, le doute
          et l'adrénaline d'un départ. Du streetfishing parisien aux rivières
          sauvages.
        </p>
      </section>

      <section className="mx-auto max-w-5xl px-5 pb-16 sm:px-8">
        <div className="flex items-baseline justify-between border-b-2 border-ink pb-3">
          <span className="kicker text-muted">
            {recits.length} récit{recits.length > 1 ? "s" : ""}
          </span>
          <span className="kicker text-muted">Mis à jour régulièrement</span>
        </div>
        {recits.map((recit, i) => (
          <IndexRow key={recit.slug} recit={recit} index={i + 1} />
        ))}
      </section>
    </div>
  );
}
