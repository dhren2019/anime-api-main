import { db } from '@/configs/db';
import { apiKeysTable } from '@/configs/schema';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';
import { headers } from 'next/headers';

export async function validateAndCountApiKey(): Promise<{ keyData: any, errorResponse?: NextResponse }> {
  const headersList = await headers();
  const authorization = headersList.get('authorization');
  if (!authorization?.startsWith('Bearer ')) {
    return { keyData: null, errorResponse: new NextResponse('API key required', { status: 401 }) };
  }
  const apiKey = authorization.split(' ')[1];
  const keyDataArr = await db.select().from(apiKeysTable).where(eq(apiKeysTable.key, apiKey)).limit(1);
  if (!keyDataArr.length) {
    return { keyData: null, errorResponse: new NextResponse('Invalid API key', { status: 401 }) };
  }
  const keyData = keyDataArr[0];
  // Buscar todas las keys del usuario
  const allKeys = await db.select().from(apiKeysTable).where(eq(apiKeysTable.userId, keyData.userId));
  // Sumar requestsCount de todas las keys
  const totalRequests = allKeys.reduce((sum, k) => sum + (k.requestsCount || 0), 0);
  // Si alguna key es pro, el usuario es pro
  const isPro = allKeys.some(k => k.plan === 'pro');
  const limit = isPro ? 150 : 10;
  if (totalRequests >= limit) {
    return { keyData: null, errorResponse: new NextResponse('Upgrade to pro', { status: 429 }) };
  }
  // Incrementar solo la key usada
  await db.update(apiKeysTable)
    .set({ lastUsed: new Date(), requestsCount: (keyData.requestsCount || 0) + 1 })
    .where(eq(apiKeysTable.key, apiKey));
  return { keyData };
}
