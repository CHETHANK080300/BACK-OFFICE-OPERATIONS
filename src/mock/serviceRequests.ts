export interface ServiceRequest {
  id: string; // e.g. SR001
  customerId: string;
  type:
    | "Address Change"
    | "Card Replacement"
    | "Transaction Dispute"
    | "Account Statement"
    | "Password Reset"
    | "Complaint"
    | "General Inquiry"
    | "Checkbook Request"
    | "VIP Travel Notice";
  createdDate: string;
  priority: "High" | "Medium" | "Low";
  status:
    | "Open"
    | "In Progress"
    | "Under Investigation"
    | "Resolved"
    | "Closed";
  assignedTo: string;
  description: string;
  sla: string;
  resolutionDate: string;
  comments: { user: string; date: string; text: string }[];
  activityHistory: { date: string; action: string; actor: string }[];
  timeline: {
    title: string;
    date: string;
    status: "Completed" | "Current" | "Pending";
    description: string;
  }[];
}

export const mockServiceRequests: ServiceRequest[] = [
  // ==========================================
  // CUSTOMER 1: Juan Dela Cruz (CIF10001)
  // ==========================================
  {
    id: "SR001",
    customerId: "CIF10001",
    type: "Card Replacement",
    createdDate: "14 Sep 2026",
    priority: "High",
    status: "Open",
    assignedTo: "Agent 01 - Helpdesk",
    description:
      "Customer reported misplaced Platinum Visa card at Manila Airport and requested urgent replacement card dispatch to residential address.",
    sla: "24 Hours (Expires 15 Sep 2026 02:00 PM)",
    resolutionDate: "Target: 15 Sep 2026",
    comments: [
      {
        user: "Agent 01 - Helpdesk",
        date: "14 Sep 2026, 02:15 PM",
        text: "Card XXXX-9012 permanently blocked to prevent unauthorized transactions. Courier request dispatched to card personalization center.",
      },
    ],
    activityHistory: [
      {
        date: "14 Sep 2026, 02:15 PM",
        action: "Assigned to Agent 01 & Card Blocked",
        actor: "Agent 01",
      },
      {
        date: "14 Sep 2026, 02:00 PM",
        action: "Service Request created via Mobile Banking",
        actor: "Juan Dela Cruz",
      },
    ],
    timeline: [
      {
        title: "Request Created",
        date: "14 Sep 2026 02:00 PM",
        status: "Completed",
        description: "Request submitted online for lost card replacement.",
      },
      {
        title: "Assigned",
        date: "14 Sep 2026 02:15 PM",
        status: "Completed",
        description: "Assigned to Card Services desk and card blocked.",
      },
      {
        title: "Under Investigation",
        date: "14 Sep 2026 03:00 PM",
        status: "Current",
        description: "Card printing & courier dispatch in progress.",
      },
      {
        title: "Resolved",
        date: "-",
        status: "Pending",
        description: "Card delivered to customer.",
      },
      {
        title: "Closed",
        date: "-",
        status: "Pending",
        description: "Customer acknowledgment received.",
      },
    ],
  },
  {
    id: "SR002",
    customerId: "CIF10001",
    type: "Address Change",
    createdDate: "10 Sep 2026",
    priority: "Medium",
    status: "Closed",
    assignedTo: "Agent 04 - Operations",
    description:
      "Request to update residential address to Bonifacio Global City, Taguig.",
    sla: "48 Hours",
    resolutionDate: "11 Sep 2026",
    comments: [
      {
        user: "Agent 04 - Operations",
        date: "11 Sep 2026, 11:00 AM",
        text: "Proof of billing verified. Address updated in core banking master.",
      },
    ],
    activityHistory: [
      {
        date: "11 Sep 2026, 11:00 AM",
        action: "Status updated to Closed",
        actor: "Agent 04",
      },
    ],
    timeline: [
      {
        title: "Request Created",
        date: "10 Sep 2026",
        status: "Completed",
        description: "Address update request initiated.",
      },
      {
        title: "Closed",
        date: "11 Sep 2026",
        status: "Completed",
        description: "Core banking record updated.",
      },
    ],
  },

  // ==========================================
  // CUSTOMER 2: Maria Santos (CIF10002)
  // ==========================================
  {
    id: "SR2001",
    customerId: "CIF10002",
    type: "VIP Travel Notice",
    createdDate: "12 Sep 2026",
    priority: "Medium",
    status: "Open",
    assignedTo: "Marco Mendoza (RM)",
    description:
      "Travel advisory notification for upcoming trip to Tokyo, Japan from Sep 20 to Oct 05, 2026. Requesting higher international card transaction limits.",
    sla: "24 Hours",
    resolutionDate: "Target: 13 Sep 2026",
    comments: [
      {
        user: "Marco Mendoza",
        date: "12 Sep 2026, 04:00 PM",
        text: "Flagged overseas travel notice on World Mastercard XXXX-3333 and raised daily POS limit to ₱500k.",
      },
    ],
    activityHistory: [
      {
        date: "12 Sep 2026, 04:00 PM",
        action: "Travel flag set in card fraud engine",
        actor: "Marco Mendoza",
      },
    ],
    timeline: [
      {
        title: "Request Created",
        date: "12 Sep 2026",
        status: "Completed",
        description: "Travel notice submitted via Wealth App.",
      },
      {
        title: "Assigned",
        date: "12 Sep 2026",
        status: "Completed",
        description: "Assigned to Private Banking RM.",
      },
      {
        title: "Under Investigation",
        date: "12 Sep 2026",
        status: "Current",
        description: "Overseas limit authorization in progress.",
      },
    ],
  },

  // ==========================================
  // CUSTOMER 3: Jose Reyes (CIF10003)
  // ==========================================
  {
    id: "SR3001",
    customerId: "CIF10003",
    type: "Account Statement",
    createdDate: "05 Sep 2026",
    priority: "Low",
    status: "Closed",
    assignedTo: "Agent 02 - Support",
    description:
      "Request for certified 6-month bank statement for visa application.",
    sla: "24 Hours",
    resolutionDate: "06 Sep 2026",
    comments: [
      {
        user: "Agent 02 - Support",
        date: "06 Sep 2026, 10:00 AM",
        text: "Digitally signed bank statement generated and emailed to customer.",
      },
    ],
    activityHistory: [
      {
        date: "06 Sep 2026, 10:00 AM",
        action: "Statement emailed",
        actor: "Agent 02",
      },
    ],
    timeline: [
      {
        title: "Request Created",
        date: "05 Sep 2026",
        status: "Completed",
        description: "Statement request submitted.",
      },
      {
        title: "Closed",
        date: "06 Sep 2026",
        status: "Completed",
        description: "E-statement sent.",
      },
    ],
  },

  // ==========================================
  // CUSTOMER 4: Ana Garcia (CIF10004)
  // ==========================================
  {
    id: "SR4001",
    customerId: "CIF10004",
    type: "Checkbook Request",
    createdDate: "13 Sep 2026",
    priority: "Medium",
    status: "In Progress",
    assignedTo: "Agent 08 - Commercial Operations",
    description:
      "Request for 5 commercial checkbooks for SME Business Checking Account XXXX-1111.",
    sla: "48 Hours",
    resolutionDate: "Target: 15 Sep 2026",
    comments: [
      {
        user: "Agent 08",
        date: "13 Sep 2026, 02:30 PM",
        text: "Checkbook order sent to security printing vendor. Estimated delivery to Cebu Branch on Sep 16.",
      },
    ],
    activityHistory: [
      {
        date: "13 Sep 2026, 02:30 PM",
        action: "Sent to printer vendor",
        actor: "Agent 08",
      },
    ],
    timeline: [
      {
        title: "Request Created",
        date: "13 Sep 2026",
        status: "Completed",
        description: "Checkbook request submitted online.",
      },
      {
        title: "Under Investigation",
        date: "14 Sep 2026",
        status: "Current",
        description: "Security checkbook printing in progress.",
      },
    ],
  },
  {
    id: "SR4002",
    customerId: "CIF10004",
    type: "Transaction Dispute",
    createdDate: "02 Sep 2026",
    priority: "High",
    status: "Resolved",
    assignedTo: "Agent 05 - Fraud Ops",
    description:
      "Disputed duplicate POS charge of ₱12,500 at office supplies store.",
    sla: "72 Hours",
    resolutionDate: "04 Sep 2026",
    comments: [
      {
        user: "Agent 05",
        date: "04 Sep 2026, 04:15 PM",
        text: "Merchant confirmed duplicate system posting. Credit adjustment of ₱12,500 posted back to account.",
      },
    ],
    activityHistory: [
      {
        date: "04 Sep 2026, 04:15 PM",
        action: "Credit adjustment posted",
        actor: "Agent 05",
      },
    ],
    timeline: [
      {
        title: "Request Created",
        date: "02 Sep 2026",
        status: "Completed",
        description: "Dispute ticket opened.",
      },
      {
        title: "Resolved",
        date: "04 Sep 2026",
        status: "Completed",
        description: "Funds credited back.",
      },
    ],
  },

  // ==========================================
  // CUSTOMER 5: Mark Tan (CIF10005)
  // ==========================================
  {
    id: "SR5001",
    customerId: "CIF10005",
    type: "Password Reset",
    createdDate: "08 Sep 2026",
    priority: "Low",
    status: "Closed",
    assignedTo: "Automated Self-Service",
    description: "Mobile App biometric re-binding and password reset request.",
    sla: "15 Mins",
    resolutionDate: "08 Sep 2026",
    comments: [
      {
        user: "System",
        date: "08 Sep 2026, 11:20 AM",
        text: "OTP verified and Face ID successfully re-linked.",
      },
    ],
    activityHistory: [
      {
        date: "08 Sep 2026, 11:20 AM",
        action: "Self-service reset completed",
        actor: "Mark Tan",
      },
    ],
    timeline: [
      {
        title: "Request Created",
        date: "08 Sep 2026",
        status: "Completed",
        description: "Reset initiated.",
      },
      {
        title: "Closed",
        date: "08 Sep 2026",
        status: "Completed",
        description: "Device re-authenticated.",
      },
    ],
  },

  // ==========================================
  // CUSTOMER 6: Clarissa Mendoza (CIF10006)
  // ==========================================
  {
    id: "SR6001",
    customerId: "CIF10006",
    type: "General Inquiry",
    createdDate: "14 Sep 2026",
    priority: "Low",
    status: "In Progress",
    assignedTo: "Clarissa Reyes (RM)",
    description:
      "Inquiry regarding tax withholding rules on USD Dollar Wealth Account interest earnings.",
    sla: "24 Hours",
    resolutionDate: "Target: 15 Sep 2026",
    comments: [
      {
        user: "Clarissa Reyes",
        date: "14 Sep 2026, 05:00 PM",
        text: "Preparing formal tax computation guide for private banking clients.",
      },
    ],
    activityHistory: [
      {
        date: "14 Sep 2026, 05:00 PM",
        action: "Assigned to Private Banking RM",
        actor: "Clarissa Reyes",
      },
    ],
    timeline: [
      {
        title: "Request Created",
        date: "14 Sep 2026",
        status: "Completed",
        description: "Inquiry received via Wealth Concierge.",
      },
      {
        title: "Under Investigation",
        date: "15 Sep 2026",
        status: "Current",
        description: "Tax specialist review.",
      },
    ],
  },
];
