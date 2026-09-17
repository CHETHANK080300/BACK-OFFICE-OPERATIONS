export interface Transaction {
  id: string; // Reference e.g. TXN10001
  customerId: string;
  accountId: string;
  accountNumberMasked: string;
  date: string;
  dateTime: string;
  type:
    | "Fund Transfer"
    | "Cash Withdrawal"
    | "Cash Deposit"
    | "Bill Payment"
    | "Card Payment"
    | "International Transfer"
    | "Interest Credit"
    | "Loan Disbursement"
    | "ATM Withdrawal";
  channel:
    | "Mobile Banking"
    | "Online Banking"
    | "ATM"
    | "Branch"
    | "POS"
    | "InstaPay"
    | "PESONet";
  debit: number;
  credit: number;
  amount: number;
  status: "Success" | "Pending" | "Failed" | "Reversed";
  sourceAccount: string;
  destinationAccount: string;
  beneficiaryName: string;
  location: string;
  remarks: string;
  processingReference: string;
}

export const mockTransactions: Transaction[] = [
  // Customer 1: Juan Dela Cruz (CIF10001)
  {
    id: "TXN10001",
    customerId: "CIF10001",
    accountId: "100192831234",
    accountNumberMasked: "XXXX XXXX 1234",
    date: "15 Sep 2026",
    dateTime: "15 Sep 2026, 10:25 AM",
    type: "Fund Transfer",
    channel: "InstaPay",
    debit: 5000,
    credit: 0,
    amount: 5000,
    status: "Success",
    sourceAccount: "100192831234 (Savings)",
    destinationAccount: "001298471201 (BDO)",
    beneficiaryName: "Carlos Dela Cruz",
    location: "Manila, PH",
    remarks: "Monthly allowance transfer via InstaPay",
    processingReference: "PR-20260915-00912",
  },
  {
    id: "TXN10002",
    customerId: "CIF10001",
    accountId: "100192831234",
    accountNumberMasked: "XXXX XXXX 1234",
    date: "14 Sep 2026",
    dateTime: "14 Sep 2026, 03:10 PM",
    type: "Cash Deposit",
    channel: "Branch",
    debit: 0,
    credit: 25000,
    amount: 25000,
    status: "Success",
    sourceAccount: "Cash Counter",
    destinationAccount: "100192831234 (Savings)",
    beneficiaryName: "Juan Dela Cruz",
    location: "BGC Main Branch, Taguig",
    remarks: "Over-the-counter deposit",
    processingReference: "PR-20260914-00411",
  },
  {
    id: "TXN10003",
    customerId: "CIF10001",
    accountId: "450912349012",
    accountNumberMasked: "XXXX XXXX 9012",
    date: "12 Sep 2026",
    dateTime: "12 Sep 2026, 07:45 PM",
    type: "Card Payment",
    channel: "POS",
    debit: 8450,
    credit: 0,
    amount: 8450,
    status: "Success",
    sourceAccount: "450912349012 (Credit Card)",
    destinationAccount: "Rustan's Supermarket",
    beneficiaryName: "Rustan's BGC",
    location: "Taguig, PH",
    remarks: "Groceries purchase at Rustan's",
    processingReference: "PR-20260912-08812",
  },
  {
    id: "TXN10004",
    customerId: "CIF10001",
    accountId: "100192835678",
    accountNumberMasked: "XXXX XXXX 5678",
    date: "10 Sep 2026",
    dateTime: "10 Sep 2026, 11:30 AM",
    type: "Bill Payment",
    channel: "Mobile Banking",
    debit: 3820,
    credit: 0,
    amount: 3820,
    status: "Success",
    sourceAccount: "100192835678 (Checking)",
    destinationAccount: "Meralco Electric",
    beneficiaryName: "Meralco Utility",
    location: "Online",
    remarks: "Utility bill payment for electric service",
    processingReference: "PR-20260910-01209",
  },
  {
    id: "TXN10005",
    customerId: "CIF10001",
    accountId: "100192831234",
    accountNumberMasked: "XXXX XXXX 1234",
    date: "05 Sep 2026",
    dateTime: "05 Sep 2026, 08:15 AM",
    type: "ATM Withdrawal",
    channel: "ATM",
    debit: 10000,
    credit: 0,
    amount: 10000,
    status: "Success",
    sourceAccount: "100192831234 (Savings)",
    destinationAccount: "ATM Terminal BGC02",
    beneficiaryName: "Juan Dela Cruz",
    location: "High Street BGC, Taguig",
    remarks: "Cash withdrawal from ATM",
    processingReference: "PR-20260905-00102",
  },
  {
    id: "TXN10006",
    customerId: "CIF10001",
    accountId: "100192831234",
    accountNumberMasked: "XXXX XXXX 1234",
    date: "01 Sep 2026",
    dateTime: "01 Sep 2026, 02:00 AM",
    type: "Interest Credit",
    channel: "Online Banking",
    debit: 0,
    credit: 843.75,
    amount: 843.75,
    status: "Success",
    sourceAccount: "Bank Treasury",
    destinationAccount: "100192831234 (Savings)",
    beneficiaryName: "Juan Dela Cruz",
    location: "System Generated",
    remarks: "Monthly savings interest payout",
    processingReference: "PR-20260901-00001",
  },
];
