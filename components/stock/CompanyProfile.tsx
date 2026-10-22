import { Globe, Building2 } from "lucide-react";
import type { StockOverview } from "@/types/stocks";

interface Props {
  overview: StockOverview;
}

export default function CompanyProfile({ overview }: Props) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
      <h2 className="font-semibold text-zinc-100 mb-3">About {overview.name}</h2>
      <p className="text-sm text-zinc-400 leading-relaxed mb-4">
        {overview.description || "No description available."}
      </p>
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div className="flex items-center gap-2 text-zinc-400">
          <Building2 className="h-4 w-4 text-zinc-600" />
          <span>{overview.sector} · {overview.industry}</span>
        </div>
        <div className="flex items-center gap-2 text-zinc-400">
          <Globe className="h-4 w-4 text-zinc-600" />
          <span>{overview.exchange} · {overview.country}</span>
        </div>
      </div>
    </div>
  );
}
