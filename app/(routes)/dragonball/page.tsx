"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { CharacterCard } from "@/components/dragonball/CharacterCard";
import { CharacterDetails } from "@/components/dragonball/CharacterDetails";
import { TransformationDetails } from "@/components/dragonball/TransformationDetails";
import { PlanetDetails } from "@/components/dragonball/PlanetDetails";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";

interface Character {
  id: number;
  name: string;
  image: string;
  ki: string;
  maxki: string;
  race: string;
  gender: string;
  affiliation: string;
  description: string;
}

interface Transformation {
  id: number;
  name: string;
  image: string;
  ki: string;
  characterId: number;
}

interface Planet {
  id: number;
  name: string;
  description: string;
  image: string;
  isDestroyed: boolean;
}

export default function DragonBallPage() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [transformations, setTransformations] = useState<Transformation[]>([]);
  const [planets, setPlanets] = useState<Planet[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("characters");
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [selectedTransformation, setSelectedTransformation] = useState<Transformation | null>(null);
  const [selectedPlanet, setSelectedPlanet] = useState<Planet | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const endpoint = `/api/dragonball/${activeTab}`;
        const response = await fetch(endpoint);
        const data = await response.json();

        if (data.success) {
          switch (activeTab) {
            case "characters":
              setCharacters(data.data || []);
              break;
            case "transformations":
              setTransformations(data.data || []);
              break;
            case "planets":
              setPlanets(data.data || []);
              break;
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [activeTab]);

  const renderCharacters = () => {
    if (!characters?.length) {
      return <p className="text-center text-gray-400">No se encontraron personajes</p>;
    }

    // Lista de personajes a ocultar (desde Gogeta Super Saiyan Blue hasta Gohan Masenko x10)
    const hiddenCharacters = [
      "Gogeta (Super Saiyan Blue)",
      "Vegeta (Super Saiyan Blue Evolved)", 
      "Vegetto (Super Saiyan Blue)",
      "Broly (Full Power)",
      "Gotenks (Galactic Donuts)",
      "Gotenks (Galactic Donuts x10)",
      "Gotenks (Super Saiyan 3)",
      "Gohan (Super Saiyan 3)",
      "Gohan (Masenko)",
      "Gohan (Masenko x10)",
      // Personajes adicionales a ocultar
      "Goku (Spirit Bomb)",
      "Vegeta (Final Flash)",
      "Vegeta (Big Bang Attack)",
      "Goku (Kamehameha)",
      "Gohan (Kamehameha)",
      "Trunks (Burning Attack)",
      "Vegeta (Final Explosion)",
      "Goku (Dragon Fist)",
      "Vegeta (Galick Gun)",
      "Gohan (Father-Son Kamehameha)",
      "Gotenks (Super Ghost Kamikaze Attack)",
      "Vegeta (Super Galick Gun)",
      "Goku (Super Kamehameha)",
      "Gohan (Super Masenko)",
      "Trunks (Super Burning Attack)",
      "Vegeta (Super Final Flash)",
      "Goku (Super Spirit Bomb)",
      "Vegeta (Super Saiyan 4)",
      "Goku (Super Saiyan 4)",
      "Goku (Kamehameha x10)",
      "Vegeta (Final Flash x10)",
      // Personajes adicionales de las imágenes
      "Kefla (Super Saiyan)",
      "Goku (Ultra Instinct)",
      "Vegeta (Ultra Instinct)"
    ];

    // Filtrar personajes para ocultar los especificados
    const filteredCharacters = characters.filter(character => 
      !hiddenCharacters.includes(character.name)
    );

    // Ordenar para que Goku aparezca primero
    const sortedCharacters = filteredCharacters.sort((a, b) => {
      // Si el personaje es "Goku", va primero
      if (a.name === "Goku") return -1;
      if (b.name === "Goku") return 1;
      // Para el resto, mantener el orden original
      return 0;
    });

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {sortedCharacters.map((character) => (
          <div
            key={character.id}
            onClick={() => {
              setSelectedCharacter(character);
              setIsModalOpen(true);
            }}
            className="cursor-pointer"
          >
            <CharacterCard
              name={character.name}
              image={character.image}
              race={character.race}
              gender={character.gender}
              ki={character.ki}
              maxKi={character.maxki}
              affiliation={character.affiliation}
            />
          </div>
        ))}
      </div>
    );
  };

  const renderTransformations = () => {
    if (!transformations?.length) {
      return <p className="text-center text-gray-400">No se encontraron transformaciones</p>;
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {transformations.map((transformation) => (
          <div
            key={transformation.id}
            onClick={() => {
              setSelectedTransformation(transformation);
              setIsModalOpen(true);
            }}
            className="cursor-pointer"
          >
            <Card className="p-4 border-0 bg-gray-900 text-white hover:bg-gray-800 transition">
              <div className="relative aspect-[3/4] mb-4">
                <img
                  src={transformation.image}
                  alt={transformation.name}
                  className="object-contain w-full h-full"
                />
              </div>
              <div className="mt-2">
                <h3 className="font-semibold text-xl">{transformation.name}</h3>
                <p className="text-sm text-blue-400">Power Level: {transformation.ki}</p>
              </div>
            </Card>
          </div>
        ))}
      </div>
    );
  };

  const renderPlanets = () => {
    if (!planets?.length) {
      return <p className="text-center text-gray-400">No se encontraron planetas</p>;
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {planets.map((planet) => (
          <div
            key={planet.id}
            onClick={() => {
              setSelectedPlanet(planet);
              setIsModalOpen(true);
            }}
            className="cursor-pointer"
          >
            <Card className="p-4 border-0 bg-gray-900 text-white hover:bg-gray-800 transition">
              <div className="relative aspect-[3/4] mb-4">
                <img
                  src={planet.image}
                  alt={planet.name}
                  className="object-contain w-full h-full"
                />
              </div>
              <div className="mt-2">
                <h3 className="font-semibold text-xl">{planet.name}</h3>
                <p className="text-sm text-gray-300 line-clamp-2">{planet.description}</p>
                {planet.isDestroyed && (
                  <p className="text-sm text-red-500 mt-1">Destroyed</p>
                )}
              </div>
            </Card>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="container mx-auto ">
      <div className="w-full max-w-sm mx-auto ">
        <Image
          src="/dragonball-img.png"
          alt="Dragon Ball"
          width={400}
          height={200}
          className="w-full object-contain"
        />
      </div>

      <Tabs defaultValue="characters" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-gray-900">
          <TabsTrigger value="characters">Personajes</TabsTrigger>
          <TabsTrigger value="transformations">Transformaciones</TabsTrigger>
          <TabsTrigger value="planets">Planetas</TabsTrigger>
        </TabsList>

        <div className="mt-8">
          <TabsContent value="characters">
            {loading ? (
              <p className="text-center text-gray-400">Cargando personajes...</p>
            ) : (
              renderCharacters()
            )}
          </TabsContent>

          <TabsContent value="transformations">
            {loading ? (
              <p className="text-center text-gray-400">Cargando transformaciones...</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {!transformations?.length ? (
                  <p className="text-center text-gray-400">No se encontraron transformaciones</p>
                ) : (
                  transformations.map((transformation) => (
                    <div
                      key={transformation.id}
                      onClick={() => {
                        setSelectedTransformation(transformation);
                        setIsModalOpen(true);
                      }}
                      className="cursor-pointer"
                    >
                      <Card className="p-4 border-0 bg-gray-900 text-white hover:bg-gray-800 transition">
                        <div className="relative aspect-[3/4] mb-4">
                          <img
                            src={transformation.image}
                            alt={transformation.name}
                            className="object-contain w-full h-full"
                          />
                        </div>
                        <div className="mt-2">
                          <h3 className="font-semibold text-xl">{transformation.name}</h3>
                          <p className="text-sm text-blue-400">Power Level: {transformation.ki}</p>
                        </div>
                      </Card>
                    </div>
                  ))
                )}
              </div>
            )}
          </TabsContent>

          <TabsContent value="planets">
            {loading ? (
              <p className="text-center text-gray-400">Cargando planetas...</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {!planets?.length ? (
                  <p className="text-center text-gray-400">No se encontraron planetas</p>
                ) : (
                  planets.map((planet) => (
                    <div
                      key={planet.id}
                      onClick={() => {
                        setSelectedPlanet(planet);
                        setIsModalOpen(true);
                      }}
                      className="cursor-pointer"
                    >
                      <Card className="p-4 border-0 bg-gray-900 text-white hover:bg-gray-800 transition">
                        <div className="relative aspect-[3/4] mb-4">
                          <img
                            src={planet.image}
                            alt={planet.name}
                            className="object-contain w-full h-full"
                          />
                        </div>
                        <div className="mt-2">
                          <h3 className="font-semibold text-xl">{planet.name}</h3>
                          <p className="text-sm text-gray-300 line-clamp-2">{planet.description}</p>
                          {planet.isDestroyed && (
                            <p className="text-sm text-red-500 mt-1">Destroyed</p>
                          )}
                        </div>
                      </Card>
                    </div>
                  ))
                )}
              </div>
            )}
          </TabsContent>
        </div>
      </Tabs>

      {selectedCharacter && (
        <CharacterDetails
          isOpen={isModalOpen && !!selectedCharacter}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedCharacter(null);
          }}
          character={{
            name: selectedCharacter.name,
            image: selectedCharacter.image,
            ki: selectedCharacter.ki,
            maxki: selectedCharacter.maxki,
            race: selectedCharacter.race,
            gender: selectedCharacter.gender,
            affiliation: selectedCharacter.affiliation,
            description: selectedCharacter.description
          }}
        />
      )}

      {selectedTransformation && (
        <TransformationDetails
          isOpen={isModalOpen && !!selectedTransformation}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedTransformation(null);
          }}
          transformation={{
            name: selectedTransformation.name,
            image: selectedTransformation.image,
            ki: selectedTransformation.ki,
            characterId: selectedTransformation.characterId
          }}
        />
      )}

      {selectedPlanet && (
        <PlanetDetails
          isOpen={isModalOpen && !!selectedPlanet}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedPlanet(null);
          }}
          planet={{
            name: selectedPlanet.name,
            image: selectedPlanet.image,
            description: selectedPlanet.description,
            isDestroyed: selectedPlanet.isDestroyed
          }}
        />
      )}
    </div>
  );
}
