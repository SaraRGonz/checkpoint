import type { Game } from '../../types/game';

interface GameCoverColumnProps {
    draft: Game;
    isEditing: boolean;
    onOpenImageModal: () => void; 
}

export function GameCoverColumn({ draft, isEditing, onOpenImageModal }: GameCoverColumnProps) {
    return (
        <div className="relative group flex flex-col justify-center h-full bg-gray-900/40 p-4 rounded-2xl border border-gray-800">
            <div className="relative rounded-2xl overflow-hidden border-2 border-gray-800 shadow-2xl aspect-3/4">
                <img 
                    src={draft.coverUrl} 
                    alt={draft.title} 
                    className="w-full h-full object-cover" 
                />
                
                {/* Botón de lápiz superpuesto */}
                {isEditing && (
                    <button 
                        onClick={onOpenImageModal}
                        className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                    >
                        <div className="bg-primary p-3 rounded-full shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                            <svg className="w-6 h-6 text-background" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                <path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                        </div>
                    </button>
                )}
            </div>
        </div>
    );
}