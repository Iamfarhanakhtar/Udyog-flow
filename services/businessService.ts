import { prisma } from '@/lib/db/prisma';
import { SEED_DATA } from '@/prisma/seed';
import { getBlueprintByNicheSlug, NicheBlueprintDto } from './blueprintService';

export interface CreateBusinessInput {
  businessId?: string;
  userId?: string;
  legalName: string;
  macroNiche?: string;
  microNiche?: string;
  state: string;
  city: string;
  pincode: string;
  entityType: string;
}

export interface UserBusinessDto {
  id: string;
  businessId: string;
  userId: string | null;
  legalName: string;
  macroNiche: string;
  microNiche: string;
  state: string;
  city: string;
  pincode: string;
  entityType: string;
  createdAt?: string;
}

export interface PersonalizedBlueprintDto {
  business: {
    businessId: string;
    legalName: string;
    entityType: string;
    location: {
      city: string;
      state: string;
      pincode: string;
    };
    macroNiche: string;
    microNiche: string;
  };
  blueprint: NicheBlueprintDto;
  personalizedStages: Array<{
    stageNumber: number;
    stageName: string;
    description: string;
    items: string[];
    localJurisdiction: string;
  }>;
}

// In-memory fallback cache for newly created businesses during development/testing
const memoryBusinessStore = new Map<string, UserBusinessDto>();

// Preload demo business
memoryBusinessStore.set(SEED_DATA.demoBusiness.businessId, {
  id: 'biz_id_aarav_001',
  ...SEED_DATA.demoBusiness,
});

export async function createBusiness(
  input: CreateBusinessInput
): Promise<{ businessId: string; status: string; data: UserBusinessDto }> {
  // 1. Validation
  if (!input.legalName || input.legalName.trim().length < 2) {
    throw new Error('Validation failed: legalName is required and must be at least 2 characters.');
  }

  if (!input.state || input.state.trim().length === 0) {
    throw new Error('Validation failed: state is required.');
  }

  if (!input.city || input.city.trim().length === 0) {
    throw new Error('Validation failed: city is required.');
  }

  const pincodeClean = input.pincode ? input.pincode.trim() : '';
  if (!/^\d{6}$/.test(pincodeClean)) {
    throw new Error('Validation failed: pincode must be a valid 6-digit Indian postal code.');
  }

  if (!input.entityType || input.entityType.trim().length === 0) {
    throw new Error('Validation failed: entityType is required.');
  }

  const businessId =
    input.businessId ||
    `biz_${input.legalName.toLowerCase().replace(/[^a-z0-9]/g, '_').slice(0, 15)}_${Date.now().toString().slice(-4)}`;

  const recordData = {
    businessId,
    userId: input.userId || 'usr_guest_001',
    legalName: input.legalName.trim(),
    macroNiche: input.macroNiche || 'Food Processing & Hospitality',
    microNiche: input.microNiche || 'cloud-kitchen',
    state: input.state.trim(),
    city: input.city.trim(),
    pincode: pincodeClean,
    entityType: input.entityType.trim(),
  };

  try {
    const created = await prisma.userBusiness.upsert({
      where: { businessId },
      update: recordData,
      create: recordData,
    });

    const result: UserBusinessDto = {
      id: created.id,
      businessId: created.businessId,
      userId: created.userId,
      legalName: created.legalName,
      macroNiche: created.macroNiche,
      microNiche: created.microNiche,
      state: created.state,
      city: created.city,
      pincode: created.pincode,
      entityType: created.entityType,
      createdAt: created.createdAt.toISOString(),
    };

    memoryBusinessStore.set(businessId, result);
    return { businessId, status: 'created', data: result };
  } catch (err) {
    console.warn(
      `[UdyogFlow Backend Warning] Database business insertion failed for ${businessId}. Persisting to session store. Error:`,
      (err as Error).message
    );

    const fallbackResult: UserBusinessDto = {
      id: `fallback_${businessId}`,
      ...recordData,
      createdAt: new Date().toISOString(),
    };
    memoryBusinessStore.set(businessId, fallbackResult);
    return { businessId, status: 'created', data: fallbackResult };
  }
}

