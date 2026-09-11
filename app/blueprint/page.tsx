"use client";

import React from "react";
import Link from "next/link";
import {
  MapPin,
  Utensils,
  Store,
  Download,
  Sparkles,
  CheckCircle2,
  Clock,
  Lock,
  AlertTriangle,
  ArrowRight,
  Landmark,
  FileText,
  ShieldCheck,
  ChevronRight,
  ExternalLink,
  Layers,
} from "lucide-react";
import { WorkspaceLayout } from "@/components/layout/WorkspaceLayout";
import { useBusiness } from "@/context/BusinessContext";
import { RequirementStatus, BlueprintRequirement } from "@/types/compliance";

export default function BlueprintPage() {
  const {
    profile,
    phases,
    stats,
    schemes,
    selectedRequirementId,
    selectedRequirement,
    setSelectedRequirementId,
  } = useBusiness();

  const businessName = profile?.businessName || "Rohan's Cloud Kitchen";
  const jurisdiction = profile?.jurisdictionLabel || "Mumbai, Maharashtra (MCGM Ward K-West)";
  const sector = `${profile?.category || "Food & Beverage"} / ${profile?.microNiche || "Cloud Kitchen"}`;

  const renderStatusBadge = (status: RequirementStatus, statusLabel?: string) => {
    switch (status) {
      case "Verified":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-secondary-container/80 text-on-secondary-container font-label-sm text-label-sm font-semibold">
            <CheckCircle2 className="w-3 h-3 text-secondary" />
            <span>{statusLabel || "Verified"}</span>
          </span>
        );
      case "Action Needed":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-tertiary-container/80 text-on-tertiary-container font-label-sm text-label-sm font-semibold">
            <AlertTriangle className="w-3 h-3 text-tertiary" />
            <span>{statusLabel || "Action Needed"}</span>
          </span>
        );
      case "Processing":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-surface-container text-primary font-label-sm text-label-sm font-semibold">
            <Clock className="w-3 h-3 text-primary" />
            <span>{statusLabel || "Processing"}</span>
          </span>
        );
      case "Locked":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm font-semibold">
            <Lock className="w-3 h-3 text-outline" />
            <span>{statusLabel || "Locked"}</span>
          </span>
        );
    }
  };

  return (
    <WorkspaceLayout>
      <div className="flex flex-col w-full space-y-space-xl">
        {/* Top Blueprint Context & Live Readiness Hero Card */}
        <div className="relative overflow-hidden bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm border border-surface-container-high/60">
          <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-primary/5 blur-3xl pointer-events-none"></div>

          <div className="relative flex flex-col xl:flex-row xl:items-center justify-between gap-space-lg">
            <div className="flex flex-col gap-space-xs">
              <div className="flex items-center gap-space-xs">
                <span className="px-space-xs py-0.5 rounded bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm uppercase tracking-wider font-semibold">
                  Statutory Roadmap
                </span>
                <span className="text-outline-variant text-label-sm">•</span>
                <span className="font-label-sm text-label-sm text-secondary flex items-center gap-1 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></span>
                  Real-time Institutional Graph
                </span>
              </div>

              <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight font-bold">
                Your Business Blueprint: {businessName}
              </h1>

              <div className="flex flex-wrap items-center gap-x-space-md gap-y-1 font-body-sm text-body-sm text-on-surface-variant">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4 text-outline" />
                  <span>{jurisdiction}</span>
                </div>
                <span className="text-outline-variant">•</span>
                <div className="flex items-center gap-1">
                  <Utensils className="w-4 h-4 text-outline" />
                  <span>{sector}</span>
                </div>
                <span className="text-outline-variant">•</span>
                <div className="flex items-center gap-1">
                  <Store className="w-4 h-4 text-outline" />
                  <span>Commercial Kitchen Facility</span>
                </div>
              </div>
            </div>

            {/* Quick Export & Run AI Pre-Audit Buttons */}
            <div className="flex items-center gap-space-sm flex-shrink-0">
              <button
                type="button"
                onClick={() => alert("Compliance graph exported as statutory PDF summary.")}
                className="flex items-center gap-space-xs px-space-md py-2 rounded-lg bg-surface-container text-on-surface font-label-md text-label-md hover:bg-surface-container-high transition-colors cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Export Compliance Tree</span>
              </button>
              <Link
                href="/audit"
                className="flex items-center gap-space-xs px-space-md py-2 rounded-lg bg-primary-container text-white font-label-md text-label-md hover:opacity-95 shadow-sm transition-opacity font-semibold"
              >
                <Sparkles className="w-4 h-4" />
                <span>Run AI Pre-Audit</span>
              </Link>
            </div>
          </div>

          {/* Top Metrics Bento Strip */}
          <div className="mt-space-lg grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-sm">
            <div className="p-space-md rounded-xl bg-surface-container-low flex items-center justify-between border border-surface-container-high/40">
              <div className="flex flex-col">
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-medium">
                  Statutory Mandates
                </span>
                <span className="font-headline-md text-headline-md text-on-surface font-bold mt-0.5">
                  {stats.totalRequirements} Total
                </span>
              </div>
              <div className="w-9 h-9 rounded-lg bg-surface-container flex items-center justify-center text-primary">
                <Layers className="w-5 h-5" />
              </div>
            </div>

            <div className="p-space-md rounded-xl bg-surface-container-low flex items-center justify-between border border-surface-container-high/40">
              <div className="flex flex-col">
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-medium">
                  Cleared / Verified
                </span>
                <span className="font-headline-md text-headline-md text-secondary font-bold mt-0.5">
                  {stats.clearedCount} Completed
                </span>
              </div>
              <div className="w-9 h-9 rounded-lg bg-secondary-container/40 flex items-center justify-center text-secondary">
                <CheckCircle2 className="w-5 h-5" />
              </div>
            </div>

            <div className="p-space-md rounded-xl bg-surface-container-low flex items-center justify-between border border-surface-container-high/40">
              <div className="flex flex-col">
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-medium">
                  Actions Needed
                </span>
                <span className="font-headline-md text-headline-md text-tertiary font-bold mt-0.5">
                  {stats.actionNeededCount} Pending
                </span>
              </div>
              <div className="w-9 h-9 rounded-lg bg-tertiary-container/40 flex items-center justify-center text-tertiary">
                <AlertTriangle className="w-5 h-5" />
              </div>
            </div>

            <div className="p-space-md rounded-xl bg-surface-container-low flex items-center justify-between border border-surface-container-high/40">
              <div className="flex flex-col">
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-medium">
                  Clearance Velocity
                </span>
                <span className="font-headline-md text-headline-md text-primary font-bold mt-0.5">
                  ~{stats.estimatedClearanceDays} Days
                </span>
              </div>
              <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                <Clock className="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>

        {/* Main 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-start">
          {/* Left Column: 4 Progressive Stages (8 cols) */}
          <div className="lg:col-span-8 space-y-space-lg">
            {phases.map((phase) => (
              <div
                key={phase.id}
                className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm border border-surface-container-high/60 space-y-space-md"
              >
                {/* Phase Header */}
                <div className="flex items-center justify-between pb-space-xs border-b border-surface-container-high/40">
                  <div className="flex items-center gap-space-sm">
                    <span className="font-code-sm text-code-sm px-2 py-0.5 rounded bg-primary-container/10 text-primary font-bold">
                      {phase.stageNumber}
                    </span>
                    <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                      {phase.name}
                    </h2>
                  </div>
                  <span className="font-body-sm text-body-sm text-on-surface-variant hidden sm:inline">
                    {phase.requirements.length} requirements
                  </span>
                </div>

                {/* Requirements Cards */}
                <div className="space-y-space-xs">
                  {phase.requirements.map((req) => {
                    const isSelected = req.id === selectedRequirementId;

                    return (
                      <div
                        key={req.id}
                        onClick={() => setSelectedRequirementId(req.id)}
                        className={`p-space-md rounded-xl cursor-pointer transition-all border ${
                          isSelected
                            ? "bg-primary-fixed/20 border-primary-container ring-1 ring-primary-container shadow-sm"
                            : "bg-surface-container-low border-surface-container-high/60 hover:bg-surface-container hover:border-outline-variant"
                        }`}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div className="flex items-start sm:items-center gap-space-sm">
                            <div className="w-8 h-8 rounded-lg bg-surface-container-lowest flex items-center justify-center shrink-0 mt-0.5 sm:mt-0 text-on-surface">
                              <FileText className="w-4 h-4 text-primary" />
                            </div>
                            <div className="flex flex-col">
                              <div className="flex items-center gap-2">
                                <span className="font-label-lg text-label-lg text-on-surface font-semibold">
                                  {req.title}
                                </span>
                                <span className="font-code-sm text-[10px] text-on-surface-variant bg-surface-container-high px-1.5 py-0.2 rounded">
                                  {req.code}
                                </span>
                              </div>
                              <span className="font-body-sm text-body-sm text-on-surface-variant">
                                {req.authority}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-space-sm self-end sm:self-center">
                            {renderStatusBadge(req.status, req.statusLabel)}
                            <ChevronRight
                              className={`w-4 h-4 transition-transform ${
                                isSelected ? "text-primary translate-x-0.5" : "text-outline"
                              }`}
                            />
                          </div>
                        </div>

                        {/* Supporting Dependencies Callout */}
                        {req.documents.some((d) => d.note) && (
                          <div className="mt-space-xs pt-space-xs border-t border-surface-container-high/50 flex items-center gap-2 text-label-sm font-label-sm text-tertiary">
                            <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                            <span>
                              {req.documents.find((d) => d.note)?.note}
                            </span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Deep-Dive Inspector & Circular Readiness Ring (4 cols, sticky) */}
          <div className="lg:col-span-4 space-y-space-lg sticky top-20">
            {/* Circular Readiness Ring Card */}
            <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm border border-surface-container-high/60 flex flex-col items-center text-center">
              <div className="relative w-36 h-36 flex items-center justify-center mb-space-sm">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-surface-container"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3.5"
                  />
                  <path
                    className="text-secondary"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeDasharray={`${stats.readinessPercentage}, 100`}
                    strokeLinecap="round"
                    strokeWidth="3.5"
                  />
                </svg>
                <div className="absolute flex flex-col items-center justify-center">
                  <span className="font-headline-md text-headline-md text-on-surface font-bold">
                    {stats.readinessPercentage}%
                  </span>
                  <span className="font-label-sm text-[10px] text-outline uppercase tracking-wider font-semibold">
                    Blueprint Score
                  </span>
                </div>
              </div>

              <h4 className="font-label-lg text-label-lg text-on-surface font-semibold">
                Estimated Clearance: {stats.estimatedClearanceDays} Days
              </h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 leading-relaxed">
                {stats.slaBenchmarkingText}
              </p>
            </div>

            {/* Selected Node Deep Dive Inspector */}
            {selectedRequirement && (
              <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm border border-surface-container-high/60 space-y-space-md">
                <div className="flex items-center justify-between pb-space-xs border-b border-surface-container-high/50">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-primary" />
                    <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider font-semibold">
                      Requirement Scrutiny
                    </span>
                  </div>
                  {renderStatusBadge(selectedRequirement.status, selectedRequirement.statusLabel)}
                </div>

                <div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                    {selectedRequirement.title}
                  </h3>
                  <span className="font-body-sm text-body-sm text-primary font-medium block mt-0.5">
                    {selectedRequirement.authority}
                  </span>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-2 leading-relaxed">
                    {selectedRequirement.summary}
                  </p>
                </div>

                {/* Statutory Rule */}
                {selectedRequirement.statutoryRule && (
                  <div className="p-space-sm rounded-lg bg-surface-container-low border border-surface-container-high/40">
                    <span className="font-label-sm text-[11px] text-outline uppercase tracking-wider font-semibold block">
                      Governing Legal Provision
                    </span>
                    <span className="font-body-sm text-body-sm text-on-surface mt-0.5 block font-medium">
                      {selectedRequirement.statutoryRule}
                    </span>
                  </div>
                )}

                {/* Prerequisites */}
                {selectedRequirement.prerequisites.length > 0 && (
                  <div>
                    <span className="font-label-sm text-[11px] text-outline uppercase tracking-wider font-semibold block mb-1.5">
                      Statutory Prerequisites
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedRequirement.prerequisites.map((prereq) => (
                        <span
                          key={prereq}
                          className="px-2 py-0.5 rounded bg-surface-container text-on-surface font-label-sm text-label-sm font-medium"
                        >
                          {prereq}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Document Bundle */}
                <div>
                  <span className="font-label-sm text-[11px] text-outline uppercase tracking-wider font-semibold block mb-1.5">
                    Associated Documents & Drafts
                  </span>
                  <div className="space-y-1.5">
                    {selectedRequirement.documents.map((doc) => (
                      <div
                        key={doc.id}
                        className="p-2 rounded-lg bg-surface-container-low flex items-center justify-between text-body-sm text-body-sm"
                      >
                        <span className="text-on-surface font-medium truncate pr-2">
                          {doc.name}
                        </span>
                        {doc.status === "verified" ? (
                          <span className="text-secondary font-semibold text-[11px] shrink-0">
                            ✓ Ready
                          </span>
                        ) : (
                          <span className="text-tertiary font-semibold text-[11px] shrink-0">
                            ⚠ Action
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* SLA & Cost Readouts */}
                <div className="grid grid-cols-2 gap-space-sm pt-space-xs border-t border-surface-container-high/40">
                  <div>
                    <span className="text-[10px] uppercase font-semibold text-outline tracking-wider block">
                      Target SLA
                    </span>
                    <span className="font-label-md text-label-md font-bold text-on-surface">
                      {selectedRequirement.slaDays} Business Days
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-semibold text-outline tracking-wider block">
                      Statutory Fee
                    </span>
                    <span className="font-label-md text-label-md font-bold text-on-surface">
                      {selectedRequirement.cost || "Free"}
                    </span>
                  </div>
                </div>

                {/* Dynamic Next Action CTA */}
                <div className="pt-space-xs">
                  {selectedRequirement.nextAction.path ? (
                    <Link
                      href={selectedRequirement.nextAction.path}
                      className="w-full py-2.5 px-space-md rounded-xl bg-primary-container hover:bg-primary text-white font-label-md text-label-md font-bold transition-colors flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                    >
                      <span>{selectedRequirement.nextAction.label}</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  ) : (
                    <button
                      type="button"
                      disabled
                      className="w-full py-2.5 px-space-md rounded-xl bg-surface-container text-on-surface-variant font-label-md text-label-md font-medium flex items-center justify-center gap-2 cursor-not-allowed"
                    >
                      <span>{selectedRequirement.nextAction.label}</span>
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Section: Government Schemes You Are Eligible For */}
        <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm border border-surface-container-high/60 space-y-space-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm">
            <div className="flex items-center gap-space-sm">
              <div className="w-10 h-10 rounded-xl bg-secondary-container/60 text-secondary flex items-center justify-center">
                <Landmark className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <div className="flex items-center gap-space-xs">
                  <h2 className="font-headline-md text-headline-md text-on-surface font-bold">
                    Government Schemes You May Qualify For
                  </h2>
                  <span className="px-space-xs py-0.5 rounded bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-semibold">
                    3 Matched
                  </span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Potentially relevant schemes mapped to {businessName} via MSME and Maharashtra Industrial Policy.
                </p>
              </div>
            </div>

            <Link
              href="/schemes"
              className="flex items-center gap-1 font-label-md text-label-md text-primary hover:underline self-start sm:self-auto font-semibold"
            >
              <span>View All 14 State Schemes</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Scheme Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md pt-space-xs">
            {schemes.map((scheme) => (
              <div
                key={scheme.id}
                className="p-space-lg rounded-xl bg-surface-container-low hover:shadow-md transition-all flex flex-col justify-between group border border-surface-container-high/50"
              >
                <div>
                  <div className="flex items-center justify-between mb-space-sm">
                    <span className="px-space-xs py-0.5 rounded bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm font-medium">
                      {scheme.type}
                    </span>
                    <span className="font-label-sm text-label-sm text-secondary font-bold flex items-center gap-0.5">
                      <Sparkles className="w-3 h-3 text-secondary" />
                      <span>{scheme.matchLevel}</span>
                    </span>
                  </div>

                  <h3 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors font-semibold leading-snug">
                    {scheme.title}
                  </h3>

                  <div className="mt-space-sm p-space-sm rounded-lg bg-surface-container-lowest border border-surface-container-high/40">
                    <span className="font-label-sm text-label-sm text-tertiary font-bold block">
                      {scheme.benefitTitle}
                    </span>
                    <p className="font-body-sm text-body-sm text-on-surface mt-0.5 leading-relaxed">
                      {scheme.benefitDescription}
                    </p>
                  </div>

                  <ul className="mt-space-md space-y-1.5 font-body-sm text-body-sm text-on-surface-variant">
                    {scheme.qualifications.map((q) => (
                      <li key={q.label} className="flex items-center gap-2">
                        {q.passed ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-secondary shrink-0" />
                        ) : (
                          <AlertTriangle className="w-3.5 h-3.5 text-tertiary shrink-0" />
                        )}
                        <span className={q.passed ? "text-on-surface" : "text-on-surface-variant"}>
                          {q.label}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-space-lg pt-space-sm flex items-center justify-between border-t border-surface-container-high/40">
                  <span className="font-label-sm text-label-sm text-outline truncate max-w-[130px]">
                    {scheme.authority}
                  </span>
                  <Link
                    href="/schemes"
                    className="px-space-md py-1.5 rounded-lg bg-primary-container text-white font-label-md text-label-md hover:opacity-90 transition-opacity font-semibold"
                  >
                    {scheme.ctaText}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </WorkspaceLayout>
  );
}
