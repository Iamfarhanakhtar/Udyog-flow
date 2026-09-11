import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const SEED_DATA = {
  microNiches: [
    {
      slug: 'bakery-confectionery',
      name: 'Bakery & Confectionery Unit',
      macroCategory: 'Food Processing & Hospitality',
      description: 'Artisan baked goods, bread production, and confection packaging facility.',
      iconName: 'Cake',
      estimatedDays: 45,
      initialCapex: '₹8L - ₹15L',
      isActive: true,
    },
    {
      slug: 'dairy-cold-storage',
      name: 'Dairy Processing & Cold Storage',
      macroCategory: 'Food Processing & Hospitality',
      description: 'Milk chilling, pasteurization, packaging, and cold chain distribution facility.',
      iconName: 'Milk',
      estimatedDays: 60,
      initialCapex: '₹15L - ₹35L',
      isActive: true,
    },
    {
      slug: 'craft-beverage',
      name: 'Craft Beverage Unit',
      macroCategory: 'Food Processing & Hospitality',
      description: 'Specialty brews, cold-press juices, and non-alcoholic fermentation processing.',
      iconName: 'Wine',
      estimatedDays: 50,
      initialCapex: '₹10L - ₹20L',
      isActive: true,
    },
    {
      slug: 'frozen-foods',
      name: 'Frozen Foods & Packaging',
      macroCategory: 'Food Processing & Hospitality',
      description: 'Quick-freezing (IQF), ready-to-cook packaging, and temperature-controlled operations.',
      iconName: 'Snowflake',
      estimatedDays: 55,
      initialCapex: '₹12L - ₹25L',
      isActive: true,
    },
    {
      slug: 'cloud-kitchen',
      name: 'Cloud Kitchen',
      macroCategory: 'Food Processing & Hospitality',
      description: 'Delivery-only commercial culinary facility optimized for multi-brand cloud orders and quick-service delivery.',
      iconName: 'ChefHat',
      estimatedDays: 30,
      initialCapex: '₹5L - ₹12L',
      isActive: true,
    },
  ],

  cloudKitchenBlueprint: {
    title: 'Cloud Kitchen Operational & Compliance Blueprint',
    overview: 'Comprehensive statutory and operational compliance roadmap for launching a commercial delivery-only kitchen in India. Maps regulatory clearances from base identity to municipal health trade licensing.',
    setupSummary: 'Estimated 30-45 working days statutory clearance timeline. Roadmap order: Base Identity → Registered Commercial Tenancy Lease Deed → FSSAI Food Safety State License → Municipal Health Trade License (with Fire Safety NOC and GSTIN). Note: This represents the prototype regulatory sequence and is not an exhaustive universal legal graph.',
    recommendedNextStep: 'Verify promoter PAN and Aadhaar credentials before executing commercial lease registration.',
    isActive: true,
  },

  documentRequirements: [
    {
      slug: 'doc_aadhaar',
      name: 'Aadhaar e-KYC Verification',
      description: 'UIDAI biometric/OTP verified identity credential of promoter/authorized signatory.',
      category: 'IDENTITY',
      source: 'Unique Identification Authority of India (UIDAI)',
      sourceUrl: 'https://uidai.gov.in',
      lastVerified: '2026-08-15',
    },
    {
      slug: 'doc_pan',
      name: 'Permanent Account Number (PAN) Card',
      description: 'Income tax department issued business/individual tax identification credential.',
      category: 'TAX',
      source: 'Income Tax Department of India',
      sourceUrl: 'https://incometax.gov.in',
      lastVerified: '2026-08-15',
    },
    {
      slug: 'doc_lease',
      name: 'Registered Commercial Tenancy Lease Deed',
      description: 'Registered lease deed or rental agreement establishing legal occupancy of commercial premises.',
      category: 'PREMISES',
      source: 'State Registration and Stamps Department',
      sourceUrl: 'https://igrsup.gov.in',
      lastVerified: '2026-08-15',
    },
    {
      slug: 'doc_electricity',
      name: 'Commercial Electricity Utility Bill',
      description: 'Recent commercial electricity billing statement verifying industrial/commercial sanctioned load.',
      category: 'UTILITY',
      source: 'State Electricity Distribution Utility',
      sourceUrl: 'https://uppcl.org',
      lastVerified: '2026-08-15',
    },
    {
      slug: 'doc_water_report',
      name: 'Potable Water Chemical & Bacteriological Test Report',
      description: 'NABL-accredited laboratory certified potability analysis confirming BIS IS:10500 standards.',
      category: 'OPERATIONAL',
      source: 'NABL Accredited Testing Laboratory',
      sourceUrl: 'https://nabl-india.org',
      lastVerified: '2026-08-15',
    },
    {
      slug: 'doc_kitchen_layout',
      name: 'Commercial Kitchen Layout & Equipment Blueprint',
      description: 'Architect/MEP certified layout detailing food preparation zones, exhaust chimneys, and drainage.',
      category: 'OPERATIONAL',
      source: 'Council of Architecture / MEP Consultant Standards',
      sourceUrl: 'https://udyogflow.gov.in/standards/kitchen-specs',
      lastVerified: '2026-08-15',
    },
  ],

  licenseRequirements: [
    {
      slug: 'fssai-state-license',
      licenseName: 'FSSAI State Food License',
      issuingAuthority: 'Food Safety and Standards Authority of India (FSSAI)',
      description: 'Statutory food business operating authorization for medium-scale commercial food processing and cloud kitchens.',
      status: 'MANDATORY',
      priority: 1,
      sla: '15-30 Working Days',
      sourceAuthority: 'FSSAI FoSCoS Regulatory Portal',
      sourceUrl: 'https://foscos.fssai.gov.in',
      lastVerified: '2026-08-15',
      requiredDocSlugs: ['doc_aadhaar', 'doc_pan', 'doc_lease', 'doc_water_report', 'doc_kitchen_layout'],
    },
    {
      slug: 'municipal-trade-license',
      licenseName: 'Municipal Health Trade License',
      issuingAuthority: 'Municipal Corporation / Urban Local Body (ULB)',
      description: 'Local authority operating license confirming compliance with municipal sanitation, waste disposal, and zoning laws.',
      status: 'MANDATORY',
      priority: 2,
      sla: '20-40 Working Days',
      sourceAuthority: 'Ministry of Housing and Urban Affairs / Local Civic Body',
      sourceUrl: 'https://mohua.gov.in',
      lastVerified: '2026-08-15',
      requiredDocSlugs: ['doc_aadhaar', 'doc_pan', 'doc_lease', 'doc_electricity', 'doc_kitchen_layout'],
    },
    {
      slug: 'fire-safety-noc',
      licenseName: 'Fire Department No Objection Certificate (NOC)',
      issuingAuthority: 'State Fire & Emergency Services Directorate',
      description: 'Inspection clearance certifying installed fire suppression equipment, smoke extraction, and unobstructed evacuation exits.',
      status: 'MANDATORY',
      priority: 3,
      sla: '15-25 Working Days',
      sourceAuthority: 'Directorate General Fire Services, Civil Defence & Home Guards',
      sourceUrl: 'https://dgfscdh.gov.in',
      lastVerified: '2026-08-15',
      requiredDocSlugs: ['doc_lease', 'doc_electricity', 'doc_kitchen_layout'],
    },
    {
      slug: 'gstin-registration',
      licenseName: 'Goods and Services Tax Identification Number (GSTIN)',
      issuingAuthority: 'Goods and Services Tax Network (GSTN), Ministry of Finance',
      description: 'Mandatory fiscal tax registration required for food aggregator onboarding (Zomato/Swiggy) and inter-state purchasing.',
      status: 'MANDATORY',
      priority: 4,
      sla: '3-7 Working Days',
      sourceAuthority: 'GST Council / GST Official Portal',
      sourceUrl: 'https://www.gst.gov.in',
      lastVerified: '2026-08-15',
      requiredDocSlugs: ['doc_aadhaar', 'doc_pan', 'doc_lease', 'doc_electricity'],
    },
  ],

  // License Dependencies (license slug -> depends on prerequisite slug)
  dependencies: [
    {
      licenseSlug: 'municipal-trade-license',
      prerequisiteSlug: 'fssai-state-license',
    },
    {
      licenseSlug: 'municipal-trade-license',
      prerequisiteSlug: 'fire-safety-noc',
    },
  ],

  schemes: [
    {
      name: 'Prime Minister Employment Generation Programme (PMEGP)',
      description: 'Credit-linked subsidy program for setting up new micro-enterprises in food processing and services.',
      benefit: 'Up to 35% margin money government subsidy on eligible project capital costs up to ₹25-50 Lakhs.',
      agency: 'Khadi and Village Industries Commission (KVIC) / Ministry of MSME',
      status: 'Potentially relevant',
      sourceAuthority: 'Ministry of MSME, Government of India',
      sourceUrl: 'https://msme.gov.in/pmegp',
      lastVerified: '2026-08-15',
    },
    {
      name: 'Pradhan Mantri MUDRA Yojana (PMMY) - Kishor Tier',
      description: 'Collateral-free institutional micro-credit for commercial kitchen equipment, ovens, and refrigeration setup.',
      benefit: 'Working capital and term finance loans between ₹50,000 and ₹5,00,000 at competitive bank lending rates.',
      agency: 'Micro Units Development and Refinance Agency (MUDRA) / Public Sector Banks',
      status: 'Check eligibility',
      sourceAuthority: 'Department of Financial Services, Ministry of Finance',
      sourceUrl: 'https://mudra.org.in',
      lastVerified: '2026-08-15',
    },
    {
      name: 'State Food Processing Power Tariff Subsidy',
      description: 'Industrial rate concessions and 5-year electricity duty exemption for registered food operations.',
      benefit: 'Subsidized power tariff of ₹1.50 - ₹2.00 per unit rebate plus full exemption from state electricity duties.',
      agency: 'State Directorate of Industries & Infrastructure',
      status: 'Check eligibility',
      sourceAuthority: 'State Industrial Development Authority',
      sourceUrl: 'https://investup.org.in',
      lastVerified: '2026-08-15',
    },
  ],

  demoBusiness: {
    businessId: 'biz_aarav_001',
    userId: 'usr_aarav_001',
    legalName: "Aarav's Cloud Kitchen",
    macroNiche: 'Food Processing & Hospitality',
    microNiche: 'cloud-kitchen',
    state: 'Uttar Pradesh',
    city: 'Ghaziabad',
    pincode: '201010',
    entityType: 'Sole Proprietorship',
  },
};

