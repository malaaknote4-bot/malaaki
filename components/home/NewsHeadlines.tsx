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
      <div className="flex flex-col gap-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-20 animate-pulse rounded-2xl bg-surface" />
        ))}
      </div>
    );
  }

  const articles = Array.isArray(data) ? data : [];

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-semibold text-foreground">Market News</h2>
        <span className="text-xs text-soft">Live</span>
      </div>
      <div className="flex flex-col gap-3">
        {articles.length === 0 && (
          <p className="text-muted text-sm">No news available. Check your API key.</p>
        )}
        {articles.map((article, i) => (
          <a
            key={i}
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-2xl border border-border bg-surface p-4 hover:border-accent/30 transition-colors group block"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-semibold tracking-widest uppercase text-muted">{article.source}</span>
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
              <span className="ml-auto text-[10px] text-muted">
                {formatDistanceToNow(parseDate(article.publishedAt), { addSuffix: true })}
              </span>
              <ExternalLink className="h-3 w-3 shrink-0 text-muted group-hover:text-accent-lt transition-colors" />
            </div>
            <h3 className="text-sm font-medium text-foreground line-clamp-2 group-hover:text-accent-lt transition-colors">
              {article.title}
            </h3>
          </a>
        ))}
      </div>
    </section>
  );
}
