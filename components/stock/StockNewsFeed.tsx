"use client";

import useSWR from "swr";
import { formatDistanceToNow } from "date-fns";
import { ExternalLink } from "lucide-react";
import type { NewsArticle } from "@/types/stocks";
import { Badge } from "@/components/ui/badge";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

function parseDate(raw: string): Date {
  if (raw.length === 15) {
    const y = raw.slice(0, 4), mo = raw.slice(4, 6), d = raw.slice(6, 8);
    const h = raw.slice(9, 11), mi = raw.slice(11, 13), s = raw.slice(13, 15);
    return new Date(`${y}-${mo}-${d}T${h}:${mi}:${s}Z`);
  }
  return new Date(raw);
}

export default function StockNewsFeed({ symbol }: { symbol: string }) {
  const { data, isLoading } = useSWR<NewsArticle[]>(
    `/api/stocks/news?symbol=${symbol}`,
    fetcher,
    { refreshInterval: 600000, revalidateOnFocus: false }
  );

  const articles = Array.isArray(data) ? data : [];

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
      <h2 className="font-semibold text-zinc-100 mb-4">News</h2>

      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 animate-pulse rounded-lg bg-zinc-800" />
          ))}
        </div>
      ) : articles.length === 0 ? (
        <p className="text-zinc-500 text-sm">No recent news for {symbol}.</p>
      ) : (
        <div className="space-y-3">
          {articles.map((article, i) => (
            <a
              key={i}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 group hover:bg-zinc-800/50 rounded-lg p-2 -mx-2 transition-colors"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-xs text-zinc-500">{article.source}</span>
                  <Badge
                    variant={
                      article.sentiment === "positive"
                        ? "positive"
                        : article.sentiment === "negative"
                        ? "negative"
                        : "neutral"
                    }
                  >
                    {article.sentiment}
                  </Badge>
                  <span className="ml-auto text-xs text-zinc-600 shrink-0">
                    {formatDistanceToNow(parseDate(article.publishedAt), { addSuffix: true })}
                  </span>
                </div>
                <p className="text-sm text-zinc-200 line-clamp-2 group-hover:text-blue-400 transition-colors">
                  {article.title}
                </p>
              </div>
              <ExternalLink className="h-3.5 w-3.5 shrink-0 text-zinc-600 group-hover:text-blue-400 mt-0.5 transition-colors" />
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
