"use client";

import { useState } from "react";
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

interface DragonBallClientProps {
  initialCharacters: Character[];
  initialTransformations: Transformation[];
  initialPlanets: Planet[];
}

export default function DragonBallClient({ 
  initialCharacters, 
  initialTransformations, 
  initialPlanets 
}: DragonBallClientProps) {
  const [characters] = useState<Character[]>(initialCharacters);
  const [transformations] = useState<Transformation[]>(initialTransformations);
  const [planets] = useState<Planet[]>(initialPlanets);
  const [activeTab, setActiveTab] = useState("characters");
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [selectedTransformation, setSelectedTransformation] = useState<Transformation | null>(null);
  const [selectedPlanet, setSelectedPlanet] = useState<Planet | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const renderCharacters = () => {
    if (!characters?.length) {
      return <p className="text-center text-gray-400">No characters found</p>;
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {characters.map((character) => (
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
      return <p className="text-center text-gray-400">No transformations found</p>;
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
      return <p className="text-center text-gray-400">No planets found</p>;
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
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: "url('/dragonball.svg')",
          backgroundSize: "200px",
          backgroundRepeat: "repeat",
        }}
      />
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-4 mb-4">
            <Image
              src="/dragonball.svg"
              alt="Dragon Ball"
              width={60}
              height={60}
              className="animate-spin"
            />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent">
              Dragon Ball API
            </h1>
            <Image
              src="/dragonball.svg"
              alt="Dragon Ball"
              width={60}
              height={60}
              className="animate-spin"
            />
          </div>
          <p className="text-xl text-gray-300">
            Explore the vast universe of Dragon Ball characters, transformations, and planets
          </p>
        </div>

        {/* Navigation Tabs */}
        <Tabs defaultValue="characters" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 mb-8 bg-gray-800 border-0">
            <TabsTrigger 
              value="characters" 
              className="text-white data-[state=active]:bg-orange-500 data-[state=active]:text-white"
            >
              Characters ({characters.length})
            </TabsTrigger>
            <TabsTrigger 
              value="transformations"
              className="text-white data-[state=active]:bg-blue-500 data-[state=active]:text-white"
            >
              Transformations ({transformations.length})
            </TabsTrigger>
            <TabsTrigger 
              value="planets"
              className="text-white data-[state=active]:bg-green-500 data-[state=active]:text-white"
            >
              Planets ({planets.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="characters" className="space-y-4">
            {renderCharacters()}
          </TabsContent>

          <TabsContent value="transformations" className="space-y-4">
            {renderTransformations()}
          </TabsContent>

          <TabsContent value="planets" className="space-y-4">
            {renderPlanets()}
          </TabsContent>
        </Tabs>

        {/* Character Details Modal */}
        {selectedCharacter && (
          <CharacterDetails
            character={selectedCharacter}
            isOpen={isModalOpen}
            onClose={() => {
              setIsModalOpen(false);
              setSelectedCharacter(null);
            }}
          />
        )}

        {/* Transformation Details Modal */}
        {selectedTransformation && (
          <TransformationDetails
            transformation={selectedTransformation}
            isOpen={isModalOpen}
            onClose={() => {
              setIsModalOpen(false);
              setSelectedTransformation(null);
            }}
          />
        )}

        {/* Planet Details Modal */}
        {selectedPlanet && (
          <PlanetDetails
            planet={selectedPlanet}
            isOpen={isModalOpen}
            onClose={() => {
              setIsModalOpen(false);
              setSelectedPlanet(null);
            }}
          />
        )}
      </div>
    </div>
  );
}
