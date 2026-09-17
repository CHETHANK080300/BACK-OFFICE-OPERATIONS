import { mockCustomers, Customer } from "./customers";
import { mockAccounts, Account } from "./accounts";
import { mockTransactions, Transaction } from "./transactions";
import { mockApplications, Application } from "./applications";
import { mockServiceRequests, ServiceRequest } from "./serviceRequests";
import { mockLoginActivities, LoginActivity } from "./loginActivities";
import { mockMonthlyAnalytics, MonthlyAnalyticsData } from "./analytics";

export interface CustomerSearchParams {
  query?: string;
  segment?: string;
  kycStatus?: string;
  riskCategory?: string;
  page?: number;
  pageSize?: number;
}

export function getCustomers(params: CustomerSearchParams = {}) {
  const {
    query,
    segment,
    kycStatus,
    riskCategory,
    page = 1,
    pageSize = 10,
  } = params;
  let results = [...mockCustomers];

  if (query && query.trim() !== "") {
    const q = query.trim().toLowerCase();
    results = results.filter((c) => {
      const matchId = c.id.toLowerCase().includes(q);
      const matchName = c.name.toLowerCase().includes(q);
      const matchMobile = c.mobile.toLowerCase().includes(q);
      const matchEmail = c.email.toLowerCase().includes(q);
      // Check if query matches any account number
      const hasAccountMatch = mockAccounts.some(
        (a) => a.customerId === c.id && a.id.toLowerCase().includes(q),
      );
      return (
        matchId || matchName || matchMobile || matchEmail || hasAccountMatch
      );
    });
  }

  if (segment && segment !== "All") {
    results = results.filter(
      (c) => c.segment.toLowerCase() === segment.toLowerCase(),
    );
  }

  if (kycStatus && kycStatus !== "All") {
    results = results.filter(
      (c) => c.kycStatus.toLowerCase() === kycStatus.toLowerCase(),
    );
  }

  if (riskCategory && riskCategory !== "All") {
    results = results.filter(
      (c) => c.riskCategory.toLowerCase() === riskCategory.toLowerCase(),
    );
  }

  const total = results.length;
  const start = (page - 1) * pageSize;
  const paginated = results.slice(start, start + pageSize);

  return {
    data: paginated,
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize) || 1,
  };
}

export function getCustomerById(id: string): Customer | undefined {
  return mockCustomers.find((c) => c.id.toLowerCase() === id.toLowerCase());
}

export function getCustomerAccounts(
  customerId: string,
  filters: { productType?: string; status?: string } = {},
): Account[] {
  let accounts = mockAccounts.filter(
    (a) => a.customerId.toLowerCase() === customerId.toLowerCase(),
  );

  if (filters.productType && filters.productType !== "All") {
    accounts = accounts.filter(
      (a) => a.type.toLowerCase() === filters.productType!.toLowerCase(),
    );
  }

  if (filters.status && filters.status !== "All") {
    accounts = accounts.filter(
      (a) => a.status.toLowerCase() === filters.status!.toLowerCase(),
    );
  }

  return accounts;
}

export function getAccountById(accountId: string): Account | undefined {
  return mockAccounts.find(
    (a) => a.id.toLowerCase() === accountId.toLowerCase(),
  );
}

export function getCustomerTransactions(
  customerId: string,
  filters: {
    accountId?: string;
    type?: string;
    status?: string;
    channel?: string;
    searchQuery?: string;
  } = {},
): Transaction[] {
  let txs = mockTransactions.filter(
    (t) => t.customerId.toLowerCase() === customerId.toLowerCase(),
  );

  if (filters.accountId && filters.accountId !== "All") {
    txs = txs.filter((t) => t.accountId === filters.accountId);
  }

  if (filters.type && filters.type !== "All") {
    txs = txs.filter(
      (t) => t.type.toLowerCase() === filters.type!.toLowerCase(),
    );
  }

  if (filters.status && filters.status !== "All") {
    txs = txs.filter(
      (t) => t.status.toLowerCase() === filters.status!.toLowerCase(),
    );
  }

  if (filters.channel && filters.channel !== "All") {
    txs = txs.filter(
      (t) => t.channel.toLowerCase() === filters.channel!.toLowerCase(),
    );
  }

  if (filters.searchQuery && filters.searchQuery.trim() !== "") {
    const q = filters.searchQuery.toLowerCase();
    txs = txs.filter(
      (t) =>
        t.id.toLowerCase().includes(q) ||
        t.beneficiaryName.toLowerCase().includes(q) ||
        t.remarks.toLowerCase().includes(q),
    );
  }

  return txs;
}

export function getTransactionById(
  transactionId: string,
): Transaction | undefined {
  return mockTransactions.find(
    (t) => t.id.toLowerCase() === transactionId.toLowerCase(),
  );
}

export function getCustomerApplications(
  customerId: string,
  filters: { status?: string; type?: string } = {},
): Application[] {
  let apps = mockApplications.filter(
    (a) => a.customerId.toLowerCase() === customerId.toLowerCase(),
  );

  if (filters.status && filters.status !== "All") {
    apps = apps.filter(
      (a) => a.status.toLowerCase() === filters.status!.toLowerCase(),
    );
  }

  if (filters.type && filters.type !== "All") {
    apps = apps.filter(
      (a) => a.type.toLowerCase() === filters.type!.toLowerCase(),
    );
  }

  return apps;
}

export function getApplicationById(
  applicationId: string,
): Application | undefined {
  return mockApplications.find(
    (a) => a.id.toLowerCase() === applicationId.toLowerCase(),
  );
}

export function getCustomerServiceRequests(
  customerId: string,
  filters: { status?: string; priority?: string; type?: string } = {},
): ServiceRequest[] {
  let srs = mockServiceRequests.filter(
    (s) => s.customerId.toLowerCase() === customerId.toLowerCase(),
  );

  if (filters.status && filters.status !== "All") {
    srs = srs.filter(
      (s) => s.status.toLowerCase() === filters.status!.toLowerCase(),
    );
  }

  if (filters.priority && filters.priority !== "All") {
    srs = srs.filter(
      (s) => s.priority.toLowerCase() === filters.priority!.toLowerCase(),
    );
  }

  if (filters.type && filters.type !== "All") {
    srs = srs.filter(
      (s) => s.type.toLowerCase() === filters.type!.toLowerCase(),
    );
  }

  return srs;
}

export function getServiceRequestById(
  requestId: string,
): ServiceRequest | undefined {
  return mockServiceRequests.find(
    (s) => s.id.toLowerCase() === requestId.toLowerCase(),
  );
}

export function getCustomerLoginActivities(
  customerId: string,
  filters: { channel?: string; status?: string } = {},
): LoginActivity[] {
  let logs = mockLoginActivities.filter(
    (l) => l.customerId.toLowerCase() === customerId.toLowerCase(),
  );

  if (filters.channel && filters.channel !== "All") {
    logs = logs.filter(
      (l) => l.channel.toLowerCase() === filters.channel!.toLowerCase(),
    );
  }

  if (filters.status && filters.status !== "All") {
    logs = logs.filter(
      (l) => l.status.toLowerCase() === filters.status!.toLowerCase(),
    );
  }

  return logs;
}

export function getCustomerAnalytics(
  _customerId: string,
): MonthlyAnalyticsData[] {
  // Returns historical 2-year data
  return mockMonthlyAnalytics;
}
