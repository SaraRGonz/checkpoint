import { useState, useEffect } from 'react';
import { Modal, type ModalButton } from '../ui/Modal';
import { ActionMenu } from '../ui/ActionMenu/ActionMenu';
import { STATUS_LIST } from '../../utils/constants';
import { RAWG_PLATFORMS } from '../../utils/rawgConstants';
import type { Game, GameStatus } from '../../types/game';

interface AddGameFromRawgModalProps {
    isOpen: boolean;
    onClose: () => void;
    game: Game | null;
    initialPlatformId: string; // recibe el ID ('4', '187') puesto en el filtro
    initialStatus: GameStatus;
    onSave: (gameData: Omit<Game, 'id'>, navigateToDetails: boolean) => Promise<void>;
}

export function AddGameFromRawgModal({ isOpen, onClose, game, initialPlatformId, initialStatus, onSave }: AddGameFromRawgModalProps) {
    // convierte el ID del filtro ('4') a su nombre real ('PC') para guardarlo en la DB
    const initialPlatformLabel = initialPlatformId 
        ? RAWG_PLATFORMS.find(p => p.id === initialPlatformId)?.label || ''
        : '';

    const [platform, setPlatform] = useState(initialPlatformLabel);
    const [status, setStatus] = useState<GameStatus>(initialStatus);

    // resetea el modal cada vez que se abre con un juego nuevo
    useEffect(() => {
        if (isOpen) {
            setPlatform(initialPlatformLabel);
            setStatus(initialStatus);
        }
    }, [isOpen, initialPlatformLabel, initialStatus]);

    if (!game) return null;

    const isWishlistFlow = initialStatus === 'Wishlist';

    const filteredStatusList = STATUS_LIST.filter(s => 
        isWishlistFlow ? s.value === 'Wishlist' : s.value !== 'Wishlist'
    );

    const handleSave = (navigateToDetails: boolean) => {
        onSave({
            ...game,
            platform: platform || undefined,
            status: status,
        }, navigateToDetails);
    };

    const targetReturnRoute = status === 'Wishlist' ? 'Wishlist' : 'Library';

    const footerButtons: ModalButton[] = [
        { 
            content: `Save & Return to ${targetReturnRoute}`, 
            variant: 'secondary', 
            onClick: () => handleSave(false) 
        },
        { 
            content: 'Save & View Details', 
            variant: 'primary', 
            onClick: () => handleSave(true) 
        }
    ];

    return (
        <Modal 
            isOpen={isOpen} 
            onClose={onClose} 
            title="Configure Game" 
            footerButtons={footerButtons}
            closeIconClassName="text-gray-400 hover:text-danger transition-colors" 
        >
            <div className="space-y-6">
                <div className="flex gap-4 items-center mb-6">
                    <img src={game.coverUrl} alt="Cover" className="w-16 h-24 object-cover rounded shadow-md border border-gray-700" />
                    <div>
                        <h3 className="font-bold text-white leading-tight">{game.title}</h3>
                        <p className="text-xs text-gray-500 mt-1">{game.releaseYear || 'Unknown Year'}</p>
                    </div>
                </div>

                {/* SELECTOR DE PLATAFORMA */}
                <div className="flex flex-col gap-1.5 w-full">
                    <label className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">Platform</label>
                    <ActionMenu value={platform} onSelect={setPlatform}>
                        <ActionMenu.Button>{platform || 'Select Platform'}</ActionMenu.Button>
                        <ActionMenu.Overlay>
                            <ActionMenu.Search />
                            <ActionMenu.Item value="">Not specified</ActionMenu.Item>
                            {RAWG_PLATFORMS.map(p => (
                                <ActionMenu.Item key={p.id} value={p.label}>{p.label}</ActionMenu.Item>
                            ))}
                        </ActionMenu.Overlay>
                    </ActionMenu>
                </div>

                {/* SELECTOR DE STATUS */}
                {!isWishlistFlow && (
                    <div className="flex flex-col gap-1.5 w-full">
                        <label className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">Status</label>
                        <ActionMenu value={status} onSelect={(val) => setStatus(val as GameStatus)}>
                            <ActionMenu.Button>{status}</ActionMenu.Button>
                            <ActionMenu.Overlay>
                                {filteredStatusList.map(s => (
                                    <ActionMenu.Item key={s.value} value={s.value}>{s.label}</ActionMenu.Item>
                                ))}
                            </ActionMenu.Overlay>
                        </ActionMenu>
                    </div>
                )}
            </div>
        </Modal>
    );
}