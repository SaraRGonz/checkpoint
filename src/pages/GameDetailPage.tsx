import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameDetail } from '../hooks/useGameDetail';
import { useLibrary } from '../hooks/useLibrary';
import { GameDetailHeader } from '../components/game/GameDetailHeader';
import { GameCoverColumn } from '../components/game/GameCoverColumn';
import { GameInfoColumn } from '../components/game/GameInfoColumn';
import { GameNotes } from '../components/game/GameNotes';
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
    
    // estados para la imagen
    const [tempImageUrl, setTempImageUrl] = useState('');
    const [tempCoverPosition, setTempCoverPosition] = useState('50% 50%'); 
    const [imageError, setImageError] = useState<string | null>(null);

    // sincronizar URL temporal cuando se abre el modal
    useEffect(() => {
        if (draft) {
            // si la imagen actual es el placeholder o contiene la ruta mostramos el input vacío
            const isPlaceholder = draft.coverUrl === placeholderImg || draft.coverUrl.includes('placeholder');
            setTempImageUrl(isPlaceholder ? '' : draft.coverUrl);
            setTempCoverPosition(draft.coverPosition || '50% 50%');
            setImageError(null); // resetea errores al abrir
        }
    }, [isImageModalOpen, draft]);

    if (isLoading || !game || !draft) return <div className="p-20 flex justify-center"><Spinner /></div>;

    // función que se ejecuta si se confirma el borrado en el modal
    const handleDeleteConfirm = async () => {
        await deleteGame(game.id);
        setIsDeleteModalOpen(false);
        navigate('/library'); // redirige a la biblioteca tras borrar
    };

    const handleSaveImage = () => {
        const finalUrl = tempImageUrl.trim();

        // si el usuario deja el campo vacío, asigna el placeholder automáticamente
        if (finalUrl === '') {
            updateDraftField('coverUrl', placeholderImg);
            setIsImageModalOpen(false);
            return;
        }

        // validación estricta de formato URL
        try {
            const url = new URL(finalUrl);
            if (url.protocol !== 'http:' && url.protocol !== 'https:') {
                throw new Error('Invalid protocol');
            }
            
            // si todo está bien guarda la nueva URL
            updateDraftField('coverUrl', finalUrl);
            updateDraftField('coverPosition', tempCoverPosition); 
            setImageError(null);
            setIsImageModalOpen(false);
        } catch (_) {
            // bloquea el guardado y muestra el error
            setImageError('Please enter a valid link for the image (e.g., https://...)');
        }
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
                onBack={() => navigate(-1)}
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
                        {imageError && (
                            <p className="text-danger text-xs font-bold mt-1 animate-in fade-in zoom-in duration-200">
                                {imageError}
                            </p>
                        )}
                    </div>
                    <div className="pt-2">
                        <p className="text-[10px] uppercase text-gray-600 font-bold mb-3 tracking-[0.2em] text-center">Preview</p>
                        <div className="w-32 mx-auto aspect-3/4 rounded-xl overflow-hidden border-2 border-gray-700 shadow-2xl bg-gray-950">
                            <img 
                                // pone el placeholder en la preview si el input está vacío, si no intenta cargar la URL
                                src={tempImageUrl.trim() === '' ? placeholderImg : tempImageUrl} 
                                alt="Preview" 
                                className="w-full h-full object-cover" 
                                style={{ objectPosition: tempCoverPosition }}
                                // si la URL tiene formato válido pero la imagen está rota, carga el placeholder visualmente
                                onError={(e) => (e.currentTarget.src = placeholderImg)} 
                            />
                        </div>
                        {/* CONTROLES DE RECORTE (PAN & TILT) */}
                        {tempImageUrl.trim() !== '' && (
                            <div className="mt-6 space-y-4">
                                {/* Extraemos los valores actuales de "X% Y%" para usarlos en ambas barras */}
                                {(() => {
                                    const [x, y] = tempCoverPosition.split(' ');
                                    const currentX = parseInt(x || '50');
                                    const currentY = parseInt(y || '50');

                                    return (
                                        <>
                                            {/* Slider Horizontal (Para imágenes de RAWG / 16:9) */}
                                            <div>
                                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex justify-between">
                                                    <span>Horizontal Pan</span>
                                                    <span>{currentX}%</span>
                                                </label>
                                                <input 
                                                    type="range" min="0" max="100" 
                                                    value={currentX}
                                                    onChange={(e) => setTempCoverPosition(`${e.target.value}% ${currentY}%`)}
                                                    className="w-full mt-2 accent-primary"
                                                />
                                            </div>

                                            {/* Slider Vertical (Para carátulas originales altas) */}
                                            <div>
                                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex justify-between">
                                                    <span>Vertical Pan</span>
                                                    <span>{currentY}%</span>
                                                </label>
                                                <input 
                                                    type="range" min="0" max="100" 
                                                    value={currentY}
                                                    onChange={(e) => setTempCoverPosition(`${currentX}% ${e.target.value}%`)}
                                                    className="w-full mt-2 accent-primary"
                                                />
                                            </div>
                                        </>
                                    );
                                })()}
                            </div>
                        )}
                    </div>
                </div>
            </Modal>
        </div>
    );
}