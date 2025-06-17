import { NextResponse } from 'next/server';
import pool from '@/lib/mysql';
import { formatImageUrl } from '@/lib/image-utils';
import { RowDataPacket } from 'mysql2';

interface Character extends RowDataPacket {
    id: number;
    name: string;
    race: string;
    description: string;
    power_level: number;
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
                race,
                description,
                power_level,
                image_url
            FROM characters
        `;
        let params: string[] = [];

        if (search) {
            query += ' WHERE LOWER(name) LIKE ?';
            params.push(`%${search.toLowerCase()}%`);
        }

        const [rows] = await connection.execute<Character[]>(query, params);
        connection.release();
        
        if (!rows || rows.length === 0) {
            return NextResponse.json(
                { 
                    message: 'No characters found', 
                    data: [] 
                },
                { status: 200 }
            );
        }
        
        // Formatear las URLs de las imágenes antes de enviar la respuesta
        const formattedData = rows.map(character => ({
            ...character,
            image_url: formatImageUrl(character.image_url)
        }));
        
        return NextResponse.json({
            message: 'Characters retrieved successfully',
            data: formattedData
        });
    } catch (error) {
        console.error('Error fetching characters:', error);
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
            'INSERT INTO characters (name, race, description, power_level) VALUES (?, ?, ?, ?)',
            [body.name, body.race, body.description, body.power_level]
        );
        
        connection.release();
        return NextResponse.json({
            message: 'Character created successfully',
            data: result
        });
    } catch (error) {
        console.error('Error creating character:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
