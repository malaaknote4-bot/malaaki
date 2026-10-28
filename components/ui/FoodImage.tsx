"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";
import RoadCurves from "@/components/brand/RoadCurves";
import { cn } from "@/lib/utils";

type FoodImageProps = Omit<ImageProps, "src"> & { src?: ImageProps["src"]; label?: string };

// next/image with a branded Road 8 tile for dishes without a photo (or a photo that fails to load).
export default function FoodImage({ className, alt, src, label, sizes, ...props }: FoodImageProps) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    const small = sizes === "64px";
    return (
      <div role="img" aria-label={alt} className="asphalt absolute inset-0 flex items-center justify-center overflow-hidden">
        <RoadCurves className="absolute -bottom-6 start-[-30%] w-[160%] max-w-none opacity-70 rtl:-scale-x-100" />
        {small ? (
          <span className="relative font-display text-2xl text-brand">8</span>
        ) : (
          <span className="relative px-4 text-center font-display text-4xl leading-tight text-white drop-shadow-[0_3px_0_rgba(0,0,0,0.5)]">
            {label ?? alt}
          </span>
        )}
      </div>
    );
  }

  return (
    <Image alt={alt} src={src} sizes={sizes} className={cn(className)} onError={() => setFailed(true)} {...props} />
  );
}
