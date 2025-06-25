import { NextResponse } from 'next/server';
import pool from '@/lib/mysql';
import { validateAndCountApiKey } from '../../auth-requests';

export async function GET() {
    const { errorResponse } = await validateAndCountApiKey();
    if (errorResponse) return errorResponse;

    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.execute(
            'SELECT * FROM characters WHERE LOWER(name) LIKE ?',
            ['%goku%']
        );
        connection.release();
        
        if (!rows || (Array.isArray(rows) && rows.length === 0)) {
            return NextResponse.json(
                { error: 'Goku not found' },
                { status: 404 }
            );
        }
        
        return NextResponse.json(rows);
    } catch (error) {
        console.error('Error fetching Goku:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
