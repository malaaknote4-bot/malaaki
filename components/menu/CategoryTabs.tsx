"use client";

import { useEffect, useState } from "react";
import type { Locale } from "@/lib/i18n";
import type { Category } from "@/lib/menu";
import { cn } from "@/lib/utils";

export default function CategoryTabs({ categories, lang }: { categories: Category[]; lang: Locale }) {
  const [active, setActive] = useState(categories[0]?.id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length) setActive(visible[0].target.id);
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    categories.forEach((c) => {
      const el = document.getElementById(c.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [categories]);

  return (
    <div className="sticky top-[5.25rem] z-30 bg-cream/95 py-3 backdrop-blur md:top-[4.75rem]">
      <ul className="no-scrollbar mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 sm:px-6">
        {categories.map((c) => (
          <li key={c.id}>
            <a
              href={`#${c.id}`}
              onClick={() => setActive(c.id)}
              className={cn(
                "flex items-center gap-2 whitespace-nowrap rounded-full border-2 px-4 py-2 font-bold transition",
                active === c.id
                  ? "border-brand bg-brand text-white shadow-[0_3px_0_var(--brand-dark)]"
                  : "border-asphalt/10 bg-white hover:border-brand",
              )}
            >
              <span aria-hidden="true">{c.emoji}</span>
              {c.name[lang]}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
