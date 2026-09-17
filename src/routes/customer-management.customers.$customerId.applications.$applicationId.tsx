import { createFileRoute, useNavigate, notFound } from "@tanstack/react-router";
import {
  ArrowLeft,
  FileText,
  CheckCircle2,
  User,
  Clock,
  FileCheck,
} from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Panel } from "@/components/dashboard/Panel";
import { Breadcrumb } from "@/components/customer/Breadcrumb";
import { StatusBadge } from "@/components/customer/StatusBadge";
import { Timeline } from "@/components/customer/Timeline";
import { EmptyState } from "@/components/customer/EmptyState";
import {
  getCustomerById,
  getApplicationById,
  Customer,
  Application,
} from "@/mock/customerService";

export const Route = createFileRoute(
  "/customer-management/customers/$customerId/applications/$applicationId",
)({
  loader: ({ params }) => {
    const customer = getCustomerById(params.customerId);
    const application = getApplicationById(params.applicationId);
    if (!customer || !application) throw notFound();
    return { customer, application };
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        title: `Application ${loaderData?.application?.id ?? ""} · Details`,
      },
    ],
  }),
  notFoundComponent: () => (
    <DashboardLayout title="Application Not Found">
      <EmptyState
        title="Application Record Not Found"
        description="Application details unavailable."
      />
    </DashboardLayout>
  ),
  component: ApplicationDetailView,
});

function ApplicationDetailView() {
  const navigate = useNavigate();
  const { customer, application } = Route.useLoaderData() as {
    customer: Customer;
    application: Application;
  };

  return (
    <DashboardLayout
      title="Application Details"
      subtitle={`Application Ref: ${application.id}`}
    >
      <Breadcrumb
        items={[
          { label: "Customer Search", to: "/customer-management" },
          {
            label: customer.name,
            to: `/customer-management/customers/${customer.id}`,
          },
          {
            label: "Applications",
            to: `/customer-management/customers/${customer.id}`,
          },
          { label: application.id },
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

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column: Application Summary & Submitted Documents */}
        <div className="space-y-6">
          <Panel title="Application Summary">
            <div className="space-y-3 text-xs">
              <div>
                <span className="text-muted-foreground">Application ID:</span>
                <p className="font-mono font-bold text-primary text-sm">
                  {application.id}
                </p>
              </div>
              <div>
                <span className="text-muted-foreground">Product Applied:</span>
                <p className="font-semibold text-foreground text-sm">
                  {application.product}
                </p>
              </div>
              <div>
                <span className="text-muted-foreground">Status:</span>
                <div className="mt-1">
                  <StatusBadge status={application.status} />
                </div>
              </div>
              <div>
                <span className="text-muted-foreground">Submitted Date:</span>
                <p className="font-medium text-foreground">
                  {application.submittedDate}
                </p>
              </div>
              <div>
                <span className="text-muted-foreground">Last Updated:</span>
                <p className="font-medium text-foreground">
                  {application.lastUpdated}
                </p>
              </div>
              <div>
                <span className="text-muted-foreground">Assigned Officer:</span>
                <p className="font-semibold text-foreground">
                  {application.assignedOfficer}
                </p>
              </div>
              <div>
                <span className="text-muted-foreground">
                  Verification Status:
                </span>
                <p className="font-medium text-success">
                  {application.verificationStatus}
                </p>
              </div>
            </div>
          </Panel>

          <Panel title="Submitted Documents">
            <div className="space-y-2 text-xs">
              {application.submittedDocuments.map((doc, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 rounded-lg border border-border bg-muted/20 p-2.5"
                >
                  <FileCheck className="h-4 w-4 text-success shrink-0" />
                  <span className="font-medium text-foreground truncate">
                    {doc}
                  </span>
                </div>
              ))}
            </div>
          </Panel>
        </div>

        {/* Right Column: Visual Journey / Timeline & Comments */}
        <div className="lg:col-span-2 space-y-6">
          <Panel
            title="Application Journey & Timeline"
            subtitle="Visual progress tracking"
          >
            <Timeline steps={application.journey} />
          </Panel>

          <Panel title="Underwriter & Agent Comments">
            <div className="space-y-3">
              {application.comments.map((comment, idx) => (
                <div
                  key={idx}
                  className="rounded-lg border border-border bg-muted/20 p-3 text-xs"
                >
                  <div className="flex items-center justify-between font-semibold text-foreground mb-1">
                    <span>{comment.user}</span>
                    <span className="text-[10px] text-muted-foreground font-normal">
                      {comment.date}
                    </span>
                  </div>
                  <p className="text-muted-foreground">{comment.text}</p>
                </div>
              ))}
            </div>
          </Panel>

          <Panel title="Activity History">
            <div className="space-y-2 text-xs">
              {application.activityHistory.map((act, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between border-b border-border/50 pb-2"
                >
                  <div>
                    <span className="font-semibold text-foreground">
                      {act.action}
                    </span>
                    <span className="text-[10px] text-muted-foreground ml-2">
                      by {act.actor}
                    </span>
                  </div>
                  <span className="text-[10px] text-muted-foreground">
                    {act.date}
                  </span>
                </div>
              ))}
            </div>
          </Panel>
        </div>
      </div>
    </DashboardLayout>
  );
}
