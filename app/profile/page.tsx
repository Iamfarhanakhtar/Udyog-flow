"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  UserCheck,
  MapPin,
  Building,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  ChevronRight,
  ShieldAlert,
} from "lucide-react";
import { WorkspaceLayout } from "@/components/layout/WorkspaceLayout";
import { useTrack1Store } from "@/state/track1Store";
import { BusinessProfile } from "@/types/track1";

const ENTITY_OPTIONS: ("Sole Proprietorship" | "Partnership" | "LLP" | "Private Limited Company" | "One Person Company")[] = [
  "Sole Proprietorship",
  "Partnership",
  "LLP",
  "Private Limited Company",
  "One Person Company",
];

export default function BusinessProfilePage() {
  const router = useRouter();
  const {
    founderName: storeFounderName,
    businessName: storeBusinessName,
    businessLocation: storeLocation,
    businessCity: storeCity,
    businessState: storeState,
    businessPincode: storePincode,
    businessStructure: storeStructure,
    selectedMicroNiche,
    setBusinessProfile,
  } = useTrack1Store();

  const [founderName, setFounderName] = useState(storeFounderName || "Aarav Sharma");
  const [businessName, setBusinessName] = useState(storeBusinessName || "Aarav's Cloud Kitchen");
  const [businessLocation, setBusinessLocation] = useState(storeLocation || "Shop #4, Link Road, Sector 3");
  const [businessCity, setBusinessCity] = useState(storeCity || "Ghaziabad");
  const [businessState, setBusinessState] = useState(storeState || "Uttar Pradesh");
  const [businessPincode, setBusinessPincode] = useState(storePincode || "201010");
  const [businessStructure, setBusinessStructure] = useState<typeof storeStructure>(storeStructure || "Sole Proprietorship");

  const handleSaveAndBuild = () => {
    setBusinessProfile({
      founderName,
      businessName,
      businessLocation,
      businessCity,
      businessState,
      businessPincode,
      businessStructure,
      macroCategory: "Food Processing & Hospitality",
      microNicheId: selectedMicroNiche.id,
      microNicheTitle: selectedMicroNiche.title,
      hasCompletedProfile: true,
    });

    router.push("/blueprint");
  };

  return (
    <WorkspaceLayout>
      <div className="max-w-4xl mx-auto space-y-space-xl">
        {/* Header */}
        <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm border border-surface-container-high/60">
          <div className="flex items-center gap-space-sm mb-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
              <UserCheck className="w-4 h-4" />
            </div>
            <span className="text-label-sm font-label-sm uppercase font-semibold text-primary tracking-wider">
              Step 3 • Business Context
            </span>
          </div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight">
            Personalize Your Compliance Journey
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant mt-1 leading-relaxed">
            Minimum required details to map state-level FoSCoS rules, municipal health jurisdiction, and tax registrations for your setup.
          </p>
        </div>

        {/* Form & Compact Review Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
          {/* Form Fields (7 cols) */}
          <div className="lg:col-span-7 bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm border border-surface-container-high/60 space-y-space-md">
            <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
              Entity & Location Parameters
            </h3>

            {/* Founder & Business Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
              <div>
                <label className="block text-label-md font-label-md text-on-surface font-medium mb-1.5">
                  Authorized Founder Name
                </label>
                <input
                  type="text"
                  value={founderName}
                  onChange={(e) => setFounderName(e.target.value)}
                  className="w-full px-space-md py-2.5 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md border border-surface-container-high focus:outline-none focus:ring-2 focus:ring-primary-container"
                />
              </div>

              <div>
                <label className="block text-label-md font-label-md text-on-surface font-medium mb-1.5">
                  Commercial Brand / Trading Name
                </label>
                <input
                  type="text"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="w-full px-space-md py-2.5 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md border border-surface-container-high focus:outline-none focus:ring-2 focus:ring-primary-container"
                />
              </div>
            </div>

            {/* Physical Premises Address */}
            <div>
              <label className="block text-label-md font-label-md text-on-surface font-medium mb-1.5">
                Kitchen Premises Street Address (as per Lease)
              </label>
              <input
                type="text"
                value={businessLocation}
                onChange={(e) => setBusinessLocation(e.target.value)}
                className="w-full px-space-md py-2.5 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md border border-surface-container-high focus:outline-none focus:ring-2 focus:ring-primary-container"
                placeholder="Shop #4, Link Road, Sector 3"
              />
              <span className="text-[11px] text-on-surface-variant block mt-1">
                Note: Used to verify consistency against the tenancy deed during the AI Pre-Submission Audit.
              </span>
            </div>

            {/* City, State, Pincode */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-md">
              <div>
                <label className="block text-label-md font-label-md text-on-surface font-medium mb-1.5">
                  City
                </label>
                <input
                  type="text"
                  value={businessCity}
                  onChange={(e) => setBusinessCity(e.target.value)}
                  className="w-full px-space-md py-2 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md border border-surface-container-high focus:outline-none focus:ring-2 focus:ring-primary-container"
                />
              </div>

              <div>
                <label className="block text-label-md font-label-md text-on-surface font-medium mb-1.5">
                  State
                </label>
                <input
                  type="text"
                  value={businessState}
                  onChange={(e) => setBusinessState(e.target.value)}
                  className="w-full px-space-md py-2 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md border border-surface-container-high focus:outline-none focus:ring-2 focus:ring-primary-container"
                />
              </div>

              <div>
                <label className="block text-label-md font-label-md text-on-surface font-medium mb-1.5">
                  PIN Code
                </label>
                <input
                  type="text"
                  value={businessPincode}
                  onChange={(e) => setBusinessPincode(e.target.value)}
                  className="w-full px-space-md py-2 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md border border-surface-container-high focus:outline-none focus:ring-2 focus:ring-primary-container"
                />
              </div>
            </div>

            {/* Entity Structure */}
            <div>
              <label className="block text-label-md font-label-md text-on-surface font-medium mb-2">
                Legal Entity Architecture
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {ENTITY_OPTIONS.map((opt) => {
                  const isSelected = businessStructure === opt;
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setBusinessStructure(opt)}
                      className={`text-left p-2.5 rounded-lg border text-label-sm font-label-sm transition-all flex items-center justify-between cursor-pointer ${
                        isSelected
                          ? "bg-primary text-white border-primary shadow-sm font-semibold"
                          : "bg-surface-container-low border-surface-container-high/60 text-on-surface hover:bg-surface-container"
                      }`}
                    >
                      <span>{opt}</span>
                      {isSelected && <CheckCircle2 className="w-4 h-4 text-white" />}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Compact Review Card (5 cols, sticky) */}
          <div className="lg:col-span-5 bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm border border-surface-container-high/60 space-y-space-md sticky top-20">
            <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold pb-2 border-b border-surface-container-high/50">
              Personalized Configuration
            </h3>

            <div className="space-y-2.5 font-body-sm text-body-sm">
              <div className="flex items-center justify-between py-1.5 px-space-sm rounded-lg bg-surface-container-low">
                <span className="text-on-surface-variant">Niche</span>
                <span className="font-semibold text-on-surface">{selectedMicroNiche.title}</span>
              </div>

              <div className="flex items-center justify-between py-1.5 px-space-sm rounded-lg bg-surface-container-low">
                <span className="text-on-surface-variant">Proprietor</span>
                <span className="font-semibold text-on-surface">{founderName}</span>
              </div>

              <div className="flex items-center justify-between py-1.5 px-space-sm rounded-lg bg-surface-container-low">
                <span className="text-on-surface-variant">Enterprise Name</span>
                <span className="font-semibold text-on-surface truncate max-w-[180px]">{businessName}</span>
              </div>

              <div className="flex items-center justify-between py-1.5 px-space-sm rounded-lg bg-surface-container-low">
                <span className="text-on-surface-variant">Jurisdiction</span>
                <span className="font-semibold text-on-surface">
                  {businessCity}, {businessState} ({businessPincode})
                </span>
              </div>

              <div className="flex items-center justify-between py-1.5 px-space-sm rounded-lg bg-surface-container-low">
                <span className="text-on-surface-variant">Entity Type</span>
                <span className="font-semibold text-on-surface">{businessStructure}</span>
              </div>
            </div>

            <div className="p-space-sm rounded-xl bg-surface-container-low text-[12px] text-on-surface-variant flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <span>
                Personalized blueprint will synthesize 8 progressive stages from Identity to Single-Window handoff.
              </span>
            </div>

            {/* Primary Action Button */}
            <button
              type="button"
              onClick={handleSaveAndBuild}
              className="w-full py-3 px-space-lg rounded-xl bg-primary-container hover:bg-primary text-white font-label-md text-label-md font-bold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
            >
              <span>Build My Blueprint</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </WorkspaceLayout>
  );
}
