import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function Sparkle({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`text-primary ${className}`} aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 0c.6 6.4 5.6 11.4 12 12-6.4.6-11.4 5.6-12 12-.6-6.4-5.6-11.4-12-12C6.4 11.4 11.4 6.4 12 0z"
      />
    </svg>
  );
}

export function PillLink({
  href,
  children,
  variant = "solid",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "solid" | "outline";
}) {
  const styles =
    variant === "solid"
      ? "bg-primary text-primary-fg hover:opacity-90"
      : "border border-primary text-primary hover:bg-primary-dim";
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all ${styles}`}
    >
      {children}
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}

export function SectionTitle({
  children,
  aside,
}: {
  children: React.ReactNode;
  aside?: React.ReactNode;
}) {
  return (
    <div className="mb-5 flex items-end justify-between gap-4">
      <h2 className="flex items-center gap-3 font-display text-3xl sm:text-4xl leading-none text-primary">
        <Sparkle className="h-5 w-5 shrink-0" />
        {children}
      </h2>
      {aside}
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
}) {
  return (
    <header className="relative mb-8 overflow-hidden rounded-[28px] bg-blush px-6 py-8 sm:px-10 sm:py-10">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">{eyebrow}</p>
      <h1 className="mt-2 max-w-xl font-display text-[44px] sm:text-6xl leading-[0.95] text-primary">
        {title}
      </h1>
      <p className="mt-3 max-w-md text-base text-foreground/80">{subtitle}</p>
      <Sparkle className="absolute right-8 top-7 h-6 w-6" />
      <div className="dot-grid absolute bottom-6 right-8 hidden sm:block" />
    </header>
  );
}
