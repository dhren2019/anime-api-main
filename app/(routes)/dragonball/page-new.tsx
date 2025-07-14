import { db } from "@/configs/db";
import { charactersTable, planetsTable, transformationsTable } from "@/configs/schema";
import DragonBallClient from "./DragonBallClient";

// Server Component que obtiene datos directamente de Drizzle
export default async function DragonBallPage() {
  // Consulta directa a Drizzle desde el servidor
  const charactersRaw = await db.select().from(charactersTable);
  const transformationsRaw = await db.select().from(transformationsTable);
  const planetsRaw = await db.select().from(planetsTable);

  // Mapear los datos para que coincidan con las interfaces esperadas
  const characters = charactersRaw.map(char => ({
    id: char.id,
    name: char.name,
    image: char.image || '',
    ki: char.ki || '',
    maxki: char.maxki || '', // mapear maxki -> maxki
    race: char.race || '',
    gender: char.gender || '',
    affiliation: char.affiliation || '',
    description: char.description || ''
  }));

  const transformations = transformationsRaw.map(trans => ({
    id: trans.id,
    name: trans.name,
    image: trans.image || '',
    ki: trans.ki || '',
    characterId: trans.characterid || 0 // mapear characterid -> characterId
  }));

  const planets = planetsRaw.map(planet => ({
    id: planet.id,
    name: planet.name,
    description: planet.description || '',
    image: planet.image || '',
    isDestroyed: Boolean(planet.isdestroyed) // mapear isdestroyed -> isDestroyed
  }));

  return (
    <DragonBallClient 
      initialCharacters={characters}
      initialTransformations={transformations}
      initialPlanets={planets}
    />
  );
}
