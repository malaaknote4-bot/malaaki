"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";

type Segment = { text: string; italic?: boolean };

// A paragraph that fills in word by word as it scrolls through the viewport.
export default function ScrollWords({ segments, className = "" }: { segments: Segment[]; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 45%"] });

  const words = segments.flatMap((s) => s.text.split(" ").filter(Boolean).map((w) => ({ w, italic: s.italic })));

  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => (
        <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} italic={word.italic} still={!!reduce}>
          {word.w}
        </Word>
      ))}
    </p>
  );
}

function Word({
  progress,
  range,
  italic,
  still,
  children,
}: {
  progress: MotionValue<number>;
  range: [number, number];
  italic?: boolean;
  // Reduced motion: show the word fully instead of filling it in.
  still: boolean;
  children: string;
}) {
  const fill = useTransform(progress, range, [0.16, 1]);
  const opacity = still ? 1 : fill;
  const Tag = italic ? motion.em : motion.span;
  return (
    <>
      <Tag style={{ opacity }}>{children}</Tag>{" "}
    </>
  );
}
