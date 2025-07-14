import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { db } from '@/configs/db';
import { apiKeysTable, animesTable } from '@/configs/schema';
import { eq } from 'drizzle-orm';
import { validateAndCountApiKey } from '../../../dragonball/auth-requests';

// Validate API key middleware
async function validateApiKey(apiKey: string) {
    const key = await db.select()
        .from(apiKeysTable)
        .where(eq(apiKeysTable.key, apiKey))
        .limit(1);

    return key.length > 0;
}

export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { errorResponse } = await validateAndCountApiKey();
    if (errorResponse) return errorResponse;

    try {
        const resolvedParams = await params;
        const headersList = await headers();
        const authorization = headersList.get('authorization');
        
        if (!authorization?.startsWith('Bearer ')) {
            return new NextResponse('API key required', { status: 401 });
        }

        const apiKey = authorization.split(' ')[1];
        // Obtener la key completa para acceder a plan y contador
        const keyDataArr = await db.select().from(apiKeysTable).where(eq(apiKeysTable.key, apiKey)).limit(1);
        if (!keyDataArr.length) {
            return new NextResponse('Invalid API key', { status: 401 });
        }
        const keyData = keyDataArr[0];
        // Lógica de límites
        let limit = 10;
        if (keyData.plan === 'pro') limit = 150;
        if (keyData.requestsCount >= limit) {
            return new NextResponse('Upgrade to pro', { status: 429 });
        }
        // Incrementar contador
        await db.update(apiKeysTable)
            .set({ lastUsed: new Date(), requestsCount: keyData.requestsCount + 1 })
            .where(eq(apiKeysTable.key, apiKey));

        const anime = await db.select()
            .from(animesTable)
            .where(eq(animesTable.id, parseInt(resolvedParams.id)))
            .limit(1);

        if (!anime.length) {
            return new NextResponse('Anime not found', { status: 404 });
        }

        return NextResponse.json(anime[0]);
    } catch (error) {
        console.error('Error fetching anime:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
