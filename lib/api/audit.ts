import { AuditResult, AuditIssue } from "@/types/track1";

export const MOCK_AUDIT_INITIAL_ISSUE: AuditIssue = {
  field: "Operational Kitchen Premises Address",
  formValue: "Shop #4-A, Link Road, Sector 3, Ghaziabad, Uttar Pradesh",
  sourceDocument: "Commercial Tenancy Lease Deed",
  sourceValue: "Shop #4, Link Road, Sector 3, Ghaziabad, Uttar Pradesh - 201010",
  severity: "warning",
  recommendation: "Use the address from the Lease Agreement consistently to prevent physical inspection delays.",
  isResolved: false,
};

/**
 * Service Abstraction for AI Pre-Submission Audit
 * Future contract:
 * POST /api/audit/verify-document
 */
export async function runPreSubmissionAudit(
  formAddressValue: string,
  leaseAddressValue: string = "Shop #4, Link Road, Sector 3, Ghaziabad, Uttar Pradesh - 201010"
): Promise<AuditResult> {
  await new Promise((res) => setTimeout(res, 300));

  // If the form address exactly matches the lease address, audit passes!
  const isAddressNormalized =
    formAddressValue.trim().toLowerCase() === leaseAddressValue.trim().toLowerCase() ||
    !formAddressValue.includes("Shop #4-A");

  if (isAddressNormalized) {
    return {
      status: "passed",
      statusText: "Audit passed — Ready for Submission",
      checksCompleted: 12,
      checksPassed: 12,
      issues: [],
      readyForSubmission: true,
    };
  }

  return {
    status: "issues_detected",
    statusText: "Potential consistency issue detected",
    checksCompleted: 12,
    checksPassed: 11,
    issues: [
      {
        ...MOCK_AUDIT_INITIAL_ISSUE,
        formValue: formAddressValue,
        sourceValue: leaseAddressValue,
      },
    ],
    readyForSubmission: false,
  };
}
