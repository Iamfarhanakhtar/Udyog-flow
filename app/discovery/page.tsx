"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Compass,
  ArrowRight,
  Sparkles,
  Utensils,
  Milk,
  Wine,
  Snowflake,
  ChefHat,
  CheckCircle2,
  Clock,
  Coins,
  ShieldCheck,
  FileText,
  AlertCircle,
  X,
  Plus,
} from "lucide-react";
import { WorkspaceLayout } from "@/components/layout/WorkspaceLayout";
import { useTrack1Store } from "@/state/track1Store";
import { MicroNiche } from "@/types/track1";

export default function DiscoveryPage() {
  const router = useRouter();
  const {
    allMicroniches,
    selectedMacroNiche,
    selectMicroNiche,
    blueprint,
  } = useTrack1Store();

  const [activeNicheForModal, setActiveNicheForModal] = useState<MicroNiche | null>(null);
  const [showAddedConfirmation, setShowAddedConfirmation] = useState(false);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "cake":
        return <Utensils className="w-6 h-6 text-primary" />;
      case "milk":
        return <Milk className="w-6 h-6 text-primary" />;
      case "cup-soda":
        return <Wine className="w-6 h-6 text-primary" />;
      case "snowflake":
        return <Snowflake className="w-6 h-6 text-primary" />;
      case "chef-hat":
      default:
        return <ChefHat className="w-6 h-6 text-primary" />;
    }
  };

  const handleExplore = (niche: MicroNiche) => {
    selectMicroNiche(niche);
    setActiveNicheForModal(niche);
  };

  const handleAddToProfile = () => {
    setShowAddedConfirmation(true);
    setTimeout(() => {
      router.push("/profile");
    }, 800);
  };

  return (
    <WorkspaceLayout>
      <div className="space-y-space-xl max-w-6xl mx-auto">
        {/* Header Lead-in */}
        <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm border border-surface-container-high/60">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-md">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-label-sm font-semibold mb-2">
                <Compass className="w-3.5 h-3.5" />
                <span>Sector Discovery Engine</span>
              </div>
              <h1 className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight">
                {selectedMacroNiche}
              </h1>
              <p className="font-body-md text-body-md text-on-surface-variant mt-1 max-w-2xl leading-relaxed">
                Select a high-growth micro-niche to view its statutory clearance timeline, mandatory licenses, document dependency chains, and credit subsidies.
              </p>
            </div>

            <div className="p-space-sm bg-surface-container-low rounded-xl border border-surface-container-high/50 text-right self-start sm:self-center">
              <span className="text-[10px] uppercase font-bold text-outline tracking-wider block">
                Track-1 Focus Niche
              </span>
              <span className="font-label-md text-label-md font-bold text-primary flex items-center gap-1 mt-0.5">
                <ChefHat className="w-4 h-4 text-primary" />
                <span>Cloud Kitchen (Active)</span>
              </span>
            </div>
          </div>
        </div>

        {/* 5 Micro-Niches Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-md">
          {allMicroniches.map((niche) => {
            const isCloudKitchen = niche.id === "cloud-kitchen";

            return (
              <div
                key={niche.id}
                className={`rounded-2xl p-space-lg transition-all flex flex-col justify-between border ${
                  isCloudKitchen
                    ? "bg-surface-container-lowest border-primary-container ring-1 ring-primary-container shadow-sm hover:shadow-md"
                    : "bg-surface-container-lowest border-surface-container-high/70 hover:border-outline-variant hover:shadow-sm"
                }`}
              >
                <div>
                  {/* Top Bar: Icon & Support Badge */}
                  <div className="flex items-center justify-between mb-space-md">
                    <div className="w-12 h-12 rounded-xl bg-surface-container-low flex items-center justify-center border border-surface-container-high/40">
                      {getIcon(niche.iconName)}
                    </div>
                    {isCloudKitchen ? (
                      <span className="px-2.5 py-0.5 rounded-full bg-secondary-container/80 text-on-secondary-container font-label-sm text-[11px] font-bold">
                        Full Track-1 Flow
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant font-label-sm text-[11px] font-medium">
                        Spec Preview
                      </span>
                    )}
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                    {niche.title}
                  </h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-1.5 leading-relaxed min-h-[48px]">
                    {niche.description}
                  </p>

                  {/* Setup Preview Metrics */}
                  <div className="mt-space-md pt-space-sm border-t border-surface-container-high/40 grid grid-cols-2 gap-space-xs text-body-sm">
                    <div className="flex items-center gap-1.5 text-on-surface-variant">
                      <Clock className="w-3.5 h-3.5 text-outline shrink-0" />
                      <span className="text-[12px]">~{niche.estimatedSetupDays} Days Setup</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-on-surface-variant">
                      <Coins className="w-3.5 h-3.5 text-outline shrink-0" />
                      <span className="text-[12px]">{niche.initialCapexRange} Capex</span>
                    </div>
                  </div>

                  {/* Key Highlights */}
                  <div className="mt-space-sm space-y-1">
                    {niche.highlights.map((h, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-label-sm text-[11px] text-on-surface-variant">
                        <CheckCircle2 className="w-3 h-3 text-secondary shrink-0" />
                        <span className="truncate">{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Primary Action Button */}
                <div className="mt-space-lg pt-space-xs">
                  <button
                    type="button"
                    onClick={() => handleExplore(niche)}
                    className={`w-full py-2.5 px-space-md rounded-xl font-label-md text-label-md font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      isCloudKitchen
                        ? "bg-primary-container text-white hover:bg-primary shadow-sm active:scale-98"
                        : "bg-surface-container text-on-surface hover:bg-surface-container-high"
                    }`}
                  >
                    <span>{niche.primaryActionLabel}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Niche Blueprint Modal / Spec View */}
        {activeNicheForModal && (
          <div className="fixed inset-0 bg-on-surface/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-surface-container-lowest rounded-2xl p-space-xl max-w-3xl w-full shadow-2xl border border-surface-container-high max-h-[90vh] overflow-y-auto space-y-space-lg">
              {/* Modal Header */}
              <div className="flex items-center justify-between pb-space-xs border-b border-surface-container-high/60">
                <div className="flex items-center gap-space-sm">
                  <div className="w-10 h-10 rounded-xl bg-primary-container/10 flex items-center justify-center text-primary">
                    {getIcon(activeNicheForModal.iconName)}
                  </div>
                  <div>
                    <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                      {activeNicheForModal.title} Blueprint
                    </h2>
                    <span className="text-body-sm text-[12px] text-on-surface-variant">
                      {activeNicheForModal.category} • Statutory Roadmap Preview
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveNicheForModal(null)}
                  className="p-1.5 rounded-lg text-outline hover:text-on-surface hover:bg-surface-container transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Supported vs Preview Disclaimer */}
              {!activeNicheForModal.isFullySupported ? (
                <div className="p-space-md rounded-xl bg-tertiary-container/30 border border-tertiary-container/60 flex items-start gap-space-sm">
                  <AlertCircle className="w-5 h-5 text-tertiary shrink-0 mt-0.5" />
                  <div className="text-body-sm text-on-surface">
                    <span className="font-bold block text-tertiary">Track-1 Architectural Scope</span>
                    <p className="mt-0.5">
                      In Track-1, <strong>Cloud Kitchen</strong> is the active, fully connected end-to-end workflow (Vault → Form Co-Pilot → AI Audit). The blueprint below is an architectural reference for {activeNicheForModal.title}.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="p-space-md rounded-xl bg-secondary-container/40 border border-secondary-container/60 flex items-start gap-space-sm">
                  <Sparkles className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                  <div className="text-body-sm text-on-surface">
                    <span className="font-bold block text-secondary">Verified Track-1 Workflow</span>
                    <p className="mt-0.5">
                      Cloud Kitchen includes live dependency vaulting, FSSAI Form Co-Pilot, and the AI Pre-Submission Audit demo.
                    </p>
                  </div>
                </div>
              )}

              {/* 1. Overview */}
              <div>
                <h4 className="font-label-md text-label-md text-outline uppercase tracking-wider font-semibold mb-1">
                  1. Overview
                </h4>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed bg-surface-container-low p-space-md rounded-xl">
                  {blueprint.overview}
                </p>
              </div>

              {/* 2. Required Approvals */}
              <div>
                <h4 className="font-label-md text-label-md text-outline uppercase tracking-wider font-semibold mb-2">
                  2. Required Statutory Approvals
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-xs">
                  {blueprint.requiredApprovals.map((app) => (
                    <div
                      key={app.id}
                      className="p-space-sm rounded-xl bg-surface-container-low border border-surface-container-high/40 flex flex-col justify-between"
                    >
                      <div>
                        <span className="font-label-md text-label-md text-on-surface font-semibold block">
                          {app.title}
                        </span>
                        <span className="text-[12px] text-on-surface-variant block mt-0.5">
                          {app.authority}
                        </span>
                      </div>
                      <div className="mt-2 flex items-center justify-between text-[11px] text-outline pt-1 border-t border-surface-container-high/30">
                        <span>{app.type}</span>
                        <span className="font-semibold text-primary">{app.sla}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 3. Document Dependencies */}
              <div>
                <h4 className="font-label-md text-label-md text-outline uppercase tracking-wider font-semibold mb-2">
                  3. Core Document Dependency Flow
                </h4>
                <div className="p-space-md rounded-xl bg-surface-container-low space-y-2">
                  {blueprint.documentDependencies.map((dep, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-body-sm text-body-sm text-on-surface">
                      <span className="font-medium text-primary bg-surface-container px-2 py-0.5 rounded text-[12px]">
                        {dep.from}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-outline shrink-0" />
                      <span className="font-medium text-on-surface bg-surface-container px-2 py-0.5 rounded text-[12px]">
                        {dep.to}
                      </span>
                      <span className="text-on-surface-variant text-[11px] ml-auto hidden sm:inline">
                        ({dep.relation})
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 4. Government Schemes */}
              <div>
                <h4 className="font-label-md text-label-md text-outline uppercase tracking-wider font-semibold mb-2">
                  4. Mapped Financial & Credit Subsidies
                </h4>
                <div className="space-y-1.5">
                  {blueprint.governmentSchemes.map((s) => (
                    <div key={s.id} className="p-space-sm rounded-xl bg-surface-container-low text-body-sm">
                      <span className="font-semibold text-on-surface block text-label-md">{s.name}</span>
                      <span className="text-on-surface-variant text-[12px] block mt-0.5">{s.benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 5. Recommended Next Step & CTA */}
              <div className="pt-space-md border-t border-surface-container-high/60 flex flex-col sm:flex-row sm:items-center justify-between gap-space-md">
                <div className="text-body-sm text-on-surface-variant">
                  <span className="font-semibold text-on-surface block">Next Recommended Step</span>
                  <span>{blueprint.recommendedNextStep}</span>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => setActiveNicheForModal(null)}
                    className="px-space-md py-2.5 rounded-xl bg-surface-container text-on-surface font-label-md text-label-md hover:bg-surface-container-high transition-colors cursor-pointer"
                  >
                    Close
                  </button>

                  <button
                    type="button"
                    onClick={handleAddToProfile}
                    className="px-space-lg py-2.5 rounded-xl bg-primary-container hover:bg-primary text-white font-label-md text-label-md font-bold shadow-md transition-all flex items-center gap-2 cursor-pointer active:scale-98"
                  >
                    <Plus className="w-4 h-4" />
                    <span>+ Add to Profile</span>
                  </button>
                </div>
              </div>

              {/* Confirmation Toast */}
              {showAddedConfirmation && (
                <div className="p-space-sm rounded-xl bg-secondary-container text-on-secondary-container text-center font-label-md text-label-md font-semibold animate-fade-in">
                  ✓ Cloud Kitchen added to your profile! Redirecting to Business Context...
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </WorkspaceLayout>
  );
}
