import { FormSchema } from "@/types/track1";

export const MOCK_FSSAI_FORM_SCHEMA: FormSchema = {
  formId: "fssai-form-b",
  formTitle: "FSSAI Form B: State Food License Application (FoSCoS Schedule 1)",
  issuingAuthority: "Food Safety and Standards Authority of India (FoSCoS)",
  fields: [
    {
      id: "field-legal-name",
      label: "Legal Business / Brand Name",
      required: true,
      type: "text",
      currentValue: "Aarav's Cloud Kitchen",
      suggestedValue: "Aarav's Cloud Kitchen",
      sourceDocumentId: "doc-pan",
      sourceDocumentName: "Proprietor PAN Tax Credential",
      hasMismatch: false,
    },
    {
      id: "field-fbo-name",
      label: "Designated Food Business Operator (FBO)",
      required: true,
      type: "text",
      currentValue: "Aarav Sharma",
      suggestedValue: "Aarav Sharma",
      sourceDocumentId: "doc-aadhaar",
      sourceDocumentName: "Aadhaar e-KYC Identity Credential",
      hasMismatch: false,
    },
    {
      id: "field-food-category",
      label: "Food Category under FoSCoS Schedule 1",
      required: true,
      type: "select",
      currentValue: "Category 16: Prepared Foods (Cloud Kitchen / Direct Delivery)",
      suggestedValue: "Category 16: Prepared Foods (Cloud Kitchen / Direct Delivery)",
      sourceDocumentId: "doc-layout",
      sourceDocumentName: "Kitchen Equipment & Safety Blueprint",
      hasMismatch: false,
      options: [
        "Category 16: Prepared Foods (Cloud Kitchen / Direct Delivery)",
        "Category 14: Beverages (Non-alcoholic)",
        "Category 08: Meat & Poultry Products",
      ],
    },
    {
      id: "field-address",
      label: "Operational Kitchen Premises Address",
      required: true,
      type: "textarea",
      // Deliberately conflicting entry ("Shop #4-A" vs Lease "Shop #4") for AI Audit demo!
      currentValue: "Shop #4-A, Link Road, Sector 3, Ghaziabad, Uttar Pradesh",
      suggestedValue: "Shop #4, Link Road, Sector 3, Ghaziabad, Uttar Pradesh - 201010",
      sourceDocumentId: "doc-lease",
      sourceDocumentName: "Commercial Tenancy Lease Deed",
      hasMismatch: true,
    },
    {
      id: "field-installed-capacity",
      label: "Daily Production Capacity (Meals / Day)",
      required: true,
      type: "text",
      currentValue: "250 - 500 orders / day",
      suggestedValue: "250 - 500 orders / day",
      sourceDocumentId: "doc-layout",
      sourceDocumentName: "Kitchen Equipment & Safety Blueprint",
      hasMismatch: false,
    },
    {
      id: "field-water-source",
      label: "Potable Water Supply Source",
      required: true,
      type: "text",
      currentValue: "Municipal Supply with Commercial Reverse Osmosis (RO) Purification",
      suggestedValue: "Municipal Supply with Commercial Reverse Osmosis (RO) Purification",
      sourceDocumentId: "doc-water",
      sourceDocumentName: "Potable Water Testing Report (IS 10500)",
      hasMismatch: false,
    },
    {
      id: "field-electricity-load",
      label: "Sanctioned Commercial Electricity Connection",
      required: true,
      type: "text",
      currentValue: "15kW Connected Commercial Load (PVVNL Account CA-PVVNL-09482103)",
      suggestedValue: "15kW Connected Commercial Load (PVVNL Account CA-PVVNL-09482103)",
      sourceDocumentId: "doc-electricity",
      sourceDocumentName: "Commercial Electricity Bill (PVVNL)",
      hasMismatch: false,
    },
  ],
};

/**
 * Service Abstraction for Form Co-Pilot
 * Future contract:
 * GET /api/form-schema/fssai
 */
export async function getFssaiFormSchema(): Promise<FormSchema> {
  await new Promise((res) => setTimeout(res, 120));
  return JSON.parse(JSON.stringify(MOCK_FSSAI_FORM_SCHEMA));
}