export async function getBusinessById(
  businessId: string
): Promise<{ data: UserBusinessDto | null; source: 'database' | 'fallback' }> {
  try {
    const biz = await prisma.userBusiness.findUnique({
      where: { businessId },
    });

    if (biz) {
      return {
        data: {
          id: biz.id,
          businessId: biz.businessId,
          userId: biz.userId,
          legalName: biz.legalName,
          macroNiche: biz.macroNiche,
          microNiche: biz.microNiche,
          state: biz.state,
          city: biz.city,
          pincode: biz.pincode,
          entityType: biz.entityType,
          createdAt: biz.createdAt.toISOString(),
        },
        source: 'database',
      };
    }
  } catch (err) {
    console.warn(
      `[UdyogFlow Backend Warning] Database lookup for businessId "${businessId}" failed. Checking memory store. Error:`,
      (err as Error).message
    );
  }

  const cached = memoryBusinessStore.get(businessId);
  if (cached) {
    return { data: cached, source: 'fallback' };
  }

  if (businessId === SEED_DATA.demoBusiness.businessId) {
    return {
      data: {
        id: 'biz_id_aarav_001',
        ...SEED_DATA.demoBusiness,
      },
      source: 'fallback',
    };
  }

  return { data: null, source: 'fallback' };
}

export async function getPersonalizedBlueprint(
  businessId: string
): Promise<{ data: PersonalizedBlueprintDto | null; source: 'database' | 'fallback' | 'seed_fallback' }> {
  const bizResult = await getBusinessById(businessId);
  if (!bizResult.data) {
    return { data: null, source: bizResult.source };
  }

  const biz = bizResult.data;
  const blueprintResult = await getBlueprintByNicheSlug(biz.microNiche);
  if (!blueprintResult.data) {
    return { data: null, source: blueprintResult.source };
  }

  const bp = blueprintResult.data;

  // Synthesize personalized compliance stages
  const personalizedStages = [
    {
      stageNumber: 1,
      stageName: 'Promoter & Business Identity Setup',
      description: `Establish legal identity for ${biz.legalName} (${biz.entityType}) in ${biz.state}.`,
      items: ['Aadhaar e-KYC Verification', 'PAN Tax Credential Registration', 'Bank Account Setup'],
      localJurisdiction: `${biz.state} State Revenue & IT Department`,
    },
    {
      stageNumber: 2,
      stageName: 'Premises Tenancy & Utility Commercialization',
      description: `Secure commercial tenancy for premises in ${biz.city}, ${biz.pincode}.`,
      items: [
        'Registered Commercial Tenancy Lease Deed',
        `Commercial Electricity Connection with ${biz.state} Power Utility`,
        'Commercial Kitchen Layout & Exhaust Planning',
      ],
      localJurisdiction: `${biz.city} Sub-Registrar Office & Power Distribution Co.`,
    },
    {
      stageNumber: 3,
      stageName: 'Core Statutory Food Safety & Municipal Approvals',
      description: `Obtain FSSAI State Food License and Municipal Health Trade clearance for ${biz.city}.`,
      items: [
        'FSSAI State Food License (FoSCoS)',
        `Municipal Health Trade License (${biz.city} Municipal Corporation)`,
        'Fire Department NOC Clearance',
        'Potable Water BIS IS:10500 Lab Certification',
      ],
      localJurisdiction: `FSSAI Regional Authority & ${biz.city} Municipal Corporation`,
    },
    {
      stageNumber: 4,
      stageName: 'Fiscal Compliance & Platform Aggregator Onboarding',
      description: `Complete GSTIN registration to enable commercial food delivery operations in ${biz.city}.`,
      items: [
        'GSTIN Registration (Regular Taxpayer)',
        'Food Aggregator Onboarding (Swiggy / Zomato)',
        'MSME / Udyam Certificate Enrollment',
      ],
      localJurisdiction: `Central & State GST Commissionerate (${biz.state})`,
    },
  ];

  return {
    data: {
      business: {
        businessId: biz.businessId,
        legalName: biz.legalName,
        entityType: biz.entityType,
        location: {
          city: biz.city,
          state: biz.state,
          pincode: biz.pincode,
        },
        macroNiche: biz.macroNiche,
        microNiche: biz.microNiche,
      },
      blueprint: bp,
      personalizedStages,
    },
    source:
      bizResult.source === 'database' && blueprintResult.source === 'database'
        ? 'database'
        : blueprintResult.source === 'seed_fallback'
        ? 'seed_fallback'
        : 'fallback',
  };
}
