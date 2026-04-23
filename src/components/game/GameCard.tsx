import type { Game } from '../../types/game'; 
import { Badge } from '../ui/Badge';
import { Link } from 'react-router-dom'; 

interface GameCardProps {
    game: Game; // se indica que va a recibir un objeto con forma de 'Game'
    showDetails?: boolean; // opcional para ocultar los detalles cuando se está buscando un juego
    hideBadge?: boolean;
    disableLink?: boolean; // para desactivar la navegación en search page
    onClick?: () => void;
    compact?: boolean
}

export function GameCard({ 
    game, 
    showDetails = true, 
    hideBadge = false, 
    disableLink = false,
    onClick,
    compact = false
}: GameCardProps) {

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

    // guarda las clases CSS del contenedor para no repetirlas 
    const hoverEffects = disableLink 
            ? (onClick ? "cursor-pointer hover:border-primary transition-colors" : "") 
            : "hover:border-primary hover:shadow-xl hover:shadow-primary/5 group";

const containerClasses = `flex ${compact ? 'flex-row h-20' : 'flex-col h-full'} 
        bg-gray-900 border border-gray-800 rounded-xl overflow-hidden transition-all duration-300 ${hoverEffects}`;    

    const cardContent = compact ? (
        <>
            {/* THUMBNAIL HORIZONTAL */}
            <div className="w-14 sm:w-16 shrink-0 relative bg-gray-950 overflow-hidden">
                <img 
                    src={game.coverUrl} 
                    alt={game.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    style={{ objectPosition: game.coverPosition || '50% 50%' }}
                    loading="lazy"
                />
            </div>
            {/* INFO COMPACTA */}
            <div className="flex flex-col grow justify-center p-3 gap-1 overflow-hidden">
                <h3 className="text-sm font-bold text-gray-100 leading-tight truncate" title={game.title}>
                    {game.title}
                </h3>
                {showDetails && (
                    <div className="flex items-center justify-between gap-2 mt-0.5">
                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest truncate">
                            {game.platform || 'Not specified'}
                        </span>
                        {!hideBadge && (
                            <div className="scale-[0.8] origin-right">
                                <Badge variant={game.status}>{game.status}</Badge>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </>
    ) : (
        <>
            {/* carátula con aspect ratio fijo 3:4*/}
            <div className="relative aspect-3/4 overflow-hidden bg-gray-950">
                <img 
                    src={game.coverUrl} 
                    alt={game.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    style={{ objectPosition: game.coverPosition || '50% 50%' }} 
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
                        <span className="text-xs font-bold text-gray-300 uppercase tracking-widest truncate max-w-[55%]">
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
        </>
    );

    // renderizado condicional por si es un enlace o un simple div
    if (disableLink) {
        return (
            <div className={containerClasses} onClick={onClick} role={onClick ? "button" : undefined}>
                {cardContent}
            </div>
        );
    }

    return (
        <Link 
            to={`/game/${game.id}`} // lleva a la ruta del GameDetailPage del juego en concreto
            className={containerClasses}
        >
            {cardContent}
        </Link>
    );
}