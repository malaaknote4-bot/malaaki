import { NextRequest, NextResponse } from "next/server";
import { getNews } from "@/lib/alpha-vantage";

export async function GET(req: NextRequest) {
  const symbol = req.nextUrl.searchParams.get("symbol") ?? undefined;
  try {
    const articles = await getNews(symbol?.toUpperCase());
    return NextResponse.json(articles, {
      headers: { "Cache-Control": "public, s-maxage=1800, stale-while-revalidate=3600" },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
