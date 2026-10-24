"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { formatAmount, type Ingredient } from "@/lib/data/meals";

export default function IngredientList({ ingredients }: { ingredients: Ingredient[] }) {
  const [ticked, setTicked] = useState<Set<number>>(new Set());
  const total = ingredients.reduce((sum, i) => sum + i.amount, 0);

  function toggle(index: number) {
    setTicked((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  }

  return (
    <div className="overflow-hidden rounded-[22px] border border-border bg-card">
      <ul>
        {ingredients.map((ing, i) => {
          const done = ticked.has(i);
          return (
            <li key={ing.name} className="border-b border-border last:border-b-0">
              <button
                onClick={() => toggle(i)}
                aria-pressed={done}
                className="flex w-full items-start gap-3 px-5 py-3.5 text-left transition-colors hover:bg-muted"
              >
                <span
                  className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors ${
                    done ? "border-primary bg-primary text-primary-fg" : "border-primary/50"
                  }`}
                >
                  {done && <Check className="h-3 w-3" strokeWidth={3} />}
                </span>
                <span className="min-w-0 flex-1">
                  <span className={`block font-medium ${done ? "text-soft line-through" : "text-foreground"}`}>
                    {ing.name}
                  </span>
                  {ing.note && <span className="block text-xs text-soft">{ing.note}</span>}
                </span>
                <span className="shrink-0 whitespace-nowrap font-semibold tabular-nums text-primary">
                  {formatAmount(ing.amount, ing.unit)}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
      <div className="flex items-center justify-between gap-4 bg-muted px-5 py-3 text-sm">
        <span className="text-soft">
          {ticked.size} of {ingredients.length} ready
        </span>
        <span className="font-semibold text-foreground">
          Total ≈ {formatAmount(total, "g")}
        </span>
      </div>
    </div>
  );
}
