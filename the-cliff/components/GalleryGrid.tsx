"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import ImageUnveil from "./motion/ImageUnveil";
import GalleryViewer from "./GalleryViewer";
import { gallery } from "@/lib/content";
import { DURATION, EASE } from "@/lib/motion";

// Tiles open in a staggered order. The large photo slowly pans and zooms while
// it's on screen. Hovering a tile slides up its caption and dims the others;
// clicking expands it into the full-screen viewer.
export default function GalleryGrid() {
  const [hovered, setHovered] = useState<number | null>(null);
  const [open, setOpen] = useState<number | null>(null);
  const tiles = useRef<(HTMLButtonElement | null)[]>([]);
  const bigRef = useRef<HTMLDivElement>(null);
  const bigInView = useInView(bigRef, { amount: 0.2 });

  const close = () => {
    const index = open;
    setOpen(null);
    if (index !== null) requestAnimationFrame(() => tiles.current[index]?.focus());
  };

  return (
    <>
      <div className="mt-16 grid grid-cols-2 gap-2 md:grid-cols-4" onMouseLeave={() => setHovered(null)}>
        {gallery.map((g, i) => (
          <ImageUnveil
            key={g.src}
            from="bottom"
            delay={i * 0.15}
            className={i === 0 ? "col-span-2 aspect-[5/4] md:row-span-2" : "aspect-[5/4] md:aspect-auto"}
          >
            <motion.button
              ref={(el) => {
                tiles.current[i] = el;
              }}
              type="button"
              aria-label={`Open photo: ${g.alt}`}
              className="group absolute inset-0 block w-full cursor-zoom-in overflow-hidden text-left"
              onMouseEnter={() => setHovered(i)}
              onFocus={() => setHovered(i)}
              onBlur={() => setHovered(null)}
              onClick={() => setOpen(i)}
              animate={{ opacity: hovered !== null && hovered !== i ? 0.55 : 1 }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              {open !== i && (
                <motion.div layoutId={`photo-${i}`} className="absolute inset-0" transition={{ duration: DURATION.base, ease: EASE }}>
                  <div ref={i === 0 ? bigRef : undefined} className={`absolute inset-0 ${i === 0 ? "animate-kenburns" : ""}`} style={i === 0 ? { animationPlayState: bigInView ? "running" : "paused" } : undefined}>
                    <Image
                      src={g.src}
                      alt=""
                      fill
                      sizes={i === 0 ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 768px) 25vw, 50vw"}
                      className="object-cover"
                    />
                  </div>
                </motion.div>
              )}
              <span className="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-night/80 to-transparent px-4 pb-3 pt-10 text-sm text-white transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 group-focus-visible:translate-y-0">
                {g.alt}
              </span>
            </motion.button>
          </ImageUnveil>
        ))}
      </div>

      <GalleryViewer index={open} onChange={setOpen} onClose={close} />
    </>
  );
}
