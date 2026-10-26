"use client";

import { motion } from "framer-motion";
import { DURATION, EASE, RISE, VIEWPORT } from "@/lib/motion";

// Pattern 3, the site's signature: a thin rule draws left to right.
export function Hairline({
  delay = 0,
  className = "bg-line",
  vertical = false,
}: {
  delay?: number;
  className?: string;
  vertical?: boolean;
}) {
  return (
    <motion.div
      aria-hidden="true"
      className={`${vertical ? "w-px origin-top" : "h-px w-full origin-left"} ${className}`}
      initial={vertical ? { scaleY: 0 } : { scaleX: 0 }}
      whileInView={vertical ? { scaleY: 1 } : { scaleX: 1 }}
      viewport={VIEWPORT}
      transition={{ duration: DURATION.slow, ease: EASE, delay }}
    />
  );
}

// A hairline that draws, then the content beneath it rises into place.
export function Ruled({
  delay = 0,
  lineClassName,
  className = "",
  contentClassName = "",
  as = "div",
  children,
}: {
  delay?: number;
  lineClassName?: string;
  className?: string;
  contentClassName?: string;
  as?: "div" | "li";
  children: React.ReactNode;
}) {
  const Tag = as;
  return (
    <Tag className={className}>
      <Hairline delay={delay} className={lineClassName} />
      <motion.div
        className={contentClassName}
        initial={{ opacity: 0, y: RISE }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={VIEWPORT}
        transition={{ duration: DURATION.slow, ease: EASE, delay: delay + 0.55 }}
      >
        {children}
      </motion.div>
    </Tag>
  );
}
