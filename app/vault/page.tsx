"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FolderOpen,
  FileText,
  UploadCloud,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ArrowDown,
  ArrowRight,
  Shield,
  Layers,
  ChevronRight,
  Info,
  ExternalLink,
} from "lucide-react";
import { WorkspaceLayout } from "@/components/layout/WorkspaceLayout";
import { useTrack1Store } from "@/state/track1Store";
import { VaultDocument, DocumentState } from "@/types/track1";

export default function DocumentVaultPage() {
  const { vaultDocuments, businessName } = useTrack1Store();
  const [selectedDocId, setSelectedDocId] = useState<string>("doc-lease");

  const selectedDoc = vaultDocuments.find((d) => d.id === selectedDocId) || vaultDocuments[2];

  const renderStateBadge = (state: DocumentState) => {
    switch (state) {
      case "Available":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-secondary-container/80 text-on-secondary-container text-label-sm font-semibold">
            <CheckCircle2 className="w-3 h-3 text-secondary" />
            <span>Available (DigiLocker)</span>
          </span>
        );
      case "Connected":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-label-sm font-semibold">
            <Shield className="w-3 h-3 text-primary" />
            <span>Connected (Utility API)</span>
          </span>
        );
      case "Uploaded":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-surface-container-high text-on-surface text-label-sm font-medium">
            <FileText className="w-3 h-3 text-outline" />
            <span>Uploaded</span>
          </span>
        );
      case "Needs review":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-tertiary-container/80 text-on-tertiary-container text-label-sm font-semibold">
            <AlertTriangle className="w-3 h-3 text-tertiary" />
            <span>Needs review</span>
          </span>
        );
      case "Missing":
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-error-container/70 text-on-error-container text-label-sm font-semibold">
            <AlertTriangle className="w-3 h-3 text-error" />
            <span>Missing</span>
          </span>
        );
    }
  };

  // Group by hierarchical dependency tiers
  const identityDocs = vaultDocuments.filter((d) => d.category === "Identity");
  const premisesDocs = vaultDocuments.filter((d) => d.category === "Premises");
  const utilityDocs = vaultDocuments.filter((d) => d.category === "Utilities");
  const complianceDocs = vaultDocuments.filter((d) => d.category === "Compliance");

  return (
    <WorkspaceLayout>
      <div className="space-y-space-xl max-w-6xl mx-auto">
        {/* Header Lead-in */}
        <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm border border-surface-container-high/60">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-md">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-label-sm font-semibold mb-2">
                <FolderOpen className="w-3.5 h-3.5" />
                <span>Track-3 Dependency Vault</span>
              </div>
              <h1 className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight">
                Document Dependency Vault
              </h1>
              <p className="font-body-md text-body-md text-on-surface-variant mt-1 max-w-2xl leading-relaxed">
                A hierarchical business repository structured by statutory dependency. Documents are ingested once and dynamically referenced across all government license schedules.
              </p>
            </div>

            <Link
              href="/forms"
              className="flex items-center gap-2 px-space-md py-2.5 rounded-xl bg-primary-container text-white font-label-md text-label-md font-bold hover:bg-primary shadow-sm transition-all self-start sm:self-center shrink-0 active:scale-98"
            >
              <span>Continue to Form Co-Pilot</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Hierarchical Dependency Tree & Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-start">
          {/* Left Column: Hierarchical Tree Stack (7 cols) */}
          <div className="lg:col-span-7 space-y-space-md">
            {/* Tier 1: Base Identity */}
            <div className="bg-surface-container-lowest rounded-2xl p-space-md shadow-sm border border-surface-container-high/60 space-y-2">
              <div className="flex items-center justify-between pb-1 border-b border-surface-container-high/40">
                <span className="font-label-sm text-[11px] uppercase font-bold text-outline tracking-wider">
                  Tier 1 • Base Identity Credentials
                </span>
                <span className="text-[11px] text-secondary font-semibold">✓ 2 Credentials Available</span>
              </div>

              <div className="space-y-1.5">
                {identityDocs.map((doc) => (
                  <div
                    key={doc.id}
                    onClick={() => setSelectedDocId(doc.id)}
                    className={`p-3 rounded-xl cursor-pointer transition-all border flex items-center justify-between ${
                      doc.id === selectedDocId
                        ? "bg-surface-container border-primary-container ring-1 ring-primary-container shadow-sm"
                        : "bg-surface-container-low border-surface-container-high/60 hover:bg-surface-container"
                    }`}
                  >
                    <div className="flex items-center gap-space-sm min-w-0 pr-2">
                      <div className="w-8 h-8 rounded-lg bg-surface-container-lowest flex items-center justify-center shrink-0 text-primary">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div className="truncate">
                        <span className="font-label-md text-label-md text-on-surface font-semibold block truncate">
                          {doc.title}
                        </span>
                        <span className="text-[11px] text-on-surface-variant block truncate">
                          {doc.extractedValue}
                        </span>
                      </div>
                    </div>
                    {renderStateBadge(doc.state)}
                  </div>
                ))}
              </div>
            </div>

            {/* Dependency Connector Arrow */}
            <div className="flex items-center justify-center">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-high text-on-surface-variant text-[11px] font-semibold">
                <ArrowDown className="w-3.5 h-3.5 text-primary" />
                <span>Enables Tenancy Deed & Premises Verification</span>
              </div>
            </div>

            {/* Tier 2: Premises */}
            <div className="bg-surface-container-lowest rounded-2xl p-space-md shadow-sm border border-surface-container-high/60 space-y-2">
              <div className="flex items-center justify-between pb-1 border-b border-surface-container-high/40">
                <span className="font-label-sm text-[11px] uppercase font-bold text-outline tracking-wider">
                  Tier 2 • Premises & Tenancy
                </span>
                <span className="text-[11px] text-primary font-semibold">Physical Anchor</span>
              </div>

              <div className="space-y-1.5">
                {premisesDocs.map((doc) => (
                  <div
                    key={doc.id}
                    onClick={() => setSelectedDocId(doc.id)}
                    className={`p-3 rounded-xl cursor-pointer transition-all border flex items-center justify-between ${
                      doc.id === selectedDocId
                        ? "bg-surface-container border-primary-container ring-1 ring-primary-container shadow-sm"
                        : "bg-surface-container-low border-surface-container-high/60 hover:bg-surface-container"
                    }`}
                  >
                    <div className="flex items-center gap-space-sm min-w-0 pr-2">
                      <div className="w-8 h-8 rounded-lg bg-surface-container-lowest flex items-center justify-center shrink-0 text-primary">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div className="truncate">
                        <span className="font-label-md text-label-md text-on-surface font-semibold block truncate">
                          {doc.title}
                        </span>
                        <span className="text-[11px] text-on-surface-variant block truncate">
                          {doc.extractedValue}
                        </span>
                      </div>
                    </div>
                    {renderStateBadge(doc.state)}
                  </div>
                ))}
              </div>
            </div>

            {/* Dependency Connector Arrow */}
            <div className="flex items-center justify-center">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-high text-on-surface-variant text-[11px] font-semibold">
                <ArrowDown className="w-3.5 h-3.5 text-primary" />
                <span>Enables Utility Sanction & Potable Testing</span>
              </div>
            </div>

            {/* Tier 3: Utilities */}
            <div className="bg-surface-container-lowest rounded-2xl p-space-md shadow-sm border border-surface-container-high/60 space-y-2">
              <div className="flex items-center justify-between pb-1 border-b border-surface-container-high/40">
                <span className="font-label-sm text-[11px] uppercase font-bold text-outline tracking-wider">
                  Tier 3 • Operational Utilities
                </span>
                <span className="text-[11px] text-secondary font-semibold">Connected</span>
              </div>

              <div className="space-y-1.5">
                {utilityDocs.map((doc) => (
                  <div
                    key={doc.id}
                    onClick={() => setSelectedDocId(doc.id)}
                    className={`p-3 rounded-xl cursor-pointer transition-all border flex items-center justify-between ${
                      doc.id === selectedDocId
                        ? "bg-surface-container border-primary-container ring-1 ring-primary-container shadow-sm"
                        : "bg-surface-container-low border-surface-container-high/60 hover:bg-surface-container"
                    }`}
                  >
                    <div className="flex items-center gap-space-sm min-w-0 pr-2">
                      <div className="w-8 h-8 rounded-lg bg-surface-container-lowest flex items-center justify-center shrink-0 text-primary">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div className="truncate">
                        <span className="font-label-md text-label-md text-on-surface font-semibold block truncate">
                          {doc.title}
                        </span>
                        <span className="text-[11px] text-on-surface-variant block truncate">
                          {doc.extractedValue}
                        </span>
                      </div>
                    </div>
                    {renderStateBadge(doc.state)}
                  </div>
                ))}
              </div>
            </div>

            {/* Dependency Connector Arrow */}
            <div className="flex items-center justify-center">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-high text-on-surface-variant text-[11px] font-semibold">
                <ArrowDown className="w-3.5 h-3.5 text-secondary" />
                <span>Unlocks Statutory Applications: FSSAI State License & Municipal Trade</span>
              </div>
            </div>
          </div>

          {/* Right Column: Document Details & Cross-Application Inspector (5 cols, sticky) */}
          <div className="lg:col-span-5 bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm border border-surface-container-high/60 space-y-space-md sticky top-20">
            <div className="flex items-center justify-between pb-space-xs border-b border-surface-container-high/50">
              <span className="font-label-sm text-[11px] uppercase font-bold text-outline tracking-wider">
                Document Inspector
              </span>
              {renderStateBadge(selectedDoc.state)}
            </div>

            <div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                {selectedDoc.title}
              </h3>
              <span className="text-body-sm text-primary font-medium block mt-0.5">
                Channel: {selectedDoc.source}
              </span>
            </div>

            {/* Document Extracted Value / Content */}
            <div className="p-space-md rounded-xl bg-surface-container-low border border-surface-container-high/50 space-y-1">
              <span className="text-[11px] uppercase font-bold text-outline tracking-wider block">
                Normalized Metadata Payload
              </span>
              <p className="font-mono text-body-sm text-on-surface font-medium leading-relaxed">
                {selectedDoc.extractedValue}
              </p>
              {selectedDoc.documentNumber && (
                <span className="text-[11px] text-on-surface-variant block pt-1 border-t border-surface-container-high/40">
                  Registration Ref: {selectedDoc.documentNumber}
                </span>
              )}
            </div>

            {/* Enabled Statutory Applications */}
            <div>
              <span className="font-label-sm text-[11px] uppercase font-bold text-outline tracking-wider block mb-2">
                Enables Following Statutory Approvals
              </span>
              <div className="space-y-1.5">
                {selectedDoc.dependencies.map((dep, i) => (
                  <div
                    key={i}
                    className="p-2 rounded-lg bg-surface-container flex items-center justify-between text-body-sm font-medium text-on-surface"
                  >
                    <span>{dep}</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-secondary shrink-0" />
                  </div>
                ))}
              </div>
            </div>

            {/* Disclaimer on Verification */}
            <div className="p-space-sm rounded-xl bg-surface-container-low text-[11px] text-on-surface-variant flex items-start gap-2">
              <Info className="w-4 h-4 text-outline shrink-0 mt-0.5" />
              <span>
                Document states indicate local readiness and syntactic validation. Official statutory approval is granted solely by the respective government authority.
              </span>
            </div>

            {/* Action to Form Co-Pilot */}
            <div className="pt-space-xs">
              <Link
                href="/forms"
                className="w-full py-2.5 px-space-md rounded-xl bg-primary-container hover:bg-primary text-white font-label-md text-label-md font-bold transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer active:scale-98"
              >
                <span>Populate into FSSAI Form Co-Pilot</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </WorkspaceLayout>
  );
}
