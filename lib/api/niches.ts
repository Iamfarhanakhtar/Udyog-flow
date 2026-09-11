import { MicroNiche, NicheBlueprint } from "@/types/track1";

export const MOCK_MICRO_NICHES: MicroNiche[] = [
  {
    id: "bakery-confectionery",
    title: "Bakery & Confectionery Unit",
    category: "Food Processing & Hospitality",
    description: "Commercial bakery production for artisanal breads, cookies, cakes, and packaged pastries.",
    iconName: "cake",
    estimatedSetupDays: 35,
    initialCapexRange: "₹8L – ₹25L",
    primaryActionLabel: "Explore Blueprint",
    isFullySupported: false,
    highlights: ["FSSAI Manufacturing License", "State Pollution Board (Green)", "Commercial Electrical Power 15kW"],
  },
  {
    id: "dairy-cold-storage",
    title: "Dairy Processing & Cold Storage",
    category: "Food Processing & Hospitality",
    description: "Milk pasteurization, paneer/cheese manufacturing, and temperature-controlled refrigeration.",
    iconName: "milk",
    estimatedSetupDays: 60,
    initialCapexRange: "₹20L – ₹65L",
    primaryActionLabel: "Explore Blueprint",
    isFullySupported: false,
    highlights: ["FSSAI Central / State Category", "Cold Chain Subsidy (PMKSY)", "Groundwater NOC (CGWA)"],
  },
  {
    id: "craft-beverage",
    title: "Craft Beverage Unit",
    category: "Food Processing & Hospitality",
    description: "Brewing, kombucha, cold-pressed juices, and functional beverage bottling facility.",
    iconName: "cup-soda",
    estimatedSetupDays: 45,
    initialCapexRange: "₹15L – ₹40L",
    primaryActionLabel: "Explore Blueprint",
    isFullySupported: false,
    highlights: ["BIS Drinking Water Standards", "State Excise Clearance (if alc.)", "Trade Waste Effluent Clearance"],
  },
  {
    id: "frozen-foods",
    title: "Frozen Foods & Packaging",
    category: "Food Processing & Hospitality",
    description: "Ready-to-eat frozen snacks, cryogenic blast freezing, and vacuum barrier packaging.",
    iconName: "snowflake",
    estimatedSetupDays: 50,
    initialCapexRange: "₹18L – ₹50L",
    primaryActionLabel: "Explore Blueprint",
    isFullySupported: false,
    highlights: ["Factory Act Registration", "FSSAI Processing Schedule", "Fire NOC for Industrial Cold Rooms"],
  },
  {
    id: "cloud-kitchen",
    title: "Cloud Kitchen",
    category: "Food Processing & Hospitality",
    description: "Delivery-first commercial kitchen facility for multi-brand online food ordering and quick fulfillment.",
    iconName: "chef-hat",
    estimatedSetupDays: 18,
    initialCapexRange: "₹4L – ₹12L",
    primaryActionLabel: "Explore Blueprint",
    isFullySupported: true,
    highlights: [
      "FSSAI State License (FoSCoS)",
      "Municipal Health Trade License (BMC/Municipal)",
      "Commercial Lease & Utility Bill Reconciled",
    ],
  },
];

