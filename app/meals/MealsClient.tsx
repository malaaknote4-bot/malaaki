"use client";

import { useCallback, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Shuffle } from "lucide-react";
import { DAYS, choiceKey, resolveMeal, type Meal, type MealChoices, type Slot } from "@/lib/data/meals";
import { SectionTitle } from "@/components/ui/decor";
import SwapSheet from "./SwapSheet";

const mealLabels = [
  { key: "breakfast" as const, label: "Breakfast", time: "Morning", panel: "bg-peach" },
  { key: "lunch"     as const, label: "Lunch",     time: "Midday",  panel: "bg-sky" },
  { key: "dinner"    as const, label: "Dinner",    time: "Evening", panel: "bg-blush" },
];

export default function MealsClient({
  todayIndex,
  dislikedFoods,
  initialChoices,
  initialCustomMeals,
}: {
  todayIndex: number;
  dislikedFoods: string[];
  initialChoices: MealChoices;
  initialCustomMeals: Meal[];
}) {
  const [selectedDay, setSelectedDay] = useState(todayIndex);
  const [choices, setChoices] = useState<MealChoices>(initialChoices);
  const [customMeals, setCustomMeals] = useState<Meal[]>(initialCustomMeals);
  const [swapSlot, setSwapSlot] = useState<Slot | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);
  const triggers = useRef<Partial<Record<Slot, HTMLButtonElement | null>>>({});

  const day = DAYS[selectedDay];
  const mealFor = (d: string, slot: Slot) => resolveMeal(d, slot, dislikedFoods, choices, customMeals);

  const openSlot = useRef<Slot | null>(null);

  function openSheet(slot: Slot) {
    openSlot.current = slot;
    setSwapSlot(slot);
  }

  const closeSheet = useCallback(() => {
    const slot = openSlot.current;
    openSlot.current = null;
    setSwapSlot(null);
    if (slot) requestAnimationFrame(() => triggers.current[slot]?.focus());
  }, []);

  async function saveChoice(slot: Slot, slug: string | null) {
    const key = choiceKey(day, slot);
    const previous = choices;
    const next = { ...choices };
    if (slug) next[key] = slug;
    else delete next[key];
    setChoices(next);
    setSaveError(null);
    closeSheet();
    try {
      const res = await fetch("/api/meal-choice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ day, slot, slug }),
      });
      if (!res.ok) throw new Error();
    } catch {
      setChoices(previous);
      setSaveError("Couldn't save that change — please try again.");
    }
  }

  return (
    <>
      {/* Day selector */}
      <div className="mb-8 flex gap-2 overflow-x-auto pb-1">
        {DAYS.map((d, i) => (
          <button
            key={d}
            onClick={() => setSelectedDay(i)}
            className={`shrink-0 rounded-full px-5 py-2.5 text-sm font-semibold transition-all ${
              selectedDay === i
                ? "bg-primary text-primary-fg"
                : "border border-border bg-card text-soft hover:border-primary/40 hover:text-foreground"
            }`}
          >
            {i === todayIndex ? "Today" : d.slice(0, 3)}
          </button>
        ))}
      </div>

      <SectionTitle
        aside={
          selectedDay === todayIndex ? (
            <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-fg">Today</span>
          ) : undefined
        }
      >
        {day}
      </SectionTitle>

      {saveError && (
        <p role="alert" className="mb-4 rounded-2xl bg-primary-dim px-4 py-3 text-sm font-medium text-primary">
          {saveError}
        </p>
      )}

      {/* Meal cards */}
      <div className="grid gap-4 md:grid-cols-3">
        {mealLabels.map(({ key, label, time, panel }) => {
          const meal = mealFor(day, key);
          const isPick = choices[choiceKey(day, key)] === meal.slug;
          return (
            <article
              key={key}
              className="group min-w-0 flex flex-col overflow-hidden rounded-[22px] border border-border bg-card transition-all hover:-translate-y-0.5 hover:shadow-lg"
            >
              <Link href={`/meals/${meal.slug}`} className="flex flex-1 flex-col">
                <div className={`${panel} relative flex aspect-[16/10] items-center justify-center`}>
                  <span className="text-7xl transition-transform group-hover:scale-105">{meal.emoji}</span>
                  <span className="absolute left-4 top-4 rounded-full bg-card/85 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
                    {label}
                  </span>
                  {isPick && (
                    <span className="absolute right-4 top-4 rounded-full bg-primary px-3 py-1 text-[11px] font-semibold text-primary-fg">
                      {meal.custom ? "Family recipe" : "Your pick"}
                    </span>
                  )}
                </div>
                <div className="flex flex-1 flex-col px-5 pt-5">
                  <p className="text-xs font-medium uppercase tracking-[0.14em] text-soft">
                    {time} · {meal.time}
                  </p>
                  <h3 className="mt-1 font-display text-2xl leading-tight text-foreground">{meal.name}</h3>
                  <p className="mt-1.5 flex-1 text-sm text-soft">{meal.note}</p>
                </div>
              </Link>
              <div className="mx-5 mb-5 mt-4 flex items-center justify-between gap-3 border-t border-border pt-4">
                <Link
                  href={`/meals/${meal.slug}`}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
                >
                  View recipe <ArrowRight className="h-4 w-4" />
                </Link>
                <button
                  ref={(el) => {
                    triggers.current[key] = el;
                  }}
                  onClick={() => openSheet(key)}
                  aria-haspopup="dialog"
                  className="inline-flex items-center gap-1.5 rounded-full border border-primary px-3.5 py-1.5 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-fg"
                >
                  <Shuffle className="h-3.5 w-3.5" />
                  Other options
                </button>
              </div>
            </article>
          );
        })}
      </div>

      {swapSlot && (
        <SwapSheet
          day={day}
          slot={swapSlot}
          current={mealFor(day, swapSlot)}
          hasPick={Boolean(choices[choiceKey(day, swapSlot)])}
          dislikes={dislikedFoods}
          customMeals={customMeals}
          onChoose={(slug) => saveChoice(swapSlot, slug)}
          onCustomSaved={(meal, saved) => {
            setCustomMeals((list) => [meal, ...list]);
            setChoices(saved);
            setSaveError(null);
            closeSheet();
          }}
          onReset={() => saveChoice(swapSlot, null)}
          onClose={closeSheet}
        />
      )}

      {/* Week overview */}
      <section className="mt-12">
        <SectionTitle>Week at a Glance</SectionTitle>
        <div className="overflow-hidden rounded-[22px] border border-border bg-card">
          {DAYS.map((d, i) => (
            <button
              key={d}
              onClick={() => setSelectedDay(i)}
              className={`grid w-full grid-cols-[72px_1fr] sm:grid-cols-[110px_1fr_1fr_1fr] items-center gap-x-4 gap-y-1 border-b border-border px-5 py-3.5 text-left last:border-b-0 transition-colors ${
                selectedDay === i ? "bg-blush" : "hover:bg-muted"
              }`}
            >
              <span className={`text-sm font-semibold ${selectedDay === i ? "text-primary" : "text-foreground"}`}>
                {i === todayIndex ? "Today" : d}
              </span>
              {mealLabels.map(({ key }, j) => {
                const m = mealFor(d, key);
                return (
                  <span key={key} className={`truncate text-sm text-soft ${j > 0 ? "hidden sm:block" : ""}`}>
                    {m.emoji} {m.name}
                  </span>
                );
              })}
            </button>
          ))}
        </div>
      </section>
    </>
  );
}
