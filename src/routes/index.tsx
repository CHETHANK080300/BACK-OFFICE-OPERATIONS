import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Smartphone,
  MessageSquare,
  Star,
  Heart,
  Frown,
  AlertOctagon,
  CheckCircle2,
  Users,
  TrendingUp,
  Activity,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { Panel } from "@/components/dashboard/Panel";
import { InlineFilters } from "@/components/dashboard/InlineFilters";
import { useFilters } from "@/hooks/useFilters";
import { useMemo } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Executive Overview" },
      {
        name: "description",
        content:
          "Real-time executive view of customer experience, sentiment and application health across the enterprise.",
      },
    ],
  }),
  component: ExecutiveOverview,
});

const feedbackTrend = [
  { d: "Mon", positive: 1240, negative: 320, neutral: 480 },
  { d: "Tue", positive: 1380, negative: 290, neutral: 510 },
  { d: "Wed", positive: 1100, negative: 410, neutral: 460 },
  { d: "Thu", positive: 1520, negative: 380, neutral: 530 },
  { d: "Fri", positive: 1680, negative: 520, neutral: 580 },
  { d: "Sat", positive: 1420, negative: 340, neutral: 510 },
  { d: "Sun", positive: 1590, negative: 290, neutral: 540 },
];

const sentimentTrend = [
  { d: "W1", score: 62 },
  { d: "W2", score: 65 },
  { d: "W3", score: 61 },
  { d: "W4", score: 68 },
  { d: "W5", score: 72 },
  { d: "W6", score: 70 },
  { d: "W7", score: 74 },
];

const ratingTrend = [
  { d: "Jan", rating: 4.1 },
  { d: "Feb", rating: 4.2 },
  { d: "Mar", rating: 4.0 },
  { d: "Apr", rating: 4.3 },
  { d: "May", rating: 3.8 },
  { d: "Jun", rating: 4.4 },
];

const issueTrend = [
  { d: "Mon", critical: 5, high: 12, medium: 24 },
  { d: "Tue", critical: 7, high: 14, medium: 28 },
  { d: "Wed", critical: 4, high: 10, medium: 22 },
  { d: "Thu", critical: 9, high: 18, medium: 30 },
  { d: "Fri", critical: 12, high: 22, medium: 34 },
  { d: "Sat", critical: 6, high: 15, medium: 26 },
  { d: "Sun", critical: 5, high: 11, medium: 23 },
];

const channels = [
  { name: "Mobile App", value: 38, color: "var(--chart-1)" },
  { name: "Web App", value: 22, color: "var(--chart-2)" },
  { name: "Play Store", value: 14, color: "var(--chart-3)" },
  { name: "Apple Store", value: 10, color: "var(--chart-4)" },
  { name: "Email", value: 6, color: "var(--chart-5)" },
  { name: "Social", value: 10, color: "oklch(0.7 0.18 230)" },
];

const complaints = [
  {
    id: "login-failure",
    label: "Login Failure",
    count: 1842,
    trend: "+24%",
    severity: "critical",
  },
  {
    id: "upi-timeout",
    label: "UPI Timeout",
    count: 1320,
    trend: "+18%",
    severity: "high",
  },
  {
    id: "app-crash",
    label: "App Crash on Launch",
    count: 980,
    trend: "+12%",
    severity: "critical",
  },
  {
    id: "slow-loading",
    label: "Slow Loading",
    count: 720,
    trend: "+8%",
    severity: "medium",
  },
  {
    id: "beneficiary-issue",
    label: "Beneficiary Add Issue",
    count: 540,
    trend: "+5%",
    severity: "high",
  },
];

const appreciations = [
  { label: "Easy & Clean UI", count: 2410 },
  { label: "Fast Transfers", count: 1980 },
  { label: "Helpful Support", count: 1420 },
  { label: "Biometric Login", count: 1180 },
];

