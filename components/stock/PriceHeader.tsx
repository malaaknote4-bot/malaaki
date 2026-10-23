"use client";

import useSWR from "swr";
import { TrendingUp, TrendingDown } from "lucide-react";
import { formatCurrency, formatPercent } from "@/lib/utils";
import type { StockQuote } from "@/types/stocks";
import WatchlistButton from "./WatchlistButton";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

interface PriceHeaderProps {
  symbol: string;
  name: string;
}

export default function PriceHeader({ symbol, name }: PriceHeaderProps) {
  const { data, isLoading } = useSWR<StockQuote>(
    `/api/stocks/quote?symbol=${symbol}`,
    fetcher,
    { refreshInterval: 60000, revalidateOnFocus: false }
  );

  const positive = (data?.changePercent ?? 0) >= 0;

  return (
    <div>
      {/* Symbol + name */}
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xs font-semibold tracking-widest uppercase text-muted">
          {symbol}
        </span>
        <span className="text-xs text-muted">·</span>
        <h1 className="text-sm font-medium text-soft">{name || symbol}</h1>
      </div>

      {/* Price row */}
      {isLoading ? (
        <div className="h-12 w-48 animate-pulse rounded-xl bg-surface" />
      ) : data ? (
        <>
          <div className="flex items-baseline gap-3 flex-wrap">
            <span className="text-4xl font-bold tracking-tight text-foreground tabular-nums">
              {formatCurrency(data.price)}
            </span>
            <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-sm font-semibold ${positive ? "bg-positive-dim text-positive" : "bg-negative-dim text-negative"}`}>
              {positive ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}
              {formatPercent(data.changePercent)}
            </span>
          </div>
          <div className="flex items-center gap-3 mt-1.5">
            <span className={`text-sm ${positive ? "text-positive" : "text-negative"}`}>
              {positive ? "+" : ""}{formatCurrency(data.change)} today
            </span>
            <span className="text-xs text-muted">15-min delayed · {data.latestTradingDay}</span>
          </div>
        </>
      ) : null}

      {/* Action buttons row */}
      <div className="flex items-center gap-3 mt-5">
        <WatchlistButton symbol={symbol} />
        <button className="flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90 transition-opacity">
          <TrendingUp className="h-4 w-4" />
          Buy {symbol}
        </button>
      </div>
    </div>
  );
}
