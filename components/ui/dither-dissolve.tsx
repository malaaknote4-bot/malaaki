"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { startDither, type DitherTrigger } from "@/lib/dither";
import { cn } from "@/lib/utils";

// Reveals its area through a Bayer dither dissolve (see lib/dither.ts).
// `color` is a CSS colour token name (e.g. "paper") matching the surface behind it.
// Without children it is a bare overlay: give it "absolute inset-0" to cover its parent.
export function DitherDissolve({
  trigger = "view",
  color = "paper",
  className,
  children,
}: {
  trigger?: DitherTrigger;
  color?: string;
  className?: string;
  children?: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    return startDither(ref.current, trigger, color, trigger === "load" ? 1200 : 900);
  }, [trigger, color]);

  return (
    <div ref={ref} data-dither={trigger} data-dither-color={color} className={cn("relative", className)}>
      {/* "load" starts covered so the area doesn't flash before the dissolve; CSS lifts it if scripts never run. */}
      {trigger === "load" && (
        <div data-dither-cover className="dither-cover absolute inset-0" style={{ background: `var(--${color})` }} />
      )}
      {children}
    </div>
  );
}
