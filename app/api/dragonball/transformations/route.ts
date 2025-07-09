import { NextResponse } from 'next/server';
// Cambiamos de MySQL a Drizzle para acceder a la base de datos
import { db } from '@/configs/db';
import { transformationsTable } from '@/configs/schema';
import { validateAndCountApiKey } from '../auth-requests';
import { like } from 'drizzle-orm';

interface Transformation {
    id: number;
    name: string;
    image: string;
    ki: number;
    characterId: number;
}

export async function GET(request: Request) {
    // Si la petición tiene API key, cuenta y suma la petición
    const apiKey = request.headers.get('authorization');
    if (apiKey) {
        const { errorResponse } = await validateAndCountApiKey();
        if (errorResponse) return errorResponse;
    }

    try {
        const { searchParams } = new URL(request.url);
        const name = searchParams.get('name');
        
        let transformations;
        if (name) {
            // Consulta con filtro por nombre usando Drizzle
            transformations = await db.select().from(transformationsTable).where(like(transformationsTable.name, `%${name}%`));
        } else {
            // Consulta todas las transformaciones usando Drizzle
            transformations = await db.select().from(transformationsTable);
        }

        // Si se busca por nombre y no se encuentra
        if (name && transformations.length === 0) {
            return NextResponse.json({
                success: false,
                error: 'Transformation not found'
            }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            count: transformations.length,
            data: name ? transformations[0] : transformations
        });

    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({
            success: false,
            error: 'Error retrieving transformations'
        }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, image, ki, characterId } = body;
        
        // Insertamos la nueva transformación usando Drizzle
        const result = await db.insert(transformationsTable).values({ name, image, ki, characterid: characterId });
        
        return NextResponse.json({
            success: true,
            data: result
        });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({
            success: false,
            error: 'Error creating transformation'
        }, { status: 500 });
    }
}
