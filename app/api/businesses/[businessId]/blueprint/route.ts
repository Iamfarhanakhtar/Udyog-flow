import { NextRequest, NextResponse } from 'next/server';
import { getPersonalizedBlueprint } from '@/services/businessService';

export const dynamic = 'force-dynamic';

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ businessId: string }> }
) {
  try {
    const { businessId } = await context.params;

    if (!businessId) {
      return NextResponse.json(
        { success: false, error: 'businessId parameter is required' },
        { status: 400 }
      );
    }

    const result = await getPersonalizedBlueprint(businessId);

    if (!result.data) {
      return NextResponse.json(
        {
          success: false,
          error: `Personalized blueprint could not be generated. Business "${businessId}" not found.`,
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
    console.error('[API /api/businesses/[businessId]/blueprint] Internal Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: (error as Error).message || 'Failed to retrieve personalized blueprint',
      },
      { status: 500 }
    );
  }
}
