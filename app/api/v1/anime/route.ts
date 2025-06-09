import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { db } from '@/configs/db';
import { apiKeysTable, animesTable } from '@/configs/schema';
import { eq, and, sql } from 'drizzle-orm';

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

    // Parámetros de consulta
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const type = searchParams.get('type') || '';
    const offset = (page - 1) * limit;

    // Filtros SQL nativo
    let whereSql = sql``;
    if (search && type) {
      whereSql = sql`WHERE ${animesTable.title} ILIKE ${'%' + search + '%'} AND ${animesTable.type} = ${type}`;
    } else if (search) {
      whereSql = sql`WHERE ${animesTable.title} ILIKE ${'%' + search + '%'}`;
    } else if (type) {
      whereSql = sql`WHERE ${animesTable.type} = ${type}`;
    }

    // Consulta de datos
    const animes = await db.execute(
      sql`SELECT * FROM ${animesTable} ${whereSql} LIMIT ${limit} OFFSET ${offset}`
    );

    // Conteo total
    const totalResult = await db.execute(
      sql`SELECT COUNT(*)::int AS count FROM ${animesTable} ${whereSql}`
    );
    const total = Number(totalResult.rows?.[0]?.count || 0);

    // Actualizar lastUsed
    await db.update(apiKeysTable).set({ lastUsed: new Date() }).where(eq(apiKeysTable.key, apiKey));

    return NextResponse.json({
      data: animes.rows,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching anime data:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
