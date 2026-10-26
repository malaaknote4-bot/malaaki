"use client";

import { useEffect } from "react";
import ScrollExpandMedia from "@/components/ui/scroll-expansion-hero";

// Hero reveal: the clifftop view fills the screen, and the house photo grows
// out of it as the visitor scrolls. Everything in `children` fades in once it's fully open.
export default function CliffHero({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Only start at the top when there's no #section in the URL to jump to.
    if (!window.location.hash) window.scrollTo(0, 0);
  }, []);

  return (
    <ScrollExpandMedia
      mediaType="image"
      bgImageSrc="/images/deck-view.jpg"
      mediaSrc="/images/house.jpg"
      title="The Cliff"
      date="Springbrook · Gold Coast Hinterland"
      scrollToExpand="Scroll to explore"
    >
      {children}
    </ScrollExpandMedia>
  );
}
