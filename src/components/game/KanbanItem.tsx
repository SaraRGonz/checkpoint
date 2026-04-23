import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { useNavigate } from 'react-router-dom';
import { GameCard } from './GameCard';
import type { Game } from '../../types/game';

interface Props {
    game: Game;
}

export function KanbanItem({ game }: Props) {
    const navigate = useNavigate();
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id: game.id,
        data: { game }
    });

    const style = {
        transform: CSS.Translate.toString(transform),
        // oculta la carta original mientras se arrastra y DragOverlay la enseña
        opacity: isDragging ? 0 : 1, 
    };

    return (
        <div 
            ref={setNodeRef} 
            style={style} 
            {...listeners} 
            {...attributes} 
            className="touch-none outline-none cursor-grab active:cursor-grabbing"
        >
            <GameCard 
                game={game} 
                hideBadge={true} 
                disableLink={true} 
                compact={true}
                onClick={() => navigate(`/game/${game.id}`)} 
            />
        </div>
    );
}