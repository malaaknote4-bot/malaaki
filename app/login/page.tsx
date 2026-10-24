"use client";

import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4">
      {/* Decorative blobs */}
      <div className="blob h-64 w-64 bg-amber-300 -top-10 -left-10" />
      <div className="blob h-48 w-48 bg-pink-300 top-1/4 -right-8" />
      <div className="blob h-56 w-56 bg-green-200 bottom-10 -left-8" />
      <div className="blob h-40 w-40 bg-violet-300 -bottom-6 right-10" />
      <div className="blob h-32 w-32 bg-sky-200 top-10 left-1/3" />

      <div className="relative z-10 w-full max-w-sm text-center">

        {/* Logo */}
        <div className="mb-6">
          <div className="mb-3 flex justify-center">
            <span className="text-7xl drop-shadow-md">🏡</span>
          </div>
          <h1 className="text-4xl font-black text-foreground tracking-tight">
            Mum&apos;s Corner
          </h1>
          <p className="mt-2 text-base font-semibold text-soft">
            Meals · Activities · Stories
          </p>
        </div>

        {/* Card */}
        <div className="rounded-3xl bg-card shadow-xl p-8">
          <p className="mb-6 text-sm font-medium text-soft">
            Sign in to see your family plan for today 🌸
          </p>

          {/* Google Sign In */}
          <button
            onClick={() => signIn("google", { callbackUrl: "/" })}
            className="w-full flex items-center justify-center gap-3 rounded-2xl bg-primary py-4 font-black text-white text-base shadow-lg hover:opacity-90 active:scale-95 transition-all"
          >
            {/* Google G */}
            <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" aria-hidden="true">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="rgba(255,255,255,0.9)" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="rgba(255,255,255,0.75)" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="rgba(255,255,255,0.6)" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="rgba(255,255,255,0.85)" />
            </svg>
            Continue with Google
          </button>

          <p className="mt-5 text-xs text-soft">
            New here? Your account is created automatically when you sign in with Google. 🎉
          </p>
        </div>

        {/* Emoji decorations */}
        <div className="mt-8 flex justify-center gap-6 text-3xl">
          <span className="animate-bounce" style={{ animationDelay: "0ms" }}>🍽️</span>
          <span className="animate-bounce" style={{ animationDelay: "150ms" }}>🎯</span>
          <span className="animate-bounce" style={{ animationDelay: "300ms" }}>📖</span>
        </div>
      </div>
    </div>
  );
}
