import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { db } from '@/configs/db';
import { apiKeysTable, usersTable } from '@/configs/schema';
import { eq } from 'drizzle-orm';
import { randomBytes } from 'crypto';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2025-05-28.basil' });

// Generate a secure API key (moved here for direct use in webhook)
function generateApiKey() {
  return `sk-${randomBytes(24).toString('hex')}`;
}

export async function POST(req: Request) {
  console.log('STRIPE_WEBHOOK_SECRET en webhook:', process.env.STRIPE_WEBHOOK_SECRET ? 'Cargada' : 'No cargada');
  const sig = req.headers.get('stripe-signature')!;
  const body = await req.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err: any) {
    console.error('Error de verificación de la firma del webhook:', err.message);
    return NextResponse.json({ error: 'Webhook Error: Invalid signature' }, { status: 400 });
  }

  // Manejar el evento de sesión de checkout completada
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;

    const userEmail = session.customer_details?.email;
    const userIdFromMetadata = session.metadata?.userId; // Si pasaste userId en metadata

    if (!userEmail && !userIdFromMetadata) {
      console.error('Webhook: No se encontró email ni userId en la sesión de checkout.');
      return NextResponse.json({ error: 'Missing user info' }, { status: 400 });
    }

    try {
      let dbUser;
      if (userEmail) {
        dbUser = await db.select().from(usersTable).where(eq(usersTable.email, userEmail)).limit(1);
      } else if (userIdFromMetadata) {
        // Asumiendo que userIdFromMetadata es un string que representa un número
        dbUser = await db.select().from(usersTable).where(eq(usersTable.id, parseInt(userIdFromMetadata))).limit(1);
      }

      if (!dbUser || !dbUser.length) {
        console.error('Webhook: Usuario no encontrado en la base de datos para email/userId', userEmail, userIdFromMetadata);
        return NextResponse.json({ error: 'User not found in DB' }, { status: 404 });
      }

      const existingApiKey = await db.select()
        .from(apiKeysTable)
        .where(eq(apiKeysTable.userId, dbUser[0].id))
        .limit(1);

      if (existingApiKey.length) {
        await db.update(apiKeysTable)
          .set({ plan: 'pro', requestsLimit: 150 })
          .where(eq(apiKeysTable.userId, dbUser[0].id));
        console.log(`Usuario ${userEmail} (ID: ${dbUser[0].id}) actualizado a plan PRO.`);
      } else {
        // Si no existe una API Key, crear una nueva con el plan PRO
        const newApiKey = generateApiKey();
        await db.insert(apiKeysTable).values({
          userId: dbUser[0].id,
          name: 'Pro Plan Key', // Nombre por defecto para la nueva clave PRO
          key: newApiKey,
          plan: 'pro',
          requestsCount: 0,
          requestsLimit: 150,
          lastUsed: new Date(),
          createdAt: new Date(),
        });
        console.log(`Webhook: Se creó una nueva API Key para el usuario ${userEmail} (ID: ${dbUser[0].id}) con plan PRO.`);
      }
      
    } catch (error) {
      console.error('Error al actualizar el plan del usuario:', error);
      return NextResponse.json({ error: 'Failed to update user plan' }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
} 