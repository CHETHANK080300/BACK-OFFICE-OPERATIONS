import {
  createFileRoute,
  useNavigate,
  notFound,
  Outlet,
  useLocation,
} from "@tanstack/react-router";
import { useState, useMemo } from "react";
import {
  User,
  CreditCard,
  History,
  FileText,
  LifeBuoy,
  Smartphone,
  BarChart3,
  LayoutDashboard,
  ArrowLeft,
  Search,
  RotateCcw,
  Calendar,
  Building2,
  Edit,
  ShieldCheck,
  TrendingUp,
  TrendingDown,
  ExternalLink,
  ChevronRight,
  Filter,
  CheckCircle2,
  DollarSign,
  Briefcase,
  Layers,
} from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Panel } from "@/components/dashboard/Panel";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { Breadcrumb } from "@/components/customer/Breadcrumb";
import { CustomerSummaryCard } from "@/components/customer/CustomerSummaryCard";
import { DataMasker } from "@/components/customer/DataMasker";
import { StatusBadge } from "@/components/customer/StatusBadge";
import { EmptyState, SkeletonTable } from "@/components/customer/EmptyState";
import {
  getCustomerById,
  getCustomerAccounts,
  getCustomerTransactions,
  getCustomerApplications,
  getCustomerServiceRequests,
  getCustomerLoginActivities,
  getCustomerAnalytics,
  Customer,
} from "@/mock/customerService";

export const Route = createFileRoute(
  "/customer-management/customers/$customerId",
)({
  loader: ({ params }) => {
    const customer = getCustomerById(params.customerId);
    if (!customer) throw notFound();
    return { customer };
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        title: `${loaderData?.customer?.name ?? "Customer"} · Customer 360`,
      },
    ],
  }),
  notFoundComponent: () => (
    <DashboardLayout
      title="Customer Not Found"
      subtitle="The requested customer record does not exist."
    >
      <EmptyState
        icon="search"
        title="Customer Record Not Found"
        description="We couldn't find a customer matching that CIF or ID."
      />
    </DashboardLayout>
  ),
  component: Customer360Dashboard,
});

const tabsList = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "profile", label: "Customer Profile", icon: User },
  { id: "accounts", label: "Accounts & Products", icon: CreditCard },
  { id: "transactions", label: "Transactions", icon: History },
  { id: "applications", label: "Applications", icon: FileText },
  { id: "service-requests", label: "Service Requests", icon: LifeBuoy },
  { id: "digital-activity", label: "Digital Activity", icon: Smartphone },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
] as const;

type TabId = (typeof tabsList)[number]["id"];

const chartTooltipStyle = {
  contentStyle: {
    background: "oklch(0.22 0.028 250)",
    border: "1px solid oklch(0.3 0.03 255)",
    borderRadius: 8,
    fontSize: 12,
  },
  labelStyle: { color: "oklch(0.97 0.005 250)" },
};

