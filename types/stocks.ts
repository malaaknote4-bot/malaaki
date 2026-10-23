export interface StockQuote {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  open: number;
  high: number;
  low: number;
  volume: number;
  previousClose: number;
  latestTradingDay: string;
}

export interface StockOverview {
  symbol: string;
  name: string;
  description: string;
  exchange: string;
  currency: string;
  country: string;
  sector: string;
  industry: string;
  marketCap: string;
  peRatio: string;
  pegRatio: string;
  eps: string;
  dividendYield: string;
  fiftyTwoWeekHigh: string;
  fiftyTwoWeekLow: string;
  analystTargetPrice: string;
  beta: string;
}

export interface HistoryDataPoint {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface NewsArticle {
  title: string;
  url: string;
  summary: string;
  source: string;
  publishedAt: string;
  sentiment: "positive" | "negative" | "neutral";
  sentimentScore: number;
  tickers: string[];
  image?: string;
}

export interface SearchResult {
  symbol: string;
  name: string;
  type: string;
  region: string;
  currency: string;
}

export type TimeRange = "1D" | "5D" | "1M" | "6M" | "1Y" | "5Y";
