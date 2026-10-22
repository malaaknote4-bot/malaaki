export const instant = false;

import { notFound } from "next/navigation";
import { getOverview, getQuote } from "@/lib/alpha-vantage";
import PriceHeader from "@/components/stock/PriceHeader";
import StockChart from "@/components/stock/StockChart";
import KeyStats from "@/components/stock/KeyStats";
import CompanyProfile from "@/components/stock/CompanyProfile";
import StockNewsFeed from "@/components/stock/StockNewsFeed";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ symbol: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { symbol } = await params;
  return {
    title: `${symbol.toUpperCase()} — Stock Docs`,
    description: `Live price, chart, and news for ${symbol.toUpperCase()}`,
  };
}

export default async function StockPage({ params }: Props) {
  const { symbol } = await params;
  const upperSymbol = symbol.toUpperCase();

  let overview, quote;
  try {
    [overview, quote] = await Promise.all([
      getOverview(upperSymbol),
      getQuote(upperSymbol),
    ]);
  } catch {
    notFound();
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 space-y-6">
      {/* Price header with live polling */}
      <PriceHeader symbol={upperSymbol} name={overview.name} />

      {/* Chart */}
      <StockChart symbol={upperSymbol} />

      {/* Two-column layout below chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <KeyStats quote={quote} overview={overview} />
          <CompanyProfile overview={overview} />
        </div>
        <div>
          <StockNewsFeed symbol={upperSymbol} />
        </div>
      </div>
    </div>
  );
}
