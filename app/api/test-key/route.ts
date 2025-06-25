import { NextResponse } from 'next/server';
import { db } from '@/configs/db';
import { apiKeysTable } from '@/configs/schema';

// Generate a secure API key using Web Crypto API
async function generateApiKey() {
  const array = new Uint8Array(24);
  crypto.getRandomValues(array);
  return `sk-${Array.from(array).map(b => b.toString(16).padStart(2, '0')).join('')}`;
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
      key: await generateApiKey(),
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