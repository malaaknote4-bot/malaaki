"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import ArrowButton from "./ArrowButton";
import FadeIn from "./motion/FadeIn";
import RevealHeading from "./motion/RevealHeading";

// An echo of the hero: as the section arrives, the photo settles into place and
// the dark overlay lightens, like clouds clearing. "is waiting." lands last.
export default function ClosingCta({ container }: { container: string }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1.15, 1]);
  const shade = useTransform(scrollYProgress, [0, 1], [0.8, 0.55]);

  return (
    <section ref={ref} id="final-cta" className="relative isolate overflow-hidden bg-night text-white">
      <motion.div className="absolute inset-0 -z-10" style={reduce ? undefined : { scale }}>
        <Image src="/images/valley.jpg" alt="" fill sizes="100vw" className="object-cover" />
      </motion.div>
      <motion.div className="absolute inset-0 -z-10 bg-night" style={{ opacity: reduce ? 0.6 : shade }} />
      <div className={`${container} py-32 md:py-48`}>
        <RevealHeading
          lines={["Your stay on the cliff", <em key="i">is waiting.</em>]}
          className="max-w-4xl"
          titleClassName="font-serif text-[clamp(2.8rem,7vw,6rem)] leading-[0.95] font-light tracking-[-0.03em]"
        />
        <FadeIn delay={0.7}>
          <p className="mt-8 max-w-md text-lg text-white/75">Choose your dates and book securely through our official Airbnb listing.</p>
          <ArrowButton href="#book" className="mt-12 w-full sm:w-72">
            Book your stay
          </ArrowButton>
        </FadeIn>
      </div>
    </section>
  );
}
