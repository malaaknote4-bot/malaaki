"use client";

import { Check, Minus, Plus } from "lucide-react";
import { dictionaries } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { useCart } from "./CartProvider";

export default function AddToCartButton({ id, className }: { id: string; className?: string }) {
  const { lang, lines, add, setQty } = useCart();
  const t = dictionaries[lang].menu;
  const qty = lines.find((l) => l.id === id)?.qty ?? 0;

  if (qty === 0) {
    return (
      <button
        type="button"
        onClick={() => add(id)}
        className={cn(
          "inline-flex h-11 items-center gap-1.5 rounded-full bg-brand px-5 font-bold text-white shadow-[0_4px_0_var(--brand-dark)] transition hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-none",
          className,
        )}
      >
        <Plus className="size-4" strokeWidth={3} />
        {t.add}
      </button>
    );
  }

  return (
    <div
      className={cn(
        "inline-flex h-11 items-center gap-1 rounded-full bg-asphalt p-1 text-white",
        className,
      )}
    >
      <button
        type="button"
        onClick={() => setQty(id, qty - 1)}
        aria-label="-1"
        className="flex size-9 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20"
      >
        <Minus className="size-4" strokeWidth={3} />
      </button>
      <span key={qty} className="animate-pop flex min-w-8 items-center justify-center gap-1 font-bold" aria-live="polite">
        <Check className="size-3.5 text-sun" strokeWidth={3} aria-label={t.added} />
        {qty}
      </span>
      <button
        type="button"
        onClick={() => add(id)}
        aria-label="+1"
        className="flex size-9 items-center justify-center rounded-full bg-brand transition hover:bg-brand-dark"
      >
        <Plus className="size-4" strokeWidth={3} />
      </button>
    </div>
  );
}
