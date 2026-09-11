import { prisma } from '@/lib/db/prisma';
import { SEED_DATA } from '@/prisma/seed';

export interface DocumentRequirementDto {
  slug: string;
  name: string;
  description: string;
  category: string;
  source: string;
  sourceUrl: string;
  lastVerified: string;
}

export interface LicenseRequirementDto {
  id: string;
  slug: string;
  licenseName: string;
  issuingAuthority: string;
  description: string;
  status: string;
  priority: number;
  sla: string | null;
  sourceAuthority: string;
  sourceUrl: string;
  lastVerified: string;
  prerequisites: string[];
  requiredDocuments: DocumentRequirementDto[];
}

export interface GovernmentSchemeDto {
  name: string;
  description: string;
  benefit: string;
  agency: string;
  status: string;
  sourceAuthority: string;
  sourceUrl: string;
  lastVerified: string;
}

export interface NicheBlueprintDto {
  niche: {
    slug: string;
    name: string;
    macroCategory: string;
    description: string;
    iconName: string | null;
    estimatedDays: number | null;
    initialCapex: string | null;
  };
  blueprint: {
    title: string;
    overview: string;
    setupSummary: string;
    recommendedNextStep: string;
  };
  regulatoryNotice: {
    prototypeRoadmap: string;
    disclaimer: string;
  };
  licenses: LicenseRequirementDto[];
  documentVault: {
    identity: DocumentRequirementDto[];
    tax: DocumentRequirementDto[];
    premises: DocumentRequirementDto[];
    utility: DocumentRequirementDto[];
    operational: DocumentRequirementDto[];
  };
  schemes: GovernmentSchemeDto[];
}

export async function getBlueprintByNicheSlug(
  slug: string
): Promise<{ data: NicheBlueprintDto | null; source: 'database' | 'seed_fallback' }> {
  try {
    const niche = await prisma.microNiche.findUnique({
      where: { slug },
      include: {
        blueprint: true,
        licenseRequirements: {
          include: {
            prerequisites: {
              include: {
                prerequisiteLicense: true,
              },
            },
            documentRequirements: {
              include: {
                documentRequirement: true,
              },
            },
          },
          orderBy: { priority: 'asc' },
        },
        governmentSchemes: true,
      },
    });

    if (niche && niche.blueprint) {
      const documentsSet = new Map<string, DocumentRequirementDto>();

      const licenses: LicenseRequirementDto[] = niche.licenseRequirements.map((lic) => {
        const docs: DocumentRequirementDto[] = lic.documentRequirements.map((ldr) => {
          const docDto: DocumentRequirementDto = {
            slug: ldr.documentRequirement.slug,
            name: ldr.documentRequirement.name,
            description: ldr.documentRequirement.description,
            category: ldr.documentRequirement.category,
            source: ldr.documentRequirement.source,
            sourceUrl: ldr.documentRequirement.sourceUrl,
            lastVerified: ldr.documentRequirement.lastVerified,
          };
          documentsSet.set(docDto.slug, docDto);
          return docDto;
        });

        return {
          id: lic.id,
          slug: lic.slug,
          licenseName: lic.licenseName,
          issuingAuthority: lic.issuingAuthority,
          description: lic.description,
          status: lic.status,
          priority: lic.priority,
          sla: lic.sla,
          sourceAuthority: lic.sourceAuthority,
          sourceUrl: lic.sourceUrl,
          lastVerified: lic.lastVerified,
          prerequisites: lic.prerequisites.map((p) => p.prerequisiteLicense.slug),
          requiredDocuments: docs,
        };
      });

      const allDocs = Array.from(documentsSet.values());

      return {
        data: {
          niche: {
            slug: niche.slug,
            name: niche.name,
            macroCategory: niche.macroCategory,
            description: niche.description,
            iconName: niche.iconName,
            estimatedDays: niche.estimatedDays,
            initialCapex: niche.initialCapex,
          },
          blueprint: {
            title: niche.blueprint.title,
            overview: niche.blueprint.overview,
            setupSummary: niche.blueprint.setupSummary,
            recommendedNextStep: niche.blueprint.recommendedNextStep,
          },
          regulatoryNotice: {
            prototypeRoadmap:
              'Base Identity → Registered Commercial Tenancy Lease Deed → FSSAI Food Safety State License → Municipal Health Trade License (with Fire Safety NOC & GSTIN)',
            disclaimer:
              'This represents the prototype regulatory sequence for demonstration and testing, not an exhaustive universal legal graph.',
          },
          licenses,
          documentVault: {
            identity: allDocs.filter((d) => d.category === 'IDENTITY'),
            tax: allDocs.filter((d) => d.category === 'TAX'),
            premises: allDocs.filter((d) => d.category === 'PREMISES'),
            utility: allDocs.filter((d) => d.category === 'UTILITY'),
            operational: allDocs.filter((d) => d.category === 'OPERATIONAL'),
          },
          schemes: niche.governmentSchemes.map((s) => ({
            name: s.name,
            description: s.description,
            benefit: s.benefit,
            agency: s.agency,
            status: s.status,
            sourceAuthority: s.sourceAuthority,
            sourceUrl: s.sourceUrl,
            lastVerified: s.lastVerified,
          })),
        },
        source: 'database',
      };
    }
  } catch (err) {
    console.warn(
      `[UdyogFlow Backend Warning] Database query for blueprint "${slug}" failed. Falling back to deterministic seed data. Error:`,
      (err as Error).message
    );
  }

  // Fallback to deterministic seed data for cloud-kitchen
  if (slug !== 'cloud-kitchen') {
    // Check if it's one of the other 4 niches without full blueprints
    const exists = SEED_DATA.microNiches.some((n) => n.slug === slug);
    if (exists) {
      return { data: null, source: 'seed_fallback' }; // valid niche, but no blueprint created yet
    }
    return { data: null, source: 'seed_fallback' }; // non-existent niche
  }

  const cloudKitchen = SEED_DATA.microNiches.find((n) => n.slug === 'cloud-kitchen')!;
  const docMap = new Map(SEED_DATA.documentRequirements.map((d) => [d.slug, d]));

  const licenses: LicenseRequirementDto[] = SEED_DATA.licenseRequirements.map((lic, idx) => {
    const docs = lic.requiredDocSlugs.map((slug) => docMap.get(slug)!).filter(Boolean);
    const prereqs = SEED_DATA.dependencies
      .filter((d) => d.licenseSlug === lic.slug)
      .map((d) => d.prerequisiteSlug);

    return {
      id: `lic_${idx + 1}`,
      slug: lic.slug,
      licenseName: lic.licenseName,
      issuingAuthority: lic.issuingAuthority,
      description: lic.description,
      status: lic.status,
      priority: lic.priority,
      sla: lic.sla,
      sourceAuthority: lic.sourceAuthority,
      sourceUrl: lic.sourceUrl,
      lastVerified: lic.lastVerified,
      prerequisites: prereqs,
      requiredDocuments: docs,
    };
  });

  const allDocs = SEED_DATA.documentRequirements;

  return {
    data: {
      niche: {
        slug: cloudKitchen.slug,
        name: cloudKitchen.name,
        macroCategory: cloudKitchen.macroCategory,
        description: cloudKitchen.description,
        iconName: cloudKitchen.iconName,
        estimatedDays: cloudKitchen.estimatedDays,
        initialCapex: cloudKitchen.initialCapex,
      },
      blueprint: {
        title: SEED_DATA.cloudKitchenBlueprint.title,
        overview: SEED_DATA.cloudKitchenBlueprint.overview,
        setupSummary: SEED_DATA.cloudKitchenBlueprint.setupSummary,
        recommendedNextStep: SEED_DATA.cloudKitchenBlueprint.recommendedNextStep,
      },
      regulatoryNotice: {
        prototypeRoadmap:
          'Base Identity → Registered Commercial Tenancy Lease Deed → FSSAI Food Safety State License → Municipal Health Trade License (with Fire Safety NOC & GSTIN)',
        disclaimer:
          'This represents the prototype regulatory sequence for demonstration and testing, not an exhaustive universal legal graph.',
      },
      licenses,
      documentVault: {
        identity: allDocs.filter((d) => d.category === 'IDENTITY'),
        tax: allDocs.filter((d) => d.category === 'TAX'),
        premises: allDocs.filter((d) => d.category === 'PREMISES'),
        utility: allDocs.filter((d) => d.category === 'UTILITY'),
        operational: allDocs.filter((d) => d.category === 'OPERATIONAL'),
      },
      schemes: SEED_DATA.schemes,
    },
    source: 'seed_fallback',
  };
}

