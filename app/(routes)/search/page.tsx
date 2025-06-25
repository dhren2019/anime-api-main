"use client";
import React, { useState } from "react";
import Image from "next/image";
import { AnimeDetails } from "../../../components/ui/anime-details";
import { OptimizedImage } from "../../../components/ui/optimized-image";

interface Anime {
  id: number;
  title: string;
  type?: string;
  episodes?: number;
  status?: string;
  animeSeason?: string;
  picture?: string;
  thumbnail?: string;
  sources?: string[];
  synonyms?: string[];
  relations?: string[];
  tags?: string[];
}

export default function AnimeSearchPage() {
  const [apiKey, setApiKey] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [query, setQuery] = useState("");
  const [type, setType] = useState("");
  const [results, setResults] = useState<Anime[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [selectedAnime, setSelectedAnime] = useState<Anime | null>(null);

  const validateKey = async () => {
    setError(null);
    setLoading(true);
    try {
      // Probar la key con un endpoint protegido
      const res = await fetch("/api/v1/anime", {
        headers: { Authorization: `Bearer ${apiKey}` },
      });
      if (res.ok) {
        setIsValid(true);
      } else {
        setError("API key inválida o sin permisos.");
      }
    } catch (e) {
      setError("Error validando la API key.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (query) params.append("query", query);
      if (type) params.append("type", type);
      const res = await fetch(`/api/v1/anime?${params.toString()}`, {
        headers: { Authorization: `Bearer ${apiKey}` },
      });
      if (res.status === 429) {
        const text = await res.text();
        if (text === 'Upgrade to pro') {
          setShowUpgrade(true);
          setLoading(false);
          return;
        }
      }
      if (!res.ok) throw new Error("Error buscando animes");
      const data = await res.json();
      console.log('Resultados de búsqueda:', data.animes); // Para debuggear
      setResults(data.animes || []);
    } catch (e) {
      setError("No se pudo buscar animes.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      {!isValid ? (
        <div>
          <label className="block mb-2 font-medium">API Key:</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2 mb-2 font-mono"
            value={apiKey}
            onChange={e => setApiKey(e.target.value)}
            placeholder="sk-..."
          />
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={validateKey}
            disabled={loading || !apiKey}
          >
            {loading ? "Validando..." : "Validar API Key"}
          </button>
          {error && <div className="text-red-600 mt-2">{error}</div>}
        </div>
      ) : (
        <form onSubmit={handleSearch}>
          <label className="block mb-2 font-medium">Buscar por título:</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2 mb-2"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Ej: Naruto"
            required
          />
          <label className="block mb-2 font-medium">Tipo:</label>
          <select
            className="w-full border rounded px-3 py-2 mb-2"
            value={type}
            onChange={e => setType(e.target.value)}
          >
            <option value="">Todos</option>
            <option value="TV">Serie</option>
            <option value="Movie">Película</option>
            <option value="OVA">OVA</option>
            <option value="ONA">ONA</option>
            <option value="Special">Especial</option>
          </select>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            type="submit"
            disabled={loading}
          >
            {loading ? "Buscando..." : "Buscar"}
          </button>
          {error && <div className="text-red-600 mt-2">{error}</div>}
        </form>
      )}
      {results.length > 0 && (
        <div className="mt-6">
          <h2 className="font-semibold mb-4 text-xl">Resultados:</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {results.map(anime => (
              <div
                key={anime.id}
                className="group border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-200 cursor-pointer bg-white hover:border-blue-400 hover:-translate-y-1"
                onClick={() => {
                  setSelectedAnime(anime);
                }}
                role="button"
                tabIndex={0}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    setSelectedAnime(anime);
                  }
                }}
              >                <div className="aspect-[3/4] relative w-full overflow-hidden rounded-t-lg shadow-md">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  <OptimizedImage
                    src={anime.picture || anime.thumbnail || '/placeholder-anime.jpg'}
                    alt={anime.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                    className="transition-transform duration-300 group-hover:scale-105"
                    quality={90}
                    priority={results.indexOf(anime) < 6} // Priorizar las primeras 6 imágenes
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold truncate mb-1">{anime.title}</h3>
                  <div className="flex gap-2">
                    {anime.type && (
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                        {anime.type}
                      </span>
                    )}
                    {anime.status && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
                        {anime.status}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <AnimeDetails
        anime={selectedAnime}
        isOpen={selectedAnime !== null}
        onClose={() => setSelectedAnime(null)}
      />

      {showUpgrade && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40">
          <div className="bg-white p-6 rounded shadow-lg max-w-[90vw] w-[400px] relative text-center">
            <h2 className="font-bold mb-2 text-xl">¡Límite alcanzado!</h2>
            <p className="mb-4">Has alcanzado el límite de peticiones de tu plan gratuito.<br/>Actualiza a <b>Pro</b> para seguir usando la API.</p>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              onClick={() => setShowUpgrade(false)}
            >Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
}