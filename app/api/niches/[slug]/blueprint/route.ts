import { NextRequest, NextResponse } from 'next/server';
import { getBlueprintByNicheSlug } from '@/services/blueprintService';
import { getNicheBySlug } from '@/services/nicheService';

export const dynamic = 'force-dynamic';

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await context.params;

    if (!slug) {
      return NextResponse.json(
        { success: false, error: 'Slug parameter is required' },
        { status: 400 }
      );
    }

    const nicheCheck = await getNicheBySlug(slug);
    if (!nicheCheck.data) {
      return NextResponse.json(
        {
          success: false,
          error: `Micro-niche "${slug}" not found in system.`,
        },
        { status: 404 }
      );
    }

    const result = await getBlueprintByNicheSlug(slug);

    if (!result.data) {
      return NextResponse.json(
        {
          success: false,
          error: `Blueprint for niche "${slug}" is not configured yet. The active prototype blueprint is available at /api/niches/cloud-kitchen/blueprint.`,
          niche: nicheCheck.data,
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: result.data,
      meta: {
        source: result.source,
      },
    });
  } catch (error) {
    console.error('[API /api/niches/[slug]/blueprint] Internal Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: (error as Error).message || 'Failed to retrieve blueprint',
      },
      { status: 500 }
    );
  }
}
