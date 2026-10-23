import { NextRequest, NextResponse } from "next/server";
import { getHistory } from "@/lib/alpha-vantage";
import type { TimeRange } from "@/types/stocks";

const VALID_RANGES: TimeRange[] = ["1D", "5D", "1M", "6M", "1Y", "5Y"];

export async function GET(req: NextRequest) {
  const symbol = req.nextUrl.searchParams.get("symbol");
  const range = req.nextUrl.searchParams.get("range") as TimeRange;

  if (!symbol) {
    return NextResponse.json({ error: "symbol required" }, { status: 400 });
  }
  if (!VALID_RANGES.includes(range)) {
    return NextResponse.json(
      { error: `range must be one of ${VALID_RANGES.join(", ")}` },
      { status: 400 }
    );
  }

  try {
    const data = await getHistory(symbol.toUpperCase(), range);
    return NextResponse.json(data, {
      headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200" },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
