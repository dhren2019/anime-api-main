"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import Image from "next/image";

export function DragonBallDocs() {
  return (
    <div>
      <div className="flex items-center space-x-4 mb-6">
        <div className="w-16 h-16 relative">
          <Image 
            src="/dragonball.svg" 
            alt="DragonBall API" 
            width={64} 
            height={64} 
            className="object-contain"
          />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">DragonBall API</h2>
          <p className="text-gray-300">
            Acceso completo a personajes, transformaciones y planetas del universo DragonBall
          </p>
        </div>
      </div>

      <div className="space-y-8">        <Card className="p-6 bg-gray-800 border-0">
          <h3 className="text-xl font-semibold mb-3 text-white">Descripción General</h3>
          <p className="text-gray-300 mb-4">
            La API de DragonBall proporciona datos completos sobre el universo de DragonBall, incluyendo personajes,
            transformaciones y planetas. Utiliza esta API para integrar datos de DragonBall en tus aplicaciones,
            sitios web o juegos.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-gray-900 p-4 rounded-md text-center">
              <div className="text-3xl font-bold text-yellow-400 mb-2">137+</div>
              <div className="text-gray-300">Personajes</div>
            </div>
            <div className="bg-gray-900 p-4 rounded-md text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">50+</div>
              <div className="text-gray-300">Transformaciones</div>
            </div>
            <div className="bg-gray-900 p-4 rounded-md text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">25+</div>
              <div className="text-gray-300">Planetas</div>
            </div>
          </div>
        </Card>        <Card className="p-6 bg-gray-800 border-0">
          <h3 className="text-xl font-semibold mb-3 text-white">Datos de Personajes</h3>
          <p className="text-gray-300 mb-4">
            Los datos de personajes en nuestra API incluyen información detallada sobre cada personaje del universo DragonBall.
          </p>
          
          <div className="bg-gray-900 p-4 rounded-md overflow-x-auto">
            <pre className="text-yellow-400">
{`{
  "id": 1,
  "name": "Goku",
  "race": "Saiyan",
  "gender": "Male",
  "ki": "60,000,000",
  "maxKi": "90 Septillion",
  "affiliation": "Z Fighter",
  "image": "/dragonball-api/characters/goku.png",
  "description": "El protagonista de la serie, conocido por su gran poder y personalidad amigable..."
}`}
            </pre>
          </div>
            <table className="w-full mt-6 text-sm">
            <thead className="text-white">
              <tr>
                <th className="text-left p-2">Campo</th>
                <th className="text-left p-2">Tipo</th>
                <th className="text-left p-2">Descripción</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-t border-gray-700">
                <td className="p-2">id</td>
                <td className="p-2">number</td>
                <td className="p-2">Identificador único para el personaje</td>
              </tr>
              <tr className="border-t border-gray-700">
                <td className="p-2">name</td>
                <td className="p-2">string</td>
                <td className="p-2">Nombre del personaje</td>
              </tr>
              <tr className="border-t border-gray-700">
                <td className="p-2">race</td>
                <td className="p-2">string</td>
                <td className="p-2">Raza del personaje (ej., Saiyan, Human, Namekian)</td>
              </tr>
              <tr className="border-t border-gray-700">
                <td className="p-2">gender</td>
                <td className="p-2">string</td>
                <td className="p-2">Género del personaje</td>
              </tr>
              <tr className="border-t border-gray-700">
                <td className="p-2">ki</td>
                <td className="p-2">string</td>
                <td className="p-2">Nivel de poder base</td>
              </tr>
              <tr className="border-t border-gray-700">
                <td className="p-2">maxKi</td>
                <td className="p-2">string</td>
                <td className="p-2">Nivel máximo de poder alcanzado</td>
              </tr>
              <tr className="border-t border-gray-700">
                <td className="p-2">affiliation</td>
                <td className="p-2">string</td>
                <td className="p-2">Afiliación del grupo (ej., Guerrero Z)</td>
              </tr>
              <tr className="border-t border-gray-700">
                <td className="p-2">image</td>
                <td className="p-2">string</td>
                <td className="p-2">URL de la imagen del personaje</td>
              </tr>
              <tr className="border-t border-gray-700">
                <td className="p-2">description</td>
                <td className="p-2">string</td>
                <td className="p-2">Biografía y descripción del personaje</td>
              </tr>
            </tbody>
          </table>
        </Card>

        <Card className="p-6 bg-gray-800 border-0">
          <h3 className="text-xl font-semibold mb-3 text-white">Datos de Transformaciones</h3>
          <p className="text-gray-300 mb-4">
            Obtén información sobre las diversas transformaciones que experimentan los personajes en la serie.
          </p>
          
          <div className="bg-gray-900 p-4 rounded-md overflow-x-auto">
            <pre className="text-yellow-400">
{`{
  "id": 1,
  "name": "Super Saiyan",
  "ki": "3,000,000,000",
  "image": "/dragonball-api/transformations/goku-ssj.png",
  "characterId": 1
}`}
            </pre>
          </div>
          
          <table className="w-full mt-6 text-sm">
            <thead className="text-gray-400">
              <tr>
                <th className="text-left p-2">Campo</th>
                <th className="text-left p-2">Tipo</th>
                <th className="text-left p-2">Descripción</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-t border-gray-700">
                <td className="p-2">id</td>
                <td className="p-2">number</td>
                <td className="p-2">Identificador único para la transformación</td>
              </tr>
              <tr className="border-t border-gray-700">
                <td className="p-2">name</td>
                <td className="p-2">string</td>
                <td className="p-2">Nombre de la transformación</td>
              </tr>
              <tr className="border-t border-gray-700">
                <td className="p-2">ki</td>
                <td className="p-2">string</td>
                <td className="p-2">Nivel de poder en esta transformación</td>
              </tr>
              <tr className="border-t border-gray-700">
                <td className="p-2">image</td>
                <td className="p-2">string</td>
                <td className="p-2">URL de la imagen de la transformación</td>
              </tr>
              <tr className="border-t border-gray-700">
                <td className="p-2">characterId</td>
                <td className="p-2">number</td>
                <td className="p-2">ID del personaje que logra esta transformación</td>
              </tr>
            </tbody>
          </table>
        </Card>

        <Card className="p-6 bg-gray-800 border-0">
          <h3 className="text-xl font-semibold mb-3 text-white">Datos de Planetas</h3>
          <p className="text-gray-300 mb-4">
            Información sobre planetas en el universo DragonBall.
          </p>
          
          <div className="bg-gray-900 p-4 rounded-md overflow-x-auto">
            <pre className="text-yellow-400">
{`{
  "id": 1,
  "name": "Earth",
  "description": "Home planet of humans and setting for much of the series...",
  "image": "/dragonball-api/planets/earth.png",
  "isDestroyed": false
}`}
            </pre>
          </div>
          
          <table className="w-full mt-6 text-sm">
            <thead className="text-gray-400">
              <tr>
                <th className="text-left p-2">Campo</th>
                <th className="text-left p-2">Tipo</th>
                <th className="text-left p-2">Descripción</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-t border-gray-700">
                <td className="p-2">id</td>
                <td className="p-2">number</td>
                <td className="p-2">Identificador único para el planeta</td>
              </tr>
              <tr className="border-t border-gray-700">
                <td className="p-2">name</td>
                <td className="p-2">string</td>
                <td className="p-2">Nombre del planeta</td>
              </tr>
              <tr className="border-t border-gray-700">
                <td className="p-2">description</td>
                <td className="p-2">string</td>
                <td className="p-2">Descripción e información del planeta</td>
              </tr>
              <tr className="border-t border-gray-700">
                <td className="p-2">image</td>
                <td className="p-2">string</td>
                <td className="p-2">URL de la imagen del planeta</td>
              </tr>
              <tr className="border-t border-gray-700">
                <td className="p-2">isDestroyed</td>
                <td className="p-2">boolean</td>
                <td className="p-2">Si el planeta fue destruido en la serie</td>
              </tr>
            </tbody>
          </table>
        </Card>

        <Card className="p-6 bg-gray-800 border-0">
          <h3 className="text-xl font-semibold mb-3 text-white">Ejemplos de Uso</h3>
          
          <div className="mb-6">
            <h4 className="text-lg font-medium mb-3 text-white">Obtener todos los personajes Saiyan</h4>
            <div className="bg-gray-900 p-4 rounded-md overflow-x-auto">
              <pre className="text-yellow-400">
{`// Petición
GET /api/v1/dragonball/characters?race=Saiyan

// Respuesta
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Goku",
      "race": "Saiyan",
      "gender": "Male",
      ...
    },
    {
      "id": 2,
      "name": "Vegeta",
      "race": "Saiyan",
      "gender": "Male",
      ...
    },
    // Más personajes Saiyan...
  ],
  "meta": {
    "total": 12,
    "page": 1,
    "limit": 20
  }
}`}
              </pre>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-3 text-white">Obtener un personaje específico con transformaciones</h4>
            <div className="bg-gray-900 p-4 rounded-md overflow-x-auto">
              <pre className="text-yellow-400">
{`// Petición
GET /api/v1/dragonball/characters/1

// Respuesta
{
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
    "description": "El protagonista de la serie...",
    "transformations": [
      {
        "id": 1,
        "name": "Super Saiyan",
        "ki": "3,000,000,000",
        "image": "/dragonball-api/transformations/goku-ssj.png"
      },
      {
        "id": 2,
        "name": "Super Saiyan 2",
        "ki": "6,000,000,000",
        "image": "/dragonball-api/transformations/goku-ssj2.png"
      },
      // Más transformaciones...
    ]
  }
}`}
              </pre>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
