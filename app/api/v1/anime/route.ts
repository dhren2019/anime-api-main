import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { db } from '@/configs/db';
import { apiKeysTable, animesTable } from '@/configs/schema';
import { eq, ilike, and } from 'drizzle-orm';
import { validateAndCountApiKey } from '../../dragonball/auth-requests';

// Middleware para validar API Key
async function validateApiKey(apiKey: string) {
  const key = await db.select().from(apiKeysTable).where(eq(apiKeysTable.key, apiKey)).limit(1);
  return key.length > 0;
}

export async function GET(req: Request) {
  console.log('[API v1/anime] Iniciando petición GET');
  const { errorResponse } = await validateAndCountApiKey();
  if (errorResponse) {
    console.log('[API v1/anime] Error de validación, devolviendo error');
    return errorResponse;
  }
  console.log('[API v1/anime] Validación exitosa, continuando...');

  try {
    // Parámetro de búsqueda por título y tipo
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('query') || '';
    const type = searchParams.get('type') || '';
    console.log('[API v1/anime] Parámetros de búsqueda - query:', query, 'type:', type);

    let animes = [];
    if (query && type) {
      animes = await db.select().from(animesTable).where(and(ilike(animesTable.title, `%${query}%`), eq(animesTable.type, type)));
    } else if (query) {
      animes = await db.select().from(animesTable).where(ilike(animesTable.title, `%${query}%`));
    } else if (type) {
      animes = await db.select().from(animesTable).where(eq(animesTable.type, type));
    } else {
      animes = await db.select().from(animesTable).limit(10);
    }

    console.log('[API v1/anime] Devolviendo', animes.length, 'animes');
    return NextResponse.json({ animes });
  } catch (error) {
    console.error('Error fetching anime data:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
