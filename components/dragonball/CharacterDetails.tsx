import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

interface CharacterDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  character: {
    name: string;
    image: string;
    ki: string;
    maxKi: string;
    race: string;
    gender: string;
    affiliation: string;
    description: string;
  };
}

export function CharacterDetails({ isOpen, onClose, character }: CharacterDetailsProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-900 text-white max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{character.name}</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="relative aspect-[3/4] w-full">
            <img
              src={character.image}
              alt={character.name}
              className="object-contain w-full h-full rounded-lg"
            />
          </div>
          <div className="space-y-4 overflow-y-auto">
            <div className="bg-gray-800 p-4 rounded-lg">
              <h3 className="text-xl font-semibold text-yellow-500">Character Info</h3>
              <div className="mt-2 space-y-2">
                <p>Race: <span className="text-yellow-400">{character.race}</span></p>
                <p>Gender: <span className="text-yellow-400">{character.gender}</span></p>
                <p>Base KI: <span className="text-green-400">{character.ki}</span></p>
                <p>Max KI: <span className="text-blue-400">{character.maxKi}</span></p>
                <p>Affiliation: <span className="text-purple-400">{character.affiliation}</span></p>
              </div>
            </div>
            {character.description && (
              <div className="bg-gray-800 p-4 rounded-lg">
                <h3 className="text-xl font-semibold text-yellow-500">Description</h3>
                <div className="mt-2 text-gray-300 max-h-[50vh] overflow-y-auto pr-2">{character.description}</div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