/**
 * Validates whether adding a dependency (license -> prerequisite) creates
 * a self-loop or a circular cycle.
 */
export async function validateLicenseDependencies(
  licenseIdOrSlug: string,
  prerequisiteIdOrSlug: string,
  existingDependencies?: Array<{ licenseSlug: string; prerequisiteSlug: string }>
): Promise<{ valid: boolean; error?: string }> {
  // 1. Self-reference check
  if (licenseIdOrSlug === prerequisiteIdOrSlug) {
    return {
      valid: false,
      error: `Self-referential dependency rejected: License "${licenseIdOrSlug}" cannot depend on itself.`,
    };
  }

  // 2. Build adjacency list of dependencies
  // A depends on B means there is a directed edge license -> prerequisite
  const adj = new Map<string, Set<string>>();

  const addEdge = (u: string, v: string) => {
    if (!adj.has(u)) adj.set(u, new Set());
    adj.get(u)!.add(v);
  };

  if (existingDependencies) {
    for (const dep of existingDependencies) {
      addEdge(dep.licenseSlug, dep.prerequisiteSlug);
    }
  } else {
    try {
      const deps = await prisma.licenseDependency.findMany({
        include: {
          license: true,
          prerequisiteLicense: true,
        },
      });
      for (const d of deps) {
        addEdge(d.license.slug, d.prerequisiteLicense.slug);
      }
    } catch {
      for (const d of SEED_DATA.dependencies) {
        addEdge(d.licenseSlug, d.prerequisiteSlug);
      }
    }
  }

  // 3. Duplicate pair check: Reject if the dependency pair already exists
  if (adj.get(licenseIdOrSlug)?.has(prerequisiteIdOrSlug)) {
    return {
      valid: false,
      error: `Duplicate license dependency pair rejected: Dependency from "${licenseIdOrSlug}" to "${prerequisiteIdOrSlug}" already exists.`,
    };
  }

  // 4. Cycle detection: Adding edge (licenseIdOrSlug -> prerequisiteIdOrSlug)
  // would create a cycle if prerequisiteIdOrSlug can already reach licenseIdOrSlug.
  const visited = new Set<string>();
  const canReach = (current: string, target: string): boolean => {
    if (current === target) return true;
    visited.add(current);
    const neighbors = adj.get(current);
    if (neighbors) {
      for (const next of neighbors) {
        if (!visited.has(next)) {
          if (canReach(next, target)) return true;
        }
      }
    }
    return false;
  };

  if (canReach(prerequisiteIdOrSlug, licenseIdOrSlug)) {
    return {
      valid: false,
      error: `Circular dependency detected: "${prerequisiteIdOrSlug}" already depends directly or transitively on "${licenseIdOrSlug}".`,
    };
  }

  return { valid: true };
}
