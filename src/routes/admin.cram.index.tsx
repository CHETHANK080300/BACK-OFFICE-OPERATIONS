import { createFileRoute, Link } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { Panel } from "@/components/dashboard/Panel";
import {
  Zap,
  Globe2,
  Package,
  ShieldAlert,
  Users,
  History,
  TrendingUp,
  Activity,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
} from "recharts";
import { mockAuditLogs } from "@/lib/cram-mock-data";

export const Route = createFileRoute("/admin/cram/")({
  component: CramDashboard,
});

const riskDistData = [
  { name: "Low", value: 1420, color: "var(--success)" },
  { name: "Medium", value: 840, color: "var(--warning)" },
  { name: "High", value: 320, color: "var(--critical)" },
];

const factorBreakdownData = [
  { name: "Customer Type", value: 35 },
  { name: "Geography", value: 25 },
  { name: "Product", value: 30 },
  { name: "Channel", value: 10 },
];

function CramDashboard() {
  return (
    <DashboardLayout
      title="CRAM Administration"
      subtitle="Operational dashboard for customer risk assessment engine"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <Link
          to="/admin/cram/risk-model"
          className="block transition-transform hover:scale-[1.02]"
        >
          <KpiCard
            label="Risk Model Version"
            value="v2.4"
            icon={Zap}
            tone="primary"
            delta={0}
          />
        </Link>
        <Link
          to="/admin/cram/risk-model"
          className="block transition-transform hover:scale-[1.02]"
        >
          <KpiCard
            label="Total Parameters"
            value="42"
            icon={Activity}
            tone="accent"
            delta={2}
          />
        </Link>
        <Link
          to="/admin/cram/geography"
          className="block transition-transform hover:scale-[1.02]"
        >
          <KpiCard
            label="Countries Configured"
            value="198"
            icon={Globe2}
            tone="success"
            delta={0}
          />
        </Link>
        <Link
          to="/admin/cram/product"
          className="block transition-transform hover:scale-[1.02]"
        >
          <KpiCard
            label="Products Configured"
            value="24"
            icon={Package}
            tone="info"
            delta={1}
          />
        </Link>
        <Link
          to="/admin/cram/workflows"
          className="block transition-transform hover:scale-[1.02]"
        >
          <KpiCard
            label="Pending Approvals"
            value="03"
            icon={AlertCircle}
            tone="warning"
            delta={-1}
          />
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Panel title="Risk Distribution" subtitle="High / Medium / Low split">
          <div className="h-[260px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={riskDistData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {riskDistData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <Panel title="Risk Factor Breakdown" subtitle="Weightage by factor">
          <div className="h-[260px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={factorBreakdownData}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {factorBreakdownData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={`var(--chart-${index + 1})`}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {factorBreakdownData.map((item, i) => (
              <div key={item.name} className="flex items-center gap-2 text-xs">
                <div
                  className={`h-2 w-2 rounded-full bg-[var(--chart-${i + 1})]`}
                />
                <span className="text-muted-foreground">{item.name}</span>
                <span className="font-bold">{item.value}%</span>
              </div>
            ))}
          </div>
        </Panel>

        <Panel
          title="Recent Activities"
          subtitle="Latest configuration changes"
        >
          <div className="space-y-4">
            {mockAuditLogs.map((log) => (
              <div
                key={log.id}
                className="flex gap-3 pb-3 border-b border-border last:border-0"
              >
                <div className="mt-1">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <History className="h-4 w-4 text-primary" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <p className="text-sm font-medium">{log.action}</p>
                    <span className="text-[10px] text-muted-foreground">
                      {new Date(log.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground truncate">
                    {log.details}
                  </p>
                  <div className="mt-1 text-[10px] font-bold text-primary uppercase">
                    {log.user}
                  </div>
                </div>
              </div>
            ))}
            <Link
              to="/admin/cram/audit-logs"
              className="block text-center text-xs text-primary font-bold hover:underline mt-2"
            >
              View All Logs
            </Link>
          </div>
        </Panel>
      </div>
    </DashboardLayout>
  );
}
