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

export function cartSubtotal(lines: CartLine[]) {
  return lines.reduce((sum, l) => sum + (menuById[l.id]?.price ?? 0) * l.qty, 0);
}

export function buildOrderMessage(lines: CartLine[], customer: Customer, lang: Locale) {
  const t = dictionaries[lang];
  const price = (n: number) => formatPrice(n, lang, site.currency);
  const items = lines
    .filter((l) => menuById[l.id])
    .map((l) => {
      const item = menuById[l.id];
      return `• ${l.qty} × ${item.name[lang]} — ${price(item.price * l.qty)}`;
    });
  const subtotal = cartSubtotal(lines);
  const delivery = customer.type === "delivery" ? site.deliveryFee : 0;

  const out = [t.order.greeting, "", ...items, "", `*${t.order.total}: ${price(subtotal + delivery)}*`, ""];
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
