"use client";

import { signIn } from "next-auth/react";
import { House } from "lucide-react";
import { Sparkle } from "@/components/ui/decor";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-background px-4 py-6 sm:px-6 sm:py-10">
      <div className="mx-auto flex max-w-6xl items-center gap-2.5">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-fg">
          <House className="h-[18px] w-[18px]" strokeWidth={2.25} />
        </span>
        <span className="leading-none">
          <span className="block text-[17px] font-semibold tracking-[0.08em] uppercase text-foreground">
            Mum&apos;s Corner
          </span>
          <span className="block mt-1 text-[9px] font-medium tracking-[0.28em] uppercase text-soft">
            Family Planner
          </span>
        </span>
      </div>

      <div className="mx-auto mt-8 grid max-w-6xl gap-4 md:grid-cols-[1.05fr_1fr]">
        <div className="relative overflow-hidden rounded-[28px] bg-blush px-7 py-12 sm:px-12 sm:py-16">
          <h1 className="font-display text-[56px] sm:text-[80px] leading-[0.9] text-primary">
            Plan Your Family Day
          </h1>
          <p className="mt-5 max-w-sm text-lg text-foreground/85">
            Weekly meals, daily activities and a new bedtime story every night.
          </p>

          <button
            onClick={() => signIn("google", { callbackUrl: "/" })}
            className="mt-8 inline-flex items-center gap-3 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-fg hover:opacity-90 active:scale-[0.98] transition-all"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" aria-hidden="true">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="currentColor" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="currentColor" opacity=".8" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="currentColor" opacity=".65" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="currentColor" opacity=".9" />
            </svg>
            Continue with Google
          </button>
          <p className="mt-4 text-sm text-soft">New here? Your account is created when you sign in.</p>

          <Sparkle className="absolute right-10 top-10 h-6 w-6" />
          <div className="dot-grid absolute bottom-8 right-10 hidden sm:block" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          {[
            { emoji: "🥞", label: "Meals", panel: "bg-peach" },
            { emoji: "🪁", label: "Activities", panel: "bg-sky" },
            { emoji: "🌙", label: "Stories", panel: "bg-sky" },
            { emoji: "🧸", label: "Together", panel: "bg-peach" },
          ].map((t) => (
            <div
              key={t.label}
              className={`${t.panel} flex aspect-square flex-col items-center justify-center gap-3 rounded-[22px]`}
            >
              <span className="text-6xl sm:text-7xl">{t.emoji}</span>
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">{t.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
