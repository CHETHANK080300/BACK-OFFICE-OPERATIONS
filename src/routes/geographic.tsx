import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Panel } from "@/components/dashboard/Panel";
import { Globe2, ArrowUpRight, AlertTriangle } from "lucide-react";
import { InlineFilters } from "@/components/dashboard/InlineFilters";
import { useFilters } from "@/hooks/useFilters";
import { useMemo } from "react";

export const Route = createFileRoute("/geographic")({
  head: () => ({
    meta: [
      { title: "Geographic Analytics" },
      {
        name: "description",
        content:
          "Interactive world map and regional drill-down for sentiment, issues and user feedback.",
      },
    ],
  }),
  component: GeographicAnalytics,
});

function GeographicAnalytics() {
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

    const regions = [
      {
        name: "India",
        users: "1.2M",
        feedback: "25K",
        issues: 12 * multiplier,
        sentiment: 72,
        trend: "+5%",
      },
      {
        name: "Malaysia",
        users: "450K",
        feedback: "8.2K",
        issues: 45 * multiplier,
        sentiment: 45,
        trend: "-12%",
      },
      {
        name: "Singapore",
        users: "320K",
        feedback: "5.4K",
        issues: 28 * multiplier,
        sentiment: 58,
        trend: "-8%",
      },
      {
        name: "UAE",
        users: "180K",
        feedback: "3.1K",
        issues: 4 * multiplier,
        sentiment: 82,
        trend: "+2%",
      },
      {
        name: "UK",
        users: "120K",
        feedback: "2.5K",
        issues: 6 * multiplier,
        sentiment: 78,
        trend: "+1%",
      },
    ];

    if (filters.country !== "global") {
      return {
        regions: regions.filter(
          (r) => r.name.toLowerCase() === filters.country,
        ),
      };
    }

    return { regions };
  }, [filters]);

  return (
    <DashboardLayout
      title="Geographic Analytics"
      subtitle="Regional performance tracking and location-based customer insights"
    >
      <InlineFilters />

      <div className="grid gap-6 lg:grid-cols-3 mb-6">
        <Panel
          title="Regional Heat Map"
          subtitle="Distribution of issues across geographies"
          className="lg:col-span-2"
        >
          <div className="h-[400px] w-full rounded-xl bg-muted/20 border border-border flex flex-col items-center justify-center p-8 text-center shadow-inner">
            <Globe2 className="h-24 w-24 text-primary/20 mb-4 animate-pulse" />
            <h3 className="font-display text-lg font-bold mb-2 text-foreground">
              Interactive Map Loading
            </h3>
            <p className="text-sm text-muted-foreground max-w-sm">
              Connecting to GIS services for real-time regional sentiment and
              issue clustering...
            </p>
            <div className="mt-8 flex gap-3">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-critical" />
                <span className="text-[10px] text-muted-foreground uppercase font-bold">
                  High Issues
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-warning" />
                <span className="text-[10px] text-muted-foreground uppercase font-bold">
                  Medium Issues
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-success" />
                <span className="text-[10px] text-muted-foreground uppercase font-bold">
                  Low Issues
                </span>
              </div>
            </div>
          </div>
        </Panel>

        <Panel title="Regional Performance">
          <div className="space-y-4">
            {data.regions.map((r) => (
              <div
                key={r.name}
                className="p-3 rounded-lg border border-border bg-muted/10 group hover:border-primary/30 transition-all cursor-pointer shadow-sm"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold text-foreground">
                    {r.name}
                  </span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <div className="grid grid-cols-2 gap-y-3">
                  <div>
                    <div className="text-[10px] uppercase text-muted-foreground">
                      Users
                    </div>
                    <div className="text-xs font-semibold text-foreground">
                      {r.users}
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase text-muted-foreground">
                      Sentiment
                    </div>
                    <div
                      className={`text-xs font-semibold ${r.sentiment < 50 ? "text-critical" : "text-success"}`}
                    >
                      {r.sentiment}%
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase text-muted-foreground">
                      Issues
                    </div>
                    <div
                      className={`text-xs font-semibold ${r.issues > 20 ? "text-critical" : "text-foreground"}`}
                    >
                      {Math.round(r.issues)}
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase text-muted-foreground">
                      Trend
                    </div>
                    <div
                      className={`text-xs font-semibold ${r.trend.startsWith("+") ? "text-success" : "text-critical"}`}
                    >
                      {r.trend}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Panel title="Top Regional Issues">
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/5 border border-border/50">
              <div className="p-2 bg-critical/10 rounded-lg shrink-0">
                <AlertTriangle className="h-4 w-4 text-critical" />
              </div>
              <div>
                <div className="text-sm font-semibold text-foreground">
                  OTP Delivery (Malaysia)
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  62% of users in Malaysia reporting delays in OTP reception on
                  local carriers.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/5 border border-border/50">
              <div className="p-2 bg-warning/10 rounded-lg shrink-0">
                <AlertTriangle className="h-4 w-4 text-warning" />
              </div>
              <div>
                <div className="text-sm font-semibold text-foreground">
                  UPI Latency (India)
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Increased timeout reports from Tier 2 cities in India during
                  evening peak.
                </p>
              </div>
            </div>
          </div>
        </Panel>

        <Panel title="Global User Distribution">
          <div className="space-y-3">
            {data.regions.map((r) => {
              const max = 1200000;
              const val = parseInt(
                r.users.replace("M", "000000").replace("K", "000"),
              );
              const pct = (val / max) * 100;
              return (
                <div key={r.name}>
                  <div className="flex justify-between text-[10px] mb-1">
                    <span className="font-bold text-foreground uppercase">
                      {r.name}
                    </span>
                    <span className="text-muted-foreground">{r.users}</span>
                  </div>
                  <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </Panel>
      </div>
    </DashboardLayout>
  );
}
