import React from "react";
import { FolderOpen, SearchX, AlertCircle } from "lucide-react";

export interface EmptyStateProps {
  title: string;
  description: string;
  icon?: "search" | "folder" | "error";
  action?: React.ReactNode;
}

export function EmptyState({
  title,
  description,
  icon = "folder",
  action,
}: EmptyStateProps) {
  const IconComponent =
    icon === "search" ? SearchX : icon === "error" ? AlertCircle : FolderOpen;

  return (
    <div className="flex flex-col items-center justify-center p-8 text-center rounded-xl border border-dashed border-border bg-card/50 my-4">
      <div className="grid h-12 w-12 place-items-center rounded-xl bg-muted/50 mb-3 text-muted-foreground">
        <IconComponent className="h-6 w-6" />
      </div>
      <h3 className="text-base font-semibold text-foreground">{title}</h3>
      <p className="mt-1 text-xs text-muted-foreground max-w-sm">
        {description}
      </p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

export function SkeletonTable({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-3 my-4 animate-pulse">
      <div className="h-10 rounded-lg bg-muted/40" />
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="h-12 rounded-lg bg-muted/20" />
      ))}
    </div>
  );
}
