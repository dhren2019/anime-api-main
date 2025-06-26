import { NextResponse } from 'next/server';
import pool from '@/lib/mysql';
import { RowDataPacket } from 'mysql2';
import { validateAndCountApiKey } from '../auth-requests';

interface Transformation extends RowDataPacket {
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

    let connection;
    try {
        const { searchParams } = new URL(request.url);
        const name = searchParams.get('name');
        
        connection = await pool.getConnection();
        let query = 'SELECT * FROM transformations';
        let params = [];

        if (name) {
            query += ' WHERE name LIKE ?';
            params.push(`${name}`);
        }

        query += ' ORDER BY id ASC';
        
        const [transformations] = await connection.execute<Transformation[]>(query, params);

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
    } finally {
        if (connection) {
            connection.release();
        }
    }
}

export async function POST(request: Request) {
    let connection;
    try {
        const body = await request.json();
        const { name, image, ki, characterId } = body;
        
        connection = await pool.getConnection();
        const [result] = await connection.execute(
            'INSERT INTO transformations (name, image, ki, characterId) VALUES (?, ?, ?, ?)',
            [name, image, ki, characterId]
        );
        
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
    } finally {
        if (connection) {
            connection.release();
        }
    }
}
