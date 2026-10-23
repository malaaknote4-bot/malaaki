"use client";

import Link from "next/link";
import useSWR from "swr";
import { formatCurrency, formatPercent } from "@/lib/utils";
import { POPULAR_SYMBOLS } from "@/lib/alpha-vantage";
import type { StockQuote } from "@/types/stocks";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

const ICON_COLORS: Record<string, string> = {
  AAPL: "from-zinc-600 to-zinc-800",
  GOOGL: "from-blue-700 to-blue-900",
  AMZN: "from-amber-600 to-amber-900",
  TSLA: "from-red-600 to-red-900",
  NVDA: "from-violet-600 to-violet-900",
  MSFT: "from-sky-600 to-sky-900",
  META: "from-blue-500 to-blue-800",
  NFLX: "from-red-500 to-red-800",
};

function StockRow({ symbol }: { symbol: string }) {
  const { data, isLoading } = useSWR<StockQuote>(
    `/api/stocks/quote?symbol=${symbol}`,
    fetcher,
    { refreshInterval: 60000, revalidateOnFocus: false }
  );

  const positive = (data?.changePercent ?? 0) >= 0;
  const gradient = ICON_COLORS[symbol] ?? "from-accent to-surface2";

  if (isLoading) {
    return <div className="h-16 animate-pulse rounded-2xl bg-surface" />;
  }

  return (
    <Link
      href={`/stock/${symbol}`}
      className="flex items-center gap-3 rounded-2xl border border-border bg-gradient-to-r from-surface to-surface2/40 p-3 hover:border-accent/30 transition-colors"
    >
      <div className={`h-10 w-10 shrink-0 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center`}>
        <span className="text-[10px] font-bold text-white leading-none">
          {symbol.slice(0, 4)}
        </span>
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-semibold text-sm text-foreground">{symbol}</div>
        <div className="text-xs text-muted truncate">&nbsp;</div>
      </div>
      <div className="text-right shrink-0">
        <div className="font-semibold text-sm tabular-nums text-foreground">
          {data ? formatCurrency(data.price) : "—"}
        </div>
        <span className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-semibold mt-0.5 ${positive ? "bg-positive-dim text-positive" : "bg-negative-dim text-negative"}`}>
          {data ? formatPercent(data.changePercent) : "—"}
        </span>
      </div>
    </Link>
  );
}

export default function TrendingStocks() {
  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-semibold text-foreground">Trending</h2>
        <Link href="/portfolio" className="text-xs text-accent-lt hover:underline">Watchlist</Link>
      </div>
      <div className="flex flex-col gap-2">
        {POPULAR_SYMBOLS.map((symbol) => (
          <StockRow key={symbol} symbol={symbol} />
        ))}
      </div>
    </section>
  );
}
