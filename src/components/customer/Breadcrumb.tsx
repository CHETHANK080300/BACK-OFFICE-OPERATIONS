import { Link } from "@tanstack/react-router";
import { ChevronRight, Home } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  to?: string;
}

export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav className="mb-4 flex items-center gap-2 text-xs text-muted-foreground overflow-x-auto py-1 custom-scrollbar">
      <Link
        to="/customer-management"
        className="flex items-center gap-1 hover:text-foreground transition-colors shrink-0"
      >
        <Home className="h-3.5 w-3.5 text-primary" />
        <span>Customer Management</span>
      </Link>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <div key={index} className="flex items-center gap-2 shrink-0">
            <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/60" />
            {item.to && !isLast ? (
              <Link
                to={item.to}
                className="hover:text-foreground transition-colors font-medium"
              >
                {item.label}
              </Link>
            ) : (
              <span
                className={
                  isLast ? "font-semibold text-foreground" : "font-medium"
                }
              >
                {item.label}
              </span>
            )}
          </div>
        );
      })}
    </nav>
  );
}
