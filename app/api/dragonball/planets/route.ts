import { NextResponse } from 'next/server';
import pool from '@/lib/mysql';
import { formatImageUrl } from '@/lib/image-utils';
import { RowDataPacket } from 'mysql2';

interface Planet extends RowDataPacket {
    id: number;
    name: string;
    description: string;
    image: string;
    isDestroyed: number;
}

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const search = searchParams.get('search');
        
        const connection = await pool.getConnection();
          let query = `
            SELECT 
                id,
                name,
                description,
                image,
                isDestroyed
            FROM railway.planets
        `;
        let params: any[] = [];

        if (search) {
            query += ' WHERE name LIKE ?';
            params.push(`%${search}%`);
            console.log('Search query:', query);
            console.log('Search params:', params);
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
        
        // Format the image URLs before sending the response
        const formattedData = rows.map(planet => ({
            ...planet,
            image_url: planet.image
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
            'INSERT INTO planets (name, description, image, isDestroyed) VALUES (?, ?, ?, ?)',
            [body.name, body.description, body.image, body.isDestroyed || 0]
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
