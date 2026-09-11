import { create } from "zustand";
import {
  MicroNiche,
  NicheBlueprint,
  BusinessProfile,
  VaultDocument,
  FormSchema,
  AuditResult,
} from "@/types/track1";
import { MOCK_MICRO_NICHES, MOCK_CLOUD_KITCHEN_BLUEPRINT } from "@/lib/api/niches";
import { MOCK_VAULT_DOCUMENTS } from "@/lib/api/vault";
import { MOCK_FSSAI_FORM_SCHEMA } from "@/lib/api/forms";
import { runPreSubmissionAudit } from "@/lib/api/audit";

interface Track1State {
  // 1. Discovery
  selectedMacroNiche: string;
  selectedMicroNiche: MicroNiche;
  allMicroniches: MicroNiche[];

  // 2. Business Context (Persona: Aarav Sharma, Ghaziabad, UP)
  founderName: string;
  businessName: string;
  businessLocation: string;
  businessCity: string;
  businessState: string;
  businessPincode: string;
  businessStructure: "Sole Proprietorship" | "Partnership" | "LLP" | "Private Limited Company" | "One Person Company";
  hasCompletedProfile: boolean;

  // 3. Blueprint
  blueprint: NicheBlueprint;

  // 4. Document Dependency Vault
  vaultDocuments: VaultDocument[];

  // 5. Form Co-Pilot
  activeForm: FormSchema;
  formValues: Record<string, string>;

  // 6. AI Pre-Submission Audit
  auditResult: AuditResult;
  isAuditing: boolean;

  // Navigation / Step Tracker
  currentStep: "discovery" | "niche-blueprint" | "profile" | "blueprint" | "vault" | "forms" | "audit";

  // Actions
  selectMicroNiche: (niche: MicroNiche) => void;
  setBusinessProfile: (profile: Partial<BusinessProfile>) => void;
  updateFormField: (fieldId: string, value: string) => void;
  copyValueToField: (fieldId: string, suggestedValue: string) => void;
  fixAddressMismatch: () => Promise<void>;
  triggerAudit: () => Promise<void>;
  resetToDefaultDemo: () => void;
}

const DEFAULT_PROFILE: BusinessProfile = {
  founderName: "Aarav Sharma",
  businessName: "Aarav's Cloud Kitchen",
  macroCategory: "Food Processing & Hospitality",
  microNicheId: "cloud-kitchen",
  microNicheTitle: "Cloud Kitchen",
  businessLocation: "Shop #4, Link Road, Sector 3",
  businessCity: "Ghaziabad",
  businessState: "Uttar Pradesh",
  businessPincode: "201010",
  businessStructure: "Sole Proprietorship",
  hasCompletedProfile: true,
};

// Initial form values from FSSAI schema (with deliberate address mismatch for demo)
const initialFormValues: Record<string, string> = {};
MOCK_FSSAI_FORM_SCHEMA.fields.forEach((f) => {
  initialFormValues[f.id] = f.currentValue;
});

