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
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Ticket, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import { InlineFilters } from "@/components/dashboard/InlineFilters";
import { useFilters } from "@/hooks/useFilters";
import { useMemo } from "react";

export const Route = createFileRoute("/customer-care")({
  head: () => ({
    meta: [
      { title: "Customer Care Analytics" },
      {
        name: "description",
        content:
          "Support ticket volume, average resolution times and ticket-to-feedback correlation.",
      },
    ],
  }),
  component: CustomerCareAnalytics,
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

function CustomerCareAnalytics() {
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

    const careStats = [
      {
        label: "Total Tickets",
        value: Math.round(2840 * multiplier).toLocaleString(),
        icon: Ticket,
        delta: "+12%",
      },
      {
        label: "Open Tickets",
        value: Math.round(416 * multiplier).toLocaleString(),
        icon: AlertCircle,
        delta: "+8%",
      },
      { label: "Avg. Resolution", value: "4.2h", icon: Clock, delta: "-15%" },
      {
        label: "Resolved (7d)",
        value: Math.round(2424 * multiplier).toLocaleString(),
        icon: CheckCircle2,
        delta: "+10%",
      },
    ];

    const categoryData = [
      { name: "Payments", value: 850 * multiplier, color: "var(--chart-1)" },
      {
        name: "Authentication",
        value: 720 * multiplier,
        color: "var(--chart-2)",
      },
      { name: "Accounts", value: 450 * multiplier, color: "var(--chart-3)" },
      { name: "General", value: 380 * multiplier, color: "var(--chart-4)" },
      { name: "Cards", value: 440 * multiplier, color: "var(--chart-5)" },
    ];

    const resolutionTrend = [
      { day: "Mon", time: 4.8 },
      { day: "Tue", time: 4.5 },
      { day: "Wed", time: 4.2 },
      { day: "Thu", time: 5.1 },
      { day: "Fri", time: 5.8 },
      { day: "Sat", time: 4.4 },
      { day: "Sun", time: 4.1 },
    ];

    return { careStats, categoryData, resolutionTrend };
  }, [filters]);

  return (
    <DashboardLayout
      title="Customer Care Analytics"
      subtitle="Insights into support operations and customer ticket sentiment"
    >
      <InlineFilters />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 mb-6">
        {data.careStats.map((stat) => (
          <div
            key={stat.label}
            className="bg-card border border-border rounded-xl p-5 shadow-sm"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <stat.icon className="h-4 w-4 text-primary" />
              </div>
              <span
                className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                  stat.delta.startsWith("+") && stat.label !== "Avg. Resolution"
                    ? "bg-success/10 text-success"
                    : stat.label === "Avg. Resolution" &&
                        stat.delta.startsWith("-")
                      ? "bg-success/10 text-success"
                      : "bg-critical/10 text-critical"
                }`}
              >
                {stat.delta}
              </span>
            </div>
            <div className="text-[10px] uppercase font-bold text-muted-foreground">
              {stat.label}
            </div>
            <div className="text-2xl font-bold mt-1 tracking-tight text-foreground">
              {stat.value}
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2 mb-6">
        <Panel
          title="Ticket Categories"
          subtitle="Distribution of support requests by module"
        >
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data.categoryData}
                dataKey="value"
                nameKey="name"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
              >
                {data.categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip {...chartTooltipStyle} />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-3 gap-2 mt-4">
            {data.categoryData.map((c) => (
              <div key={c.name} className="flex items-center gap-2">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ background: c.color }}
                />
                <span className="text-[10px] text-muted-foreground truncate">
                  {c.name}
                </span>
              </div>
            ))}
          </div>
        </Panel>

        <Panel
          title="Average Resolution Time (Hours)"
          subtitle="Daily tracking of support SLA performance"
        >
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.resolutionTrend}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="oklch(0.3 0.03 255 / 0.4)"
              />
              <XAxis
                dataKey="day"
                stroke="oklch(0.68 0.025 250)"
                fontSize={11}
              />
              <YAxis stroke="oklch(0.68 0.025 250)" fontSize={11} />
              <Tooltip {...chartTooltipStyle} />
              <Bar dataKey="time" fill="var(--primary)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Panel>
      </div>

      <Panel title="Recent Escalations">
        <div className="space-y-3">
          {[
            {
              id: "TKT-9281",
              title: "Cannot access corporate account since Monday",
              priority: "Critical",
              time: "25m ago",
              status: "Escalated",
            },
            {
              id: "TKT-9285",
              title: "Double debit during UPI transaction",
              priority: "High",
              time: "1h ago",
              status: "Assigned",
            },
            {
              id: "TKT-9290",
              title: "OTP not arriving for international roaming",
              priority: "High",
              time: "2h ago",
              status: "Pending",
            },
          ].map((t) => (
            <div
              key={t.id}
              className="flex items-center gap-4 p-4 rounded-xl border border-border bg-muted/10 group hover:border-primary/30 transition-all shadow-sm"
            >
              <div className="h-10 w-10 rounded-lg bg-card border border-border flex items-center justify-center font-mono text-[10px] text-muted-foreground">
                {t.id.split("-")[1]}
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold mb-0.5 text-foreground">
                  {t.title}
                </div>
                <div className="text-[10px] text-muted-foreground">
                  {t.id} · {t.time}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    t.priority === "Critical"
                      ? "bg-critical/10 text-critical"
                      : "bg-warning/10 text-warning"
                  }`}
                >
                  {t.priority}
                </span>
                <span className="text-[10px] font-medium text-muted-foreground">
                  {t.status}
                </span>
                <button className="p-2 hover:bg-muted rounded text-primary transition-colors">
                  <Clock className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </Panel>
    </DashboardLayout>
  );
}
