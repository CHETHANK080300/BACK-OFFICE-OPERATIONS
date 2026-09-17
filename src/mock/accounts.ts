export interface Account {
  id: string; // Account Number e.g. XXXX1234 or 100192831234
  customerId: string;
  productName: string;
  type: "CASA" | "Card" | "Loan" | "Time Deposit";
  status: "Active" | "Dormant" | "Closed" | "Blocked" | "Pending";
  currency: string;
  balance: number;
  availableBalance: number;
  openedDate: string;
  branch: string;
  interestRate?: string;
  rmName: string;
  accountNumberMasked: string;
  creditLimit?: number;
  outstandingBalance?: number;
}

export const mockAccounts: Account[] = [
  // Customer 1: Juan Dela Cruz (CIF10001)
  {
    id: "100192831234",
    customerId: "CIF10001",
    productName: "High Yield Savings Account",
    type: "CASA",
    status: "Active",
    currency: "PHP",
    balance: 450000,
    availableBalance: 450000,
    openedDate: "12 Jan 2021",
    branch: "BGC Main Branch",
    interestRate: "2.25% p.a.",
    rmName: "Clarissa Reyes",
    accountNumberMasked: "XXXX XXXX 1234",
  },
  {
    id: "100192835678",
    customerId: "CIF10001",
    productName: "Premier Checking Account",
    type: "CASA",
    status: "Active",
    currency: "PHP",
    balance: 850000,
    availableBalance: 845000,
    openedDate: "05 May 2022",
    branch: "BGC Main Branch",
    interestRate: "0.25% p.a.",
    rmName: "Clarissa Reyes",
    accountNumberMasked: "XXXX XXXX 5678",
  },
  {
    id: "450912349012",
    customerId: "CIF10001",
    productName: "Platinum Visa Credit Card",
    type: "Card",
    status: "Active",
    currency: "PHP",
    balance: 120000, // current balance/due
    availableBalance: 380000, // credit available
    openedDate: "18 Aug 2023",
    branch: "BGC Main Branch",
    interestRate: "3.00% monthly",
    rmName: "Clarissa Reyes",
    accountNumberMasked: "XXXX XXXX 9012",
    creditLimit: 500000,
    outstandingBalance: 120000,
  },
  {
    id: "300812343456",
    customerId: "CIF10001",
    productName: "Personal Express Loan",
    type: "Loan",
    status: "Active",
    currency: "PHP",
    balance: 780000, // remaining balance
    availableBalance: 0,
    openedDate: "10 Mar 2024",
    branch: "BGC Main Branch",
    interestRate: "7.50% p.a.",
    rmName: "Clarissa Reyes",
    accountNumberMasked: "XXXX XXXX 3456",
    outstandingBalance: 780000,
  },
  {
    id: "500212347890",
    customerId: "CIF10001",
    productName: "Special Time Deposit (1 Year)",
    type: "Time Deposit",
    status: "Active",
    currency: "PHP",
    balance: 250000,
    availableBalance: 250000,
    openedDate: "15 Oct 2025",
    branch: "BGC Main Branch",
    interestRate: "4.50% p.a.",
    rmName: "Clarissa Reyes",
    accountNumberMasked: "XXXX XXXX 7890",
  },

  // Customer 2: Maria Santos (CIF10002)
  {
    id: "100288881111",
    customerId: "CIF10002",
    productName: "Wealth Gold Savings Account",
    type: "CASA",
    status: "Active",
    currency: "PHP",
    balance: 1850000,
    availableBalance: 1850000,
    openedDate: "14 Feb 2018",
    branch: "Alabang Town Center Branch",
    interestRate: "2.50% p.a.",
    rmName: "Marco Mendoza",
    accountNumberMasked: "XXXX XXXX 1111",
  },
  {
    id: "450988882222",
    customerId: "CIF10002",
    productName: "World Mastercard",
    type: "Card",
    status: "Active",
    currency: "PHP",
    balance: 85000,
    availableBalance: 915000,
    openedDate: "20 Jun 2019",
    branch: "Alabang Town Center Branch",
    interestRate: "2.75% monthly",
    rmName: "Marco Mendoza",
    accountNumberMasked: "XXXX XXXX 2222",
    creditLimit: 1000000,
    outstandingBalance: 85000,
  },
  {
    id: "300888883333",
    customerId: "CIF10002",
    productName: "Auto Loan - SUV",
    type: "Loan",
    status: "Active",
    currency: "PHP",
    balance: 1180000,
    availableBalance: 0,
    openedDate: "11 Nov 2022",
    branch: "Alabang Town Center Branch",
    interestRate: "6.80% p.a.",
    rmName: "Marco Mendoza",
    accountNumberMasked: "XXXX XXXX 3333",
    outstandingBalance: 1180000,
  },

  // Customer 3: Jose Reyes (CIF10003)
  {
    id: "100333331111",
    customerId: "CIF10003",
    productName: "Everyday ATM Savings",
    type: "CASA",
    status: "Active",
    currency: "PHP",
    balance: 180000,
    availableBalance: 180000,
    openedDate: "01 Sep 2022",
    branch: "Katipunan Avenue Branch",
    interestRate: "1.00% p.a.",
    rmName: "Patricia Garcia",
    accountNumberMasked: "XXXX XXXX 1111",
  },
  {
    id: "450933332222",
    customerId: "CIF10003",
    productName: "Classic Rewards Visa",
    type: "Card",
    status: "Active",
    currency: "PHP",
    balance: 24500,
    availableBalance: 125500,
    openedDate: "14 Feb 2023",
    branch: "Katipunan Avenue Branch",
    interestRate: "3.00% monthly",
    rmName: "Patricia Garcia",
    accountNumberMasked: "XXXX XXXX 2222",
    creditLimit: 150000,
    outstandingBalance: 24500,
  },
];
