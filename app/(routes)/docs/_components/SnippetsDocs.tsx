"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function SnippetsDocs() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-white">Fragmentos de Código</h2>
      <p className="text-gray-300 mb-6">
        Fragmentos de código listos para usar que te ayudarán a integrar nuestra API en tus aplicaciones utilizando diferentes lenguajes de programación.
      </p>

      <Tabs defaultValue="react" className="w-full">
        <TabsList className="grid grid-cols-4 w-[400px] mb-4">
          <TabsTrigger value="react">React</TabsTrigger>
          <TabsTrigger value="next">Next.js</TabsTrigger>
          <TabsTrigger value="vanilla">Vanilla JS</TabsTrigger>
          <TabsTrigger value="node">Node.js</TabsTrigger>
        </TabsList>

        <Card className="p-4 bg-gray-800 border-0">
          <TabsContent value="react" className="mt-0 space-y-8">            <div>
              <h3 className="text-xl font-semibold mb-3 text-white">Componente React para Personajes de DragonBall</h3>
              <p className="text-gray-300 mb-4">
                Usa este componente React para obtener y mostrar personajes de DragonBall en tu aplicación.
              </p>
              
              <div className="bg-gray-900 p-4 rounded-md overflow-x-auto">
                <pre className="text-yellow-400">
{`import React, { useState, useEffect } from 'react';
import './CharactersGrid.css';

const API_KEY = 'YOUR_API_KEY';

export function DragonBallCharacters() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          \`https://api.example.com/v1/dragonball/characters?page=\${page}\`,
          {
            headers: {
              'Authorization': \`Bearer \${API_KEY}\`,
              'Content-Type': 'application/json',
            },
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch characters');
        }

        const data = await response.json();
        setCharacters(data.data);
        setError(null);
      } catch (err) {
        console.error('Error:', err);
        setError('Failed to load characters. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, [page]);

  const handleNextPage = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(prevPage => prevPage - 1);
    }
  };

  if (loading) {
    return <div className="loading">Cargando personajes...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="characters-container">
      <h2>Personajes de DragonBall</h2>
      <div className="characters-grid">
        {characters.map(character => (
          <div key={character.id} className="character-card">
            <img 
              src={character.image} 
              alt={character.name} 
              className="character-image" 
            />
            <h3>{character.name}</h3>
            <p className="race">{character.race}</p>
            <p className="power">Nivel de Poder: {character.ki}</p>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button 
          onClick={handlePrevPage} 
          disabled={page <= 1}
        >
          Página Anterior
        </button>
        <span>Página {page}</span>
        <button onClick={handleNextPage}>Página Siguiente</button>
      </div>
    </div>
  );
}`}
                </pre>
              </div>
              
              <div className="bg-gray-900 p-4 rounded-md overflow-x-auto mt-4">
                <h4 className="text-md font-medium text-gray-300 mb-2">CSS para el componente:</h4>
                <pre className="text-yellow-400">
{`.characters-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.characters-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 20px;
  margin: 20px 0;
}

.character-card {
  background-color: #1f2937;
  border-radius: 8px;
  padding: 16px;
  transition: transform 0.2s;
}

.character-card:hover {
  transform: translateY(-5px);
}

.character-image {
  width: 100%;
  aspect-ratio: 3/4;
  object-fit: contain;
  border-radius: 4px;
  margin-bottom: 12px;
}

.character-card h3 {
  font-size: 18px;
  margin: 0 0 8px 0;
}

.race {
  color: #fbbf24;
  font-size: 14px;
  margin: 0 0 4px 0;
}

.power {
  color: #34d399;
  font-size: 14px;
}

.pagination {
  display: flex;
  justify-content: center;
  gap: 16px;
  align-items: center;
  margin-top: 24px;
}

.pagination button {
  padding: 8px 16px;
  background-color: #2563eb;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.pagination button:disabled {
  background-color: #6b7280;
  cursor: not-allowed;
}

.loading, .error {
  text-align: center;
  padding: 40px;
  font-size: 18px;
}`}
                </pre>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="next" className="mt-0 space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-3 text-white">Ruta API de Next.js</h3>
              <p className="text-gray-300 mb-4">
                Crea una ruta API de Next.js que sirva como proxy a nuestra API, manteniendo tu clave API segura en el servidor.
              </p>
              
              <div className="bg-gray-900 p-4 rounded-md overflow-x-auto">
                <h4 className="text-md font-medium text-gray-300 mb-2">pages/api/dragonball/characters.js</h4>
                <pre className="text-yellow-400">
{`// pages/api/dragonball/characters.js

const API_KEY = process.env.ANIME_API_KEY;
const API_BASE_URL = 'https://api.example.com/v1';

export default async function handler(req, res) {
  const { page = 1, limit = 20, race, gender } = req.query;
  
  try {
    // Build query string
    const params = new URLSearchParams();
    if (page) params.append('page', page);
    if (limit) params.append('limit', limit);
    if (race) params.append('race', race);
    if (gender) params.append('gender', gender);
    
    // Fetch data from external API
    const response = await fetch(
      \`\${API_BASE_URL}/dragonball/characters?\${params.toString()}\`,
      {
        headers: {
          'Authorization': \`Bearer \${API_KEY}\`,
          'Content-Type': 'application/json',
        },
      }
    );
    
    if (!response.ok) {
      throw new Error('Error fetching characters');
    }
    
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('API error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch characters' 
    });
  }
}`}
                </pre>
              </div>
              
              <div className="bg-gray-900 p-4 rounded-md overflow-x-auto mt-6">
                <h4 className="text-md font-medium text-gray-300 mb-2">pages/dragonball.js</h4>
                <pre className="text-yellow-400">
{`// pages/dragonball.js
import { useState, useEffect } from 'react';
import styles from '../styles/DragonBall.module.css';

export default function DragonBallPage() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  
  useEffect(() => {
    const fetchCharacters = async () => {
      setLoading(true);
      try {
        const res = await fetch(\`/api/dragonball/characters?page=\${page}\`);
        const data = await res.json();
        
        if (data.success) {
          setCharacters(data.data);
        }
      } catch (err) {
        console.error('Error fetching characters:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCharacters();
  }, [page]);
  
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Personajes de DragonBall</h1>
      
      {loading ? (
        <p className={styles.loading}>Cargando personajes...</p>
      ) : (
        <div className={styles.grid}>
          {characters.map((character) => (
            <div key={character.id} className={styles.card}>
              <img 
                src={character.image} 
                alt={character.name} 
                className={styles.image}
              />
              <h2>{character.name}</h2>
              <p>Raza: {character.race}</p>
              <p>Poder: {character.ki}</p>
            </div>
          ))}
        </div>
      )}
      
      <div className={styles.pagination}>
        <button 
          onClick={() => setPage(p => Math.max(p - 1, 1))}
          disabled={page === 1}
        >
          Anterior
        </button>
        <span>Página {page}</span>
        <button 
          onClick={() => setPage(p => p + 1)}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}`}
                </pre>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="vanilla" className="mt-0 space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-3">Implementación con JavaScript Vanilla</h3>
              <p className="text-gray-300 mb-4">
                Usa JavaScript puro para crear un navegador de personajes de DragonBall.
              </p>
              
              <div className="bg-gray-900 p-4 rounded-md overflow-x-auto">
                <h4 className="text-md font-medium text-gray-300 mb-2">HTML</h4>
                <pre className="text-yellow-400">
{`<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Personajes de DragonBall</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="container">
    <h1>Personajes de DragonBall</h1>
    
    <div class="filters">
      <div class="filter">
        <label for="race-filter">Filtrar por Raza:</label>
        <select id="race-filter">
          <option value="">Todas las Razas</option>
          <option value="Saiyan">Saiyan</option>
          <option value="Human">Humano</option>
          <option value="Namekian">Namekiano</option>
          <option value="Android">Androide</option>
        </select>
      </div>
    </div>
    
    <div id="characters-grid" class="characters-grid">
      <!-- Los personajes se insertarán aquí -->
    </div>
    
    <div class="pagination">
      <button id="prev-btn" disabled>Página Anterior</button>
      <span id="page-indicator">Página 1</span>
      <button id="next-btn">Página Siguiente</button>
    </div>
  </div>

  <script src="app.js"></script>
</body>
</html>`}
                </pre>
              </div>
              
              <div className="bg-gray-900 p-4 rounded-md overflow-x-auto mt-4">
                <h4 className="text-md font-medium text-gray-300 mb-2">JavaScript (app.js)</h4>
                <pre className="text-yellow-400">
{`// Replace with your actual API key
const API_KEY = 'YOUR_API_KEY';
const API_URL = 'https://api.example.com/v1/dragonball/characters';

// DOM Elements
const charactersGrid = document.getElementById('characters-grid');
const prevButton = document.getElementById('prev-btn');
const nextButton = document.getElementById('next-btn');
const pageIndicator = document.getElementById('page-indicator');
const raceFilter = document.getElementById('race-filter');

// State
let currentPage = 1;
let currentRace = '';

// Event Listeners
prevButton.addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    fetchCharacters();
  }
});

nextButton.addEventListener('click', () => {
  currentPage++;
  fetchCharacters();
});

raceFilter.addEventListener('change', (e) => {
  currentRace = e.target.value;
  currentPage = 1;
  fetchCharacters();
});

// Functions
async function fetchCharacters() {
  showLoading();
  
  let url = \`\${API_URL}?page=\${currentPage}\`;
  if (currentRace) {
    url += \`&race=\${currentRace}\`;
  }

  try {
    const response = await fetch(url, {
      headers: {
        'Authorization': \`Bearer \${API_KEY}\`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch characters');
    }

    const data = await response.json();
    renderCharacters(data.data);
    updatePagination(currentPage);
  } catch (error) {
    showError(error);
  }
}

function renderCharacters(characters) {
  charactersGrid.innerHTML = '';
  
  if (!characters || characters.length === 0) {
    charactersGrid.innerHTML = '<p class="no-results">No se encontraron personajes</p>';
    return;
  }

  characters.forEach(character => {
    const characterCard = document.createElement('div');
    characterCard.className = 'character-card';
    
    characterCard.innerHTML = \`
      <img src="\${character.image}" alt="\${character.name}" class="character-image">
      <h3>\${character.name}</h3>
      <p class="race">\${character.race}</p>
      <p class="power">Nivel de Poder: \${character.ki}</p>
    \`;
    
    charactersGrid.appendChild(characterCard);
  });
}

function showLoading() {
  charactersGrid.innerHTML = '<p class="loading">Cargando personajes...</p>';
}

function showError(error) {
  charactersGrid.innerHTML = \`<p class="error">Error: \${error.message}</p>\`;
  console.error('Error de API:', error);
}

function updatePagination(page) {
  pageIndicator.textContent = \`Página \${page}\`;
  prevButton.disabled = page <= 1;
}

// Initial load
fetchCharacters();`}
                </pre>
              </div>
              
              <div className="bg-gray-900 p-4 rounded-md overflow-x-auto mt-4">
                <h4 className="text-md font-medium text-gray-300 mb-2">CSS (styles.css)</h4>
                <pre className="text-yellow-400">
{`* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  background-color: #111827;
  color: #f3f4f6;
  line-height: 1.6;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

h1 {
  font-size: 2rem;
  margin-bottom: 2rem;
  text-align: center;
}

.filters {
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
}

.filter {
  margin: 0 1rem;
}

.filter label {
  margin-right: 0.5rem;
}

.filter select {
  padding: 0.5rem;
  border-radius: 4px;
  background-color: #1f2937;
  color: #f3f4f6;
  border: 1px solid #374151;
}

.characters-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.character-card {
  background-color: #1f2937;
  border-radius: 8px;
  padding: 1rem;
  transition: transform 0.2s;
}

.character-card:hover {
  transform: translateY(-5px);
}

.character-image {
  width: 100%;
  aspect-ratio: 3/4;
  object-fit: contain;
  margin-bottom: 1rem;
}

.character-card h3 {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
}

.race {
  color: #fbbf24;
  font-size: 0.9rem;
}

.power {
  color: #34d399;
  font-size: 0.9rem;
  margin-top: 0.25rem;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}

.pagination button {
  padding: 0.5rem 1rem;
  background-color: #2563eb;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.pagination button:disabled {
  background-color: #6b7280;
  cursor: not-allowed;
}

.loading, .error, .no-results {
  grid-column: 1 / -1;
  text-align: center;
  padding: 2rem;
  font-size: 1.2rem;
}

.error {
  color: #ef4444;
}`}
                </pre>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="node" className="mt-0 space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-3">Node.js Backend Implementation</h3>
              <p className="text-gray-300 mb-4">
                Create a Node.js Express server that interacts with our API.
              </p>
              
              <div className="bg-gray-900 p-4 rounded-md overflow-x-auto">
                <h4 className="text-md font-medium text-gray-300 mb-2">Setting up the project</h4>
                <pre className="text-yellow-400">
{`// First, create a new project and install dependencies
// npm init -y
// npm install express dotenv node-fetch

// Create .env file with your API key
// API_KEY=your_api_key_here`}
                </pre>
              </div>
              
              <div className="bg-gray-900 p-4 rounded-md overflow-x-auto mt-4">
                <h4 className="text-md font-medium text-gray-300 mb-2">server.js</h4>
                <pre className="text-yellow-400">
{`const express = require('express');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.API_KEY;
const API_BASE_URL = 'https://api.example.com/v1';

app.use(express.json());
app.use(express.static('public'));

// Route to get DragonBall characters
app.get('/api/characters', async (req, res) => {
  try {
    const { page = 1, limit = 20, race, gender } = req.query;
    
    // Build query parameters
    const params = new URLSearchParams();
    if (page) params.append('page', page);
    if (limit) params.append('limit', limit);
    if (race) params.append('race', race);
    if (gender) params.append('gender', gender);
    
    // Call external API
    const response = await fetch(
      \`\${API_BASE_URL}/dragonball/characters?\${params.toString()}\`,
      {
        headers: {
          'Authorization': \`Bearer \${API_KEY}\`,
          'Content-Type': 'application/json',
        },
      }
    );
    
    if (!response.ok) {
      throw new Error(\`API error: \${response.status}\`);
    }
    
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching characters:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch characters' 
    });
  }
});

// Route to get a specific character
app.get('/api/characters/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const response = await fetch(
      \`\${API_BASE_URL}/dragonball/characters/\${id}\`,
      {
        headers: {
          'Authorization': \`Bearer \${API_KEY}\`,
          'Content-Type': 'application/json',
        },
      }
    );
    
    if (!response.ok) {
      throw new Error(\`API error: \${response.status}\`);
    }
    
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching character:', error);
    res.status(500).json({ 
      success: false, 
      error: \`Failed to fetch character with ID \${req.params.id}\` 
    });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(\`Server running on http://localhost:\${PORT}\`);
});`}
                </pre>
              </div>
              
              <div className="bg-gray-900 p-4 rounded-md overflow-x-auto mt-4">
                <h4 className="text-md font-medium text-gray-300 mb-2">public/index.html</h4>
                <pre className="text-yellow-400">
{`<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Personajes de DragonBall</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="container">
    <h1>Personajes de DragonBall</h1>
    
    <div id="characters-grid" class="characters-grid">
      <!-- Los personajes se insertarán aquí -->
    </div>
    
    <div class="pagination">
      <button id="prev-btn" disabled>Página Anterior</button>
      <span id="page-indicator">Página 1</span>
      <button id="next-btn">Página Siguiente</button>
    </div>
    
    <div id="character-details" class="character-details hidden">
      <!-- Los detalles del personaje seleccionado se mostrarán aquí -->
    </div>
  </div>

  <script src="app.js"></script>
</body>
</html>`}
                </pre>
              </div>
              
              <div className="bg-gray-900 p-4 rounded-md overflow-x-auto mt-4">
                <h4 className="text-md font-medium text-gray-300 mb-2">public/app.js</h4>
                <pre className="text-yellow-400">
{`let currentPage = 1;

document.addEventListener('DOMContentLoaded', () => {
  fetchCharacters(currentPage);
  
  document.getElementById('prev-btn').addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage--;
      fetchCharacters(currentPage);
    }
  });
  
  document.getElementById('next-btn').addEventListener('click', () => {
    currentPage++;
    fetchCharacters(currentPage);
  });
});

async function fetchCharacters(page) {
  const charactersGrid = document.getElementById('characters-grid');
  charactersGrid.innerHTML = '<p class="loading">Cargando personajes...</p>';
  
  try {
    const response = await fetch(\`/api/characters?page=\${page}\`);
    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.error || 'Failed to fetch characters');
    }
    
    renderCharacters(data.data);
    updatePagination(page);
  } catch (error) {
    charactersGrid.innerHTML = \`<p class="error">\${error.message}</p>\`;
    console.error('Error:', error);
  }
}

function renderCharacters(characters) {
  const charactersGrid = document.getElementById('characters-grid');
  charactersGrid.innerHTML = '';
  
  if (!characters || characters.length === 0) {
    charactersGrid.innerHTML = '<p class="no-results">No se encontraron personajes</p>';
    return;
  }
  
  characters.forEach(character => {
    const characterCard = document.createElement('div');
    characterCard.className = 'character-card';
    
    characterCard.innerHTML = \`
      <img src="\${character.image}" alt="\${character.name}" class="character-image">
      <h3>\${character.name}</h3>
      <p class="race">\${character.race}</p>
      <p class="power">Nivel de Poder: \${character.ki}</p>
      <button class="details-btn" data-id="\${character.id}">View Details</button>
    \`;
    
    charactersGrid.appendChild(characterCard);
    
    // Add event listener to the "View Details" button
    const detailsBtn = characterCard.querySelector('.details-btn');
    detailsBtn.addEventListener('click', () => {
      fetchCharacterDetails(character.id);
    });
  });
}

async function fetchCharacterDetails(id) {
  const detailsContainer = document.getElementById('character-details');
  
  try {
    detailsContainer.innerHTML = '<p class="loading">Cargando detalles del personaje...</p>';
    detailsContainer.classList.remove('hidden');
    
    const response = await fetch(\`/api/characters/\${id}\`);
    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.error || 'Failed to fetch character details');
    }
    
    const character = data.data;
    
    detailsContainer.innerHTML = \`
      <div class="details-header">
        <h2>\${character.name}</h2>
        <button id="close-details">&times;</button>
      </div>
      <div class="details-content">
        <div class="details-image">
          <img src="\${character.image}" alt="\${character.name}">
        </div>
        <div class="details-info">
          <p><strong>Race:</strong> \${character.race}</p>
          <p><strong>Gender:</strong> \${character.gender}</p>
          <p><strong>Base Power Level:</strong> \${character.ki}</p>
          <p><strong>Max Power Level:</strong> \${character.maxKi}</p>
          <p><strong>Affiliation:</strong> \${character.affiliation}</p>
          <div class="description">
            <h3>Description</h3>
            <p>\${character.description || 'No description available.'}</p>
          </div>
        </div>
      </div>
    \`;
    
    // Add event listener to close button
    document.getElementById('close-details').addEventListener('click', () => {
      detailsContainer.classList.add('hidden');
    });
    
  } catch (error) {
    detailsContainer.innerHTML = \`<p class="error">\${error.message}</p>\`;
    console.error('Error:', error);
  }
}

function updatePagination(page) {
  document.getElementById('page-indicator').textContent = \`Página \${page}\`;
  document.getElementById('prev-btn').disabled = page <= 1;
}`}
                </pre>
              </div>
            </div>
          </TabsContent>
        </Card>
      </Tabs>
    </div>
  );
}
