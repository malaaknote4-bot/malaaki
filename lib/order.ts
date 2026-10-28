import { dictionaries, formatPrice, type Locale } from "./i18n";
import { menuById } from "./menu";
import { site } from "./site";

export type CartLine = { id: string; qty: number };

export type Customer = {
  name: string;
  phone: string;
  type: "delivery" | "pickup";
  address: string;
  notes: string;
};

// Total of the cart, or null while any item in it has no price yet.
export function cartSubtotal(lines: CartLine[]) {
  let sum = 0;
  for (const l of lines) {
    const price = menuById[l.id]?.price;
    if (price === undefined) return null;
    sum += price * l.qty;
  }
  return sum;
}

export function buildOrderMessage(lines: CartLine[], customer: Customer, lang: Locale) {
  const t = dictionaries[lang];
  const price = (n: number) => formatPrice(n, lang, site.currency);
  const items = lines
    .filter((l) => menuById[l.id])
    .map((l) => {
      const item = menuById[l.id];
      const cost = item.price === undefined ? "" : ` — ${price(item.price * l.qty)}`;
      return `• ${l.qty} × ${item.name[lang]}${cost}`;
    });
  const subtotal = cartSubtotal(lines);

  const out = [t.order.greeting, "", ...items, ""];
  if (subtotal !== null) out.push(`*${t.order.total}: ${price(subtotal)}*`, "");
  out.push(`${t.order.name}: ${customer.name}`);
  out.push(`${t.order.phone}: ${customer.phone}`);
  out.push(`${t.order.type}: ${customer.type === "delivery" ? t.cart.deliveryOpt : t.cart.pickupOpt}`);
  if (customer.type === "delivery") out.push(`${t.order.address}: ${customer.address}`);
  if (customer.notes.trim()) out.push(`${t.order.notes}: ${customer.notes.trim()}`);
  return out.join("\n");
}

export function whatsappUrl(text: string) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
}
