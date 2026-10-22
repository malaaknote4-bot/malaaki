"use client";

import useSWR from "swr";
import { formatDistanceToNow } from "date-fns";
import { ExternalLink } from "lucide-react";
import type { NewsArticle } from "@/types/stocks";
import { Badge } from "@/components/ui/badge";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

function parseDate(raw: string): Date {
  // Alpha Vantage format: "20240115T143000"
  if (raw.length === 15) {
    const y = raw.slice(0, 4), mo = raw.slice(4, 6), d = raw.slice(6, 8);
    const h = raw.slice(9, 11), mi = raw.slice(11, 13), s = raw.slice(13, 15);
    return new Date(`${y}-${mo}-${d}T${h}:${mi}:${s}Z`);
  }
  return new Date(raw);
}

export default function NewsHeadlines() {
  const { data, isLoading } = useSWR<NewsArticle[]>("/api/stocks/news", fetcher, {
    refreshInterval: 600000,
    revalidateOnFocus: false,
  });

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-20 animate-pulse rounded-xl bg-zinc-800" />
        ))}
      </div>
    );
  }

  const articles = Array.isArray(data) ? data : [];

  return (
    <section>
      <h2 className="text-lg font-semibold text-zinc-100 mb-4">Market News</h2>
      <div className="space-y-3">
        {articles.length === 0 && (
          <p className="text-zinc-500 text-sm">No news available. Check your API key.</p>
        )}
        {articles.map((article, i) => (
          <a
            key={i}
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex gap-4 rounded-xl border border-zinc-800 bg-zinc-900 p-4 hover:border-zinc-600 transition-colors group"
          >
            {article.image && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={article.image}
                alt=""
                className="h-16 w-24 shrink-0 rounded-lg object-cover hidden sm:block"
              />
            )}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
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
                <span className="ml-auto text-xs text-zinc-600">
                  {formatDistanceToNow(parseDate(article.publishedAt), { addSuffix: true })}
                </span>
              </div>
              <h3 className="text-sm font-medium text-zinc-100 line-clamp-2 group-hover:text-blue-400 transition-colors">
                {article.title}
              </h3>
              <p className="text-xs text-zinc-500 mt-1 line-clamp-2">{article.summary}</p>
            </div>
            <ExternalLink className="h-4 w-4 shrink-0 text-zinc-600 group-hover:text-blue-400 mt-1 transition-colors" />
          </a>
        ))}
      </div>
    </section>
  );
}
