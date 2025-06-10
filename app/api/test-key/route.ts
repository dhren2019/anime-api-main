import { NextResponse } from 'next/server';
import { db } from '@/configs/db';
import { apiKeysTable } from '@/configs/schema';
import { randomBytes } from 'crypto';

// Generate a secure API key
function generateApiKey() {
  return `sk-${randomBytes(24).toString('hex')}`;
}

// Mark this route as not requiring authentication
export const runtime = 'edge';
export const dynamic = 'force-dynamic';

// Disable middleware for this route
export const config = {
  matcher: '/((?!api/test-key).*)',
};

export async function GET() {
  try {
    // Crear API key con ID de usuario fijo
    const apiKey = await db.insert(apiKeysTable).values({
      userId: 1,
      name: 'Test Key',
      key: generateApiKey(),
      isActive: true
    }).returning();
    
    return NextResponse.json({ 
      success: true, 
      message: 'Use this key for testing purposes only',
      key: apiKey[0].key 
    }, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
      }
    });
  } catch (error: any) {
    console.error('Error creating test API key:', error);
    return NextResponse.json({ 
      success: false, 
      error: error?.message || 'Unknown error occurred'
    }, { 
      status: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
      }
    });
  }
} 