import { EditableInfoRow } from './EditableInfoRow';
import { StatusSelector } from './StatusSelector';
import { StarRating } from './StarRating';
import { PLATFORM_LIST } from '../../utils/constants';
import type { Game } from '../../types/game';

interface GameInfoColumnProps {
    draft: Game;
    isEditing: boolean;
    updateDraftField: (field: keyof Game, value: any) => void;
}

export function GameInfoColumn({ draft, isEditing, updateDraftField }: GameInfoColumnProps) {
    return (
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
    );
}