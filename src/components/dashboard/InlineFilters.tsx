import React from "react";
import {
  useFilters,
  type DateRange,
  type Application,
  type Country,
} from "@/hooks/useFilters";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Check, Filter } from "lucide-react";

export function InlineFilters() {
  const { filters, setFilters } = useFilters();

  const dateLabels: Record<DateRange, string> = {
    today: "Today",
    yesterday: "Yesterday",
    "7d": "Last 7 Days",
    "30d": "Last 30 Days",
    quarter: "Last Quarter",
    custom: "Custom Range",
  };

  const appLabels: Record<Application, string> = {
    retail_banking: "Retail Banking",
    retail_onboarding: "Retail Onboarding",
    corporate_banking: "Corporate Banking",
    corporate_onboarding: "Corporate Onboarding",
    all: "All Applications",
  };

  const countryLabels: Record<Country, string> = {
    india: "India",
    malaysia: "Malaysia",
    singapore: "Singapore",
    global: "Global",
  };

  return (
    <div className="flex flex-wrap items-center gap-2 mb-6 p-2 bg-muted/20 rounded-xl border border-border/50">
      <div className="flex items-center gap-2 px-2 text-muted-foreground mr-2 border-r border-border/50 pr-4">
        <Filter className="h-4 w-4" />
        <span className="text-xs font-bold uppercase tracking-wider">
          Filters
        </span>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground hover:border-primary/50 transition-all shadow-sm">
          <span className="text-muted-foreground mr-1">Period:</span>
          {dateLabels[filters.dateRange]}
          <ChevronDown className="h-3 w-3 text-muted-foreground" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-48">
          <DropdownMenuLabel>Date Range</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {(Object.keys(dateLabels) as DateRange[]).map((key) => (
            <DropdownMenuItem
              key={key}
              onClick={() => setFilters((f) => ({ ...f, dateRange: key }))}
              className="flex items-center justify-between cursor-pointer"
            >
              {dateLabels[key]}
              {filters.dateRange === key && (
                <Check className="h-3.5 w-3.5 text-primary" />
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground hover:border-primary/50 transition-all shadow-sm">
          <span className="text-muted-foreground mr-1">App:</span>
          {appLabels[filters.application]}
          <ChevronDown className="h-3 w-3 text-muted-foreground" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-48">
          <DropdownMenuLabel>Application</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {(Object.keys(appLabels) as Application[]).map((key) => (
            <DropdownMenuItem
              key={key}
              onClick={() => setFilters((f) => ({ ...f, application: key }))}
              className="flex items-center justify-between cursor-pointer"
            >
              {appLabels[key]}
              {filters.application === key && (
                <Check className="h-3.5 w-3.5 text-primary" />
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground hover:border-primary/50 transition-all shadow-sm">
          <span className="text-muted-foreground mr-1">Region:</span>
          {countryLabels[filters.country]}
          <ChevronDown className="h-3 w-3 text-muted-foreground" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-48">
          <DropdownMenuLabel>Country</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {(Object.keys(countryLabels) as Country[]).map((key) => (
            <DropdownMenuItem
              key={key}
              onClick={() => setFilters((f) => ({ ...f, country: key }))}
              className="flex items-center justify-between cursor-pointer"
            >
              {countryLabels[key]}
              {filters.country === key && (
                <Check className="h-3.5 w-3.5 text-primary" />
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
