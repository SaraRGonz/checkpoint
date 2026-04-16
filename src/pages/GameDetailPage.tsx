import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameDetail } from '../hooks/useGameDetail';
import { useLibrary } from '../hooks/useLibrary';
import { GameDetailHeader } from '../components/game/GameDetailHeader';
import { GameCoverColumn } from '../components/game/GameCoverColumn';
import { GameInfoColumn } from '../components/game/GameInfoColumn';
import { GameNotes } from '../components/game/GameNotes';
import { GameDetailFooter } from '../components/game/GameDetailFooter';
import { Spinner } from '../components/ui/Spinner';
import { Modal, type ModalButton } from '../components/ui/Modal';

export function GameDetailPage() {
    const { 
        game, draft, isEditing, isLoading, 
        toggleEdit, updateDraftField, saveChanges, discardChanges 
    } = useGameDetail();

    const { deleteGame } = useLibrary(); 
    const navigate = useNavigate();      
    
    // Estado para controlar la visibilidad del Modal
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    if (isLoading || !game || !draft) return <div className="p-20 flex justify-center"><Spinner /></div>;

    // función que se ejecuta si se confirma el borrado en el modal
    const handleDeleteConfirm = async () => {
        await deleteGame(game.id);
        setIsDeleteModalOpen(false);
        navigate('/library'); // Redirige a la biblioteca tras borrar
    };

    // configuración de los botones del modal
    const modalButtons: ModalButton[] = [
        { 
            content: 'Cancel', 
            variant: 'secondary', 
            onClick: () => setIsDeleteModalOpen(false) 
        },
        { 
            content: 'Delete', 
            variant: 'danger', 
            onClick: handleDeleteConfirm 
        }
    ];

    return (
        <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
            <GameDetailHeader 
                title={game.title} 
                isEditing={isEditing} 
                onEdit={toggleEdit} 
                onSave={saveChanges} 
                onDiscard={discardChanges} 
                onDelete={() => setIsDeleteModalOpen(true)} 
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

            {/* Inserción del Modal */}
            <Modal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                title="Delete Game"
                footerButtons={modalButtons}
            >
                <div className="space-y-4">
                    <p> <span className="font-bold">CRITICAL:</span> This action cannot be undone.
                        Are you sure you want to delete <span className="font-bold text-white">"{game.title}"</span>?</p>
                    <p className="text-sm text-gray-400">This is a permadeath move. Your data for this game will be erased from this dimension forever.</p>
                </div>
            </Modal>
        </div>
    );
}