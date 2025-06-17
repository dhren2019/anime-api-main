import { NextResponse } from 'next/server';
import pool from '@/lib/mysql';
import { formatImageUrl } from '@/lib/image-utils';
import { RowDataPacket } from 'mysql2';

interface Transformation extends RowDataPacket {
    id: number;
    name: string;
    character_id: number;
    power_multiplier: number;
    description: string;
    image_url: string;
    character_name?: string;
}

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const search = searchParams.get('search');
        
        const connection = await pool.getConnection();
        let query = `            SELECT 
                t.id,
                t.name,
                t.character_id,
                t.power_multiplier,
                t.description,
                t.image_url,
                c.name as character_name
            FROM transformations t 
            LEFT JOIN characters c ON t.character_id = c.id
        `;
        let params: string[] = [];

        if (search) {
            query += ' WHERE LOWER(t.name) LIKE ?';
            params.push(`%${search.toLowerCase()}%`);
        }

        const [rows] = await connection.execute<Transformation[]>(query, params);
        connection.release();
        
        if (!rows || rows.length === 0) {
            return NextResponse.json(
                { 
                    message: 'No transformations found', 
                    data: [] 
                },
                { status: 200 }
            );
        }
        
        return NextResponse.json({
            message: 'Transformations retrieved successfully',
            data: rows.map(row => ({
                id: row.id,
                name: row.name,
                character_id: row.character_id,
                power_multiplier: row.power_multiplier,
                description: row.description,
                character_name: row.character_name
            }))
        });
    } catch (error) {
        console.error('Error fetching transformations:', error);
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
        
        // Verificar si el character_id existe
        const [characters] = await connection.execute<RowDataPacket[]>(
            'SELECT id FROM characters WHERE id = ?',
            [body.character_id]
        );

        if (!characters || characters.length === 0) {
            connection.release();
            return NextResponse.json(
                { error: 'Character not found' },
                { status: 404 }
            );
        }

        const [result] = await connection.execute(
            'INSERT INTO transformations (name, character_id, power_multiplier, description) VALUES (?, ?, ?, ?)',
            [
                body.name,
                body.character_id,
                body.power_multiplier,
                body.description
            ]
        );
        
        connection.release();
        return NextResponse.json({
            message: 'Transformation created successfully',
            data: result
        });
    } catch (error) {
        console.error('Error creating transformation:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
