import { db } from '@/configs/db';
import { apiKeysTable } from '@/configs/schema';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';
import { headers } from 'next/headers';

export async function validateAndCountApiKey(): Promise<{ keyData: any, errorResponse?: NextResponse }> {
  const headersList = await headers();
  const authorization = headersList.get('authorization');
  if (!authorization?.startsWith('Bearer ')) {
    console.log('[API DEBUG] Falta autorización');
    return { keyData: null, errorResponse: new NextResponse('API key required', { status: 401 }) };
  }
  const apiKey = authorization.split(' ')[1];
  const keyDataArr = await db.select().from(apiKeysTable).where(eq(apiKeysTable.key, apiKey)).limit(1);
  if (!keyDataArr.length) {
    console.log('[API DEBUG] API key inválida:', apiKey);
    return { keyData: null, errorResponse: new NextResponse('Invalid API key', { status: 401 }) };
  }
  const keyData = keyDataArr[0];
  console.log('[API DEBUG] Key data encontrada:', keyData);
  // Buscar todas las keys del usuario
  const allKeys = await db.select().from(apiKeysTable).where(eq(apiKeysTable.userId, keyData.userId));
  console.log('[API DEBUG] Todas las keys del usuario:', allKeys.length);
  // Sumar requestsCount de todas las keys ANTES del incremento
  const totalRequestsBefore = allKeys.reduce((sum, k) => sum + (k.requestsCount || 0), 0);
  console.log('[API DEBUG] Total requests ANTES del incremento:', totalRequestsBefore);
  // Si alguna key es pro, el usuario es pro
  const isPro = allKeys.some(k => k.plan === 'pro');
  const limit = isPro ? 150 : 10;
  console.log('[API DEBUG] userId:', keyData.userId, '| plan global:', isPro ? 'pro' : 'free', '| límite global:', limit);
  allKeys.forEach(k => {
    console.log(`[API DEBUG] key: ${k.key.substring(0, 20)}... | plan individual: ${k.plan} | requestsCount: ${k.requestsCount}`);
  });
  console.log('[API DEBUG] Verificando límite global:', totalRequestsBefore, '>=', limit, '?', totalRequestsBefore >= limit);
  if (totalRequestsBefore >= limit) {
    console.log('[API DEBUG] Límite GLOBAL alcanzado:', totalRequestsBefore, '/', limit, '- Usuario', isPro ? 'PRO' : 'FREE');
    return { keyData: null, errorResponse: new NextResponse(isPro ? 'API limit exceeded' : 'Upgrade to pro', { status: 429 }) };
  }
  // Incrementar solo la key usada
  console.log('[API DEBUG] Incrementando key:', apiKey.substring(0, 20), '... de', keyData.requestsCount, 'a', (keyData.requestsCount || 0) + 1);
  await db.update(apiKeysTable)
    .set({ lastUsed: new Date(), requestsCount: (keyData.requestsCount || 0) + 1 })
    .where(eq(apiKeysTable.key, apiKey));
  console.log('[API DEBUG] Key incrementada exitosamente');
  return { keyData };
}
