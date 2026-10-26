"use client";

import { useEffect } from "react";
import { MotionConfig } from "framer-motion";
import Lenis from "lenis";

// reducedMotion="user": visitors with reduced motion get opacity fades only.
// Lenis smooths wheel scrolling on desktop; touch stays native (syncTouch off),
// and it's skipped entirely for reduced motion.
export default function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.085,
      syncTouch: false,
      // Anchor jumps already respect the header via scroll-padding-top in globals.css.
      anchors: true,
    });

    // The gallery viewer pauses page scrolling while it's open.
    const onLock = (e: Event) => ((e as CustomEvent<boolean>).detail ? lenis.stop() : lenis.start());
    window.addEventListener("cliff:scroll-lock", onLock);

    return () => {
      window.removeEventListener("cliff:scroll-lock", onLock);
      lenis.destroy();
    };
  }, []);

  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
