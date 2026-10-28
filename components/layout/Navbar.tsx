"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Logo from "@/components/brand/Logo";
import CartButton from "@/components/cart/CartButton";
import { useCart } from "@/components/cart/CartProvider";
import { dictionaries } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const { lang, open } = useCart();
  const t = dictionaries[lang].nav;
  const pathname = usePathname();
  const otherLang = lang === "ar" ? "en" : "ar";
  const switchHref = pathname.replace(/^\/(ar|en)(?=\/|$)/, `/${otherLang}`);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Publish the header's real height (taller on phones, with the extra link row) so sticky bars sit just below it.
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    const update = () => document.documentElement.style.setProperty("--nav-h", `${header.offsetHeight}px`);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(header);
    return () => observer.disconnect();
  }, []);

  const links = [
    { href: `/${lang}`, label: t.home },
    { href: `/${lang}/menu`, label: t.menu },
    { href: `/${lang}#visit`, label: t.visit },
  ];

  return (
    <header
      ref={headerRef}
      className={cn(
        "sticky top-0 z-40 transition-[background-color,box-shadow]",
        scrolled ? "bg-cream/90 shadow-[0_6px_24px_-12px_rgba(0,0,0,0.25)] backdrop-blur" : "bg-cream",
      )}
    >
      <nav className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href={`/${lang}`} aria-label="Road 8" className="shrink-0">
          <Logo size={52} priority />
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => {
            const active = l.href === pathname;
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={cn(
                    "rounded-full px-4 py-2 font-bold transition hover:bg-cream-2",
                    active && "bg-brand text-white hover:bg-brand",
                  )}
                >
                  {l.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <Link
            href={switchHref}
            hrefLang={otherLang}
            className="flex h-11 min-w-11 items-center justify-center rounded-full border-2 border-asphalt px-3 font-bold transition hover:bg-asphalt hover:text-white"
          >
            {t.switchLang}
          </Link>
          <CartButton />
          <button
            type="button"
            onClick={open}
            className="hidden h-11 rounded-full bg-brand px-5 font-bold text-white shadow-[0_4px_0_var(--brand-dark)] transition hover:-translate-y-0.5 lg:block"
          >
            {t.order}
          </button>
        </div>
      </nav>

      {/* Mobile links */}
      <ul className="no-scrollbar flex gap-2 overflow-x-auto px-4 pb-3 md:hidden">
        {links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className={cn(
                "block whitespace-nowrap rounded-full bg-cream-2 px-4 py-1.5 text-sm font-bold",
                l.href === pathname && "bg-brand text-white",
              )}
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
      <div className="road-line h-1 bg-asphalt" aria-hidden="true" />
    </header>
  );
}
