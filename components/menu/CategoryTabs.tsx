"use client";

import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/lib/i18n";
import type { Category } from "@/lib/menu";
import { cn } from "@/lib/utils";

export default function CategoryTabs({ categories, lang }: { categories: Category[]; lang: Locale }) {
  const [active, setActive] = useState(categories[0]?.id);
  const listRef = useRef<HTMLUListElement>(null);

  // The current category is the last one whose section has scrolled up to just below this bar
  // (or the last one once the page is scrolled to the bottom).
  useEffect(() => {
    const onScroll = () => {
      const barBottom = listRef.current?.parentElement?.getBoundingClientRect().bottom ?? 0;
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      let current = categories[0]?.id;
      for (const c of categories) {
        const el = document.getElementById(c.id);
        if (el && (atBottom || el.getBoundingClientRect().top <= barBottom + 48)) current = c.id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [categories]);

  // Slide the tab row sideways so the current category is centred and the next one is in reach.
  // Measured from the screen positions, so it works the same in right-to-left Arabic.
  useEffect(() => {
    const list = listRef.current;
    const tab = list?.querySelector<HTMLElement>(`[data-id="${active}"]`);
    if (!list || !tab) return;
    const listBox = list.getBoundingClientRect();
    const tabBox = tab.getBoundingClientRect();
    const delta = tabBox.left + tabBox.width / 2 - (listBox.left + listBox.width / 2);
    list.scrollBy({ left: delta, behavior: "smooth" });
  }, [active]);

  return (
    <div className="sticky top-[var(--nav-h)] z-30 bg-cream/95 py-3 shadow-[0_8px_16px_-14px_rgba(0,0,0,0.35)] backdrop-blur">
      <ul ref={listRef} className="no-scrollbar mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 sm:px-6">
        {categories.map((c) => (
          <li key={c.id} data-id={c.id}>
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
