"use client";

import { ShoppingBag } from "lucide-react";
import { dictionaries, formatPrice } from "@/lib/i18n";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { useCart } from "./CartProvider";

export default function CartButton({ className }: { className?: string }) {
  const { lang, count, open } = useCart();
  return (
    <button
      type="button"
      onClick={open}
      aria-label={dictionaries[lang].cart.open}
      className={cn(
        "relative flex size-11 items-center justify-center rounded-full bg-asphalt text-white transition hover:bg-brand",
        className,
      )}
    >
      <ShoppingBag className="size-5" />
      {count > 0 && (
        <span
          key={count}
          className="animate-pop absolute -end-1 -top-1 flex size-6 items-center justify-center rounded-full bg-sun text-xs font-black text-asphalt ring-2 ring-cream"
        >
          {count}
        </span>
      )}
    </button>
  );
}

// Floating order bar shown on small screens once something is in the cart.
export function MobileCartBar() {
  const { lang, count, subtotal, open } = useCart();
  const t = dictionaries[lang].cart;
  if (count === 0) return null;
  return (
    <button
      type="button"
      onClick={open}
      className="fixed inset-x-4 bottom-4 z-40 flex items-center justify-between rounded-full bg-brand px-5 py-3.5 font-bold text-white shadow-xl shadow-brand/30 md:hidden"
    >
      <span className="flex items-center gap-2">
        <span className="flex size-7 items-center justify-center rounded-full bg-sun text-sm text-asphalt">{count}</span>
        {t.title}
      </span>
      <span>{formatPrice(subtotal, lang, site.currency)}</span>
    </button>
  );
}
