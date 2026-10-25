import type { Metadata, Viewport } from "next";
import "./globals.css";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: `${site.name} — Luxury clifftop retreat, Southern Australia`,
  description:
    "A calm, luxury clifftop retreat on Australia's southern coast. Ocean views from every room. Book your stay through our official Airbnb listing.",
  openGraph: {
    title: site.name,
    description: site.tagline,
    images: ["/images/hero.svg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#f6f1ea",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-AU">
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
