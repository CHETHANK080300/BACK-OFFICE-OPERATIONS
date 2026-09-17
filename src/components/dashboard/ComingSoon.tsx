import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Construction, Sparkles } from "lucide-react";

export function ComingSoon({
  title,
  subtitle,
  description,
}: {
  title: string;
  subtitle?: string;
  description: string;
}) {
  return (
    <DashboardLayout title={title} subtitle={subtitle}>
      <div className="grid place-items-center rounded-xl border border-dashed border-border bg-card/40 p-16">
        <div className="max-w-md text-center">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-gradient-primary shadow-glow">
            <Construction className="h-7 w-7 text-primary-foreground" />
          </div>
          <h2 className="mt-4 font-display text-2xl font-bold">
            Module scaffolding ready
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">{description}</p>
          <div className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
            <Sparkles className="h-3.5 w-3.5" /> Tell Lovable what to build next
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
