import { NextResponse } from 'next/server';
import pool from '@/lib/mysql';
import { formatImageUrl } from '@/lib/image-utils';
import { RowDataPacket } from 'mysql2';

interface Planet extends RowDataPacket {
    id: number;
    name: string;
    description: string;
    population: number;
    image_url: string;
}

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const search = searchParams.get('search');
        
        const connection = await pool.getConnection();        let query = `
            SELECT 
                id,
                name,
                description,
                population,
                image_url
            FROM planets
        `;
        let params: string[] = [];

        if (search) {
            query += ' WHERE LOWER(name) LIKE ?';
            params.push(`%${search.toLowerCase()}%`);
        }

        const [rows] = await connection.execute<Planet[]>(query, params);
        connection.release();
        
        if (!rows || rows.length === 0) {
            return NextResponse.json(
                { 
                    message: 'No planets found', 
                    data: [] 
                },
                { status: 200 }
            );
        }
        
        // Formatear las URLs de las imágenes antes de enviar la respuesta
        const formattedData = rows.map(planet => ({
            ...planet,
            image_url: formatImageUrl(planet.image_url)
        }));
        
        return NextResponse.json({
            message: 'Planets retrieved successfully',
            data: formattedData
        });
    } catch (error) {
        console.error('Error fetching planets:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const connection = await pool.getConnection();
        
        const [result] = await connection.execute(
            'INSERT INTO planets (name, description, population) VALUES (?, ?, ?)',
            [body.name, body.description, body.population]
        );
        
        connection.release();
        return NextResponse.json({
            message: 'Planet created successfully',
            data: result
        });
    } catch (error) {
        console.error('Error creating planet:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
