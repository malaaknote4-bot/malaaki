import AddToCartButton from "@/components/cart/AddToCartButton";
import FoodImage from "@/components/ui/FoodImage";
import { dictionaries, formatPrice, type Locale } from "@/lib/i18n";
import type { MenuItem, Tag } from "@/lib/menu";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

const tagStyles: Record<Tag, string> = {
  bestseller: "bg-sun text-asphalt",
  new: "bg-leaf text-white",
  spicy: "bg-brand text-white",
};
const tagEmoji: Record<Tag, string> = { bestseller: "⭐", new: "✨", spicy: "🌶️" };

export function TagPill({ tag, lang }: { tag: Tag; lang: Locale }) {
  return (
    <span className={cn("rounded-full px-3 py-1 text-xs font-bold shadow-sm", tagStyles[tag])}>
      {tagEmoji[tag]} {dictionaries[lang].tags[tag]}
    </span>
  );
}

export default function MenuItemCard({
  item,
  lang,
  size = "md",
  priority = false,
}: {
  item: MenuItem;
  lang: Locale;
  size?: "md" | "lg";
  priority?: boolean;
}) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-[2rem] bg-white shadow-[0_10px_30px_-15px_rgba(30,26,25,0.35)] ring-1 ring-asphalt/5 transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_40px_-18px_rgba(228,49,43,0.45)]">
      <div className={cn("relative overflow-hidden bg-cream-2", size === "lg" ? "aspect-[4/3.4]" : "aspect-[4/3]")}>
        <FoodImage
          src={item.image}
          alt={item.name[lang]}
          fill
          priority={priority}
          sizes={size === "lg" ? "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"}
          className="object-cover transition duration-500 group-hover:rotate-1 group-hover:scale-110"
        />
        {item.tags && (
          <div className="absolute start-3 top-3 flex flex-wrap gap-1.5">
            {item.tags.map((tag) => <TagPill key={tag} tag={tag} lang={lang} />)}
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <h3 className="font-display text-2xl leading-tight">{item.name[lang]}</h3>
        <p className="flex-1 text-sm leading-relaxed text-asphalt/65">{item.desc[lang]}</p>
        <div className="mt-2 flex items-center justify-between gap-3">
          <span className="text-lg font-black text-brand">{formatPrice(item.price, lang, site.currency)}</span>
          <AddToCartButton id={item.id} />
        </div>
      </div>
    </article>
  );
}
