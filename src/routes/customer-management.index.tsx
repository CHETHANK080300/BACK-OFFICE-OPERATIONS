import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import {
  Search,
  RotateCcw,
  Users,
  Filter,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  Eye,
  Building2,
  ShieldAlert,
} from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Panel } from "@/components/dashboard/Panel";
import { StatusBadge } from "@/components/customer/StatusBadge";
import { DataMasker } from "@/components/customer/DataMasker";
import { EmptyState, SkeletonTable } from "@/components/customer/EmptyState";
import { getCustomers, Customer } from "@/mock/customerService";

export const Route = createFileRoute("/customer-management/")({
  head: () => ({
    meta: [
      { title: "Customer Management · Customer 360" },
      {
        name: "description",
        content:
          "Search and manage customer 360 profiles, relationships, and banking activities.",
      },
    ],
  }),
  component: CustomerManagementLandingPage,
});

function CustomerManagementLandingPage() {
  const navigate = useNavigate();

  // Search state
  const [searchQuery, setSearchQuery] = useState("");
  const [segmentFilter, setSegmentFilter] = useState("All");
  const [kycFilter, setKycFilter] = useState("All");
  const [riskFilter, setRiskFilter] = useState("All");

  // Applied search params state
  const [appliedParams, setAppliedParams] = useState({
    query: "",
    segment: "All",
    kycStatus: "All",
    riskCategory: "All",
  });

  // Pagination & Sorting state
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;
  const [sortField, setSortField] = useState<keyof Customer>("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [isLoading, setIsLoading] = useState(false);

  // Fetch results based on applied parameters
  const rawResults = useMemo(() => {
    return getCustomers({
      query: appliedParams.query,
      segment: appliedParams.segment,
      kycStatus: appliedParams.kycStatus,
      riskCategory: appliedParams.riskCategory,
      page: 1,
      pageSize: 100, // get all for client-side sorting/pagination if needed
    });
  }, [appliedParams]);

  // Sorted and Paginated results
  const sortedData = useMemo(() => {
    const list = [...rawResults.data];
    return list.sort((a, b) => {
      let valA = a[sortField];
      let valB = b[sortField];

      if (typeof valA === "string") valA = (valA as string).toLowerCase();
      if (typeof valB === "string") valB = (valB as string).toLowerCase();

      if (valA! < valB!) return sortOrder === "asc" ? -1 : 1;
      if (valA! > valB!) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
  }, [rawResults.data, sortField, sortOrder]);

  const totalPages = Math.ceil(sortedData.length / pageSize) || 1;
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sortedData.slice(start, start + pageSize);
  }, [sortedData, currentPage, pageSize]);

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setAppliedParams({
        query: searchQuery,
        segment: segmentFilter,
        kycStatus: kycFilter,
        riskCategory: riskFilter,
      });
      setCurrentPage(1);
      setIsLoading(false);
    }, 300);
  };

  const handleReset = () => {
    setSearchQuery("");
    setSegmentFilter("All");
    setKycFilter("All");
    setRiskFilter("All");
    setIsLoading(true);
    setTimeout(() => {
      setAppliedParams({
        query: "",
        segment: "All",
        kycStatus: "All",
        riskCategory: "All",
      });
      setCurrentPage(1);
      setIsLoading(false);
    }, 200);
  };

  const toggleSort = (field: keyof Customer) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  return (
    <DashboardLayout
      title="Customer Management"
      subtitle="Customer 360 – Search and manage customer relationships"
    >
      {/* Search Header Section */}
      <div className="rounded-2xl border border-border bg-card p-6 shadow-elevated mb-6">
        <div className="flex items-center gap-3 mb-4 border-b border-border/60 pb-4">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-primary shadow-glow">
            <Users className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h2 className="font-display text-lg font-bold text-foreground">
              Customer Search & Filter
            </h2>
            <p className="text-xs text-muted-foreground">
              Search by Customer ID (CIF), Customer Name, Mobile Number, Email,
              or Account Number
            </p>
          </div>
        </div>

        <form onSubmit={handleSearch} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {/* Primary Search Input */}
            <div className="lg:col-span-2 relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search CIF, Name, Mobile, Email, Account No..."
                className="w-full rounded-lg border border-input bg-muted/40 py-2.5 pl-10 pr-3 text-sm text-foreground outline-none focus:border-primary transition-all"
              />
            </div>

            {/* Segment Filter */}
            <div>
              <select
                value={segmentFilter}
                onChange={(e) => setSegmentFilter(e.target.value)}
                className="w-full rounded-lg border border-input bg-muted/40 py-2.5 px-3 text-sm text-foreground outline-none focus:border-primary transition-all"
              >
                <option value="All">All Segments</option>
                <option value="Retail">Retail</option>
                <option value="Premium">Premium</option>
                <option value="SME">SME</option>
                <option value="Corporate">Corporate</option>
              </select>
            </div>

            {/* KYC Status Filter */}
            <div>
              <select
                value={kycFilter}
                onChange={(e) => setKycFilter(e.target.value)}
                className="w-full rounded-lg border border-input bg-muted/40 py-2.5 px-3 text-sm text-foreground outline-none focus:border-primary transition-all"
              >
                <option value="All">All KYC Statuses</option>
                <option value="Verified">Verified</option>
                <option value="Pending">Pending</option>
                <option value="Expired">Expired</option>
                <option value="Under Review">Under Review</option>
              </select>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Filter className="h-3.5 w-3.5" />
              <span>Risk Category:</span>
              <select
                value={riskFilter}
                onChange={(e) => setRiskFilter(e.target.value)}
                className="rounded-md border border-input bg-muted/20 py-1 px-2 text-xs text-foreground outline-none focus:border-primary"
              >
                <option value="All">All Risks</option>
                <option value="Low">Low Risk</option>
                <option value="Medium">Medium Risk</option>
                <option value="High">High Risk</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-4 py-2 text-xs font-semibold text-foreground hover:bg-muted/50 transition-colors"
              >
                <RotateCcw className="h-3.5 w-3.5 text-muted-foreground" />{" "}
                Reset
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-5 py-2 text-xs font-bold text-primary-foreground shadow-glow transition-all hover:opacity-90"
              >
                <Search className="h-3.5 w-3.5" /> Search Customers
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Results Table Section */}
      <Panel
        title="Customer Search Results"
        subtitle={`Showing ${sortedData.length} customer records found`}
        action={
          <span className="text-xs text-muted-foreground">
            Page {currentPage} of {totalPages}
          </span>
        }
      >
        {isLoading ? (
          <SkeletonTable rows={5} />
        ) : sortedData.length === 0 ? (
          <EmptyState
            icon="search"
            title="No customers found"
            description="Try changing your search criteria or resetting filters to find matching customer records."
            action={
              <button
                onClick={handleReset}
                className="rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-glow"
              >
                Reset Search Filters
              </button>
            }
          />
        ) : (
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left text-sm">
              <thead className="bg-muted/40 text-xs uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th
                    className="px-4 py-3 font-semibold cursor-pointer hover:text-foreground"
                    onClick={() => toggleSort("id")}
                  >
                    <div className="flex items-center gap-1">
                      Customer ID <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </th>
                  <th
                    className="px-4 py-3 font-semibold cursor-pointer hover:text-foreground"
                    onClick={() => toggleSort("name")}
                  >
                    <div className="flex items-center gap-1">
                      Customer Name <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </th>
                  <th
                    className="px-4 py-3 font-semibold cursor-pointer hover:text-foreground"
                    onClick={() => toggleSort("segment")}
                  >
                    <div className="flex items-center gap-1">
                      Segment <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </th>
                  <th className="px-4 py-3 font-semibold">Mobile Number</th>
                  <th
                    className="px-4 py-3 font-semibold text-right cursor-pointer hover:text-foreground"
                    onClick={() => toggleSort("productsCount")}
                  >
                    <div className="flex items-center justify-end gap-1">
                      Products <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </th>
                  <th className="px-4 py-3 font-semibold">KYC Status</th>
                  <th className="px-4 py-3 font-semibold">Last Login</th>
                  <th className="px-4 py-3 font-semibold text-center">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {paginatedData.map((customer) => (
                  <tr
                    key={customer.id}
                    className="hover:bg-muted/30 transition-colors group"
                  >
                    <td className="px-4 py-3.5 font-mono text-xs font-semibold text-primary">
                      {customer.id}
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="font-semibold text-foreground">
                        {customer.name}
                      </div>
                      <div className="text-[10px] text-muted-foreground">
                        Since {customer.customerSince} · RM: {customer.rmName}
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="rounded-md bg-accent/10 px-2 py-0.5 text-xs font-semibold text-accent">
                        {customer.segment}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-xs">
                      <DataMasker value={customer.mobile} type="mobile" />
                    </td>
                    <td className="px-4 py-3.5 text-right font-display font-bold text-foreground">
                      {customer.productsCount}
                    </td>
                    <td className="px-4 py-3.5">
                      <StatusBadge status={customer.kycStatus} />
                    </td>
                    <td className="px-4 py-3.5 text-xs text-muted-foreground whitespace-nowrap">
                      {customer.lastLogin}
                    </td>
                    <td className="px-4 py-3.5 text-center whitespace-nowrap">
                      <button
                        onClick={() =>
                          navigate({
                            to: `/customer-management/customers/$customerId`,
                            params: { customerId: customer.id },
                          })
                        }
                        className="inline-flex items-center gap-1 rounded-lg bg-primary/10 px-3 py-1.5 text-xs font-bold text-primary hover:bg-primary hover:text-primary-foreground shadow-sm transition-all"
                      >
                        <Eye className="h-3.5 w-3.5" /> View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between border-t border-border pt-4 mt-4 text-xs text-muted-foreground">
                <div>
                  Showing {(currentPage - 1) * pageSize + 1} to{" "}
                  {Math.min(currentPage * pageSize, sortedData.length)} of{" "}
                  {sortedData.length} records
                </div>
                <div className="flex items-center gap-2">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                    className="inline-flex items-center gap-1 rounded-md border border-border bg-card px-3 py-1.5 font-medium disabled:opacity-40 hover:bg-muted/50"
                  >
                    <ChevronLeft className="h-3.5 w-3.5" /> Previous
                  </button>
                  <span className="font-semibold text-foreground">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(currentPage + 1)}
                    className="inline-flex items-center gap-1 rounded-md border border-border bg-card px-3 py-1.5 font-medium disabled:opacity-40 hover:bg-muted/50"
                  >
                    Next <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </Panel>
    </DashboardLayout>
  );
}
