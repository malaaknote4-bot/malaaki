"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Minus, Plus, Trash2, X } from "lucide-react";
import FoodImage from "@/components/ui/FoodImage";
import { dictionaries, formatPrice } from "@/lib/i18n";
import { menuById } from "@/lib/menu";
import { buildOrderMessage, whatsappUrl, type Customer } from "@/lib/order";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { useCart } from "./CartProvider";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";

const EMPTY_CUSTOMER: Customer = { name: "", phone: "", type: "delivery", address: "", notes: "" };

const inputClass =
  "w-full rounded-2xl border-2 border-asphalt/10 bg-white px-4 py-3 text-base outline-none transition placeholder:text-asphalt/35 focus:border-brand";

export default function CartDrawer() {
  const { lang, lines, subtotal, isOpen, close, setQty, clear } = useCart();
  const t = dictionaries[lang].cart;
  const price = (n: number) => formatPrice(n, lang, site.currency);
  const [customer, setCustomer] = useState<Customer>(EMPTY_CUSTOMER);
  const [error, setError] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, close]);

  const delivery = customer.type === "delivery" ? site.deliveryFee : 0;
  const update = <K extends keyof Customer>(key: K, value: Customer[K]) =>
    setCustomer((c) => ({ ...c, [key]: value }));

  function send(e: React.FormEvent) {
    e.preventDefault();
    const missing =
      !customer.name.trim() || !customer.phone.trim() || (customer.type === "delivery" && !customer.address.trim());
    if (missing) {
      setError(true);
      return;
    }
    setError(false);
    window.open(whatsappUrl(buildOrderMessage(lines, customer, lang)), "_blank", "noopener");
  }

  return (
    <div className={cn("fixed inset-0 z-50", !isOpen && "pointer-events-none")} aria-hidden={!isOpen}>
      <div
        className={cn("absolute inset-0 bg-asphalt/60 backdrop-blur-sm transition-opacity", isOpen ? "opacity-100" : "opacity-0")}
        onClick={close}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={t.title}
        tabIndex={-1}
        inert={!isOpen}
        className={cn(
          "absolute inset-y-0 end-0 flex w-full max-w-md flex-col bg-cream shadow-2xl outline-none transition-transform duration-300",
          isOpen ? "translate-x-0" : "ltr:translate-x-full rtl:-translate-x-full",
        )}
      >
        <header className="flex items-center justify-between bg-brand px-5 py-4 text-white">
          <h2 className="font-display text-3xl">{t.title}</h2>
          <button
            type="button"
            onClick={close}
            aria-label={t.close}
            className="flex size-10 items-center justify-center rounded-full bg-white/15 transition hover:bg-white/25"
          >
            <X className="size-5" />
          </button>
        </header>
        <div className="road-line h-1.5 bg-asphalt" />

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
            <span className="animate-float text-7xl" aria-hidden="true">🍔</span>
            <p className="text-lg font-bold">{t.empty}</p>
            <Link
              href={`/${lang}/menu`}
              onClick={close}
              className="rounded-full bg-asphalt px-6 py-3 font-bold text-white transition hover:bg-brand"
            >
              {t.browse}
            </Link>
          </div>
        ) : (
          <form onSubmit={send} className="flex min-h-0 flex-1 flex-col">
            <div className="flex-1 space-y-6 overflow-y-auto p-5">
              <ul className="space-y-3">
                {lines.map((line) => {
                  const item = menuById[line.id];
                  if (!item) return null;
                  return (
                    <li key={line.id} className="flex items-center gap-3 rounded-3xl bg-white p-2.5 shadow-sm">
                      <div className="relative size-16 shrink-0 overflow-hidden rounded-2xl">
                        <FoodImage src={item.image} alt={item.name[lang]} fill sizes="64px" className="object-cover" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-bold">{item.name[lang]}</p>
                        <p className="text-sm font-semibold text-brand">{price(item.price * line.qty)}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => setQty(line.id, line.qty - 1)}
                          aria-label={line.qty === 1 ? t.remove : "-1"}
                          className="flex size-8 items-center justify-center rounded-full bg-cream-2 transition hover:bg-sun"
                        >
                          {line.qty === 1 ? <Trash2 className="size-4" /> : <Minus className="size-4" />}
                        </button>
                        <span className="w-6 text-center font-bold">{line.qty}</span>
                        <button
                          type="button"
                          onClick={() => setQty(line.id, line.qty + 1)}
                          aria-label="+1"
                          className="flex size-8 items-center justify-center rounded-full bg-brand text-white transition hover:bg-brand-dark"
                        >
                          <Plus className="size-4" />
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>
              <button type="button" onClick={clear} className="text-sm font-semibold text-asphalt/50 underline-offset-4 hover:text-brand hover:underline">
                {t.clear}
              </button>

              <fieldset className="space-y-3">
                <legend className="mb-3 font-display text-2xl">{t.details}</legend>
                <input
                  className={inputClass}
                  placeholder={`${t.name} *`}
                  aria-label={t.name}
                  autoComplete="name"
                  value={customer.name}
                  onChange={(e) => update("name", e.target.value)}
                />
                <input
                  className={inputClass}
                  placeholder={`${t.phone} *`}
                  aria-label={t.phone}
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  dir="ltr"
                  value={customer.phone}
                  onChange={(e) => update("phone", e.target.value)}
                />
                <div className="grid grid-cols-2 gap-2 rounded-full bg-cream-2 p-1" role="radiogroup" aria-label={t.type}>
                  {(["delivery", "pickup"] as const).map((type) => (
                    <button
                      key={type}
                      type="button"
                      role="radio"
                      aria-checked={customer.type === type}
                      onClick={() => update("type", type)}
                      className={cn(
                        "rounded-full py-2.5 font-bold transition",
                        customer.type === type ? "bg-asphalt text-white shadow" : "text-asphalt/60 hover:text-asphalt",
                      )}
                    >
                      {type === "delivery" ? t.deliveryOpt : t.pickupOpt}
                    </button>
                  ))}
                </div>
                {customer.type === "delivery" && (
                  <input
                    className={inputClass}
                    placeholder={`${t.address} *`}
                    aria-label={t.address}
                    autoComplete="street-address"
                    value={customer.address}
                    onChange={(e) => update("address", e.target.value)}
                  />
                )}
                <textarea
                  className={cn(inputClass, "min-h-20 resize-none")}
                  placeholder={t.notesPh}
                  aria-label={t.notes}
                  value={customer.notes}
                  onChange={(e) => update("notes", e.target.value)}
                />
              </fieldset>
            </div>

            <footer className="space-y-3 border-t-2 border-dashed border-asphalt/15 bg-white p-5">
              <dl className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <dt>{t.subtotal}</dt>
                  <dd className="font-semibold">{price(subtotal)}</dd>
                </div>
                {customer.type === "delivery" && (
                  <div className="flex justify-between">
                    <dt>{t.delivery}</dt>
                    <dd className="font-semibold">{delivery === 0 ? t.free : price(delivery)}</dd>
                  </div>
                )}
                <div className="flex justify-between pt-1 text-lg">
                  <dt className="font-bold">{t.total}</dt>
                  <dd className="font-black text-brand">{price(subtotal + delivery)}</dd>
                </div>
              </dl>
              {error && <p className="text-sm font-semibold text-brand" role="alert">{t.required}</p>}
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] py-4 text-lg font-bold text-white shadow-[0_4px_0_#128C7E] transition hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-none"
              >
                <WhatsAppIcon className="size-6" />
                {t.send}
              </button>
            </footer>
          </form>
        )}
      </div>
    </div>
  );
}
