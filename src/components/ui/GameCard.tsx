import type { Game } from '../../types/game'; 
import { Badge } from '../ui/Badge';
import { StarRating } from '../ui/StarRating';

interface GameCardProps {
    game: Game; // se indica que va a recibir un objeto con forma de 'Game'
}

export function GameCard({ game }: GameCardProps) {
    return (
        <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            {/* Carátula */}
            <img src={game.coverUrl} alt={game.title} className="w-full h-48 object-cover" />
            
            <div className="p-4">
                {/* Título */}
                <h3 className="font-bold text-lg mb-2">{game.title}</h3>
                
                {/* Badges y Estrellas */}
                <div className="flex justify-between items-center mt-4">
                    {/* Badge */}
                    {/* pasa el texto de la plataforma (ej: "PS5") como 'children' */}
                    <Badge variant="default">
                        {game.platform}
                    </Badge>

                    {/* StarRating */}
                    {/* pasa el número de la puntuación (ej: 4) a la prop 'rating' */}
                    <StarRating rating={game.rating} />
                </div>
            </div>
        </div>
    );
}