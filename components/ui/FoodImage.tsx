"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

// next/image with a branded fallback if a photo fails to load.
export default function FoodImage({ className, alt, ...props }: ImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={cn("absolute inset-0 flex items-center justify-center bg-sun dots", className)}
      >
        <span className="text-7xl drop-shadow-md" aria-hidden="true">🍔</span>
      </div>
    );
  }

  return <Image alt={alt} className={className} onError={() => setFailed(true)} {...props} />;
}
