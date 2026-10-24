"use client";

import { useState } from "react";
import { weekMeals, DAYS } from "@/lib/data/meals";

const mealLabels = [
  { key: "breakfast" as const, label: "Breakfast", emoji: "🌅", time: "Morning" },
  { key: "lunch"     as const, label: "Lunch",     emoji: "☀️", time: "Midday" },
  { key: "dinner"    as const, label: "Dinner",    emoji: "🌙", time: "Evening" },
];

export default function MealsClient({ todayIndex }: { todayIndex: number }) {
  const [selectedDay, setSelectedDay] = useState(todayIndex);

  const day = DAYS[selectedDay];
  const meals = weekMeals[day];

  return (
    <>
      {/* Day selector */}
      <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
        {DAYS.map((d, i) => (
          <button
            key={d}
            onClick={() => setSelectedDay(i)}
            className={`shrink-0 rounded-2xl px-4 py-2.5 text-sm font-bold transition-all ${
              selectedDay === i
                ? "bg-meals text-white shadow-md"
                : "bg-card text-soft border border-border hover:border-meals/40"
            }`}
          >
            <span className="block text-xs opacity-70">{d.slice(0, 3)}</span>
            <span>{i === todayIndex ? "Today" : d.slice(0, 3)}</span>
          </button>
        ))}
      </div>

      {/* Selected day heading */}
      <div className="mb-4 flex items-center gap-2">
        <span className="text-2xl font-black text-foreground">{day}</span>
        {selectedDay === todayIndex && (
          <span className="rounded-full bg-meals text-white text-xs font-bold px-2.5 py-0.5">Today</span>
        )}
      </div>

      {/* Meal cards */}
      <div className="flex flex-col gap-4">
        {mealLabels.map(({ key, label, emoji, time }) => {
          const meal = meals[key];
          return (
            <div key={key} className="rounded-3xl bg-card border border-border shadow-sm p-5">
              <div className="flex items-start gap-4">
                <div className="flex flex-col items-center gap-1 shrink-0">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-meals-dim">
                    <span className="text-2xl">{meal.emoji}</span>
                  </div>
                  <span className="text-[10px] font-bold text-soft uppercase tracking-wide">{time}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-xs font-bold text-meals uppercase tracking-wide">{emoji} {label}</span>
                  <h3 className="font-black text-lg text-foreground leading-tight">{meal.name}</h3>
                  <p className="mt-0.5 text-sm text-soft font-medium">{meal.note}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Week overview */}
      <div className="mt-8 rounded-3xl bg-card border border-border p-5 shadow-sm">
        <h2 className="font-black text-foreground mb-4">Week at a Glance 📅</h2>
        <div className="space-y-2">
          {DAYS.map((d, i) => (
            <button
              key={d}
              onClick={() => setSelectedDay(i)}
              className={`w-full flex items-center gap-3 rounded-2xl px-3 py-2.5 text-left transition-colors ${
                selectedDay === i ? "bg-meals-dim" : "hover:bg-muted"
              }`}
            >
              <span className="w-20 text-sm font-bold text-soft shrink-0">
                {i === todayIndex ? "Today" : d.slice(0, 3)}
              </span>
              <div className="flex-1 flex gap-2 text-xs font-medium text-soft truncate">
                <span>{weekMeals[d].breakfast.emoji} {weekMeals[d].breakfast.name.split(" ").slice(0, 2).join(" ")}</span>
                <span className="opacity-40">·</span>
                <span>{weekMeals[d].dinner.emoji} {weekMeals[d].dinner.name.split(" ").slice(0, 2).join(" ")}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
