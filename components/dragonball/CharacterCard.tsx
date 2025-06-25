import { Card } from "@/components/ui/card";

interface CharacterCardProps {
  name: string;
  image: string;
  race: string;
  gender: string;
  ki: string;
  maxKi: string;
  affiliation: string;
}

export function CharacterCard({
  name,
  image,
  race,
  gender,
  ki,
  maxKi,
  affiliation
}: CharacterCardProps) {
  return (
    <Card className="p-4 border-0 bg-gray-900 text-white hover:bg-gray-800 transition">
      <div className="relative aspect-[3/4] mb-4">
        <img
          src={image}
          alt={name}
          className="object-contain w-full h-full"
        />
      </div>
      <div className="mt-2">
        <h3 className="font-semibold text-xl">{name}</h3>
        <p className="text-sm text-yellow-500">{race} - {gender}</p>
        <div className="mt-2 space-y-1">
          <p className="text-sm">Base KI: <span className="text-green-400">{ki}</span></p>
          <p className="text-sm">Max KI: <span className="text-blue-400">{maxKi}</span></p>
          <p className="text-sm">Affiliation: <span className="text-purple-400">{affiliation}</span></p>
        </div>
      </div>
    </Card>
  );
}