export async function seedDatabase() {
  console.log('🌱 Starting UdyogFlow Track-2 Database Seed...');

  // 1. Seed MicroNiches
  const nicheMap: Record<string, string> = {};
  for (const n of SEED_DATA.microNiches) {
    const record = await prisma.microNiche.upsert({
      where: { slug: n.slug },
      update: n,
      create: n,
    });
    nicheMap[n.slug] = record.id;
    console.log(`  ✓ MicroNiche: ${n.name} (${n.slug})`);
  }

  const cloudKitchenId = nicheMap['cloud-kitchen'];
  if (!cloudKitchenId) {
    throw new Error('Cloud Kitchen micro-niche ID not found during seed');
  }

  // 2. Seed Cloud Kitchen Blueprint
  await prisma.nicheBlueprint.upsert({
    where: { microNicheId: cloudKitchenId },
    update: {
      ...SEED_DATA.cloudKitchenBlueprint,
    },
    create: {
      microNicheId: cloudKitchenId,
      ...SEED_DATA.cloudKitchenBlueprint,
    },
  });
  console.log('  ✓ NicheBlueprint: Cloud Kitchen');

  // 3. Seed Document Requirements
  const docMap: Record<string, string> = {};
  for (const d of SEED_DATA.documentRequirements) {
    const record = await prisma.documentRequirement.upsert({
      where: { slug: d.slug },
      update: d,
      create: d,
    });
    docMap[d.slug] = record.id;
    console.log(`  ✓ DocumentRequirement: ${d.name} (${d.slug})`);
  }

  // 4. Seed License Requirements
  const licenseMap: Record<string, string> = {};
  for (const lic of SEED_DATA.licenseRequirements) {
    const { requiredDocSlugs, ...licData } = lic;
    const record = await prisma.licenseRequirement.upsert({
      where: {
        slug_microNicheId: {
          slug: lic.slug,
          microNicheId: cloudKitchenId,
        },
      },
      update: {
        ...licData,
      },
      create: {
        microNicheId: cloudKitchenId,
        ...licData,
      },
    });
    licenseMap[lic.slug] = record.id;
    console.log(`  ✓ LicenseRequirement: ${lic.licenseName} (${lic.slug})`);

    // Map documents
    for (const docSlug of requiredDocSlugs) {
      const docId = docMap[docSlug];
      if (docId) {
        await prisma.licenseDocumentRequirement.upsert({
          where: {
            licenseId_documentRequirementId: {
              licenseId: record.id,
              documentRequirementId: docId,
            },
          },
          update: { required: true },
          create: {
            licenseId: record.id,
            documentRequirementId: docId,
            required: true,
          },
        });
      }
    }
  }

  // 5. Seed License Dependencies
  for (const dep of SEED_DATA.dependencies) {
    const licId = licenseMap[dep.licenseSlug];
    const prereqId = licenseMap[dep.prerequisiteSlug];
    if (licId && prereqId) {
      await prisma.licenseDependency.upsert({
        where: {
          licenseId_prerequisiteLicenseId: {
            licenseId: licId,
            prerequisiteLicenseId: prereqId,
          },
        },
        update: {},
        create: {
          licenseId: licId,
          prerequisiteLicenseId: prereqId,
        },
      });
      console.log(`  ✓ LicenseDependency: ${dep.licenseSlug} -> requires -> ${dep.prerequisiteSlug}`);
    }
  }

  // 6. Seed Government Schemes
  for (const s of SEED_DATA.schemes) {
    const existing = await prisma.governmentScheme.findFirst({
      where: {
        microNicheId: cloudKitchenId,
        name: s.name,
      },
    });
    if (!existing) {
      await prisma.governmentScheme.create({
        data: {
          microNicheId: cloudKitchenId,
          ...s,
        },
      });
    }
    console.log(`  ✓ GovernmentScheme: ${s.name}`);
  }

  // 7. Seed Demo User Business
  await prisma.userBusiness.upsert({
    where: { businessId: SEED_DATA.demoBusiness.businessId },
    update: SEED_DATA.demoBusiness,
    create: SEED_DATA.demoBusiness,
  });
  console.log(`  ✓ Demo UserBusiness: ${SEED_DATA.demoBusiness.legalName} (${SEED_DATA.demoBusiness.businessId})`);

  console.log('✅ UdyogFlow Track-2 Seed Completed Successfully.');
}

// Execute directly if run via CLI
if (require.main === module) {
  seedDatabase()
    .catch((e) => {
      console.error('❌ Seed failed:', e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}
