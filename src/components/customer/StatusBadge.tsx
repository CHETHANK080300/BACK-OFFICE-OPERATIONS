import React from "react";

export interface StatusBadgeProps {
  status: string;
  type?: "status" | "kyc" | "risk" | "priority" | "channel";
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const normalized = status.toLowerCase();

  let style = "bg-muted text-muted-foreground border-border";

  if (
    normalized === "verified" ||
    normalized === "active" ||
    normalized === "approved" ||
    normalized === "completed" ||
    normalized === "success" ||
    normalized === "resolved" ||
    normalized === "low"
  ) {
    style = "bg-success/15 text-success border-success/30";
  } else if (
    normalized === "pending" ||
    normalized === "under review" ||
    normalized === "in progress" ||
    normalized === "under investigation" ||
    normalized === "medium" ||
    normalized === "draft"
  ) {
    style = "bg-warning/15 text-warning border-warning/30";
  } else if (
    normalized === "expired" ||
    normalized === "rejected" ||
    normalized === "failed" ||
    normalized === "high" ||
    normalized === "critical" ||
    normalized === "blocked" ||
    normalized === "open"
  ) {
    style = "bg-critical/15 text-critical border-critical/30";
  } else if (normalized === "closed" || normalized === "dormant") {
    style = "bg-info/15 text-info border-info/30";
  }

  return (
    <span
      className={`inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-semibold uppercase tracking-wider ${style}`}
    >
      {status}
    </span>
  );
}
