import { Link } from 'react-router-dom';
import type { Game } from '../../types/game';

interface HomeGameItemProps {
  game: Game;
}

export function HomeGameItem({ game }: HomeGameItemProps) {
  return (
    // group/item crea un scope local de hover y así los elementos internos reaccionan si pasamos el cursor por la tarjeta
    <Link
      to={`/game/${game.id}`}
      className="relative h-40 rounded-2xl overflow-hidden border border-gray-800 shadow-xl group/item"
    >
      {/* imagen de fondo */}
      {/* con group-hover/item:scale-110 hace la imagen se amplía un poco al hacer hover*/}
      <img
        src={game.coverUrl}
        alt={game.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover/item:scale-110"
      />

      {/* overlay gradiente */}
      <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent" />

      {/* contenido */}
      {/* usa truncate para añadir '...' con CSS si el nombre del juego es demasiado largo */}
      <div className="absolute bottom-0 left-0 p-4 w-full">
        <h3 className="text-text font-bold truncate text-lg uppercase tracking-tight">
          {game.title}
        </h3>
      </div>
    </Link>
  );
}