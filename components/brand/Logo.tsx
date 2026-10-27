import { cn } from "@/lib/utils";

// Placeholder mark: a road-route shield with an "8".
// Replace with the official logo, e.g. <Image src="/logo.png" alt="Road 8" ... />.
export function RouteShield({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 72" className={className} aria-hidden="true">
      <path
        d="M32 2 C44 8 54 6 62 4 C64 26 60 52 32 70 C4 52 0 26 2 4 C10 6 20 8 32 2Z"
        fill="var(--brand)"
        stroke="var(--sun)"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <text
        x="32"
        y="47"
        textAnchor="middle"
        fontFamily="var(--font-lalezar), sans-serif"
        fontSize="38"
        fill="var(--cream)"
      >
        8
      </text>
    </svg>
  );
}

export default function Logo({ className, light = false }: { className?: string; light?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)} dir="ltr">
      <RouteShield className="h-10 w-9 shrink-0 drop-shadow-[0_3px_0_rgba(0,0,0,0.15)]" />
      <span
        className={cn(
          "font-display text-2xl leading-none tracking-wide",
          light ? "text-cream" : "text-asphalt",
        )}
      >
        ROAD<span className="text-brand"> 8</span>
      </span>
    </span>
  );
}
