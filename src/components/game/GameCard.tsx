import type { Game } from '../../types/game'; 
import { Badge } from '../ui/Badge';
import { Link } from 'react-router-dom'; 

interface GameCardProps {
    game: Game; // se indica que va a recibir un objeto con forma de 'Game'
    showDetails?: boolean; // opcional para ocultar los detalles cuando se esté buscando un juego
    hideBadge?: boolean;
}

export function GameCard({ game, showDetails = true, hideBadge = false }: GameCardProps) {

    // limitar los géneros y poner ... si hay más de dos
    const MAX_GENRES = 2;
    let displayGenres = '';

    if (game.genres && game.genres.length > 0) {
        const visibleGenres = game.genres.slice(0, MAX_GENRES);
        displayGenres = visibleGenres.join(', ');
        if (game.genres.length > MAX_GENRES) {
            displayGenres += '...';
        }
    }

    return (
        <Link 
            to={`/game/${game.id}`} // lleva a la ruta del GameDetailPage dle juego en concreto
            className="flex flex-col bg-gray-900 border border-gray-800 rounded-xl overflow-hidden hover:border-primary hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 group h-full"
        >

            {/* carátula con aspect ratio fijo 3:4*/}
            <div className="relative aspect-3/4 overflow-hidden bg-gray-950">
                <img 
                    src={game.coverUrl} 
                    alt={game.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                />
                {/* gradiente para que la imagen se mezcle con la tarjeta */}
                <div className="absolute inset-0 bg-linear-to-t from-gray-900 via-transparent to-transparent opacity-80" />
            </div>


            {/* informacion del juego */}
            <div className="flex flex-col grow p-5 gap-1.5">
                {/* título siempre visible y cortado si es muy largo */}
                <h3 className="text-lg font-bold text-gray-100 leading-tight truncate" title={game.title}>
                    {game.title}
                </h3>

                {/* géneros solo si showDetails es true */}
                {showDetails && (
                    <p className="text-sm text-gray-400 truncate" title={game.genres?.join(', ')}>
                        {displayGenres}
                    </p>
                )}

                {/* pie de tarjeta con plataforma y estado */}
                {showDetails && (
                    <div className="flex justify-between items-center mt-auto pt-3 border-t border-gray-800/50">
                        {/* plataforma */}
                        <span className="text-xs font-bold text-gray-500 uppercase tracking-widest truncate max-w-[55%]">
                            {game.platform}
                        </span>
                        
                        {/* badge estado */}
                        {!hideBadge && (
                            <Badge variant={game.status}>
                                {game.status}
                            </Badge>
                        )}
                    </div>
                )}
            </div>
        </Link>
    );
}