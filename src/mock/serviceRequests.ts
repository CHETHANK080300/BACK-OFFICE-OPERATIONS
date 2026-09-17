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
    | "General Inquiry";
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
      {
        date: "10 Sep 2026, 09:30 AM",
        action: "Request Submitted with proof of billing",
        actor: "Juan Dela Cruz",
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
        title: "Assigned",
        date: "10 Sep 2026",
        status: "Completed",
        description: "Assigned to Operations.",
      },
      {
        title: "Under Investigation",
        date: "10 Sep 2026",
        status: "Completed",
        description: "Utility bill verification passed.",
      },
      {
        title: "Resolved",
        date: "11 Sep 2026",
        status: "Completed",
        description: "Core banking record updated.",
      },
      {
        title: "Closed",
        date: "11 Sep 2026",
        status: "Completed",
        description: "Notification emailed to customer.",
      },
    ],
  },
];
