// scripts/download-dragonball-images.ts
import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';
import 'dotenv/config';

// Configura aquí las carpetas y los datos a descargar
const folders = [
  { name: 'characters', api: 'https://dragonball-api.com/api/characters' },
  { name: 'planetas', api: 'https://dragonball-api.com/api/planets' },
  { name: 'transformaciones', api: 'https://dragonball-api.com/api/transformations' },
  // Puedes añadir más endpoints si lo necesitas
];

const publicDir = path.join(__dirname, '../public');

async function downloadImage(url: string, dest: string) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`No se pudo descargar la imagen: ${url}`);
  const buffer = await res.buffer();
  await fs.promises.writeFile(dest, buffer);
}

async function main() {
  for (const folder of folders) {
    const dir = path.join(publicDir, folder.name);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    const res = await fetch(folder.api);
    if (!res.ok) {
      console.error(`No se pudo obtener datos de ${folder.api}`);
      continue;
    }
    const { items } = await res.json();
    for (const item of items) {
      if (!item.image) continue;
      const ext = path.extname(item.image).split('?')[0] || '.jpg';
      // Usa el nombre o el id para el archivo
      const safeName = (item.name || item.id || 'unknown')
        .replace(/[^a-zA-Z0-9-_]/g, '_')
        .slice(0, 50);
      const dest = path.join(dir, `${safeName}${ext}`);
      try {
        if (!fs.existsSync(dest)) {
          console.log(`Descargando: ${item.image} -> ${dest}`);
          await downloadImage(item.image, dest);
        } else {
          console.log(`Ya existe: ${dest}`);
        }
      } catch (e) {
        console.error(`Error descargando ${item.image}:`, e);
      }
    }
  }
  console.log('Descarga de imágenes completada.');
}

main().catch(console.error);
