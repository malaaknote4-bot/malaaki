import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./toolhop.css";
import { toolhop } from "@/lib/toolhop";

const geist = Geist({ variable: "--font-geist", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: `${toolhop.name}: tools your AI agent can buy on its own`,
  description:
    "A shop where AI agents find tools and pay a few cents per use. No sign-ups, no API keys, no setup. Join the waitlist.",
};

// Own root layout, separate from the Road 8 site in app/[lang].
export default function ToolhopLayout({ children }: LayoutProps<"/toolhop">) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable} antialiased`}>
      <body className="min-h-dvh">{children}</body>
    </html>
  );
}
