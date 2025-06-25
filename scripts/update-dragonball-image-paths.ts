// scripts/update-dragonball-image-paths.ts
import { db } from '../configs/db';
import { apiDragonballTable, dragonballPlanetTable, dragonballTransformationTable } from '../configs/schema';
import { eq } from 'drizzle-orm';

// Utilidad para generar la ruta local de la imagenunction getLocalImagePath(type: string, name: string, ext: string = '.webp') {
  // Normaliza el nombre igual que en el script de descarga
  const safeName = name.replace(/[^a-zA-Z0-9-_]/g, '_').slice(0, 50);
  return `/dragonball-api/${type}/${safeName}${ext}`;
}

async function updateCharacters() {
  const characters = await db.select().from(apiDragonballTable);
  for (const char of characters) {
    if (!char.name) continue;
    // Puedes ajustar la extensión si tus imágenes no son .webp
    const localPath = getLocalImagePath('characters', char.name);
    await db.update(apiDragonballTable)
      .set({ image: localPath })
      .where(eq(apiDragonballTable.id, char.id));
  }
  console.log('Rutas de imágenes de personajes actualizadas.');
}

async function updatePlanets() {
  const planets = await db.select().from(dragonballPlanetTable);
  for (const planet of planets) {
    if (!planet.name) continue;
    const localPath = getLocalImagePath('planetas', planet.name);
    await db.update(dragonballPlanetTable)
      .set({ image: localPath })
      .where(eq(dragonballPlanetTable.id, planet.id));
  }
  console.log('Rutas de imágenes de planetas actualizadas.');
}

async function updateTransformations() {
  const transformations = await db.select().from(dragonballTransformationTable);
  for (const t of transformations) {
    if (!t.name) continue;
    const localPath = getLocalImagePath('transformaciones', t.name);
    await db.update(dragonballTransformationTable)
      .set({ image: localPath })
      .where(eq(dragonballTransformationTable.id, t.id));
  }
  console.log('Rutas de imágenes de transformaciones actualizadas.');
}

async function main() {
  await updateCharacters();
  await updatePlanets();
  await updateTransformations();
}

main().catch(console.error);
