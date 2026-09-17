import {
  RiskFactor,
  CustomerParameter,
  GeographyRisk,
  ProductRisk,
  OverrideRule,
  Workflow,
  AuditLog,
  Role,
  User,
  RiskRating,
  DecisionMatrix,
  CustomerAssessment,
} from "./cram-types";

export const mockRiskFactors: RiskFactor[] = [
  { id: "1", name: "Customer Type Risk", weightage: 35, status: "Active" },
  { id: "2", name: "Geography Risk", weightage: 25, status: "Active" },
  { id: "3", name: "Product Risk", weightage: 30, status: "Active" },
  { id: "4", name: "Channel Risk", weightage: 10, status: "Active" },
  { id: "5", name: "Transaction Risk", weightage: 0, status: "Active" },
];

export const mockCustomerParameters: CustomerParameter[] = [
  {
    id: "1",
    parameterName: "Residency Status",
    value: "Resident",
    riskScore: 1,
    override: "No",
  },
  {
    id: "2",
    parameterName: "Residency Status",
    value: "Non Resident",
    riskScore: 3,
    override: "High Risk",
  },
  {
    id: "3",
    parameterName: "PEP Status",
    value: "Politically Exposed",
    riskScore: 5,
    override: "High Risk",
  },
  {
    id: "4",
    parameterName: "Nature of Business",
    value: "Virtual Currency",
    riskScore: 5,
    override: "Prohibited",
  },
];

export const mockGeographyRisk: GeographyRisk[] = [
  {
    id: "1",
    country: "UAE",
    fatf: "Low",
    baselIndex: 4.2,
    sanctions: "No",
    cpi: 67,
    calculatedRating: "Low",
    finalRating: "Low",
  },
  {
    id: "2",
    country: "Afghanistan",
    fatf: "High",
    baselIndex: 8.1,
    sanctions: "Yes",
    cpi: 16,
    calculatedRating: "High",
    finalRating: "High",
  },
  {
    id: "3",
    country: "Bahrain",
    fatf: "Medium",
    baselIndex: 5.1,
    sanctions: "No",
    cpi: 42,
    calculatedRating: "Medium",
    finalRating: "Medium",
  },
  {
    id: "4",
    country: "Saudi Arabia",
    fatf: "Medium",
    baselIndex: 4.8,
    sanctions: "No",
    cpi: 53,
    calculatedRating: "Low",
    finalRating: "Low",
  },
];

export const mockProductRisk: ProductRisk[] = [
  {
    id: "1",
    product: "Current Account",
    liquidity: 3,
    crossBorder: 2,
    anonymity: 1,
    fatfRisk: 2,
    finalRisk: 2.2,
  },
  {
    id: "2",
    product: "Savings Account",
    liquidity: 2,
    crossBorder: 1,
    anonymity: 1,
    fatfRisk: 1,
    finalRisk: 1.2,
  },
  {
    id: "3",
    product: "Trade Finance",
    liquidity: 1,
    crossBorder: 3,
    anonymity: 2,
    fatfRisk: 3,
    finalRisk: 2.8,
  },
  {
    id: "4",
    product: "International Transfer",
    liquidity: 3,
    crossBorder: 3,
    anonymity: 2,
    fatfRisk: 3,
    finalRisk: 3.0,
  },
];

export const mockOverrideRules: OverrideRule[] = [
  {
    id: "1",
    name: "Foreign PEP",
    condition: "PEP Status = Foreign",
    outcome: "High Risk",
    reason: "Regulatory Requirement",
    status: "Active",
  },
  {
    id: "2",
    name: "Positive Screening Match",
    condition: "Screening = Match",
    outcome: "High Risk",
    reason: "Compliance Policy",
    status: "Active",
  },
  {
    id: "3",
    name: "STR Filed",
    condition: "STR = Yes",
    outcome: "High Risk",
    reason: "Suspicious Activity",
    status: "Active",
  },
  {
    id: "4",
    name: "Virtual Currency Business",
    condition: "Industry = Crypto",
    outcome: "Prohibited",
    reason: "Risk Appetite",
    status: "Active",
  },
];

export const mockWorkflows: Workflow[] = [
  {
    id: "1",
    type: "New Customer Onboarding",
    stages: [
      {
        id: "s1",
        name: "Risk Assessment",
        role: "Compliance Analyst",
        slaDays: 1,
        autoEscalation: "Manager",
      },
      {
        id: "s2",
        name: "Compliance Review",
        role: "Compliance Manager",
        slaDays: 2,
        autoEscalation: "Head of Compliance",
      },
      {
        id: "s3",
        name: "Manager Approval",
        role: "CRAM Administrator",
        slaDays: 1,
        autoEscalation: "None",
      },
    ],
  },
];

export const mockRoles: Role[] = [
  {
    id: "1",
    name: "CRAM Administrator",
    permissions: ["View", "Create", "Edit", "Approve", "Delete"],
  },
  {
    id: "2",
    name: "Compliance Manager",
    permissions: ["View", "Create", "Edit", "Approve"],
  },
  {
    id: "3",
    name: "Compliance Analyst",
    permissions: ["View", "Create", "Edit"],
  },
  { id: "4", name: "Auditor", permissions: ["View"] },
];

export const mockUsers: User[] = [
  { id: "1", name: "Chethan K", role: "CRAM Administrator", status: "Active" },
  { id: "2", name: "John Doe", role: "Compliance Manager", status: "Active" },
  { id: "3", name: "Jane Smith", role: "Compliance Analyst", status: "Active" },
];

