import type { Metadata } from "next";
import { notFound } from "next/navigation";
import RoadCurves from "@/components/brand/RoadCurves";
import AddToCartButton from "@/components/cart/AddToCartButton";
import CategoryTabs from "@/components/menu/CategoryTabs";
import Price from "@/components/ui/Price";
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
      <section className="asphalt relative overflow-hidden py-14 text-center text-white">
        <RoadCurves className="pointer-events-none absolute -bottom-10 start-0 w-[55rem] max-w-none opacity-60" />
        <div className="relative mx-auto max-w-3xl px-4">
          <h1 className="font-display text-7xl sm:text-8xl">
            <span className="text-brand">{t.title}</span>
          </h1>
          <p className="mt-3 text-lg text-white/80">{t.subtitle}</p>
        </div>
      </section>
      <div className="road-line h-1.5 bg-brand" aria-hidden="true" />

      <CategoryTabs categories={categories} lang={lang} />

      <div className="mx-auto max-w-7xl space-y-16 px-4 pb-28 pt-8 sm:px-6">
        {categories.map((cat, ci) => {
          const items = menu.filter((i) => i.category === cat.id);
          if (!items.length) return null;
          return (
            <section key={cat.id} id={cat.id} className="scroll-mt-40">
              <h2 className="mb-6 flex items-center gap-3 font-display text-4xl sm:text-5xl">
                <span className="flex size-14 rotate-[-6deg] items-center justify-center rounded-2xl bg-brand text-3xl shadow-md" aria-hidden="true">
                  {cat.emoji}
                </span>
                {cat.name[lang]}
              </h2>
              {cat.compact ? (
                <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((item) => (
                    <li key={item.id} className="flex items-center justify-between gap-3 rounded-3xl bg-white p-4 shadow-sm ring-1 ring-asphalt/5">
                      <div className="min-w-0">
                        <p className="font-bold">{item.name[lang]}</p>
                        {item.desc[lang] && <p className="text-sm text-asphalt/60">{item.desc[lang]}</p>}
                        {item.price !== undefined && (
                          <Price value={item.price} lang={lang} className="mt-1 text-brand" />
                        )}
                      </div>
                      <AddToCartButton id={item.id} />
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((item, i) => (
                    <MenuItemCard key={item.id} item={item} lang={lang} priority={ci === 0 && i < 3} />
                  ))}
                </div>
              )}
            </section>
          );
        })}
      </div>
    </>
  );
}
