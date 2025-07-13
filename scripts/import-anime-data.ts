import 'dotenv/config';
import { db } from '../configs/db-script';
import { animesTable } from '../configs/schema';
import { eq } from 'drizzle-orm';
import { sql } from 'drizzle-orm';
import fetch from 'node-fetch';

interface Anime {
    title: string;
    type: string;
    episodes: number;
    status: string;
    animeSeason?: unknown;
    picture?: string;
    thumbnail?: string;
    sources?: string[];
    synonyms?: string[];
    relations?: string[];
    tags?: string[];
}

interface AnimeApiResponse {
    data: Anime[];
}

function truncateString(str: string | undefined, maxLength: number): string {
    if (!str) return '';
    return str.length > maxLength ? str.substring(0, maxLength) : str;
}

function truncateStringArray(arr: string[] | undefined, maxLength: number): string[] {
    if (!arr) return [];
    return arr.map(str => truncateString(str, maxLength)).filter((str): str is string => str !== undefined);
}

async function downloadAnimeData(): Promise<Anime[]> {
    const url = 'https://raw.githubusercontent.com/manami-project/anime-offline-database/master/anime-offline-database.json';
    console.log('Downloading anime database...');
    const response = await fetch(url);
    const data = await response.json() as AnimeApiResponse;
    if (!data || !Array.isArray(data.data)) throw new Error('Invalid data format');
    return data.data;
}

async function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function processWithRetry<T>(operation: () => Promise<T>, retries = 3, delay = 1000): Promise<T> {
    let lastError;
    for (let i = 0; i < retries; i++) {
        try {
            return await operation();
        } catch (error) {
            lastError = error;
            if (i < retries - 1) {
                await sleep(delay * Math.pow(2, i)); // Exponential backoff
            }
        }
    }
    throw lastError;
}

async function clearAnimeTable() {
    console.log('Limpiando tabla de animes...');
    try {
        await db.delete(animesTable);
        console.log('Tabla limpiada exitosamente.');
    } catch (error) {
        console.error('Error al limpiar la tabla:', error);
        throw error;
    }
}

async function importAnimeData() {
    try {
        // Paso 1: Limpiar la tabla
        await clearAnimeTable();

        // Paso 2: Descargar nuevos datos
        const animeData = await downloadAnimeData();
        console.log(`Encontrados ${animeData.length} animes para importar`);
        
        // Paso 3: Procesar e importar en lotes
        const batchSize = 50; // Tamaño de lote reducido para mejor manejo
        let imported = 0;
        const totalBatches = Math.ceil(animeData.length / batchSize);

        for (let i = 0; i < animeData.length; i += batchSize) {
            const batch = animeData.slice(i, i + batchSize);
            const currentBatch = Math.floor(i / batchSize) + 1;

            try {
                const formattedBatch = batch.map(anime => ({
                    title: truncateString(anime.title, 255),
                    type: truncateString(anime.type, 50),
                    episodes: anime.episodes,
                    status: truncateString(anime.status, 50),
                    animeSeason: anime.animeSeason ? truncateString(JSON.stringify(anime.animeSeason), 255) : null,
                    picture: anime.picture ? truncateString(anime.picture, 255) : null,
                    thumbnail: anime.thumbnail ? truncateString(anime.thumbnail, 255) : null,
                    sources: truncateStringArray(anime.sources, 255),
                    synonyms: truncateStringArray(anime.synonyms, 255),
                    relations: truncateStringArray(anime.relations, 255),
                    tags: truncateStringArray(anime.tags, 50),
                }));

                await processWithRetry(async () => {
                    await db.insert(animesTable).values(formattedBatch);
                });

                imported += batch.length;
                console.log(`Progreso: ${currentBatch}/${totalBatches} lotes (${imported}/${animeData.length} animes)`);

                // Pequeña pausa entre lotes para no sobrecargar la DB
                if (i + batchSize < animeData.length) {
                    await sleep(100);
                }

            } catch (error) {
                console.error(`Error importando lote ${currentBatch}/${totalBatches}:`, error);
                throw error;
            }
        }

        console.log('¡Importación completada con éxito!');
        console.log(`Total de animes importados: ${imported}`);

    } catch (error) {
        console.error('Error en el proceso de importación:', error);
        throw error;
    }
}

// Ejecutar la importación
console.log('Iniciando proceso de importación...');
importAnimeData()
    .then(() => {
        console.log('Proceso completado.');
        process.exit(0);
    })
    .catch((error) => {
        console.error('Error fatal:', error);
        process.exit(1);
    });