export const useTrack1Store = create<Track1State>((set, get) => ({
  selectedMacroNiche: "Food Processing & Hospitality",
  selectedMicroNiche: MOCK_MICRO_NICHES.find((n) => n.id === "cloud-kitchen") || MOCK_MICRO_NICHES[4],
  allMicroniches: MOCK_MICRO_NICHES,

  founderName: DEFAULT_PROFILE.founderName,
  businessName: DEFAULT_PROFILE.businessName,
  businessLocation: DEFAULT_PROFILE.businessLocation,
  businessCity: DEFAULT_PROFILE.businessCity,
  businessState: DEFAULT_PROFILE.businessState,
  businessPincode: DEFAULT_PROFILE.businessPincode,
  businessStructure: DEFAULT_PROFILE.businessStructure,
  hasCompletedProfile: false, // User starts from discovery or can view profile

  blueprint: MOCK_CLOUD_KITCHEN_BLUEPRINT,
  vaultDocuments: MOCK_VAULT_DOCUMENTS,
  activeForm: MOCK_FSSAI_FORM_SCHEMA,
  formValues: initialFormValues,

  auditResult: {
    status: "issues_detected",
    statusText: "Potential consistency issue detected",
    checksCompleted: 12,
    checksPassed: 11,
    issues: [
      {
        field: "Operational Kitchen Premises Address",
        formValue: "Shop #4-A, Link Road, Sector 3, Ghaziabad, Uttar Pradesh",
        sourceDocument: "Commercial Tenancy Lease Deed",
        sourceValue: "Shop #4, Link Road, Sector 3, Ghaziabad, Uttar Pradesh - 201010",
        severity: "warning",
        recommendation: "Use the address from the Lease Agreement consistently to prevent physical inspection delays.",
        isResolved: false,
      },
    ],
    readyForSubmission: false,
  },
  isAuditing: false,
  currentStep: "discovery",

  selectMicroNiche: (niche) => {
    set({
      selectedMicroNiche: niche,
      businessName: `${get().founderName}'s ${niche.title}`,
    });
  },

  setBusinessProfile: (profile) => {
    set((state) => ({
      ...state,
      ...profile,
      hasCompletedProfile: true,
    }));
  },

  updateFormField: (fieldId, value) => {
    set((state) => {
      const newFormValues = { ...state.formValues, [fieldId]: value };
      // Check if address field was updated
      const updatedFields = state.activeForm.fields.map((f) => {
        if (f.id === fieldId) {
          return {
            ...f,
            currentValue: value,
            hasMismatch: f.id === "field-address" && value.includes("Shop #4-A"),
          };
        }
        return f;
      });

      return {
        formValues: newFormValues,
        activeForm: {
          ...state.activeForm,
          fields: updatedFields,
        },
      };
    });
  },

  copyValueToField: (fieldId, suggestedValue) => {
    get().updateFormField(fieldId, suggestedValue);
  },

  fixAddressMismatch: async () => {
    set({ isAuditing: true });
    const correctAddress = "Shop #4, Link Road, Sector 3, Ghaziabad, Uttar Pradesh - 201010";

    // Update form field
    get().updateFormField("field-address", correctAddress);

    // Re-run audit
    const newAudit = await runPreSubmissionAudit(correctAddress, correctAddress);

    set({
      auditResult: newAudit,
      isAuditing: false,
    });
  },

  triggerAudit: async () => {
    set({ isAuditing: true });
    const currentAddress = get().formValues["field-address"] || "";
    const result = await runPreSubmissionAudit(currentAddress);
    set({ auditResult: result, isAuditing: false });
  },

  resetToDefaultDemo: () => {
    const initialValues: Record<string, string> = {};
    MOCK_FSSAI_FORM_SCHEMA.fields.forEach((f) => {
      initialValues[f.id] = f.currentValue;
    });

    set({
      selectedMacroNiche: "Food Processing & Hospitality",
      selectedMicroNiche: MOCK_MICRO_NICHES[4],
      founderName: DEFAULT_PROFILE.founderName,
      businessName: DEFAULT_PROFILE.businessName,
      businessLocation: DEFAULT_PROFILE.businessLocation,
      businessCity: DEFAULT_PROFILE.businessCity,
      businessState: DEFAULT_PROFILE.businessState,
      businessPincode: DEFAULT_PROFILE.businessPincode,
      businessStructure: DEFAULT_PROFILE.businessStructure,
      hasCompletedProfile: true,
      blueprint: MOCK_CLOUD_KITCHEN_BLUEPRINT,
      vaultDocuments: MOCK_VAULT_DOCUMENTS,
      activeForm: MOCK_FSSAI_FORM_SCHEMA,
      formValues: initialValues,
      auditResult: {
        status: "issues_detected",
        statusText: "Potential consistency issue detected",
        checksCompleted: 12,
        checksPassed: 11,
        issues: [
          {
            field: "Operational Kitchen Premises Address",
            formValue: "Shop #4-A, Link Road, Sector 3, Ghaziabad, Uttar Pradesh",
            sourceDocument: "Commercial Tenancy Lease Deed",
            sourceValue: "Shop #4, Link Road, Sector 3, Ghaziabad, Uttar Pradesh - 201010",
            severity: "warning",
            recommendation: "Use the address from the Lease Agreement consistently to prevent physical inspection delays.",
            isResolved: false,
          },
        ],
        readyForSubmission: false,
      },
    });
  },
}));
