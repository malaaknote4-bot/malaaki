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
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-24 animate-pulse rounded-2xl bg-surface" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      {(data ?? []).map((index) => {
        const positive = index.changePercent >= 0;
        return (
          <div
            key={index.symbol}
            className="rounded-2xl border border-border bg-gradient-to-br from-surface2 to-surface3 p-4"
          >
            <div className="text-xs font-semibold tracking-widest uppercase text-muted mb-2">
              {index.label}
            </div>
            <div className="text-2xl font-bold text-foreground tabular-nums mb-2">
              {formatCurrency(index.price)}
            </div>
            <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${positive ? "bg-positive-dim text-positive" : "bg-negative-dim text-negative"}`}>
              {positive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
              {formatPercent(index.changePercent)}
            </span>
          </div>
        );
      })}
    </div>
  );
}
