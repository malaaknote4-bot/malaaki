import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const items = await db.watchlistItem.findMany({
    where: { userId: session.user.id },
    orderBy: { addedAt: "desc" },
  });

  return NextResponse.json(items);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { symbol } = body;

  if (!symbol || typeof symbol !== "string") {
    return NextResponse.json({ error: "symbol required" }, { status: 400 });
  }

  const item = await db.watchlistItem.upsert({
    where: {
      userId_symbol: {
        userId: session.user.id,
        symbol: symbol.toUpperCase(),
      },
    },
    update: {},
    create: {
      userId: session.user.id,
      symbol: symbol.toUpperCase(),
    },
  });

  return NextResponse.json(item, { status: 201 });
}
