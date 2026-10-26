"use client";

import {
  useEffect,
  useRef,
  useState,
  ReactNode,
  TouchEvent,
  WheelEvent,
} from "react";
import Image from "next/image";
import { motion } from "framer-motion";

// How much one unit of wheel/touch movement advances the reveal (0 → 1).
const WHEEL_SENSITIVITY = 0.0003;
const TOUCH_SENSITIVITY = 0.002;
const MAX_WHEEL_DELTA = 100;
// Fraction of the remaining distance covered each frame; lower is calmer.
const EASING = 0.06;

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
  const [showContent, setShowContent] = useState<boolean>(false);
  const [isMobileState, setIsMobileState] = useState<boolean>(false);

  // Scrolling moves a target; the visible progress eases toward it every frame,
  // so the reveal glides open at a calm pace instead of jumping with each scroll.
  const targetRef = useRef(0);
  const progressRef = useRef(0);
  const expandedRef = useRef(false);
  const touchYRef = useRef(0);
  const frameRef = useRef<number | null>(null);

  const tick = () => {
    const target = targetRef.current;
    const eased = progressRef.current + (target - progressRef.current) * EASING;
    const settled = Math.abs(target - eased) < 0.0005;
    const value = settled ? target : eased;

    progressRef.current = value;
    setScrollProgress(value);

    if (value >= 1) {
      expandedRef.current = true;
      setShowContent(true);
    } else if (value < 0.75) {
      setShowContent(false);
    }

    frameRef.current = settled ? null : requestAnimationFrame(tick);
  };

  const moveTarget = (delta: number) => {
    targetRef.current = Math.min(Math.max(targetRef.current + delta, 0), 1);
    if (frameRef.current === null) frameRef.current = requestAnimationFrame(tick);
  };

  const expandFully = () => {
    if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    frameRef.current = null;
    targetRef.current = 1;
    progressRef.current = 1;
    expandedRef.current = true;
    setScrollProgress(1);
    setShowContent(true);
  };

  useEffect(() => {
    targetRef.current = 0;
    progressRef.current = 0;
    expandedRef.current = false;
    setScrollProgress(0);
    setShowContent(false);
  }, [mediaType]);

  useEffect(() => {
    // Respect reduced motion: show the expanded state and never hijack scrolling.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      expandFully();
    }

    const handleWheel = (e: WheelEvent) => {
      if (expandedRef.current && e.deltaY < 0 && window.scrollY <= 5) {
        expandedRef.current = false;
        e.preventDefault();
      } else if (!expandedRef.current) {
        e.preventDefault();
        // Cap each event so a hard flick or a big mouse-wheel notch can't jump ahead.
        const delta = Math.max(-MAX_WHEEL_DELTA, Math.min(MAX_WHEEL_DELTA, e.deltaY));
        moveTarget(delta * WHEEL_SENSITIVITY);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchYRef.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!touchYRef.current) return;

      const touchY = e.touches[0].clientY;
      const deltaY = touchYRef.current - touchY;

      if (expandedRef.current && deltaY < -20 && window.scrollY <= 5) {
        expandedRef.current = false;
        e.preventDefault();
      } else if (!expandedRef.current) {
        e.preventDefault();
        moveTarget(deltaY * TOUCH_SENSITIVITY);
        touchYRef.current = touchY;
      }
    };

    const handleTouchEnd = (): void => {
      touchYRef.current = 0;
    };

    // Wheel and touch scrolling are cancelled above, so any scroll that still happens
    // came from the keyboard, an anchor link or the scrollbar. Let it through by
    // finishing the reveal instead of trapping the visitor at the top.
    const handleScroll = (): void => {
      if (!expandedRef.current && window.scrollY > 5) {
        expandFully();
      }
    };

    window.addEventListener("wheel", handleWheel as unknown as EventListener, {
      passive: false,
    });
    window.addEventListener("scroll", handleScroll as EventListener);
    window.addEventListener(
      "touchstart",
      handleTouchStart as unknown as EventListener,
      { passive: false },
    );
    window.addEventListener(
      "touchmove",
      handleTouchMove as unknown as EventListener,
      { passive: false },
    );
    window.addEventListener("touchend", handleTouchEnd as EventListener);

    return () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
      window.removeEventListener(
        "wheel",
        handleWheel as unknown as EventListener,
      );
      window.removeEventListener("scroll", handleScroll as EventListener);
      window.removeEventListener(
        "touchstart",
        handleTouchStart as unknown as EventListener,
      );
      window.removeEventListener(
        "touchmove",
        handleTouchMove as unknown as EventListener,
      );
      window.removeEventListener("touchend", handleTouchEnd as EventListener);
    };
    // Handlers read refs, so they're registered once.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const checkIfMobile = (): void => {
      setIsMobileState(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  const mediaWidth = 300 + scrollProgress * (isMobileState ? 650 : 1250);
  const mediaHeight = 400 + scrollProgress * (isMobileState ? 200 : 400);
  const textTranslateX = scrollProgress * (isMobileState ? 180 : 150);

  const firstWord = title ? title.split(" ")[0] : "";
  const restOfTitle = title ? title.split(" ").slice(1).join(" ") : "";

  const titleClass =
    "font-serif text-[clamp(3.5rem,11vw,9rem)] leading-[0.9] font-light tracking-[-0.035em] text-white drop-shadow-[0_2px_30px_rgba(0,0,0,0.55)] transition-none";
  const labelClass =
    "text-[11px] font-semibold uppercase tracking-[0.3em] text-white/80";

  return (
    <div className="overflow-x-hidden bg-night text-white transition-colors duration-700 ease-in-out">
      <section className="relative flex flex-col items-center justify-start min-h-[100dvh]">
        <div className="relative w-full flex flex-col items-center min-h-[100dvh]">
          <motion.div
            className="absolute inset-0 z-0 h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 - scrollProgress }}
            transition={{ duration: 0.1 }}
          >
            <Image
              src={bgImageSrc}
              alt=""
              width={1920}
              height={1080}
              className="w-full h-screen"
              style={{
                objectFit: "cover",
                objectPosition: "center",
              }}
              preload
            />
            <div className="absolute inset-0 bg-night/35" />
          </motion.div>

          <div className="w-full flex flex-col items-center justify-start relative z-10">
            <div className="flex flex-col items-center justify-center w-full h-[100dvh] relative">
              <div
                className="absolute z-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-none"
                style={{
                  width: `${mediaWidth}px`,
                  height: `${mediaHeight}px`,
                  maxWidth: "95vw",
                  maxHeight: "85vh",
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
                      <div
                        className="absolute inset-0 z-10"
                        style={{ pointerEvents: "none" }}
                      ></div>

                      <motion.div
                        className="absolute inset-0 bg-night/30"
                        initial={{ opacity: 0.7 }}
                        animate={{ opacity: 0.5 - scrollProgress * 0.3 }}
                        transition={{ duration: 0.2 }}
                      />
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
                      <div
                        className="absolute inset-0 z-10"
                        style={{ pointerEvents: "none" }}
                      ></div>

                      <motion.div
                        className="absolute inset-0 bg-night/30"
                        initial={{ opacity: 0.7 }}
                        animate={{ opacity: 0.5 - scrollProgress * 0.3 }}
                        transition={{ duration: 0.2 }}
                      />
                    </div>
                  )
                ) : (
                  <div className="relative w-full h-full">
                    <Image
                      src={mediaSrc}
                      alt={title || "Media content"}
                      width={1280}
                      height={720}
                      className="w-full h-full object-cover"
                    />

                    <motion.div
                      className="absolute inset-0 bg-night/50"
                      initial={{ opacity: 0.7 }}
                      animate={{ opacity: 0.7 - scrollProgress * 0.3 }}
                      transition={{ duration: 0.2 }}
                    />
                  </div>
                )}

                <div className="flex flex-col items-center text-center gap-2 relative z-10 mt-5 transition-none">
                  {date && (
                    <p
                      className={labelClass}
                      style={{ transform: `translateX(-${textTranslateX}vw)` }}
                    >
                      {date}
                    </p>
                  )}
                  {scrollToExpand && (
                    <p
                      className={`${labelClass} text-white/60`}
                      style={{ transform: `translateX(${textTranslateX}vw)` }}
                    >
                      {scrollToExpand}
                    </p>
                  )}
                </div>
              </div>

              <div
                className={`flex items-center justify-center text-center gap-2 w-full relative z-10 transition-none flex-col ${
                  textBlend ? "mix-blend-difference" : "mix-blend-normal"
                }`}
              >
                <motion.h2
                  className={titleClass}
                  style={{ transform: `translateX(-${textTranslateX}vw)` }}
                >
                  {firstWord}
                </motion.h2>
                <motion.h2
                  className={`${titleClass} italic`}
                  style={{ transform: `translateX(${textTranslateX}vw)` }}
                >
                  {restOfTitle}
                </motion.h2>
              </div>
            </div>

            <motion.section
              className="flex flex-col w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: showContent ? 1 : 0 }}
              transition={{ duration: 0.7 }}
            >
              {children}
            </motion.section>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ScrollExpandMedia;
