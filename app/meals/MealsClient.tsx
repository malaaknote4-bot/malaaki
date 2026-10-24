"use client";

import { useState } from "react";
import { weekMeals, DAYS, alternatives, getEffectiveMeal } from "@/lib/data/meals";
import { SectionTitle } from "@/components/ui/decor";

const mealLabels = [
  { key: "breakfast" as const, label: "Breakfast", time: "Morning", panel: "bg-peach" },
  { key: "lunch"     as const, label: "Lunch",     time: "Midday",  panel: "bg-sky" },
  { key: "dinner"    as const, label: "Dinner",    time: "Evening", panel: "bg-blush" },
];

export default function MealsClient({
  todayIndex,
  dislikedFoods,
}: {
  todayIndex: number;
  dislikedFoods: string[];
}) {
  const [selectedDay, setSelectedDay] = useState(todayIndex);

  const day = DAYS[selectedDay];
  const meals = weekMeals[day];

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

      {/* Meal cards */}
      <div className="grid gap-4 md:grid-cols-3">
        {mealLabels.map(({ key, label, time, panel }) => {
          const meal = getEffectiveMeal(meals[key], alternatives[key], dislikedFoods);
          return (
            <article key={key} className="min-w-0 flex flex-col overflow-hidden rounded-[22px] border border-border bg-card">
              <div className={`${panel} relative flex aspect-[16/10] items-center justify-center`}>
                <span className="text-7xl">{meal.emoji}</span>
                <span className="absolute left-4 top-4 rounded-full bg-card/85 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
                  {label}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-soft">{time}</p>
                <h3 className="mt-1 font-display text-2xl leading-tight text-foreground">{meal.name}</h3>
                <p className="mt-1.5 text-sm text-soft">{meal.note}</p>
                <div className="mt-4 border-t border-border pt-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">How to make it</p>
                  <p className="mt-1 text-sm leading-relaxed text-foreground/85">{meal.prep}</p>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Week overview */}
      <section className="mt-12">
        <SectionTitle>Week at a Glance</SectionTitle>
        <div className="overflow-hidden rounded-[22px] border border-border bg-card">
          {DAYS.map((d, i) => {
            const b = getEffectiveMeal(weekMeals[d].breakfast, alternatives.breakfast, dislikedFoods);
            const l = getEffectiveMeal(weekMeals[d].lunch, alternatives.lunch, dislikedFoods);
            const n = getEffectiveMeal(weekMeals[d].dinner, alternatives.dinner, dislikedFoods);
            return (
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
                {[b, l, n].map((m, j) => (
                  <span
                    key={j}
                    className={`truncate text-sm text-soft ${j > 0 ? "hidden sm:block" : ""}`}
                  >
                    {m.emoji} {m.name}
                  </span>
                ))}
              </button>
            );
          })}
        </div>
      </section>
    </>
  );
}