function Customer360Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const { customer } = Route.useLoaderData() as { customer: Customer };

  // Determine if child drill-down route is rendered
  const isChildRoute =
    location.pathname.includes("/accounts/") ||
    location.pathname.includes("/transactions/") ||
    location.pathname.includes("/applications/") ||
    location.pathname.includes("/service-requests/");

  const [activeTab, setActiveTab] = useState<TabId>("overview");
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);

  // Accounts & Products tab state
  const [accTypeFilter, setAccTypeFilter] = useState("All");
  const [accStatusFilter, setAccStatusFilter] = useState("All");

  // Transactions tab state
  const [txTypeFilter, setTxTypeFilter] = useState("All");
  const [txStatusFilter, setTxStatusFilter] = useState("All");
  const [txChannelFilter, setTxChannelFilter] = useState("All");
  const [txQuery, setTxQuery] = useState("");

  // Applications tab state
  const [appStatusFilter, setAppStatusFilter] = useState("All");

  // Service Requests tab state
  const [srStatusFilter, setSrStatusFilter] = useState("All");
  const [srPriorityFilter, setSrPriorityFilter] = useState("All");

  // Digital Activity tab state
  const [logChannelFilter, setLogChannelFilter] = useState("All");

  // Analytics tab state
  const [analyticsChannelFilter, setAnalyticsChannelFilter] = useState("All");

  // Data queries
  const accounts = useMemo(
    () =>
      getCustomerAccounts(customer.id, {
        productType: accTypeFilter,
        status: accStatusFilter,
      }),
    [customer.id, accTypeFilter, accStatusFilter],
  );

  const transactions = useMemo(
    () =>
      getCustomerTransactions(customer.id, {
        type: txTypeFilter,
        status: txStatusFilter,
        channel: txChannelFilter,
        searchQuery: txQuery,
      }),
    [customer.id, txTypeFilter, txStatusFilter, txChannelFilter, txQuery],
  );

  const applications = useMemo(
    () =>
      getCustomerApplications(customer.id, {
        status: appStatusFilter,
      }),
    [customer.id, appStatusFilter],
  );

  const serviceRequests = useMemo(
    () =>
      getCustomerServiceRequests(customer.id, {
        status: srStatusFilter,
        priority: srPriorityFilter,
      }),
    [customer.id, srStatusFilter, srPriorityFilter],
  );

  const loginActivities = useMemo(
    () =>
      getCustomerLoginActivities(customer.id, {
        channel: logChannelFilter,
      }),
    [customer.id, logChannelFilter],
  );

  const analyticsData = useMemo(
    () => getCustomerAnalytics(customer.id),
    [customer.id],
  );

  // Calculated analytics metrics
  const totalTxCount2025 = useMemo(
    () => analyticsData.reduce((acc, curr) => acc + curr.txCount2025, 0),
    [analyticsData],
  );
  const totalTxCount2026 = useMemo(
    () => analyticsData.reduce((acc, curr) => acc + curr.txCount2026, 0),
    [analyticsData],
  );
  const txCountChangePct = useMemo(
    () =>
      (
        ((totalTxCount2026 - totalTxCount2025) / totalTxCount2025) *
        100
      ).toFixed(1),
    [totalTxCount2025, totalTxCount2026],
  );

  const totalTxValue2025 = useMemo(
    () => analyticsData.reduce((acc, curr) => acc + curr.txValue2025, 0),
    [analyticsData],
  );
  const totalTxValue2026 = useMemo(
    () => analyticsData.reduce((acc, curr) => acc + curr.txValue2026, 0),
    [analyticsData],
  );
  const txValueChangePct = useMemo(
    () =>
      (
        ((totalTxValue2026 - totalTxValue2025) / totalTxValue2025) *
        100
      ).toFixed(1),
    [totalTxValue2025, totalTxValue2026],
  );

  const totalLogins2025 = useMemo(
    () => analyticsData.reduce((acc, curr) => acc + curr.loginsSuccess2025, 0),
    [analyticsData],
  );
  const totalLogins2026 = useMemo(
    () => analyticsData.reduce((acc, curr) => acc + curr.loginsSuccess2026, 0),
    [analyticsData],
  );
  const loginsChangePct = useMemo(
    () =>
      (((totalLogins2026 - totalLogins2025) / totalLogins2025) * 100).toFixed(
        1,
      ),
    [totalLogins2025, totalLogins2026],
  );

  if (isChildRoute) {
    return <Outlet />;
  }

  return (
    <DashboardLayout
      title="Customer 360"
      subtitle={`360-degree view for ${customer.name} (${customer.id})`}
    >
      <Breadcrumb
        items={[
          { label: "Customer Search", to: "/customer-management" },
          { label: customer.name },
          {
            label:
              tabsList.find((t) => t.id === activeTab)?.label ?? "Overview",
          },
        ]}
      />

      {/* Top Customer Summary Header */}
      <CustomerSummaryCard
        customer={customer}
        onViewProfileClick={() => setActiveTab("profile")}
      />

      {/* Navigation Tabs */}
      <div className="mt-6 flex flex-wrap gap-2 border-b border-border pb-3">
        {tabsList.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold transition-all ${
                isActive
                  ? "bg-primary text-primary-foreground shadow-glow scale-[1.02]"
                  : "bg-card border border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === "overview" && (
        <div className="mt-6 space-y-6">
          {/* Summary KPI grid */}
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6">
            <div className="rounded-xl border border-border bg-card p-4">
              <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                Total Products
              </div>
              <div className="mt-2 font-display text-2xl font-bold text-foreground">
                {customer.productsCount}
              </div>
              <div className="mt-1 text-[10px] text-success font-medium">
                Active Enrolled
              </div>
            </div>

            <div className="rounded-xl border border-border bg-card p-4">
              <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                Relationship Value
              </div>
              <div className="mt-2 font-display text-2xl font-bold text-foreground">
                ₱{(customer.totalRelationshipValue / 1000000).toFixed(2)}M
              </div>
              <div className="mt-1 text-[10px] text-success font-medium">
                +14.2% YoY
              </div>
            </div>

            <div className="rounded-xl border border-border bg-card p-4">
              <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                Current Year Txns
              </div>
              <div className="mt-2 font-display text-2xl font-bold text-foreground">
                {customer.currentYearTransactionsCount.toLocaleString()}
              </div>
              <div className="mt-1 text-[10px] text-primary font-medium">
                High Engagement
              </div>
            </div>

            <div className="rounded-xl border border-border bg-card p-4">
              <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                Open Requests
              </div>
              <div className="mt-2 font-display text-2xl font-bold text-warning">
                {customer.openServiceRequestsCount}
              </div>
              <div className="mt-1 text-[10px] text-muted-foreground">
                Pending SLA
              </div>
            </div>

            <div className="rounded-xl border border-border bg-card p-4">
              <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                Applications
              </div>
              <div className="mt-2 font-display text-2xl font-bold text-foreground">
                {customer.applicationsCount}
              </div>
              <div className="mt-1 text-[10px] text-muted-foreground">
                In pipeline
              </div>
            </div>

            <div className="rounded-xl border border-border bg-card p-4">
              <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                Last Login
              </div>
              <div className="mt-2 text-xs font-semibold text-foreground truncate">
                {customer.lastLogin.split(",")[0]}
              </div>
              <div className="mt-1 text-[10px] text-muted-foreground">
                Mobile App
              </div>
            </div>
          </div>

          {/* Relationship Summary & Recent Activity */}
          <div className="grid gap-6 lg:grid-cols-2">
            <Panel
              title="Relationship Summary"
              subtitle="Enrolled banking products and accounts"
            >
              <div className="space-y-3">
                {accounts.map((acc) => (
                  <div
                    key={acc.id}
                    className="flex items-center justify-between rounded-lg border border-border/80 bg-muted/20 p-3.5 hover:border-primary/40 transition-all cursor-pointer"
                    onClick={() =>
                      navigate({
                        to: `/customer-management/customers/$customerId/accounts/$accountId`,
                        params: { customerId: customer.id, accountId: acc.id },
                      })
                    }
                  >
                    <div>
                      <div className="font-semibold text-foreground text-sm">
                        {acc.productName}
                      </div>
                      <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                        <DataMasker value={acc.id} type="account" />
                        <span>·</span>
                        <span className="font-mono">{acc.type}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-display font-bold text-foreground text-sm">
                        ₱{acc.balance.toLocaleString()}
                      </div>
                      <StatusBadge status={acc.status} />
                    </div>
                  </div>
                ))}
              </div>
            </Panel>

            <Panel
              title="Recent Activity"
              subtitle="Latest transactions, requests & logins"
            >
              <div className="space-y-3">
                {transactions.slice(0, 4).map((tx) => (
                  <div
                    key={tx.id}
                    className="flex items-center justify-between rounded-lg border border-border/60 bg-muted/10 p-3 text-xs"
                  >
                    <div>
                      <div className="font-semibold text-foreground">
                        {tx.type}
                      </div>
                      <div className="text-[10px] text-muted-foreground">
                        {tx.dateTime} · {tx.channel}
                      </div>
                    </div>
                    <div className="text-right font-mono font-bold">
                      {tx.debit > 0 ? (
                        <span className="text-critical">
                          -₱{tx.debit.toLocaleString()}
                        </span>
                      ) : (
                        <span className="text-success">
                          +₱{tx.credit.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
                {transactions.length === 0 && (
                  <div className="text-xs text-muted-foreground text-center py-4">
                    No recent transactions found.
                  </div>
                )}
              </div>
            </Panel>
          </div>
        </div>
      )}

      {/* TAB 2: PROFILE */}
      {activeTab === "profile" && (
        <div className="mt-6 space-y-6">
          <div className="flex justify-end">
            <button
              onClick={() => setShowEditProfileModal(true)}
              className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-xs font-bold text-primary-foreground shadow-glow hover:opacity-90"
            >
              <Edit className="h-3.5 w-3.5" /> Edit / View Full Details
            </button>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Panel title="Personal Information">
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-muted-foreground">
                    Customer ID (CIF):
                  </span>
                  <p className="font-mono font-bold text-primary">
                    {customer.id}
                  </p>
                </div>
                <div>
                  <span className="text-muted-foreground">Full Name:</span>
                  <p className="font-semibold text-foreground">
                    {customer.name}
                  </p>
                </div>
                <div>
                  <span className="text-muted-foreground">Date of Birth:</span>
                  <p className="font-medium text-foreground">
                    {customer.dateOfBirth}
                  </p>
                </div>
                <div>
                  <span className="text-muted-foreground">Gender:</span>
                  <p className="font-medium text-foreground">
                    {customer.gender}
                  </p>
                </div>
                <div>
                  <span className="text-muted-foreground">Nationality:</span>
                  <p className="font-medium text-foreground">
                    {customer.nationality}
                  </p>
                </div>
                <div>
                  <span className="text-muted-foreground">
                    Customer Segment:
                  </span>
                  <p className="font-medium text-accent">{customer.segment}</p>
                </div>
              </div>
            </Panel>

            <Panel title="Contact Information">
              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-muted-foreground">Mobile Number:</span>
                  <p className="font-semibold">
                    <DataMasker value={customer.mobile} type="mobile" />
                  </p>
                </div>
                <div>
                  <span className="text-muted-foreground">Email Address:</span>
                  <p className="font-semibold">
                    <DataMasker value={customer.email} type="email" />
                  </p>
                </div>
                <div>
                  <span className="text-muted-foreground">
                    Residential Address:
                  </span>
                  <p className="font-medium text-foreground">
                    {customer.residentialAddress}
                  </p>
                </div>
                <div>
                  <span className="text-muted-foreground">
                    Mailing Address:
                  </span>
                  <p className="font-medium text-foreground">
                    {customer.mailingAddress}
                  </p>
                </div>
              </div>
            </Panel>

            <Panel title="KYC & Verification Info">
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-muted-foreground">KYC Status:</span>
                  <div className="mt-1">
                    <StatusBadge status={customer.kycStatus} />
                  </div>
                </div>
                <div>
                  <span className="text-muted-foreground">Risk Category:</span>
                  <div className="mt-1">
                    <StatusBadge status={customer.riskCategory} />
                  </div>
                </div>
                <div>
                  <span className="text-muted-foreground">KYC Date:</span>
                  <p className="font-medium text-foreground">
                    {customer.kycDate}
                  </p>
                </div>
                <div>
                  <span className="text-muted-foreground">KYC Expiry:</span>
                  <p className="font-medium text-foreground">
                    {customer.kycExpiry}
                  </p>
                </div>
                <div>
                  <span className="text-muted-foreground">ID Type:</span>
                  <p className="font-medium text-foreground">
                    {customer.idType}
                  </p>
                </div>
                <div>
                  <span className="text-muted-foreground">ID Number:</span>
                  <DataMasker value={customer.idNumber} type="id" />
                </div>
              </div>
            </Panel>

            <Panel title="Customer Relationship">
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-muted-foreground">Customer Since:</span>
                  <p className="font-semibold text-foreground">
                    {customer.customerSince}
                  </p>
                </div>
                <div>
                  <span className="text-muted-foreground">
                    Customer Status:
                  </span>
                  <div className="mt-1">
                    <StatusBadge status={customer.status} />
                  </div>
                </div>
                <div>
                  <span className="text-muted-foreground">
                    Relationship Manager:
                  </span>
                  <p className="font-medium text-foreground">
                    {customer.rmName}
                  </p>
                </div>
                <div>
                  <span className="text-muted-foreground">Home Branch:</span>
                  <p className="font-medium text-foreground">
                    {customer.branch}
                  </p>
                </div>
              </div>
            </Panel>
          </div>
        </div>
      )}

      {/* TAB 3: ACCOUNTS & PRODUCTS */}
      {activeTab === "accounts" && (
        <div className="mt-6 space-y-6">
          <Panel
            title="Accounts & Products Enrolled"
            subtitle="All deposit accounts, loans, credit cards and investment products"
            action={
              <div className="flex items-center gap-2">
                <select
                  value={accTypeFilter}
                  onChange={(e) => setAccTypeFilter(e.target.value)}
                  className="rounded-lg border border-input bg-muted/40 py-1.5 px-3 text-xs outline-none"
                >
                  <option value="All">All Types</option>
                  <option value="CASA">CASA</option>
                  <option value="Card">Cards</option>
                  <option value="Loan">Loans</option>
                  <option value="Time Deposit">Time Deposits</option>
                </select>
                <select
                  value={accStatusFilter}
                  onChange={(e) => setAccStatusFilter(e.target.value)}
                  className="rounded-lg border border-input bg-muted/40 py-1.5 px-3 text-xs outline-none"
                >
                  <option value="All">All Statuses</option>
                  <option value="Active">Active</option>
                  <option value="Dormant">Dormant</option>
                  <option value="Blocked">Blocked</option>
                </select>
              </div>
            }
          >
            {accounts.length === 0 ? (
              <EmptyState
                title="No accounts found"
                description="No products match the selected filters."
              />
            ) : (
              <div className="overflow-x-auto custom-scrollbar">
                <table className="w-full text-left text-sm">
                  <thead className="bg-muted/40 text-xs uppercase tracking-wider text-muted-foreground">
                    <tr>
                      <th className="px-4 py-3 font-semibold">Product</th>
                      <th className="px-4 py-3 font-semibold">Account No.</th>
                      <th className="px-4 py-3 font-semibold">Type</th>
                      <th className="px-4 py-3 font-semibold">Status</th>
                      <th className="px-4 py-3 font-semibold text-right">
                        Balance
                      </th>
                      <th className="px-4 py-3 font-semibold">Opened Date</th>
                      <th className="px-4 py-3 font-semibold text-center">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {accounts.map((acc) => (
                      <tr
                        key={acc.id}
                        className="hover:bg-muted/30 transition-colors"
                      >
                        <td className="px-4 py-3.5 font-semibold text-foreground">
                          {acc.productName}
                        </td>
                        <td className="px-4 py-3.5 text-xs font-mono">
                          <DataMasker value={acc.id} type="account" />
                        </td>
                        <td className="px-4 py-3.5 text-xs font-semibold">
                          {acc.type}
                        </td>
                        <td className="px-4 py-3.5">
                          <StatusBadge status={acc.status} />
                        </td>
                        <td className="px-4 py-3.5 text-right font-display font-bold text-foreground">
                          ₱{acc.balance.toLocaleString()}
                        </td>
                        <td className="px-4 py-3.5 text-xs text-muted-foreground">
                          {acc.openedDate}
                        </td>
                        <td className="px-4 py-3.5 text-center">
                          <button
                            onClick={() =>
                              navigate({
                                to: `/customer-management/customers/$customerId/accounts/$accountId`,
                                params: {
                                  customerId: customer.id,
                                  accountId: acc.id,
                                },
                              })
                            }
                            className="rounded-lg bg-primary/10 px-3 py-1.5 text-xs font-bold text-primary hover:bg-primary hover:text-primary-foreground transition-all"
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Panel>
        </div>
      )}

      {/* TAB 4: TRANSACTIONS */}
      {activeTab === "transactions" && (
        <div className="mt-6 space-y-6">
          <Panel
            title="Transaction History"
            subtitle="Comprehensive transaction ledger for customer accounts"
            action={
              <div className="flex flex-wrap items-center gap-2">
                <input
                  type="text"
                  placeholder="Search reference, beneficiary..."
                  value={txQuery}
                  onChange={(e) => setTxQuery(e.target.value)}
                  className="rounded-lg border border-input bg-muted/40 py-1.5 px-3 text-xs outline-none focus:border-primary"
                />
                <select
                  value={txTypeFilter}
                  onChange={(e) => setTxTypeFilter(e.target.value)}
                  className="rounded-lg border border-input bg-muted/40 py-1.5 px-3 text-xs outline-none"
                >
                  <option value="All">All Types</option>
                  <option value="Fund Transfer">Fund Transfer</option>
                  <option value="Cash Deposit">Cash Deposit</option>
                  <option value="Cash Withdrawal">Cash Withdrawal</option>
                  <option value="Bill Payment">Bill Payment</option>
                  <option value="Card Payment">Card Payment</option>
                </select>
                <select
                  value={txStatusFilter}
                  onChange={(e) => setTxStatusFilter(e.target.value)}
                  className="rounded-lg border border-input bg-muted/40 py-1.5 px-3 text-xs outline-none"
                >
                  <option value="All">All Statuses</option>
                  <option value="Success">Success</option>
                  <option value="Pending">Pending</option>
                  <option value="Failed">Failed</option>
                </select>
              </div>
            }
          >
            {transactions.length === 0 ? (
              <EmptyState
                icon="search"
                title="No transactions found"
                description="No transactions found for the selected filters."
              />
            ) : (
              <div className="overflow-x-auto custom-scrollbar">
                <table className="w-full text-left text-sm">
                  <thead className="bg-muted/40 text-xs uppercase tracking-wider text-muted-foreground">
                    <tr>
                      <th className="px-4 py-3 font-semibold">Date</th>
                      <th className="px-4 py-3 font-semibold">Reference</th>
                      <th className="px-4 py-3 font-semibold">Account</th>
                      <th className="px-4 py-3 font-semibold">Type</th>
                      <th className="px-4 py-3 font-semibold">Channel</th>
                      <th className="px-4 py-3 font-semibold text-right">
                        Debit
                      </th>
                      <th className="px-4 py-3 font-semibold text-right">
                        Credit
                      </th>
                      <th className="px-4 py-3 font-semibold">Status</th>
                      <th className="px-4 py-3 font-semibold text-center">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {transactions.map((tx) => (
                      <tr
                        key={tx.id}
                        className="hover:bg-muted/30 transition-colors"
                      >
                        <td className="px-4 py-3.5 text-xs font-medium">
                          {tx.date}
                        </td>
                        <td className="px-4 py-3.5 font-mono text-xs font-semibold text-primary">
                          {tx.id}
                        </td>
                        <td className="px-4 py-3.5 text-xs font-mono">
                          <DataMasker value={tx.accountId} type="account" />
                        </td>
                        <td className="px-4 py-3.5 text-xs font-semibold">
                          {tx.type}
                        </td>
                        <td className="px-4 py-3.5 text-xs">{tx.channel}</td>
                        <td className="px-4 py-3.5 text-right font-mono font-bold text-critical">
                          {tx.debit > 0 ? `₱${tx.debit.toLocaleString()}` : "-"}
                        </td>
                        <td className="px-4 py-3.5 text-right font-mono font-bold text-success">
                          {tx.credit > 0
                            ? `₱${tx.credit.toLocaleString()}`
                            : "-"}
                        </td>
                        <td className="px-4 py-3.5">
                          <StatusBadge status={tx.status} />
                        </td>
                        <td className="px-4 py-3.5 text-center">
                          <button
                            onClick={() =>
                              navigate({
                                to: `/customer-management/customers/$customerId/transactions/$transactionId`,
                                params: {
                                  customerId: customer.id,
                                  transactionId: tx.id,
                                },
                              })
                            }
                            className="rounded-lg bg-primary/10 px-3 py-1.5 text-xs font-bold text-primary hover:bg-primary hover:text-primary-foreground transition-all"
                          >
                            Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Panel>
        </div>
      )}

      {/* TAB 5: APPLICATIONS */}
      {activeTab === "applications" && (
        <div className="mt-6 space-y-6">
          <Panel
            title="Applications Initiated"
            subtitle="Status of product, account opening and service applications"
            action={
              <select
                value={appStatusFilter}
                onChange={(e) => setAppStatusFilter(e.target.value)}
                className="rounded-lg border border-input bg-muted/40 py-1.5 px-3 text-xs outline-none"
              >
                <option value="All">All Statuses</option>
                <option value="Submitted">Submitted</option>
                <option value="Under Review">Under Review</option>
                <option value="Approved">Approved</option>
                <option value="Completed">Completed</option>
              </select>
            }
          >
            {applications.length === 0 ? (
              <EmptyState
                title="No applications found"
                description="No application records found for this customer."
              />
            ) : (
              <div className="overflow-x-auto custom-scrollbar">
                <table className="w-full text-left text-sm">
                  <thead className="bg-muted/40 text-xs uppercase tracking-wider text-muted-foreground">
                    <tr>
                      <th className="px-4 py-3 font-semibold">
                        Application ID
                      </th>
                      <th className="px-4 py-3 font-semibold">Product</th>
                      <th className="px-4 py-3 font-semibold">
                        Submitted Date
                      </th>
                      <th className="px-4 py-3 font-semibold">Status</th>
                      <th className="px-4 py-3 font-semibold">Last Updated</th>
                      <th className="px-4 py-3 font-semibold text-center">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {applications.map((app) => (
                      <tr
                        key={app.id}
                        className="hover:bg-muted/30 transition-colors"
                      >
                        <td className="px-4 py-3.5 font-mono text-xs font-semibold text-primary">
                          {app.id}
                        </td>
                        <td className="px-4 py-3.5 font-semibold text-foreground">
                          {app.product}
                        </td>
                        <td className="px-4 py-3.5 text-xs text-muted-foreground">
                          {app.submittedDate}
                        </td>
                        <td className="px-4 py-3.5">
                          <StatusBadge status={app.status} />
                        </td>
                        <td className="px-4 py-3.5 text-xs text-muted-foreground">
                          {app.lastUpdated}
                        </td>
                        <td className="px-4 py-3.5 text-center">
                          <button
                            onClick={() =>
                              navigate({
                                to: `/customer-management/customers/$customerId/applications/$applicationId`,
                                params: {
                                  customerId: customer.id,
                                  applicationId: app.id,
                                },
                              })
                            }
                            className="rounded-lg bg-primary/10 px-3 py-1.5 text-xs font-bold text-primary hover:bg-primary hover:text-primary-foreground transition-all"
                          >
                            View Journey
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Panel>
        </div>
      )}

      {/* TAB 6: SERVICE REQUESTS */}
      {activeTab === "service-requests" && (
        <div className="mt-6 space-y-6">
          <Panel
            title="Service Requests"
            subtitle="Helpdesk tickets, inquiries, disputes and service modifications"
            action={
              <div className="flex items-center gap-2">
                <select
                  value={srPriorityFilter}
                  onChange={(e) => setSrPriorityFilter(e.target.value)}
                  className="rounded-lg border border-input bg-muted/40 py-1.5 px-3 text-xs outline-none"
                >
                  <option value="All">All Priorities</option>
                  <option value="High">High Priority</option>
                  <option value="Medium">Medium Priority</option>
                  <option value="Low">Low Priority</option>
                </select>
                <select
                  value={srStatusFilter}
                  onChange={(e) => setSrStatusFilter(e.target.value)}
                  className="rounded-lg border border-input bg-muted/40 py-1.5 px-3 text-xs outline-none"
                >
                  <option value="All">All Statuses</option>
                  <option value="Open">Open</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>
            }
          >
            {serviceRequests.length === 0 ? (
              <EmptyState
                title="No service requests found"
                description="No service requests found for the selected criteria."
              />
            ) : (
              <div className="overflow-x-auto custom-scrollbar">
                <table className="w-full text-left text-sm">
                  <thead className="bg-muted/40 text-xs uppercase tracking-wider text-muted-foreground">
                    <tr>
                      <th className="px-4 py-3 font-semibold">Request ID</th>
                      <th className="px-4 py-3 font-semibold">Request Type</th>
                      <th className="px-4 py-3 font-semibold">Created Date</th>
                      <th className="px-4 py-3 font-semibold">Priority</th>
                      <th className="px-4 py-3 font-semibold">Status</th>
                      <th className="px-4 py-3 font-semibold">Assigned To</th>
                      <th className="px-4 py-3 font-semibold text-center">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {serviceRequests.map((sr) => (
                      <tr
                        key={sr.id}
                        className="hover:bg-muted/30 transition-colors"
                      >
                        <td className="px-4 py-3.5 font-mono text-xs font-semibold text-primary">
                          {sr.id}
                        </td>
                        <td className="px-4 py-3.5 font-semibold text-foreground">
                          {sr.type}
                        </td>
                        <td className="px-4 py-3.5 text-xs text-muted-foreground">
                          {sr.createdDate}
                        </td>
                        <td className="px-4 py-3.5">
                          <StatusBadge status={sr.priority} />
                        </td>
                        <td className="px-4 py-3.5">
                          <StatusBadge status={sr.status} />
                        </td>
                        <td className="px-4 py-3.5 text-xs text-muted-foreground">
                          {sr.assignedTo}
                        </td>
                        <td className="px-4 py-3.5 text-center">
                          <button
                            onClick={() =>
                              navigate({
                                to: `/customer-management/customers/$customerId/service-requests/$requestId`,
                                params: {
                                  customerId: customer.id,
                                  requestId: sr.id,
                                },
                              })
                            }
                            className="rounded-lg bg-primary/10 px-3 py-1.5 text-xs font-bold text-primary hover:bg-primary hover:text-primary-foreground transition-all"
                          >
                            Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Panel>
        </div>
      )}

      {/* TAB 7: DIGITAL ACTIVITY */}
      {activeTab === "digital-activity" && (
        <div className="mt-6 space-y-6">
          <Panel
            title="Digital Activity & Login History"
            subtitle="Audit trail of customer app accesses, authentication channels and devices"
            action={
              <select
                value={logChannelFilter}
                onChange={(e) => setLogChannelFilter(e.target.value)}
                className="rounded-lg border border-input bg-muted/40 py-1.5 px-3 text-xs outline-none"
              >
                <option value="All">All Channels</option>
                <option value="Mobile">Mobile</option>
                <option value="Web">Web</option>
                <option value="ATM">ATM</option>
              </select>
            }
          >
            {loginActivities.length === 0 ? (
              <EmptyState
                title="No login activities recorded"
                description="No login activity matches the filter."
              />
            ) : (
              <div className="overflow-x-auto custom-scrollbar">
                <table className="w-full text-left text-sm">
                  <thead className="bg-muted/40 text-xs uppercase tracking-wider text-muted-foreground">
                    <tr>
                      <th className="px-4 py-3 font-semibold">Date & Time</th>
                      <th className="px-4 py-3 font-semibold">Channel</th>
                      <th className="px-4 py-3 font-semibold">Device</th>
                      <th className="px-4 py-3 font-semibold">Location</th>
                      <th className="px-4 py-3 font-semibold">Activity</th>
                      <th className="px-4 py-3 font-semibold">Status</th>
                      <th className="px-4 py-3 font-semibold">IP Address</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {loginActivities.map((log) => (
                      <tr
                        key={log.id}
                        className="hover:bg-muted/30 transition-colors"
                      >
                        <td className="px-4 py-3.5 text-xs font-medium text-foreground">
                          {log.dateTime}
                        </td>
                        <td className="px-4 py-3.5 text-xs font-semibold">
                          {log.channel}
                        </td>
                        <td className="px-4 py-3.5 text-xs text-muted-foreground">
                          {log.device}
                        </td>
                        <td className="px-4 py-3.5 text-xs">{log.location}</td>
                        <td className="px-4 py-3.5 text-xs font-medium">
                          {log.activity}
                        </td>
                        <td className="px-4 py-3.5">
                          <StatusBadge status={log.status} />
                        </td>
                        <td className="px-4 py-3.5 text-xs font-mono text-muted-foreground">
                          {log.ipAddress}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Panel>
        </div>
      )}

      {/* TAB 8: ANALYTICS */}
      {activeTab === "analytics" && (
        <div className="mt-6 space-y-6">
          {/* Analytics Filters */}
          <div className="rounded-xl border border-border bg-card p-4 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
              <Filter className="h-4 w-4" /> Analytics Parameters
            </div>
            <div className="flex flex-wrap items-center gap-3 text-xs">
              <div>
                <span className="text-muted-foreground mr-1">Date Range:</span>
                <select className="rounded-md border border-input bg-muted/40 py-1.5 px-2 font-medium">
                  <option value="2years">Last 2 Years (2025 vs 2026)</option>
                  <option value="1year">Current Year (2026)</option>
                </select>
              </div>
              <div>
                <span className="text-muted-foreground mr-1">Channel:</span>
                <select
                  value={analyticsChannelFilter}
                  onChange={(e) => setAnalyticsChannelFilter(e.target.value)}
                  className="rounded-md border border-input bg-muted/40 py-1.5 px-2 font-medium"
                >
                  <option value="All">All Channels</option>
                  <option value="Mobile">Mobile App</option>
                  <option value="Web">Web Portal</option>
                </select>
              </div>
            </div>
          </div>

          {/* 2-Year Calculated Summary Cards */}
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-border bg-card p-5">
              <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Transaction Volume (2025 vs 2026)
              </div>
              <div className="mt-2 flex items-baseline justify-between">
                <div className="font-display text-2xl font-bold text-foreground">
                  {totalTxCount2026.toLocaleString()}
                </div>
                <div
                  className={`flex items-center text-xs font-bold ${
                    Number(txCountChangePct) >= 0
                      ? "text-success"
                      : "text-critical"
                  }`}
                >
                  {Number(txCountChangePct) >= 0 ? (
                    <TrendingUp className="h-4 w-4 mr-0.5" />
                  ) : (
                    <TrendingDown className="h-4 w-4 mr-0.5" />
                  )}
                  {txCountChangePct}% YoY
                </div>
              </div>
              <div className="mt-1 text-xs text-muted-foreground">
                2025: {totalTxCount2025.toLocaleString()} txns | 2026:{" "}
                {totalTxCount2026.toLocaleString()} txns
              </div>
            </div>

            <div className="rounded-xl border border-border bg-card p-5">
              <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Transaction Value (2025 vs 2026)
              </div>
              <div className="mt-2 flex items-baseline justify-between">
                <div className="font-display text-2xl font-bold text-foreground">
                  ₱{(totalTxValue2026 / 1000000).toFixed(2)}M
                </div>
                <div
                  className={`flex items-center text-xs font-bold ${
                    Number(txValueChangePct) >= 0
                      ? "text-success"
                      : "text-critical"
                  }`}
                >
                  {Number(txValueChangePct) >= 0 ? (
                    <TrendingUp className="h-4 w-4 mr-0.5" />
                  ) : (
                    <TrendingDown className="h-4 w-4 mr-0.5" />
                  )}
                  {txValueChangePct}% YoY
                </div>
              </div>
              <div className="mt-1 text-xs text-muted-foreground">
                2025: ₱{(totalTxValue2025 / 1000000).toFixed(2)}M | 2026: ₱
                {(totalTxValue2026 / 1000000).toFixed(2)}M
              </div>
            </div>

            <div className="rounded-xl border border-border bg-card p-5">
              <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Annual Logins (2025 vs 2026)
              </div>
              <div className="mt-2 flex items-baseline justify-between">
                <div className="font-display text-2xl font-bold text-foreground">
                  {totalLogins2026.toLocaleString()}
                </div>
                <div
                  className={`flex items-center text-xs font-bold ${
                    Number(loginsChangePct) >= 0
                      ? "text-success"
                      : "text-critical"
                  }`}
                >
                  <TrendingUp className="h-4 w-4 mr-0.5" />
                  {loginsChangePct}% YoY
                </div>
              </div>
              <div className="mt-1 text-xs text-muted-foreground">
                2025: {totalLogins2025.toLocaleString()} logins | 2026:{" "}
                {totalLogins2026.toLocaleString()} logins
              </div>
            </div>
          </div>

          {/* Chart 1: Transaction Count Comparison */}
          <Panel
            title="Transaction Count Comparison (2025 vs 2026)"
            subtitle="Monthly transaction count breakdown"
          >
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={analyticsData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="oklch(0.3 0.03 255 / 0.4)"
                />
                <XAxis
                  dataKey="month"
                  stroke="oklch(0.68 0.025 250)"
                  fontSize={11}
                />
                <YAxis stroke="oklch(0.68 0.025 250)" fontSize={11} />
                <Tooltip {...chartTooltipStyle} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar
                  name="2025 Txns"
                  dataKey="txCount2025"
                  fill="oklch(0.7 0.17 230)"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  name="2026 Txns"
                  dataKey="txCount2026"
                  fill="oklch(0.78 0.16 195)"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </Panel>

          {/* Chart 2: Transaction Value Comparison (PHP) */}
          <Panel
            title="Transaction Value Comparison in PHP ₱ (2025 vs 2026)"
            subtitle="Monthly total transaction monetary value"
          >
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={analyticsData}>
                <defs>
                  <linearGradient id="val2025" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="0%"
                      stopColor="oklch(0.78 0.16 80)"
                      stopOpacity={0.4}
                    />
                    <stop
                      offset="100%"
                      stopColor="oklch(0.78 0.16 80)"
                      stopOpacity={0}
                    />
                  </linearGradient>
                  <linearGradient id="val2026" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="0%"
                      stopColor="oklch(0.72 0.18 155)"
                      stopOpacity={0.5}
                    />
                    <stop
                      offset="100%"
                      stopColor="oklch(0.72 0.18 155)"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="oklch(0.3 0.03 255 / 0.4)"
                />
                <XAxis
                  dataKey="month"
                  stroke="oklch(0.68 0.025 250)"
                  fontSize={11}
                />
                <YAxis
                  stroke="oklch(0.68 0.025 250)"
                  fontSize={11}
                  tickFormatter={(v) => `₱${v / 1000}k`}
                />
                <Tooltip
                  {...chartTooltipStyle}
                  formatter={(val: number) => [
                    `₱${val.toLocaleString()}`,
                    "Value",
                  ]}
                />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Area
                  type="monotone"
                  name="2025 Value (₱)"
                  dataKey="txValue2025"
                  stroke="oklch(0.78 0.16 80)"
                  fill="url(#val2025)"
                  strokeWidth={2}
                />
                <Area
                  type="monotone"
                  name="2026 Value (₱)"
                  dataKey="txValue2026"
                  stroke="oklch(0.72 0.18 155)"
                  fill="url(#val2026)"
                  strokeWidth={2.5}
                />
              </AreaChart>
            </ResponsiveContainer>
          </Panel>

          {/* Chart 3: Login Activity Comparison */}
          <Panel
            title="Monthly Login Activity Comparison (2025 vs 2026)"
            subtitle="Login sessions and authentication success trend"
          >
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={analyticsData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="oklch(0.3 0.03 255 / 0.4)"
                />
                <XAxis
                  dataKey="month"
                  stroke="oklch(0.68 0.025 250)"
                  fontSize={11}
                />
                <YAxis stroke="oklch(0.68 0.025 250)" fontSize={11} />
                <Tooltip {...chartTooltipStyle} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Line
                  type="monotone"
                  name="2025 Successful Logins"
                  dataKey="loginsSuccess2025"
                  stroke="oklch(0.7 0.17 230)"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                />
                <Line
                  type="monotone"
                  name="2026 Successful Logins"
                  dataKey="loginsSuccess2026"
                  stroke="oklch(0.72 0.18 155)"
                  strokeWidth={2.5}
                  dot={{ r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Panel>
        </div>
      )}

      {/* Edit Profile Details Modal */}
      {showEditProfileModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg rounded-2xl border border-border bg-card p-6 shadow-elevated">
            <h3 className="font-display text-xl font-bold text-foreground">
              Customer Profile Details
            </h3>
            <p className="mt-1 text-xs text-muted-foreground">
              View and edit customer profile records for {customer.name} (
              {customer.id})
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setShowEditProfileModal(false);
              }}
              className="mt-4 space-y-3 text-xs"
            >
              <div>
                <label className="text-muted-foreground">Full Name</label>
                <input
                  type="text"
                  defaultValue={customer.name}
                  className="mt-1 w-full rounded-lg border border-input bg-muted/40 p-2 text-foreground outline-none"
                />
              </div>
              <div>
                <label className="text-muted-foreground">Mobile Number</label>
                <input
                  type="text"
                  defaultValue={customer.mobile}
                  className="mt-1 w-full rounded-lg border border-input bg-muted/40 p-2 text-foreground outline-none"
                />
              </div>
              <div>
                <label className="text-muted-foreground">Email Address</label>
                <input
                  type="text"
                  defaultValue={customer.email}
                  className="mt-1 w-full rounded-lg border border-input bg-muted/40 p-2 text-foreground outline-none"
                />
              </div>
              <div>
                <label className="text-muted-foreground">
                  Residential Address
                </label>
                <textarea
                  rows={2}
                  defaultValue={customer.residentialAddress}
                  className="mt-1 w-full rounded-lg border border-input bg-muted/40 p-2 text-foreground outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-border">
                <button
                  type="button"
                  onClick={() => setShowEditProfileModal(false)}
                  className="rounded-lg border border-border bg-card px-4 py-2 text-xs font-semibold hover:bg-muted/50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-primary px-4 py-2 text-xs font-bold text-primary-foreground shadow-glow"
                >
                  Save Profile Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
