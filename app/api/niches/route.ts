import { NextResponse } from 'next/server';
import { getAllNiches } from '@/services/nicheService';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const result = await getAllNiches();
    return NextResponse.json({
      success: true,
      count: result.data.length,
      data: result.data,
      meta: {
        source: result.source,
      },
    });
  } catch (error) {
    console.error('[API /api/niches] Internal Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: (error as Error).message || 'Failed to retrieve niches',
      },
      { status: 500 }
    );
  }
}
