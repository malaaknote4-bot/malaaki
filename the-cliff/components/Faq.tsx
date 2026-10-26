"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Hairline } from "./motion/Hairline";
import { faqs } from "@/lib/content";
import { DURATION, EASE, RISE, VIEWPORT } from "@/lib/motion";

// Accordion: one answer open at a time. Answers glide open, and the other
// questions dim while one is open.
export default function Faq() {
  const [open, setOpen] = useState<number | null>(null);
  const id = useId();

  return (
    <div className="md:col-span-2">
      {faqs.map((f, i) => {
        const expanded = open === i;
        const panelId = `${id}-answer-${i}`;
        return (
          <div key={f.q}>
            <Hairline delay={i * 0.1} />
            <motion.div
              initial={{ opacity: 0, y: RISE }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: DURATION.slow, ease: EASE, delay: i * 0.1 + 0.5 }}
            >
              <motion.div
                animate={{ opacity: open !== null && !expanded ? 0.45 : 1 }}
                transition={{ duration: 0.6, ease: EASE }}
              >
                <h3>
                  <button
                    type="button"
                    aria-expanded={expanded}
                    aria-controls={panelId}
                    onClick={() => setOpen(expanded ? null : i)}
                    className="flex w-full items-center justify-between gap-6 py-6 text-left text-lg font-medium"
                  >
                    {f.q}
                    <span aria-hidden="true" className="grid h-8 w-8 shrink-0 place-items-center border border-line text-lg font-light">
                      <span
                        className={`transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${expanded ? "rotate-45" : ""}`}
                      >
                        +
                      </span>
                    </span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {expanded && (
                    <motion.div
                      id={panelId}
                      role="region"
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 1, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 pr-12 leading-relaxed text-ink-soft">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          </div>
        );
      })}
      <Hairline delay={faqs.length * 0.1} />
    </div>
  );
}
