import { NextResponse } from 'next/server';
import pool from '@/lib/mysql';
import { RowDataPacket } from 'mysql2';
import { validateAndCountApiKey } from '../auth-requests';

interface Character extends RowDataPacket {
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
    let connection;
    try {
        const { searchParams } = new URL(request.url);
        const name = searchParams.get('name');
        connection = await pool.getConnection();
        let query = 'SELECT * FROM characters';
        let params = [];
        if (name) {
            query += ' WHERE name LIKE ?';
            params.push(`${name}`);
        }
        query += ' ORDER BY id ASC';
        const [characters] = await connection.execute<Character[]>(query, params);
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
            error: 'Error retrieving characters'
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
        const { name, image } = body;
        
        connection = await pool.getConnection();
        const [result] = await connection.execute(
            'INSERT INTO characters (name, image) VALUES (?, ?)',
            [name, image]
        );
        
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
    } finally {
        if (connection) {
            connection.release();
        }
    }
}
