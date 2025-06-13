import 'dotenv/config';
import { db } from '../configs/db';
import { apiDragonballTable } from '../configs/schema';

function parseKi(value: any) {
  if (!value) return null;
  const num = Number(String(value).replace(/\./g, ''));
  return isNaN(num) ? null : num;
}

async function fetchAndInsertDragonball() {
  const res = await fetch('https://dragonball-api.com/api/characters');
  if (!res.ok) throw new Error('No se pudo obtener la data de Dragon Ball');
  const { items: characters } = await res.json();

  for (const char of characters) {
    await db.insert(apiDragonballTable).values({
      name: char.name,
      ki: parseKi(char.ki),
      maxKi: parseKi(char.maxKi),
      race: char.race ?? null,
      gender: char.gender ?? null,
      description: char.description ?? null,
      image: char.image ?? null,
      affiliation: char.affiliation ?? null,
      originPlanet: char.originPlanet ?? null,
      transformations: char.transformations ? JSON.stringify(char.transformations) : null,
      family: char.family ? JSON.stringify(char.family) : null,
      saga: char.saga ?? null,
      height: char.height ?? null,
      weight: char.weight ?? null,
      hair: char.hair ?? null,
      eyes: char.eyes ?? null,
      deceased: typeof char.deceased === 'boolean' ? char.deceased : null,
      debut: char.debut ? JSON.stringify(char.debut) : null,
      relatives: char.relatives ? JSON.stringify(char.relatives) : null,
      techniques: char.techniques ? JSON.stringify(char.techniques) : null,
    }).onConflictDoNothing();
  }
  console.log('Importación de personajes Dragon Ball completada.');
}

fetchAndInsertDragonball().catch(console.error);
