"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  RefreshCw,
  FolderOpen,
  FileEdit,
  ShieldAlert,
  FileCheck2,
  Check,
  CheckCheck,
} from "lucide-react";
import { WorkspaceLayout } from "@/components/layout/WorkspaceLayout";
import { useTrack1Store } from "@/state/track1Store";

export default function AuditPage() {
  const {
    auditResult,
    isAuditing,
    fixAddressMismatch,
    triggerAudit,
    businessName,
  } = useTrack1Store();

  const [showHandoffModal, setShowHandoffModal] = useState(false);

  const hasIssues = auditResult.status === "issues_detected" && auditResult.issues.length > 0;
  const criticalIssue = auditResult.issues[0];

  return (
    <WorkspaceLayout>
      <div className="space-y-space-xl max-w-5xl mx-auto">
        {/* Top Header Card */}
        <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm border border-surface-container-high/60">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-md">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-label-sm font-semibold mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Track-4 Scrutiny Engine</span>
              </div>
              <h1 className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight">
                AI Pre-Submission Audit
              </h1>
              <p className="font-body-md text-body-md text-on-surface-variant mt-1 leading-relaxed">
                Deterministic consistency verification comparing your draft government application fields against ingested source credentials in the Document Vault.
              </p>
            </div>

            {/* Re-audit button */}
            <button
              type="button"
              onClick={() => triggerAudit()}
              disabled={isAuditing}
              className="flex items-center gap-2 px-space-md py-2.5 rounded-xl bg-surface-container text-on-surface font-label-md text-label-md hover:bg-surface-container-high transition-colors self-start sm:self-center shrink-0 cursor-pointer disabled:opacity-60"
            >
              <RefreshCw className={`w-4 h-4 text-outline ${isAuditing ? "animate-spin text-primary" : ""}`} />
              <span>Re-run Audit</span>
            </button>
          </div>

          {/* Audit Status Bar */}
          <div className="mt-space-md p-space-md rounded-xl bg-surface-container-low border border-surface-container-high/60 flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm">
            <div className="flex items-center gap-space-sm">
              {hasIssues ? (
                <div className="w-8 h-8 rounded-lg bg-tertiary-container text-tertiary flex items-center justify-center shrink-0">
                  <AlertTriangle className="w-4 h-4 text-white" />
                </div>
              ) : (
                <div className="w-8 h-8 rounded-lg bg-secondary text-white flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
              )}

              <div>
                <span className="font-headline-sm text-headline-sm text-on-surface font-bold">
                  {auditResult.statusText}
                </span>
                <span className="text-[12px] text-on-surface-variant block">
                  {auditResult.checksPassed} of {auditResult.checksCompleted} statutory consistency checks passed
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-center">
              <span className="text-label-sm font-semibold text-on-surface">
                {hasIssues ? "Action Required" : "Ready for Portal Handoff"}
              </span>
            </div>
          </div>
        </div>

        {/* Audit Content: Discrepancy Card OR Passed State */}
        {hasIssues && criticalIssue ? (
          <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm border border-tertiary/60 ring-1 ring-tertiary/30 space-y-space-md">
            <div className="flex items-center justify-between pb-space-xs border-b border-surface-container-high/50">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-tertiary text-white text-[11px] font-bold">
                  <AlertTriangle className="w-3 h-3" />
                  <span>Potential Consistency Issue</span>
                </span>
                <span className="font-label-md text-label-md text-on-surface font-semibold">
                  Field: {criticalIssue.field}
                </span>
              </div>
              <span className="text-[11px] text-outline font-mono">
                Rule #FSSAI-CONSISTENCY-88
              </span>
            </div>

            {/* Side-by-Side Diff Visualizer */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md pt-space-xs">
              {/* Source Document Card */}
              <div className="p-space-md rounded-xl bg-surface-container-low border border-surface-container-high/60 space-y-2">
                <div className="flex items-center justify-between text-[11px] text-on-surface-variant font-semibold">
                  <span className="flex items-center gap-1">
                    <FolderOpen className="w-3.5 h-3.5 text-primary" />
                    <span>{criticalIssue.sourceDocument}</span>
                  </span>
                  <span className="text-secondary">VAULT SOURCE</span>
                </div>
                <div className="p-2.5 rounded-lg bg-surface-container-lowest font-mono text-body-sm text-on-surface border border-secondary/30">
                  Shop #4, <mark className="bg-secondary-container text-on-secondary-container px-1 py-0.5 rounded font-bold">Link Road, Sector 3</mark>, Ghaziabad, Uttar Pradesh - 201010
                </div>
                <span className="text-[11px] text-on-surface-variant block">
                  Registered tenancy deed standard
                </span>
              </div>

              {/* Conflicting Application Draft Card */}
              <div className="p-space-md rounded-xl bg-tertiary-container/10 border border-tertiary/40 space-y-2">
                <div className="flex items-center justify-between text-[11px] text-on-surface-variant font-semibold">
                  <span className="flex items-center gap-1">
                    <FileEdit className="w-3.5 h-3.5 text-tertiary" />
                    <span>Draft Application Form B</span>
                  </span>
                  <span className="text-tertiary">CURRENT INPUT</span>
                </div>
                <div className="p-2.5 rounded-lg bg-surface-container-lowest font-mono text-body-sm text-on-surface border border-tertiary/40">
                  Shop #4-A, <mark className="bg-tertiary-container/30 text-tertiary px-1 py-0.5 rounded font-bold">Link Road, Sector 3</mark>, Ghaziabad, Uttar Pradesh
                </div>
                <span className="text-[11px] text-tertiary block">
                  Discrepancy: &quot;Shop #4-A&quot; does not match tenancy deed &quot;Shop #4&quot;
                </span>
              </div>
            </div>

            {/* Recommendation & Statutory Rationale */}
            <div className="p-space-md rounded-xl bg-surface-container-low border border-surface-container-high/50 flex items-start gap-space-sm">
              <ShieldAlert className="w-5 h-5 text-tertiary shrink-0 mt-0.5" />
              <div className="text-body-sm text-on-surface">
                <span className="font-bold block text-on-surface">Audit Recommendation</span>
                <p className="mt-0.5 leading-relaxed text-on-surface-variant">
                  {criticalIssue.recommendation} Municipal Food Safety inspection protocols mandate an exact character-level match with the registered tenancy agreement to prevent site geotagging rejections.
                </p>
              </div>
            </div>

            {/* Remediation Action Buttons */}
            <div className="pt-space-md border-t border-surface-container-high/60 flex flex-wrap items-center justify-between gap-space-md">
              <div className="flex items-center gap-space-sm">
                <button
                  type="button"
                  onClick={() => fixAddressMismatch()}
                  disabled={isAuditing}
                  className="px-space-lg py-2.5 rounded-xl bg-primary-container hover:bg-primary text-white font-label-md text-label-md font-bold shadow-md transition-all flex items-center gap-2 cursor-pointer active:scale-98 disabled:opacity-60"
                >
                  <Check className="w-4 h-4" />
                  <span>Fix & Update Form</span>
                </button>

                <Link
                  href="/forms"
                  className="px-space-md py-2.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md transition-colors"
                >
                  <span>Review Manually</span>
                </Link>
              </div>

              <span className="text-[11px] text-outline">
                Automated reconciliation via Track-4 Engine
              </span>
            </div>
          </div>
        ) : (
          /* Passed State Card */
          <div className="bg-surface-container-lowest rounded-2xl p-space-xl shadow-sm border border-secondary/50 ring-1 ring-secondary/20 space-y-space-md text-center">
            <div className="w-16 h-16 rounded-2xl bg-secondary-container/80 text-secondary flex items-center justify-center mx-auto shadow-sm">
              <CheckCheck className="w-8 h-8 text-secondary" />
            </div>

            <div>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container text-label-sm font-bold mb-2">
                ✓ Audit Passed
              </span>
              <h2 className="font-headline-md text-headline-md text-on-surface font-bold">
                Ready for Submission
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-lg mx-auto mt-1 leading-relaxed">
                All 12 statutory consistency checks between your draft application and Document Vault credentials have successfully cleared.
              </p>
            </div>

            {/* Verified Payload Details */}
            <div className="p-space-md rounded-xl bg-surface-container-low max-w-md mx-auto text-left font-mono text-[12px] text-on-surface space-y-1 border border-surface-container-high/50">
              <div className="text-secondary font-semibold font-sans mb-1 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Reconciled Payload</span>
              </div>
              <div><strong>FBO:</strong> Aarav Sharma</div>
              <div><strong>Brand:</strong> {businessName}</div>
              <div><strong>Address:</strong> Shop #4, Link Road, Sector 3, Ghaziabad, UP - 201010</div>
              <div><strong>Deed Ref:</strong> UP-GZB-REG-8821/2024</div>
            </div>

            {/* Submission Handoff Button */}
            <div className="pt-space-sm">
              <button
                type="button"
                onClick={() => setShowHandoffModal(true)}
                className="inline-flex items-center gap-2 px-space-xl py-3 rounded-xl bg-secondary hover:bg-secondary/95 text-white font-label-md text-label-md font-bold shadow-md transition-all cursor-pointer active:scale-98"
              >
                <span>Proceed to Application Handoff</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* 12 Consistency Checks Audit Matrix */}
        <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm border border-surface-container-high/60 space-y-space-md">
          <div className="flex items-center justify-between pb-space-xs border-b border-surface-container-high/50">
            <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
              Full Pre-Submission Audit Matrix
            </h3>
            <span className="text-[12px] text-on-surface-variant font-medium">
              12 Rules Checked
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-body-sm">
            {[
              { rule: "Proprietor PAN attribution matches Aadhaar name", passed: true },
              { rule: "FSSAI Schedule 1 category matches cloud kitchen capacity", passed: true },
              { rule: "Premises tenancy deed character-level address match", passed: !hasIssues },
              { rule: "Commercial electricity connected load >= 10kW verified", passed: true },
              { rule: "Potable water test report within 180-day validity", passed: true },
              { rule: "Kitchen CAD extraction hood meets municipal guidelines", passed: true },
              { rule: "Landlord commercial cooking NOC clause present", passed: true },
              { rule: "Sub-registrar registration seal timestamp validated", passed: true },
              { rule: "PVVNL utility account meter active in Ghaziabad", passed: true },
              { rule: "Authorized operator identity linked via DigiLocker", passed: true },
              { rule: "FoSTaC food safety supervisor certification mapped", passed: true },
              { rule: "B2B payment current account prerequisite alignment", passed: true },
            ].map((chk, i) => (
              <div
                key={i}
                className="p-2.5 rounded-lg bg-surface-container-low flex items-center justify-between border border-surface-container-high/40"
              >
                <span className="text-on-surface text-[12px] font-medium pr-2">{chk.rule}</span>
                {chk.passed ? (
                  <CheckCircle2 className="w-4 h-4 text-secondary shrink-0" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-tertiary shrink-0" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Submission Handoff Modal */}
        {showHandoffModal && (
          <div className="fixed inset-0 bg-on-surface/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-surface-container-lowest rounded-2xl p-space-xl max-w-md w-full shadow-2xl border border-surface-container-high text-center space-y-space-md">
              <div className="w-12 h-12 rounded-xl bg-secondary-container text-secondary flex items-center justify-center mx-auto">
                <FileCheck2 className="w-6 h-6" />
              </div>

              <div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                  Single-Window Submission Packet Ready
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                  Track-1 control layer completed. The audit-verified payload is staged for authorized gateway submission to the FoSCoS portal.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-surface-container-low font-mono text-[11px] text-left text-on-surface space-y-0.5">
                <div>Packet ID: UFLOW-FSSAI-GZB-2026-0911</div>
                <div>Status: Reconciled (Audit Passed)</div>
                <div>Target: FoSCoS State Gateway (UP-WEST)</div>
              </div>

              <div className="flex items-center gap-2 pt-space-xs">
                <button
                  type="button"
                  onClick={() => setShowHandoffModal(false)}
                  className="w-full py-2.5 rounded-xl bg-surface-container text-on-surface font-label-md text-label-md hover:bg-surface-container-high transition-colors"
                >
                  Close
                </button>
                <Link
                  href="/blueprint"
                  className="w-full py-2.5 rounded-xl bg-primary-container text-white font-label-md text-label-md font-bold hover:bg-primary transition-colors flex items-center justify-center gap-1"
                >
                  <span>Return to Blueprint</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </WorkspaceLayout>
  );
}
