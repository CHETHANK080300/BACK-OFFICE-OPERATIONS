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
  LineChart,
  Line,
} from "recharts";
import {
  ClipboardList,
  Users,
  Clock,
  CheckCircle,
  TrendingUp,
} from "lucide-react";
import { InlineFilters } from "@/components/dashboard/InlineFilters";
import { useFilters } from "@/hooks/useFilters";
import { useMemo } from "react";

export const Route = createFileRoute("/surveys")({
  head: () => ({
    meta: [
      { title: "Survey Analytics" },
      {
        name: "description",
        content:
          "Survey completion rates, response funnel and question-wise deep dives.",
      },
    ],
  }),
  component: SurveyAnalytics,
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

function SurveyAnalytics() {
  const { filters } = useFilters();

  const stats = useMemo(() => {
    let multiplier =
      filters.application === "retail_banking"
        ? 0.7
        : filters.application === "corporate_banking"
          ? 0.2
          : filters.application === "retail_onboarding"
            ? 0.1
            : 1.0;
    if (filters.country !== "global") multiplier *= 0.4;

    return [
      {
        label: "Total Surveys Sent",
        value: Math.round(12400 * multiplier).toLocaleString(),
        icon: ClipboardList,
        delta: "+5%",
      },
      {
        label: "Completed Surveys",
        value: Math.round(8650 * multiplier).toLocaleString(),
        icon: CheckCircle,
        delta: "+8%",
      },
      {
        label: "Completion Rate",
        value: (69.7 + multiplier * 2).toFixed(1) + "%",
        icon: TrendingUp,
        delta: "+2%",
      },
      {
        label: "Avg. Completion Time",
        value: "2m 14s",
        icon: Clock,
        delta: "-12s",
      },
    ];
  }, [filters]);

  const questionData = [
    { question: "Ease of Use", rating: 4.2 },
    { question: "Reliability", rating: 3.8 },
    { question: "Features", rating: 4.5 },
    { question: "Support", rating: 4.1 },
    { question: "Overall Satisfaction", rating: 4.3 },
  ];

  const funnelData = [
    { name: "Invited", value: 12400, fill: "var(--chart-1)" },
    { name: "Opened", value: 9800, fill: "var(--chart-2)" },
    { name: "Started", value: 8900, fill: "var(--chart-3)" },
    { name: "Completed", value: 8650, fill: "var(--chart-4)" },
  ];

  const trendData = [
    { date: "May 01", rate: 65 },
    { date: "May 05", rate: 67 },
    { date: "May 10", rate: 70 },
    { date: "May 15", rate: 68 },
    { date: "May 20", rate: 72 },
    { date: "May 25", rate: 75 },
  ];

  return (
    <DashboardLayout
      title="Survey Analytics"
      subtitle="Comprehensive breakdown of customer surveys and response sentiment"
    >
      <InlineFilters />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((stat) => (
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
                  stat.delta.startsWith("+")
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

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Panel
          title="Survey Completion Funnel"
          subtitle="Track user drop-offs across the survey journey"
        >
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={funnelData}
              layout="vertical"
              margin={{ left: 40, right: 40 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="oklch(0.3 0.03 255 / 0.4)"
                horizontal={false}
              />
              <XAxis type="number" hide />
              <YAxis
                dataKey="name"
                type="category"
                stroke="oklch(0.68 0.025 250)"
                fontSize={11}
                width={80}
              />
              <Tooltip {...chartTooltipStyle} />
              <Bar dataKey="value" radius={[0, 6, 6, 0]} barSize={40}>
                {funnelData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Panel>

        <Panel
          title="Completion Rate Trend"
          subtitle="Monitor how response rates evolve over time"
        >
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trendData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="oklch(0.3 0.03 255 / 0.4)"
              />
              <XAxis
                dataKey="date"
                stroke="oklch(0.68 0.025 250)"
                fontSize={11}
              />
              <YAxis
                stroke="oklch(0.68 0.025 250)"
                fontSize={11}
                domain={[0, 100]}
              />
              <Tooltip {...chartTooltipStyle} />
              <Line
                type="monotone"
                dataKey="rate"
                stroke="var(--primary)"
                strokeWidth={3}
                dot={{ r: 4, fill: "var(--primary)" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Panel>
      </div>

      <Panel
        title="Question-wise Average Ratings"
        subtitle="Deep dive into specific survey question performance"
        className="mt-6"
      >
        <div className="space-y-6 max-w-2xl">
          {questionData.map((q) => (
            <div key={q.question}>
              <div className="flex items-center justify-between mb-2 text-foreground">
                <span className="text-sm font-medium">{q.question}</span>
                <span className="text-sm font-bold">{q.rating} / 5.0</span>
              </div>
              <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-primary rounded-full"
                  style={{ width: `${(q.rating / 5) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </Panel>
    </DashboardLayout>
  );
}
