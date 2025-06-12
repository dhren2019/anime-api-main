import { db } from '../configs/db';
import { apiDragonballTable } from '../configs/schema';

async function fetchAndInsertDragonball() {
  const res = await fetch('https://api-dragonball.vercel.app/characters');
  if (!res.ok) throw new Error('No se pudo obtener la data de Dragon Ball');
  const characters = await res.json();

  for (const char of characters) {
    await db.insert(apiDragonballTable).values({
      name: char.name,
      race: char.race || null,
      gender: char.gender || null,
      ki: char.ki ? Number(char.ki) : null,
      image: char.image || null,
    }).onConflictDoNothing();
  }
  console.log('Importación de personajes Dragon Ball completada.');
}

fetchAndInsertDragonball().catch(console.error);
