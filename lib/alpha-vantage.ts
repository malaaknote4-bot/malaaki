import type {
  StockQuote,
  StockOverview,
  HistoryDataPoint,
  NewsArticle,
  SearchResult,
  TimeRange,
} from "@/types/stocks";

const BASE_URL = "https://www.alphavantage.co/query";

interface CacheEntry<T> {
  data: T;
  expiresAt: number;
}

const cache = new Map<string, CacheEntry<unknown>>();

function getCached<T>(key: string): T | null {
  const entry = cache.get(key) as CacheEntry<T> | undefined;
  if (!entry) return null;
  if (Date.now() > entry.expiresAt) {
    cache.delete(key);
    return null;
  }
  return entry.data;
}

function setCached<T>(key: string, data: T, ttlSeconds: number): void {
  cache.set(key, { data, expiresAt: Date.now() + ttlSeconds * 1000 });
}

async function avFetch(params: Record<string, string>): Promise<unknown> {
  const apiKey = process.env.ALPHA_VANTAGE_API_KEY;
  if (!apiKey) throw new Error("ALPHA_VANTAGE_API_KEY not set");

  const url = new URL(BASE_URL);
  url.searchParams.set("apikey", apiKey);
  for (const [k, v] of Object.entries(params)) {
    url.searchParams.set(k, v);
  }

  const res = await fetch(url.toString(), { next: { revalidate: 0 } });
  if (!res.ok) throw new Error(`Alpha Vantage error: ${res.status}`);
  const json = await res.json();

  if (json["Note"] || json["Information"]) {
    throw new Error("Alpha Vantage rate limit reached");
  }
  return json;
}

export async function getQuote(symbol: string): Promise<StockQuote> {
  const cacheKey = `quote:${symbol}`;
  const cached = getCached<StockQuote>(cacheKey);
  if (cached) return cached;

  const data = (await avFetch({ function: "GLOBAL_QUOTE", symbol })) as Record<
    string,
    Record<string, string>
  >;
  const q = data["Global Quote"];
  if (!q || !q["05. price"]) throw new Error(`No quote data for ${symbol}`);

  const quote: StockQuote = {
    symbol: q["01. symbol"],
    price: parseFloat(q["05. price"]),
    change: parseFloat(q["09. change"]),
    changePercent: parseFloat(q["10. change percent"].replace("%", "")),
    open: parseFloat(q["02. open"]),
    high: parseFloat(q["03. high"]),
    low: parseFloat(q["04. low"]),
    volume: parseInt(q["06. volume"]),
    previousClose: parseFloat(q["08. previous close"]),
    latestTradingDay: q["07. latest trading day"],
  };

  setCached(cacheKey, quote, 60);
  return quote;
}

export async function getOverview(symbol: string): Promise<StockOverview> {
  const cacheKey = `overview:${symbol}`;
  const cached = getCached<StockOverview>(cacheKey);
  if (cached) return cached;

  const data = (await avFetch({
    function: "OVERVIEW",
    symbol,
  })) as Record<string, string>;

  if (!data["Symbol"]) throw new Error(`No overview for ${symbol}`);

  const overview: StockOverview = {
    symbol: data["Symbol"],
    name: data["Name"],
    description: data["Description"],
    exchange: data["Exchange"],
    currency: data["Currency"],
    country: data["Country"],
    sector: data["Sector"],
    industry: data["Industry"],
    marketCap: data["MarketCapitalization"],
    peRatio: data["PERatio"],
    pegRatio: data["PEGRatio"],
    eps: data["EPS"],
    dividendYield: data["DividendYield"],
    fiftyTwoWeekHigh: data["52WeekHigh"],
    fiftyTwoWeekLow: data["52WeekLow"],
    analystTargetPrice: data["AnalystTargetPrice"],
    beta: data["Beta"],
  };

  setCached(cacheKey, overview, 3600);
  return overview;
}

