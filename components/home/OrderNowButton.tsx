"use client";

import Link from "next/link";
import { useCart } from "@/components/cart/CartProvider";

// Opens the cart if it has items, otherwise sends people to the menu to pick some.
export default function OrderNowButton({ label }: { label: string }) {
  const { lang, count, open } = useCart();
  const className =
    "inline-flex h-14 items-center rounded-full bg-brand px-8 text-lg font-black text-white shadow-[0_5px_0_var(--brand-dark)] transition hover:-translate-y-0.5 active:translate-y-1 active:shadow-none";

  if (count > 0) {
    return (
      <button type="button" onClick={open} className={className}>
        {label}
      </button>
    );
  }
  return (
    <Link href={`/${lang}/menu`} className={className}>
      {label}
    </Link>
  );
}
