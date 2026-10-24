export const dynamic = "force-dynamic";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { DAYS, weekMeals, alternatives, getEffectiveMeal } from "@/lib/data/meals";
import { morningActivities, afternoonActivities, eveningActivities } from "@/lib/data/activities";
import { stories } from "@/lib/data/stories";
import { Sparkle, PillLink, SectionTitle } from "@/components/ui/decor";

export default async function HomePage() {
  const session = await auth();
  if (!session) redirect("/login");

  const user = await db.user.findUnique({
    where: { id: session.user!.id },
    select: { onboardingDone: true, childFoodDislikes: true },
  });
  if (!user?.onboardingDone) redirect("/onboarding");

  const now = new Date();
  const dayIdx = now.getDay() === 0 ? 6 : now.getDay() - 1;
  const today = DAYS[dayIdx];
  const firstName = session.user?.name?.split(" ")[0] ?? "there";
  const dislikes = user.childFoodDislikes ?? [];

  const todayMeals = (["breakfast", "lunch", "dinner"] as const).map((k) => ({
    slot: k,
    meal: getEffectiveMeal(weekMeals[today][k], alternatives[k], dislikes, dayIdx),
  }));
  const tonight = stories[now.getDay()];
  const activityCount =
    morningActivities.length + afternoonActivities.length + eveningActivities.length;

  const cards = [
    { href: "/meals", emoji: "🍽️", title: "Weekly Meals", meta: "21 meals · 7 days", panel: "bg-peach" },
    { href: "/activities", emoji: "🪁", title: "Daily Activities", meta: `${activityCount} ideas today`, panel: "bg-sky" },
    { href: "/stories", emoji: "🌙", title: "Bedtime Stories", meta: `${stories.length} stories`, panel: "bg-blush" },
    { href: "/meals", emoji: todayMeals[2].meal.emoji, title: "Tonight's Dinner", meta: todayMeals[2].meal.name, panel: "bg-peach" },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-6 sm:py-10">
      {/* Hero */}
      <section className="grid gap-4 md:grid-cols-[1.05fr_1fr]">
        <div className="relative min-w-0 overflow-hidden rounded-[28px] bg-blush px-7 py-10 sm:px-10 sm:py-14 flex flex-col justify-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Hello, {firstName}
          </p>
          <h1 className="mt-3 font-display text-[52px] sm:text-[72px] leading-[0.92] text-primary">
            Make Today Lovely
          </h1>
          <p className="mt-4 max-w-xs text-lg text-foreground/85">
            Meals, play and a bedtime story — all planned for {today}.
          </p>
          <div className="mt-7">
            <PillLink href="/meals">See today&apos;s plan</PillLink>
          </div>
          <Sparkle className="absolute right-10 top-10 h-6 w-6" />
          <div className="dot-grid absolute bottom-8 right-10 hidden sm:block" />
        </div>

        {/* Today at a glance */}
        <div className="min-w-0 rounded-[28px] bg-card border border-border p-6 sm:p-8 flex flex-col">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <h2 className="font-display text-3xl text-foreground">Today&apos;s Table</h2>
            <span className="text-sm font-medium text-soft">
              {now.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" })}
            </span>
          </div>
          <ul className="mt-5 flex flex-col divide-y divide-border">
            {todayMeals.map(({ slot, meal }) => (
              <li key={slot} className="flex items-center gap-4 py-3.5">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-peach text-2xl">
                  {meal.emoji}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">
                    {slot}
                  </span>
                  <span className="block truncate font-semibold text-foreground">{meal.name}</span>
                </span>
              </li>
            ))}
          </ul>
          <Link
            href="/stories"
            className="mt-auto flex items-center gap-4 rounded-2xl bg-blush px-4 py-3.5 hover:opacity-90 transition-opacity"
          >
            <span className="text-2xl">{tonight.emoji}</span>
            <span className="min-w-0 flex-1">
              <span className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">
                Tonight&apos;s story
              </span>
              <span className="block truncate font-semibold text-foreground">{tonight.title}</span>
            </span>
            <ArrowRight className="h-4 w-4 text-primary" />
          </Link>
        </div>
      </section>

      {/* Explore cards */}
      <section className="mt-12">
        <SectionTitle>Plan Your Week</SectionTitle>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {cards.map((c) => (
            <Link
              key={c.title}
              href={c.href}
              className="group min-w-0 overflow-hidden rounded-[22px] bg-card border border-border hover:shadow-lg hover:-translate-y-0.5 transition-all"
            >
              <div className={`${c.panel} aspect-[4/3.6] flex items-center justify-center`}>
                <span className="text-6xl sm:text-7xl transition-transform group-hover:scale-105">{c.emoji}</span>
              </div>
              <div className="flex items-center gap-3 p-3.5 sm:p-4">
                <div className="min-w-0 flex-1">
                  <h3 className="font-display text-lg sm:text-xl leading-tight text-foreground">{c.title}</h3>
                  <p className="mt-0.5 truncate text-sm font-semibold text-primary">{c.meta}</p>
                </div>
                <span className="hidden sm:flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-fg">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Week progress */}
        <div className="mt-8 flex items-center gap-4">
          <div className="h-[3px] flex-1 rounded-full bg-primary-dim">
            <div
              className="h-full rounded-full bg-primary"
              style={{ width: `${((dayIdx + 1) / 7) * 100}%` }}
            />
          </div>
          <span className="shrink-0 text-xs font-semibold uppercase tracking-[0.16em] text-soft">
            Day {dayIdx + 1} of 7
          </span>
        </div>
      </section>

      {/* Closing band */}
      <section className="mt-12 grid gap-4 md:grid-cols-[1fr_1.1fr] items-stretch">
        <div className="relative overflow-hidden rounded-[28px] bg-peach min-h-64 flex items-center justify-center">
          <span className="text-[120px] leading-none">🧸</span>
          <span className="absolute left-8 top-8 text-4xl">🌷</span>
          <span className="absolute right-10 bottom-8 text-4xl">📚</span>
        </div>
        <div className="relative min-w-0 flex flex-col justify-center px-2 sm:px-6 py-4">
          <h2 className="font-display text-5xl sm:text-6xl leading-[0.95] text-primary">
            Made for Real Family Life
          </h2>
          <Sparkle className="absolute right-4 top-4 h-5 w-5" />
          <p className="mt-4 max-w-sm text-base text-foreground/80">
            You are doing an amazing job. Pick one thing from today&apos;s plan — that&apos;s already a good day.
          </p>
          <div className="mt-6">
            <PillLink href="/stories" variant="outline">Read tonight&apos;s story</PillLink>
          </div>
        </div>
      </section>
    </div>
  );
}
