import Link from "next/link";
import { Mail, ArrowUpRight } from "lucide-react";
import { InstagramIcon, YoutubeIcon } from "@/components/social-icons";
import { site } from "@/lib/site";
import { HookMark } from "@/components/hook-mark";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-24 overflow-hidden border-t border-line bg-bark">
      <div className="grain pointer-events-none absolute inset-0" />
      <div className="relative mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          {/* Marque */}
          <div>
            <Link href="/" className="flex items-center gap-2.5">
              <HookMark className="h-6 w-6 text-amber" />
              <span className="font-display text-base font-semibold uppercase tracking-[0.2em]">
                Wild Carp Chaser
              </span>
            </Link>
            <p className="mt-5 max-w-sm text-pretty text-mist">
              Des récits de pêche à la carpe, 100 % authentiques. De la Seine en
              plein Paris aux rivières sauvages — sans concession.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="eyebrow mb-4">Explorer</h3>
            <ul className="space-y-3">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="link-underline text-paper/85 hover:text-paper"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Suivre */}
          <div>
            <h3 className="eyebrow mb-4">Suivre l'aventure</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href={site.social.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-2 text-paper/85 hover:text-paper"
                >
                  <InstagramIcon className="h-[18px] w-[18px] text-amber" />
                  Instagram
                  <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition group-hover:opacity-100" />
                </a>
              </li>
              <li>
                <a
                  href={site.social.youtube}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-2 text-paper/85 hover:text-paper"
                >
                  <YoutubeIcon className="h-[18px] w-[18px] text-amber" />
                  YouTube
                  <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition group-hover:opacity-100" />
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.author.email}`}
                  className="group inline-flex items-center gap-2 text-paper/85 hover:text-paper"
                >
                  <Mail className="h-[18px] w-[18px] text-amber" />
                  Écrire à {site.author.name}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-3 border-t border-line pt-6 text-sm text-ash sm:flex-row sm:items-center">
          <p>
            © {year} {site.name}. Tous droits réservés.
          </p>
          <p className="italic">Écrit avec passion, au bord de l'eau.</p>
        </div>
      </div>
    </footer>
  );
}
