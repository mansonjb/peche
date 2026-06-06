"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { HookMark } from "@/components/hook-mark";

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-rule bg-paper/95 backdrop-blur-[2px]">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-1.5 px-5 py-2.5 sm:h-16 sm:flex-row sm:justify-between sm:gap-0 sm:px-8 sm:py-0">
        <Link href="/" className="flex items-center gap-2">
          <HookMark className="h-[17px] w-[17px] text-accent" />
          <span className="whitespace-nowrap font-display text-base tracking-tight sm:text-lg">
            Wild Carp Chaser
          </span>
        </Link>

        <nav className="flex items-center gap-5 sm:gap-7">
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
                  "kicker whitespace-nowrap text-[0.66rem] transition-colors hover:text-ink sm:text-xs",
                  active
                    ? "text-ink underline decoration-accent decoration-1 underline-offset-[6px]"
                    : "text-soft"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
