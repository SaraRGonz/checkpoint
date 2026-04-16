import type { Game } from '../../types/game';

interface GameCoverColumnProps {
    draft: Game;
    isEditing: boolean;
    updateDraftField: (field: keyof Game, value: any) => void;
}

export function GameCoverColumn({ draft, isEditing, updateDraftField }: GameCoverColumnProps) {
    return (
        <div className="flex flex-col h-full space-y-4 bg-gray-900/40 p-4 rounded-2xl border border-gray-800">
            <div className="rounded-2xl overflow-hidden border-2 border-gray-800 shadow-2xl">
                <img src={draft.coverUrl} alt={draft.title} className="w-full aspect-3/4 object-cover" />
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
    );
}