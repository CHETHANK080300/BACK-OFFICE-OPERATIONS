import React from "react";
import { CheckCircle2, Clock, Circle } from "lucide-react";

export interface TimelineStep {
  title: string;
  date: string;
  status: "Completed" | "Current" | "Pending" | "Failed";
  description: string;
}

export function Timeline({ steps }: { steps: TimelineStep[] }) {
  return (
    <div className="relative pl-6 space-y-6 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-border">
      {steps.map((step, idx) => {
        let icon = <Circle className="h-4 w-4 text-muted-foreground bg-card" />;
        let textStyle = "text-muted-foreground";

        if (step.status === "Completed") {
          icon = (
            <CheckCircle2 className="h-5 w-5 text-success bg-card rounded-full" />
          );
          textStyle = "text-foreground font-semibold";
        } else if (step.status === "Current") {
          icon = (
            <Clock className="h-5 w-5 text-primary bg-card animate-pulse" />
          );
          textStyle = "text-primary font-bold";
        }

        return (
          <div key={idx} className="relative flex items-start gap-4">
            <div className="absolute -left-[29px] top-0.5 bg-card rounded-full">
              {icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className={`text-sm ${textStyle}`}>{step.title}</span>
                <span className="text-xs text-muted-foreground font-mono">
                  {step.date}
                </span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                {step.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
