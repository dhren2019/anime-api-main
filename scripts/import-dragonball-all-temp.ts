import 'dotenv/config';
import { db } from '../configs/db';
import { apiDragonballTable, dragonballPlanetTable, dragonballTransformationTable } from '../configs/schema';
import { eq } from 'drizzle-orm';

interface DbPlanet {
  id: number;
  name: string;
  image: string;
  isDestroyed: number;
  description: string;
  deletedAt: string;
}

interface DbCharacter {
  id: string;
  name: string;
  image: string;
  ki: string;
  maxKi: string;
  race: string;
  gender: string;
  affiliation: string;
  description: string;
  originPlanetId: string;
  deletedAt: string;
}

interface DbTransformation {
  id: number;
  name: string;
  image: string;
  ki: string | number;
  characterId: number;
  deletedAt: string;
}

const transformations: DbTransformation[] = [
  {
    id: 1,
    name: "Goku SSJ",
    image: `${process.env.NEXT_PUBLIC_BASE_URL}/public/dragonball-api/transformaciones/goku-ssj.jpg`,
    ki: "3 Billion",
    characterId: 1,
    deletedAt: ""
  },
  // ...resto de las transformaciones
];

const planets: DbPlanet[] = [
  {
    id: 1,
    name: "Namek",
    image: `${process.env.NEXT_PUBLIC_BASE_URL}/public/dragonball-api/planetas/namek.jpg`,
    isDestroyed: 1,
    description: "Planeta natal de los Namekianos...",
    deletedAt: ""
  },
  // ...resto de los planetas
];

async function clearTables() {
  console.log('Limpiando tablas existentes...');
  await db.delete(apiDragonballTable);
  await db.delete(dragonballPlanetTable);
  await db.delete(dragonballTransformationTable);
}

async function importPlanets() {
  console.log(`Importando ${planets.length} planetas...`);
  for (const planet of planets) {
    try {
      const result = await db.insert(dragonballPlanetTable)
        .values({
          name: planet.name,
          description: planet.description,
          image: planet.image,
        })
        .returning({ id: dragonballPlanetTable.id });

      console.log(`Planeta ${planet.name} importado con ID ${result[0].id}`);
    } catch (error) {
      console.error(`Error importando planeta ${planet.name}:`, error);
      throw error;
    }
  }
}

async function importCharacters() {
  // Aquí implementaremos la importación de personajes
  console.log('Importación de personajes no implementada aún');
}

async function importTransformations() {
  console.log(`Importando ${transformations.length} transformaciones...`);
  for (const trans of transformations) {
    try {
      await db.insert(dragonballTransformationTable).values({
        name: trans.name,
        image: trans.image,
        ki: Number(trans.ki.toString().replace(/[^0-9.]/g, '')), // Convertir a número
        characters: trans.characterId.toString(),
      });

      console.log(`Transformación ${trans.name} importada correctamente`);
    } catch (error) {
      console.error(`Error importando transformación ${trans.name}:`, error);
      throw error;
    }
  }
}

async function importAllDragonballData() {
  try {
    await clearTables();

    // Primero importamos planetas para tener las referencias
    await importPlanets();
    console.log('✅ Importación de planetas completada');

    // Luego importamos personajes que pueden referenciar a planetas
    await importCharacters();
    console.log('✅ Importación de personajes completada');

    // Finalmente importamos transformaciones
    await importTransformations();
    console.log('✅ Importación de transformaciones completada');

    console.log('🎉 Importación de datos de Dragon Ball completada con éxito');
  } catch (error) {
    console.error('Error durante la importación:', error);
    process.exit(1);
  }
}

importAllDragonballData();
