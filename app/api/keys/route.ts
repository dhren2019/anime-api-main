import { NextResponse } from 'next/server';
import { db } from '@/configs/db';
import { apiKeysTable } from '@/configs/schema';
import { randomBytes } from 'crypto';
import { eq, and } from 'drizzle-orm';

// Generate a secure API key
function generateApiKey() {
  return `sk-${randomBytes(24).toString('hex')}`;
}

// Create new API key
export async function POST(req: Request) {
  try {
    const { name } = await req.json();
    // Simulated userId, in production get the userId from the auth system
    const userId = 1;
    const key = generateApiKey();
    const apiKey = await db.insert(apiKeysTable).values({
      userId,
      name,
      key,
      createdAt: new Date(),
      isActive: true
    }).returning();
    return NextResponse.json({ success: true, key: apiKey[0] });
  } catch (error) {
    console.error('Error creating API key:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

// Get all API keys for the user
export async function GET() {
  try {
    // Simulated userId, in production get the userId from the auth system
    const userId = 1;
    const keys = await db.select().from(apiKeysTable).where(eq(apiKeysTable.userId, userId));
    return NextResponse.json({ keys });
  } catch (error) {
    console.error('Error fetching API keys:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

// Delete an API key
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    // Simulated userId, in production get the userId from the auth system
    const userId = 1;
    await db.delete(apiKeysTable).where(and(eq(apiKeysTable.id, id), eq(apiKeysTable.userId, userId)));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting API key:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
