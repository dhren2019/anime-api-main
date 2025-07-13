import { drizzle } from 'drizzle-orm/neon-serverless';
import { Pool } from '@neondatabase/serverless';

const connectionString = process.env.NEXT_PUBLIC_NEON_DB_CONNECTION_STRING;
if (!connectionString) {
    throw new Error('Database connection string not found in environment variables');
}

const pool = new Pool({ connectionString });
export const db = drizzle(pool);