export interface MicroNiche {
  id: string;
  title: string;
  category: string;
  description: string;
  iconName: string;
  estimatedSetupDays: number;
  initialCapexRange: string;
  primaryActionLabel: string;
  isFullySupported: boolean; // Only Cloud Kitchen is true for Track-1
  highlights: string[];
}

export type JourneyStageState =
  | "Not started"
  | "In progress"
  | "Ready"
  | "Needs attention"
  | "Complete";

export interface JourneyStage {
  id: string;
  title: string;
  category: "Profile" | "Identity" | "Premises" | "Utilities" | "Food Safety" | "Municipal" | "Fire" | "Application";
  description: string;
  state: JourneyStageState;
  authority: string;
  slaDays?: number;
  dependencies: string[];
  actionLabel: string;
  actionHref: string;
  documentsRequired: string[];
  notes?: string;
}

export interface NicheBlueprint {
  nicheId: string;
  nicheTitle: string;
  macroCategory: string;
  overview: string;
  requiredApprovals: {
    id: string;
    title: string;
    authority: string;
    type: string;
    sla: string;
  }[];
  documentDependencies: {
    from: string;
    to: string;
    relation: string;
  }[];
  governmentSchemes: {
    id: string;
    name: string;
    benefit: string;
    agency: string;
  }[];
  recommendedNextStep: string;
  stages: JourneyStage[];
}

export interface BusinessProfile {
  founderName: string;
  businessName: string;
  macroCategory: string;
  microNicheId: string;
  microNicheTitle: string;
  businessLocation: string; // Street/Shop address
  businessCity: string;
  businessState: string;
  businessPincode: string;
  businessStructure: "Sole Proprietorship" | "Partnership" | "LLP" | "Private Limited Company" | "One Person Company";
  hasCompletedProfile: boolean;
}

export type DocumentState =
  | "Uploaded"
  | "Available"
  | "Connected"
  | "Needs review"
  | "Missing";

export interface VaultDocument {
  id: string;
  title: string;
  category: "Identity" | "Premises" | "Utilities" | "Compliance";
  state: DocumentState;
  source: string; // e.g., "DigiLocker Gateway", "Uploaded Document", "Tata Power API"
  extractedValue?: string;
  documentNumber?: string;
  uploadDate?: string;
  dependencies: string[]; // Document or requirement IDs this document enables
  notes?: string;
}

export interface DependencyNode {
  id: string;
  label: string;
  category: string;
  state: DocumentState | JourneyStageState;
  children?: DependencyNode[];
}

export interface FormField {
  id: string;
  label: string;
  required: boolean;
  type: "text" | "textarea" | "select";
  currentValue: string;
  suggestedValue: string;
  sourceDocumentId: string;
  sourceDocumentName: string;
  hasMismatch: boolean;
  options?: string[];
}

export interface FormSchema {
  formId: string;
  formTitle: string;
  issuingAuthority: string;
  fields: FormField[];
}

export interface AuditIssue {
  field: string;
  formValue: string;
  sourceDocument: string;
  sourceValue: string;
  severity: "info" | "warning" | "critical";
  recommendation: string;
  isResolved?: boolean;
}

export interface AuditResult {
  status: "passed" | "issues_detected";
  statusText: string;
  checksCompleted: number;
  checksPassed: number;
  issues: AuditIssue[];
  readyForSubmission: boolean;
}
