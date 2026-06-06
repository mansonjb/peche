import type { Metadata } from "next";
import Image from "next/image";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "À propos",
  description:
    "Wild Carp Chaser, c'est Nolan : un carpiste qui raconte la pêche sans concession, de la Seine parisienne aux rivières sauvages.",
  alternates: { canonical: "/a-propos" },
};

const manifeste = [
  {
    title: "100 % authentique",
    text: "Aucune mise en scène, aucun record gonflé. Ce qui est écrit, c'est ce qui s'est passé — capots compris.",
  },
  {
    title: "Pêche sauvage & street",
    text: "Du béton des quais de Seine aux petites rivières oubliées : là où les carpes sont les plus dures à tromper.",
  },
  {
    title: "L'échec comme moteur",
    text: "Onze mois sans un départ. Chaque claque a forgé une obsession : comprendre, s'adapter, recommencer.",
  },
  {
    title: "Respect du poisson",
    text: "Manipulation rapide, tapis de réception, remise à l'eau soignée. Le poisson passe toujours avant la photo.",
  },
];

export default function AProposPage() {
  return (
    <div>
      {/* en-tête + portrait */}
      <section className="mx-auto max-w-5xl px-5 pb-12 pt-16 sm:px-8 sm:pt-24">
        <div className="grid items-end gap-10 md:grid-cols-[1.4fr_1fr] md:gap-16">
          <div>
            <p className="kicker kicker-accent">L'esprit Wild Carp Chaser</p>
            <h1 className="mt-5 font-display text-[clamp(2.4rem,6.5vw,4.5rem)] font-medium leading-[1.0] tracking-tight">
              Un pêcheur qui se livre <span className="italic">sans concession</span>.
            </h1>
            <p className="lede mt-7 max-w-xl">
              Moi, c'est {site.author.name}. Wild Carp Chaser est mon carnet de
              bord : des récits de pêche à la carpe, écrits à la première
              personne, avec l'adrénaline et les doutes intacts.
            </p>
          </div>
          <div className="relative aspect-[4/5] w-full">
            <Image
              src="/recits/ma-premiere-carpe-de-seine-a-paris/cover.jpg"
              alt="Nolan, fondateur de Wild Carp Chaser, avec une carpe de Seine"
              fill
              sizes="(max-width: 768px) 100vw, 384px"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* récit perso */}
      <section className="mx-auto max-w-[680px] px-5 py-12 sm:px-8">
        <div className="article-body">
          <p>
            Tout a commencé un soir d'été sur les quais de Seine, un apéro entre
            amis et un silure aperçu sous mes pieds. Ce jour-là, la passion qui
            sommeillait s'est rallumée d'un coup. Le lendemain, je rachetais une
            canne télescopique à 25&nbsp;€ chez Décathlon. Je n'avais aucune idée
            de ce qui m'attendait.
          </p>
          <p>
            Ce qui m'attendait, c'était la pêche la plus exigeante que je
            connaisse : la carpe en plein Paris. Des berges bétonnées, un trafic
            fluvial incessant, des poissons rares et méfiants. Puis onze mois
            d'affilée sans le moindre départ — une traversée du désert qui m'a
            appris à lire l'eau et à accepter l'échec pour mieux revenir.
          </p>
          <p>
            Aujourd'hui, je partage ces histoires telles qu'elles ont été
            vécues. Pas de leçon, pas de tutoriel : juste des récits sincères,
            de la Seine aux petites rivières sauvages, pour celles et ceux qui
            vibrent comme moi au son d'un moulinet qui s'affole.
          </p>
        </div>
      </section>

      {/* manifeste */}
      <section className="mx-auto max-w-5xl px-5 pb-16 sm:px-8">
        <h2 className="border-b-2 border-ink pb-3 font-display text-2xl">
          Le manifeste
        </h2>
        <div className="grid sm:grid-cols-2 sm:gap-x-14">
          {manifeste.map((v, i) => (
            <div key={v.title} className="flex gap-5 border-t border-rule py-7">
              <span className="font-display text-lg tabular-nums text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="font-display text-xl">{v.title}</h3>
                <p className="mt-2 leading-relaxed text-soft">{v.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* contact */}
      <section className="mx-auto max-w-5xl border-t border-rule px-5 py-16 sm:px-8">
        <p className="font-display text-3xl italic sm:text-[2.5rem]">
          On se suit au bord de l'eau ?
        </p>
        <p className="mt-4 max-w-md text-soft">
          Les coulisses des sessions, les photos et les prochains récits, c'est
          par ici.
        </p>
        <div className="mt-7 flex flex-wrap gap-x-10 gap-y-3">
          <a
            href={site.social.instagram}
            target="_blank"
            rel="noreferrer"
            className="rule-link font-display text-lg italic"
          >
            {site.social.instagramHandle}
          </a>
          <a
            href={site.social.youtube}
            target="_blank"
            rel="noreferrer"
            className="rule-link font-display text-lg italic"
          >
            YouTube
          </a>
          <a
            href={`mailto:${site.author.email}`}
            className="rule-link font-display text-lg italic"
          >
            Me contacter
          </a>
        </div>
      </section>
    </div>
  );
}
