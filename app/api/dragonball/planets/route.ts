import { NextResponse } from 'next/server';
// Cambiamos de MySQL a Drizzle para acceder a la base de datos
import { db } from '@/configs/db';
import { planetsTable } from '@/configs/schema';
import { validateAndCountApiKey } from '../auth-requests';
import { like } from 'drizzle-orm';

interface Planet {
    id: number;
    name: string;
    description: string;
    image: string;
    isDestroyed: number;
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
        
        let planets;
        if (name) {
            // Consulta con filtro por nombre usando Drizzle
            planets = await db.select().from(planetsTable).where(like(planetsTable.name, `%${name}%`));
        } else {
            // Consulta todos los planetas usando Drizzle
            planets = await db.select().from(planetsTable);
        }

        // Si se busca por nombre y no se encuentra
        if (name && planets.length === 0) {
            return NextResponse.json({
                success: false,
                error: 'Planet not found'
            }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            count: planets.length,
            data: name ? planets[0] : planets
        });

    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({
            success: false,
            error: 'Error retrieving planets'
        }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, description, image, isDestroyed } = body;
        
        // Insertamos el nuevo planeta usando Drizzle
        const result = await db.insert(planetsTable).values({ name, description, image, isdestroyed: isDestroyed });
        
        return NextResponse.json({
            success: true,
            data: result
        });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({
            success: false,
            error: 'Error creating planet'
        }, { status: 500 });
    }
}
