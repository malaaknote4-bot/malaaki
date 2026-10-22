"use client";

import Link from "next/link";
import useSWR from "swr";
import { Trash2, TrendingUp, TrendingDown } from "lucide-react";
import { formatCurrency, formatPercent } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import type { StockQuote } from "@/types/stocks";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

interface WatchlistItem {
  id: string;
  symbol: string;
  addedAt: string;
}

function WatchlistRow({
  item,
  onRemove,
}: {
  item: WatchlistItem;
  onRemove: () => void;
}) {
  const { data: quote } = useSWR<StockQuote>(
    `/api/stocks/quote?symbol=${item.symbol}`,
    fetcher,
    { refreshInterval: 60000, revalidateOnFocus: false }
  );

  const positive = (quote?.changePercent ?? 0) >= 0;

  return (
    <tr className="border-b border-zinc-800 hover:bg-zinc-800/30 transition-colors">
      <td className="py-3 px-4">
        <Link
          href={`/stock/${item.symbol}`}
          className="font-mono font-bold text-blue-400 hover:underline"
        >
          {item.symbol}
        </Link>
      </td>
      <td className="py-3 px-4 text-right font-medium text-zinc-100">
        {quote ? formatCurrency(quote.price) : <span className="h-4 w-20 animate-pulse bg-zinc-800 rounded block ml-auto" />}
      </td>
      <td className={`py-3 px-4 text-right text-sm ${positive ? "text-emerald-400" : "text-red-400"}`}>
        <div className="flex items-center justify-end gap-1">
          {positive ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}
          {quote ? formatPercent(quote.changePercent) : "—"}
        </div>
      </td>
      <td className="py-3 px-4 text-right text-sm text-zinc-400">
        {quote ? formatCurrency(Math.abs(quote.change)) : "—"}
      </td>
      <td className="py-3 px-4 text-right">
        <Button
          variant="ghost"
          size="icon"
          onClick={onRemove}
          className="h-7 w-7 text-zinc-600 hover:text-red-400"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </Button>
      </td>
    </tr>
  );
}

export default function WatchlistTable() {
  const { data, isLoading, mutate } = useSWR<WatchlistItem[]>(
    "/api/portfolio",
    fetcher
  );

  async function remove(symbol: string) {
    await fetch(`/api/portfolio/${symbol}`, { method: "DELETE" });
    mutate();
  }

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-12 animate-pulse rounded-lg bg-zinc-800" />
        ))}
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="text-center py-16 text-zinc-500">
        <p className="text-lg mb-2">Your watchlist is empty</p>
        <p className="text-sm">
          Browse stocks and click &ldquo;Save to Watchlist&rdquo; to track them here.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-zinc-800 overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="border-b border-zinc-800 bg-zinc-900/50">
            <th className="py-3 px-4 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">
              Symbol
            </th>
            <th className="py-3 px-4 text-right text-xs font-medium text-zinc-400 uppercase tracking-wider">
              Price
            </th>
            <th className="py-3 px-4 text-right text-xs font-medium text-zinc-400 uppercase tracking-wider">
              Change %
            </th>
            <th className="py-3 px-4 text-right text-xs font-medium text-zinc-400 uppercase tracking-wider">
              Change $
            </th>
            <th className="py-3 px-4 text-right text-xs font-medium text-zinc-400 uppercase tracking-wider">
              Remove
            </th>
          </tr>
        </thead>
        <tbody className="bg-zinc-900">
          {data.map((item) => (
            <WatchlistRow
              key={item.id}
              item={item}
              onRemove={() => remove(item.symbol)}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
