import type { Game } from '../../types/game';
import { EditIcon } from '../ui/Icons';

interface GameCoverColumnProps {
    draft: Game;
    isEditing: boolean;
    onOpenImageModal: () => void; 
}

export function GameCoverColumn({ draft, isEditing, onOpenImageModal }: GameCoverColumnProps) {
    return (
        <div className="relative group flex flex-col justify-center h-full bg-gray-900/40 p-4 rounded-2xl border border-gray-800">
            <div className="relative rounded-2xl overflow-hidden border-2 border-gray-800 shadow-2xl aspect-3/4 group">
                <img 
                    src={draft.coverUrl} 
                    alt={draft.title} 
                    className="w-full h-full object-cover" 
                    style={{ objectPosition: draft.coverPosition || '50% 50%' }} 
                />
                
                {/* Botón de lápiz superpuesto*/}
                {isEditing && (
                    <button 
                        onClick={onOpenImageModal}
                        // Quitamos opacity-0. El fondo semitransparente se queda fijo y oscurece más al hover
                        className="absolute inset-0 bg-black/40 flex items-center justify-center transition-colors duration-300 cursor-pointer"
                    >
                        <div className="bg-primary p-3 rounded-full shadow-lg transform transition-transform duration-200 group-hover:scale-110">
                            <EditIcon className="w-6 h-6 text-background" />
                        </div>
                    </button>
                )}
            </div>
        </div>
    );
}