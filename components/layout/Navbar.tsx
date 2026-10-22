"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { TrendingUp, BarChart2, BookmarkCheck, LogIn, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import SearchBar from "@/components/home/SearchBar";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/90 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-7xl items-center gap-4 px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 text-white font-bold text-lg shrink-0">
          <TrendingUp className="h-5 w-5 text-blue-400" />
          <span className="hidden sm:block">Stock Docs</span>
        </Link>

        {/* Search - grows to fill space */}
        <div className="flex-1 max-w-lg">
          <SearchBar />
        </div>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-1">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/" className="gap-1.5">
              <BarChart2 className="h-4 w-4" />
              Markets
            </Link>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/portfolio" className="gap-1.5">
              <BookmarkCheck className="h-4 w-4" />
              Watchlist
            </Link>
          </Button>
        </div>

        {/* Auth */}
        {session ? (
          <div className="flex items-center gap-2">
            {session.user?.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={session.user.image}
                alt={session.user.name ?? "User"}
                className="h-7 w-7 rounded-full"
              />
            ) : (
              <User className="h-5 w-5 text-zinc-400" />
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => signOut({ callbackUrl: "/" })}
              className="gap-1.5"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:block">Sign out</span>
            </Button>
          </div>
        ) : (
          <Button variant="outline" size="sm" asChild>
            <Link href="/login" className="gap-1.5">
              <LogIn className="h-4 w-4" />
              Sign in
            </Link>
          </Button>
        )}
      </div>
    </nav>
  );
}
