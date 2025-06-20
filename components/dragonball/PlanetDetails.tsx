import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

interface PlanetDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  planet: {
    name: string;
    image: string;
    description: string;
    isDestroyed: boolean;
  };
}

export function PlanetDetails({ isOpen, onClose, planet }: PlanetDetailsProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-900 text-white max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{planet.name}</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="relative aspect-[3/4] w-full">
            <img
              src={planet.image}
              alt={planet.name}
              className="object-contain w-full h-full rounded-lg"
            />
          </div>
          <div className="space-y-4">
            <div className="bg-gray-800 p-4 rounded-lg">
              <h3 className="text-xl font-semibold text-yellow-500">Planet Info</h3>
              <div className="mt-2 space-y-2">
                {planet.isDestroyed && (
                  <p className="text-red-500 font-semibold">Status: Destroyed</p>
                )}
                <p className="text-gray-300">{planet.description}</p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
