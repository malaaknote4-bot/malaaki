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
        background: { type: ColorType.Solid, color: "#18181b" },
        textColor: "#a1a1aa",
      },
      grid: {
        vertLines: { color: "#27272a" },
        horzLines: { color: "#27272a" },
      },
      crosshair: { mode: 1 },
      rightPriceScale: { borderColor: "#27272a" },
      timeScale: { borderColor: "#27272a", timeVisible: true },
      width: chartContainerRef.current.clientWidth,
      height: 300,
    });

    const series = chart.addSeries(AreaSeries, {
      lineColor: "#3b82f6",
      topColor: "rgba(59, 130, 246, 0.3)",
      bottomColor: "rgba(59, 130, 246, 0.0)",
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
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
      {/* Range tabs */}
      <div className="flex gap-1 mb-4">
        {RANGES.map((r) => (
          <button
            key={r}
            onClick={() => setRange(r)}
            className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
              range === r
                ? "bg-blue-600 text-white"
                : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800"
            }`}
          >
            {r}
          </button>
        ))}
      </div>

      <div className="relative">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-zinc-900/70 rounded z-10">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-zinc-600 border-t-blue-400" />
          </div>
        )}
        <div ref={chartContainerRef} />
      </div>
    </div>
  );
}
