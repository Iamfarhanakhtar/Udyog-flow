export type BusinessCategory =
  | "Food & Beverage"
  | "Manufacturing"
  | "Retail & E-commerce"
  | "Services"
  | "Healthcare"
  | "Construction & Real Estate"
  | "Education"
  | "Logistics & Transportation"
  | "Agriculture & Agri-business"
  | "Other";

export type EntityType =
  | "Sole Proprietorship"
  | "Partnership"
  | "LLP"
  | "Private Limited Company"
  | "One Person Company"
  | "Other";

export type BusinessStage =
  | "Just exploring"
  | "Planning to start"
  | "Already operating"
  | "Expanding";

export interface BusinessProfile {
  businessName: string;
  category: BusinessCategory;
  microNiche: string;
  state: string;
  city: string;
  district?: string;
  pinCode: string;
  entityType: EntityType;
  businessStage: BusinessStage;
  jurisdictionLabel?: string;
  modelLabel?: string;
}

export type RequirementStatus = "Verified" | "Action Needed" | "Processing" | "Locked";

export type PhaseId = "foundation" | "premises" | "operating" | "tax";

export interface RequirementDocument {
  id: string;
  name: string;
  status: "verified" | "action_needed" | "missing";
  note?: string;
}

export interface BlueprintRequirement {
  id: string;
  code: string;
  title: string;
  authority: string;
  phaseId: PhaseId;
  phaseName: string;
  stageNumber: string; // e.g. "STAGE 1", "STAGE 2", "STAGE 3", "STAGE 4"
  status: RequirementStatus;
  statusLabel?: string;
  slaDays: number;
  cost?: string;
  prerequisites: string[];
  documents: RequirementDocument[];
  dependenciesDescription?: string;
  statutoryRule?: string;
  nextAction: {
    label: string;
    path?: string;
    actionType: "open_form" | "upload" | "view_status" | "external";
  };
  summary: string;
}

export interface BlueprintPhase {
  id: PhaseId;
  stageNumber: string;
  name: string;
  description: string;
  requirements: BlueprintRequirement[];
}

export interface BlueprintStats {
  readinessPercentage: number;
  clearedCount: number;
  actionNeededCount: number;
  processingCount: number;
  lockedCount: number;
  totalRequirements: number;
  estimatedClearanceDays: number;
  slaBenchmarkingText: string;
}

export interface MatchedScheme {
  id: string;
  title: string;
  type: string;
  matchLevel: "High Match" | "Moderate Match" | "Unlocks on Completion";
  benefitTitle: string;
  benefitDescription: string;
  qualifications: { label: string; passed: boolean }[];
  authority: string;
  ctaText: string;
}
