"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FileEdit,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Copy,
  Check,
  FolderOpen,
  Info,
  ShieldAlert,
} from "lucide-react";
import { WorkspaceLayout } from "@/components/layout/WorkspaceLayout";
import { useTrack1Store } from "@/state/track1Store";
import { FormField } from "@/types/track1";

export default function FormCopilotPage() {
  const {
    activeForm,
    formValues,
    updateFormField,
    copyValueToField,
    businessName,
  } = useTrack1Store();

  const [copiedFieldId, setCopiedFieldId] = useState<string | null>(null);

  const handleCopy = (fieldId: string, suggestedValue: string) => {
    copyValueToField(fieldId, suggestedValue);
    setCopiedFieldId(fieldId);
    setTimeout(() => setCopiedFieldId(null), 1500);
  };

  const addressField = activeForm.fields.find((f) => f.id === "field-address");
  const hasAddressMismatch = formValues["field-address"]?.includes("Shop #4-A");

  return (
    <WorkspaceLayout>
      <div className="space-y-space-xl max-w-7xl mx-auto">
        {/* Top Header */}
        <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm border border-surface-container-high/60">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-md">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-label-sm font-semibold mb-2">
                <FileEdit className="w-3.5 h-3.5" />
                <span>Track-4 Form Co-Pilot</span>
              </div>
              <h1 className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight">
                FSSAI State License Application Draft (Form B)
              </h1>
              <p className="font-body-md text-body-md text-on-surface-variant mt-1 leading-relaxed">
                Bi-directional mapping workspace. Fields are populated automatically from your Document Dependency Vault to maintain statutory consistency.
              </p>
            </div>

            {/* Run Audit CTA */}
            <Link
              href="/audit"
              className="flex items-center gap-2 px-space-lg py-2.5 rounded-xl bg-primary-container text-white font-label-md text-label-md font-bold hover:bg-primary shadow-sm transition-all self-start sm:self-center shrink-0 active:scale-98"
            >
              <Sparkles className="w-4 h-4" />
              <span>Run Pre-Submission Audit</span>
            </Link>
          </div>
        </div>

        {/* Workspace Layout: Left Form Preview (7 cols) + Right Vault Source Panel (5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-start">
          {/* Left Column: Government Form Preview (7 cols) */}
          <div className="lg:col-span-7 bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm border border-surface-container-high/60 space-y-space-md">
            <div className="flex items-center justify-between pb-space-xs border-b border-surface-container-high/50">
              <div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                  Statutory Application Fields
                </h3>
                <span className="text-[12px] text-on-surface-variant">
                  FoSCoS Schedule 1 • State License Processing Draft
                </span>
              </div>
              <span className="font-code-sm text-[11px] text-primary bg-primary/10 px-2 py-0.5 rounded font-semibold">
                Mock Gateway Sandbox
              </span>
            </div>

            <div className="space-y-space-md">
              {activeForm.fields.map((field) => {
                const isMismatch = field.id === "field-address" && hasAddressMismatch;

                return (
                  <div
                    key={field.id}
                    className={`p-space-md rounded-xl border transition-all ${
                      isMismatch
                        ? "bg-tertiary-container/10 border-tertiary/60 ring-1 ring-tertiary/40"
                        : "bg-surface-container-low border-surface-container-high/60"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-label-md font-label-md text-on-surface font-semibold flex items-center gap-1">
                        <span>{field.label}</span>
                        {field.required && <span className="text-error">*</span>}
                      </label>

                      {isMismatch ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-tertiary text-white text-[11px] font-bold">
                          <AlertTriangle className="w-3 h-3" />
                          <span>Mismatch Detected</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] text-secondary font-semibold">
                          <CheckCircle2 className="w-3 h-3 text-secondary" />
                          <span>Mapped to Vault</span>
                        </span>
                      )}
                    </div>

                    {/* Input Field */}
                    {field.type === "textarea" ? (
                      <textarea
                        rows={2}
                        value={formValues[field.id] || ""}
                        onChange={(e) => updateFormField(field.id, e.target.value)}
                        className={`w-full px-3 py-2 rounded-lg font-mono text-body-sm text-body-sm focus:outline-none transition-all ${
                          isMismatch
                            ? "bg-surface-container-lowest border border-tertiary text-on-surface focus:ring-2 focus:ring-tertiary"
                            : "bg-surface-container-lowest border border-surface-container-high text-on-surface focus:ring-2 focus:ring-primary-container"
                        }`}
                      />
                    ) : field.type === "select" ? (
                      <select
                        value={formValues[field.id] || ""}
                        onChange={(e) => updateFormField(field.id, e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-surface-container-lowest border border-surface-container-high text-on-surface font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-primary-container"
                      >
                        {field.options?.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type="text"
                        value={formValues[field.id] || ""}
                        onChange={(e) => updateFormField(field.id, e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-surface-container-lowest border border-surface-container-high text-on-surface font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-primary-container"
                      />
                    )}

                    {/* Mismatch Warning Alert if active */}
                    {isMismatch && (
                      <div className="mt-2 pt-2 border-t border-tertiary/30 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[12px] text-tertiary">
                        <div className="flex items-center gap-1.5 font-medium">
                          <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                          <span>Differs from registered tenancy deed clause (&quot;Shop #4&quot; vs &quot;Shop #4-A&quot;)</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleCopy("field-address", field.suggestedValue)}
                          className="text-primary font-bold underline hover:text-on-surface text-left sm:text-right cursor-pointer"
                        >
                          Accept Lease Standard
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Vault Source Data Inspector (5 cols, sticky) */}
          <div className="lg:col-span-5 bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm border border-surface-container-high/60 space-y-space-md sticky top-20">
            <div className="flex items-center justify-between pb-space-xs border-b border-surface-container-high/50">
              <div className="flex items-center gap-2">
                <FolderOpen className="w-4 h-4 text-primary" />
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                  Vault Source Inspector
                </h3>
              </div>
              <span className="text-[11px] font-semibold text-secondary">
                Track-3 Payload
              </span>
            </div>

            <p className="text-body-sm text-body-sm text-on-surface-variant">
              Every value below is drawn directly from ingested credentials in your Document Vault. Click <strong>&quot;Use this value&quot;</strong> to overwrite any manual form edits.
            </p>

            {/* Source Mappings List */}
            <div className="space-y-space-sm max-h-[500px] overflow-y-auto pr-1">
              {activeForm.fields.map((field) => {
                const isFieldCopied = copiedFieldId === field.id;

                return (
                  <div
                    key={field.id}
                    className="p-space-sm rounded-xl bg-surface-container-low border border-surface-container-high/60 space-y-1.5"
                  >
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-semibold text-primary truncate max-w-[200px]">
                        {field.sourceDocumentName}
                      </span>
                      <span className="text-outline uppercase font-mono">
                        {field.id.replace("field-", "")}
                      </span>
                    </div>

                    <div className="p-2 rounded bg-surface-container-lowest font-mono text-[12px] text-on-surface">
                      {field.suggestedValue}
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <span className="text-[11px] text-on-surface-variant">
                        Target: {field.label}
                      </span>

                      <button
                        type="button"
                        onClick={() => handleCopy(field.id, field.suggestedValue)}
                        className="inline-flex items-center gap-1 text-[11px] font-bold text-primary hover:underline cursor-pointer"
                      >
                        {isFieldCopied ? (
                          <>
                            <Check className="w-3 h-3 text-secondary" />
                            <span className="text-secondary">Copied to Form</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Use this value</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Primary Action Button */}
            <div className="pt-space-xs border-t border-surface-container-high/50">
              <Link
                href="/audit"
                className="w-full py-3 px-space-md rounded-xl bg-primary-container hover:bg-primary text-white font-label-md text-label-md font-bold transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer active:scale-98"
              >
                <Sparkles className="w-4 h-4" />
                <span>Run AI Pre-Submission Audit</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </WorkspaceLayout>
  );
}
