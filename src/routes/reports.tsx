import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Panel } from "@/components/dashboard/Panel";
import {
  FileBarChart,
  Download,
  FileText,
  Calendar,
  Share2,
  Printer,
} from "lucide-react";
import { InlineFilters } from "@/components/dashboard/InlineFilters";

export const Route = createFileRoute("/reports")({
  head: () => ({
    meta: [
      { title: "Reports" },
      {
        name: "description",
        content:
          "Generate and export executive summaries, product health reports and customer sentiment analysis.",
      },
    ],
  }),
  component: ReportsModule,
});

const reportTypes = [
  {
    id: "exec-summary",
    name: "Executive Summary",
    description: "High-level overview of CX metrics for leadership.",
    format: ["PDF", "PPTX"],
  },
  {
    id: "app-health",
    name: "Product Health Report",
    description:
      "Detailed breakdown of application health scores and module performance.",
    format: ["PDF", "XLSX"],
  },
  {
    id: "sentiment",
    name: "Customer Sentiment Analysis",
    description: "Deep dive into sentiment trends across channels and regions.",
    format: ["PDF", "CSV"],
  },
  {
    id: "release-impact",
    name: "Release Quality Report",
    description:
      "Impact analysis of the latest deployments on user experience.",
    format: ["PDF", "XLSX"],
  },
  {
    id: "sla-report",
    name: "Customer Care SLA Report",
    description:
      "Support ticket resolution times and agent performance metrics.",
    format: ["PDF", "CSV"],
  },
];

const scheduledReports = [
  {
    name: "Weekly CX Overview",
    frequency: "Weekly",
    nextRun: "Jun 05, 2026",
    recipients: "CXO Group",
  },
  {
    name: "Daily Health Check",
    frequency: "Daily",
    nextRun: "Jun 02, 2026",
    recipients: "Product Ops",
  },
];

function ReportsModule() {
  return (
    <DashboardLayout
      title="Reports Center"
      subtitle="Generate, schedule and export enterprise-grade customer intelligence reports"
    >
      <InlineFilters />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Panel
            title="Report Templates"
            subtitle="Select a template to generate a new report"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              {reportTypes.map((rt) => (
                <div
                  key={rt.id}
                  className="p-4 rounded-xl border border-border bg-muted/10 hover:border-primary/40 transition-all group flex flex-col shadow-sm"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-primary/10 rounded-lg text-primary">
                      <FileBarChart className="h-5 w-5" />
                    </div>
                    <h3 className="font-semibold text-sm text-foreground">
                      {rt.name}
                    </h3>
                  </div>
                  <p className="text-xs text-muted-foreground mb-4 flex-1">
                    {rt.description}
                  </p>
                  <div className="flex items-center justify-between pt-3 border-t border-border/50">
                    <div className="flex gap-1.5">
                      {rt.format.map((f) => (
                        <span
                          key={f}
                          className="px-1.5 py-0.5 bg-muted rounded text-[8px] font-bold text-muted-foreground"
                        >
                          {f}
                        </span>
                      ))}
                    </div>
                    <button className="flex items-center gap-1.5 text-[10px] font-bold text-primary uppercase tracking-widest">
                      Generate <Download className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </Panel>

          <Panel title="Recent Generated Reports">
            <div className="space-y-3">
              {[
                {
                  name: "Executive_Overview_May_2026.pdf",
                  date: "May 31, 2026",
                  size: "2.4 MB",
                  type: "PDF",
                },
                {
                  name: "Release_5.2_Impact_Analysis.xlsx",
                  date: "May 28, 2026",
                  size: "1.2 MB",
                  type: "XLSX",
                },
                {
                  name: "Global_Sentiment_Drilldown.csv",
                  date: "May 25, 2026",
                  size: "850 KB",
                  type: "CSV",
                },
              ].map((r, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 p-3 rounded-lg bg-muted/10 border border-transparent hover:border-border transition-all shadow-sm group"
                >
                  <FileText className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-foreground truncate">
                      {r.name}
                    </div>
                    <div className="text-[10px] text-muted-foreground">
                      {r.date} · {r.size}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-muted rounded text-muted-foreground transition-colors">
                      <Printer className="h-4 w-4" />
                    </button>
                    <button className="p-2 hover:bg-muted rounded text-muted-foreground transition-colors">
                      <Share2 className="h-4 w-4" />
                    </button>
                    <button className="p-2 hover:bg-muted rounded text-primary transition-colors">
                      <Download className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </Panel>
        </div>

        <aside className="space-y-6">
          <Panel title="Custom Report Builder">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold text-muted-foreground">
                  Select Metrics
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {["Ratings", "Sentiment", "Issues", "NPS", "CSAT", "SLA"].map(
                    (m) => (
                      <label
                        key={m}
                        className="flex items-center gap-2 text-xs cursor-pointer bg-muted/30 p-2 rounded border border-border/50 text-foreground hover:border-primary/30 transition-all"
                      >
                        <input
                          type="checkbox"
                          className="rounded border-border bg-background"
                        />{" "}
                        {m}
                      </label>
                    ),
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold text-muted-foreground">
                  Date Range
                </label>
                <button className="w-full flex items-center justify-between bg-muted/30 border border-border/50 p-2 rounded text-xs text-foreground">
                  Last 30 Days{" "}
                  <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                </button>
              </div>
              <button className="w-full py-3 bg-primary text-primary-foreground rounded-xl text-sm font-bold shadow-glow mt-2 hover:opacity-90 transition-all">
                Build Custom Report
              </button>
            </div>
          </Panel>

          <Panel title="Scheduled Reports">
            <div className="space-y-4">
              {scheduledReports.map((s, i) => (
                <div
                  key={i}
                  className="space-y-2 p-3 rounded-lg bg-muted/5 border border-border/30 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-foreground">
                      {s.name}
                    </span>
                    <span className="text-[10px] px-1.5 py-0.5 bg-success/10 text-success rounded font-bold uppercase">
                      {s.frequency}
                    </span>
                  </div>
                  <div className="text-[10px] text-muted-foreground">
                    Next: {s.nextRun} · To: {s.recipients}
                  </div>
                </div>
              ))}
              <button className="w-full py-2 border border-dashed border-border text-xs font-medium rounded-lg hover:bg-muted transition-colors mt-2 text-foreground">
                + Schedule New Report
              </button>
            </div>
          </Panel>
        </aside>
      </div>
    </DashboardLayout>
  );
}
