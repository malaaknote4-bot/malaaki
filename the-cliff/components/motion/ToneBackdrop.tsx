"use client";

import { useEffect, useRef } from "react";

// Section tones, matching the palette in globals.css.
const TONES: Record<string, [number, number, number]> = {
  bone: [0xf1, 0xef, 0xe9],
  paper: [0xf8, 0xf7, 0xf3],
  night: [0x0e, 0x13, 0x11],
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

  return <div ref={ref} aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 bg-bone" />;
}
