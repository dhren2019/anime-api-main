import { NextResponse } from 'next/server';
// Cambiamos de MySQL a Drizzle para acceder a la base de datos
import { db } from '@/configs/db';
import { charactersTable } from '@/configs/schema';
import { validateAndCountApiKey } from '../../auth-requests';
import { like } from 'drizzle-orm';

export async function GET() {
    const { errorResponse } = await validateAndCountApiKey();
    if (errorResponse) return errorResponse;

    try {
        // Buscamos personajes que contengan "goku" en el nombre usando Drizzle
        const rows = await db.select().from(charactersTable).where(like(charactersTable.name, '%goku%'));
        
        if (!rows || rows.length === 0) {
            return NextResponse.json(
                { error: 'Goku not found' },
                { status: 404 }
            );
        }
        
        return NextResponse.json(rows);
    } catch (error) {
        console.error('Error fetching Goku:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
