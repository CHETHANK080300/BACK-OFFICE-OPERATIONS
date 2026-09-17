import type { LucideIcon } from "lucide-react";
import {
  ArrowDownRight,
  ArrowUpRight,
  ArrowUpRight as ExternalArrow,
} from "lucide-react";
import { Link } from "@tanstack/react-router";

interface KpiCardProps {
  label: string;
  value: string;
  delta?: number;
  icon: LucideIcon;
  tone?: "primary" | "success" | "warning" | "critical" | "accent" | "info";
  sparkline?: number[];
  /** Drill-down target. Currently routes to /issues/$issueId. */
  drillTo?: string;
}

const toneMap = {
  primary: { bg: "bg-primary/10", text: "text-primary", glow: "shadow-glow" },
  success: { bg: "bg-success/10", text: "text-success", glow: "" },
  warning: { bg: "bg-warning/10", text: "text-warning", glow: "" },
  critical: { bg: "bg-critical/10", text: "text-critical", glow: "" },
  accent: { bg: "bg-accent/10", text: "text-accent", glow: "" },
  info: { bg: "bg-info/10", text: "text-info", glow: "" },
};

export function KpiCard({
  label,
  value,
  delta,
  icon: Icon,
  tone = "primary",
  sparkline,
  drillTo,
}: KpiCardProps) {
  const t = toneMap[tone];
  const positive = (delta ?? 0) >= 0;
  const interactive = !!drillTo;

  const inner = (
    <>
      {interactive && (
        <span className="absolute right-3 top-3 z-10 inline-flex items-center gap-0.5 rounded-full bg-primary/10 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-primary opacity-0 transition group-hover:opacity-100">
          drill <ExternalArrow className="h-2.5 w-2.5" />
        </span>
      )}
      <div className="flex items-start justify-between">
        <div>
          <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {label}
          </div>
          <div className="mt-2 font-display text-3xl font-bold tracking-tight">
            {value}
          </div>
        </div>
        <div
          className={`grid h-10 w-10 place-items-center rounded-lg ${t.bg} ${t.text}`}
        >
          <Icon className="h-5 w-5" />
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between">
        {delta !== undefined && (
          <div
            className={`flex items-center gap-1 text-xs font-medium ${positive ? "text-success" : "text-critical"}`}
          >
            {positive ? (
              <ArrowUpRight className="h-3.5 w-3.5" />
            ) : (
              <ArrowDownRight className="h-3.5 w-3.5" />
            )}
            {Math.abs(delta)}% vs last week
          </div>
        )}
        {sparkline && (
          <svg viewBox="0 0 80 24" className="h-6 w-20">
            <polyline
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className={t.text}
              points={sparkline
                .map((v, i) => {
                  const x = (i / (sparkline.length - 1)) * 80;
                  const max = Math.max(...sparkline);
                  const min = Math.min(...sparkline);
                  const y = 22 - ((v - min) / (max - min || 1)) * 20;
                  return `${x},${y}`;
                })
                .join(" ")}
            />
          </svg>
        )}
      </div>
    </>
  );

  const className = `group relative overflow-hidden rounded-xl border border-border bg-card p-5 transition-all ${interactive ? "hover:border-primary/60 hover:-translate-y-0.5 cursor-pointer" : "hover:border-primary/40 hover:-translate-y-0.5"}`;

  if (drillTo) {
    return (
      <Link
        to="/issues/$issueId"
        params={{ issueId: drillTo }}
        className={className + " block"}
      >
        {inner}
      </Link>
    );
  }
  return <div className={className}>{inner}</div>;
}
