import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { db } from '@/configs/db';
import { apiKeysTable } from '@/configs/schema';
import { eq } from 'drizzle-orm';

export async function GET(request: Request) {
  try {
    const headersList = await headers();
    const authorization = headersList.get('authorization');
    
    if (!authorization?.startsWith('Bearer ')) {
      return NextResponse.json({ 
        valid: false, 
        error: 'API key required' 
      }, { status: 401 });
    }

    const apiKey = authorization.split(' ')[1];
    
    // Validate API key
    const keyExists = await db.select()
      .from(apiKeysTable)
      .where(eq(apiKeysTable.key, apiKey))
      .limit(1);

    if (!keyExists.length) {
      return NextResponse.json({ 
        valid: false, 
        error: 'Invalid API key' 
      }, { status: 401 });
    }

    return NextResponse.json({ 
      valid: true, 
      message: 'API key is valid' 
    });
    
  } catch (error) {
    return NextResponse.json({ 
      valid: false, 
      error: 'Internal server error' 
    }, { status: 500 });
  }
}