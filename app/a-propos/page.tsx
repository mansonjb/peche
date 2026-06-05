import type { Metadata } from "next";
import Link from "next/link";
import { Mail, Waves, Repeat, Heart, Fish } from "lucide-react";
import { InstagramIcon, YoutubeIcon } from "@/components/social-icons";
import { site } from "@/lib/site";
import Image from "next/image";

export const metadata: Metadata = {
  title: "À propos",
  description:
    "Wild Carp Chaser, c'est Nolan : un carpiste qui raconte la pêche sans concession, de la Seine parisienne aux rivières sauvages.",
  alternates: { canonical: "/a-propos" },
};

const valeurs = [
  {
    icon: Fish,
    title: "100 % authentique",
    text: "Aucune mise en scène, aucun record gonflé. Ce qui est écrit, c'est ce qui s'est passé — capots compris.",
  },
  {
    icon: Waves,
    title: "Pêche sauvage & street",
    text: "Du béton des quais de Seine aux petites rivières oubliées : là où les carpes sont les plus dures à tromper.",
  },
  {
    icon: Repeat,
    title: "L'échec comme moteur",
    text: "Onze mois sans un départ. Chaque claque a forgé une obsession : comprendre, s'adapter, recommencer.",
  },
  {
    icon: Heart,
    title: "Respect du poisson",
    text: "Manipulation rapide, tapis de réception, remise à l'eau soignée. Le poisson passe toujours avant la photo.",
  },
];

export default function AProposPage() {
  return (
    <div>
      {/* en-tête + portrait */}
      <header className="grain relative overflow-hidden border-b border-line">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 pt-32 pb-16 sm:px-8 sm:pt-40 md:grid-cols-[1.3fr_1fr] md:gap-14">
          <div>
            <p className="eyebrow">L'esprit Wild Carp Chaser</p>
            <h1 className="mt-4 font-display text-[clamp(2.3rem,5.5vw,3.75rem)] font-medium leading-[1.03] tracking-tight text-paper">
              Un pêcheur qui se livre{" "}
              <span className="text-amber">sans concession.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-paper/80">
              Moi, c'est {site.author.name}. Wild Carp Chaser est mon carnet de
              bord : des récits de pêche à la carpe, écrits à la première
              personne, avec l'adrénaline, les doutes et les rebondissements
              intacts.
            </p>
          </div>
          <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-2xl border border-line shadow-sm">
            <Image
              src="/recits/ma-premiere-carpe-de-seine-a-paris/cover.jpg"
              alt="Nolan, fondateur de Wild Carp Chaser, avec une carpe de Seine"
              fill
              sizes="(max-width: 768px) 100vw, 384px"
              className="object-cover"
            />
          </div>
        </div>
      </header>

      {/* récit perso */}
      <section className="mx-auto max-w-[680px] px-5 py-16">
        <div className="article-body">
          <p>
            Tout a commencé un soir d'été sur les quais de Seine, un apéro entre
            amis et un silure aperçu sous mes pieds. Ce jour-là, la passion qui
            sommeillait s'est rallumée d'un coup. Le lendemain, je rachetais une
            canne télescopique à 25 € chez Décathlon. Je n'avais aucune idée de
            ce qui m'attendait.
          </p>
          <p>
            Ce qui m'attendait, c'était la pêche la plus exigeante que je
            connaisse : la carpe en plein Paris. Des berges bétonnées, un trafic
            fluvial incessant, des poissons rares et méfiants. Puis onze mois
            d'affilée sans le moindre départ — une traversée du désert qui m'a
            appris à réfléchir avant de foncer, à lire l'eau, à accepter
            l'échec pour mieux revenir.
          </p>
          <p>
            Aujourd'hui, je partage ces histoires telles qu'elles ont été
            vécues. Pas de leçon, pas de tutoriel : juste des récits sincères,
            de la Seine aux petites rivières sauvages, pour celles et ceux qui
            vibrent comme moi au son d'un moulinet qui s'affole.
          </p>
        </div>
      </section>

      {/* valeurs */}
      <section className="mx-auto max-w-6xl px-5 pb-8 sm:px-8">
        <div className="grid gap-5 sm:grid-cols-2">
          {valeurs.map((v) => (
            <div
              key={v.title}
              className="rounded-2xl border border-line bg-bark p-7"
            >
              <v.icon className="h-7 w-7 text-amber" />
              <h2 className="mt-4 font-display text-xl text-paper">{v.title}</h2>
              <p className="mt-2 leading-relaxed text-mist">{v.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA suivre */}
      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <div className="grain relative overflow-hidden rounded-3xl border border-line bg-bark p-8 text-center sm:p-14">
          <h2 className="font-display text-3xl text-paper sm:text-4xl">
            On se suit au bord de l'eau ?
          </h2>
          <p className="mx-auto mt-4 max-w-md text-mist">
            Les coulisses des sessions, les photos et les prochains récits, c'est
            par ici.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href={site.social.instagram}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-amber px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-amber-bright"
            >
              <InstagramIcon className="h-4 w-4" /> {site.social.instagramHandle}
            </a>
            <a
              href={site.social.youtube}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 text-sm font-semibold text-paper transition-colors hover:border-amber/60 hover:text-amber"
            >
              <YoutubeIcon className="h-4 w-4" /> YouTube
            </a>
            <a
              href={`mailto:${site.author.email}`}
              className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 text-sm font-semibold text-paper transition-colors hover:border-amber/60 hover:text-amber"
            >
              <Mail className="h-4 w-4" /> Me contacter
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
