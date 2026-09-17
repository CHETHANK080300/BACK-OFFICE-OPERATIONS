import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { Panel } from "@/components/dashboard/Panel";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  AreaChart,
  Area,
} from "recharts";
import {
  CreditCard,
  Clock,
  Users,
  RefreshCcw,
  AlertTriangle,
  Zap,
  ShieldAlert,
  Search,
  Filter,
  Download,
  ChevronRight,
  TrendingUp,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  mockVolumeTrend,
  mockChannelDistribution,
  mockTxnTypeDistribution,
  mockDisputes,
} from "@/lib/cram-mock-data";

export const Route = createFileRoute("/transaction-analyzer")({
  component: TransactionAnalyzer,
});

const recentTransactions = [
  {
    id: "TXN-88291",
    time: "10:24:12",
    customer: "Ahmad Abdullah",
    amount: "$1,240.00",
    type: "Transfer",
    channel: "Mobile",
    status: "Success",
  },
  {
    id: "TXN-88292",
    time: "10:25:05",
    customer: "Elena Rodriguez",
    amount: "$500.00",
    type: "Withdrawal",
    channel: "ATM",
    status: "Success",
  },
  {
    id: "TXN-88293",
    time: "10:26:45",
    customer: "Samuel Kwok",
    amount: "$3,120.00",
    type: "Deposit",
    channel: "Branch",
    status: "Pending",
  },
];

