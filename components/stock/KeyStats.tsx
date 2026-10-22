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

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
      <h2 className="font-semibold text-zinc-100 mb-4">Key Statistics</h2>
      <dl className="grid grid-cols-2 sm:grid-cols-3 gap-y-3 gap-x-4">
        {stats.map(({ label, value }) => (
          <div key={label}>
            <dt className="text-xs text-zinc-500">{label}</dt>
            <dd className="text-sm font-medium text-zinc-200 mt-0.5">{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
