import Link from "next/link";
import { Clock, Flame, MapPin, Phone, Sparkles, Timer, Beef } from "lucide-react";
import AddToCartButton from "@/components/cart/AddToCartButton";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import MenuItemCard from "@/components/menu/MenuItemCard";
import FoodImage from "@/components/ui/FoodImage";
import { dictionaries, formatPrice, type Locale } from "@/lib/i18n";
import { galleryImages, menu } from "@/lib/menu";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

function SectionHeading({ kicker, title, subtitle, light = false }: { kicker?: string; title: string; subtitle?: string; light?: boolean }) {
  return (
    <div className="mx-auto mb-10 max-w-2xl space-y-3 text-center">
      {kicker && (
        <span className="inline-block rotate-[-2deg] rounded-lg bg-sun px-3 py-1 text-sm font-black uppercase tracking-wide text-asphalt">
          {kicker}
        </span>
      )}
      <h2 className={cn("font-display text-5xl leading-tight sm:text-6xl", light ? "text-cream" : "text-asphalt")}>{title}</h2>
      {subtitle && <p className={cn("text-lg", light ? "text-cream/75" : "text-asphalt/65")}>{subtitle}</p>}
    </div>
  );
}

export function Featured({ lang }: { lang: Locale }) {
  const t = dictionaries[lang].featured;
  const items = menu.filter((i) => i.featured);
  return (
    <section className="dots py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading kicker={t.kicker} title={t.title} subtitle={t.subtitle} />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <MenuItemCard key={item.id} item={item} lang={lang} size="lg" />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            href={`/${lang}/menu`}
            className="inline-flex h-14 items-center rounded-full bg-asphalt px-8 text-lg font-bold text-white transition hover:bg-brand"
          >
            {t.seeAll}
          </Link>
        </div>
      </div>
    </section>
  );
}

const comboColors = ["bg-sun", "bg-leaf", "bg-brand"];

export function Combos({ lang }: { lang: Locale }) {
  const t = dictionaries[lang].combos;
  const items = menu.filter((i) => i.category === "meals");
  return (
    <section className="asphalt py-20 text-cream">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading kicker={t.kicker} title={t.title} subtitle={t.subtitle} light />
        <div className="grid gap-6 lg:grid-cols-3">
          {items.map((item, i) => (
            <article key={item.id} className={cn("group relative overflow-hidden rounded-[2rem] text-asphalt", comboColors[i % 3])}>
              <div className="relative aspect-[16/10] overflow-hidden">
                <FoodImage
                  src={item.image}
                  alt={item.name[lang]}
                  fill
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  className="object-cover transition duration-500 group-hover:scale-110"
                />
              </div>
              <div className="flex items-end justify-between gap-4 p-6">
                <div className={cn(i % 3 === 2 && "text-white")}>
                  <h3 className="font-display text-3xl">{item.name[lang]}</h3>
                  <p className="text-sm opacity-80">{item.desc[lang]}</p>
                  <p className="mt-2 text-xl font-black">{formatPrice(item.price, lang, site.currency)}</p>
                </div>
                <AddToCartButton id={item.id} className={cn(i % 3 === 2 && "bg-asphalt shadow-none")} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const whyIcons = [Beef, Timer, Flame];
const whyColors = ["bg-brand text-white", "bg-sun text-asphalt", "bg-leaf text-white"];

export function WhyUs({ lang }: { lang: Locale }) {
  const t = dictionaries[lang].why;
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading title={t.title} />
        <div className="grid gap-6 md:grid-cols-3">
          {t.items.map((item, i) => {
            const Icon = whyIcons[i];
            return (
              <div key={item.title} className="rounded-[2rem] border-2 border-asphalt/10 bg-white p-8 text-center transition hover:-translate-y-1 hover:border-brand">
                <div className={cn("mx-auto mb-5 flex size-20 rotate-[-6deg] items-center justify-center rounded-3xl shadow-lg", whyColors[i])}>
                  <Icon className="size-10" strokeWidth={2.2} />
                </div>
                <h3 className="font-display text-3xl">{item.title}</h3>
                <p className="mt-2 text-asphalt/65">{item.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function Gallery({ lang }: { lang: Locale }) {
  const t = dictionaries[lang].gallery;
  return (
    <section className="bg-sun py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading kicker={t.kicker} title={t.title} />
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4 md:grid-rows-2">
          {galleryImages.map((src, i) => (
            <div
              key={src}
              className={cn(
                "relative overflow-hidden rounded-3xl bg-cream-2 shadow-lg ring-4 ring-white",
                i === 0 ? "col-span-2 row-span-2 aspect-square" : "aspect-square",
                i % 2 ? "rotate-1" : "-rotate-1",
              )}
            >
              <FoodImage
                src={src}
                alt=""
                fill
                sizes={i === 0 ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 768px) 25vw, 50vw"}
                className="object-cover transition duration-500 hover:scale-110"
              />
            </div>
          ))}
        </div>
        <p className="mt-8 flex items-center justify-center gap-2 font-bold text-asphalt">
          <Sparkles className="size-5" />
          <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:underline">
            Instagram
          </a>
        </p>
      </div>
    </section>
  );
}

export function Visit({ lang }: { lang: Locale }) {
  const t = dictionaries[lang].visit;
  const rows = [
    { icon: MapPin, label: t.address, value: site.address[lang] },
    { icon: Clock, label: t.hours, value: site.hours[lang] },
    { icon: Phone, label: t.phone, value: site.phone, ltr: true },
  ];
  return (
    <section id="visit" className="py-20">
      <div className="mx-auto grid max-w-7xl items-stretch gap-8 px-4 sm:px-6 lg:grid-cols-2">
        <div className="flex flex-col justify-center rounded-[2rem] bg-brand p-8 text-white sm:p-10">
          <span className="mb-3 inline-block w-fit rotate-[-2deg] rounded-lg bg-sun px-3 py-1 text-sm font-black text-asphalt">{t.kicker}</span>
          <h2 className="font-display text-5xl leading-tight">{t.title}</h2>
          <ul className="mt-8 space-y-5">
            {rows.map(({ icon: Icon, label, value, ltr }) => (
              <li key={label} className="flex items-start gap-4">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-white/15">
                  <Icon className="size-6" />
                </span>
                <span>
                  <span className="block text-sm text-white/70">{label}</span>
                  <span className="block text-lg font-bold" dir={ltr ? "ltr" : undefined}>{value}</span>
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={`https://wa.me/${site.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center gap-2 rounded-full bg-[#25D366] px-6 font-bold text-white transition hover:-translate-y-0.5"
            >
              <WhatsAppIcon className="size-5" />
              {t.whatsapp}
            </a>
            <a
              href={site.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center gap-2 rounded-full bg-white px-6 font-bold text-brand transition hover:-translate-y-0.5"
            >
              <MapPin className="size-5" />
              {t.directions}
            </a>
          </div>
        </div>
        <div className="min-h-80 overflow-hidden rounded-[2rem] bg-cream-2 ring-4 ring-asphalt">
          <iframe
            title={t.directions}
            src={site.mapsEmbed}
            className="h-full min-h-80 w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
