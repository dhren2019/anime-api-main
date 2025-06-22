import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import Image from "next/image";

interface Anime {
  id: number;
  title: string;
  type?: string;
  episodes?: number;
  status?: string;
  animeSeason?: string;
  picture?: string;
  thumbnail?: string;
  sources?: string[];
  synonyms?: string[];
  relations?: string[];
  tags?: string[];
}

interface AnimeDetailsProps {
  anime: Anime | null;
  isOpen: boolean;
  onClose: () => void;
}

export function AnimeDetails({ anime, isOpen, onClose }: AnimeDetailsProps) {
  if (!anime) return null;

  const animeSeason = anime.animeSeason ? 
    typeof anime.animeSeason === 'string' ? 
      anime.animeSeason : 
      JSON.stringify(anime.animeSeason) : null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-900 p-0">
        <DialogHeader className="sticky top-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur supports-[backdrop-filter]:bg-white/75 z-10 p-6 pb-4 mb-4 border-b">
          <DialogTitle className="text-2xl font-bold line-clamp-2">{anime.title}</DialogTitle>
        </DialogHeader>
        
        <div className="p-6 pt-0 grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8">
          <div className="space-y-6">
            <div className="aspect-[3/4] relative rounded-xl overflow-hidden shadow-lg bg-gray-100">
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10" />
              {(anime.picture || anime.thumbnail) ? (
                <img
                  src={anime.picture || anime.thumbnail}
                  alt={anime.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = '/placeholder-anime.jpg';
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-200">
                  <span className="text-gray-400">No image</span>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border dark:border-gray-700">
              <div className="col-span-2">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Estado</h3>
                <p className="mt-1 font-semibold">{anime.status || "N/A"}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Tipo</h3>
                <p className="mt-1 font-semibold">{anime.type || "N/A"}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Episodios</h3>
                <p className="mt-1 font-semibold">{anime.episodes || "N/A"}</p>
              </div>
              {animeSeason && (
                <div className="col-span-2">
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Temporada</h3>
                  <p className="mt-1 font-semibold">{animeSeason}</p>
                </div>
              )}
            </div>
          </div>
          
          <div className="space-y-6">
            {anime.synonyms && anime.synonyms.length > 0 && (
              <section className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Títulos alternativos
                </h3>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl border dark:border-gray-700">
                  <div className="flex flex-wrap gap-2">
                    {anime.synonyms.map((synonym, index) => (
                      <span 
                        key={index} 
                        className="inline-flex px-3 py-1 bg-white dark:bg-gray-700 rounded-full text-sm shadow-sm border dark:border-gray-600"
                      >
                        {synonym}
                      </span>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {anime.tags && anime.tags.length > 0 && (
              <section className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Géneros
                </h3>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl border dark:border-gray-700">
                  <div className="flex flex-wrap gap-2">
                    {anime.tags.map((tag, index) => (
                      <span 
                        key={index} 
                        className="inline-flex px-3 py-1 bg-blue-50 dark:bg-blue-900 border border-blue-100 dark:border-blue-800 text-blue-700 dark:text-blue-100 rounded-full text-sm font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {anime.relations && anime.relations.length > 0 && (
              <section className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Series relacionadas
                </h3>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl border dark:border-gray-700">
                  <div className="max-h-[200px] overflow-y-auto pr-2 space-y-2 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
                    {anime.relations.map((relation, index) => (
                      <div 
                        key={index}
                        className="p-3 bg-white dark:bg-gray-700 rounded-lg text-sm border dark:border-gray-600"
                      >
                        {relation}
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {anime.sources && anime.sources.length > 0 && (
              <section className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Fuentes
                </h3>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl border dark:border-gray-700">
                  <div className="max-h-[200px] overflow-y-auto pr-2 space-y-2 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
                    {anime.sources.map((source, index) => (
                      <a
                        key={index}
                        href={source}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block p-3 bg-white dark:bg-gray-700 rounded-lg text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/50 transition-colors border dark:border-gray-600 truncate"
                      >
                        {source}
                      </a>
                    ))}
                  </div>
                </div>
              </section>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
