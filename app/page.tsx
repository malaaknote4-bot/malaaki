export const dynamic = "force-dynamic";

import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { DAYS } from "@/lib/data/meals";

export default async function HomePage() {
  const session = await auth();
  if (!session) redirect("/login");

  const day = new Date().getDay();
  const today = DAYS[day === 0 ? 6 : day - 1];
  const firstName = session.user?.name?.split(" ")[0] ?? "there";

  const cards = [
    {
      href: "/meals",
      emoji: "🍽️",
      title: "Meal Plans",
      subtitle: "This Week",
      description: "Breakfast, lunch & dinner planned out for every day",
      bg: "bg-meals-dim",
      iconBg: "bg-meals",
      border: "border-meals/20",
      badge: today,
    },
    {
      href: "/activities",
      emoji: "🎯",
      title: "Activities",
      subtitle: "Today",
      description: "Morning, afternoon & evening ideas for the whole family",
      bg: "bg-activities-dim",
      iconBg: "bg-activities",
      border: "border-activities/20",
      badge: "14 ideas",
    },
    {
      href: "/stories",
      emoji: "📖",
      title: "Bedtime Story",
      subtitle: "Tonight",
      description: "A new magical story chosen for you every single night",
      bg: "bg-stories-dim",
      iconBg: "bg-stories",
      border: "border-stories/20",
      badge: "New tonight",
    },
  ];

  return (
    <div className="relative overflow-hidden min-h-[calc(100vh-56px)]">
      {/* Background blobs */}
      <div className="blob h-72 w-72 bg-amber-200 -top-10 -right-10" />
      <div className="blob h-56 w-56 bg-pink-100 bottom-20 -left-10" />

      <div className="relative z-10 mx-auto max-w-2xl px-4 py-8">
        {/* Greeting */}
        <div className="mb-8">
          <p className="text-base font-semibold text-soft">Hello 👋</p>
          <h1 className="text-3xl font-black text-foreground">
            {firstName}!
          </h1>
          <p className="mt-1 text-sm font-medium text-soft">
            Today is {new Date().toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" })}
          </p>
        </div>

        {/* Feature cards */}
        <div className="flex flex-col gap-4">
          {cards.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className={`group relative flex items-center gap-4 rounded-3xl border p-5 ${card.bg} ${card.border} shadow-sm hover:shadow-md active:scale-[0.99] transition-all`}
            >
              {/* Icon */}
              <div className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl ${card.iconBg} shadow-sm`}>
                <span className="text-3xl">{card.emoji}</span>
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="font-black text-lg text-foreground">{card.title}</span>
                  <span className="rounded-full bg-card px-2 py-0.5 text-xs font-bold text-soft shadow-sm">
                    {card.badge}
                  </span>
                </div>
                <p className="text-sm font-medium text-soft leading-snug">{card.description}</p>
              </div>

              {/* Arrow */}
              <div className="shrink-0 text-soft text-xl font-bold group-hover:translate-x-0.5 transition-transform">›</div>
            </Link>
          ))}
        </div>

        {/* Quick quote */}
        <div className="mt-8 rounded-3xl bg-card border border-border p-5 text-center shadow-sm">
          <p className="text-2xl mb-2">✨</p>
          <p className="text-sm font-semibold text-soft italic">
            &ldquo;You are doing an amazing job. One day at a time.&rdquo;
          </p>
        </div>
      </div>
    </div>
  );
}
