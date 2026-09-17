import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Panel } from "@/components/dashboard/Panel";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { Star, MessageCircle, ArrowUpRight, Search } from "lucide-react";
import { InlineFilters } from "@/components/dashboard/InlineFilters";
import { useFilters } from "@/hooks/useFilters";
import { useMemo } from "react";

export const Route = createFileRoute("/ratings")({
  head: () => ({
    meta: [
      { title: "Ratings & Reviews" },
      {
        name: "description",
        content:
          "App store performance, rating distribution and keyword extraction.",
      },
    ],
  }),
  component: RatingsAndReviews,
});

const chartTooltipStyle = {
  contentStyle: {
    background: "oklch(0.22 0.028 250)",
    border: "1px solid oklch(0.3 0.03 255)",
    borderRadius: 8,
    fontSize: 12,
  },
  labelStyle: { color: "oklch(0.97 0.005 250)" },
};

function RatingsAndReviews() {
  const { filters } = useFilters();

  const data = useMemo(() => {
    let multiplier =
      filters.application === "retail_banking"
        ? 0.8
        : filters.application === "corporate_banking"
          ? 0.3
          : filters.application === "retail_onboarding"
            ? 0.2
            : 1.0;
    if (filters.country !== "global") multiplier *= 0.5;

    const distribution = [
      {
        star: 5,
        count: Math.round(24500 * multiplier),
        color: "oklch(0.72 0.18 155)",
      },
      {
        star: 4,
        count: Math.round(12000 * multiplier),
        color: "oklch(0.78 0.16 195)",
      },
      {
        star: 3,
        count: Math.round(4500 * multiplier),
        color: "oklch(0.78 0.16 80)",
      },
      {
        star: 2,
        count: Math.round(2100 * multiplier),
        color: "oklch(0.7 0.17 230)",
      },
      {
        star: 1,
        count: Math.round(5100 * multiplier),
        color: "oklch(0.65 0.25 18)",
      },
    ];

    const keywords = [
      { word: "Login", count: Math.round(1842 * multiplier), type: "negative" },
      { word: "Fast", count: Math.round(1560 * multiplier), type: "positive" },
      { word: "Easy", count: Math.round(1420 * multiplier), type: "positive" },
      { word: "Crash", count: Math.round(980 * multiplier), type: "negative" },
      { word: "UI", count: Math.round(850 * multiplier), type: "positive" },
    ];

    const totalRatings = distribution.reduce(
      (acc, curr) => acc + curr.count,
      0,
    );
    const avgRating = (
      distribution.reduce((acc, curr) => acc + curr.star * curr.count, 0) /
      (totalRatings || 1)
    ).toFixed(1);

    return { distribution, keywords, totalRatings, avgRating };
  }, [filters]);

  return (
    <DashboardLayout
      title="Ratings & Reviews"
      subtitle="Detailed analysis of App Store, Play Store and Web ratings"
    >
      <InlineFilters />

      <div className="grid gap-6 lg:grid-cols-3">
        <Panel title="Rating Summary" className="lg:col-span-1">
          <div className="text-center py-6">
            <div className="text-6xl font-bold tracking-tighter mb-2 text-foreground">
              {data.avgRating}
            </div>
            <div className="flex justify-center gap-1 mb-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star
                  key={i}
                  className={`h-6 w-6 ${i <= Math.round(Number(data.avgRating)) ? "fill-warning text-warning" : "text-muted-foreground/30"}`}
                />
              ))}
            </div>
            <div className="text-sm text-muted-foreground">
              Based on {data.totalRatings.toLocaleString()} reviews
            </div>
          </div>
          <div className="space-y-3 mt-4">
            {data.distribution.map((d) => (
              <div key={d.star} className="flex items-center gap-3">
                <span className="text-xs font-medium w-4 text-foreground">
                  {d.star}
                </span>
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${(d.count / (data.totalRatings || 1)) * 100}%`,
                      backgroundColor: d.color,
                    }}
                  />
                </div>
                <span className="text-xs text-muted-foreground w-10 text-right">
                  {((d.count / (data.totalRatings || 1)) * 100).toFixed(0)}%
                </span>
              </div>
            ))}
          </div>
        </Panel>

        <Panel
          title="Keyword Intelligence"
          subtitle="Most mentioned words in reviews — click to filter"
          className="lg:col-span-2"
        >
          <div className="flex flex-wrap gap-3 p-4">
            {data.keywords.map((kw) => (
              <button
                key={kw.word}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all ${
                  kw.type === "positive"
                    ? "bg-success/5 border-success/20 text-success hover:border-success/50"
                    : "bg-critical/5 border-critical/20 text-critical hover:border-critical/50"
                }`}
              >
                <span className="font-semibold">{kw.word}</span>
                <span className="text-[10px] opacity-70 px-1.5 py-0.5 bg-background rounded-md border border-inherit">
                  {kw.count}
                </span>
              </button>
            ))}
          </div>
          <div className="mt-8 p-4 rounded-xl border border-dashed border-border bg-muted/20 flex flex-col items-center justify-center py-10">
            <MessageCircle className="h-10 w-10 text-muted-foreground mb-3 opacity-20" />
            <p className="text-sm text-muted-foreground">
              Select a keyword to see related reviews
            </p>
          </div>
        </Panel>
      </div>

      <Panel title="Recent Critical Reviews" className="mt-6">
        <div className="space-y-4">
          {[
            {
              user: "Priya R.",
              store: "Play Store",
              rating: 1,
              content:
                "Cannot login after the update. Biometric keeps failing and OTP never arrives.",
              time: "2h ago",
            },
            {
              user: "Wei L.",
              store: "App Store",
              rating: 2,
              content:
                "Stuck on login screen for 10 minutes. Had to use the web app instead.",
              time: "5h ago",
            },
          ].map((r, i) => (
            <div
              key={i}
              className="p-4 rounded-xl border border-border bg-muted/10 group hover:border-critical/30 transition-all shadow-sm"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className={`h-3 w-3 ${s <= r.rating ? "fill-critical text-critical" : "text-muted-foreground/30"}`}
                      />
                    ))}
                  </div>
                  <span className="text-xs font-semibold text-foreground">
                    {r.user}
                  </span>
                  <span className="text-[10px] text-muted-foreground">
                    · {r.store}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] text-muted-foreground">
                    {r.time}
                  </span>
                  <button className="text-[10px] font-bold uppercase text-primary opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                    Respond <ArrowUpRight className="h-3 w-3" />
                  </button>
                </div>
              </div>
              <p className="text-sm text-foreground/80">"{r.content}"</p>
            </div>
          ))}
        </div>
      </Panel>
    </DashboardLayout>
  );
}
