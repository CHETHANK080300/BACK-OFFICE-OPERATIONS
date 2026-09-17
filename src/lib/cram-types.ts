export type RiskLevel = "Low" | "Medium" | "High" | "Prohibited";
export type Status = "Active" | "Inactive" | "Pending Approval";

export interface RiskFactor {
  id: string;
  name: string;
  weightage: number;
  status: Status;
}

export interface CustomerParameter {
  id: string;
  parameterName: string;
  value: string;
  riskScore: number;
  override: string;
}

export interface GeographyRisk {
  id: string;
  country: string;
  fatf: "Low" | "High" | "Medium";
  baselIndex: number;
  sanctions: "Yes" | "No";
  cpi: number;
  calculatedRating: RiskLevel;
  finalRating: RiskLevel;
  overrideReason?: string;
}

export interface ProductRisk {
  id: string;
  product: string;
  liquidity: number; // 1-3
  crossBorder: number; // 1-3
  anonymity: number; // 1-3
  fatfRisk: number; // 1-3
  finalRisk: number;
}

export interface OverrideRule {
  id: string;
  name: string;
  condition: string;
  outcome: RiskLevel;
  reason: string;
  status: Status;
}

export interface WorkflowStage {
  id: string;
  name: string;
  role: string;
  slaDays: number;
  autoEscalation: string;
}

export interface Workflow {
  id: string;
  type: "New Customer Onboarding" | "Periodic Review" | "Trigger Event Review";
  stages: WorkflowStage[];
}

export interface SimulationResult {
  factors: {
    name: string;
    score: number;
    weight: number;
    weightedScore: number;
  }[];
  overridesApplied: string[];
  overallScore: number;
  finalRating: RiskLevel;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  user: string;
  module: string;
  action: string;
  details?: string;
}

export type PermissionLevel = "View" | "Create" | "Edit" | "Approve" | "Delete";

export interface Role {
  id: string;
  name: string;
  permissions: PermissionLevel[];
}

export interface User {
  id: string;
  name: string;
  role: string;
  status: Status;
}

export interface RiskRating {
  id: string;
  minScore: number;
  maxScore: number;
  rating: string;
  color: string;
}

export interface DecisionMatrix {
  id: string;
  rating: string;
  decision: "Approve" | "Review" | "Reject" | "Escalate";
  conditions: string;
}

export interface CustomerAssessment {
  id: string;
  customerId: string;
  cifNumber: string;
  name: string;
  customerType: string;
  segment: string;
  industry: string;
  geography: string;
  finalScore: number;
  riskRating: string;
  decision: string;
  assessmentDate: string;
  status: "Completed" | "Pending" | "Flagged";
}

export interface Dispute {
  id: string;
  customerName: string;
  issueType: string;
  channel: string;
  date: string;
  status: "Pending" | "Under Review" | "Resolved";
}

export interface ChannelPerformance {
  channel: string;
  volume: number;
  avgValue: number;
  successRate: number;
  avgProcessingTime: number;
}

export interface Demographics {
  segment: string;
  percentage: number;
}
