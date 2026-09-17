import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Panel } from "@/components/dashboard/Panel";
import {
  Sparkles,
  TrendingUp,
  AlertOctagon,
  Lightbulb,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { InlineFilters } from "@/components/dashboard/InlineFilters";
import { useFilters } from "@/hooks/useFilters";
import { useMemo } from "react";

export const Route = createFileRoute("/recommendations")({
  head: () => ({
    meta: [
      { title: "AI Recommendations" },
      {
        name: "description",
        content:
          "Actionable AI-generated insights to improve customer experience and application performance.",
      },
    ],
  }),
  component: AIRecommendations,
});

function AIRecommendations() {
  const { filters } = useFilters();

  const filteredRecs = useMemo(() => {
    const allRecs = [
      {
        id: 1,
        type: "Critical Action",
        title: "Investigate Authentication Service",
        description:
          "Login complaints increased 72% after release 5.2. Root cause clustering points to OTP delivery and biometric fallback regressions.",
        impact: "High",
        icon: AlertOctagon,
        color: "text-critical",
        bgColor: "bg-critical/10",
        action: "Roll back service v5.2",
        app: "retail_banking",
      },
      {
        id: 2,
        type: "Optimization",
        title: "Prioritize Beneficiary Enhancement",
        description:
          "The Beneficiary module has 35 unique feature requests this week. Users are specifically asking for 'Bulk Add' and 'Smart Search'.",
        impact: "Medium",
        icon: Lightbulb,
        color: "text-warning",
        bgColor: "bg-warning/10",
        action: "Add to Roadmap",
        app: "retail_banking",
      },
      {
        id: 3,
        type: "UX Insight",
        title: "Simplify Transfer Flow",
        description:
          "AI detected a 45% drop-off rate on the 'Confirm Transfer' screen. 82% of users take more than 15 seconds to find the 'Submit' button.",
        impact: "High",
        icon: Sparkles,
        color: "text-primary",
        bgColor: "bg-primary/10",
        action: "View Heat Map",
        app: "corporate_banking",
      },
      {
        id: 4,
        type: "Performance",
        title: "Optimize Dashboard API",
        description:
          "Latency in Retail Banking dashboard aggregation has increased to 4.2s (p95). Predicted impact: 15% drop in CSAT if not addressed within 48h.",
        impact: "Medium",
        icon: TrendingUp,
        color: "text-info",
        bgColor: "bg-info/10",
        action: "Analyze Trace",
        app: "retail_banking",
      },
    ];

    return allRecs.filter(
      (r) => filters.application === "all" || r.app === filters.application,
    );
  }, [filters.application]);

  return (
    <DashboardLayout
      title="AI Recommendation Center"
      subtitle="Data-driven suggestions to optimize your application's customer experience"
    >
      <InlineFilters />

      <div className="grid gap-6 lg:grid-cols-2">
        {filteredRecs.length > 0 ? (
          filteredRecs.map((rec) => (
            <div
              key={rec.id}
              className="bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/40 transition-all flex flex-col shadow-sm"
            >
              <div className="p-6 flex-1">
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${rec.bgColor} ${rec.color}`}
                  >
                    {rec.type}
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] font-semibold text-muted-foreground uppercase">
                    Impact:{" "}
                    <span
                      className={
                        rec.impact === "High" ? "text-critical" : "text-warning"
                      }
                    >
                      {rec.impact}
                    </span>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div
                    className={`p-3 rounded-xl shrink-0 ${rec.bgColor} ${rec.color}`}
                  >
                    <rec.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2 text-foreground">
                      {rec.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {rec.description}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-muted/30 px-6 py-4 flex items-center justify-between border-t border-border/50">
                <div className="flex items-center gap-2 text-[10px] font-medium text-muted-foreground uppercase">
                  <CheckCircle2 className="h-3.5 w-3.5 text-success" />{" "}
                  Confidence: 94%
                </div>
                <button className="flex items-center gap-2 text-xs font-bold text-primary group transition-colors">
                  {rec.action}{" "}
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="lg:col-span-2 bg-card border border-dashed border-border rounded-2xl p-16 text-center shadow-sm">
            <Sparkles className="h-10 w-10 text-primary/20 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-foreground mb-2">
              No recommendations found
            </h3>
            <p className="text-sm text-muted-foreground">
              Try adjusting your filters to see more AI-generated insights.
            </p>
          </div>
        )}
      </div>

      <div className="mt-8 p-6 rounded-2xl border border-primary/30 bg-gradient-surface shadow-lg">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-xl bg-gradient-primary shadow-glow flex items-center justify-center shrink-0">
            <Sparkles className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h4 className="font-bold text-foreground">Premium AI Insights</h4>
            <p className="text-sm text-muted-foreground">
              Our advanced models are predicting a potential 12% churn risk in
              the Singapore market due to recent service instability.
            </p>
          </div>
          <button className="ml-auto px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-bold shadow-glow hover:opacity-90 transition-all whitespace-nowrap">
            View Churn Report
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}
