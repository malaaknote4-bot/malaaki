export const instant = false;

import MarketIndices from "@/components/home/MarketIndices";
import TrendingStocks from "@/components/home/TrendingStocks";
import NewsHeadlines from "@/components/home/NewsHeadlines";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 space-y-10">
      <section>
        <h2 className="text-lg font-semibold text-zinc-100 mb-4">Market Overview</h2>
        <MarketIndices />
      </section>

      <TrendingStocks />

      <NewsHeadlines />
    </div>
  );
}
