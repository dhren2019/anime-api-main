import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

interface TransformationDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  transformation: {
    name: string;
    image: string;
    ki: string;
    characterId: number;
  };
}

export function TransformationDetails({ isOpen, onClose, transformation }: TransformationDetailsProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-900 text-white max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{transformation.name}</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="relative aspect-[3/4] w-full">
            <img
              src={transformation.image}
              alt={transformation.name}
              className="object-contain w-full h-full rounded-lg"
            />
          </div>
          <div className="space-y-4 overflow-y-auto">
            <div className="bg-gray-800 p-4 rounded-lg">
              <h3 className="text-xl font-semibold text-yellow-500">Información de Transformación</h3>
              <div className="mt-2 space-y-2">
                <p>Nivel de Poder: <span className="text-blue-400">{transformation.ki}</span></p>
                <p>ID del Personaje: <span className="text-purple-400">#{transformation.characterId}</span></p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
