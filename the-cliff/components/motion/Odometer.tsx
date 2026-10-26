"use client";

import { motion } from "framer-motion";
import { DURATION, EASE, VIEWPORT } from "@/lib/motion";

const STRIP = Array.from({ length: 20 }, (_, i) => i % 10);

// Digits roll up like an odometer, each column turning through a full cycle
// before settling. The visible frame watches the viewport (the tall strips are
// mostly clipped, so they'd never count as in view). Screen readers get the value.
export default function Odometer({ value, delay = 0, className = "" }: { value: string; delay?: number; className?: string }) {
  return (
    <motion.span
      className={`inline-flex ${className}`}
      aria-label={value}
      role="img"
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
    >
      {value.split("").map((ch, i) => {
        const digit = Number(ch);
        if (Number.isNaN(digit)) return <span key={i} aria-hidden="true">{ch}</span>;
        return (
          <span key={i} aria-hidden="true" className="relative inline-block h-[1em] overflow-hidden leading-none">
            <span className="invisible block">0</span>
            <motion.span
              className="absolute inset-x-0 top-0 block"
              variants={{
                hidden: { y: "0em" },
                show: {
                  y: `-${digit + 10}em`,
                  transition: { duration: DURATION.slower + 0.4, ease: EASE, delay: delay + i * 0.1 },
                },
              }}
            >
              {STRIP.map((d, k) => (
                <span key={k} className="block h-[1em]">
                  {d}
                </span>
              ))}
            </motion.span>
          </span>
        );
      })}
    </motion.span>
  );
}
