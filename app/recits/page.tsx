import type { Metadata } from "next";
import { getAllRecits } from "@/lib/recits";
import { StoryCard } from "@/components/story-card";

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
      <header className="grain relative overflow-hidden border-b border-line">
        <div className="mx-auto max-w-6xl px-5 pt-32 pb-14 sm:px-8 sm:pt-40">
          <p className="eyebrow">Le carnet</p>
          <h1 className="mt-4 font-display text-[clamp(2.4rem,6vw,4rem)] font-medium leading-[1.02] tracking-tight text-paper">
            Tous les récits
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-mist">
            Chaque sortie, racontée sans filtre : l'attente, les casses, le doute,
            et l'adrénaline d'un départ. Du streetfishing parisien aux rivières
            sauvages.
          </p>
          <p className="mt-6 text-sm text-ash">
            {recits.length} récit{recits.length > 1 ? "s" : ""} ·
            mis à jour régulièrement
          </p>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <div className="grid gap-x-7 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {recits.map((recit) => (
            <StoryCard key={recit.slug} recit={recit} />
          ))}
        </div>
      </section>
    </div>
  );
}
