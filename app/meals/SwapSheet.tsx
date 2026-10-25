"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Search, X } from "lucide-react";
import { getSwapOptions, searchMeals, type Meal, type Slot } from "@/lib/data/meals";
import { foodName } from "@/lib/data/foods";

const PANEL: Record<Slot, string> = { breakfast: "bg-peach", lunch: "bg-sky", dinner: "bg-blush" };

function OptionRow({ meal, panel, onChoose }: { meal: Meal; panel: string; onChoose: () => void }) {
  return (
    <li>
      <button
        onClick={onChoose}
        className="group flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left transition-colors hover:bg-muted"
      >
        <span className={`${panel} flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-2xl`}>
          {meal.emoji}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate font-semibold text-foreground">{meal.name}</span>
          <span className="block truncate text-xs text-soft">
            {meal.time} · {meal.note}
          </span>
        </span>
        <span className="shrink-0 rounded-full border border-primary px-3 py-1 text-xs font-semibold text-primary transition-colors group-hover:bg-primary group-hover:text-primary-fg">
          Choose
        </span>
      </button>
    </li>
  );
}

export default function SwapSheet({
  day,
  slot,
  current,
  hasPick,
  dislikes,
  onChoose,
  onReset,
  onClose,
}: {
  day: string;
  slot: Slot;
  current: Meal;
  hasPick: boolean;
  dislikes: string[];
  onChoose: (slug: string) => void;
  onReset: () => void;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const q = query.trim();
  const options = useMemo(() => getSwapOptions(slot, dislikes, current.slug), [slot, dislikes, current.slug]);
  const search = useMemo(() => (q ? searchMeals(q, slot, dislikes, current.slug) : null), [q, slot, dislikes, current.slug]);
  const sameSlot = search?.results.filter((r) => r.sameSlot).map((r) => r.meal) ?? [];
  const otherSlots = search?.results.filter((r) => !r.sameSlot).map((r) => r.meal) ?? [];

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center bg-black/40 backdrop-blur-[2px] sm:items-center sm:p-6" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="swap-title"
        onClick={(e) => e.stopPropagation()}
        className="flex max-h-[88vh] w-full flex-col overflow-hidden rounded-t-[28px] border border-border bg-card shadow-2xl sm:max-w-xl sm:rounded-[28px]"
      >
        <div className="relative bg-blush px-6 pb-5 pt-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Other options</p>
          <h2 id="swap-title" className="mt-1 font-display text-3xl leading-tight text-primary">
            Swap {day}&apos;s {slot}
          </h2>
          <p className="mt-1 truncate text-sm text-foreground/75">
            Instead of {current.emoji} {current.name}
          </p>
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-foreground hover:bg-card/60"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="border-b border-border px-6 py-4">
          <label className="relative block">
            <span className="sr-only">Type what they&apos;d like</span>
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-soft" />
            <input
              ref={inputRef}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type what they'd like, e.g. pasta"
              className="w-full rounded-full border border-border bg-background py-3 pl-11 pr-4 text-sm font-medium text-foreground placeholder:text-soft focus:border-primary focus:outline-none"
            />
          </label>        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-3 py-3">
          {!search && (
            <>
              <p className="px-3 pb-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-soft">
                {options.length} {slot} ideas
              </p>
              <ul>
                {options.map((m) => (
                  <OptionRow key={m.slug} meal={m} panel={PANEL[slot]} onChoose={() => onChoose(m.slug)} />
                ))}
              </ul>
            </>
          )}

          {search && sameSlot.length > 0 && (
            <>
              <p className="px-3 pb-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-soft">{slot} ideas</p>
              <ul>
                {sameSlot.map((m) => (
                  <OptionRow key={m.slug} meal={m} panel={PANEL[slot]} onChoose={() => onChoose(m.slug)} />
                ))}
              </ul>
            </>
          )}

          {search && otherSlots.length > 0 && (
            <>
              <p className="px-3 pb-1 pt-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-soft">
                From other meals
              </p>
              <ul>
                {otherSlots.map((m) => (
                  <OptionRow key={m.slug} meal={m} panel="bg-muted" onChoose={() => onChoose(m.slug)} />
                ))}
              </ul>
            </>
          )}

          {search && search.results.length === 0 && (
            <p className="px-3 py-6 text-center text-sm text-soft">
              No recipes match &ldquo;{q}&rdquo; yet — try another word, like an ingredient.
            </p>
          )}

          {search && search.hidden.count > 0 && (
            <p className="px-3 pt-3 text-center text-xs text-soft">
              {search.hidden.count} {search.hidden.count === 1 ? "match" : "matches"} hidden — contains{" "}
              {search.hidden.foods.map(foodName).join(" or ")} (on your dislikes list)
            </p>
          )}
        </div>

        {hasPick && (
          <div className="border-t border-border px-6 py-3 text-center">
            <button onClick={onReset} className="text-sm font-semibold text-primary hover:underline">
              Back to the suggested meal
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
