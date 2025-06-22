import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';

const connectionString = process.env.NEXT_PUBLIC_NEON_DB_CONNECTION_STRING;
if (!connectionString) {
    throw new Error('Database connection string not found in environment variables');
}

const sql = neon(connectionString);
export const db = drizzle(sql);
