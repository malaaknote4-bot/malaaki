import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { RouteShield } from "@/components/brand/Logo";
import FoodImage from "@/components/ui/FoodImage";
import OrderNowButton from "./OrderNowButton";
import { dictionaries, type Locale } from "@/lib/i18n";
import { heroImage } from "@/lib/menu";

const stickerStyles = [
  "bg-sun text-asphalt -rotate-6 top-6 start-0 sm:-start-4",
  "bg-leaf text-white rotate-6 top-1/2 end-0 sm:-end-4",
  "bg-white text-brand -rotate-3 bottom-6 start-6",
];

export default function Hero({ lang }: { lang: Locale }) {
  const t = dictionaries[lang].hero;
  const Arrow = lang === "ar" ? ArrowLeft : ArrowRight;

  return (
    <section className="relative overflow-hidden bg-brand text-white">
      <div className="pointer-events-none absolute inset-0 opacity-[0.12] [background-image:radial-gradient(#fff_2px,transparent_2px)] [background-size:26px_26px]" />
      <div className="pointer-events-none absolute -bottom-40 -end-40 size-[36rem] rounded-full bg-sun/90" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 pb-16 pt-10 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:pb-24 lg:pt-16">
        <div className="space-y-6 text-center lg:text-start">
          <span className="inline-flex items-center gap-2 rounded-full bg-asphalt px-4 py-1.5 text-sm font-bold text-sun">
            <RouteShield className="h-5 w-4" />
            {t.kicker}
          </span>
          <h1 className="font-display text-6xl leading-[0.95] drop-shadow-[0_4px_0_rgba(0,0,0,0.18)] sm:text-7xl lg:text-8xl">
            {t.title1}
            <br />
            <span className="text-sun">{t.title2}</span>
          </h1>
          <p className="mx-auto max-w-xl text-lg text-white/90 sm:text-xl lg:mx-0">{t.subtitle}</p>
          <div className="flex flex-wrap justify-center gap-3 lg:justify-start">
            <OrderNowButton label={t.ctaOrder} />
            <Link
              href={`/${lang}/menu`}
              className="inline-flex h-14 items-center gap-2 rounded-full border-2 border-white/80 px-7 text-lg font-bold transition hover:bg-white hover:text-brand"
            >
              {t.ctaMenu}
              <Arrow className="size-5" />
            </Link>
          </div>
        </div>

        <div className="relative mx-auto aspect-square w-full max-w-[34rem]">
          <div className="absolute inset-4 rounded-full bg-asphalt shadow-[0_30px_60px_-20px_rgba(0,0,0,0.5)]" />
          <div className="absolute inset-4 overflow-hidden rounded-full ring-8 ring-sun">
            <FoodImage
              src={heroImage}
              alt="Road 8 burger"
              fill
              priority
              sizes="(min-width: 1024px) 34rem, 90vw"
              className="object-cover"
            />
          </div>
          {t.stickers.map((s, i) => (
            <span
              key={s}
              style={{ animationDelay: `${i * 0.7}s` }}
              className={`animate-float absolute rounded-2xl px-4 py-2 font-display text-xl shadow-lg sm:text-2xl ${stickerStyles[i]}`}
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
