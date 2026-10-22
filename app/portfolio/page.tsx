export const instant = false;

import { BookmarkCheck } from "lucide-react";
import WatchlistTable from "@/components/portfolio/WatchlistTable";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Watchlist — Stock Docs",
};

export default function PortfolioPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="flex items-center gap-3 mb-8">
        <BookmarkCheck className="h-6 w-6 text-blue-400" />
        <h1 className="text-2xl font-bold text-zinc-100">My Watchlist</h1>
      </div>
      <WatchlistTable />
    </div>
  );
}
