import {
  mockCustomerParameters,
  mockRiskFactors,
  mockRiskRatings,
  mockDecisionMatrix,
  mockCustomerAssessments,
  mockAuditLogs,
  mockRoles,
  mockWorkflows,
} from "./cram-mock-data";
import {
  DecisionMatrix,
  CustomerParameter,
  RiskRating,
  RiskFactor,
} from "./cram-types";

/**
 * CRAM API Layer (Simulation)
 * In a production environment, these would be server-side routes fetching from a database.
 * Following REST conventions as requested.
 */

export const cramApi = {
  // Risk Parameters
  getRiskParameters: async () => {
    return mockCustomerParameters;
  },

  createRiskParameter: async (data: Partial<CustomerParameter>) => {
    console.log("POST /risk-parameters", data);
    return { ...data, id: `rp-${Math.random()}`, status: "Pending Approval" };
  },

  updateRiskParameter: async (id: string, data: Partial<CustomerParameter>) => {
    console.log(`PUT /risk-parameters/${id}`, data);
    return { ...data, id, status: "Pending Approval" };
  },

  // Risk Weights
  getRiskWeights: async () => {
    return mockRiskFactors;
  },

  updateRiskWeights: async (weights: RiskFactor[]) => {
    console.log("POST /risk-weights", weights);
    return weights;
  },

  // Risk Ratings
  getRiskRatings: async () => {
    return mockRiskRatings;
  },

  updateRiskRatings: async (ratings: RiskRating[]) => {
    console.log("POST /risk-ratings", ratings);
    return ratings;
  },

  // Decision Matrix
  getDecisionMatrix: async () => {
    return mockDecisionMatrix;
  },

  updateDecisionMatrix: async (matrix: DecisionMatrix[]) => {
    console.log("POST /decision-matrix", matrix);
    return matrix;
  },

  // Risk Assessments
  getAssessments: async (
    _filters?: Record<string, string | number | boolean>,
  ) => {
    return mockCustomerAssessments;
  },

  getAssessmentById: async (id: string) => {
    return mockCustomerAssessments.find((a) => a.id === id);
  },

  // Workflows
  getWorkflows: async () => {
    return mockWorkflows;
  },

  // Audit Logs
  getAuditLogs: async () => {
    return mockAuditLogs;
  },

  // Role Management
  getRoles: async () => {
    return mockRoles;
  },
};
