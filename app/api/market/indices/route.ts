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

    return NextResponse.json(results);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
