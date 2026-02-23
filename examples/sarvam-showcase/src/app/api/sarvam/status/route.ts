import { NextResponse } from 'next/server';

export async function GET() {
    return NextResponse.json({
        hasKey: !!process.env.SARVAM_API_KEY,
    });
}
