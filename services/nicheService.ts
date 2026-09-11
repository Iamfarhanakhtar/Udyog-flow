import { prisma } from '@/lib/db/prisma';
import { SEED_DATA } from '@/prisma/seed';

export interface MicroNicheItem {
  id: string;
  slug: string;
  name: string;
  macroCategory: string;
  description: string;
  iconName: string | null;
  estimatedDays: number | null;
  initialCapex: string | null;
  isActive: boolean;
}

export async function getAllNiches(): Promise<{ data: MicroNicheItem[]; source: 'database' | 'seed_fallback' }> {
  try {
    const niches = await prisma.microNiche.findMany({
      where: { isActive: true },
      orderBy: { name: 'asc' },
    });

    if (niches && niches.length > 0) {
      return {
        data: niches.map((n) => ({
          id: n.id,
          slug: n.slug,
          name: n.name,
          macroCategory: n.macroCategory,
          description: n.description,
          iconName: n.iconName,
          estimatedDays: n.estimatedDays,
          initialCapex: n.initialCapex,
          isActive: n.isActive,
        })),
        source: 'database',
      };
    }
  } catch (err) {
    console.warn(
      '[UdyogFlow Backend Warning] Database query for niches failed. Live DB unavailable. Falling back to deterministic seed data. Error:',
      (err as Error).message
    );
  }

  // Fallback to deterministic seed dataset
  return {
    data: SEED_DATA.microNiches.map((n, idx) => ({
      id: `niche_${idx + 1}`,
      slug: n.slug,
      name: n.name,
      macroCategory: n.macroCategory,
      description: n.description,
      iconName: n.iconName,
      estimatedDays: n.estimatedDays,
      initialCapex: n.initialCapex,
      isActive: n.isActive,
    })),
    source: 'seed_fallback',
  };
}

export async function getNicheBySlug(slug: string): Promise<{ data: MicroNicheItem | null; source: 'database' | 'seed_fallback' }> {
  try {
    const niche = await prisma.microNiche.findUnique({
      where: { slug },
    });

    if (niche) {
      return {
        data: {
          id: niche.id,
          slug: niche.slug,
          name: niche.name,
          macroCategory: niche.macroCategory,
          description: niche.description,
          iconName: niche.iconName,
          estimatedDays: niche.estimatedDays,
          initialCapex: niche.initialCapex,
          isActive: niche.isActive,
        },
        source: 'database',
      };
    }
  } catch (err) {
    console.warn(
      `[UdyogFlow Backend Warning] Database lookup for niche slug "${slug}" failed. Falling back to seed data. Error:`,
      (err as Error).message
    );
  }

  const match = SEED_DATA.microNiches.find((n) => n.slug === slug);
  if (!match) {
    return { data: null, source: 'seed_fallback' };
  }

  return {
    data: {
      id: `niche_${match.slug}`,
      slug: match.slug,
      name: match.name,
      macroCategory: match.macroCategory,
      description: match.description,
      iconName: match.iconName,
      estimatedDays: match.estimatedDays,
      initialCapex: match.initialCapex,
      isActive: match.isActive,
    },
    source: 'seed_fallback',
  };
}

/**
 * Creates a micro-niche, enforcing uniqueness of the slug.
 * Rejects duplicates with a clear validation error.
 */
export async function createMicroNiche(data: {
  slug: string;
  name: string;
  macroCategory: string;
  description: string;
  iconName?: string | null;
  estimatedDays?: number | null;
  initialCapex?: string | null;
}): Promise<MicroNicheItem> {
  const existing = await getNicheBySlug(data.slug);
  if (existing.data) {
    throw new Error(`Duplicate micro-niche slug rejected: "${data.slug}" already exists.`);
  }

  try {
    const created = await prisma.microNiche.create({
      data: {
        slug: data.slug,
        name: data.name,
        macroCategory: data.macroCategory,
        description: data.description,
        iconName: data.iconName,
        estimatedDays: data.estimatedDays,
        initialCapex: data.initialCapex,
      },
    });

    return {
      id: created.id,
      slug: created.slug,
      name: created.name,
      macroCategory: created.macroCategory,
      description: created.description,
      iconName: created.iconName,
      estimatedDays: created.estimatedDays,
      initialCapex: created.initialCapex,
      isActive: created.isActive,
    };
  } catch (err) {
    throw new Error(`Duplicate micro-niche slug rejected: "${data.slug}" already exists.`);
  }
}

