"use client";

import useSWR from "swr";
import { TrendingUp, TrendingDown } from "lucide-react";
import { formatCurrency, formatPercent } from "@/lib/utils";

interface IndexQuote {
  symbol: string;
  label: string;
  price: number;
  change: number;
  changePercent: number;
}

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function MarketIndices() {
  const { data, isLoading } = useSWR<IndexQuote[]>("/api/market/indices", fetcher, {
    refreshInterval: 60000,
    revalidateOnFocus: false,
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-20 animate-pulse rounded-xl bg-zinc-800" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {(data ?? []).map((index) => {
        const positive = index.changePercent >= 0;
        return (
          <div
            key={index.symbol}
            className="rounded-xl border border-zinc-800 bg-zinc-900 p-4"
          >
            <div className="text-sm text-zinc-400 mb-1">{index.label}</div>
            <div className="text-2xl font-bold text-zinc-100">
              {formatCurrency(index.price)}
            </div>
            <div className={`flex items-center gap-1 text-sm mt-1 ${positive ? "text-emerald-400" : "text-red-400"}`}>
              {positive ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
              {formatPercent(index.changePercent)}
            </div>
          </div>
        );
      })}
    </div>
  );
}
