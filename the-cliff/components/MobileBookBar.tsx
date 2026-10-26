"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { airbnbLink } from "@/lib/airbnb";
import { EASE } from "@/lib/motion";

// Booking shortcut on small screens. It appears once the hero has been passed,
// and steps aside while the booking form or the final call to action is on screen.
export default function MobileBookBar() {
  const [pastHero, setPastHero] = useState(false);
  const [covered, setCovered] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const track = document.querySelector<HTMLElement>("[data-reveal-track]");
    const onScroll = () => setPastHero(track ? track.getBoundingClientRect().bottom <= 0 : window.scrollY > window.innerHeight);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const targets = ["book", "final-cta"].map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver((entries) => {
      setCovered((prev) => {
        const next = { ...prev };
        entries.forEach((e) => (next[e.target.id] = e.isIntersecting));
        return next;
      });
    });
    targets.forEach((t) => io.observe(t));

    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  const visible = pastHero && !Object.values(covered).some(Boolean);

  return (
    <motion.div
      className="fixed inset-x-0 bottom-0 z-30 flex border-t border-line-light bg-night text-white md:hidden"
      initial={false}
      animate={{ y: visible ? "0%" : "110%" }}
      transition={{ duration: 0.6, ease: EASE }}
      aria-hidden={!visible}
      inert={!visible}
    >
      <a href="#book" className="flex h-14 flex-1 items-center justify-center text-sm font-semibold">
        Choose dates
      </a>
      <a
        href={airbnbLink()}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-14 flex-1 items-center justify-center gap-2 bg-white text-sm font-semibold text-coal"
      >
        Book on Airbnb
        <svg width="14" height="14" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
          <path d="M5 13L13 5M6 5h7v7" />
        </svg>
      </a>
    </motion.div>
  );
}
