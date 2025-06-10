import { db } from '../configs/db';
import { usersTable, apiKeysTable } from '../configs/schema';
import { eq } from 'drizzle-orm';

async function main() {
  const email = 'roglobar10@gmail.com';
  const name = 'Usuario de Prueba';
  const apiKeyValue = 'sk-demo1234567890';

  // 1. Inserta el usuario si no existe
  const existingUser = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email));

  let userId: number;
  if (existingUser.length > 0) {
    userId = existingUser[0].id;
    console.log(`Usuario ya existe con id: ${userId}`);
  } else {
    const inserted = await db
      .insert(usersTable)
      .values({ name, email })
      .returning();
    userId = inserted[0].id;
    console.log(`Usuario insertado con id: ${userId}`);
  }

  // 2. Inserta la API key de ejemplo
  const existingKey = await db
    .select()
    .from(apiKeysTable)
    .where(eq(apiKeysTable.key, apiKeyValue));

  if (existingKey.length > 0) {
    console.log('La API key de ejemplo ya existe.');
  } else {
    await db.insert(apiKeysTable).values({
      userId,
      name: 'Key de Prueba',
      key: apiKeyValue,
      createdAt: new Date(),
      isActive: true,
    });
    console.log('API key de ejemplo insertada.');
  }

  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
}); 