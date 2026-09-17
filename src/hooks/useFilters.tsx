import React, { createContext, useContext, useState, ReactNode } from "react";

export type DateRange =
  | "today"
  | "yesterday"
  | "7d"
  | "30d"
  | "quarter"
  | "custom";
export type Application =
  | "retail_banking"
  | "retail_onboarding"
  | "corporate_banking"
  | "corporate_onboarding"
  | "all";
export type Country = "india" | "malaysia" | "singapore" | "global";
export type Channel =
  | "mobile"
  | "web"
  | "email"
  | "social"
  | "playstore"
  | "appstore"
  | "all";
export type Severity = "critical" | "high" | "medium" | "low" | "all";

interface FilterState {
  dateRange: DateRange;
  application: Application;
  country: Country;
  channel: Channel;
  version: string;
  severity: Severity;
}

interface FilterContextType {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const FilterProvider = ({ children }: { children: ReactNode }) => {
  const [filters, setFilters] = useState<FilterState>({
    dateRange: "7d",
    application: "all",
    country: "global",
    channel: "all",
    version: "all",
    severity: "all",
  });

  return (
    <FilterContext.Provider value={{ filters, setFilters }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilters = () => {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error("useFilters must be used within a FilterProvider");
  }
  return context;
};
