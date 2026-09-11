import { VaultDocument } from "@/types/track1";

export const MOCK_VAULT_DOCUMENTS: VaultDocument[] = [
  {
    id: "doc-aadhaar",
    title: "Aadhaar e-KYC Identity Credential",
    category: "Identity",
    state: "Available",
    source: "DigiLocker Government Channel",
    extractedValue: "Aarav Sharma • UIDAI Authenticated",
    documentNumber: "XXXXXXXX4892",
    uploadDate: "2026-09-02",
    dependencies: ["Commercial Lease Deed", "PAN Tax Credential"],
    notes: "Biometric identity anchor available for statutory portal verification.",
  },
  {
    id: "doc-pan",
    title: "Proprietor PAN Tax Credential",
    category: "Identity",
    state: "Available",
    source: "Income Tax Department (NSDL/UTIITSL)",
    extractedValue: "Aarav Sharma • Sole Proprietor",
    documentNumber: "ABCPS1289K",
    uploadDate: "2026-09-02",
    dependencies: ["Commercial Lease Deed", "FSSAI State License", "GSTIN Registration"],
    notes: "Active individual tax identifier required across all commercial schedules.",
  },
  {
    id: "doc-lease",
    title: "Commercial Tenancy Lease Deed",
    category: "Premises",
    state: "Uploaded",
    source: "Sub-Registrar Registered Deed",
    extractedValue: "Shop #4, Link Road, Sector 3, Ghaziabad, Uttar Pradesh - 201010",
    documentNumber: "UP-GZB-REG-8821/2024",
    uploadDate: "2026-09-05",
    dependencies: ["Electricity Utility Connection", "FSSAI State License", "Municipal Health License"],
    notes: "Registered 3-year commercial deed with landlord NOC clause for commercial cooking.",
  },
  {
    id: "doc-electricity",
    title: "Commercial Electricity Bill (PVVNL)",
    category: "Utilities",
    state: "Connected",
    source: "Paschimanchal Vidyut Vitran Nigam API",
    extractedValue: "15kW Sanctioned Commercial Load • Active Billing",
    documentNumber: "CA-PVVNL-09482103",
    uploadDate: "2026-09-08",
    dependencies: ["FSSAI State License", "Municipal Health License"],
    notes: "Utility connection verified at Shop #4, Link Road premises.",
  },
  {
    id: "doc-water",
    title: "Potable Water Testing Report (IS 10500)",
    category: "Utilities",
    state: "Uploaded",
    source: "NABL Accredited Testing Lab",
    extractedValue: "Chemically & Microbiologically Compliant for Commercial Food Preparation",
    documentNumber: "LAB-NABL-WTR-2024-91",
    uploadDate: "2026-09-09",
    dependencies: ["FSSAI State License"],
    notes: "Mandatory potable water analysis certificate required under FoSCoS inspection criteria.",
  },
  {
    id: "doc-layout",
    title: "Kitchen Equipment & Safety Blueprint",
    category: "Compliance",
    state: "Uploaded",
    source: "CAD Facility Draft",
    extractedValue: "450 sq.ft Commercial Kitchen Layout with Extraction Hoods & Fire Extinguishers",
    documentNumber: "DWG-KITCHEN-V2",
    uploadDate: "2026-09-10",
    dependencies: ["FSSAI State License", "Fire Safety NOC"],
    notes: "Floor layout detailing separation of raw storage, preparation, cooking, and dispatch.",
  },
];

/**
 * Service Abstractions for Document Vault
 * Future contracts:
 * GET /api/vault/documents
 * POST /api/vault/upload
 * DELETE /api/vault/purge
 */
export async function getVaultDocuments(): Promise<VaultDocument[]> {
  await new Promise((res) => setTimeout(res, 120));
  return [...MOCK_VAULT_DOCUMENTS];
}

export async function uploadVaultDocument(doc: Partial<VaultDocument>): Promise<VaultDocument> {
  await new Promise((res) => setTimeout(res, 200));
  const newDoc: VaultDocument = {
    id: `doc-${Date.now()}`,
    title: doc.title || "Uploaded Document",
    category: doc.category || "Premises",
    state: "Uploaded",
    source: "User Upload",
    extractedValue: doc.extractedValue || "Extracted metadata pending audit",
    uploadDate: new Date().toISOString().split("T")[0],
    dependencies: doc.dependencies || [],
    notes: doc.notes || "Document stored in dependency vault.",
  };
  return newDoc;
}

export async function deleteVaultDocument(id: string): Promise<boolean> {
  await new Promise((res) => setTimeout(res, 150));
  return true;
}
