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
  LineChart,
  Line,
  Legend,
} from "recharts";
import { Rocket, ArrowDown, ArrowUp } from "lucide-react";
import { InlineFilters } from "@/components/dashboard/InlineFilters";
import { useFilters } from "@/hooks/useFilters";
import { useMemo } from "react";

export const Route = createFileRoute("/releases")({
  head: () => ({
    meta: [
      { title: "Release Impact" },
      {
        name: "description",
        content:
          "Track application performance before and after releases. Sentiment and rating regression monitoring.",
      },
    ],
  }),
  component: ReleaseImpact,
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

function ReleaseImpact() {
  const { filters } = useFilters();

  const data = useMemo(() => {
    const multiplier =
      filters.application === "retail_banking"
        ? 1.0
        : filters.application === "corporate_banking"
          ? 0.4
          : filters.application === "retail_onboarding"
            ? 0.3
            : 1.0;

    const releases = [
      {
        version: "5.2.1",
        date: "May 15, 2026",
        status: "Active",
        rating: 3.8,
        prevRating: 4.4,
        complaints: "+250%",
      },
      {
        version: "5.2.0",
        date: "May 10, 2026",
        status: "Rolled Back",
        rating: 3.2,
        prevRating: 4.5,
        complaints: "+400%",
      },
      {
        version: "5.1.3",
        date: "Apr 28, 2026",
        status: "Stable",
        rating: 4.4,
        prevRating: 4.3,
        complaints: "-5%",
      },
    ];

    const compareData = [
      { metric: "Avg Rating", before: 4.5, after: 3.8 },
      { metric: "Sentiment", before: 78, after: 42 },
      { metric: "Load Time", before: 1.2, after: 2.8 },
      { metric: "Crash Rate", before: 0.2, after: 1.5 },
    ];

    const trendData = [
      { day: "-3", rating: 4.5, complaints: 45 * multiplier },
      { day: "-2", rating: 4.4, complaints: 52 * multiplier },
      { day: "-1", rating: 4.5, complaints: 48 * multiplier },
      { day: "Release", rating: 3.8, complaints: 240 * multiplier },
      { day: "+1", rating: 3.5, complaints: 380 * multiplier },
      { day: "+2", rating: 3.2, complaints: 420 * multiplier },
      { day: "+3", rating: 3.6, complaints: 310 * multiplier },
    ];

    return { releases, compareData, trendData };
  }, [filters]);

  return (
    <DashboardLayout
      title="Release Impact Analysis"
      subtitle="Monitor how new application versions affect customer experience metrics"
    >
      <InlineFilters />

      <div className="grid gap-6 lg:grid-cols-3 mb-6">
        <Panel title="Active Release" className="lg:col-span-1">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center shadow-sm">
              <Rocket className="h-6 w-6 text-primary" />
            </div>
            <div>
              <div className="text-xl font-bold text-foreground">v5.2.1</div>
              <div className="text-xs text-muted-foreground">
                Released 3 days ago
              </div>
            </div>
            <div className="ml-auto">
              <span className="px-2 py-1 rounded bg-warning/10 text-warning text-[10px] font-bold uppercase">
                At Risk
              </span>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">Rating Impact</div>
              <div className="text-sm font-bold text-critical flex items-center gap-1">
                <ArrowDown className="h-3 w-3" /> 0.6 pts
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                Sentiment Shift
              </div>
              <div className="text-sm font-bold text-critical flex items-center gap-1">
                <ArrowDown className="h-3 w-3" /> 36%
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                Complaint Volume
              </div>
              <div className="text-sm font-bold text-critical flex items-center gap-1">
                <ArrowUp className="h-3 w-3" /> 250%
              </div>
            </div>
          </div>
        </Panel>

        <Panel
          title="Before vs After Comparison"
          subtitle="V5.1.3 vs V5.2.1"
          className="lg:col-span-2"
        >
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={data.compareData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="oklch(0.3 0.03 255 / 0.4)"
              />
              <XAxis
                dataKey="metric"
                stroke="oklch(0.68 0.025 250)"
                fontSize={11}
              />
              <YAxis stroke="oklch(0.68 0.025 250)" fontSize={11} />
              <Tooltip {...chartTooltipStyle} />
              <Legend
                verticalAlign="top"
                height={36}
                wrapperStyle={{ fontSize: 11 }}
              />
              <Bar
                dataKey="before"
                fill="oklch(0.7 0.17 230)"
                radius={[4, 4, 0, 0]}
                name="Before Release"
              />
              <Bar
                dataKey="after"
                fill="oklch(0.65 0.25 18)"
                radius={[4, 4, 0, 0]}
                name="After Release"
              />
            </BarChart>
          </ResponsiveContainer>
        </Panel>
      </div>

      <Panel
        title="Release Impact Timeline"
        subtitle="Metrics tracking around the deployment window"
        className="mb-6"
      >
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={data.trendData}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="oklch(0.3 0.03 255 / 0.4)"
            />
            <XAxis dataKey="day" stroke="oklch(0.68 0.025 250)" fontSize={11} />
            <YAxis
              yAxisId="left"
              stroke="oklch(0.68 0.025 250)"
              fontSize={11}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              stroke="oklch(0.68 0.025 250)"
              fontSize={11}
            />
            <Tooltip {...chartTooltipStyle} />
            <Legend
              verticalAlign="top"
              height={36}
              wrapperStyle={{ fontSize: 11 }}
            />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="rating"
              stroke="oklch(0.78 0.16 80)"
              strokeWidth={3}
              name="Rating"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="complaints"
              stroke="oklch(0.65 0.25 18)"
              strokeWidth={3}
              name="Complaints"
            />
          </LineChart>
        </ResponsiveContainer>
      </Panel>

      <Panel title="Historical Release Performance">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted/50 text-[10px] uppercase font-bold text-muted-foreground">
              <tr>
                <th className="px-4 py-3">Version</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Avg Rating</th>
                <th className="px-4 py-3">Complaint Trend</th>
                <th className="px-4 py-3 text-right text-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50 text-foreground">
              {data.releases.map((r) => (
                <tr key={r.version} className="hover:bg-muted/20">
                  <td className="px-4 py-3 font-semibold">{r.version}</td>
                  <td className="px-4 py-3 text-muted-foreground">{r.date}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        r.status === "Stable"
                          ? "bg-success/10 text-success"
                          : r.status === "Rolled Back"
                            ? "bg-critical/10 text-critical"
                            : "bg-warning/10 text-warning"
                      }`}
                    >
                      {r.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {r.rating}
                      <span
                        className={`text-[10px] ${r.rating >= r.prevRating ? "text-success" : "text-critical"}`}
                      >
                        {r.rating >= r.prevRating ? "↑" : "↓"}{" "}
                        {Math.abs(r.rating - r.prevRating).toFixed(1)}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={
                        r.complaints.startsWith("+")
                          ? "text-critical"
                          : "text-success"
                      }
                    >
                      {r.complaints}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button className="text-[10px] font-bold uppercase text-primary">
                      View Report
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </DashboardLayout>
  );
}
