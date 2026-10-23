import { NextRequest, NextResponse } from "next/server";
import { searchSymbols } from "@/lib/alpha-vantage";

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q");
  if (!q || q.trim().length < 1) {
    return NextResponse.json([]);
  }
  try {
    const results = await searchSymbols(q.trim());
    return NextResponse.json(results, {
      headers: { "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=86400" },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
