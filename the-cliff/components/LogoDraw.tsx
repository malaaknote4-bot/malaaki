"use client";

import { motion } from "framer-motion";
import { DURATION, EASE, VIEWPORT } from "@/lib/motion";

// The footer mark draws itself in (frame, then horizon), then the cliff fills
// and the wordmark fades up. Plays once.
export default function LogoDraw() {
  const draw = (delay: number) => ({
    hidden: { pathLength: 0 },
    show: { pathLength: 1, transition: { duration: DURATION.slower, ease: EASE, delay } },
  });

  return (
    <motion.span className="inline-flex items-center gap-3" initial="hidden" whileInView="show" viewport={VIEWPORT}>
      <svg width="30" height="30" viewBox="0 0 30 30" fill="none" aria-hidden="true">
        <motion.rect x="1" y="1" width="28" height="28" stroke="currentColor" strokeWidth="1.5" variants={draw(0)} />
        <motion.path d="M1 12h28" stroke="currentColor" strokeWidth="1.5" variants={draw(0.6)} />
        <motion.path
          d="M1 12h11l4 7 2 10H1z"
          fill="currentColor"
          variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: DURATION.base, ease: EASE, delay: 1.4 } } }}
        />
      </svg>
      <motion.span
        className="text-[13px] font-semibold uppercase tracking-[0.32em]"
        variants={{ hidden: { opacity: 0, x: -6 }, show: { opacity: 1, x: 0, transition: { duration: DURATION.slow, ease: EASE, delay: 1.6 } } }}
      >
        The Cliff
      </motion.span>
    </motion.span>
  );
}
