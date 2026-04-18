import { useState, useEffect } from 'react';
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
import placeholderImg from '../assets/placeholder.jpg';

export function GameDetailPage() {
    const { 
        game, draft, isEditing, isLoading, 
        toggleEdit, updateDraftField, saveChanges, discardChanges 
    } = useGameDetail();

    const { deleteGame } = useLibrary(); 
    const navigate = useNavigate();      
    
    // estado de modales
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);
    const [tempImageUrl, setTempImageUrl] = useState('');

    // sincronizar URL temporal cuando se abre el modal
    useEffect(() => {
        if (draft) setTempImageUrl(draft.coverUrl);
    }, [isImageModalOpen, draft]);

    if (isLoading || !game || !draft) return <div className="p-20 flex justify-center"><Spinner /></div>;

    // función que se ejecuta si se confirma el borrado en el modal
    const handleDeleteConfirm = async () => {
        await deleteGame(game.id);
        setIsDeleteModalOpen(false);
        navigate('/library'); // redirige a la biblioteca tras borrar
    };

    const handleSaveImage = () => {
        updateDraftField('coverUrl', tempImageUrl);
        setIsImageModalOpen(false);
    };

    // configuración de los botones del modal
    const deleteModalButtons: ModalButton[] = [
        { content: 'Cancel', variant: 'secondary', onClick: () => setIsDeleteModalOpen(false) },
        { content: 'Delete', variant: 'danger', onClick: handleDeleteConfirm }
    ];

    const imageModalButtons: ModalButton[] = [
        { content: 'Cancel', variant: 'secondary', onClick: () => setIsImageModalOpen(false) },
        { content: 'Update Image', variant: 'primary', onClick: handleSaveImage }
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
                    <GameCoverColumn 
                        draft={draft} 
                        isEditing={isEditing} 
                        onOpenImageModal={() => setIsImageModalOpen(true)} 
                    />
                </div>

                <div className="lg:col-span-4">
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

            {/* modal para borrar juego */}
            <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} title="Delete Game" footerButtons={deleteModalButtons}>
                <div className="space-y-4">
                    <p>Are you sure you want to banish <span className="font-bold text-white">"{game.title}" </span>from your library?</p>
                    <p className="text-sm text-gray-400">Permadeath is on: this action cannot be undone.</p>
                </div>
            </Modal>

            {/* modal para cambiar la imagen */}
            <Modal isOpen={isImageModalOpen} onClose={() => setIsImageModalOpen(false)} title="Change Cover Image" footerButtons={imageModalButtons}>
                <div className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Image URL</label>
                        <input 
                            type="text"
                            value={tempImageUrl}
                            onChange={(e) => setTempImageUrl(e.target.value)}
                            className="w-full bg-gray-950 border border-gray-700 p-3 rounded-lg text-sm text-gray-200 focus:border-primary outline-none transition-all"
                            placeholder="https://..."
                        />
                    </div>
                    <div className="pt-2">
                        <p className="text-[10px] uppercase text-gray-600 font-bold mb-3 tracking-[0.2em] text-center">Preview</p>
                        <div className="w-32 mx-auto aspect-3/4 rounded-xl overflow-hidden border-2 border-gray-700 shadow-2xl bg-gray-950">
                            <img 
                                src={tempImageUrl} 
                                alt="Preview" 
                                className="w-full h-full object-cover" 
                                onError={(e) => (e.currentTarget.src = placeholderImg)} 
                            />                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
}