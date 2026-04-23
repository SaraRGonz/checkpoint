import { useState } from 'react';
import { DndContext, DragOverlay, closestCorners, PointerSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import type { DragStartEvent, DragEndEvent } from '@dnd-kit/core';
import { STATUS_LIST } from '../../utils/constants';
import { KanbanColumn } from './KanbanColumn';
import { KanbanItem } from './KanbanItem';
import { GameCard } from './GameCard';
import { useLibrary } from '../../hooks/useLibrary';
import type { Game, GameStatus } from '../../types/game';

interface Props {
    games: Game[];
}

export function KanbanBoard({ games }: Props) {
    const { updateGame } = useLibrary();
    const [activeId, setActiveId] = useState<string | null>(null);

    // sensores con distancia que permiten hacer "clic" para entrar al juego y requieren arrastrar 5px para mover la tarjeta
    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
        useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 5 } })
    );

    const handleDragStart = (event: DragStartEvent) => {
        setActiveId(event.active.id as string);
    };

    const handleDragEnd = async (event: DragEndEvent) => {
        setActiveId(null);
        const { active, over } = event;
        if (!over) return;

        const gameId = active.id as string;
        const newStatus = over.id as GameStatus;
        const game = games.find(g => g.id === gameId);
        
        // si se suelta en una columna distinta lanza la actualización a la base de datos
        if (game && game.status !== newStatus) {
            await updateGame(gameId, { status: newStatus });
        }
    };

    // quita la  wishlist del tablero kanban
    const columns = STATUS_LIST.filter(s => s.value !== 'Wishlist');
    const activeGame = activeId ? games.find(g => g.id === activeId) : null;

    return (
        <DndContext sensors={sensors} collisionDetection={closestCorners} onDragStart={handleDragStart} onDragEnd={handleDragEnd} onDragCancel={() => setActiveId(null)}>
            {/* scroll horizontal automático si no cabe en pantallas pequeñas */}
            <div className="flex gap-6 overflow-x-auto pb-6 snap-x w-full">
                {columns.map(col => {
                    const columnGames = games.filter(g => g.status === col.value);
                    return (
                        <div key={col.value} className="w-68 shrink-0 snap-center">
                            <KanbanColumn status={col.value} label={col.label} count={columnGames.length}>
                                {columnGames.map(game => (
                                    <KanbanItem key={game.id} game={game} />
                                ))}
                            </KanbanColumn>
                        </div>
                    );
                })}
            </div>

            {/* efecto visual al arrastrar que rota un poco la gamecard */}
            <DragOverlay>
                {activeGame ? (
                    <div className="cursor-grabbing rotate-2 shadow-2xl opacity-90">
                        <GameCard game={activeGame} hideBadge={true} disableLink={true} compact={true} />
                    </div>
                ) : null}
            </DragOverlay>
        </DndContext>
    );
}