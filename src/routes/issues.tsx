import { createFileRoute, Link } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Panel } from "@/components/dashboard/Panel";
import {
  AlertTriangle,
  TrendingUp,
  Users,
  ArrowRight,
  ShieldAlert,
  Zap,
  Layers,
} from "lucide-react";
import { InlineFilters } from "@/components/dashboard/InlineFilters";
import { useFilters } from "@/hooks/useFilters";
import { useMemo } from "react";

export const Route = createFileRoute("/issues")({
  head: () => ({
    meta: [
      { title: "Issue Intelligence" },
      {
        name: "description",
        content:
          "AI-clustered customer complaints, root cause analysis and emerging issue detection.",
      },
    ],
  }),
  component: IssueIntelligence,
});

const clustersData = [
  {
    id: "login-failure",
    title: "Login Failure",
    users: 850,
    severity: "critical",
    trend: "+24%",
    status: "Active",
    description:
      "Users unable to authenticate after 5.2 update, primarily biometric fallback issues.",
    app: "retail_banking",
    country: "malaysia",
  },
  {
    id: "upi-timeout",
    title: "UPI Timeout",
    users: 612,
    severity: "high",
    trend: "+18%",
    status: "Investigating",
    description:
      "Payment gateway timeouts during peak hours (19:00-21:00 IST).",
    app: "retail_banking",
    country: "india",
  },
  {
    id: "app-crash",
    title: "App Crash on Launch",
    users: 540,
    severity: "critical",
    trend: "+12%",
    status: "Fixing",
    description:
      "Cold start crash on Android 14 devices related to analytics SDK init.",
    app: "retail_banking",
    country: "india",
  },
  {
    id: "slow-loading",
    title: "Slow Dashboard Loading",
    users: 410,
    severity: "medium",
    trend: "+8%",
    status: "Active",
    description: "Latency regression in account aggregation API endpoint.",
    app: "corporate_banking",
    country: "singapore",
  },
];

const sevColor: Record<string, string> = {
  critical: "bg-critical/15 text-critical border-critical/30",
  high: "bg-warning/15 text-warning border-warning/30",
  medium: "bg-info/15 text-info border-info/30",
};

function IssueIntelligence() {
  const { filters } = useFilters();

  const filteredClusters = useMemo(() => {
    return clustersData.filter((c) => {
      const appMatch =
        filters.application === "all" || c.app === filters.application;
      const countryMatch =
        filters.country === "global" || c.country === filters.country;
      return appMatch && countryMatch;
    });
  }, [filters]);

  return (
    <DashboardLayout
      title="Issue Intelligence"
      subtitle="AI-driven clustering and root cause analysis of customer complaints"
    >
      <InlineFilters />

      <div className="grid gap-4 md:grid-cols-3 mb-6">
        <Panel
          title="Emerging Issues"
          action={<Zap className="h-4 w-4 text-warning" />}
        >
          <div className="py-2">
            <h4 className="text-sm font-semibold mb-1 text-foreground">
              Beneficiary Add Loop
            </h4>
            <p className="text-xs text-muted-foreground">
              Detected 15m ago · 45 users affected
            </p>
            <div className="mt-3 flex items-center gap-2">
              <span className="px-2 py-0.5 bg-warning/10 text-warning text-[10px] font-bold rounded uppercase">
                New
              </span>
              <button className="text-[10px] font-bold text-primary ml-auto">
                Analyze
              </button>
            </div>
          </div>
        </Panel>
        <Panel
          title="Active Criticals"
          action={<ShieldAlert className="h-4 w-4 text-critical" />}
        >
          <div className="flex items-end justify-between">
            <div className="text-3xl font-bold text-foreground">
              {String(
                filteredClusters.filter((c) => c.severity === "critical")
                  .length,
              ).padStart(2, "0")}
            </div>
            <div className="text-xs text-muted-foreground mb-1">
              Clusters requiring action
            </div>
          </div>
        </Panel>
        <Panel
          title="Avg. Resolution"
          action={<Layers className="h-4 w-4 text-info" />}
        >
          <div className="flex items-end justify-between">
            <div className="text-3xl font-bold text-foreground">4.2h</div>
            <div className="text-xs text-muted-foreground mb-1">
              -15% from last week
            </div>
          </div>
        </Panel>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-xl font-bold text-foreground">
            Issue Clusters
          </h2>
          <div className="flex gap-2">
            {["All", "Critical", "High", "Medium"].map((f) => (
              <button
                key={f}
                className="px-3 py-1 bg-muted/50 rounded-lg text-xs font-medium border border-border/50 hover:bg-muted transition-colors text-foreground"
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {filteredClusters.length > 0 ? (
          <div className="grid gap-4 lg:grid-cols-2">
            {filteredClusters.map((c) => (
              <Link
                key={c.id}
                to="/issues/$issueId"
                params={{ issueId: c.id }}
                className="group block bg-card border border-border rounded-xl p-5 hover:border-primary/40 transition-all shadow-sm hover:shadow-md"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${sevColor[c.severity]}`}>
                      <AlertTriangle className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold group-hover:text-primary transition-colors text-foreground">
                        {c.title}
                      </h3>
                      <div className="text-[10px] text-muted-foreground uppercase tracking-widest mt-0.5">
                        {c.status}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div
                      className={`text-sm font-bold flex items-center justify-end gap-1 ${c.trend.startsWith("+") ? "text-critical" : "text-success"}`}
                    >
                      <TrendingUp className="h-3.5 w-3.5" /> {c.trend}
                    </div>
                    <div className="text-[10px] text-muted-foreground">
                      Volume Trend
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  "{c.description}"
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-border/50">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5 text-xs text-foreground">
                      <Users className="h-3.5 w-3.5 text-muted-foreground" />
                      <span className="font-medium">{c.users}</span>
                      <span className="text-muted-foreground">affected</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-primary flex items-center gap-1">
                    View Detail <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="bg-card border border-dashed border-border rounded-xl p-12 text-center shadow-sm">
            <AlertTriangle className="h-8 w-8 text-muted-foreground/30 mx-auto mb-3" />
            <p className="text-sm text-muted-foreground">
              No active issue clusters for the selected filters.
            </p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
