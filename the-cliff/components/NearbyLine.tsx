"use client";

import { motion, type Variants } from "framer-motion";
import { experiences } from "@/lib/content";
import { DURATION, EASE, RISE, VIEWPORT } from "@/lib/motion";

const LINE_DURATION = 2;

// One continuous line draws across the nearby attractions, and each one rises
// as the line reaches it. Horizontal from md up, vertical on phones.
export default function NearbyLine() {
  const step = LINE_DURATION / experiences.length;
  const item: Variants = {
    hidden: { opacity: 0, y: RISE },
    show: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: DURATION.slow, ease: EASE, delay: 0.15 + i * step },
    }),
  };
  const draw = { duration: LINE_DURATION, ease: [0.45, 0, 0.55, 1] as const };

  return (
    <motion.div
      className="relative md:col-span-4 md:mt-20"
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
    >
      <motion.div
        aria-hidden="true"
        className="absolute left-0 top-0 hidden h-px w-full origin-left bg-line md:block"
        variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: draw } }}
      />
      <motion.div
        aria-hidden="true"
        className="absolute left-0 top-0 h-full w-px origin-top bg-line md:hidden"
        variants={{ hidden: { scaleY: 0 }, show: { scaleY: 1, transition: draw } }}
      />
      <ul className="pl-6 md:grid md:grid-cols-4 md:pl-0">
        {experiences.map((e, i) => (
          <motion.li key={e.title} custom={i} variants={item} className="py-6 pr-6">
            <h3 className="font-semibold">{e.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">{e.text}</p>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}
