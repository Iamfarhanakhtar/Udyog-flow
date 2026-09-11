import { NextRequest, NextResponse } from 'next/server';
import { createBusiness } from '@/services/businessService';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body || typeof body !== 'object') {
      return NextResponse.json(
        { success: false, error: 'Invalid JSON request body' },
        { status: 400 }
      );
    }

    const result = await createBusiness(body);

    return NextResponse.json(
      {
        success: true,
        businessId: result.businessId,
        status: result.status,
        data: result.data,
      },
      { status: 201 }
    );
  } catch (error) {
    const message = (error as Error).message || 'Failed to create business';
    const isValidationError = message.startsWith('Validation failed:');

    if (isValidationError) {
      return NextResponse.json(
        { success: false, error: message },
        { status: 400 }
      );
    }

    console.error('[API /api/businesses POST] Internal Error:', error);
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
