import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ symbol: string }> }
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { symbol } = await params;

  await db.watchlistItem.deleteMany({
    where: {
      userId: session.user.id,
      symbol: symbol.toUpperCase(),
    },
  });

  return NextResponse.json({ success: true });
}
