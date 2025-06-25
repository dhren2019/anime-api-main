"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function EndpointsDocs() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-white">Endpoints de la API</h2>
      <p className="text-gray-300 mb-6">
        Referencia completa de todos los endpoints disponibles de la API, parámetros y ejemplos.
      </p>      <Tabs defaultValue="dragonball" className="w-full">
        <TabsList className="grid grid-cols-3 w-[400px] mb-4">
          <TabsTrigger value="dragonball">DragonBall API</TabsTrigger>
          <TabsTrigger value="anime">Anime API</TabsTrigger>
          <TabsTrigger value="user">API de Usuario</TabsTrigger>
        </TabsList>

        <Card className="p-4 bg-gray-800 border-0">
          <TabsContent value="dragonball" className="mt-0 space-y-8">            <div>
              <h3 className="text-xl font-semibold mb-3 text-white">Personajes</h3>
              <Card className="p-6 bg-gray-900 border-0">
                <h4 className="text-lg font-medium text-yellow-400 mb-2">GET /api/v1/dragonball/characters</h4>
                <p className="text-gray-300 mb-4">
                  Obtener una lista de todos los personajes de DragonBall con paginación.
                </p>
                
                <div className="mb-4">
                  <h5 className="text-md font-medium text-gray-300 mb-2">Parámetros de Consulta:</h5><table className="w-full text-sm">
                    <thead className="text-white">
                      <tr>
                        <th className="text-left p-2">Parámetro</th>
                        <th className="text-left p-2">Tipo</th>
                        <th className="text-left p-2">Descripción</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-300">
                      <tr className="border-t border-gray-700">
                        <td className="p-2">page</td>
                        <td className="p-2">number</td>
                        <td className="p-2">Número de página (predeterminado: 1)</td>
                      </tr>
                      <tr className="border-t border-gray-700">
                        <td className="p-2">limit</td>
                        <td className="p-2">number</td>
                        <td className="p-2">Resultados por página (predeterminado: 20, máx: 100)</td>
                      </tr>
                      <tr className="border-t border-gray-700">
                        <td className="p-2">race</td>
                        <td className="p-2">string</td>
                        <td className="p-2">Filtrar por raza (ej., Saiyan, Human, Namekian)</td>
                      </tr>
                      <tr className="border-t border-gray-700">
                        <td className="p-2">gender</td>
                        <td className="p-2">string</td>
                        <td className="p-2">Filtrar por género (ej., Male, Female)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                <div className="mb-4">
                  <h5 className="text-md font-medium text-gray-300 mb-2">Ejemplo de Respuesta:</h5>
                  <div className="bg-gray-950 p-4 rounded-md overflow-x-auto">
                    <pre className="text-yellow-400">
{`{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Goku",
      "race": "Saiyan",
      "gender": "Male",
      "ki": "60,000,000",
      "maxKi": "90 Septillion",
      "affiliation": "Z Fighter",
      "image": "/dragonball-api/characters/goku.png",
      "description": "El protagonista de la serie..."
    },
    // Más personajes...
  ],
  "meta": {
    "total": 137,
    "page": 1,
    "limit": 20
  }
}`}
                    </pre>
                  </div>
                </div>
              </Card>
                <Card className="p-6 bg-gray-900 border-0 mt-4">
                <h4 className="text-lg font-medium text-yellow-400 mb-2">GET /api/v1/dragonball/characters/{'{id}'}</h4>
                <p className="text-gray-300 mb-4">
                  Obtener información detallada sobre un personaje específico de DragonBall.
                </p>
                
                <div className="mb-4">
                  <h5 className="text-md font-medium text-gray-300 mb-2">Parámetros de Ruta:</h5>
                  <table className="w-full text-sm">
                    <thead className="text-gray-400">
                      <tr>
                        <th className="text-left p-2">Parámetro</th>
                        <th className="text-left p-2">Tipo</th>
                        <th className="text-left p-2">Descripción</th>
                      </tr>
                    </thead>                    <tbody className="text-gray-300">
                      <tr className="border-t border-gray-700">
                        <td className="p-2">id</td>
                        <td className="p-2">number</td>
                        <td className="p-2">ID del personaje</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                <div className="mb-4">
                  <h5 className="text-md font-medium text-gray-300 mb-2">Example Response:</h5>
                  <div className="bg-gray-950 p-4 rounded-md overflow-x-auto">
                    <pre className="text-yellow-400">
{`{
  "success": true,
  "data": {
    "id": 1,
    "name": "Goku",
    "race": "Saiyan",
    "gender": "Male",
    "ki": "60,000,000",
    "maxKi": "90 Septillion",
    "affiliation": "Z Fighter",
    "image": "/dragonball-api/characters/goku.png",
    "description": "The protagonist of the series...",
    "transformations": [
      {
        "id": 1,
        "name": "Super Saiyan",
        "ki": "3,000,000,000",
        "image": "/dragonball-api/transformations/goku-ssj.png"
      },
      // Más transformaciones...
    ]
  }
}`}
                    </pre>
                  </div>
                </div>
              </Card>
            </div>            <div>
              <h3 className="text-xl font-semibold mb-3 text-white">Transformaciones</h3>
              <Card className="p-6 bg-gray-900 border-0">
                <h4 className="text-lg font-medium text-yellow-400 mb-2">GET /api/v1/dragonball/transformations</h4>
                <p className="text-gray-300 mb-4">
                  Obtener una lista de todas las transformaciones de personajes.
                </p>
                
                <div className="mb-4">
                  <h5 className="text-md font-medium text-gray-300 mb-2">Parámetros de Consulta:</h5>
                  <table className="w-full text-sm">
                    <thead className="text-gray-400">
                      <tr>
                        <th className="text-left p-2">Parámetro</th>
                        <th className="text-left p-2">Tipo</th>
                        <th className="text-left p-2">Descripción</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-300">
                      <tr className="border-t border-gray-700">                        <td className="p-2">page</td>
                        <td className="p-2">number</td>
                        <td className="p-2">Número de página (predeterminado: 1)</td>
                      </tr>
                      <tr className="border-t border-gray-700">
                        <td className="p-2">limit</td>
                        <td className="p-2">number</td>
                        <td className="p-2">Resultados por página (predeterminado: 20, máx: 100)</td>
                      </tr>
                      <tr className="border-t border-gray-700">
                        <td className="p-2">characterId</td>
                        <td className="p-2">number</td>
                        <td className="p-2">Filtrar por ID del personaje</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3 text-white">Planetas</h3>
              <Card className="p-6 bg-gray-900 border-0">
                <h4 className="text-lg font-medium text-yellow-400 mb-2">GET /api/v1/dragonball/planets</h4>
                <p className="text-gray-300 mb-4">
                  Obtener una lista de todos los planetas en el universo de DragonBall.
                </p>
                
                <div className="mb-4">
                  <h5 className="text-md font-medium text-gray-300 mb-2">Parámetros de Consulta:</h5>
                  <table className="w-full text-sm">
                    <thead className="text-gray-400">
                      <tr>
                        <th className="text-left p-2">Parámetro</th>
                        <th className="text-left p-2">Tipo</th>
                        <th className="text-left p-2">Descripción</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-300">
                      <tr className="border-t border-gray-700">
                        <td className="p-2">isDestroyed</td>
                        <td className="p-2">boolean</td>
                        <td className="p-2">Filtrar por estado de destrucción</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="anime" className="mt-0 space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-3 text-white">Anime</h3>
              <Card className="p-6 bg-gray-900 border-0">
                <h4 className="text-lg font-medium text-yellow-400 mb-2">GET /api/v1/anime</h4>
                <p className="text-gray-300 mb-4">
                  Obtener una lista de anime con paginación y opciones de filtrado.
                </p>
                
                <div className="mb-4">
                  <h5 className="text-md font-medium text-gray-300 mb-2">Parámetros de Consulta:</h5>
                  <table className="w-full text-sm">
                    <thead className="text-gray-400">
                      <tr>
                        <th className="text-left p-2">Parámetro</th>
                        <th className="text-left p-2">Tipo</th>
                        <th className="text-left p-2">Descripción</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-300">
                      <tr className="border-t border-gray-700">
                        <td className="p-2">genre</td>
                        <td className="p-2">string</td>
                        <td className="p-2">Filtrar por género</td>
                      </tr>
                      <tr className="border-t border-gray-700">
                        <td className="p-2">year</td>
                        <td className="p-2">number</td>
                        <td className="p-2">Filtrar por año de lanzamiento</td>
                      </tr>
                      <tr className="border-t border-gray-700">
                        <td className="p-2">sort</td>
                        <td className="p-2">string</td>
                        <td className="p-2">Ordenar por campo (ej., 'popularity', 'rating')</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="user" className="mt-0 space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-3 text-white">Información de Usuario</h3>
              <Card className="p-6 bg-gray-900 border-0">
                <h4 className="text-lg font-medium text-yellow-400 mb-2">GET /api/v1/user/me</h4>
                <p className="text-gray-300 mb-4">
                  Obtener información sobre el usuario autenticado.
                </p>
                
                <div className="mb-4">
                  <h5 className="text-md font-medium text-gray-300 mb-2">Ejemplo de Respuesta:</h5>
                  <div className="bg-gray-950 p-4 rounded-md overflow-x-auto">
                    <pre className="text-yellow-400">
{`{
  "success": true,
  "data": {
    "id": "user_123456",
    "email": "user@example.com",
    "name": "John Doe",
    "subscription": {
      "tier": "pro",
      "expiresAt": "2025-12-31T23:59:59Z"
    },
    "usage": {
      "requestsThisMonth": 1250,
      "limit": 50000
    }
  }
}`}
                    </pre>
                  </div>
                </div>
              </Card>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3 text-white">Claves API</h3>
              <Card className="p-6 bg-gray-900 border-0">
                <h4 className="text-lg font-medium text-yellow-400 mb-2">GET /api/v1/keys</h4>
                <p className="text-gray-300 mb-4">
                  Obtener todas las claves API del usuario autenticado.
                </p>
              </Card>
              
              <Card className="p-6 bg-gray-900 border-0 mt-4">
                <h4 className="text-lg font-medium text-yellow-400 mb-2">POST /api/v1/keys</h4>
                <p className="text-gray-300 mb-4">
                  Crear una nueva clave API.
                </p>
              </Card>
              
              <Card className="p-6 bg-gray-900 border-0 mt-4">
                <h4 className="text-lg font-medium text-yellow-400 mb-2">DELETE /api/v1/keys/{'{key}'}</h4>
                <p className="text-gray-300 mb-4">
                  Eliminar una clave API existente.
                </p>
              </Card>
            </div>
          </TabsContent>
        </Card>
      </Tabs>
    </div>
  );
}
