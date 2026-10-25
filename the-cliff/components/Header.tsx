"use client";

import { useEffect, useState } from "react";
import Logo from "./Logo";

const links = [
  { href: "#retreat", label: "The Retreat" },
  { href: "#amenities", label: "Amenities" },
  { href: "#gallery", label: "Gallery" },
  { href: "#location", label: "Location" },
  { href: "#faq", label: "FAQ" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 text-white transition-colors duration-500 ${
        solid ? "border-b border-line-light bg-night/90 backdrop-blur-md" : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:h-20 md:px-8" aria-label="Main">
        <a href="#top" onClick={() => setOpen(false)} aria-label="The Cliff, back to top">
          <Logo />
        </a>

        <ul className="hidden items-center gap-9 lg:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/70 transition-colors hover:text-white">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href="#book"
            className="hidden h-11 items-center bg-white px-5 text-sm font-semibold text-ink transition-colors hover:bg-bone sm:inline-flex"
          >
            Book your stay
          </a>
          <button
            type="button"
            className="-mr-2 p-2 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            <svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              {open ? <path d="M6 6l14 14M20 6L6 20" /> : <path d="M3 9h20M3 17h20" />}
            </svg>
          </button>
        </div>
      </nav>

      {open && (
        <ul id="mobile-menu" className="border-t border-line-light px-5 pb-8 pt-2 lg:hidden">
          {links.map((l) => (
            <li key={l.href} className="border-b border-line-light">
              <a href={l.href} className="block py-4 font-serif text-3xl font-light" onClick={() => setOpen(false)}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
