"use client";
import { useState } from "react";
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '../_components/AppSidebar';
import AppHeader from '../_components/AppHeader';

const SNIPPETS = [
  {
    title: "JavaScript (fetch)",
    preview: (
      <div className="bg-[#181F2A] p-4 rounded mb-2 text-white">
        <b>Resultado:</b> <br />
        <span>Busca animes usando tu API key y muestra los títulos en una lista.</span>
        <ul className="list-disc ml-6 mt-2">
          <li>Naruto</li>
          <li>One Piece</li>
          <li>Attack on Titan</li>
        </ul>
      </div>
    ),
    code: `fetch('https://animeapi.dev/api/v1/anime?query=naruto', {
  headers: {
    'Authorization': 'Bearer TU_API_KEY'
  }
})
  .then(res => res.json())
  .then(data => {
    data.animes.forEach(anime => {
      console.log(anime.title);
    });
  });`
  },
  {
    title: "Python (requests)",
    preview: (
      <div className="bg-[#181F2A] p-4 rounded mb-2 text-white">
        <b>Resultado:</b> <br />
        <span>Imprime los títulos de los animes encontrados.</span>
        <ul className="list-disc ml-6 mt-2">
          <li>Naruto</li>
          <li>One Piece</li>
        </ul>
      </div>
    ),
    code: `import requests
headers = {'Authorization': 'Bearer TU_API_KEY'}
resp = requests.get('https://animeapi.dev/api/v1/anime?query=naruto', headers=headers)
for anime in resp.json()['animes']:
    print(anime['title'])`
  },
  {
    title: "HTML (fetch + render)",
    preview: (
      <div className="bg-[#181F2A] p-4 rounded mb-2 text-white">
        <b>Resultado:</b> <br />
        <span>Renderiza una lista de animes en una web simple.</span>
        <ul className="list-disc ml-6 mt-2">
          <li>Naruto</li>
          <li>Bleach</li>
        </ul>
      </div>
    ),
    code: `<ul id="anime-list"></ul>
<script>
fetch('https://animeapi.dev/api/v1/anime?query=naruto', {
  headers: { 'Authorization': 'Bearer TU_API_KEY' }
})
  .then(res => res.json())
  .then(data => {
    const ul = document.getElementById('anime-list');
    data.animes.forEach(anime => {
      const li = document.createElement('li');
      li.textContent = anime.title;
      ul.appendChild(li);
    });
  });
</script>`
  },
  {
    title: "Tarjeta de resultados (React + fetch)",
    preview: (
      <div className="bg-[#181F2A] p-4 rounded mb-2 text-white">
        <b>Resultado:</b> <br />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
          <div className="flex gap-3 items-center bg-[#232B3A] rounded p-3">
            <img src="https://cdn.myanimelist.net/images/anime/6/73245.jpg" alt="One Piece" className="w-16 h-16 object-cover rounded" />
            <div>
              <div className="font-bold">One Piece</div>
              <div className="text-xs text-gray-400">El joven Luffy se embarca en la aventura pirata más grande de todos los tiempos.</div>
            </div>
          </div>
          <div className="flex gap-3 items-center bg-[#232B3A] rounded p-3">
            <img src="https://cdn.myanimelist.net/images/anime/2/73249.jpg" alt="One Piece: Episode of Sabo" className="w-16 h-16 object-cover rounded" />
            <div>
              <div className="font-bold">One Piece: Episode of Sabo</div>
              <div className="text-xs text-gray-400">Especial sobre la historia de Sabo, hermano de Luffy y Ace.</div>
            </div>
          </div>
        </div>
      </div>
    ),
    code: `fetch('https://animeapi.dev/api/v1/anime?query=one piece', {
  headers: {
    'Authorization': 'Bearer sk-demo1234567890'
  }
})
  .then(res => res.json())
  .then(data => {
    data.animes.forEach(anime => {
      // Renderiza una tarjeta con anime.picture, anime.title y anime.synopsis
      // Ejemplo en React:
      // <div>
      //   <img src={anime.picture} alt={anime.title} />
      //   <div>{anime.title}</div>
      //   <div>{anime.synopsis}</div>
      // </div>
    });
  });`
  }
];

export default function SnippetsPage() {
  const [copied, setCopied] = useState<number | null>(null);

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <AppHeader />
        <div className="p-10">
          <div className="max-w-2xl mx-auto py-12 px-4">
            <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-violet-600 via-blue-500 to-indigo-400 bg-clip-text text-transparent">Ejemplos de integración (Snippets)</h1>
            <p className="mb-8 text-gray-300">Aquí tienes ejemplos de cómo consumir la API de Anime en diferentes lenguajes. Copia y pega el código en tu proyecto y reemplaza <b>TU_API_KEY</b> por tu clave personal.</p>
            {SNIPPETS.map((snippet, idx) => (
              <div key={idx} className="mb-10">
                <h2 className="text-xl font-semibold mb-2 text-white">{snippet.title}</h2>
                {snippet.preview}
                <pre className="bg-[#232B3A] text-sm rounded p-4 overflow-x-auto text-white mb-2"><code>{snippet.code}</code></pre>
                <button
                  className="bg-[#FF640A] text-white px-4 py-1 rounded font-semibold hover:bg-orange-500 transition"
                  onClick={() => {
                    navigator.clipboard.writeText(snippet.code);
                    setCopied(idx);
                    setTimeout(() => setCopied(null), 1500);
                  }}
                >
                  {copied === idx ? '¡Copiado!' : 'Copiar código'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </SidebarProvider>
  );
} 