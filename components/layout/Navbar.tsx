"use client";

import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { House, LogOut, User } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

const links = [
  { href: "/", label: "Home" },
  { href: "/meals", label: "Meals" },
  { href: "/activities", label: "Activities" },
  { href: "/stories", label: "Stories" },
];

function NavLinks({ pathname, className }: { pathname: string; className: string }) {
  return (
    <div className={className}>
      {links.map(({ href, label }) => {
        const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            className={`relative py-1 text-sm font-medium transition-colors ${
              active ? "text-foreground" : "text-soft hover:text-foreground"
            }`}
          >
            {label}
            {active && (
              <span className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-primary" />
            )}
          </Link>
        );
      })}
    </div>
  );
}

export default function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();

  if (pathname === "/login" || pathname === "/onboarding") return null;

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-6 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
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
        </Link>

        <NavLinks pathname={pathname} className="hidden md:flex flex-1 justify-center gap-8" />
        <div className="flex-1 md:hidden" />

        <div className="flex items-center gap-1.5">
          <ThemeToggle />
          {session ? (
            <>
              {session.user?.image ? (
                <Image
                  src={session.user.image}
                  alt={session.user.name ?? "User"}
                  width={34}
                  height={34}
                  className="h-[34px] w-[34px] rounded-full ring-2 ring-blush"
                />
              ) : (
                <span className="flex h-[34px] w-[34px] items-center justify-center rounded-full bg-muted">
                  <User className="h-4 w-4 text-soft" />
                </span>
              )}
              <button
                onClick={() => signOut({ callbackUrl: "/login" })}
                className="flex h-9 w-9 items-center justify-center rounded-full text-soft hover:bg-muted hover:text-foreground transition-colors"
                aria-label="Sign out"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="whitespace-nowrap rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-fg hover:opacity-90 transition-opacity"
            >
              Sign in
            </Link>
          )}
        </div>
      </div>

      <NavLinks
        pathname={pathname}
        className="md:hidden flex gap-6 overflow-x-auto px-4 pb-3"
      />
    </nav>
  );
}
