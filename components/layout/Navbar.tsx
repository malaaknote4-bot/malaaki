"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { LogOut, User, ChevronLeft } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import Image from "next/image";

export default function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const router = useRouter();

  const isHome = pathname === "/";
  const isLogin = pathname === "/login";

  if (isLogin) return null;

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-card/90 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-2xl items-center gap-3 px-4">
        {/* Back button on sub-pages */}
        {!isHome ? (
          <button
            onClick={() => router.back()}
            className="flex items-center gap-1 rounded-full px-3 py-1.5 text-sm font-semibold text-foreground hover:bg-muted transition-colors shrink-0"
          >
            <ChevronLeft className="h-4 w-4" />
            Back
          </button>
        ) : (
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <span className="text-xl">🏡</span>
            <span className="font-black text-lg text-foreground tracking-tight">
              Mum&apos;s Corner
            </span>
          </Link>
        )}

        <div className="flex-1" />

        {/* Theme toggle */}
        <ThemeToggle />

        {/* Auth */}
        {session ? (
          <div className="flex items-center gap-2">
            {session.user?.image ? (
              <Image
                src={session.user.image}
                alt={session.user.name ?? "User"}
                width={32}
                height={32}
                className="h-8 w-8 rounded-full ring-2 ring-border"
              />
            ) : (
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                <User className="h-4 w-4 text-soft" />
              </div>
            )}
            <button
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-semibold text-soft hover:bg-muted hover:text-foreground transition-colors"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:block">Sign out</span>
            </button>
          </div>
        ) : (
          <Link
            href="/login"
            className="rounded-full bg-primary px-4 py-1.5 text-sm font-bold text-white hover:opacity-90 transition-opacity"
          >
            Sign in
          </Link>
        )}
      </div>
    </nav>
  );
}
