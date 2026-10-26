"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { AnimatePresence, motion, type PanInfo } from "framer-motion";
import { gallery } from "@/lib/content";
import { DURATION, EASE } from "@/lib/motion";

// Full-screen photo viewer. The clicked tile expands into it (shared layoutId).
// ← / → or swipe to move between photos, Esc or the close button to leave.
export default function GalleryViewer({
  index,
  onChange,
  onClose,
}: {
  index: number | null;
  onChange: (i: number) => void;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const isOpen = index !== null;
  const count = gallery.length;

  const go = (delta: number) => {
    if (index === null) return;
    onChange((index + delta + count) % count);
  };

  useEffect(() => {
    if (!isOpen) return;
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    window.dispatchEvent(new CustomEvent("cliff:scroll-lock", { detail: true }));
    closeRef.current?.focus();
    return () => {
      root.style.overflow = previous;
      window.dispatchEvent(new CustomEvent("cliff:scroll-lock", { detail: false }));
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
      else if (e.key === "Tab") {
        // Keep focus inside the viewer.
        const focusable = dialogRef.current?.querySelectorAll<HTMLElement>("button");
        if (!focusable || focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -60) go(1);
    else if (info.offset.x > 60) go(-1);
  };

  const control =
    "grid h-12 w-12 place-items-center border border-white/25 text-white transition-colors hover:border-white hover:bg-white/10";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          className="fixed inset-0 z-[60] flex flex-col bg-night/95 text-white backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <div className="flex items-center justify-between px-5 py-4 md:px-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/70 tabular-nums" aria-live="polite">
              {index + 1} / {count}
            </p>
            <button ref={closeRef} type="button" className={control} onClick={onClose} aria-label="Close viewer">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M3 3l12 12M15 3L3 15" />
              </svg>
            </button>
          </div>

          <div className="relative flex-1">
            <motion.div
              key={index}
              layoutId={`photo-${index}`}
              className="absolute inset-x-5 inset-y-0 cursor-grab active:cursor-grabbing md:inset-x-24"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.25}
              onDragEnd={onDragEnd}
              transition={{ duration: DURATION.base, ease: EASE }}
            >
              <Image src={gallery[index].src} alt={gallery[index].alt} fill sizes="100vw" className="pointer-events-none object-contain" />
            </motion.div>
            <button type="button" className={`${control} absolute left-5 top-1/2 hidden -translate-y-1/2 md:grid`} onClick={() => go(-1)} aria-label="Previous photo">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M16 9H3M8 4L3 9l5 5" />
              </svg>
            </button>
            <button type="button" className={`${control} absolute right-5 top-1/2 hidden -translate-y-1/2 md:grid`} onClick={() => go(1)} aria-label="Next photo">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M2 9h13M10 4l5 5-5 5" />
              </svg>
            </button>
          </div>

          <div className="flex items-center justify-between gap-4 px-5 py-5 md:px-8">
            <p className="text-sm text-white/75">{gallery[index].alt}</p>
            <div className="flex gap-2 md:hidden">
              <button type="button" className={control} onClick={() => go(-1)} aria-label="Previous photo">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  <path d="M16 9H3M8 4L3 9l5 5" />
                </svg>
              </button>
              <button type="button" className={control} onClick={() => go(1)} aria-label="Next photo">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  <path d="M2 9h13M10 4l5 5-5 5" />
                </svg>
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
