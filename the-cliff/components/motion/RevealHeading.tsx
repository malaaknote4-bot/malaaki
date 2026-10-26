"use client";

import { motion, type Variants } from "framer-motion";
import { DURATION, EASE, ITALIC_DELAY, RISE, VIEWPORT } from "@/lib/motion";

type Props = {
  eyebrow?: string;
  // One entry per line. The last line is treated as the italic closing phrase.
  lines: React.ReactNode[];
  text?: string;
  dark?: boolean;
  as?: "h1" | "h2";
  className?: string;
  titleClassName?: string;
};

const LINE_STAGGER = 0.12;

// Pattern 1: the label fades in, then each line of the serif headline rises out of
// a mask, with the italic phrase landing last.
export default function RevealHeading({
  eyebrow,
  lines,
  text,
  dark = false,
  as = "h2",
  className = "max-w-3xl",
  titleClassName = "mt-5 font-serif text-[clamp(2.4rem,5vw,4.2rem)] leading-[1.02] font-light tracking-[-0.02em]",
}: Props) {
  const Title = as === "h1" ? motion.h1 : motion.h2;
  const lineDelay = (i: number) =>
    (eyebrow ? 0.3 : 0) + i * LINE_STAGGER + (i === lines.length - 1 && lines.length > 1 ? ITALIC_DELAY : 0);
  const afterLines = lineDelay(lines.length - 1) + 0.35;

  const line: Variants = {
    hidden: { y: RISE * 1.6, opacity: 0 },
    show: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: { duration: DURATION.slow, ease: EASE, delay: lineDelay(i) },
    }),
  };

  return (
    <motion.div className={className} initial="hidden" whileInView="show" viewport={VIEWPORT}>
      {eyebrow && (
        <motion.p
          className={`text-[11px] font-semibold uppercase tracking-[0.28em] ${dark ? "text-moss" : "text-ink-soft"}`}
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { duration: DURATION.base, ease: EASE } },
          }}
        >
          {eyebrow}
        </motion.p>
      )}
      <Title className={titleClassName}>
        {lines.map((l, i) => (
          <span key={i} className="block overflow-hidden pb-[0.14em] -mb-[0.14em]">
            <motion.span className="block" custom={i} variants={line}>
              {l}
            </motion.span>
          </span>
        ))}
      </Title>
      {text && (
        <motion.p
          className={`mt-6 max-w-xl text-lg leading-relaxed ${dark ? "text-white/65" : "text-ink-soft"}`}
          variants={{
            hidden: { opacity: 0, y: RISE },
            show: { opacity: 1, y: 0, transition: { duration: DURATION.slow, ease: EASE, delay: afterLines } },
          }}
        >
          {text}
        </motion.p>
      )}
    </motion.div>
  );
}
