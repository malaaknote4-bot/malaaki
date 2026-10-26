"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

// The photo drifts gently inside its frame as the page scrolls, like looking
// through a window. Axis "y" drifts vertically; "x" pans sideways like a panorama.
export default function Parallax({
  axis = "y",
  distance = 4,
  scale = 1.12,
  children,
}: {
  axis?: "x" | "y";
  // Percentage of the frame the photo travels to each side.
  distance?: number;
  scale?: number;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const shift = useTransform(scrollYProgress, [0, 1], [`-${distance}%`, `${distance}%`]);

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute inset-0"
        style={reduce ? undefined : { scale, [axis]: shift }}
      >
        {children}
      </motion.div>
    </div>
  );
}
