import { NextResponse } from "next/server";
import { getQuote, INDEX_SYMBOLS } from "@/lib/alpha-vantage";

export async function GET() {
  try {
    const quotes = await Promise.allSettled(
      INDEX_SYMBOLS.map(async ({ symbol, label }) => {
        const quote = await getQuote(symbol);
        return { ...quote, label };
      })
    );

    const results = quotes
      .filter((r) => r.status === "fulfilled")
      .map((r) => (r as PromiseFulfilledResult<unknown>).value);

    // An empty list means every quote failed; don't let the CDN hold on to it.
    return NextResponse.json(results, {
      headers:
        results.length > 0
          ? { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600" }
          : { "Cache-Control": "no-store" },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
