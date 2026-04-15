import { useGameDetail } from '../hooks/useGameDetail';
import { StatusSelector } from '../components/game/StatusSelector';
import { StarRating } from '../components/game/StarRating';
import { GameNotes } from '../components/game/GameNotes';
import { GameDetailHeader } from '../components/game/GameDetailHeader';
import { EditableInfoRow } from '../components/game/EditableInfoRow';
import { Spinner } from '../components/ui/Spinner';
import { PLATFORM_LIST } from '../utils/constants';
import { formatDate } from '../utils/formatters';

export function GameDetailPage() {
    const { 
        game, draft, isEditing, isLoading, 
        toggleEdit, updateDraftField, saveChanges, discardChanges 
    } = useGameDetail();

    if (isLoading || !game || !draft) return <div className="p-20 flex justify-center"><Spinner /></div>;

    return (
        <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
            <GameDetailHeader 
                title={game.title} 
                isEditing={isEditing} 
                onEdit={toggleEdit} 
                onSave={saveChanges} 
                onDiscard={discardChanges} 
            />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                {/* COLUMNA PORTADA */}
                <div className="lg:col-span-3">
                    <div className="flex flex-col h-full space-y-4 bg-gray-900/40 rounded-2xl border border-gray-800">
                        <div className="rounded-2xl overflow-hidden border-2 border-gray-800 shadow-2xl">
                            <img src={draft.coverUrl} alt={game.title} className="w-full aspect-3/4 object-cover" />
                        </div>
                        {isEditing && (
                            <input 
                                type="text"
                                value={draft.coverUrl}
                                onChange={(e) => updateDraftField('coverUrl', e.target.value)}
                                className="w-full bg-gray-950 border border-primary p-2 text-[10px] rounded text-gray-300 outline-none"
                                placeholder="Image URL..."
                            />
                        )}
                    </div>
                </div>

                {/* COLUMNA INFO */}
                <div className="lg:col-span-4 h-full">
                    <div className="h-full bg-gray-900/40 p-6 rounded-2xl border border-gray-800 space-y-6">
                        <div className="space-y-4">
                            <EditableInfoRow label="Platform" isEditing={isEditing} valueDisplay={draft.platform}>
                                <select 
                                    value={draft.platform}
                                    onChange={(e) => updateDraftField('platform', e.target.value)}
                                    className="bg-gray-800 text-white text-sm p-1 rounded border border-primary w-full outline-none"
                                >
                                    {PLATFORM_LIST.map(p => <option key={p} value={p}>{p}</option>)}
                                </select>
                            </EditableInfoRow>

                            <EditableInfoRow label="Genres" isEditing={isEditing} valueDisplay={draft.genres?.join(', ')}>
                                <input 
                                    type="text"
                                    value={draft.genres?.join(', ') || ''}
                                    onChange={(e) => updateDraftField('genres', e.target.value.split(',').map(s => s.trim()))}
                                    className="bg-gray-800 text-white text-sm p-1 rounded border border-primary w-full outline-none"
                                />
                            </EditableInfoRow>
                            
                            <EditableInfoRow label="Release Year" isEditing={isEditing} valueDisplay={draft.releaseYear}>
                                <input 
                                    type="number"
                                    value={draft.releaseYear || ''}
                                    onChange={(e) => updateDraftField('releaseYear', parseInt(e.target.value))}
                                    className="bg-gray-800 text-white text-sm p-1 rounded border border-primary w-full outline-none"
                                />
                            </EditableInfoRow>
                        </div>

                        <div className="pt-4 border-t border-gray-800 space-y-4">
                            <StatusSelector 
                                value={draft.status} 
                                onChange={(s) => updateDraftField('status', s)} 
                                disabled={!isEditing}
                            />
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-400">Rating</label>
                                <StarRating 
                                    rating={draft.rating || 0} 
                                    onChange={(r) => updateDraftField('rating', r)}
                                    disabled={!isEditing}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* COLUMNA NOTAS */}
                <div className="lg:col-span-5 h-full">
                    <GameNotes 
                        notes={draft.review || ''} 
                        onChange={(n) => updateDraftField('review', n)}
                        isEditing={isEditing}
                    />
                </div>
            </div>

            <footer className="pt-8 border-t border-gray-800 flex flex-wrap gap-6 text-[10px] text-gray-500 uppercase tracking-widest font-bold">
                <div>Added: <span className="text-gray-400">{formatDate(game.addedAt)}</span></div>
                {game.updatedAt && <div>Updated: <span className="text-gray-400">{formatDate(game.updatedAt)}</span></div>}
                {game.rawgId && <div className="ml-auto opacity-50 italic font-normal text-xs tracking-normal">REF: RAWG-{game.rawgId}</div>}
            </footer>
        </div>
    );
}