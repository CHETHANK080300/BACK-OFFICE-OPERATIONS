import { createFileRoute, useNavigate, notFound } from "@tanstack/react-router";
import {
  ArrowLeft,
  History,
  CheckCircle2,
  Building2,
  MapPin,
  DollarSign,
  Layers,
} from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Panel } from "@/components/dashboard/Panel";
import { Breadcrumb } from "@/components/customer/Breadcrumb";
import { DataMasker } from "@/components/customer/DataMasker";
import { StatusBadge } from "@/components/customer/StatusBadge";
import { EmptyState } from "@/components/customer/EmptyState";
import {
  getCustomerById,
  getTransactionById,
  Customer,
  Transaction,
} from "@/mock/customerService";

export const Route = createFileRoute(
  "/customer-management/customers/$customerId/transactions/$transactionId",
)({
  loader: ({ params }) => {
    const customer = getCustomerById(params.customerId);
    const transaction = getTransactionById(params.transactionId);
    if (!customer || !transaction) throw notFound();
    return { customer, transaction };
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        title: `Transaction ${loaderData?.transaction?.id ?? ""} · Details`,
      },
    ],
  }),
  notFoundComponent: () => (
    <DashboardLayout title="Transaction Not Found">
      <EmptyState
        title="Transaction Record Not Found"
        description="Transaction details unavailable."
      />
    </DashboardLayout>
  ),
  component: TransactionDetailView,
});

function TransactionDetailView() {
  const navigate = useNavigate();
  const { customer, transaction } = Route.useLoaderData() as {
    customer: Customer;
    transaction: Transaction;
  };

  return (
    <DashboardLayout
      title="Transaction Details"
      subtitle={`Reference: ${transaction.id}`}
    >
      <Breadcrumb
        items={[
          { label: "Customer Search", to: "/customer-management" },
          {
            label: customer.name,
            to: `/customer-management/customers/${customer.id}`,
          },
          {
            label: "Transactions",
            to: `/customer-management/customers/${customer.id}`,
          },
          { label: transaction.id },
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

      <div className="max-w-3xl mx-auto space-y-6">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-elevated">
          <div className="flex items-center justify-between border-b border-border pb-4 mb-6">
            <div>
              <span className="text-xs text-muted-foreground uppercase tracking-widest font-semibold">
                Transaction Reference
              </span>
              <h2 className="font-mono text-xl font-bold text-primary mt-0.5">
                {transaction.id}
              </h2>
            </div>
            <StatusBadge status={transaction.status} />
          </div>

          <div className="text-center py-4 bg-muted/20 rounded-xl mb-6">
            <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
              Total Amount
            </div>
            <div className="font-display text-4xl font-bold text-foreground mt-1">
              ₱{transaction.amount.toLocaleString()}
            </div>
            <div className="text-xs font-semibold mt-1">
              {transaction.debit > 0 ? (
                <span className="text-critical">DEBIT OUTFLOW</span>
              ) : (
                <span className="text-success">CREDIT INFLOW</span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <span className="text-muted-foreground">Transaction Type:</span>
              <p className="font-semibold text-foreground text-sm">
                {transaction.type}
              </p>
            </div>
            <div>
              <span className="text-muted-foreground">Date & Time:</span>
              <p className="font-semibold text-foreground text-sm">
                {transaction.dateTime}
              </p>
            </div>
            <div>
              <span className="text-muted-foreground">Source Account:</span>
              <p className="font-mono font-medium text-foreground">
                {transaction.sourceAccount}
              </p>
            </div>
            <div>
              <span className="text-muted-foreground">
                Destination Account:
              </span>
              <p className="font-mono font-medium text-foreground">
                {transaction.destinationAccount}
              </p>
            </div>
            <div>
              <span className="text-muted-foreground">Beneficiary Name:</span>
              <p className="font-semibold text-foreground">
                {transaction.beneficiaryName}
              </p>
            </div>
            <div>
              <span className="text-muted-foreground">Channel:</span>
              <p className="font-semibold text-foreground">
                {transaction.channel}
              </p>
            </div>
            <div>
              <span className="text-muted-foreground">Location:</span>
              <p className="font-semibold text-foreground">
                {transaction.location}
              </p>
            </div>
            <div>
              <span className="text-muted-foreground">Processing Ref:</span>
              <p className="font-mono text-muted-foreground">
                {transaction.processingReference}
              </p>
            </div>
            <div className="col-span-2 pt-2 border-t border-border/50">
              <span className="text-muted-foreground">
                Remarks / Description:
              </span>
              <p className="font-medium text-foreground mt-0.5">
                {transaction.remarks}
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
