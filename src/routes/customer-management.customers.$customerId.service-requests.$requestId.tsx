import { createFileRoute, useNavigate, notFound } from "@tanstack/react-router";
import {
  ArrowLeft,
  LifeBuoy,
  Clock,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Panel } from "@/components/dashboard/Panel";
import { Breadcrumb } from "@/components/customer/Breadcrumb";
import { StatusBadge } from "@/components/customer/StatusBadge";
import { Timeline } from "@/components/customer/Timeline";
import { EmptyState } from "@/components/customer/EmptyState";
import {
  getCustomerById,
  getServiceRequestById,
  Customer,
  ServiceRequest,
} from "@/mock/customerService";

export const Route = createFileRoute(
  "/customer-management/customers/$customerId/service-requests/$requestId",
)({
  loader: ({ params }) => {
    const customer = getCustomerById(params.customerId);
    const serviceRequest = getServiceRequestById(params.requestId);
    if (!customer || !serviceRequest) throw notFound();
    return { customer, serviceRequest };
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        title: `Service Request ${loaderData?.serviceRequest?.id ?? ""} · Details`,
      },
    ],
  }),
  notFoundComponent: () => (
    <DashboardLayout title="Service Request Not Found">
      <EmptyState
        title="Service Request Not Found"
        description="Request details unavailable."
      />
    </DashboardLayout>
  ),
  component: ServiceRequestDetailView,
});

function ServiceRequestDetailView() {
  const navigate = useNavigate();
  const { customer, serviceRequest } = Route.useLoaderData() as {
    customer: Customer;
    serviceRequest: ServiceRequest;
  };

  return (
    <DashboardLayout
      title="Service Request Details"
      subtitle={`Ticket ID: ${serviceRequest.id}`}
    >
      <Breadcrumb
        items={[
          { label: "Customer Search", to: "/customer-management" },
          {
            label: customer.name,
            to: `/customer-management/customers/${customer.id}`,
          },
          {
            label: "Service Requests",
            to: `/customer-management/customers/${customer.id}`,
          },
          { label: serviceRequest.id },
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
        {/* Left Column: Summary */}
        <div className="space-y-6">
          <Panel title="Request Summary">
            <div className="space-y-3 text-xs">
              <div>
                <span className="text-muted-foreground">Request ID:</span>
                <p className="font-mono font-bold text-primary text-sm">
                  {serviceRequest.id}
                </p>
              </div>
              <div>
                <span className="text-muted-foreground">Customer:</span>
                <p className="font-semibold text-foreground text-sm">
                  {customer.name} ({customer.id})
                </p>
              </div>
              <div>
                <span className="text-muted-foreground">Request Type:</span>
                <p className="font-semibold text-foreground text-sm">
                  {serviceRequest.type}
                </p>
              </div>
              <div>
                <span className="text-muted-foreground">Priority:</span>
                <div className="mt-1">
                  <StatusBadge status={serviceRequest.priority} />
                </div>
              </div>
              <div>
                <span className="text-muted-foreground">Status:</span>
                <div className="mt-1">
                  <StatusBadge status={serviceRequest.status} />
                </div>
              </div>
              <div>
                <span className="text-muted-foreground">SLA Target:</span>
                <p className="font-medium text-warning">{serviceRequest.sla}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Assigned Agent:</span>
                <p className="font-semibold text-foreground">
                  {serviceRequest.assignedTo}
                </p>
              </div>
              <div>
                <span className="text-muted-foreground">
                  Resolution Date Target:
                </span>
                <p className="font-medium text-foreground">
                  {serviceRequest.resolutionDate}
                </p>
              </div>
              <div className="pt-2 border-t border-border/50">
                <span className="text-muted-foreground">Description:</span>
                <p className="font-medium text-foreground mt-1 leading-relaxed">
                  {serviceRequest.description}
                </p>
              </div>
            </div>
          </Panel>
        </div>

        {/* Right Column: Timeline & Comments */}
        <div className="lg:col-span-2 space-y-6">
          <Panel title="SLA & Service Request Timeline">
            <Timeline steps={serviceRequest.timeline} />
          </Panel>

          <Panel title="Agent Comments & Log">
            <div className="space-y-3">
              {serviceRequest.comments.map((comment, idx) => (
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
              {serviceRequest.activityHistory.map((act, idx) => (
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
