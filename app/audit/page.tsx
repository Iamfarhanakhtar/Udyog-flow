"use client";

import React from "react";
import Link from "next/link";
import { WorkspaceLayout } from "@/components/layout/WorkspaceLayout";
import { Sparkles, ArrowLeft } from "lucide-react";

export default function AuditPage() {
  return (
    <WorkspaceLayout>
      <div className="bg-surface-container-lowest rounded-2xl p-space-xl border border-surface-container-high/60 shadow-sm text-center max-w-2xl mx-auto my-12">
        <div className="w-12 h-12 rounded-xl bg-primary-container/10 flex items-center justify-center text-primary mx-auto mb-space-md">
          <Sparkles className="w-6 h-6" />
        </div>
        <h1 className="font-headline-md text-headline-md text-on-surface font-bold">
          AI Pre-Submission Audit
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant mt-2 mb-space-lg">
          Scheduled for Phase 2 implementation following user review of Onboarding and Business Blueprint.
        </p>
        <Link
          href="/blueprint"
          className="inline-flex items-center gap-2 px-space-md py-2 rounded-lg bg-primary-container text-white font-label-md text-label-md font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Business Blueprint</span>
        </Link>
      </div>
    </WorkspaceLayout>
  );
}
