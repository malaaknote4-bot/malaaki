"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { DURATION, EASE, VIEWPORT } from "@/lib/motion";

type From = "left" | "right" | "bottom";

// Where the curtain starts: it opens from this side across the frame.
const CLOSED: Record<From, string> = {
  left: "inset(0% 100% 0% 0%)",
  right: "inset(0% 0% 0% 100%)",
  bottom: "inset(100% 0% 0% 0%)",
};
const OPEN = "inset(0% 0% 0% 0%)";

// Pattern 2: a curtain opens over the photo while it settles from a slight zoom,
// like mist lifting. `className` sizes the frame; the image fills it.
// The unclipped outer frame watches the viewport, since a fully clipped element
// never reports as visible.
export default function ImageUnveil({
  from = "left",
  delay = 0,
  className = "",
  children,
}: {
  from?: From;
  delay?: number;
  className?: string;
  children: React.ReactNode;
}) {
  const reduce = useReducedMotion();
  const transition = { duration: DURATION.slower, ease: EASE, delay };

  const curtain: Variants = reduce
    ? { hidden: { opacity: 0 }, show: { opacity: 1, transition } }
    : { hidden: { clipPath: CLOSED[from] }, show: { clipPath: OPEN, transition } };
  const settle: Variants = {
    hidden: { scale: 1.08 },
    show: { scale: 1, transition: { ...transition, duration: DURATION.slower + 0.4 } },
  };

  return (
    <motion.div className={`relative ${className}`} initial="hidden" whileInView="show" viewport={VIEWPORT}>
      <motion.div className="absolute inset-0 overflow-hidden" variants={curtain}>
        <motion.div className="absolute inset-0" variants={settle}>
          {children}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