export const mockAuditLogs: AuditLog[] = [
  {
    id: "1",
    timestamp: new Date().toISOString(),
    user: "Chethan K",
    module: "Risk Weights",
    action: "Weightage Updated",
    details: "Customer Type Risk changed from 30% to 35%",
  },
  {
    id: "2",
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    user: "John Doe",
    module: "Geography Risk",
    action: "Country Risk Changed",
    details: "UAE risk rating updated",
  },
  {
    id: "3",
    timestamp: new Date(Date.now() - 86400000).toISOString(),
    user: "Jane Smith",
    module: "Override Rules",
    action: "Rule Modified",
    details: "Foreign PEP rule updated",
  },
];

export const mockRiskRatings: RiskRating[] = [
  { id: "1", minScore: 0, maxScore: 30, rating: "Low", color: "bg-success" },
  {
    id: "2",
    minScore: 31,
    maxScore: 60,
    rating: "Medium",
    color: "bg-warning",
  },
  { id: "3", minScore: 61, maxScore: 80, rating: "High", color: "bg-critical" },
  {
    id: "4",
    minScore: 81,
    maxScore: 100,
    rating: "Very High",
    color: "bg-black",
  },
];

export const mockDecisionMatrix: DecisionMatrix[] = [
  {
    id: "1",
    rating: "Low",
    decision: "Approve",
    conditions: "Standard Onboarding",
  },
  {
    id: "2",
    rating: "Medium",
    decision: "Approve",
    conditions: "Standard Onboarding",
  },
  {
    id: "3",
    rating: "High",
    decision: "Review",
    conditions: "Enhanced Due Diligence Required",
  },
  {
    id: "4",
    rating: "Very High",
    decision: "Reject",
    conditions: "Outside Risk Appetite",
  },
];

export const mockCustomerAssessments: CustomerAssessment[] = [
  {
    id: "AST-1001",
    customerId: "CUST-8821",
    cifNumber: "CIF00921",
    name: "Ahmad Abdullah",
    customerType: "Individual",
    segment: "Retail",
    industry: "Salaried",
    geography: "UAE",
    finalScore: 24,
    riskRating: "Low",
    decision: "Approve",
    assessmentDate: "2024-05-10",
    status: "Completed",
  },
  {
    id: "AST-1002",
    customerId: "CUST-4412",
    cifNumber: "CIF00122",
    name: "Global Trading LLC",
    customerType: "Corporate",
    segment: "Commercial",
    industry: "Logistics",
    geography: "Singapore",
    finalScore: 52,
    riskRating: "Medium",
    decision: "Approve",
    assessmentDate: "2024-05-12",
    status: "Completed",
  },
  {
    id: "AST-1003",
    customerId: "CUST-9921",
    cifNumber: "CIF00551",
    name: "Mikhail Volkov",
    customerType: "Individual",
    segment: "HNI",
    industry: "Real Estate",
    geography: "Russia",
    finalScore: 88,
    riskRating: "Very High",
    decision: "Reject",
    assessmentDate: "2024-05-14",
    status: "Flagged",
  },
];

export const mockDisputes: Dispute[] = [
  {
    id: "DIS-7721",
    customerName: "Ahmad Abdullah",
    issueType: "Transaction Error",
    channel: "Mobile",
    date: "2024-05-18",
    status: "Pending",
  },
  {
    id: "DIS-4410",
    customerName: "Elena Rodriguez",
    issueType: "Unauthorized Transaction",
    channel: "ATM",
    date: "2024-05-17",
    status: "Under Review",
  },
  {
    id: "DIS-2291",
    customerName: "Samuel Kwok",
    issueType: "Double Billing",
    channel: "POS",
    date: "2024-05-16",
    status: "Resolved",
  },
];

export const mockChannelDistribution = [
  { name: "Mobile", value: 45, color: "#0D9488" }, // teal-600
  { name: "Internet", value: 30, color: "#0F172A" }, // slate-900
  { name: "ATM", value: 15, color: "#1E293B" }, // slate-800
  { name: "Branch", value: 7, color: "#334155" }, // slate-700
  { name: "POS", value: 3, color: "#475569" }, // slate-600
];

export const mockTxnTypeDistribution = [
  { name: "Deposits", value: 30, color: "#0D9488" },
  { name: "Transfers", value: 25, color: "#0F172A" },
  { name: "Withdrawals", value: 20, color: "#1E293B" },
  { name: "Loans", value: 15, color: "#334155" },
  { name: "Bill Pay", value: 10, color: "#475569" },
];

export const mockVolumeTrend = [
  {
    name: "Mon",
    deposits: 12000,
    withdrawals: 8000,
    transfers: 6000,
    loans: 2000,
  },
  {
    name: "Tue",
    deposits: 15000,
    withdrawals: 9000,
    transfers: 7500,
    loans: 2500,
  },
  {
    name: "Wed",
    deposits: 13000,
    withdrawals: 11000,
    transfers: 6800,
    loans: 2200,
  },
  {
    name: "Thu",
    deposits: 18000,
    withdrawals: 8500,
    transfers: 9000,
    loans: 3000,
  },
  {
    name: "Fri",
    deposits: 22000,
    withdrawals: 12000,
    transfers: 11000,
    loans: 4000,
  },
  {
    name: "Sat",
    deposits: 9000,
    withdrawals: 15000,
    transfers: 4000,
    loans: 1500,
  },
  {
    name: "Sun",
    deposits: 7000,
    withdrawals: 6000,
    transfers: 3000,
    loans: 1000,
  },
];
