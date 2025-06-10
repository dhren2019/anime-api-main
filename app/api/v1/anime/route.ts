import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { db } from '@/configs/db';
import { apiKeysTable, animesTable } from '@/configs/schema';
import { eq, ilike, and } from 'drizzle-orm';

// Middleware para validar API Key
async function validateApiKey(apiKey: string) {
  const key = await db.select().from(apiKeysTable).where(eq(apiKeysTable.key, apiKey)).limit(1);
  return key.length > 0;
}

export async function GET(req: Request) {
  try {
    const headersList = await headers();
    const authorization = headersList.get('authorization');
    if (!authorization?.startsWith('Bearer ')) {
      return new NextResponse('API key required', { status: 401 });
    }
    const apiKey = authorization.split(' ')[1];
    const isValidKey = await validateApiKey(apiKey);
    if (!isValidKey) {
      return new NextResponse('Invalid API key', { status: 401 });
    }

    // Parámetro de búsqueda por título y tipo
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('query') || '';
    const type = searchParams.get('type') || '';

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

    // Actualizar lastUsed
    await db.update(apiKeysTable).set({ lastUsed: new Date() }).where(eq(apiKeysTable.key, apiKey));

    return NextResponse.json({ animes });
  } catch (error) {
    console.error('Error fetching anime data:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
