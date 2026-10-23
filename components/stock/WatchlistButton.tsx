"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  symbol: string;
}

export default function WatchlistButton({ symbol }: Props) {
  const { data: session } = useSession();
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!session) return;
    fetch("/api/portfolio")
      .then((r) => r.json())
      .then((items: Array<{ symbol: string }>) => {
        setSaved(items.some((i) => i.symbol === symbol));
      })
      .catch(() => {});
  }, [session, symbol]);

  if (!session) {
    return (
      <Button variant="outline" size="sm" disabled>
        <Bookmark className="h-4 w-4 mr-1.5" />
        Sign in to save
      </Button>
    );
  }

  async function toggle() {
    setLoading(true);
    try {
      if (saved) {
        await fetch(`/api/portfolio/${symbol}`, { method: "DELETE" });
        setSaved(false);
      } else {
        await fetch("/api/portfolio", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ symbol }),
        });
        setSaved(true);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button
      variant={saved ? "default" : "outline"}
      size="sm"
      onClick={toggle}
      disabled={loading}
    >
      {saved ? (
        <>
          <BookmarkCheck className="h-4 w-4 mr-1.5" />
          Saved
        </>
      ) : (
        <>
          <Bookmark className="h-4 w-4 mr-1.5" />
          Save to Watchlist
        </>
      )}
    </Button>
  );
}
