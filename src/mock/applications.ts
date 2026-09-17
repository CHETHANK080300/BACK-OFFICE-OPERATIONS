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
    product: "Personal Loan",
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
  {
    id: "APP003",
    customerId: "CIF10001",
    product: "USD Savings Account Opening",
    type: "Foreign Currency Account",
    submittedDate: "28 Aug 2026",
    status: "Completed",
    lastUpdated: "30 Aug 2026",
    assignedOfficer: "Clarissa Reyes (RM)",
    submittedDocuments: [
      "FATCA Declaration Form.pdf",
      "US Dollar Source of Funds.pdf",
    ],
    verificationStatus: "Verified & Compliant",
    comments: [
      {
        user: "Clarissa Reyes",
        date: "30 Aug 2026, 04:00 PM",
        text: "Account opened and welcome kit dispatched.",
      },
    ],
    activityHistory: [
      {
        date: "30 Aug 2026, 04:00 PM",
        action: "Account successfully opened",
        actor: "Clarissa Reyes",
      },
    ],
    journey: [
      {
        title: "Application Submitted",
        date: "28 Aug 2026",
        status: "Completed",
        description: "Submitted in person at BGC Branch.",
      },
      {
        title: "Documents Received",
        date: "28 Aug 2026",
        status: "Completed",
        description: "FATCA forms and passport verified.",
      },
      {
        title: "Verification",
        date: "29 Aug 2026",
        status: "Completed",
        description: "AML and KYC compliance check completed.",
      },
      {
        title: "Credit Assessment",
        date: "29 Aug 2026",
        status: "Completed",
        description: "Deposit account review cleared.",
      },
      {
        title: "Approved",
        date: "30 Aug 2026",
        status: "Completed",
        description: "Account creation approved.",
      },
      {
        title: "Completed",
        date: "30 Aug 2026",
        status: "Completed",
        description: "USD Account XXXX-9821 created.",
      },
    ],
  },
];
