import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { db } from '@/configs/db';
import { apiKeysTable, animesTable } from '@/configs/schema';
import { eq } from 'drizzle-orm';

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
    { params }: { params: { id: string } }
) {
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

        const anime = await db.select()
            .from(animesTable)
            .where(eq(animesTable.id, parseInt(params.id)))
            .limit(1);

        if (!anime.length) {
            return new NextResponse('Anime not found', { status: 404 });
        }

        // Update last used timestamp for the API key
        await db.update(apiKeysTable)
            .set({ lastUsed: new Date() })
            .where(eq(apiKeysTable.key, apiKey));

        return NextResponse.json(anime[0]);
    } catch (error) {
        console.error('Error fetching anime:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
