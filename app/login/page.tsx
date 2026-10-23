"use client";

import { signIn } from "next-auth/react";
import { TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  return (
    <div className="relative flex min-h-[calc(100vh-56px)] items-center justify-center overflow-hidden px-4">
      {/* Background gradient */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-background via-surface3 to-surface2 opacity-80" />
      {/* Accent glow */}
      <div className="pointer-events-none absolute top-1/3 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-3xl" />

      {/* Floating gain badges */}
      <span className="pointer-events-none absolute left-8 top-20 rounded-full border border-positive/30 bg-positive-dim px-3 py-1 text-xs font-semibold text-positive backdrop-blur-sm">
        ▲ NVDA +4.2%
      </span>
      <span className="pointer-events-none absolute right-8 top-32 rounded-full border border-accent/30 bg-accent-dim px-3 py-1 text-xs font-semibold text-accent-lt backdrop-blur-sm">
        ▲ AAPL +1.2%
      </span>
      <span className="pointer-events-none absolute left-12 bottom-40 rounded-full border border-negative/30 bg-negative-dim px-3 py-1 text-xs font-semibold text-negative backdrop-blur-sm">
        ▼ META −0.8%
      </span>

      {/* Card */}
      <div className="relative z-10 w-full max-w-sm text-center">
        {/* Logo mark */}
        <div className="mb-6 flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-accent shadow-[0_0_40px_rgba(67,97,238,0.4)]">
            <TrendingUp className="h-8 w-8 text-white" />
          </div>
        </div>

        <h1 className="mb-3 text-4xl font-bold tracking-tight text-foreground">
          Discover.<br />
          <span className="text-accent-lt">Track.</span><br />
          Achieve.
        </h1>
        <p className="mb-10 text-sm text-soft leading-relaxed max-w-xs mx-auto">
          Real-time prices, interactive charts, and financial news — all in one place.
        </p>

        <Button
          className="w-full h-12 gap-3 text-base shadow-[0_0_24px_rgba(67,97,238,0.3)]"
          onClick={() => signIn("google", { callbackUrl: "/" })}
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="rgba(255,255,255,0.9)"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="rgba(255,255,255,0.75)"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="rgba(255,255,255,0.6)"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="rgba(255,255,255,0.85)"/>
          </svg>
          Continue with Google
        </Button>

        <p className="mt-5 text-xs text-muted leading-relaxed">
          By continuing you agree to our Terms of Service &amp; Privacy Policy.
        </p>
      </div>
    </div>
  );
}
