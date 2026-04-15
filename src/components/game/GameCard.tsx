import type { Game } from '../../types/game'; 
import { Badge } from '../ui/Badge';
import { StarRating } from '../game/StarRating';
import { Link } from 'react-router-dom'; 

interface GameCardProps {
    game: Game; // se indica que va a recibir un objeto con forma de 'Game'
    showDetails?: boolean; // opcional para ocultar los detalles cuando se esté buscando un juego
}

export function GameCard({ game, showDetails = true }: GameCardProps) {
    return (
        <Link 
            to={`/game/${game.id}`} // lleva a la ruta del GameDetailPage dle juego en concreto
            className="block border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all hover:border-primary/50 group bg-gray-900/20"
        >
            {/* carátula */}
            <img src={game.coverUrl} 
                    alt={game.title} 
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" 
                />
            
            <div className="p-4">
                {/* título */}
                <h3 className="font-bold text-lg mb-2 text-text group-hover:text-primary transition-colors">
                    {game.title}
                </h3>

                {/* badges y estrellas (solo se renderizan si showDetails es true) */}
                {showDetails && (
                    <div className="flex justify-between items-center mt-auto pt-4">
                        {/* badge */}
                        {/* pasa el texto de la plataforma (ej: "PS5") como 'children' */}
                        <Badge variant="default">
                            {game.platform}
                        </Badge>

                        {/* starRating */}
                        {/* pasa el número de la puntuación (ej: 4) a la prop 'rating' */}
                        <StarRating rating={game.rating || 0} />
                    </div>
                )}
            </div>
        </Link>
    );
}