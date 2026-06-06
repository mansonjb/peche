import Link from "next/link";
import { site } from "@/lib/site";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-28 border-t border-rule">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <div className="grid gap-10 py-14 md:grid-cols-[1.6fr_1fr_1fr]">
          <div>
            <Link href="/" className="font-display text-2xl tracking-tight">
              Wild Carp Chaser
            </Link>
            <p className="mt-4 max-w-xs text-soft">
              Récits de pêche à la carpe, 100&nbsp;% authentiques. De la Seine en
              plein Paris aux rivières sauvages — sans concession.
            </p>
          </div>

          <div>
            <p className="kicker mb-5">Le carnet</p>
            <ul className="space-y-2.5">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="rule-link text-soft">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="kicker mb-5">Suivre</p>
            <ul className="space-y-2.5">
              <li>
                <a href={site.social.instagram} target="_blank" rel="noreferrer" className="rule-link text-soft">
                  Instagram
                </a>
              </li>
              <li>
                <a href={site.social.youtube} target="_blank" rel="noreferrer" className="rule-link text-soft">
                  YouTube
                </a>
              </li>
              <li>
                <a href={`mailto:${site.author.email}`} className="rule-link text-soft">
                  Écrire à {site.author.name}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-rule py-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {site.name}</p>
          <p className="font-display italic">Écrit au bord de l'eau.</p>
        </div>
      </div>
    </footer>
  );
}
