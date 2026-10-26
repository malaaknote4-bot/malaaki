import type { Metadata, Viewport } from "next";
import "./globals.css";
import { site } from "@/lib/content";
import Providers from "./providers";

export const metadata: Metadata = {
  title: `${site.name} — Clifftop retreat in Springbrook, Gold Coast Hinterland`,
  description:
    "A calm clifftop home in Springbrook with panoramic rainforest valley views. Sleeps 6. Book your stay through our official Airbnb listing.",
  openGraph: {
    title: site.name,
    description: site.tagline,
    images: ["/images/deck-view.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#0e1311",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-AU">
      <body className="min-h-screen bg-bone text-ink">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
