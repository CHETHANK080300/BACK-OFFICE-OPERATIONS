import { Customer } from "@/mock/customers";
import { DataMasker } from "./DataMasker";
import { StatusBadge } from "./StatusBadge";
import { User, Phone, Mail, Calendar, ShieldCheck, Layers } from "lucide-react";

export function CustomerSummaryCard({
  customer,
  onViewProfileClick,
}: {
  customer: Customer;
  onViewProfileClick?: () => void;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-elevated transition-all">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-border/60 pb-6">
        <div className="flex items-start gap-4">
          <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-primary font-display text-xl font-bold text-primary-foreground shadow-glow">
            {customer.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .slice(0, 2)}
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="font-display text-2xl font-bold text-foreground">
                {customer.name}
              </h2>
              <StatusBadge status={customer.status} />
              <StatusBadge status={customer.kycStatus} />
              <span className="rounded-md bg-accent/10 px-2 py-0.5 text-xs font-semibold text-accent">
                {customer.segment} Customer
              </span>
            </div>
            <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
              <span className="font-mono text-foreground font-medium">
                CIF: {customer.id}
              </span>
              <span>·</span>
              <span className="inline-flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" /> Customer since{" "}
                {customer.customerSince}
              </span>
              <span>·</span>
              <span className="inline-flex items-center gap-1">
                <ShieldCheck className="h-3.5 w-3.5" /> Risk:{" "}
                {customer.riskCategory}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <span className="inline-flex items-center gap-1.5 rounded-lg bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary">
            <Layers className="h-4 w-4" /> {customer.productsCount} Enrolled
            Products
          </span>
          {onViewProfileClick && (
            <button
              onClick={onViewProfileClick}
              className="rounded-lg bg-primary px-4 py-2 text-xs font-bold text-primary-foreground shadow-glow transition-all hover:opacity-90"
            >
              View Full Profile
            </button>
          )}
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
        <div className="flex items-center gap-2.5 rounded-lg bg-muted/30 p-2.5">
          <Phone className="h-4 w-4 text-muted-foreground shrink-0" />
          <div className="min-w-0">
            <div className="text-[10px] text-muted-foreground">
              Mobile Number
            </div>
            <DataMasker
              value={customer.mobile}
              type="mobile"
              className="text-xs text-foreground font-medium"
            />
          </div>
        </div>

        <div className="flex items-center gap-2.5 rounded-lg bg-muted/30 p-2.5">
          <Mail className="h-4 w-4 text-muted-foreground shrink-0" />
          <div className="min-w-0">
            <div className="text-[10px] text-muted-foreground">
              Email Address
            </div>
            <DataMasker
              value={customer.email}
              type="email"
              className="text-xs text-foreground font-medium"
            />
          </div>
        </div>

        <div className="flex items-center gap-2.5 rounded-lg bg-muted/30 p-2.5">
          <User className="h-4 w-4 text-muted-foreground shrink-0" />
          <div className="min-w-0">
            <div className="text-[10px] text-muted-foreground">
              Relationship Manager
            </div>
            <div className="font-medium text-foreground truncate">
              {customer.rmName}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2.5 rounded-lg bg-muted/30 p-2.5">
          <Calendar className="h-4 w-4 text-muted-foreground shrink-0" />
          <div className="min-w-0">
            <div className="text-[10px] text-muted-foreground">
              Last Login Activity
            </div>
            <div className="font-medium text-foreground truncate">
              {customer.lastLogin}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
