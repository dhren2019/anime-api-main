"use client";
import { useState } from "react";
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '../_components/AppSidebar';
import AppHeader from '../_components/AppHeader';
import React from 'react';

interface CodeTab {
  language: string;
  content: string;
}

const CodeTabs = ({ code }: { code: CodeTab[] }) => {
  const [activeTab, setActiveTab] = useState(0);
  
  return (
    <div className="relative">
      <div className="flex gap-2 mb-2">
        {code.map((tab: CodeTab, index: number) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`px-4 py-2 rounded-t-lg text-sm ${
              activeTab === index 
                ? 'bg-[#181F2A] text-white' 
                : 'bg-[#1E2736] text-gray-400 hover:text-white'
            }`}
          >
            {tab.language}
          </button>
        ))}
      </div>
      <pre className="bg-[#181F2A] p-4 rounded-b rounded-tr overflow-x-auto">
        <code className="text-sm text-white">{code[activeTab].content}</code>
      </pre>
    </div>
  );
};

const AnimeCards = () => {
  const [selectedAnime, setSelectedAnime] = useState<any>(null);
  
  const animes = [
    {
      id: 1,
      title: "One Piece",
      synopsis: "El joven Luffy se embarca en la aventura pirata más grande de todos los tiempos.",
      image: "https://cdn.myanimelist.net/images/anime/6/73245.jpg",
      type: "TV",
      episodes: 1000,
      status: "En emisión",
      year: 1999
    },
    {
      id: 2,
      title: "One Piece: Episode of Sabo",
      synopsis: "Especial sobre la historia de Sabo, hermano de Luffy y Ace.",
      image: "https://cdn.myanimelist.net/images/anime/2/73249.jpg",
      type: "Especial",
      episodes: 1,
      status: "Finalizado",
      year: 2015
    },
    {
      id: 3,
      title: "Attack on Titan",
      synopsis: "La humanidad lucha por sobrevivir contra gigantes que devoran humanos en un mundo post-apocalíptico.",
      image: "https://cdn.myanimelist.net/images/anime/10/47347.jpg",
      type: "TV",
      episodes: 25,
      status: "Finalizado",
      year: 2013
    },
    {
      id: 4,
      title: "Naruto",
      synopsis: "Un joven ninja busca el reconocimiento de sus pares y sueña con convertirse en Hokage.",
      image: "https://cdn.myanimelist.net/images/anime/13/17405.jpg",
      type: "TV",
      episodes: 220,
      status: "Finalizado",
      year: 2002
    }
  ];

  return (
    <div className="bg-[#181F2A] p-4 rounded mb-2 text-white">
      <div className="text-lg font-semibold mb-4">Resultado:</div>
      <div className="overflow-x-auto pb-4">
        <div className="flex gap-4 mt-2">
          {animes.map((anime, index) => (
            <div 
              key={anime.id}
              onClick={() => setSelectedAnime(anime)}
              className="bg-[#232B3A]/80 backdrop-blur-sm rounded-lg p-4 flex-shrink-0 w-[280px] cursor-pointer hover:bg-[#2A3444] transition-colors relative group overflow-hidden"
            >
              <span className="absolute right-2 top-0 text-[10rem] leading-[0.8] font-black text-[#127BD5]/50 z-[99999]">
                {index + 1}
              </span>
              <div className="relative">
                <img src={anime.image} alt={anime.title} className="w-full h-[157px] object-cover rounded-lg mb-3" />
                <h3 className="font-bold text-white">{anime.title}</h3>
                <p className="text-sm text-gray-400 mt-1">{anime.synopsis}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4 text-sm text-gray-400">Haz click en una tarjeta para ver los detalles completos del anime en un popup.</div>

      {selectedAnime && (
        <div 
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50" 
          onClick={() => setSelectedAnime(null)}
        >
          <div 
            className="bg-[#232B3A] p-6 rounded-lg shadow-xl max-w-md w-full text-white relative" 
            onClick={e => e.stopPropagation()}
          >
            <button 
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              onClick={() => setSelectedAnime(null)}
            >
              ✕
            </button>
            <img 
              src={selectedAnime.image} 
              alt={selectedAnime.title} 
              className="w-full h-[200px] object-cover rounded-lg mb-4" 
            />
            <h2 className="text-2xl font-bold mb-2">{selectedAnime.title}</h2>
            <p className="mb-4 text-gray-300">{selectedAnime.synopsis}</p>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-400">Tipo:</span> {selectedAnime.type}
              </div>
              <div>
                <span className="text-gray-400">Episodios:</span> {selectedAnime.episodes}
              </div>
              <div>
                <span className="text-gray-400">Estado:</span> {selectedAnime.status}
              </div>
              <div>
                <span className="text-gray-400">Año:</span> {selectedAnime.year}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const SNIPPETS = [
  {
    title: "Tarjeta de resultados (fetch + React)",
    preview: <AnimeCards />,
    code: [
      {
        language: "React",
        content: `import React, { useState } from 'react';

const AnimeCards = () => {
  const [selectedAnime, setSelectedAnime] = useState(null);
  
  // Datos de ejemplo (en una aplicación real, estos vendrían de la API)
  const animes = [
    {
      id: 1,
      title: "One Piece",
      synopsis: "El joven Luffy se embarca en la aventura pirata más grande de todos los tiempos.",
      image: "https://cdn.myanimelist.net/images/anime/6/73245.jpg",
      type: "TV",
      episodes: 1000,
      status: "En emisión",
      year: 1999
    },
    // ... más animes ...
  ];

  return (
    <div className="flex gap-4 overflow-x-auto pb-4">
      {animes.map((anime, index) => (
        <div 
          key={anime.id}
          onClick={() => setSelectedAnime(anime)}
          className="bg-[#232B3A]/80 backdrop-blur-sm rounded-lg p-4 flex-shrink-0 w-[280px] relative group overflow-hidden"
        >
          <span className="absolute right-2 top-0 text-[10rem] leading-[0.8] font-black text-white/10">
            {index + 1}
          </span>
          <div className="relative">
            <img src={anime.image} alt={anime.title} className="w-full h-[157px] object-cover rounded-lg" />
            <h3 className="font-bold text-white">{anime.title}</h3>
            <p className="text-sm text-gray-400">{anime.synopsis}</p>
          </div>
        </div>
      ))}

      {selectedAnime && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-[#232B3A] p-6 rounded-lg max-w-md w-full">
            <h2 className="text-2xl font-bold text-white">{selectedAnime.title}</h2>
            {/* ... más detalles del anime ... */}
          </div>
        </div>
      )}
    </div>
  );
};`
      },
      {
        language: "CSS",
        content: `.anime-card {
  background: rgba(35, 43, 58, 0.8);
  backdrop-filter: blur(4px);
  border-radius: 8px;
  padding: 1rem;
  width: 280px;
  flex-shrink: 0;
  cursor: pointer;
  transition: background-color 0.2s;
  position: relative;
  overflow: hidden;
}

.anime-card::before {
  content: attr(data-number);
  position: absolute;
  right: 0.5rem;
  top: 0;
  font-size: 10rem;
  font-weight: 900;
  line-height: 0.8;
  color: rgba(255, 255, 255, 0.1);
  z-index: 0;
}

.anime-card > * {
  position: relative;
  z-index: 1;
}

.anime-card:hover {
  background: #2A3444;
}

.anime-card img {
  width: 100%;
  height: 157px;
  object-fit: cover;
  border-radius: 8px;
  position: relative;
  z-index: 1;
}

.anime-card h3 {
  color: white;
  font-weight: bold;
  position: relative;
  z-index: 1;
}

.anime-card p {
  color: #94A3B8;
  font-size: 0.875rem;
  margin-top: 0.25rem;
  position: relative;
  z-index: 1;
}`
      },
      {
        language: "JavaScript",
        content: `fetch('https://animeapi.dev/api/v1/anime?query=one piece', {
  headers: {
    'Authorization': 'Bearer TU_API_KEY'
  }
})
.then(res => res.json())
.then(data => {
  const container = document.querySelector('.anime-container');
  
  data.animes.forEach((anime, index) => {
    const card = document.createElement('div');
    card.className = 'anime-card';
    card.setAttribute('data-number', index + 1);
    
    card.innerHTML = \`
      <img src="\${anime.image}" alt="\${anime.title}" />
      <h3>\${anime.title}</h3>
      <p>\${anime.synopsis}</p>
    \`;
    
    container.appendChild(card);
  });
});`
      }
    ]
  },
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
    code: [{
      language: "JavaScript",
      content: `fetch('https://animeapi.dev/api/v1/anime?query=naruto', {
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
    }]
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
    code: [{
      language: "Python",
      content: `import requests
headers = {'Authorization': 'Bearer TU_API_KEY'}
resp = requests.get('https://animeapi.dev/api/v1/anime?query=naruto', headers=headers)
for anime in resp.json()['animes']:
    print(anime['title'])`
    }]
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
    code: [{
      language: "HTML",
      content: `<ul id="anime-list"></ul>
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
    }]
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
    code: [
      {
        language: "React",
        content: `import React from 'react';

const AnimeGrid = () => {
  const animes = [
    {
      id: 1,
      title: "One Piece",
      synopsis: "El joven Luffy se embarca en la aventura pirata más grande de todos los tiempos.",
      image: "https://cdn.myanimelist.net/images/anime/6/73245.jpg"
    },
    {
      id: 2,
      title: "One Piece: Episode of Sabo",
      synopsis: "Especial sobre la historia de Sabo, hermano de Luffy y Ace.",
      image: "https://cdn.myanimelist.net/images/anime/2/73249.jpg"
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {animes.map(anime => (
        <div key={anime.id} className="flex gap-3 items-center bg-[#232B3A] rounded p-3">
          <img src={anime.image} alt={anime.title} className="w-16 h-16 object-cover rounded" />
          <div>
            <div className="font-bold text-white">{anime.title}</div>
            <div className="text-xs text-gray-400">{anime.synopsis}</div>
          </div>
        </div>
      ))}
    </div>
  );
};`
      },
      {
        language: "JavaScript",
        content: `fetch('https://animeapi.dev/api/v1/anime?query=one piece', {
  headers: {
    'Authorization': 'Bearer TU_API_KEY'
  }
})
.then(res => res.json())
.then(data => {
  const container = document.querySelector('.anime-grid');
  
  data.animes.forEach(anime => {
    const card = document.createElement('div');
    card.className = 'flex gap-3 items-center bg-[#232B3A] rounded p-3';
    
    card.innerHTML = \`
      <img src="\${anime.image}" alt="\${anime.title}" class="w-16 h-16 object-cover rounded" />
      <div>
        <div class="font-bold text-white">\${anime.title}</div>
        <div class="text-xs text-gray-400">\${anime.synopsis}</div>
      </div>
    \`;
    
    container.appendChild(card);
  });
});`
      }
    ]
  }
];

export default function SnippetsPage() {
  const [copied, setCopied] = useState<number | null>(null);

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <AppHeader />
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-6 text-white">Snippets y ejemplos de código</h1>
          <div className="space-y-8">
            {SNIPPETS.map((snippet, index) => (
              <div key={index} className="bg-[#232B3A] rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-white">{snippet.title}</h2>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(Array.isArray(snippet.code) ? snippet.code[0].content : snippet.code);
                      setCopied(index);
                      setTimeout(() => setCopied(null), 2000);
                    }}
                    className="bg-[#2A3444] text-sm px-3 py-1.5 rounded hover:bg-[#313E52] transition-colors text-white"
                  >
                    {copied === index ? "¡Copiado!" : "Copiar código"}
                  </button>
                </div>
                {snippet.preview}
                {Array.isArray(snippet.code) ? (
                  <CodeTabs code={snippet.code} />
                ) : (
                  <pre className="bg-[#181F2A] p-4 rounded mt-4 overflow-x-auto">
                    <code className="text-sm text-white">{snippet.code}</code>
                  </pre>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
    </SidebarProvider>
  );
} 