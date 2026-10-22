"use client";

import { useEffect, useRef, useState } from "react";
import { createChart, ColorType, AreaSeries, type IChartApi, type ISeriesApi, type AreaData, type Time } from "lightweight-charts";
import type { TimeRange } from "@/types/stocks";

const RANGES: TimeRange[] = ["1D", "5D", "1M", "6M", "1Y", "5Y"];

interface HistoryPoint {
  time: number;
  close: number;
}

export default function StockChart({ symbol }: { symbol: string }) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const seriesRef = useRef<ISeriesApi<"Area"> | null>(null);
  const [range, setRange] = useState<TimeRange>("1M");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: "#0f0f23" },
        textColor: "#71717a",
      },
      grid: {
        vertLines: { color: "rgba(255,255,255,0.04)", style: 1 },
        horzLines: { color: "rgba(255,255,255,0.04)", style: 1 },
      },
      crosshair: { mode: 1 },
      rightPriceScale: { borderColor: "rgba(255,255,255,0.06)" },
      timeScale: { borderColor: "rgba(255,255,255,0.06)", timeVisible: true },
      width: chartContainerRef.current.clientWidth,
      height: 280,
    });

    const series = chart.addSeries(AreaSeries, {
      lineColor: "#ffffff",
      topColor: "rgba(67, 97, 238, 0.25)",
      bottomColor: "rgba(67, 97, 238, 0.0)",
      lineWidth: 2,
    });

    chartRef.current = chart;
    seriesRef.current = series;

    const resizeObserver = new ResizeObserver(() => {
      if (chartContainerRef.current) {
        chart.applyOptions({ width: chartContainerRef.current.clientWidth });
      }
    });
    resizeObserver.observe(chartContainerRef.current);

    return () => {
      resizeObserver.disconnect();
      chart.remove();
    };
  }, []);

  useEffect(() => {
    if (!seriesRef.current) return;

    setLoading(true);
    fetch(`/api/stocks/history?symbol=${symbol}&range=${range}`)
      .then((r) => r.json())
      .then((data: HistoryPoint[]) => {
        if (!Array.isArray(data) || !seriesRef.current) return;
        const chartData: AreaData<Time>[] = data.map((p) => ({
          time: p.time as Time,
          value: p.close,
        }));
        seriesRef.current.setData(chartData);
        chartRef.current?.timeScale().fitContent();
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [symbol, range]);

  return (
    <div className="rounded-2xl border border-border bg-surface3 overflow-hidden">
      {/* Range chips */}
      <div className="flex gap-2 px-4 pt-4 pb-3">
        {RANGES.map((r) => (
          <button
            key={r}
            onClick={() => setRange(r)}
            className={`px-3.5 py-1 rounded-full text-xs font-semibold transition-colors ${
              range === r
                ? "bg-white text-zinc-900"
                : "text-soft hover:text-foreground hover:bg-white/5 border border-border"
            }`}
          >
            {r}
          </button>
        ))}
      </div>

      <div className="relative">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-surface3/80 z-10">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-border border-t-accent-lt" />
          </div>
        )}
        <div ref={chartContainerRef} />
      </div>
    </div>
  );
}