const sevColor: Record<string, string> = {
  critical: "bg-critical/15 text-critical border-critical/30",
  high: "bg-warning/15 text-warning border-warning/30",
  medium: "bg-info/15 text-info border-info/30",
};

const chartTooltipStyle = {
  contentStyle: {
    background: "oklch(0.22 0.028 250)",
    border: "1px solid oklch(0.3 0.03 255)",
    borderRadius: 8,
    fontSize: 12,
  },
  labelStyle: { color: "oklch(0.97 0.005 250)" },
};

function ExecutiveOverview() {
  const { filters } = useFilters();

  const filteredKPIs = useMemo(() => {
    // Basic reactive filtering logic
    let multiplier = 1.0;
    if (filters.application === "retail_banking") multiplier = 0.7;
    if (filters.application === "corporate_banking") multiplier = 0.2;
    if (filters.application === "retail_onboarding") multiplier = 0.05;
    if (filters.application === "corporate_onboarding") multiplier = 0.05;

    if (filters.country === "india") multiplier *= 0.6;
    if (filters.country === "malaysia") multiplier *= 0.2;
    if (filters.country === "singapore") multiplier *= 0.2;

    return {
      totalFeedback: (48.2 * multiplier).toFixed(1) + "K",
      avgRating: (4.32 + (multiplier * 0.1 - 0.05)).toFixed(2),
      nps:
        "+" +
        Math.round(
          58 * multiplier +
            (filters.application === "corporate_banking" ? 20 : 0),
        ),
      csat: Math.round(88 + (multiplier * 5 - 2.5)) + "%",
      criticalOpen: Math.round(23 * multiplier),
      activeUsers: (2.4 * multiplier).toFixed(1) + "M",
    };
  }, [filters]);

  return (
    <DashboardLayout
      title="Executive Overview"
      subtitle="Unified pulse of customer experience across all applications, channels and geographies"
    >
      <InlineFilters />

      {/* KPI grid */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-5">
        <KpiCard
          label="Applications"
          value={filters.application === "all" ? "14" : "1"}
          icon={Smartphone}
          tone="primary"
          delta={0}
        />
        <KpiCard
          label="Total Feedback"
          value={filteredKPIs.totalFeedback}
          icon={MessageSquare}
          tone="primary"
          delta={12}
          sparkline={[20, 30, 28, 40, 38, 52, 60]}
        />
        <KpiCard
          label="Avg Rating"
          value={filteredKPIs.avgRating}
          icon={Star}
          tone="warning"
          delta={3}
          sparkline={[40, 42, 38, 44, 46, 45, 48]}
        />
        <KpiCard
          label="NPS Score"
          value={filteredKPIs.nps}
          icon={Heart}
          tone="success"
          delta={6}
          sparkline={[30, 35, 38, 42, 40, 50, 58]}
        />
        <KpiCard
          label="CSAT"
          value={filteredKPIs.csat}
          icon={ThumbsUp}
          tone="success"
          delta={2}
          sparkline={[80, 82, 85, 84, 86, 87, 88]}
        />
        <KpiCard
          label="Positive Sentiment"
          value="72%"
          icon={ThumbsUp}
          tone="success"
          delta={4}
        />
        <KpiCard
          label="Negative Sentiment"
          value="14%"
          icon={ThumbsDown}
          tone="critical"
          delta={-2}
          drillTo="negative-sentiment"
        />
        <KpiCard
          label="Critical Open"
          value={String(filteredKPIs.criticalOpen)}
          icon={AlertOctagon}
          tone="critical"
          delta={18}
          drillTo="critical-open"
        />
        <KpiCard
          label="Resolved (7d)"
          value="416"
          icon={CheckCircle2}
          tone="success"
          delta={9}
        />
        <KpiCard
          label="Active Users"
          value={filteredKPIs.activeUsers}
          icon={Users}
          tone="accent"
          delta={5}
          sparkline={[100, 110, 108, 120, 124, 130, 135]}
        />
      </div>

      {/* Trends */}
      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <Panel
          title="Feedback Trend"
          subtitle="Daily volume by sentiment"
          className="lg:col-span-2"
        >
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={feedbackTrend}>
              <defs>
                <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="0%"
                    stopColor="oklch(0.72 0.18 155)"
                    stopOpacity={0.5}
                  />
                  <stop
                    offset="100%"
                    stopColor="oklch(0.72 0.18 155)"
                    stopOpacity={0}
                  />
                </linearGradient>
                <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="0%"
                    stopColor="oklch(0.65 0.25 18)"
                    stopOpacity={0.5}
                  />
                  <stop
                    offset="100%"
                    stopColor="oklch(0.65 0.25 18)"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="oklch(0.3 0.03 255 / 0.4)"
              />
              <XAxis dataKey="d" stroke="oklch(0.68 0.025 250)" fontSize={11} />
              <YAxis stroke="oklch(0.68 0.025 250)" fontSize={11} />
              <Tooltip {...chartTooltipStyle} />
              <Area
                type="monotone"
                dataKey="positive"
                stroke="oklch(0.72 0.18 155)"
                fill="url(#g1)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="negative"
                stroke="oklch(0.65 0.25 18)"
                fill="url(#g2)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="neutral"
                stroke="oklch(0.78 0.16 195)"
                fill="transparent"
                strokeWidth={2}
                strokeDasharray="4 4"
              />
            </AreaChart>
          </ResponsiveContainer>
        </Panel>

        <Panel title="Channel Breakdown" subtitle="Where feedback originates">
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={channels}
                dataKey="value"
                nameKey="name"
                innerRadius={60}
                outerRadius={95}
                paddingAngle={3}
              >
                {channels.map((c, i) => (
                  <Cell key={i} fill={c.color} />
                ))}
              </Pie>
              <Tooltip {...chartTooltipStyle} />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {channels.map((c) => (
              <div key={c.name} className="flex items-center gap-2">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ background: c.color }}
                />
                <span className="flex-1 text-muted-foreground">{c.name}</span>
                <span className="font-medium">{c.value}%</span>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <Panel title="Sentiment Score" subtitle="Weighted positive %">
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={sentimentTrend}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="oklch(0.3 0.03 255 / 0.4)"
              />
              <XAxis dataKey="d" stroke="oklch(0.68 0.025 250)" fontSize={11} />
              <YAxis
                stroke="oklch(0.68 0.025 250)"
                fontSize={11}
                domain={[40, 100]}
              />
              <Tooltip {...chartTooltipStyle} />
              <Line
                type="monotone"
                dataKey="score"
                stroke="oklch(0.78 0.16 195)"
                strokeWidth={2.5}
                dot={{ r: 3, fill: "oklch(0.78 0.16 195)" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Panel>
        <Panel title="Rating Trend" subtitle="App-store weighted average">
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={ratingTrend}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="oklch(0.3 0.03 255 / 0.4)"
              />
              <XAxis dataKey="d" stroke="oklch(0.68 0.025 250)" fontSize={11} />
              <YAxis
                stroke="oklch(0.68 0.025 250)"
                fontSize={11}
                domain={[3, 5]}
              />
              <Tooltip {...chartTooltipStyle} />
              <Bar
                dataKey="rating"
                fill="oklch(0.78 0.16 80)"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </Panel>
        <Panel title="Issue Trend" subtitle="By severity, last 7 days">
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={issueTrend} stackOffset="sign">
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="oklch(0.3 0.03 255 / 0.4)"
              />
              <XAxis dataKey="d" stroke="oklch(0.68 0.025 250)" fontSize={11} />
              <YAxis stroke="oklch(0.68 0.025 250)" fontSize={11} />
              <Tooltip {...chartTooltipStyle} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Bar dataKey="critical" stackId="a" fill="oklch(0.65 0.25 18)" />
              <Bar dataKey="high" stackId="a" fill="oklch(0.78 0.16 80)" />
              <Bar dataKey="medium" stackId="a" fill="oklch(0.7 0.17 230)" />
            </BarChart>
          </ResponsiveContainer>
        </Panel>
      </div>

      {/* Lists */}
      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <Panel
          title="Top Complaints"
          subtitle="Clustered by AI — click to drill down"
          action={
            <span className="rounded-md bg-critical/10 px-2 py-0.5 text-xs font-medium text-critical">
              5 trending up
            </span>
          }
        >
          <div className="space-y-2">
            {complaints.map((c, i) => (
              <Link
                key={c.id}
                to="/issues/$issueId"
                params={{ issueId: c.id }}
                className="group flex w-full items-center gap-3 rounded-lg border border-transparent bg-muted/30 p-3 text-left transition hover:border-primary/40 hover:bg-muted/60"
              >
                <div className="grid h-8 w-8 place-items-center rounded-md bg-card font-display text-xs font-bold text-muted-foreground">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="truncate font-medium">{c.label}</span>
                    <span
                      className={`rounded-md border px-1.5 py-0.5 text-[10px] font-semibold uppercase ${sevColor[c.severity]}`}
                    >
                      {c.severity}
                    </span>
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    {Math.round(
                      c.count *
                        (filteredKPIs.totalFeedback === "48.2K" ? 1 : 0.6),
                    ).toLocaleString()}{" "}
                    mentions · {c.trend} this week · drill down →
                  </div>
                </div>
                <TrendingUp className="h-4 w-4 text-critical" />
              </Link>
            ))}
          </div>
        </Panel>

        <Panel
          title="Top Appreciations"
          subtitle="What customers love this week"
          action={
            <span className="rounded-md bg-success/10 px-2 py-0.5 text-xs font-medium text-success">
              +18% YoY
            </span>
          }
        >
          <div className="space-y-3">
            {appreciations.map((a) => {
              const max = Math.max(...appreciations.map((x) => x.count));
              const pct = (a.count / max) * 100;
              return (
                <div key={a.label}>
                  <div className="mb-1.5 flex items-center justify-between text-sm">
                    <span className="font-medium text-foreground">
                      {a.label}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {Math.round(
                        a.count *
                          (filteredKPIs.totalFeedback === "48.2K" ? 1 : 0.6),
                      ).toLocaleString()}
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-gradient-primary transition-all"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
            <div className="mt-4 rounded-lg border border-accent/30 bg-accent/5 p-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-accent">
                <Activity className="h-3.5 w-3.5" /> AI INSIGHT
              </div>
              <p className="mt-1 text-sm text-foreground">
                Appreciation for <strong>Biometric Login</strong> surged 42%
                after release 5.3. Consider highlighting this in store
                descriptions.
              </p>
            </div>
          </div>
        </Panel>
      </div>

      {/* AI strip */}
      <div className="mt-6 rounded-xl border border-primary/30 bg-gradient-surface p-6">
        <div className="flex items-start gap-4">
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-primary shadow-glow">
            <Frown className="h-6 w-6 text-primary-foreground" />
          </div>
          <div className="flex-1">
            <div className="text-xs font-semibold uppercase tracking-widest text-primary">
              AI Executive Briefing · 06:00 IST
            </div>
            <h3 className="mt-1 font-display text-xl font-bold text-foreground">
              Login failures up 72% in Retail Banking after release 5.2 —
              Malaysia & Singapore most affected
            </h3>
            <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
              Sentiment dropped 8 points overnight. Root cause clustering points
              to OTP delivery and biometric fallback regressions. The
              release-risk model flags this as{" "}
              <span className="font-semibold text-warning">High Risk</span>.
              Suggested action: roll back authentication service to 5.1.3 while
              a hotfix is prepared.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Link
                to="/issues/$issueId"
                params={{ issueId: "login-failure" }}
                className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-glow hover:opacity-90"
              >
                Open Issue Cluster
              </Link>
              <button className="rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-foreground hover:border-primary/40">
                View Affected Versions
              </button>
              <button className="rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-foreground hover:border-primary/40">
                Notify On-call
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
