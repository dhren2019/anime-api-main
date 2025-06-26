import { NextResponse } from 'next/server';
import pool from '@/lib/mysql';
import { RowDataPacket } from 'mysql2';
import { validateAndCountApiKey } from '../auth-requests';

interface Planet extends RowDataPacket {
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

    let connection;
    try {
        const { searchParams } = new URL(request.url);
        const name = searchParams.get('name');
        
        connection = await pool.getConnection();
        let query = 'SELECT * FROM planets';
        let params = [];

        if (name) {
            query += ' WHERE name LIKE ?';
            params.push(`${name}`);
        }

        query += ' ORDER BY id ASC';
        
        const [planets] = await connection.execute<Planet[]>(query, params);

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
        const { name, description, image, isDestroyed } = body;
        
        connection = await pool.getConnection();
        const [result] = await connection.execute(
            'INSERT INTO planets (name, description, image, isDestroyed) VALUES (?, ?, ?, ?)',
            [name, description, image, isDestroyed]
        );
        
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
    } finally {
        if (connection) {
            connection.release();
        }
    }
}
