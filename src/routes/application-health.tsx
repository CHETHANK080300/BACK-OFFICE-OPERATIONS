import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Panel } from "@/components/dashboard/Panel";
import {
  Activity,
  Star,
  MessageSquare,
  AlertOctagon,
  ArrowRight,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { InlineFilters } from "@/components/dashboard/InlineFilters";
import { useFilters } from "@/hooks/useFilters";
import { useMemo } from "react";

export const Route = createFileRoute("/application-health")({
  head: () => ({
    meta: [
      { title: "Application Health" },
      {
        name: "description",
        content:
          "Per-app health scores, module heat maps and drill-down to feature-level feedback.",
      },
    ],
  }),
  component: ApplicationHealth,
});

const appsData = [
  {
    id: "retail_banking",
    name: "Retail Banking",
    score: 78,
    feedback: 4500,
    rating: 4.2,
    issues: 5,
  },
  {
    id: "corporate_banking",
    name: "Corporate Banking",
    score: 92,
    feedback: 1200,
    rating: 4.6,
    issues: 1,
  },
  {
    id: "retail_onboarding",
    name: "Wealth Banking",
    score: 85,
    feedback: 850,
    rating: 4.4,
    issues: 2,
  },
];

const modulesData = [
  {
    name: "Authentication",
    complaints: 1842,
    rating: 3.2,
    sentiment: "negative",
    health: 45,
  },
  {
    name: "Dashboard",
    complaints: 720,
    rating: 4.0,
    sentiment: "neutral",
    health: 75,
  },
  {
    name: "Transfers",
    complaints: 540,
    rating: 3.8,
    sentiment: "negative",
    health: 65,
  },
  {
    name: "Accounts",
    complaints: 320,
    rating: 4.5,
    sentiment: "positive",
    health: 88,
  },
  {
    name: "Cards",
    complaints: 150,
    rating: 4.2,
    sentiment: "positive",
    health: 90,
  },
  {
    name: "Investments",
    complaints: 80,
    rating: 4.6,
    sentiment: "positive",
    health: 94,
  },
];

function ApplicationHealth() {
  const { filters } = useFilters();

  const filteredApps = useMemo(() => {
    if (filters.application === "all") return appsData;
    return appsData.filter((app) => app.id === filters.application);
  }, [filters.application]);

  return (
    <DashboardLayout
      title="Application Health"
      subtitle="Monitor cross-application health scores and identify failing modules"
    >
      <InlineFilters />

      <div className="grid gap-4 md:grid-cols-3">
        {filteredApps.map((app) => (
          <Panel
            key={app.id}
            title={app.name}
            action={
              <div
                className={`text-xl font-bold ${app.score < 80 ? "text-critical" : "text-success"}`}
              >
                {app.score}%
              </div>
            }
          >
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Feedback Count</span>
                <span className="font-medium text-foreground">
                  {app.feedback.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Average Rating</span>
                <span className="font-medium flex items-center gap-1 text-foreground">
                  {app.rating}{" "}
                  <Star className="h-3 w-3 fill-warning text-warning" />
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Critical Issues</span>
                <span
                  className={`font-medium ${app.issues > 3 ? "text-critical" : "text-foreground"}`}
                >
                  {app.issues}
                </span>
              </div>
              <button className="w-full mt-2 rounded-lg border border-border bg-muted/30 py-2 text-xs font-medium hover:bg-muted/50 transition-colors text-foreground">
                View Detailed Health
              </button>
            </div>
          </Panel>
        ))}
      </div>

      <Panel
        title="Module Analytics"
        subtitle="Heat map of module-level performance"
        className="mt-6"
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {modulesData.map((m) => {
            const multiplier = filters.application === "all" ? 1 : 0.6;
            const displayComplaints = Math.round(m.complaints * multiplier);
            return (
              <div
                key={m.name}
                className="relative group overflow-hidden rounded-xl border border-border p-4 hover:border-primary/40 transition-all bg-muted/5 shadow-sm"
              >
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium text-foreground">{m.name}</h4>
                  <div
                    className={`h-2.5 w-2.5 rounded-full ${
                      m.health < 60
                        ? "bg-critical"
                        : m.health < 85
                          ? "bg-warning"
                          : "bg-success"
                    }`}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-[10px] uppercase text-muted-foreground">
                      Complaints
                    </div>
                    <div className="text-sm font-semibold text-foreground">
                      {displayComplaints}
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase text-muted-foreground">
                      Rating
                    </div>
                    <div className="text-sm font-semibold flex items-center gap-1 text-foreground">
                      {m.rating}{" "}
                      <Star className="h-3 w-3 fill-warning text-warning" />
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex justify-between text-[10px] uppercase text-muted-foreground mb-1">
                    <span>Health Score</span>
                    <span className="text-foreground">{m.health}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        m.health < 60
                          ? "bg-critical"
                          : m.health < 85
                            ? "bg-warning"
                            : "bg-success"
                      }`}
                      style={{ width: `${m.health}%` }}
                    />
                  </div>
                </div>
                <Link
                  to="/issues"
                  className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
                >
                  <span className="flex items-center gap-1.5 text-xs font-semibold text-primary bg-background border border-primary/20 px-3 py-1.5 rounded-full shadow-lg">
                    Drill Down <ArrowRight className="h-3 w-3" />
                  </span>
                </Link>
              </div>
            );
          })}
        </div>
      </Panel>
    </DashboardLayout>
  );
}