function TransactionAnalyzer() {
  const [chartType, setChartType] = useState<"area" | "bar">("area");
  const [drillDown, setDrillDown] = useState<{
    type: "channel" | "type";
    value: string;
  } | null>(null);

  if (drillDown) {
    return (
      <DashboardLayout
        title={`${drillDown.value} Analysis`}
        subtitle={`Detailed breakdown and performance metrics for ${drillDown.value}`}
      >
        <div className="mb-6">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setDrillDown(null)}
            className="gap-2"
          >
            ← Back to Dashboard
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <KpiCard
            label="Selected Volume"
            value="14.2K"
            icon={RefreshCcw}
            tone="primary"
            delta={4.2}
          />
          <KpiCard
            label="Success Rate"
            value="99.4%"
            icon={Zap}
            tone="success"
            delta={0.2}
          />
          <KpiCard
            label="Avg. Latency"
            value="1.2s"
            icon={Clock}
            tone="info"
            delta={-5}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Panel
            title="Trend Analysis"
            subtitle="Performance over the last 30 days"
          >
            <div className="h-[300px] flex items-center justify-center border border-dashed rounded-lg bg-muted/20">
              <TrendingUp className="h-8 w-8 text-muted-foreground opacity-20 mr-2" />
              <span className="text-muted-foreground font-medium">
                Trend Visualization Loading...
              </span>
            </div>
          </Panel>
          <Panel
            title="User Demographics"
            subtitle="Segment distribution for this category"
          >
            <div className="space-y-4">
              {[
                { label: "Retail", value: 65 },
                { label: "Corporate", value: 20 },
                { label: "HNI", value: 10 },
                { label: "Others", value: 5 },
              ].map((item) => (
                <div key={item.label} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{item.label}</span>
                    <span className="text-muted-foreground">{item.value}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-teal-600 rounded-full"
                      style={{ width: `${item.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Panel>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout
      title="Transaction Analyzer"
      subtitle="Comprehensive view of multi-channel transaction data and behavioral patterns"
    >
      {/* Top Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2">
          <Select defaultValue="month">
            <SelectTrigger className="w-[140px] bg-card border-border">
              <SelectValue placeholder="Time Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Filter transactions..."
              className="pl-9 bg-card border-border"
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Filter className="h-4 w-4" /> Filters
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="h-4 w-4" /> Export
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <KpiCard
          label="Total Transactions"
          value="45,239"
          icon={RefreshCcw}
          tone="primary"
          delta={12.5}
        />
        <KpiCard
          label="Transaction Value"
          value="$2.14M"
          icon={CreditCard}
          tone="accent"
          delta={8.1}
        />
        <KpiCard
          label="Active Customers"
          value="12,847"
          icon={Users}
          tone="info"
          delta={5.3}
        />
        <KpiCard
          label="Avg Processing Time"
          value="1.8s"
          icon={Clock}
          tone="success"
          delta={-3.2} // 3.2% improvement (reduction)
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Main Volume Chart */}
        <Panel
          title="Transaction Volume Trend"
          subtitle="Volume of transactions by category"
          className="lg:col-span-2"
          action={
            <div className="flex bg-muted p-1 rounded-md">
              <button
                onClick={() => setChartType("area")}
                className={`px-3 py-1 text-xs font-medium rounded ${chartType === "area" ? "bg-card shadow-sm" : "text-muted-foreground"}`}
              >
                Area
              </button>
              <button
                onClick={() => setChartType("bar")}
                className={`px-3 py-1 text-xs font-medium rounded ${chartType === "bar" ? "bg-card shadow-sm" : "text-muted-foreground"}`}
              >
                Bar
              </button>
            </div>
          }
        >
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              {chartType === "area" ? (
                <AreaChart data={mockVolumeTrend}>
                  <defs>
                    {["deposits", "withdrawals", "transfers", "loans"].map(
                      (key, i) => (
                        <linearGradient
                          key={key}
                          id={`color${key}`}
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor={`var(--chart-${i + 1})`}
                            stopOpacity={0.1}
                          />
                          <stop
                            offset="95%"
                            stopColor={`var(--chart-${i + 1})`}
                            stopOpacity={0}
                          />
                        </linearGradient>
                      ),
                    )}
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="var(--border)"
                  />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      background: "var(--card)",
                      border: "1px solid var(--border)",
                      borderRadius: "8px",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="deposits"
                    stroke="#0D9488"
                    fillOpacity={1}
                    fill="url(#colordeposits)"
                    stackId="1"
                  />
                  <Area
                    type="monotone"
                    dataKey="withdrawals"
                    stroke="#0F172A"
                    fillOpacity={1}
                    fill="url(#colorwithdrawals)"
                    stackId="1"
                  />
                  <Area
                    type="monotone"
                    dataKey="transfers"
                    stroke="#1E293B"
                    fillOpacity={1}
                    fill="url(#colortransfers)"
                    stackId="1"
                  />
                  <Area
                    type="monotone"
                    dataKey="loans"
                    stroke="#334155"
                    fillOpacity={1}
                    fill="url(#colorloans)"
                    stackId="1"
                  />
                  <Legend />
                </AreaChart>
              ) : (
                <BarChart data={mockVolumeTrend}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="var(--border)"
                  />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      background: "var(--card)",
                      border: "1px solid var(--border)",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="deposits" fill="#0D9488" stackId="a" />
                  <Bar dataKey="withdrawals" fill="#0F172A" stackId="a" />
                  <Bar dataKey="transfers" fill="#1E293B" stackId="a" />
                  <Bar dataKey="loans" fill="#334155" stackId="a" />
                  <Legend />
                </BarChart>
              )}
            </ResponsiveContainer>
          </div>
        </Panel>

        {/* Real-time Alerts */}
        <Panel
          title="System Alerts"
          subtitle="Real-time notifications and anomalies"
        >
          <div className="space-y-4">
            <div className="p-3 rounded-lg border border-critical/20 bg-critical/5 flex gap-3">
              <div className="h-8 w-8 rounded-full bg-critical/10 flex items-center justify-center shrink-0">
                <AlertTriangle className="h-4 w-4 text-critical" />
              </div>
              <div>
                <div className="flex justify-between items-start">
                  <p className="text-sm font-bold text-critical">
                    Activity Spike
                  </p>
                  <span className="text-[10px] text-muted-foreground uppercase">
                    10:42 AM
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  International transfer volume exceeded threshold by 42% in UAE
                  corridor.
                </p>
              </div>
            </div>

            <div className="p-3 rounded-lg border border-warning/20 bg-warning/5 flex gap-3">
              <div className="h-8 w-8 rounded-full bg-warning/10 flex items-center justify-center shrink-0">
                <ShieldAlert className="h-4 w-4 text-warning" />
              </div>
              <div>
                <div className="flex justify-between items-start">
                  <p className="text-sm font-bold text-warning">
                    Security Concern
                  </p>
                  <span className="text-[10px] text-muted-foreground uppercase">
                    09:15 AM
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Multiple failed login attempts detected from unrecognized IP
                  range.
                </p>
              </div>
            </div>

            <div className="p-3 rounded-lg border border-primary/20 bg-primary/5 flex gap-3">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <Zap className="h-4 w-4 text-primary" />
              </div>
              <div>
                <div className="flex justify-between items-start">
                  <p className="text-sm font-bold text-primary">
                    System Status
                  </p>
                  <span className="text-[10px] text-muted-foreground uppercase">
                    08:00 AM
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Primary database maintenance completed. All services fully
                  operational.
                </p>
              </div>
            </div>
          </div>
          <Button variant="link" className="w-full mt-2 text-xs h-auto py-1">
            View All Notifications →
          </Button>
        </Panel>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Channel Distribution */}
        <Panel
          title="Channel Distribution"
          subtitle="Transaction volume by channel"
        >
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={mockChannelDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  onClick={(data) =>
                    setDrillDown({ type: "channel", value: data.name })
                  }
                  className="cursor-pointer"
                >
                  {mockChannelDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <p className="text-[10px] text-center text-muted-foreground italic mt-2">
            Tip: Click a segment to drill down into channel analytics
          </p>
        </Panel>

        {/* Transaction Types */}
        <Panel
          title="Transaction Types"
          subtitle="Classification of activities"
        >
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={mockTxnTypeDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  onClick={(data) =>
                    setDrillDown({ type: "type", value: data.name })
                  }
                  className="cursor-pointer"
                >
                  {mockTxnTypeDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <p className="text-[10px] text-center text-muted-foreground italic mt-2">
            Tip: Click a segment for type-specific analysis
          </p>
        </Panel>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Raised Disputes */}
        <Panel
          title="Raised Disputes"
          subtitle="Recent customer issue tracking"
        >
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ref ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Issue Type</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockDisputes.map((dispute) => (
                <TableRow key={dispute.id}>
                  <TableCell className="font-mono text-xs font-bold">
                    {dispute.id}
                  </TableCell>
                  <TableCell className="text-sm font-medium">
                    {dispute.customerName}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        dispute.issueType === "Unauthorized Transaction"
                          ? "bg-critical/10 text-critical"
                          : dispute.issueType === "Transaction Error"
                            ? "bg-warning/10 text-warning"
                            : "bg-info/10 text-info"
                      }`}
                    >
                      {dispute.issueType}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        dispute.status === "Pending"
                          ? "warning"
                          : dispute.status === "Under Review"
                            ? "info"
                            : "success"
                      }
                      className="text-[10px]"
                    >
                      {dispute.status.toUpperCase()}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Button variant="link" className="w-full mt-2 text-xs">
            Manage All Disputes →
          </Button>
        </Panel>

        {/* Recent Transactions */}
        <Panel title="Recent Transactions" subtitle="Live activity stream">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Txn ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Channel</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentTransactions.map((txn) => (
                <TableRow key={txn.id}>
                  <TableCell>
                    <div className="font-mono text-[10px] font-bold">
                      {txn.id}
                    </div>
                    <div className="text-[10px] text-muted-foreground">
                      {txn.time}
                    </div>
                  </TableCell>
                  <TableCell className="text-sm font-medium">
                    {txn.customer}
                  </TableCell>
                  <TableCell className="text-sm font-bold text-teal-600">
                    {txn.amount}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-[10px]">
                      {txn.channel}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Button variant="link" className="w-full mt-2 text-xs">
            View Full Transaction Log →
          </Button>
        </Panel>
      </div>
    </DashboardLayout>
  );
}
