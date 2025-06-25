import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { currentUser } from "@clerk/nextjs/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2025-05-28.basil' });

export async function POST(req: Request) {
  console.log('STRIPE_SECRET_KEY en backend:', process.env.STRIPE_SECRET_KEY ? 'Cargada' : 'No cargada');
  // O para ver una parte de ella (¡NO la clave completa en producción!)
  // console.log('STRIPE_SECRET_KEY (parcial) en backend:', process.env.STRIPE_SECRET_KEY?.substring(0, 10));

  const user = await currentUser();
  if (!user || !user.primaryEmailAddress?.emailAddress) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // !!! REEMPLAZA ESTE ID CON EL ID DE TU PRECIO DE STRIPE !!!
  const priceId = 'price_1RYWyVK1jLfWhQ4Ktihw7VVN'; 

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      customer_email: user.primaryEmailAddress.emailAddress,
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/upgrade?success=1`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/upgrade?canceled=1`,
      metadata: {
        userId: user.id,
        email: user.primaryEmailAddress.emailAddress,
      },
    });
  
    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Error creating Stripe checkout session:', error);
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 });
  }
} 