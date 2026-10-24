export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { auth } from "@/lib/auth";
import { findMealBySlug } from "@/lib/data/meals";
import { Sparkle, SectionTitle, PillLink } from "@/components/ui/decor";
import IngredientList from "./IngredientList";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const meal = findMealBySlug(slug);
  return { title: meal ? `${meal.name} · Mum's Corner` : "Recipe · Mum's Corner" };
}

export default async function RecipePage({ params }: Props) {
  const session = await auth();
  if (!session) redirect("/login");

  const { slug } = await params;
  const meal = findMealBySlug(slug);
  if (!meal) notFound();

  const { servings } = meal;
  const facts = [
    { label: "Serves", value: String(servings.serves) },
    { label: "Time", value: meal.time },
    { label: "Ingredients", value: String(meal.ingredients.length) },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-6 sm:py-10">
      <Link
        href="/meals"
        className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-soft hover:text-primary transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        This week&apos;s meals
      </Link>

      <header className="grid gap-4 md:grid-cols-[1fr_1.25fr]">
        <div className="relative flex min-h-56 items-center justify-center overflow-hidden rounded-[28px] bg-peach">
          <span className="text-[112px] leading-none sm:text-[140px]">{meal.emoji}</span>
          <Sparkle className="absolute right-7 top-7 h-6 w-6" />
          <div className="dot-grid absolute bottom-6 left-7 hidden sm:block" />
        </div>
        <div className="min-w-0 rounded-[28px] bg-blush px-6 py-8 sm:px-10 sm:py-10 flex flex-col justify-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Recipe</p>
          <h1 className="mt-2 font-display text-[42px] leading-[0.95] text-primary sm:text-6xl">{meal.name}</h1>
          <p className="mt-3 text-foreground/80">{meal.note}</p>
          <dl className="mt-6 grid grid-cols-3 gap-2 sm:gap-3">
            {facts.map((f) => (
              <div key={f.label} className="min-w-0 rounded-2xl bg-card/70 px-3 py-3 sm:px-4">
                <dt className="text-[10px] font-semibold uppercase tracking-[0.16em] text-soft">{f.label}</dt>
                <dd className="mt-0.5 truncate font-display text-xl text-foreground sm:text-2xl">{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </header>

      {/* Serving sizes */}
      <section
        aria-label="Serving sizes"
        className="mt-4 flex flex-wrap items-center gap-x-8 gap-y-3 rounded-[22px] border border-border bg-card px-6 py-4"
      >
        <p className="font-semibold text-foreground">
          Serves {servings.serves} <span className="font-normal text-soft">— 2 adults + 2 kids</span>
        </p>
        <p className="text-sm text-soft">
          Adult portion <span className="font-semibold text-primary">≈ {servings.adultPortion} g</span>
        </p>
        <p className="text-sm text-soft">
          Child portion <span className="font-semibold text-primary">≈ {servings.childPortion} g</span>
        </p>
      </section>

      <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,400px)_1fr]">
        <section className="min-w-0">
          <SectionTitle aside={<span className="text-sm text-soft">Tap to tick off</span>}>Ingredients</SectionTitle>
          <IngredientList ingredients={meal.ingredients} />
        </section>

        <section className="min-w-0">
          <SectionTitle>Method</SectionTitle>
          <ol className="flex flex-col">
            {meal.steps.map((step, i) => (
              <li key={i} className="flex gap-4 border-b border-border py-4 first:pt-0 last:border-b-0">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary font-semibold text-primary-fg">
                  {i + 1}
                </span>
                <p className="pt-1.5 text-[16px] leading-relaxed text-foreground">{step}</p>
              </li>
            ))}
          </ol>
        </section>
      </div>

      <div className="mt-12 flex justify-center">
        <PillLink href="/meals" variant="outline">Back to the meal plan</PillLink>
      </div>
    </div>
  );
}