export const MOCK_CLOUD_KITCHEN_BLUEPRINT: NicheBlueprint = {
  nicheId: "cloud-kitchen",
  nicheTitle: "Cloud Kitchen Setup",
  macroCategory: "Food Processing & Hospitality",
  overview:
    "A structured statutory roadmap for establishing a compliant delivery-only commercial kitchen in urban and suburban jurisdictions. Mapped to FoSCoS state licensing regulations, municipal health protocols, and state fire authority standards.",
  requiredApprovals: [
    {
      id: "fssai-state",
      title: "FSSAI State Food License",
      authority: "Food Safety and Standards Authority of India (FoSCoS)",
      type: "Statutory Operating Permit",
      sla: "15-20 Working Days",
    },
    {
      id: "muni-trade",
      title: "Municipal Health Trade License",
      authority: "Local Municipal Corporation (e.g. Nagar Nigam / MCGM)",
      type: "Local Sanitation & Trade Permit",
      sla: "10-14 Working Days",
    },
    {
      id: "fire-noc",
      title: "Fire Department NOC",
      authority: "State Fire & Emergency Services",
      type: "Facility Safety Clearance",
      sla: "12-18 Working Days",
    },
    {
      id: "gstin-reg",
      title: "GSTIN Registration",
      authority: "Goods & Services Tax Network (CBIC / State Tax)",
      type: "Fiscal & Invoicing Identity",
      sla: "3-5 Working Days",
    },
  ],
  documentDependencies: [
    { from: "Proprietor PAN & Identity", to: "Commercial Lease Deed", relation: "Executes legal tenancy" },
    { from: "Commercial Lease Deed", to: "Commercial Electricity Bill", relation: "Proves lawful possession" },
    { from: "Commercial Electricity Bill", to: "FSSAI State License", relation: "Validates utility sanction" },
    { from: "FSSAI State License", to: "Municipal Trade License", relation: "Mandatory health prerequisite" },
    { from: "Municipal Trade License", to: "Fire Department NOC", relation: "Final premises clearance" },
  ],
  governmentSchemes: [
    {
      id: "scheme-pmegp",
      name: "Prime Minister's Employment Generation Programme (PMEGP)",
      benefit: "Up to 25%-35% capital subsidy on kitchen equipment and machinery up to ₹15 Lakhs.",
      agency: "KVIC / Ministry of MSME",
    },
    {
      id: "scheme-mudra",
      name: "Pradhan Mantri MUDRA Yojana (Kishor Category)",
      benefit: "Collateral-free working capital loan up to ₹5,00,000 for initial inventory & onboarding.",
      agency: "MUDRA / Scheduled Commercial Banks",
    },
    {
      id: "scheme-msme-power",
      name: "State Industrial Policy Electricity Duty Relief",
      benefit: "Exemption from state commercial electricity surcharge for eligible new food processing setups.",
      agency: "Department of Industries",
    },
  ],
  recommendedNextStep: "Configure your business location and legal entity structure to generate your customized compliance graph.",
  stages: [
    {
      id: "stage-profile",
      title: "Business Profile",
      category: "Profile",
      description: "Entity legal identity, trading jurisdiction, and owner metadata.",
      state: "Complete",
      authority: "Internal / UdyogFlow Control Layer",
      dependencies: [],
      actionLabel: "View Profile",
      actionHref: "/profile",
      documentsRequired: ["Proprietor Declaration"],
    },
    {
      id: "stage-identity",
      title: "Base Identity Credentials",
      category: "Identity",
      description: "Proprietor PAN and Aadhaar KYC credentials linked via DigiLocker.",
      state: "Complete",
      authority: "UIDAI & Income Tax Department",
      slaDays: 1,
      dependencies: ["Business Profile"],
      actionLabel: "Review in Vault",
      actionHref: "/vault",
      documentsRequired: ["Aadhaar Card", "PAN Card"],
    },
    {
      id: "stage-premises",
      title: "Premises & Tenancy",
      category: "Premises",
      description: "Registered commercial lease agreement matching physical kitchen location.",
      state: "Needs attention",
      authority: "Sub-Registrar / IGR",
      slaDays: 3,
      dependencies: ["Base Identity Credentials"],
      actionLabel: "Resolve Discrepancy",
      actionHref: "/forms",
      documentsRequired: ["Commercial Lease Deed"],
      notes: "Address formatting in lease deed requires harmonization with government drafts.",
    },
    {
      id: "stage-utilities",
      title: "Commercial Utilities",
      category: "Utilities",
      description: "Connected commercial electricity invoice and potable water test certificate.",
      state: "In progress",
      authority: "State Electricity Board & BIS Accredited Lab",
      slaDays: 4,
      dependencies: ["Premises & Tenancy"],
      actionLabel: "View Documents",
      actionHref: "/vault",
      documentsRequired: ["Electricity Bill", "Water Test Report"],
    },
    {
      id: "stage-food-safety",
      title: "Food Safety (FSSAI State)",
      category: "Food Safety",
      description: "State license application under FoSCoS Schedule 1 for delivery and cloud kitchen operations.",
      state: "Ready",
      authority: "Food Safety and Standards Authority of India (FoSCoS)",
      slaDays: 18,
      dependencies: ["Premises & Tenancy", "Commercial Utilities"],
      actionLabel: "Open Form Co-Pilot",
      actionHref: "/forms",
      documentsRequired: ["Form B Draft", "Kitchen Layout Plan", "FoSTaC Certificate"],
      notes: "Draft prepared. Ready for pre-submission consistency audit.",
    },
    {
      id: "stage-municipal",
      title: "Municipal Trade License",
      category: "Municipal",
      description: "Municipal health trade certificate from local urban body.",
      state: "Not started",
      authority: "Local Municipal Corporation / Health Department",
      slaDays: 12,
      dependencies: ["Food Safety (FSSAI State)"],
      actionLabel: "Locked (Awaiting FSSAI)",
      actionHref: "/blueprint",
      documentsRequired: ["FSSAI Ack Slip", "Property Tax / Lease"],
    },
    {
      id: "stage-fire",
      title: "Fire Safety NOC",
      category: "Fire",
      description: "Fire prevention and safety verification for commercial cooking equipment.",
      state: "Not started",
      authority: "State Fire & Emergency Services",
      slaDays: 15,
      dependencies: ["Municipal Trade License"],
      actionLabel: "Locked",
      actionHref: "/blueprint",
      documentsRequired: ["Extinguisher Layout", "Ducting Blueprint"],
    },
    {
      id: "stage-application",
      title: "Consolidated Portal Handoff",
      category: "Application",
      description: "Deterministic handoff packet ready for authorized department submission.",
      state: "Not started",
      authority: "Single Window Clearance Gateway",
      slaDays: 2,
      dependencies: ["Fire Safety NOC"],
      actionLabel: "Locked",
      actionHref: "/blueprint",
      documentsRequired: ["Complete Audit Verified Packet"],
    },
  ],
};

