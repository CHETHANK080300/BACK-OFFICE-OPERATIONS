import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Panel } from "@/components/dashboard/Panel";
import {
  Settings,
  Users,
  Smartphone,
  Globe,
  Shield,
  Bell,
  Cpu,
  ArrowRight,
} from "lucide-react";
import { InlineFilters } from "@/components/dashboard/InlineFilters";

export const Route = createFileRoute("/admin/")({
  head: () => ({
    meta: [
      { title: "Administration" },
      {
        name: "description",
        content:
          "Platform configuration, user management, role-based access control and AI model tuning.",
      },
    ],
  }),
  component: AdministrationModule,
});

const adminSections = [
  {
    id: "apps",
    name: "Applications",
    icon: Smartphone,
    count: 14,
    desc: "Manage connected mobile and web apps.",
  },
  {
    id: "users",
    name: "User Management",
    icon: Users,
    count: 42,
    desc: "Control access and assign roles.",
  },
  {
    id: "channels",
    name: "Channels",
    icon: Globe,
    count: 8,
    desc: "Configure feedback ingestion sources.",
  },
  {
    id: "roles",
    name: "Roles & Permissions",
    icon: Shield,
    count: 5,
    desc: "Define granular access controls.",
  },
  {
    id: "notifications",
    name: "Notification Rules",
    icon: Bell,
    count: 12,
    desc: "Set up real-time alerting system.",
  },
  {
    id: "ai-config",
    name: "AI Model Config",
    icon: Cpu,
    desc: "Tune sentiment and clustering models.",
  },
];

function AdministrationModule() {
  return (
    <DashboardLayout
      title="Platform Administration"
      subtitle="Configure platform settings, manage users and fine-tune AI intelligence"
    >
      <InlineFilters />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 grid gap-4 sm:grid-cols-2">
          {adminSections.map((section) => (
            <div
              key={section.id}
              className="bg-card border border-border rounded-xl p-5 hover:border-primary/40 transition-all group cursor-pointer shadow-sm"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-muted rounded-xl text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                  <section.icon className="h-6 w-6" />
                </div>
                {section.count !== undefined && (
                  <div className="px-2 py-1 bg-muted/50 rounded text-[10px] font-bold text-foreground">
                    {section.count} Active
                  </div>
                )}
              </div>
              <h3 className="font-bold mb-1 text-foreground">{section.name}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {section.desc}
              </p>
              <div className="mt-4 flex items-center gap-1.5 text-[10px] font-bold text-primary uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                Manage Section <ArrowRight className="h-3 w-3" />
              </div>
            </div>
          ))}
        </div>

        <aside className="space-y-6">
          <Panel title="System Status">
            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  API Services
                </span>
                <span className="flex items-center gap-1.5 text-xs font-bold text-success">
                  <span className="h-2 w-2 rounded-full bg-success" /> Healthy
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  AI Ingestion
                </span>
                <span className="flex items-center gap-1.5 text-xs font-bold text-success">
                  <span className="h-2 w-2 rounded-full bg-success" />{" "}
                  Processing
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Database</span>
                <span className="flex items-center gap-1.5 text-xs font-bold text-success">
                  <span className="h-2 w-2 rounded-full bg-success" /> Optimized
                </span>
              </div>
              <div className="pt-4 border-t border-border/50">
                <div className="text-[10px] uppercase font-bold text-muted-foreground mb-1">
                  Platform Version
                </div>
                <div className="text-sm font-mono text-foreground">
                  v2.4.8-enterprise
                </div>
              </div>
            </div>
          </Panel>

          <Panel title="Audit Log (Recent)">
            <div className="space-y-3">
              {[
                {
                  user: "Aarav S.",
                  action: "Updated AI Model",
                  time: "2h ago",
                },
                {
                  user: "System",
                  action: "Auto-backup complete",
                  time: "5h ago",
                },
                {
                  user: "Sarah L.",
                  action: "Added new channel",
                  time: "1d ago",
                },
              ].map((log, i) => (
                <div
                  key={i}
                  className="text-xs p-2 rounded bg-muted/5 border border-border/30"
                >
                  <div className="flex justify-between font-bold mb-0.5 text-foreground">
                    <span>{log.user}</span>
                    <span className="text-muted-foreground font-normal">
                      {log.time}
                    </span>
                  </div>
                  <div className="text-muted-foreground">{log.action}</div>
                </div>
              ))}
              <button className="w-full mt-2 text-[10px] font-bold text-primary uppercase tracking-widest text-center hover:opacity-80 transition-opacity">
                View Full Audit Trail
              </button>
            </div>
          </Panel>
        </aside>
      </div>
    </DashboardLayout>
  );
}
