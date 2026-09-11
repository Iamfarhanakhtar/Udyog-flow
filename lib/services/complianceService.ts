import { BusinessProfile, BlueprintPhase, BlueprintStats, BlueprintRequirement, MatchedScheme } from "@/types/compliance";
import { DEMO_BUSINESS_PROFILE } from "@/lib/data/demoBusiness";
import { BLUEPRINT_PHASES, BLUEPRINT_STATS, MATCHED_SCHEMES } from "@/lib/data/blueprintData";

export interface ComplianceService {
  getProfile(): Promise<BusinessProfile | null>;
  saveProfile(profile: BusinessProfile): Promise<void>;
  getBlueprint(profile: BusinessProfile): Promise<{
    phases: BlueprintPhase[];
    stats: BlueprintStats;
    schemes: MatchedScheme[];
  }>;
  getRequirementById(id: string): Promise<BlueprintRequirement | null>;
}

/**
 * Local mock implementation for prototype and Phase 1.
 * Designed to easily transition to FastAPI backend (`/api/blueprint`, `/api/profile`).
 */
class LocalComplianceService implements ComplianceService {
  private profileStorageKey = "udyogflow_business_profile";

  async getProfile(): Promise<BusinessProfile | null> {
    if (typeof window === "undefined") return null;
    const stored = localStorage.getItem(this.profileStorageKey);
    if (!stored) return null;
    try {
      return JSON.parse(stored) as BusinessProfile;
    } catch {
      return null;
    }
  }

  async saveProfile(profile: BusinessProfile): Promise<void> {
    if (typeof window === "undefined") return;
    localStorage.setItem(this.profileStorageKey, JSON.stringify(profile));
  }

  async getBlueprint(profile: BusinessProfile): Promise<{
    phases: BlueprintPhase[];
    stats: BlueprintStats;
    schemes: MatchedScheme[];
  }> {
    // In future: return fetch(`/api/blueprint?profileId=...`)
    return {
      phases: BLUEPRINT_PHASES,
      stats: BLUEPRINT_STATS,
      schemes: MATCHED_SCHEMES,
    };
  }

  async getRequirementById(id: string): Promise<BlueprintRequirement | null> {
    for (const phase of BLUEPRINT_PHASES) {
      const match = phase.requirements.find((r) => r.id === id);
      if (match) return match;
    }
    return null;
  }
}

export const complianceService = new LocalComplianceService();
