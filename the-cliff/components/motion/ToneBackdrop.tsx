"use client";

import { useEffect, useRef } from "react";

// Section tones: three close shades of forest night, so moving between sections
// reads as one slow gradient rather than a change of colour.
const TONES: Record<string, [number, number, number]> = {
  bone: [0x0e, 0x13, 0x11],
  paper: [0x13, 0x1b, 0x17],
  night: [0x0a, 0x0e, 0x0d],
};

// The blend runs while a section boundary rises from 85% to 45% of the screen
// height, so the next section's tone has settled before its heading arrives.
const BLEND_START = 0.85;
const BLEND_END = 0.45;

// Pattern 4, the tonal crossfade: one fixed backdrop sits behind every
// [data-tone] section and blends between their colours around each boundary as
// you scroll, so light and dark sections dissolve into each other like dusk
// falling, instead of cutting.
export default function ToneBackdrop() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame: number | null = null;

    const paint = () => {
      frame = null;
      const el = ref.current;
      const sections = [...document.querySelectorAll<HTMLElement>("[data-tone]")];
      if (!el || sections.length === 0) return;

      const h = window.innerHeight;
      const start = h * BLEND_START;
      const end = h * BLEND_END;
      // Default: the tone of the section whose boundary hasn't yet risen past the blend.
      const current = sections.find((s) => s.getBoundingClientRect().bottom > end) ?? sections[sections.length - 1];
      let color = TONES[current.dataset.tone!];

      for (let i = 0; i < sections.length - 1; i++) {
        const boundary = sections[i].getBoundingClientRect().bottom;
        // Only blend between sections that touch.
        if (Math.abs(boundary - sections[i + 1].getBoundingClientRect().top) > 2) continue;
        const t = (start - boundary) / (start - end);
        if (t > 0 && t < 1) {
          const a = TONES[sections[i].dataset.tone!];
          const b = TONES[sections[i + 1].dataset.tone!];
          const e = t * t * (3 - 2 * t);
          color = [0, 1, 2].map((k) => Math.round(a[k] + (b[k] - a[k]) * e)) as [number, number, number];
          break;
        }
      }
      el.style.backgroundColor = `rgb(${color.join(",")})`;
    };

    const schedule = () => {
      if (frame === null) frame = requestAnimationFrame(paint);
    };

    paint();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      if (frame !== null) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return (
    <div ref={ref} aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 bg-bone">
      {/* A soft moss glow from above, so the whole page shares one gradient. */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_70%_at_50%_0%,rgba(140,154,128,0.10),transparent_60%)]" />
    </div>
  );
}
