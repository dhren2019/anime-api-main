"use client";
import React, { useState } from "react";

interface Anime {
  id: number;
  title: string;
  type?: string;
  episodes?: number;
  status?: string;
  animeSeason?: string;
  picture?: string;
  thumbnail?: string;
}

export default function AnimeSearchPage() {
  const [apiKey, setApiKey] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Anime[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

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
      const res = await fetch(`/api/v1/anime?query=${encodeURIComponent(query)}`, {
        headers: { Authorization: `Bearer ${apiKey}` },
      });
      if (!res.ok) throw new Error("Error buscando animes");
      const data = await res.json();
      setResults(data.animes || []);
    } catch (e) {
      setError("No se pudo buscar animes.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Buscar Anime</h1>
      {!isValid ? (
        <div>
          <label className="block mb-2 font-medium">Introduce tu API key para acceder al buscador:</label>
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
          <h2 className="font-semibold mb-2">Resultados:</h2>
          <ul>
            {results.map(anime => (
              <li key={anime.id} className="mb-2 p-2 border rounded flex items-center gap-3">
                {anime.thumbnail && (
                  <img src={anime.thumbnail} alt={anime.title} className="w-12 h-12 object-cover rounded" />
                )}
                <div>
                  <div className="font-bold">{anime.title}</div>
                  <div className="text-xs text-gray-500">{anime.type} | {anime.status}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
} 