export async function getHistory(
  symbol: string,
  range: TimeRange
): Promise<HistoryDataPoint[]> {
  const cacheKey = `history:${symbol}:${range}`;
  const cached = getCached<HistoryDataPoint[]>(cacheKey);
  if (cached) return cached;

  let data: Record<string, unknown>;
  let seriesKey: string;
  let ttl: number;

  if (range === "1D") {
    data = (await avFetch({
      function: "TIME_SERIES_INTRADAY",
      symbol,
      interval: "5min",
      outputsize: "compact",
    })) as Record<string, unknown>;
    seriesKey = "Time Series (5min)";
    ttl = 300;
  } else {
    const outputsize = range === "5Y" ? "full" : "compact";
    data = (await avFetch({
      function: "TIME_SERIES_DAILY",
      symbol,
      outputsize,
    })) as Record<string, unknown>;
    seriesKey = "Time Series (Daily)";
    ttl = 300;
  }

  const series = data[seriesKey] as
    | Record<string, Record<string, string>>
    | undefined;
  if (!series) throw new Error(`No history for ${symbol}`);

  const cutoff = getRangeCutoff(range);
  const points: HistoryDataPoint[] = Object.entries(series)
    .filter(([date]) => new Date(date).getTime() >= cutoff)
    .map(([date, values]) => ({
      time: new Date(date).getTime() / 1000,
      open: parseFloat(values["1. open"]),
      high: parseFloat(values["2. high"]),
      low: parseFloat(values["3. low"]),
      close: parseFloat(values["4. close"]),
      volume: parseInt(values["5. volume"]),
    }))
    .sort((a, b) => a.time - b.time);

  setCached(cacheKey, points, ttl);
  return points;
}

function getRangeCutoff(range: TimeRange): number {
  const now = Date.now();
  const day = 86400000;
  switch (range) {
    case "1D":
      return now - day;
    case "5D":
      return now - 5 * day;
    case "1M":
      return now - 30 * day;
    case "6M":
      return now - 180 * day;
    case "1Y":
      return now - 365 * day;
    case "5Y":
      return now - 5 * 365 * day;
  }
}

export async function getNews(symbol?: string): Promise<NewsArticle[]> {
  const cacheKey = `news:${symbol ?? "market"}`;
  const cached = getCached<NewsArticle[]>(cacheKey);
  if (cached) return cached;

  const params: Record<string, string> = {
    function: "NEWS_SENTIMENT",
    limit: "20",
  };
  if (symbol) params.tickers = symbol;

  const data = (await avFetch(params)) as {
    feed?: Array<{
      title: string;
      url: string;
      summary: string;
      source: string;
      time_published: string;
      overall_sentiment_label: string;
      overall_sentiment_score: number;
      ticker_sentiment: Array<{ ticker: string }>;
      banner_image?: string;
    }>;
  };

  const articles: NewsArticle[] = (data.feed ?? []).map((item) => ({
    title: item.title,
    url: item.url,
    summary: item.summary,
    source: item.source,
    publishedAt: item.time_published,
    sentiment: normalizeSentiment(item.overall_sentiment_label),
    sentimentScore: item.overall_sentiment_score,
    tickers: item.ticker_sentiment?.map((t) => t.ticker) ?? [],
    image: item.banner_image,
  }));

  setCached(cacheKey, articles, 600);
  return articles;
}

function normalizeSentiment(
  label: string
): "positive" | "negative" | "neutral" {
  if (label?.toLowerCase().includes("bullish")) return "positive";
  if (label?.toLowerCase().includes("bearish")) return "negative";
  return "neutral";
}

export async function searchSymbols(query: string): Promise<SearchResult[]> {
  const cacheKey = `search:${query.toLowerCase()}`;
  const cached = getCached<SearchResult[]>(cacheKey);
  if (cached) return cached;

  const data = (await avFetch({
    function: "SYMBOL_SEARCH",
    keywords: query,
  })) as {
    bestMatches?: Array<{
      "1. symbol": string;
      "2. name": string;
      "3. type": string;
      "4. region": string;
      "8. currency": string;
    }>;
  };

  const results: SearchResult[] = (data.bestMatches ?? []).map((m) => ({
    symbol: m["1. symbol"],
    name: m["2. name"],
    type: m["3. type"],
    region: m["4. region"],
    currency: m["8. currency"],
  }));

  setCached(cacheKey, results, 300);
  return results;
}

// Kept short: each symbol costs one call against the free tier's 25/day.
export const POPULAR_SYMBOLS = ["AAPL", "MSFT", "NVDA", "TSLA"];

export const INDEX_SYMBOLS = [
  { symbol: "SPY", label: "S&P 500" },
  { symbol: "QQQ", label: "NASDAQ 100" },
  { symbol: "DIA", label: "Dow Jones" },
];
