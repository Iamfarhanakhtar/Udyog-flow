"use client";

import React, { createContext, useContext, useEffect, useState, useMemo } from "react";
import {
  BusinessProfile,
  BlueprintPhase,
  BlueprintStats,
  BlueprintRequirement,
  MatchedScheme,
} from "@/types/compliance";
import { DEMO_BUSINESS_PROFILE } from "@/lib/data/demoBusiness";
import { BLUEPRINT_PHASES, BLUEPRINT_STATS, MATCHED_SCHEMES } from "@/lib/data/blueprintData";
import { complianceService } from "@/lib/services/complianceService";

interface BusinessContextType {
  profile: BusinessProfile | null;
  hasCompletedOnboarding: boolean;
  isLoaded: boolean;
  selectedRequirementId: string;
  selectedRequirement: BlueprintRequirement | null;
  phases: BlueprintPhase[];
  stats: BlueprintStats;
  schemes: MatchedScheme[];
  setSelectedRequirementId: (id: string) => void;
  updateProfile: (profile: BusinessProfile) => Promise<void>;
  resetToDemo: () => Promise<void>;
  clearProfile: () => void;
  simulateGeneration: () => Promise<void>;
}

const BusinessContext = createContext<BusinessContextType | undefined>(undefined);

export function BusinessProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<BusinessProfile | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedRequirementId, setSelectedRequirementId] = useState<string>("req-fssai");

  useEffect(() => {
    async function loadInitialProfile() {
      const stored = await complianceService.getProfile();
      if (stored) {
        setProfile(stored);
      }
      setIsLoaded(true);
    }
    loadInitialProfile();
  }, []);

  const updateProfile = async (newProfile: BusinessProfile) => {
    setProfile(newProfile);
    await complianceService.saveProfile(newProfile);
  };

  const resetToDemo = async () => {
    setProfile(DEMO_BUSINESS_PROFILE);
    await complianceService.saveProfile(DEMO_BUSINESS_PROFILE);
  };

  const clearProfile = () => {
    setProfile(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem("udyogflow_business_profile");
    }
  };

  const simulateGeneration = async () => {
    // 1.5 second simulated delay as requested in specification
    await new Promise((resolve) => setTimeout(resolve, 1500));
  };

  const phases = BLUEPRINT_PHASES;
  const stats = BLUEPRINT_STATS;
  const schemes = MATCHED_SCHEMES;

  const selectedRequirement = useMemo(() => {
    for (const phase of phases) {
      const found = phase.requirements.find((r) => r.id === selectedRequirementId);
      if (found) return found;
    }
    return phases[2]?.requirements[0] || null; // default to FSSAI
  }, [phases, selectedRequirementId]);

  const hasCompletedOnboarding = Boolean(profile?.businessName && profile?.microNiche);

  return (
    <BusinessContext.Provider
      value={{
        profile,
        hasCompletedOnboarding,
        isLoaded,
        selectedRequirementId,
        selectedRequirement,
        phases,
        stats,
        schemes,
        setSelectedRequirementId,
        updateProfile,
        resetToDemo,
        clearProfile,
        simulateGeneration,
      }}
    >
      {children}
    </BusinessContext.Provider>
  );
}

export function useBusiness() {
  const context = useContext(BusinessContext);
  if (!context) {
    throw new Error("useBusiness must be used within a BusinessProvider");
  }
  return context;
}
