import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { db } from '@/configs/db';
import { apiKeysTable } from '@/configs/schema';
import { eq } from 'drizzle-orm';

export async function GET() {
  console.log('[API validate] Validando API key sin incrementar contador');
  
  try {
    const headersList = await headers();
    const authorization = headersList.get('authorization');
    if (!authorization?.startsWith('Bearer ')) {
      console.log('[API validate] Falta autorización');
      return new NextResponse('API key required', { status: 401 });
    }
    
    const apiKey = authorization.split(' ')[1];
    const keyDataArr = await db.select().from(apiKeysTable).where(eq(apiKeysTable.key, apiKey)).limit(1);
    if (!keyDataArr.length) {
      console.log('[API validate] API key inválida:', apiKey);
      return new NextResponse('Invalid API key', { status: 401 });
    }
    
    const keyData = keyDataArr[0];
    // Buscar todas las keys del usuario para verificar plan y límites
    const allKeys = await db.select().from(apiKeysTable).where(eq(apiKeysTable.userId, keyData.userId));
    const isPro = allKeys.some(k => k.plan === 'pro');
    const limit = isPro ? 150 : 10;
    const totalRequests = allKeys.reduce((sum, k) => sum + (k.requestsCount || 0), 0);
    
    console.log('[API validate] Key válida - userId:', keyData.userId, '| plan:', isPro ? 'pro' : 'free', '| requests:', totalRequests, '/', limit);
    
    // NO incrementar contador, solo validar
    return NextResponse.json({ 
      valid: true, 
      plan: isPro ? 'pro' : 'free',
      requestsCount: totalRequests,
      requestsLimit: limit
    });
  } catch (error) {
    console.error('[API validate] Error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
