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
    <div className="flex flex-col sm:flex-row sm:items-end gap-4 justify-between">
      <div>
        <div className="flex items-center gap-3 mb-1">
          <h1 className="text-3xl font-bold text-zinc-100">{name || symbol}</h1>
          <span className="font-mono text-sm text-zinc-500 bg-zinc-800 px-2 py-0.5 rounded">
            {symbol}
          </span>
        </div>

        {isLoading ? (
          <div className="h-10 w-40 animate-pulse rounded bg-zinc-800" />
        ) : data ? (
          <div className="flex items-end gap-3 flex-wrap">
            <span className="text-4xl font-bold text-zinc-100">
              {formatCurrency(data.price)}
            </span>
            <div className={`flex items-center gap-1 text-lg pb-1 ${positive ? "text-emerald-400" : "text-red-400"}`}>
              {positive ? <TrendingUp className="h-5 w-5" /> : <TrendingDown className="h-5 w-5" />}
              <span>{formatCurrency(Math.abs(data.change))}</span>
              <span>({formatPercent(data.changePercent)})</span>
            </div>
            <span className="text-xs text-zinc-500 pb-1.5">
              As of {data.latestTradingDay} · 15-min delay
            </span>
          </div>
        ) : null}
      </div>

      <WatchlistButton symbol={symbol} />
    </div>
  );
}
