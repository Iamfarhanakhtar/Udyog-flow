"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  GitBranch,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Lock,
  ChevronRight,
  FileEdit,
  FolderOpen,
  Sparkles,
  MapPin,
  ChefHat,
  ShieldCheck,
  FileText,
} from "lucide-react";
import { WorkspaceLayout } from "@/components/layout/WorkspaceLayout";
import { useTrack1Store } from "@/state/track1Store";
import { JourneyStage, JourneyStageState } from "@/types/track1";

export default function BlueprintDashboardPage() {
  const {
    businessName,
    businessCity,
    businessState,
    businessLocation,
    blueprint,
    auditResult,
  } = useTrack1Store();

  const [selectedStageId, setSelectedStageId] = useState<string>("stage-food-safety");

  const stages = blueprint.stages;
  const selectedStage = stages.find((s) => s.id === selectedStageId) || stages[4];

  const renderStateBadge = (state: JourneyStageState) => {
    switch (state) {
      case "Complete":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-secondary-container/80 text-on-secondary-container text-label-sm font-semibold">
            <CheckCircle2 className="w-3 h-3 text-secondary" />
            <span>Complete</span>
          </span>
        );
      case "Ready":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-label-sm font-semibold">
            <Sparkles className="w-3 h-3 text-primary" />
            <span>Ready</span>
          </span>
        );
      case "Needs attention":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-tertiary-container/70 text-on-tertiary-container text-label-sm font-semibold">
            <AlertTriangle className="w-3 h-3 text-tertiary" />
            <span>Needs attention</span>
          </span>
        );
      case "In progress":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-surface-container-high text-on-surface text-label-sm font-medium">
            <Clock className="w-3 h-3 text-outline" />
            <span>In progress</span>
          </span>
        );
      case "Not started":
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-surface-container text-outline text-label-sm font-medium">
            <Lock className="w-3 h-3 text-outline" />
            <span>Not started</span>
          </span>
        );
    }
  };

  return (
    <WorkspaceLayout>
      <div className="space-y-space-xl max-w-6xl mx-auto">
        {/* Top Header Card */}
        <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm border border-surface-container-high/60">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="px-2.5 py-0.5 rounded bg-primary-fixed text-on-primary-fixed font-label-sm text-[11px] uppercase tracking-wider font-semibold">
                  Setup Roadmap
                </span>
                <span className="text-outline-variant">•</span>
                <span className="font-label-sm text-secondary flex items-center gap-1 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></span>
                  Personalized for {businessCity}, {businessState}
                </span>
              </div>

              <h1 className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight">
                {businessName}: Compliance Journey
              </h1>

              <div className="flex flex-wrap items-center gap-x-space-md gap-y-1 text-body-sm text-on-surface-variant mt-1">
                <div className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-outline" />
                  <span>{businessLocation}, {businessCity}</span>
                </div>
                <span className="text-outline-variant">•</span>
                <div className="flex items-center gap-1">
                  <ChefHat className="w-3.5 h-3.5 text-outline" />
                  <span>Delivery Commercial Kitchen (FoSCoS Schedule 1)</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-space-sm self-start lg:self-center shrink-0">
              <Link
                href="/vault"
                className="flex items-center gap-1.5 px-space-md py-2 rounded-xl bg-surface-container text-on-surface font-label-md text-label-md hover:bg-surface-container-high transition-colors font-medium"
              >
                <FolderOpen className="w-4 h-4 text-outline" />
                <span>Document Vault</span>
              </Link>

              <Link
                href="/forms"
                className="flex items-center gap-1.5 px-space-md py-2 rounded-xl bg-primary-container text-white font-label-md text-label-md hover:bg-primary transition-all font-bold shadow-sm active:scale-98"
              >
                <FileEdit className="w-4 h-4" />
                <span>Open Form Co-Pilot</span>
              </Link>
            </div>
          </div>

          {/* Prominent "What do I need to do next?" Card */}
          <div className="mt-space-md p-space-md rounded-xl bg-primary-fixed/20 border border-primary-container/30 flex flex-col sm:flex-row sm:items-center justify-between gap-space-md">
            <div className="flex items-start gap-space-sm">
              <div className="w-9 h-9 rounded-lg bg-primary-container text-white flex items-center justify-center shrink-0 mt-0.5">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <span className="font-label-sm text-[11px] text-primary uppercase font-bold tracking-wider block">
                  What do I need to do next?
                </span>
                <h3 className="font-label-lg text-label-lg text-on-surface font-bold mt-0.5">
                  Resolve Address Discrepancy & Run Pre-Submission Audit
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                  Your FSSAI Form B draft contains an address mismatch with the registered lease deed. Run the AI Audit to synchronize before filing.
                </p>
              </div>
            </div>

            <Link
              href="/audit"
              className="px-space-md py-2 rounded-xl bg-primary-container text-white font-label-md text-label-md font-bold hover:bg-primary transition-all flex items-center gap-2 shrink-0 self-start sm:self-center"
            >
              <span>View Audit Discrepancy</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Setup Journey Stages & Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-start">
          {/* Left: Journey Stages (7 cols) */}
          <div className="lg:col-span-7 space-y-space-xs">
            <div className="flex items-center justify-between pb-space-xs mb-space-xs border-b border-surface-container-high/60">
              <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                Sequential Compliance Stages
              </h2>
              <span className="text-body-sm text-on-surface-variant text-[12px]">
                {stages.length} Milestones
              </span>
            </div>

            <div className="space-y-2">
              {stages.map((stage, idx) => {
                const isSelected = stage.id === selectedStageId;

                return (
                  <div
                    key={stage.id}
                    onClick={() => setSelectedStageId(stage.id)}
                    className={`p-space-md rounded-xl cursor-pointer transition-all border ${
                      isSelected
                        ? "bg-surface-container-lowest border-primary-container ring-1 ring-primary-container shadow-sm"
                        : "bg-surface-container-lowest border-surface-container-high/70 hover:border-outline-variant hover:bg-surface-container-low"
                    }`}
                  >
                    <div className="flex items-start sm:items-center justify-between gap-space-sm">
                      <div className="flex items-center gap-space-sm">
                        <div className="w-7 h-7 rounded-lg bg-surface-container flex items-center justify-center font-bold text-label-sm text-on-surface shrink-0">
                          {idx + 1}
                        </div>
                        <div>
                          <span className="font-label-md text-label-md text-on-surface font-semibold block">
                            {stage.title}
                          </span>
                          <span className="text-body-sm text-body-sm text-on-surface-variant">
                            {stage.authority}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-space-sm shrink-0">
                        {renderStateBadge(stage.state)}
                        <ChevronRight
                          className={`w-4 h-4 transition-transform ${
                            isSelected ? "text-primary translate-x-0.5" : "text-outline"
                          }`}
                        />
                      </div>
                    </div>

                    {stage.notes && (
                      <div className="mt-2 pt-2 border-t border-surface-container-high/40 text-[12px] text-tertiary flex items-center gap-1.5">
                        <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                        <span className="truncate">{stage.notes}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Stage Inspector / Progressive Disclosure (5 cols, sticky) */}
          <div className="lg:col-span-5 bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm border border-surface-container-high/60 space-y-space-md sticky top-20">
            <div className="flex items-center justify-between pb-space-xs border-b border-surface-container-high/50">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-primary" />
                <span className="text-label-sm uppercase font-bold text-outline tracking-wider">
                  Stage Details
                </span>
              </div>
              {renderStateBadge(selectedStage.state)}
            </div>

            <div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                {selectedStage.title}
              </h3>
              <span className="text-body-sm text-primary font-medium block mt-0.5">
                {selectedStage.authority}
              </span>
              <p className="font-body-md text-body-md text-on-surface-variant mt-2 leading-relaxed">
                {selectedStage.description}
              </p>
            </div>

            {/* Prerequisites / Dependencies */}
            <div>
              <span className="font-label-sm text-[11px] text-outline uppercase tracking-wider font-semibold block mb-1.5">
                Dependencies & Prerequisites
              </span>
              {selectedStage.dependencies.length > 0 ? (
                <div className="flex flex-wrap gap-1.5">
                  {selectedStage.dependencies.map((dep) => (
                    <span
                      key={dep}
                      className="px-2.5 py-0.5 rounded bg-surface-container text-on-surface text-label-sm font-medium"
                    >
                      {dep}
                    </span>
                  ))}
                </div>
              ) : (
                <span className="text-body-sm text-on-surface-variant text-[12px]">
                  Root milestone • No prior prerequisites
                </span>
              )}
            </div>

            {/* Documents Required */}
            <div>
              <span className="font-label-sm text-[11px] text-outline uppercase tracking-wider font-semibold block mb-1.5">
                Required Supporting Documents
              </span>
              <div className="space-y-1.5">
                {selectedStage.documentsRequired.map((doc, i) => (
                  <div
                    key={i}
                    className="p-2 rounded-lg bg-surface-container-low flex items-center justify-between text-body-sm"
                  >
                    <div className="flex items-center gap-2 truncate">
                      <FileText className="w-3.5 h-3.5 text-primary shrink-0" />
                      <span className="text-on-surface font-medium truncate">{doc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SLA Benchmark */}
            {selectedStage.slaDays && (
              <div className="p-space-sm rounded-xl bg-surface-container-low flex items-center justify-between text-body-sm">
                <span className="text-on-surface-variant">Statutory Turnaround</span>
                <span className="font-bold text-on-surface">~{selectedStage.slaDays} Working Days</span>
              </div>
            )}

            {/* Action CTA */}
            <div className="pt-space-xs">
              <Link
                href={selectedStage.actionHref}
                className="w-full py-2.5 px-space-md rounded-xl bg-primary-container hover:bg-primary text-white font-label-md text-label-md font-bold transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer active:scale-98"
              >
                <span>{selectedStage.actionLabel}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </WorkspaceLayout>
  );
}
