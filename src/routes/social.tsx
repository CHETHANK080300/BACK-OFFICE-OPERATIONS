import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Panel } from "@/components/dashboard/Panel";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  ThumbsUp,
  Share2,
} from "lucide-react";
import { InlineFilters } from "@/components/dashboard/InlineFilters";
import { useFilters } from "@/hooks/useFilters";
import { useMemo } from "react";

export const Route = createFileRoute("/social")({
  head: () => ({
    meta: [
      { title: "Social Monitoring" },
      {
        name: "description",
        content:
          "Real-time social media buzz, sentiment and AI-classified customer mentions.",
      },
    ],
  }),
  component: SocialMonitoring,
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

function SocialMonitoring() {
  const { filters } = useFilters();

  const data = useMemo(() => {
    let multiplier =
      filters.application === "retail_banking"
        ? 0.9
        : filters.application === "corporate_banking"
          ? 0.3
          : filters.application === "retail_onboarding"
            ? 0.2
            : 1.0;
    if (filters.country !== "global") multiplier *= 0.5;

    const socialStats = [
      {
        platform: "Twitter/X",
        icon: Twitter,
        color: "#1DA1F2",
        mentions: Math.round(1240 * multiplier),
        change: "+12%",
      },
      {
        platform: "Facebook",
        icon: Facebook,
        color: "#4267B2",
        mentions: Math.round(850 * multiplier),
        change: "+5%",
      },
      {
        platform: "Instagram",
        icon: Instagram,
        color: "#E1306C",
        mentions: Math.round(620 * multiplier),
        change: "+8%",
      },
      {
        platform: "LinkedIn",
        icon: Linkedin,
        color: "#0077B5",
        mentions: Math.round(120 * multiplier),
        change: "-2%",
      },
    ];

    const buzzScore = [
      { d: "Mon", score: 45 },
      { d: "Tue", score: 52 },
      { d: "Wed", score: 48 },
      { d: "Thu", score: 75 * multiplier },
      { d: "Fri", score: 82 * multiplier },
      { d: "Sat", score: 65 },
      { d: "Sun", score: 58 },
    ];

    const classification = [
      {
        type: "Complaint",
        value: Math.round(450 * multiplier),
        color: "oklch(0.65 0.25 18)",
      },
      {
        type: "Suggestion",
        value: Math.round(280 * multiplier),
        color: "oklch(0.7 0.17 230)",
      },
      {
        type: "Praise",
        value: Math.round(320 * multiplier),
        color: "oklch(0.72 0.18 155)",
      },
      {
        type: "Question",
        value: Math.round(150 * multiplier),
        color: "oklch(0.78 0.16 80)",
      },
      {
        type: "Bug Report",
        value: Math.round(120 * multiplier),
        color: "oklch(0.65 0.24 22)",
      },
    ];

    return { socialStats, buzzScore, classification };
  }, [filters]);

  return (
    <DashboardLayout
      title="Social Monitoring"
      subtitle="Track brand mentions and customer sentiment across social platforms"
    >
      <InlineFilters />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 mb-6">
        {data.socialStats.map((s) => (
          <div
            key={s.platform}
            className="bg-card border border-border rounded-xl p-5 shadow-sm"
          >
            <div className="flex items-center justify-between mb-4">
              <div
                className="p-2 rounded-lg"
                style={{ backgroundColor: `${s.color}20`, color: s.color }}
              >
                <s.icon className="h-5 w-5" />
              </div>
              <span
                className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                  s.change.startsWith("+")
                    ? "bg-success/10 text-success"
                    : "bg-critical/10 text-critical"
                }`}
              >
                {s.change}
              </span>
            </div>
            <div className="text-[10px] uppercase font-bold text-muted-foreground">
              {s.platform}
            </div>
            <div className="text-2xl font-bold mt-1 tracking-tight text-foreground">
              {s.mentions.toLocaleString()}
            </div>
            <div className="text-[10px] text-muted-foreground mt-1">
              Mentions this period
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3 mb-6">
        <Panel
          title="Social Buzz Score"
          subtitle="Aggregate index of mentions, likes and shares"
          className="lg:col-span-2"
        >
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data.buzzScore}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="oklch(0.3 0.03 255 / 0.4)"
              />
              <XAxis dataKey="d" stroke="oklch(0.68 0.025 250)" fontSize={11} />
              <YAxis stroke="oklch(0.68 0.025 250)" fontSize={11} />
              <Tooltip {...chartTooltipStyle} />
              <Line
                type="monotone"
                dataKey="score"
                stroke="var(--primary)"
                strokeWidth={3}
                dot={{ r: 4, fill: "var(--primary)" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Panel>

        <Panel
          title="AI Classification"
          subtitle="Automated categorization of social posts"
        >
          <div className="space-y-4 pt-4">
            {data.classification.map((c) => (
              <div key={c.type}>
                <div className="flex justify-between text-xs mb-1.5 text-foreground">
                  <span className="font-medium">{c.type}</span>
                  <span className="text-muted-foreground">{c.value} posts</span>
                </div>
                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${(c.value / (Math.max(...data.classification.map((x) => x.value)) || 1)) * 100}%`,
                      backgroundColor: c.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      <Panel title="Latest Trending Posts">
        <div className="space-y-4">
          {[
            {
              platform: "Twitter/X",
              user: "@tech_savvy",
              content:
                "Impressive speed on the new UPI update from @yourbank! #FinTech #DigitalIndia",
              sentiment: "positive",
              metrics: { likes: 124, shares: 32 },
            },
            {
              platform: "Facebook",
              user: "John Doe",
              content:
                "Been trying to reach customer support for 2 days. The app keeps crashing on the support page. Frustrating experience.",
              sentiment: "negative",
              metrics: { likes: 45, shares: 12 },
            },
          ].map((post, i) => (
            <div
              key={i}
              className="p-4 rounded-xl border border-border bg-muted/10 shadow-sm"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-foreground">
                    {post.user}
                  </span>
                  <span className="text-[10px] text-muted-foreground px-2 py-0.5 bg-muted rounded-full">
                    {post.platform}
                  </span>
                </div>
                <div
                  className={`text-[10px] font-bold uppercase ${post.sentiment === "positive" ? "text-success" : "text-critical"}`}
                >
                  {post.sentiment}
                </div>
              </div>
              <p className="text-sm mb-4 text-foreground/80">
                "{post.content}"
              </p>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <ThumbsUp className="h-3.5 w-3.5" /> {post.metrics.likes}
                </div>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Share2 className="h-3.5 w-3.5" /> {post.metrics.shares}
                </div>
                <div className="flex-1" />
                <button className="text-[10px] font-bold uppercase text-primary">
                  View Post
                </button>
              </div>
            </div>
          ))}
        </div>
      </Panel>
    </DashboardLayout>
  );
}
