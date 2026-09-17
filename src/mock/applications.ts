export interface ApplicationTimelineStep {
  title: string;
  date: string;
  status: "Completed" | "Current" | "Pending" | "Failed";
  description: string;
}

export interface Application {
  id: string; // e.g. APP001
  customerId: string;
  product: string;
  type: string;
  submittedDate: string;
  status:
    | "Draft"
    | "Submitted"
    | "Under Review"
    | "Pending Documents"
    | "Approved"
    | "Rejected"
    | "Completed";
  lastUpdated: string;
  assignedOfficer: string;
  submittedDocuments: string[];
  verificationStatus: string;
  comments: { user: string; date: string; text: string }[];
  activityHistory: { date: string; action: string; actor: string }[];
  journey: ApplicationTimelineStep[];
}

export const mockApplications: Application[] = [
  // ==========================================
  // CUSTOMER 1: Juan Dela Cruz (CIF10001)
  // ==========================================
  {
    id: "APP001",
    customerId: "CIF10001",
    product: "Platinum Visa Credit Card Limit Increase",
    type: "Credit Card Limit Increase",
    submittedDate: "12 Sep 2026",
    status: "Approved",
    lastUpdated: "14 Sep 2026",
    assignedOfficer: "Clarissa Reyes (RM)",
    submittedDocuments: [
      "Latest 3 Months Payslip.pdf",
      "2025 BIR Form 2316 (ITR).pdf",
      "Government Issued ID (Passport).pdf",
    ],
    verificationStatus: "Verified - Income & Employment Confirmed",
    comments: [
      {
        user: "Clarissa Reyes",
        date: "14 Sep 2026, 11:30 AM",
        text: "Credit score verification completed. Requested limit increase to ₱500,000 approved based on clean repayment record.",
      },
      {
        user: "System Risk Engine",
        date: "12 Sep 2026, 02:15 PM",
        text: "Automated risk assessment score: 820 (Low Risk). Passed initial pre-screening.",
      },
    ],
    activityHistory: [
      {
        date: "14 Sep 2026, 02:00 PM",
        action: "Status updated to Approved",
        actor: "Clarissa Reyes",
      },
      {
        date: "13 Sep 2026, 10:00 AM",
        action: "Under Review by Credit Assessment",
        actor: "Credit Team",
      },
      {
        date: "12 Sep 2026, 02:10 PM",
        action: "Application Submitted online",
        actor: "Juan Dela Cruz",
      },
    ],
    journey: [
      {
        title: "Application Submitted",
        date: "12 Sep 2026",
        status: "Completed",
        description: "Customer submitted application via Mobile App.",
      },
      {
        title: "Documents Received",
        date: "12 Sep 2026",
        status: "Completed",
        description: "Income documents and ID uploaded and verified.",
      },
      {
        title: "Verification",
        date: "13 Sep 2026",
        status: "Completed",
        description:
          "Employment and credit bureau checks executed successfully.",
      },
      {
        title: "Credit Assessment",
        date: "14 Sep 2026",
        status: "Completed",
        description: "Credit committee review approved the ₱500k limit.",
      },
      {
        title: "Approved",
        date: "14 Sep 2026",
        status: "Completed",
        description: "Application approved and card limit updated.",
      },
      {
        title: "Completed",
        date: "14 Sep 2026",
        status: "Completed",
        description: "Confirmation sent to customer via SMS and Email.",
      },
    ],
  },
  {
    id: "APP002",
    customerId: "CIF10001",
    product: "Personal Express Loan",
    type: "Personal Express Loan",
    submittedDate: "10 Sep 2026",
    status: "Under Review",
    lastUpdated: "15 Sep 2026",
    assignedOfficer: "Patricia Garcia",
    submittedDocuments: [
      "Certificate of Employment.pdf",
      "Bank Statement 6 Months.pdf",
    ],
    verificationStatus:
      "In Progress - Awaiting employer telephone verification",
    comments: [
      {
        user: "Patricia Garcia",
        date: "15 Sep 2026, 09:20 AM",
        text: "Initiated secondary verification with HR representative.",
      },
    ],
    activityHistory: [
      {
        date: "15 Sep 2026, 09:20 AM",
        action: "HR verification initiated",
        actor: "Patricia Garcia",
      },
      {
        date: "10 Sep 2026, 04:30 PM",
        action: "Application Submitted",
        actor: "Juan Dela Cruz",
      },
    ],
    journey: [
      {
        title: "Application Submitted",
        date: "10 Sep 2026",
        status: "Completed",
        description: "Loan application submitted via Web Portal.",
      },
      {
        title: "Documents Received",
        date: "11 Sep 2026",
        status: "Completed",
        description: "All requested documents received.",
      },
      {
        title: "Verification",
        date: "15 Sep 2026",
        status: "Current",
        description: "Employer and telephone verification in progress.",
      },
      {
        title: "Credit Assessment",
        date: "-",
        status: "Pending",
        description: "Underwriting review pending verification result.",
      },
      {
        title: "Approved",
        date: "-",
        status: "Pending",
        description: "Final decision pending.",
      },
      {
        title: "Completed",
        date: "-",
        status: "Pending",
        description: "Funds disbursement upon contract signature.",
      },
    ],
  },

  // ==========================================
  // CUSTOMER 2: Maria Santos (CIF10002)
  // ==========================================
  {
    id: "APP2001",
    customerId: "CIF10002",
    product: "World Mastercard Elite Upgrade",
    type: "Credit Card Upgrade",
    submittedDate: "05 Sep 2026",
    status: "Completed",
    lastUpdated: "08 Sep 2026",
    assignedOfficer: "Marco Mendoza",
    submittedDocuments: [
      "Annual Tax Return 2025.pdf",
      "High Net Worth Statement.pdf",
    ],
    verificationStatus: "Verified - Approved for Elite Privileges",
    comments: [
      {
        user: "Marco Mendoza",
        date: "08 Sep 2026, 02:00 PM",
        text: "Approved Elite Mastercard upgrade with ₱1M credit limit and airport lounge access.",
      },
    ],
    activityHistory: [
      {
        date: "08 Sep 2026, 02:00 PM",
        action: "Card upgrade completed",
        actor: "Marco Mendoza",
      },
    ],
    journey: [
      {
        title: "Application Submitted",
        date: "05 Sep 2026",
        status: "Completed",
        description: "Submitted through Wealth Portal.",
      },
      {
        title: "Verification",
        date: "06 Sep 2026",
        status: "Completed",
        description: "Wealth tier eligibility verified.",
      },
      {
        title: "Approved",
        date: "08 Sep 2026",
        status: "Completed",
        description: "World Mastercard upgrade approved.",
      },
      {
        title: "Completed",
        date: "08 Sep 2026",
        status: "Completed",
        description: "Elite Card delivered to Alabang Branch.",
      },
    ],
  },

  // ==========================================
  // CUSTOMER 3: Jose Reyes (CIF10003)
  // ==========================================
  {
    id: "APP3001",
    customerId: "CIF10003",
    product: "Personal Salary Loan Refinancing",
    type: "Personal Loan",
    submittedDate: "01 Sep 2026",
    status: "Approved",
    lastUpdated: "04 Sep 2026",
    assignedOfficer: "Patricia Garcia",
    submittedDocuments: [
      "Certificate of Employment & Compensation.pdf",
      "Pay Slips Aug 2026.pdf",
    ],
    verificationStatus: "Verified - Salary deductions approved by employer",
    comments: [
      {
        user: "Patricia Garcia",
        date: "04 Sep 2026, 03:30 PM",
        text: "Refinancing application cleared at lower interest rate of 8.5% p.a.",
      },
    ],
    activityHistory: [
      {
        date: "04 Sep 2026, 03:30 PM",
        action: "Loan approved",
        actor: "Patricia Garcia",
      },
    ],
    journey: [
      {
        title: "Application Submitted",
        date: "01 Sep 2026",
        status: "Completed",
        description: "Submitted online.",
      },
      {
        title: "Verification",
        date: "03 Sep 2026",
        status: "Completed",
        description: "Payroll deduction agreement confirmed.",
      },
      {
        title: "Approved",
        date: "04 Sep 2026",
        status: "Completed",
        description: "Loan terms signed and approved.",
      },
      {
        title: "Completed",
        date: "04 Sep 2026",
        status: "Completed",
        description: "Funds credited to Everyday ATM Savings.",
      },
    ],
  },

  // ==========================================
  // CUSTOMER 4: Ana Garcia (CIF10004)
  // ==========================================
  {
    id: "APP4001",
    customerId: "CIF10004",
    product: "SME Working Capital Line Increase",
    type: "Business Line of Credit",
    submittedDate: "11 Sep 2026",
    status: "Under Review",
    lastUpdated: "15 Sep 2026",
    assignedOfficer: "Rafael Tan",
    submittedDocuments: [
      "Audited Financial Statements 2024-2025.pdf",
      "Business Permit & SEC Registration.pdf",
      "Collateral Property Title Cebu.pdf",
    ],
    verificationStatus: "Underwriting Assessment in Progress",
    comments: [
      {
        user: "Rafael Tan",
        date: "15 Sep 2026, 10:15 AM",
        text: "Collateral appraisal report completed for Cebu commercial property.",
      },
    ],
    activityHistory: [
      {
        date: "15 Sep 2026, 10:15 AM",
        action: "Appraisal report uploaded",
        actor: "Rafael Tan",
      },
    ],
    journey: [
      {
        title: "Application Submitted",
        date: "11 Sep 2026",
        status: "Completed",
        description: "SME Credit expansion submitted.",
      },
      {
        title: "Documents Received",
        date: "12 Sep 2026",
        status: "Completed",
        description: "Financials & property titles received.",
      },
      {
        title: "Verification",
        date: "15 Sep 2026",
        status: "Current",
        description: "Commercial underwriting & risk review.",
      },
      {
        title: "Approved",
        date: "-",
        status: "Pending",
        description: "Credit committee decision pending.",
      },
      {
        title: "Completed",
        date: "-",
        status: "Pending",
        description: "Contract signing and limit activation.",
      },
    ],
  },

  // ==========================================
  // CUSTOMER 5: Mark Tan (CIF10005)
  // ==========================================
  {
    id: "APP5001",
    customerId: "CIF10005",
    product: "Gold Cashback Visa Credit Card",
    type: "Credit Card Application",
    submittedDate: "01 May 2023",
    status: "Completed",
    lastUpdated: "05 May 2023",
    assignedOfficer: "Sheila Cruz",
    submittedDocuments: ["Company ID & COE.pdf", "TIN Card.pdf"],
    verificationStatus: "Verified & Card Activated",
    comments: [
      {
        user: "Sheila Cruz",
        date: "05 May 2023, 01:00 PM",
        text: "New credit card approved and delivered to Davao address.",
      },
    ],
    activityHistory: [
      {
        date: "05 May 2023, 01:00 PM",
        action: "Card activated",
        actor: "Mark Tan",
      },
    ],
    journey: [
      {
        title: "Application Submitted",
        date: "01 May 2023",
        status: "Completed",
        description: "Applied via Mobile App.",
      },
      {
        title: "Approved",
        date: "03 May 2023",
        status: "Completed",
        description: "₱200k limit approved.",
      },
      {
        title: "Completed",
        date: "05 May 2023",
        status: "Completed",
        description: "Card received and activated.",
      },
    ],
  },

  // ==========================================
  // CUSTOMER 6: Clarissa Mendoza (CIF10006)
  // ==========================================
  {
    id: "APP6001",
    customerId: "CIF10006",
    product: "Fixed Income Bond Portfolio Allocation",
    type: "Investment Subscription",
    submittedDate: "10 Apr 2022",
    status: "Completed",
    lastUpdated: "15 Apr 2022",
    assignedOfficer: "Clarissa Reyes",
    submittedDocuments: [
      "Suitability & Risk Disclosure Form.pdf",
      "Investment Mandate.pdf",
    ],
    verificationStatus: "Verified - Accredited Investor Status Cleared",
    comments: [
      {
        user: "Clarissa Reyes",
        date: "15 Apr 2022, 11:00 AM",
        text: "₱2M bond portfolio allocated at 6.10% p.a. fixed coupon.",
      },
    ],
    activityHistory: [
      {
        date: "15 Apr 2022, 11:00 AM",
        action: "Bond purchase executed",
        actor: "Clarissa Reyes",
      },
    ],
    journey: [
      {
        title: "Application Submitted",
        date: "10 Apr 2022",
        status: "Completed",
        description: "Private banking investment mandate.",
      },
      {
        title: "Verification",
        date: "12 Apr 2022",
        status: "Completed",
        description: "Accredited investor classification.",
      },
      {
        title: "Approved",
        date: "14 Apr 2022",
        status: "Completed",
        description: "Treasury allocation approved.",
      },
      {
        title: "Completed",
        date: "15 Apr 2022",
        status: "Completed",
        description: "Bond holding active in portfolio.",
      },
    ],
  },
];
