import { useGameDetail } from '../hooks/useGameDetail';
import { GameDetailHeader } from '../components/game/GameDetailHeader';
import { GameCoverColumn } from '../components/game/GameCoverColumn';
import { GameInfoColumn } from '../components/game/GameInfoColumn';
import { GameNotes } from '../components/game/GameNotes';
import { GameDetailFooter } from '../components/game/GameDetailFooter';
import { Spinner } from '../components/ui/Spinner';

export function GameDetailPage() {
    const { 
        game, draft, isEditing, isLoading, 
        toggleEdit, updateDraftField, saveChanges, discardChanges 
    } = useGameDetail();

    if (isLoading || !game || !draft) return <div className="p-20 flex justify-center"><Spinner /></div>;

    return (
        <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
            {/* cabecera de la página -> título y botones editar/guardar/descartar*/}
            <GameDetailHeader 
                title={game.title} 
                isEditing={isEditing} 
                onEdit={toggleEdit} 
                onSave={saveChanges} 
                onDiscard={discardChanges} 
            />

            {/* grid principal con columna de portada info y notas */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                
                <div className="lg:col-span-3">
                    <GameCoverColumn draft={draft} isEditing={isEditing} updateDraftField={updateDraftField} />
                </div>

                <div className="lg:col-span-4 h-full">
                    <GameInfoColumn draft={draft} isEditing={isEditing} updateDraftField={updateDraftField} />
                </div>

                <div className="lg:col-span-5 h-full">
                    <GameNotes 
                        notes={draft.review || ''} 
                        onChange={(n) => updateDraftField('review', n)}
                        isEditing={isEditing}
                    />
                </div>
                
            </div>

            {/* pie de página con metadatos de fechas y rawgid */}
            <GameDetailFooter addedAt={game.addedAt} updatedAt={game.updatedAt} rawgId={game.rawgId} />
        </div>
    );
}