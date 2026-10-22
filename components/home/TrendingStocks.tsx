"use client";

import Link from "next/link";
import useSWR from "swr";
import { TrendingUp, TrendingDown } from "lucide-react";
import { formatCurrency, formatPercent } from "@/lib/utils";
import { POPULAR_SYMBOLS } from "@/lib/alpha-vantage";
import type { StockQuote } from "@/types/stocks";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

function StockCard({ symbol }: { symbol: string }) {
  const { data, isLoading } = useSWR<StockQuote>(
    `/api/stocks/quote?symbol=${symbol}`,
    fetcher,
    { refreshInterval: 60000, revalidateOnFocus: false }
  );

  const positive = (data?.changePercent ?? 0) >= 0;

  if (isLoading) {
    return <div className="h-24 animate-pulse rounded-xl bg-zinc-800" />;
  }

  return (
    <Link
      href={`/stock/${symbol}`}
      className="block rounded-xl border border-zinc-800 bg-zinc-900 p-4 hover:border-zinc-600 hover:bg-zinc-800/50 transition-colors"
    >
      <div className="flex items-start justify-between mb-2">
        <span className="font-mono font-bold text-blue-400">{symbol}</span>
        <span className={`text-xs px-1.5 py-0.5 rounded ${positive ? "bg-emerald-900/50 text-emerald-400" : "bg-red-900/50 text-red-400"}`}>
          {data ? formatPercent(data.changePercent) : "—"}
        </span>
      </div>
      <div className="text-xl font-semibold text-zinc-100">
        {data ? formatCurrency(data.price) : "—"}
      </div>
      <div className={`flex items-center gap-1 text-xs mt-1 ${positive ? "text-emerald-400" : "text-red-400"}`}>
        {positive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
        {data ? formatCurrency(Math.abs(data.change)) : "—"}
      </div>
    </Link>
  );
}

export default function TrendingStocks() {
  return (
    <section>
      <h2 className="text-lg font-semibold text-zinc-100 mb-4">Trending</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {POPULAR_SYMBOLS.map((symbol) => (
          <StockCard key={symbol} symbol={symbol} />
        ))}
      </div>
    </section>
  );
}
