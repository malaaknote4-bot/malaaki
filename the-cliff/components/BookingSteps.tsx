"use client";

import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring } from "framer-motion";
import ArrowButton from "./ArrowButton";
import { airbnbLink } from "@/lib/airbnb";
import { bookingSteps } from "@/lib/content";
import { DURATION, EASE, RISE } from "@/lib/motion";

// Where each step starts along the line (columns start at 0, 1/3 and 2/3).
const THRESHOLDS = [0.03, 0.36, 0.69];

// One moss line runs across the three steps and fills as you scroll. Each step
// lights up when the line reaches it, and the buttons arrive last.
export default function BookingSteps() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 55%"] });
  const fill = useSpring(scrollYProgress, { stiffness: 60, damping: 22, restDelta: 0.001 });
  const [progress, setReached] = useState(0);

  useMotionValueEvent(fill, "change", (v) => {
    if (reduce) return;
    const next = v >= 0.97 ? 1 : v;
    setReached((prev) => Math.max(prev, next));
  });

  // Reduced motion, or a keyboard user tabbing in, sees everything lit at once.
  const reached = reduce ? 1 : progress;
  const lit = (i: number) => reached >= THRESHOLDS[i];
  const done = reached >= 0.97;

  return (
    <div ref={ref} className="mt-20 grid gap-12 md:grid-cols-4 md:gap-0" onFocusCapture={() => setReached(1)}>
      <div className="relative md:col-span-3">
        {/* Track and fill: vertical on phones, horizontal from md up */}
        <div aria-hidden="true" className="absolute left-0 top-0 h-full w-px bg-line-light md:h-px md:w-full">
          <motion.div
            className="absolute inset-0 origin-top bg-moss md:hidden"
            style={{ scaleY: reduce ? 1 : fill }}
          />
          <motion.div
            className="absolute inset-0 hidden origin-left bg-moss md:block"
            style={{ scaleX: reduce ? 1 : fill }}
          />
        </div>

        <ol className="grid gap-12 pl-8 md:grid-cols-3 md:gap-0 md:pl-0">
          {bookingSteps.map((s, i) => (
            <li key={s.title} className="pr-8 md:pt-8">
              <motion.span
                className="block font-serif text-6xl font-light md:text-7xl"
                animate={{ color: lit(i) ? "var(--color-moss)" : "rgba(255,255,255,0.18)" }}
                transition={{ duration: DURATION.slow, ease: EASE }}
              >
                0{i + 1}
              </motion.span>
              <motion.div
                animate={lit(i) ? { opacity: 1, y: 0 } : { opacity: 0.25, y: RISE / 2 }}
                transition={{ duration: DURATION.slow, ease: EASE }}
              >
                <h3 className="mt-6 text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 leading-relaxed text-white/60">{s.text}</p>
              </motion.div>
            </li>
          ))}
        </ol>
      </div>

      <motion.div
        className="flex flex-col gap-3 md:pl-8 md:pt-8"
        animate={done ? { opacity: 1, y: 0 } : { opacity: 0, y: RISE }}
        transition={{ duration: DURATION.slow, ease: EASE }}
      >
        <ArrowButton href="#book" className="w-full">
          Choose dates
        </ArrowButton>
        <a
          href={airbnbLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-semibold text-white/70 underline decoration-white/30 underline-offset-8 hover:text-white"
        >
          View the listing on Airbnb ↗
        </a>
      </motion.div>
    </div>
  );
}
