import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  ArrowLeft,
  AlertOctagon,
  TrendingUp,
  TrendingDown,
  Users,
  Calendar,
  MapPin,
  GitBranch,
  Boxes,
  Ticket,
  MessageCircle,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Panel } from "@/components/dashboard/Panel";
import { getIssue, type IssueDetail } from "@/lib/issuesData";

export const Route = createFileRoute("/issues/$issueId")({
  loader: ({ params }): IssueDetail => {
    const issue = getIssue(params.issueId);
    if (!issue) throw notFound();
    return issue;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.title ?? "Issue"} · Drill-down` },
      {
        name: "description",
        content: `Drill-down analytics for ${loaderData?.title ?? "this issue"}: comments, affected versions, modules and related tickets.`,
      },
    ],
  }),
  notFoundComponent: () => (
    <DashboardLayout
      title="Issue not found"
      subtitle="That cluster doesn't exist or has been resolved."
    >
      <Link to="/" className="text-primary hover:underline">
        ← Back to Executive Overview
      </Link>
    </DashboardLayout>
  ),
  component: IssueDrillDown,
});

const sevColor: Record<string, string> = {
  critical: "bg-critical/15 text-critical border-critical/30",
  high: "bg-warning/15 text-warning border-warning/30",
  medium: "bg-info/15 text-info border-info/30",
  low: "bg-muted text-muted-foreground border-border",
};
const sentColor: Record<string, string> = {
  positive: "bg-success/15 text-success",
  neutral: "bg-info/15 text-info",
  negative: "bg-critical/15 text-critical",
};
const statusColor: Record<string, string> = {
  open: "bg-critical/15 text-critical",
  in_progress: "bg-warning/15 text-warning",
  resolved: "bg-success/15 text-success",
};
const versionStatus: Record<string, string> = {
  regressed: "bg-critical/15 text-critical",
  stable: "bg-muted text-muted-foreground",
  fixed: "bg-success/15 text-success",
};

const tooltipStyle = {
  contentStyle: {
    background: "oklch(0.22 0.028 250)",
    border: "1px solid oklch(0.3 0.03 255)",
    borderRadius: 8,
    fontSize: 12,
  },
};

function IssueDrillDown() {
  const issue = Route.useLoaderData() as IssueDetail;
  const TrendIcon = issue.trendDirection === "up" ? TrendingUp : TrendingDown;
  const trendClass =
    issue.trendDirection === "up" ? "text-critical" : "text-success";

  return (
    <DashboardLayout
      title={issue.title}
      subtitle={`${issue.category} · Issue Intelligence drill-down`}
    >
      {/* Back + actions */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Executive Overview
        </Link>
        <div className="flex items-center gap-2">
          <span
            className={`rounded-md border px-2 py-1 text-xs font-semibold uppercase tracking-wider ${sevColor[issue.severity]}`}
          >
            {issue.severity}
          </span>
          <button className="rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-medium hover:border-primary/40">
            Assign owner
          </button>
          <button className="rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground shadow-glow hover:opacity-90">
            Open in Issue Intelligence
          </button>
        </div>
      </div>

      {/* Summary KPI strip */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <SummaryStat
          label="Total Complaints"
          value={issue.totalComplaints.toLocaleString()}
          icon={AlertOctagon}
          extra={
            <span
              className={`inline-flex items-center gap-1 text-xs font-medium ${trendClass}`}
            >
              <TrendIcon className="h-3.5 w-3.5" /> {issue.trend}
            </span>
          }
        />
        <SummaryStat
          label="Affected Users"
          value={issue.affectedUsers.toLocaleString()}
          icon={Users}
        />
        <SummaryStat
          label="First Seen"
          value={issue.firstSeen}
          icon={Calendar}
          small
        />
        <SummaryStat
          label="Sentiment"
          value={`${issue.sentiment.negative}% negative`}
          icon={MessageCircle}
          extra={
            <div className="mt-2 flex h-2 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full bg-success"
                style={{ width: `${issue.sentiment.positive}%` }}
              />
              <div
                className="h-full bg-info"
                style={{ width: `${issue.sentiment.neutral}%` }}
              />
              <div
                className="h-full bg-critical"
                style={{ width: `${issue.sentiment.negative}%` }}
              />
            </div>
          }
        />
      </div>

      {/* AI root cause */}
      {issue.rootCause && (
        <div className="mt-6 rounded-xl border border-primary/30 bg-gradient-surface p-5">
          <div className="flex items-start gap-3">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-gradient-primary shadow-glow">
              <Sparkles className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-widest text-primary">
                AI Root Cause Analysis
              </div>
              <p className="mt-1 text-sm">{issue.rootCause}</p>
            </div>
          </div>
        </div>
      )}

      {/* Trend + Countries */}
      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <Panel
          title="Trend Timeline"
          subtitle="Daily complaint volume"
          className="lg:col-span-2"
        >
          {issue.timeline.length > 0 ? (
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={issue.timeline}>
                <defs>
                  <linearGradient id="iss" x1="0" y1="0" x2="0" y2="1">
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
                <XAxis
                  dataKey="d"
                  stroke="oklch(0.68 0.025 250)"
                  fontSize={11}
                />
                <YAxis stroke="oklch(0.68 0.025 250)" fontSize={11} />
                <Tooltip {...tooltipStyle} />
                <Area
                  type="monotone"
                  dataKey="count"
                  stroke="oklch(0.65 0.25 18)"
                  fill="url(#iss)"
                  strokeWidth={2.5}
                />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <EmptyHint label="No timeline data" />
          )}
        </Panel>

        <Panel
          title="Affected Countries"
          subtitle="Top regions by complaint count"
        >
          {issue.countries.length > 0 ? (
            <div className="space-y-3">
              {issue.countries.map((c) => {
                const max = Math.max(...issue.countries.map((x) => x.count));
                const pct = (c.count / max) * 100;
                return (
                  <div key={c.name}>
                    <div className="mb-1.5 flex items-center justify-between text-sm">
                      <span className="inline-flex items-center gap-1.5 font-medium">
                        <MapPin className="h-3.5 w-3.5 text-muted-foreground" />{" "}
                        {c.name}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {c.count.toLocaleString()}
                      </span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-gradient-primary"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <EmptyHint label="Global · no regional breakdown" />
          )}
        </Panel>
      </div>

      {/* Versions + Modules */}
      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <Panel
          title="Affected App Versions"
          subtitle="Regression vs stable"
          className="lg:col-span-2"
        >
          {issue.versions.length > 0 ? (
            <div className="overflow-hidden rounded-lg border border-border">
              <table className="w-full text-sm">
                <thead className="bg-muted/40 text-xs uppercase tracking-wider text-muted-foreground">
                  <tr>
                    <th className="px-3 py-2 text-left font-semibold">
                      Version
                    </th>
                    <th className="px-3 py-2 text-left font-semibold">
                      Status
                    </th>
                    <th className="px-3 py-2 text-right font-semibold">
                      Complaints
                    </th>
                    <th className="px-3 py-2 text-right font-semibold">
                      Share
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {issue.versions.map((v) => {
                    const total = issue.versions.reduce(
                      (s, x) => s + x.count,
                      0,
                    );
                    const pct = ((v.count / total) * 100).toFixed(1);
                    return (
                      <tr key={v.version} className="border-t border-border">
                        <td className="px-3 py-2 font-mono text-xs">
                          <span className="inline-flex items-center gap-1.5">
                            <GitBranch className="h-3.5 w-3.5 text-muted-foreground" />{" "}
                            {v.version}
                          </span>
                        </td>
                        <td className="px-3 py-2">
                          <span
                            className={`rounded-md px-2 py-0.5 text-[10px] font-semibold uppercase ${versionStatus[v.status]}`}
                          >
                            {v.status}
                          </span>
                        </td>
                        <td className="px-3 py-2 text-right tabular-nums">
                          {v.count.toLocaleString()}
                        </td>
                        <td className="px-3 py-2 text-right text-muted-foreground tabular-nums">
                          {pct}%
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <EmptyHint label="No version breakdown" />
          )}
        </Panel>

        <Panel title="Related Modules" subtitle="Surface areas implicated">
          {issue.modules.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {issue.modules.map((m) => (
                <span
                  key={m}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-muted/40 px-3 py-1.5 text-xs font-medium"
                >
                  <Boxes className="h-3.5 w-3.5 text-muted-foreground" /> {m}
                </span>
              ))}
            </div>
          ) : (
            <EmptyHint label="No module mapping" />
          )}
        </Panel>
      </div>

      {/* Tickets */}
      <div className="mt-4">
        <Panel
          title="Related Support Tickets"
          subtitle={`${issue.tickets.length} linked`}
        >
          {issue.tickets.length > 0 ? (
            <div className="space-y-2">
              {issue.tickets.map((t) => (
                <div
                  key={t.id}
                  className="flex items-center gap-3 rounded-lg border border-transparent bg-muted/30 p-3 transition hover:border-primary/40 hover:bg-muted/60"
                >
                  <div className="grid h-9 w-9 place-items-center rounded-md bg-card">
                    <Ticket className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-xs text-muted-foreground">
                        {t.id}
                      </span>
                      <span className="rounded bg-muted px-1.5 py-0.5 font-mono text-[10px] font-semibold">
                        {t.priority}
                      </span>
                      <span
                        className={`rounded px-2 py-0.5 text-[10px] font-semibold uppercase ${statusColor[t.status]}`}
                      >
                        {t.status.replace("_", " ")}
                      </span>
                    </div>
                    <div className="mt-0.5 truncate text-sm font-medium">
                      {t.title}
                    </div>
                  </div>
                  <div className="hidden text-xs text-muted-foreground md:block">
                    {t.assignee}
                  </div>
                  <ExternalLink className="h-4 w-4 text-muted-foreground" />
                </div>
              ))}
            </div>
          ) : (
            <EmptyHint label="No related tickets" />
          )}
        </Panel>
      </div>

      {/* Comments */}
      <div className="mt-4">
        <Panel
          title="Customer Comments"
          subtitle="Latest verbatims across channels"
          action={
            <button className="rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-medium hover:border-primary/40">
              Export sample
            </button>
          }
        >
          {issue.comments.length > 0 ? (
            <div className="space-y-3">
              {issue.comments.map((c, i) => (
                <div
                  key={i}
                  className="rounded-lg border border-border bg-muted/20 p-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className="grid h-7 w-7 place-items-center rounded-full bg-gradient-accent text-[10px] font-semibold">
                        {c.user
                          .split(" ")
                          .map((p) => p[0])
                          .join("")
                          .slice(0, 2)}
                      </div>
                      <span className="text-sm font-medium">{c.user}</span>
                      <span className="text-xs text-muted-foreground">
                        · {c.channel}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`rounded px-2 py-0.5 text-[10px] font-semibold uppercase ${sentColor[c.sentiment]}`}
                      >
                        {c.sentiment}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {c.time}
                      </span>
                    </div>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/90">
                    "{c.text}"
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <EmptyHint label="No verbatims captured yet" />
          )}
        </Panel>
      </div>
    </DashboardLayout>
  );
}

function SummaryStat({
  label,
  value,
  icon: Icon,
  extra,
  small,
}: {
  label: string;
  value: string;
  icon: typeof AlertOctagon;
  extra?: React.ReactNode;
  small?: boolean;
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="flex items-start justify-between">
        <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {label}
        </div>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </div>
      <div
        className={`mt-2 font-display font-bold tracking-tight ${small ? "text-base" : "text-2xl"}`}
      >
        {value}
      </div>
      {extra && <div className="mt-1">{extra}</div>}
    </div>
  );
}

function EmptyHint({ label }: { label: string }) {
  return (
    <div className="grid h-24 place-items-center text-xs text-muted-foreground">
      {label}
    </div>
  );
}
