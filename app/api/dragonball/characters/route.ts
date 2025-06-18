import { NextResponse } from 'next/server';
import pool from '@/lib/mysql';
import { RowDataPacket } from 'mysql2';

interface Character extends RowDataPacket {
    id: number;
    name: string;
    image: string;
}

export async function GET() {
    try {
        const connection = await pool.getConnection();
        const query = `SELECT * FROM characters`;
        const [characters] = await connection.execute<Character[]>(query);
        connection.release();
        
        if (!characters || characters.length === 0) {
            return NextResponse.json({
                success: false,
                error: 'No characters found'
            }, { status: 404 });
        }
        
        return NextResponse.json({
            success: true,
            count: characters.length,
            data: characters
        });

    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({
            success: false,
            error: 'Error retrieving characters'
        }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, image } = body;
        
        const connection = await pool.getConnection();
        const [result] = await connection.execute(
            'INSERT INTO characters (name, image) VALUES (?, ?)',
            [name, image]
        );
        
        connection.release();
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
