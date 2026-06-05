import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowDown } from "lucide-react";
import { InstagramIcon } from "@/components/social-icons";
import { getAllRecits, getFeaturedRecit } from "@/lib/recits";
import { site } from "@/lib/site";
import { FeatureCard, StoryCard } from "@/components/story-card";
import { HookMark } from "@/components/hook-mark";

export default function Home() {
  const all = getAllRecits();
  const featured = all.length ? getFeaturedRecit() : null;
  const latest = all.filter((r) => r.slug !== featured?.slug).slice(0, 6);

  return (
    <>
      {/* ---------------------------- HERO ---------------------------- */}
      <section className="relative isolate flex min-h-[94svh] items-center overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/brand/global.jpg"
            alt="Pêche à la carpe de nuit sur les quais de Seine, Paris"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/25" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40" />
        </div>

        <div className="mx-auto w-full max-w-6xl px-5 pt-28 pb-16 sm:px-8">
          <div className="rise max-w-3xl">
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#e9b36b]">
              <HookMark className="h-4 w-4" />
              Récits de pêche · 100 % authentiques
            </p>

            <h1 className="mt-6 font-display text-[clamp(2.6rem,7vw,5.25rem)] font-medium leading-[0.98] tracking-tight text-white">
              À la poursuite des
              <br className="hidden sm:block" />{" "}
              <em className="italic text-[#e9b36b]">carpes sauvages.</em>
            </h1>

            <p className="mt-7 max-w-xl text-lg leading-relaxed text-white/85">
              Le carnet de bord d'un carpiste qui se livre sans concession. De la
              Seine en plein Paris aux petites rivières oubliées — des aventures
              pleines de rebondissements, racontées telles qu'elles ont été
              vécues.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link
                href="/recits"
                className="group inline-flex items-center gap-2 rounded-full bg-amber px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-amber-bright"
              >
                Lire les récits
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <a
                href={site.social.instagram}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/35 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-white hover:bg-white/10"
              >
                <InstagramIcon className="h-4 w-4" />
                Suivre sur Instagram
              </a>
            </div>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-7 mx-auto flex max-w-6xl justify-center px-8 sm:justify-start">
          <span className="flex items-center gap-2 text-xs uppercase tracking-widest text-white/70">
            <ArrowDown className="h-4 w-4 animate-bounce" />
            Faites défiler
          </span>
        </div>
      </section>

      {/* -------------------------- À LA UNE -------------------------- */}
      {featured && (
        <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
          <FeatureCard recit={featured} />
        </section>
      )}

      {/* ----------------------- DERNIERS RÉCITS ---------------------- */}
      {latest.length > 0 && (
        <section className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="flex items-end justify-between border-t border-line pt-12">
            <div>
              <p className="eyebrow">Le carnet</p>
              <h2 className="mt-3 font-display text-3xl text-paper sm:text-4xl">
                Derniers récits
              </h2>
            </div>
            <Link
              href="/recits"
              className="group hidden items-center gap-2 text-sm font-semibold text-amber sm:inline-flex"
            >
              Tout voir
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="mt-12 grid gap-x-7 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {latest.map((recit) => (
              <StoryCard key={recit.slug} recit={recit} />
            ))}
          </div>
        </section>
      )}

      {/* --------------------------- L'ESPRIT ------------------------- */}
      <section className="mx-auto mt-24 max-w-6xl px-5 sm:px-8">
        <div className="grid items-center gap-10 rounded-3xl border border-line bg-bark p-7 shadow-sm sm:p-12 md:grid-cols-[1fr_1.2fr] md:gap-14">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-line">
            <Image
              src="/recits/ma-premiere-carpe-de-seine-a-paris/cover.jpg"
              alt="Nolan avec une carpe commune sur les quais de Seine"
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover"
            />
          </div>
          <div>
            <p className="eyebrow">L'esprit Wild Carp Chaser</p>
            <h2 className="mt-4 font-display text-3xl leading-tight text-paper sm:text-4xl">
              Pas de poses, pas de records gonflés.{" "}
              <span className="text-amber">Juste l'eau, et la vérité.</span>
            </h2>
            <p className="mt-5 leading-relaxed text-mist">
              Onze mois sans le moindre départ. Des nuits à dormir sur le béton
              des quais. Des casses qui hantent. Et puis, parfois, la
              consécration. Ici, on raconte la pêche de la carpe comme elle se
              vit vraiment — l'échec, le doute, et l'adrénaline pure d'un
              moulinet qui s'affole.
            </p>
            <Link
              href="/a-propos"
              className="group mt-7 inline-flex items-center gap-2 text-sm font-semibold text-amber"
            >
              Découvrir le pêcheur
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
