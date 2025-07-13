import { NextResponse } from 'next/server';
import { db } from '@/configs/db';
import { apiKeysTable, usersTable } from '@/configs/schema';
import { randomBytes } from 'crypto';
import { eq, and } from 'drizzle-orm';
import { currentUser } from "@clerk/nextjs/server";

// Generate a secure API key
function generateApiKey() {
  return `sk-${randomBytes(24).toString('hex')}`;
}

// Create new API key
export async function POST(req: Request) {
  try {
    const user = await currentUser();
    
    if (!user || !user.primaryEmailAddress?.emailAddress) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { name, plan } = await req.json();
    // plan puede ser 'free' o 'pro', por defecto 'free'
    const planType = plan === 'pro' ? 'pro' : 'free';
    const requestsLimit = planType === 'pro' ? 150 : 10;
    
    // Get the user from our database
    const dbUser = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, user.primaryEmailAddress.emailAddress))
      .limit(1);

    if (!dbUser.length) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const key = generateApiKey();
    const apiKey = await db.insert(apiKeysTable).values({
      userId: dbUser[0].id,
      name,
      key,
      createdAt: new Date(),
      isActive: true,
      plan: planType,
      requestsLimit,
      requestsCount: 0
    }).returning();

    return NextResponse.json({ success: true, key: apiKey[0] });
  } catch (error: any) {
    console.error('Error creating API key:', error, error?.message, JSON.stringify(error));
    return NextResponse.json(
      { error: error?.message || JSON.stringify(error) || 'Internal Server Error' }, 
      { status: 500 }
    );
  }
}

// Get all API keys for the user
export async function GET() {
  try {
    const user = await currentUser();
    if (!user || !user.primaryEmailAddress?.emailAddress) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    // Get the user from our database
    const dbUser = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, user.primaryEmailAddress.emailAddress))
      .limit(1);
    if (!dbUser.length) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    const keys = await db
      .select()
      .from(apiKeysTable)
      .where(eq(apiKeysTable.userId, dbUser[0].id));
    // Calcular plan global y requests globales
    const isPro = keys.some(k => k.plan === 'pro');
    const requestsLimit = isPro ? 150 : 10;
    const requestsCount = keys.reduce((sum, k) => sum + (k.requestsCount || 0), 0);
    const plan = isPro ? 'pro' : 'free';
    // Devolver todas las keys pero con los datos globales
    const keysWithGlobal = keys.map(k => ({
      ...k,
      plan,
      requestsLimit,
      requestsCount
    }));
    return NextResponse.json({ keys: keysWithGlobal });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// Delete an API key
export async function DELETE(req: Request) {
  try {
    const user = await currentUser();
    
    if (!user || !user.primaryEmailAddress?.emailAddress) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await req.json();
    
    // Get the user from our database
    const dbUser = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, user.primaryEmailAddress.emailAddress))
      .limit(1);

    if (!dbUser.length) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    await db
      .delete(apiKeysTable)
      .where(
        and(
          eq(apiKeysTable.id, id), 
          eq(apiKeysTable.userId, dbUser[0].id)
        )
      );

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error deleting API key:', error);
    return NextResponse.json(
      { error: error.message || 'Internal Server Error' }, 
      { status: 500 }
    );
  }
}
