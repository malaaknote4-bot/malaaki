import { formatCurrency, formatLargeNumber } from "@/lib/utils";
import type { StockQuote, StockOverview } from "@/types/stocks";

interface Props {
  quote: StockQuote;
  overview: StockOverview;
}

export default function KeyStats({ quote, overview }: Props) {
  const stats = [
    { label: "Open", value: formatCurrency(quote.open) },
    { label: "Previous Close", value: formatCurrency(quote.previousClose) },
    { label: "Day High", value: formatCurrency(quote.high) },
    { label: "Day Low", value: formatCurrency(quote.low) },
    { label: "Volume", value: quote.volume.toLocaleString() },
    { label: "Market Cap", value: formatLargeNumber(parseFloat(overview.marketCap)) },
    { label: "P/E Ratio", value: overview.peRatio !== "None" ? overview.peRatio : "—" },
    { label: "EPS", value: overview.eps !== "None" ? `$${overview.eps}` : "—" },
    { label: "52W High", value: formatCurrency(parseFloat(overview.fiftyTwoWeekHigh)) },
    { label: "52W Low", value: formatCurrency(parseFloat(overview.fiftyTwoWeekLow)) },
    { label: "Beta", value: overview.beta !== "None" ? parseFloat(overview.beta).toFixed(2) : "—" },
    { label: "Dividend Yield", value: overview.dividendYield !== "None" && overview.dividendYield !== "0" ? `${(parseFloat(overview.dividendYield) * 100).toFixed(2)}%` : "—" },
  ];

  const HIGH_LABELS = new Set(["52W High", "Day High"]);
  const LOW_LABELS  = new Set(["52W Low", "Day Low"]);

  return (
    <div className="rounded-2xl border border-border bg-surface p-5">
      <h2 className="text-xs font-semibold tracking-widest uppercase text-muted mb-4">Statistics</h2>
      <dl className="grid grid-cols-2 sm:grid-cols-3 gap-y-4 gap-x-6">
        {stats.map(({ label, value }) => (
          <div key={label}>
            <dt className="text-xs text-muted mb-0.5 uppercase tracking-wider">{label}</dt>
            <dd className={`text-sm font-semibold tabular-nums ${
              HIGH_LABELS.has(label) ? "text-accent-lt" :
              LOW_LABELS.has(label)  ? "text-negative"  :
              "text-foreground"
            }`}>{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
