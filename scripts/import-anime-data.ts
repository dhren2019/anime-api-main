import { db } from '../configs/db';
import { animesTable } from '../configs/schema';
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

async function downloadAnimeData(): Promise<Anime[]> {
    const url = 'https://raw.githubusercontent.com/manami-project/anime-offline-database/master/anime-offline-database.json';
    console.log('Downloading anime database...');
    const response = await fetch(url);
    const data = await response.json() as AnimeApiResponse;
    if (!data || !Array.isArray(data.data)) throw new Error('Invalid data format');
    return data.data;
}

async function importAnimeData() {
    try {
        const animeData = await downloadAnimeData();
        console.log(`Found ${animeData.length} anime entries to import`);
        const batchSize = 100;
        for (let i = 0; i < animeData.length; i += batchSize) {
            const batch = animeData.slice(i, i + batchSize);
            const formattedBatch = batch.map((anime: Anime) => ({
                title: anime.title,
                type: anime.type,
                episodes: anime.episodes,
                status: anime.status,
                animeSeason: anime.animeSeason ? JSON.stringify(anime.animeSeason) : null,
                picture: anime.picture,
                thumbnail: anime.thumbnail,
                sources: anime.sources,
                synonyms: anime.synonyms,
                relations: anime.relations,
                tags: anime.tags,
            }));
            await db.insert(animesTable).values(formattedBatch);
            console.log(`Imported ${i + batch.length} of ${animeData.length} entries`);
        }
        console.log('Import completed successfully!');
    } catch (error) {
        console.error('Error importing anime data:', error);
        process.exit(1);
    }
}

importAnimeData();
