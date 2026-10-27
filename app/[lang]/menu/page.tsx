import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CategoryTabs from "@/components/menu/CategoryTabs";
import MenuItemCard from "@/components/menu/MenuItemCard";
import { dictionaries, hasLocale } from "@/lib/i18n";
import { categories, menu } from "@/lib/menu";

export async function generateMetadata({ params }: PageProps<"/[lang]/menu">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return { title: `${dictionaries[lang].menu.title} | Road 8` };
}

export default async function MenuPage({ params }: PageProps<"/[lang]/menu">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = dictionaries[lang].menu;

  return (
    <>
      <section className="relative overflow-hidden bg-brand py-14 text-center text-white">
        <div className="pointer-events-none absolute inset-0 opacity-[0.12] [background-image:radial-gradient(#fff_2px,transparent_2px)] [background-size:26px_26px]" />
        <div className="relative mx-auto max-w-3xl px-4">
          <h1 className="font-display text-7xl drop-shadow-[0_4px_0_rgba(0,0,0,0.18)] sm:text-8xl">{t.title}</h1>
          <p className="mt-3 text-lg text-white/90">{t.subtitle}</p>
        </div>
      </section>
      <div className="road-line h-2 bg-asphalt" aria-hidden="true" />

      <CategoryTabs categories={categories} lang={lang} />

      <div className="mx-auto max-w-7xl space-y-16 px-4 pb-28 pt-8 sm:px-6">
        {categories.map((cat, ci) => {
          const items = menu.filter((i) => i.category === cat.id);
          if (!items.length) return null;
          return (
            <section key={cat.id} id={cat.id} className="scroll-mt-40">
              <h2 className="mb-6 flex items-center gap-3 font-display text-4xl sm:text-5xl">
                <span className="flex size-14 rotate-[-6deg] items-center justify-center rounded-2xl bg-sun text-3xl shadow-md" aria-hidden="true">
                  {cat.emoji}
                </span>
                {cat.name[lang]}
              </h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((item, i) => (
                  <MenuItemCard key={item.id} item={item} lang={lang} priority={ci === 0 && i < 3} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </>
  );
}
