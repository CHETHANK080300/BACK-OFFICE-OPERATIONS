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
    | "ATM Withdrawal"
    | "Payroll Deposit"
    | "Dividend Payout";
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
  // ==========================================
  // CUSTOMER 1: Juan Dela Cruz (CIF10001)
  // ==========================================
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

  // ==========================================
  // CUSTOMER 2: Maria Santos (CIF10002)
  // ==========================================
  {
    id: "TXN20001",
    customerId: "CIF10002",
    accountId: "100288881111",
    accountNumberMasked: "XXXX XXXX 1111",
    date: "14 Sep 2026",
    dateTime: "14 Sep 2026, 02:15 PM",
    type: "Dividend Payout",
    channel: "Online Banking",
    debit: 0,
    credit: 85000,
    amount: 85000,
    status: "Success",
    sourceAccount: "Trust & Investments Corp",
    destinationAccount: "100288881111 (Wealth Savings)",
    beneficiaryName: "Maria Santos",
    location: "Alabang, PH",
    remarks: "Quarterly UITF investment dividend credit",
    processingReference: "PR-20260914-DIV99",
  },
  {
    id: "TXN20002",
    customerId: "CIF10002",
    accountId: "450988883333",
    accountNumberMasked: "XXXX XXXX 3333",
    date: "11 Sep 2026",
    dateTime: "11 Sep 2026, 08:30 PM",
    type: "Card Payment",
    channel: "POS",
    debit: 42500,
    credit: 0,
    amount: 42500,
    status: "Success",
    sourceAccount: "450988883333 (World Mastercard)",
    destinationAccount: "Ayala Malls Alabang",
    beneficiaryName: "Power Mac Center",
    location: "Muntinlupa, PH",
    remarks: "Electronics purchase on World Mastercard",
    processingReference: "PR-20260911-PMC01",
  },
  {
    id: "TXN20003",
    customerId: "CIF10002",
    accountId: "100288882222",
    accountNumberMasked: "XXXX XXXX 2222",
    date: "08 Sep 2026",
    dateTime: "08 Sep 2026, 09:10 AM",
    type: "Fund Transfer",
    channel: "PESONet",
    debit: 150000,
    credit: 0,
    amount: 150000,
    status: "Success",
    sourceAccount: "100288882222 (Checking)",
    destinationAccount: "100988221199 (Metrobank)",
    beneficiaryName: "Santos Realty Corp",
    location: "Manila, PH",
    remarks: "Commercial property lease payment",
    processingReference: "PR-20260908-PN082",
  },

  // ==========================================
  // CUSTOMER 3: Jose Reyes (CIF10003)
  // ==========================================
  {
    id: "TXN30001",
    customerId: "CIF10003",
    accountId: "100333331111",
    accountNumberMasked: "XXXX XXXX 1111",
    date: "13 Sep 2026",
    dateTime: "13 Sep 2026, 09:30 AM",
    type: "Payroll Deposit",
    channel: "PESONet",
    debit: 0,
    credit: 65000,
    amount: 65000,
    status: "Success",
    sourceAccount: "Accenture Philippines Payroll",
    destinationAccount: "100333331111 (ATM Savings)",
    beneficiaryName: "Jose Reyes",
    location: "Quezon City, PH",
    remarks: "Bi-monthly salary credit",
    processingReference: "PR-20260913-PAY88",
  },
  {
    id: "TXN30002",
    customerId: "CIF10003",
    accountId: "100333331111",
    accountNumberMasked: "XXXX XXXX 1111",
    date: "13 Sep 2026",
    dateTime: "13 Sep 2026, 11:00 AM",
    type: "ATM Withdrawal",
    channel: "ATM",
    debit: 5000,
    credit: 0,
    amount: 5000,
    status: "Success",
    sourceAccount: "100333331111 (ATM Savings)",
    destinationAccount: "ATM Katipunan Branch",
    beneficiaryName: "Jose Reyes",
    location: "Loyola Heights, QC",
    remarks: "ATM cash withdrawal",
    processingReference: "PR-20260913-ATM02",
  },
  {
    id: "TXN30003",
    customerId: "CIF10003",
    accountId: "450933332222",
    accountNumberMasked: "XXXX XXXX 2222",
    date: "09 Sep 2026",
    dateTime: "09 Sep 2026, 01:20 PM",
    type: "Card Payment",
    channel: "POS",
    debit: 2800,
    credit: 0,
    amount: 2800,
    status: "Success",
    sourceAccount: "450933332222 (Classic Visa)",
    destinationAccount: "UP Town Center Dining",
    beneficiaryName: "Ramen Nagi",
    location: "Quezon City, PH",
    remarks: "Dining payment at UP Town Center",
    processingReference: "PR-20260909-UP01",
  },

  // ==========================================
  // CUSTOMER 4: Ana Garcia (CIF10004)
  // ==========================================
  {
    id: "TXN40001",
    customerId: "CIF10004",
    accountId: "100444441111",
    accountNumberMasked: "XXXX XXXX 1111",
    date: "12 Sep 2026",
    dateTime: "12 Sep 2026, 01:45 PM",
    type: "Fund Transfer",
    channel: "PESONet",
    debit: 0,
    credit: 480000,
    amount: 480000,
    status: "Success",
    sourceAccount: "Visayas Wholesale Traders",
    destinationAccount: "100444441111 (Business Checking)",
    beneficiaryName: "Ana Garcia Trading",
    location: "Cebu City, PH",
    remarks: "Supplier invoice payment receipt",
    processingReference: "PR-20260912-CEB01",
  },
  {
    id: "TXN40002",
    customerId: "CIF10004",
    accountId: "100444441111",
    accountNumberMasked: "XXXX XXXX 1111",
    date: "10 Sep 2026",
    dateTime: "10 Sep 2026, 10:00 AM",
    type: "Bill Payment",
    channel: "Online Banking",
    debit: 125000,
    credit: 0,
    amount: 125000,
    status: "Success",
    sourceAccount: "100444441111 (Business Checking)",
    destinationAccount: "VECO Electric Cebu",
    beneficiaryName: "Visayan Electric Co",
    location: "Cebu City, PH",
    remarks: "Warehouse & office electric bill",
    processingReference: "PR-20260910-VEC88",
  },

  // ==========================================
  // CUSTOMER 5: Mark Tan (CIF10005)
  // ==========================================
  {
    id: "TXN50001",
    customerId: "CIF10005",
    accountId: "100555551111",
    accountNumberMasked: "XXXX XXXX 1111",
    date: "10 Sep 2026",
    dateTime: "10 Sep 2026, 11:15 AM",
    type: "Fund Transfer",
    channel: "InstaPay",
    debit: 3500,
    credit: 0,
    amount: 3500,
    status: "Success",
    sourceAccount: "100555551111 (Digital Savings)",
    destinationAccount: "GCash 09171234567",
    beneficiaryName: "Mark Tan",
    location: "Davao City, PH",
    remarks: "Cash in to GCash wallet via InstaPay",
    processingReference: "PR-20260910-DVO01",
  },
  {
    id: "TXN50002",
    customerId: "CIF10005",
    accountId: "100555551111",
    accountNumberMasked: "XXXX XXXX 1111",
    date: "05 Sep 2026",
    dateTime: "05 Sep 2026, 04:00 PM",
    type: "Payroll Deposit",
    channel: "PESONet",
    debit: 0,
    credit: 55000,
    amount: 55000,
    status: "Success",
    sourceAccount: "Tech Innovations Davao Inc",
    destinationAccount: "100555551111 (Digital Savings)",
    beneficiaryName: "Mark Tan",
    location: "Davao City, PH",
    remarks: "Monthly salary deposit",
    processingReference: "PR-20260905-TECH1",
  },

  // ==========================================
  // CUSTOMER 6: Clarissa Mendoza (CIF10006)
  // ==========================================
  {
    id: "TXN60001",
    customerId: "CIF10006",
    accountId: "100666661111",
    accountNumberMasked: "XXXX XXXX 1111",
    date: "15 Sep 2026",
    dateTime: "15 Sep 2026, 08:00 AM",
    type: "International Transfer",
    channel: "Online Banking",
    debit: 250000,
    credit: 0,
    amount: 250000,
    status: "Success",
    sourceAccount: "100666661111 (Preferred Savings)",
    destinationAccount: "JP Morgan Chase NY (USD)",
    beneficiaryName: "Clarissa Mendoza - Overseas Trust",
    location: "Makati Main Branch",
    remarks: "Outward telegraphic wire transfer to US account",
    processingReference: "PR-20260915-WIRE9",
  },
  {
    id: "TXN60002",
    customerId: "CIF10006",
    accountId: "450966664444",
    accountNumberMasked: "XXXX XXXX 4444",
    date: "13 Sep 2026",
    dateTime: "13 Sep 2026, 06:10 PM",
    type: "Card Payment",
    channel: "POS",
    debit: 112000,
    credit: 0,
    amount: 112000,
    status: "Success",
    sourceAccount: "450966664444 (Infinite Black Card)",
    destinationAccount: "Shangri-La Fort Hotel",
    beneficiaryName: "Shangri-La BGC",
    location: "Taguig, PH",
    remarks: "Executive dinner and event hosting",
    processingReference: "PR-20260913-SHANG",
  },
];
