import { NextResponse } from 'next/server';
import pool from '@/lib/mysql';
import { RowDataPacket } from 'mysql2';

interface Transformation extends RowDataPacket {
    id: number;
    name: string;
    image: string;
    ki: number;
    characterId: number;
}

export async function GET() {
    try {
        const connection = await pool.getConnection();
        const query = `SELECT * FROM transformaciones`;
        const [transformaciones] = await connection.execute<Transformation[]>(query);
        connection.release();
        
        if (!transformaciones || transformaciones.length === 0) {
            return NextResponse.json({
                success: false,
                error: 'No transformations found'
            }, { status: 404 });
        }
        
        return NextResponse.json({
            success: true,
            count: transformaciones.length,
            data: transformaciones
        });

    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({
            success: false,
            error: 'Error retrieving transformations'
        }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, image, ki, characterId } = body;
        
        const connection = await pool.getConnection();
        const [result] = await connection.execute(
            'INSERT INTO transformaciones (name, image, ki, characterId) VALUES (?, ?, ?, ?)',
            [name, image, ki, characterId]
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
            error: 'Error creating transformation'
        }, { status: 500 });
    }
}
