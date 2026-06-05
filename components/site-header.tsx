"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { InstagramIcon, YoutubeIcon } from "@/components/social-icons";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { HookMark } from "@/components/hook-mark";

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const isHome = pathname === "/";
  // `solid` = barre claire (texte foncé). Sinon transparent par-dessus le hero (texte clair).
  const solid = scrolled || !isHome || open;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        solid
          ? "border-b border-line/80 bg-night/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:h-[72px] sm:px-8">
        <Link
          href="/"
          className="group flex items-center gap-2.5"
          aria-label={`${site.name} — accueil`}
        >
          <HookMark
            className={cn(
              "h-6 w-6 transition-transform duration-500 group-hover:-rotate-12",
              solid ? "text-amber" : "text-white"
            )}
          />
          <span
            className={cn(
              "font-display text-[15px] font-semibold uppercase tracking-[0.2em]",
              solid ? "text-paper" : "text-white"
            )}
          >
            Wild Carp Chaser
          </span>
        </Link>

        {/* Nav bureau */}
        <nav className="hidden items-center gap-9 md:flex">
          {site.nav.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "link-underline text-sm font-medium transition-colors",
                  active
                    ? "text-amber"
                    : solid
                      ? "text-paper/80 hover:text-paper"
                      : "text-white/85 hover:text-white"
                )}
              >
                {item.label}
              </Link>
            );
          })}
          <span className={cn("h-5 w-px", solid ? "bg-line" : "bg-white/30")} />
          <div
            className={cn(
              "flex items-center gap-3.5",
              solid ? "text-paper/70" : "text-white/80"
            )}
          >
            <a
              href={site.social.instagram}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="transition-colors hover:text-amber"
            >
              <InstagramIcon className="h-[18px] w-[18px]" />
            </a>
            <a
              href={site.social.youtube}
              target="_blank"
              rel="noreferrer"
              aria-label="YouTube"
              className="transition-colors hover:text-amber"
            >
              <YoutubeIcon className="h-[18px] w-[18px]" />
            </a>
          </div>
        </nav>

        {/* Bouton menu mobile */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className={cn(
            "inline-flex items-center justify-center rounded-md p-1.5 md:hidden",
            solid ? "text-paper" : "text-white"
          )}
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={open}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Menu mobile */}
      {open && (
        <div className="border-t border-line bg-night md:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col px-5 py-3">
            {site.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="border-b border-line/60 py-3.5 font-display text-lg text-paper last:border-0"
              >
                {item.label}
              </Link>
            ))}
            <div className="flex items-center gap-5 pt-4 text-paper/80">
              <a href={site.social.instagram} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm">
                <InstagramIcon className="h-5 w-5" /> Instagram
              </a>
              <a href={site.social.youtube} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm">
                <YoutubeIcon className="h-5 w-5" /> YouTube
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
