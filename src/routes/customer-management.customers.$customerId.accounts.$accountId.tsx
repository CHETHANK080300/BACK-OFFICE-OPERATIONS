import { createFileRoute, useNavigate, notFound } from "@tanstack/react-router";
import {
  ArrowLeft,
  CreditCard,
  Building2,
  User,
  Calendar,
  ShieldCheck,
} from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Panel } from "@/components/dashboard/Panel";
import { Breadcrumb } from "@/components/customer/Breadcrumb";
import { DataMasker } from "@/components/customer/DataMasker";
import { StatusBadge } from "@/components/customer/StatusBadge";
import { EmptyState } from "@/components/customer/EmptyState";
import {
  getCustomerById,
  getAccountById,
  getCustomerTransactions,
  Customer,
  Account,
} from "@/mock/customerService";

export const Route = createFileRoute(
  "/customer-management/customers/$customerId/accounts/$accountId",
)({
  loader: ({ params }) => {
    const customer = getCustomerById(params.customerId);
    const account = getAccountById(params.accountId);
    if (!customer || !account) throw notFound();
    return { customer, account };
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        title: `${loaderData?.account?.productName ?? "Account"} · Account Details`,
      },
    ],
  }),
  notFoundComponent: () => (
    <DashboardLayout title="Account Not Found">
      <EmptyState
        title="Account Record Not Found"
        description="Account details unavailable."
      />
    </DashboardLayout>
  ),
  component: AccountDetailView,
});

function AccountDetailView() {
  const navigate = useNavigate();
  const { customer, account } = Route.useLoaderData() as {
    customer: Customer;
    account: Account;
  };

  const accountTransactions = getCustomerTransactions(customer.id, {
    accountId: account.id,
  });

  return (
    <DashboardLayout
      title="Account Details"
      subtitle={`${account.productName} (${account.id})`}
    >
      <Breadcrumb
        items={[
          { label: "Customer Search", to: "/customer-management" },
          {
            label: customer.name,
            to: `/customer-management/customers/${customer.id}`,
          },
          {
            label: "Accounts",
            to: `/customer-management/customers/${customer.id}`,
          },
          { label: account.productName },
        ]}
      />

      <div className="mb-6">
        <button
          onClick={() =>
            navigate({
              to: `/customer-management/customers/$customerId`,
              params: { customerId: customer.id },
            })
          }
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Customer 360
        </button>
      </div>

      {/* Account Info Header Card */}
      <div className="rounded-2xl border border-border bg-card p-6 shadow-elevated mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-border/60 pb-6">
          <div className="flex items-start gap-4">
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-primary shadow-glow text-primary-foreground">
              <CreditCard className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-display text-2xl font-bold text-foreground">
                  {account.productName}
                </h2>
                <StatusBadge status={account.status} />
              </div>
              <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground font-mono">
                <span>Account No:</span>
                <DataMasker
                  value={account.id}
                  type="account"
                  className="text-foreground font-semibold"
                />
              </div>
            </div>
          </div>

          <div className="text-right">
            <div className="text-xs text-muted-foreground">
              Available Balance
            </div>
            <div className="font-display text-3xl font-bold text-foreground">
              ₱{account.availableBalance.toLocaleString()}
            </div>
            <div className="text-xs text-muted-foreground mt-0.5">
              Current Ledger Balance: ₱{account.balance.toLocaleString()}
            </div>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
          <div>
            <span className="text-muted-foreground">Account Type:</span>
            <p className="font-semibold text-foreground">{account.type}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Currency:</span>
            <p className="font-semibold text-foreground">{account.currency}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Opened Date:</span>
            <p className="font-semibold text-foreground">
              {account.openedDate}
            </p>
          </div>
          <div>
            <span className="text-muted-foreground">Home Branch:</span>
            <p className="font-semibold text-foreground">{account.branch}</p>
          </div>
          {account.interestRate && (
            <div>
              <span className="text-muted-foreground">Interest Rate:</span>
              <p className="font-semibold text-success">
                {account.interestRate}
              </p>
            </div>
          )}
          {account.creditLimit !== undefined && (
            <div>
              <span className="text-muted-foreground">Credit Limit:</span>
              <p className="font-semibold text-foreground">
                ₱{account.creditLimit.toLocaleString()}
              </p>
            </div>
          )}
          <div>
            <span className="text-muted-foreground">Relationship Manager:</span>
            <p className="font-semibold text-foreground">{account.rmName}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Account Owner:</span>
            <p className="font-semibold text-primary">{customer.name}</p>
          </div>
        </div>
      </div>

      {/* Account Recent Transactions */}
      <Panel
        title={`Recent Transactions for Account ${account.id.slice(-4)}`}
        subtitle="Ledger postings associated with this account"
      >
        {accountTransactions.length === 0 ? (
          <EmptyState
            title="No transactions for this account"
            description="There are no recorded transactions for this specific account."
          />
        ) : (
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left text-sm">
              <thead className="bg-muted/40 text-xs uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 font-semibold">Date</th>
                  <th className="px-4 py-3 font-semibold">Reference</th>
                  <th className="px-4 py-3 font-semibold">Type</th>
                  <th className="px-4 py-3 font-semibold">Channel</th>
                  <th className="px-4 py-3 font-semibold text-right">Debit</th>
                  <th className="px-4 py-3 font-semibold text-right">Credit</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {accountTransactions.map((tx) => (
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
                    <td className="px-4 py-3.5 text-xs font-semibold">
                      {tx.type}
                    </td>
                    <td className="px-4 py-3.5 text-xs">{tx.channel}</td>
                    <td className="px-4 py-3.5 text-right font-mono font-bold text-critical">
                      {tx.debit > 0 ? `₱${tx.debit.toLocaleString()}` : "-"}
                    </td>
                    <td className="px-4 py-3.5 text-right font-mono font-bold text-success">
                      {tx.credit > 0 ? `₱${tx.credit.toLocaleString()}` : "-"}
                    </td>
                    <td className="px-4 py-3.5">
                      <StatusBadge status={tx.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Panel>
    </DashboardLayout>
  );
}
