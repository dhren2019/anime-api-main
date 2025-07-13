import { NextResponse } from 'next/server';
// Cambiamos de MySQL a Drizzle para acceder a la base de datos
import { db } from '@/configs/db';
import { charactersTable } from '@/configs/schema';
import { validateAndCountApiKey } from '../auth-requests';
import { like } from 'drizzle-orm';

interface Character {
    id: number;
    name: string;
    image: string;
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
        let characters;
        if (name) {
            // Devuelve todas las columnas filtrando por nombre
            characters = await db.select().from(charactersTable).where(like(charactersTable.name, `%${name}%`));
        } else {
            // Devuelve todas las columnas de todos los personajes
            characters = await db.select().from(charactersTable);
        }
        if (name && characters.length === 0) {
            return NextResponse.json({
                success: false,
                error: 'Character not found'
            }, { status: 404 });
        }
        return NextResponse.json({
            success: true,
            count: characters.length,
            data: name ? characters[0] : characters
        });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({
            success: false,
            error: 'Error retrieving characters',
            details: error instanceof Error ? error.message : error
        }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, image, ki, maxki, race, gender, description, universe, originplanetid, affiliation } = body;
        
        // Insertamos el nuevo personaje usando Drizzle
        const result = await db.insert(charactersTable).values({
            name,
            image,
            ki,
            maxki,
            race,
            gender,
            description,
            originplanetid,
            affiliation
        });
        
        return NextResponse.json({
            success: true,
            data: result
        });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({
            success: false,
            error: 'Error creating character'
        }, { status: 500 });
    }
}