const isLiveApiEnabled = () => {
  return (
    process.env.NEXT_PUBLIC_API_MODE === "live" ||
    (typeof window !== "undefined" && window.location.hostname === "localhost")
  );
};

/**
 * Service Abstraction for Micro-Niches
 * Connects to Track-2 live API:
 * GET /api/niches
 * With clear development warning and resilient fallback on network/backend failure.
 */
export async function getNiches(): Promise<MicroNiche[]> {
  if (isLiveApiEnabled() && typeof window !== "undefined") {
    try {
      const res = await fetch("/api/niches", { cache: "no-store" });
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      }
      const json = await res.json();
      if (json.success && Array.isArray(json.data) && json.data.length > 0) {
        // Map backend MicroNiche items while preserving Track-1 frontend properties
        const mapped = json.data.map((item: {
          slug: string;
          name: string;
          macroCategory: string;
          description: string;
          iconName?: string | null;
          estimatedDays?: number | null;
          initialCapex?: string | null;
        }) => {
          const existing = MOCK_MICRO_NICHES.find((m) => m.id === item.slug);
          return {
            id: item.slug,
            title: item.name,
            category: item.macroCategory,
            description: item.description,
            iconName: existing?.iconName || "chef-hat",
            estimatedSetupDays: item.estimatedDays || existing?.estimatedSetupDays || 30,
            initialCapexRange: item.initialCapex || existing?.initialCapexRange || "₹5L – ₹15L",
            primaryActionLabel: existing?.primaryActionLabel || "Explore Blueprint",
            isFullySupported: item.slug === "cloud-kitchen",
            highlights: existing?.highlights || ["Statutory Operating Permit", "Municipal Clearances"],
          };
        });
        return mapped;
      }
    } catch (err) {
      console.warn(
        "[UdyogFlow Integration Warning] Live API /api/niches fetch failed. Falling back to local mock data. Reason:",
        (err as Error).message
      );
    }
  }

  // Simulates standard latency when fallback or mock mode is active
  await new Promise((res) => setTimeout(res, 60));
  return MOCK_MICRO_NICHES;
}

/**
 * Service Abstraction for Niche Blueprint
 * Connects to Track-2 live API:
 * GET /api/niches/[slug]/blueprint
 */
export async function getNicheBlueprint(nicheId: string): Promise<NicheBlueprint | null> {
  if (isLiveApiEnabled() && typeof window !== "undefined") {
    try {
      const res = await fetch(`/api/niches/${encodeURIComponent(nicheId)}/blueprint`, {
        cache: "no-store",
      });
      if (!res.ok) {
        if (res.status === 404) return null;
        throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      }
      const json = await res.json();
      if (json.success && json.data) {
        // Return full Track-1 blueprint with updated live overview and schemes from backend
        return {
          ...MOCK_CLOUD_KITCHEN_BLUEPRINT,
          nicheId: json.data.niche.slug,
          nicheTitle: json.data.blueprint.title,
          macroCategory: json.data.niche.macroCategory,
          overview: json.data.blueprint.overview,
          recommendedNextStep: json.data.blueprint.recommendedNextStep,
          governmentSchemes: json.data.schemes.map((s: { name: string; benefit: string; agency: string }, idx: number) => ({
            id: `scheme-${idx + 1}`,
            name: s.name,
            benefit: s.benefit,
            agency: s.agency,
          })),
        };
      }
    } catch (err) {
      console.warn(
        `[UdyogFlow Integration Warning] Live API /api/niches/${nicheId}/blueprint fetch failed. Falling back to local mock. Reason:`,
        (err as Error).message
      );
    }
  }

  await new Promise((res) => setTimeout(res, 80));
  if (nicheId === "cloud-kitchen") {
    return MOCK_CLOUD_KITCHEN_BLUEPRINT;
  }
  return null;
}
