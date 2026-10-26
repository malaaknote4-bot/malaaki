"use client";

import { useEffect, useRef, useState, ReactNode } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

// How tall the pinned hero is, in viewport heights. The reveal plays out while the
// visitor scrolls through it, so a taller section means a slower, calmer reveal.
const SCROLL_LENGTH_VH = 360;
// Fraction of the remaining distance the visuals cover each frame; lower is smoother.
const EASING = 0.12;

interface ScrollExpandMediaProps {
  mediaType?: "video" | "image";
  mediaSrc: string;
  posterSrc?: string;
  bgImageSrc: string;
  title?: string;
  date?: string;
  scrollToExpand?: string;
  textBlend?: boolean;
  children?: ReactNode;
}

const clamp01 = (n: number) => Math.min(Math.max(n, 0), 1);
// Gentle start and finish to the reveal.
const smoothstep = (t: number) => t * t * (3 - 2 * t);

const ScrollExpandMedia = ({
  mediaType = "video",
  mediaSrc,
  posterSrc,
  bgImageSrc,
  title,
  date,
  scrollToExpand,
  textBlend,
  children,
}: ScrollExpandMediaProps) => {
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [viewport, setViewport] = useState({ width: 1440, height: 900 });

  const trackRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef(0);
  const frameRef = useRef<number | null>(null);

  // The reveal is driven by the page's own scroll position, so touch, momentum,
  // trackpads, the keyboard and anchor links all behave natively on every device.
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const targetProgress = () => {
      const track = trackRef.current;
      if (!track) return 0;
      const travel = track.offsetHeight - window.innerHeight;
      return travel > 0 ? clamp01(-track.getBoundingClientRect().top / travel) : 1;
    };

    const tick = () => {
      const target = targetProgress();
      const eased = progressRef.current + (target - progressRef.current) * EASING;
      const settled = reduceMotion || Math.abs(target - eased) < 0.0005;
      progressRef.current = settled ? target : eased;
      setScrollProgress(progressRef.current);
      frameRef.current = settled ? null : requestAnimationFrame(tick);
    };

    const onScroll = () => {
      if (frameRef.current === null) frameRef.current = requestAnimationFrame(tick);
    };

    const measure = () => {
      setViewport({ width: window.innerWidth, height: window.innerHeight });
      onScroll();
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);

    return () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
    };
  }, []);

  // Grow from a small portrait card to 95% × 85% of the screen, spread over the
  // whole scroll on every screen size so the reveal never finishes early.
  const reveal = smoothstep(scrollProgress);
  const startWidth = Math.min(300, viewport.width * 0.7);
  const startHeight = Math.min(400, viewport.height * 0.55);
  const mediaWidth = startWidth + reveal * (viewport.width * 0.95 - startWidth);
  const mediaHeight = startHeight + reveal * (viewport.height * 0.85 - startHeight);
  const textTranslateX = reveal * (viewport.width < 768 ? 90 : 70);
  const showContent = scrollProgress > 0.9;

  const firstWord = title ? title.split(" ")[0] : "";
  const restOfTitle = title ? title.split(" ").slice(1).join(" ") : "";

  const titleClass =
    "font-serif text-[clamp(3.5rem,11vw,9rem)] leading-[0.9] font-light tracking-[-0.035em] text-white drop-shadow-[0_2px_30px_rgba(0,0,0,0.55)]";
  const labelClass =
    "text-[11px] font-semibold uppercase tracking-[0.3em] text-white/80";

  return (
    <div className="overflow-x-clip bg-night text-white">
      <div
        ref={trackRef}
        data-reveal-track
        className="relative"
        style={{ height: `${SCROLL_LENGTH_VH}svh` }}
      >
        <div className="sticky top-0 flex h-[100svh] w-full items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0" style={{ opacity: 1 - reveal }}>
            <Image
              src={bgImageSrc}
              alt=""
              fill
              sizes="100vw"
              className="object-cover"
              preload
            />
            <div className="absolute inset-0 bg-night/35" />
          </div>

          <div
            data-reveal-media
            className="absolute z-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{
              width: `${mediaWidth}px`,
              height: `${mediaHeight}px`,
              boxShadow: "0px 0px 50px rgba(0, 0, 0, 0.3)",
            }}
          >
            {mediaType === "video" ? (
              mediaSrc.includes("youtube.com") ? (
                <div className="relative w-full h-full pointer-events-none">
                  <iframe
                    width="100%"
                    height="100%"
                    src={
                      mediaSrc.includes("embed")
                        ? mediaSrc +
                          (mediaSrc.includes("?") ? "&" : "?") +
                          "autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&disablekb=1&modestbranding=1"
                        : mediaSrc.replace("watch?v=", "embed/") +
                          "?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&disablekb=1&modestbranding=1&playlist=" +
                          mediaSrc.split("v=")[1]
                    }
                    className="w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                  <div className="absolute inset-0 bg-night/30" style={{ opacity: 0.5 - reveal * 0.3 }} />
                </div>
              ) : (
                <div className="relative w-full h-full pointer-events-none">
                  <video
                    src={mediaSrc}
                    poster={posterSrc}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    className="w-full h-full object-cover"
                    controls={false}
                    disablePictureInPicture
                    disableRemotePlayback
                  />
                  <div className="absolute inset-0 bg-night/30" style={{ opacity: 0.5 - reveal * 0.3 }} />
                </div>
              )
            ) : (
              <div className="relative w-full h-full">
                <Image
                  src={mediaSrc}
                  alt={title || "Media content"}
                  fill
                  sizes="95vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-night/50" style={{ opacity: 0.7 - reveal * 0.3 }} />
              </div>
            )}

            <div className="relative z-10 mt-5 flex flex-col items-center gap-2 text-center">
              {date && (
                <p className={labelClass} style={{ transform: `translateX(-${textTranslateX}vw)` }}>
                  {date}
                </p>
              )}
              {scrollToExpand && (
                <p
                  className={`${labelClass} text-white/60`}
                  style={{ transform: `translateX(${textTranslateX}vw)`, opacity: 1 - reveal * 2 }}
                >
                  {scrollToExpand}
                </p>
              )}
            </div>
          </div>

          <div
            className={`relative z-10 flex w-full flex-col items-center justify-center gap-2 text-center ${
              textBlend ? "mix-blend-difference" : "mix-blend-normal"
            }`}
          >
            <h2 className={titleClass} style={{ transform: `translateX(-${textTranslateX}vw)` }}>
              {firstWord}
            </h2>
            <h2 className={`${titleClass} italic`} style={{ transform: `translateX(${textTranslateX}vw)` }}>
              {restOfTitle}
            </h2>
          </div>
        </div>
      </div>

      <motion.section
        className="flex w-full flex-col"
        initial={false}
        animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 24 }}
        transition={{ duration: 0.9, ease: [0.2, 0.7, 0.1, 1] }}
      >
        {children}
      </motion.section>
    </div>
  );
};

export default ScrollExpandMedia;
