import { useState } from 'react'; // Necesitamos el estado para el Modal
import { useNavigate } from 'react-router-dom';
import { useLibrary } from '../hooks/useLibrary';
import { useFilters } from '../hooks/useFilters';
import type { SortOption } from '../hooks/useFilters';
import { GameCard } from '../components/game/GameCard';
import { SearchInput } from '../components/ui/SearchInput';
import { EmptyState } from '../components/ui/EmptyState';
import { Button } from '../components/ui/Button';
import { ActionMenu } from '../components/ui/ActionMenu/ActionMenu';
import { Modal, type ModalButton } from '../components/ui/Modal'; 
import { PLATFORM_LIST } from '../utils/constants';
import type { Game } from '../types/game';
import { TrashIcon, SearchIcon, PlusIcon } from '../components/ui/Icons';
import { Spinner } from '../components/ui/Spinner';

export function WishlistPage() {
    const { games, updateGame, deleteGame, isLoading } = useLibrary();
    const navigate = useNavigate();

    // estado para borrado que guarda el objeto del juego que se quiere borrar
    const [gameToDelete, setGameToDelete] = useState<Game | null>(null);

    // filtra la colección global para quedarse solo con la Wishlist
    const wishlistGames = games.filter(g => g.status === 'Wishlist');

    // le pasa solo los juegos de la wishlist al motor de filtros
    const {
        filteredGames,
        availableGenres,
        searchQuery, setSearchQuery,
        sortOption, setSortOption,
        genreFilter, setGenreFilter,
        platformFilter, setPlatformFilter,
        clearFilters, hasActiveFilters
    } = useFilters(wishlistGames);

    const sortLabels: Record<SortOption, string> = {
        'added-desc': 'Recently added',
        'updated-desc': 'Recently updated',
        'title-asc': 'Alphabetical (A-Z)',
        'title-desc': 'Alphabetical (Z-A)'
    };

    // funciones para los botones de acción de cada tarjeta
    const handleMoveToLibrary = async (id: string) => {
        // al añadir a la biblioteca desde la wishlist por defecto se manda al Queue
        await updateGame(id, { status: 'Queue' });
    };

    const handleDeleteConfirm = async () => {
        if (gameToDelete) {
            await deleteGame(gameToDelete.id);
            setGameToDelete(null); // limpia el estado
        }
    };

    // CONFIGURACIÓN DE BOTONES DEL MODAL
    const modalButtons: ModalButton[] = [
        { 
            content: 'Cancel', 
            variant: 'secondary', 
            onClick: () => setGameToDelete(null) 
        },
        { 
            content: 'Remove', 
            variant: 'danger', 
            onClick: handleDeleteConfirm 
        }
    ];

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[50vh]">
                <Spinner />
            </div>
        );
    }

    // si no hay ningún juego en la wishlist
    if (wishlistGames.length === 0) {
        return (
            <EmptyState
                title="Your wishlist is empty"
                message="Discover new adventures and add them here to keep track of what you want to play next!"
                clickText="Discover games"
                onClick={() => navigate('/search')}
                onSecondaryClick={() => navigate('/library/add')}
                secondaryClickText="Add game manually"
            />
        );
    }

    return (
        <div className="flex flex-col lg:flex-row gap-8 items-start">
            
            {/* SIDEBAR */}
            <aside className="w-full lg:w-64 shrink-0 flex flex-col gap-6">
                
                {/* botones de acción */}
                <div className="flex flex-col gap-3">
                    <Button variant="primary" onClick={() => navigate('/search')}>
                        <span className="flex items-center justify-center gap-2">
                            <SearchIcon className="w-5 h-5" />
                            Add game with RAWG
                        </span>
                    </Button>
                    <Button variant="secondary" onClick={() => navigate('/library/add')}>
                        <span className="flex items-center justify-center gap-2">
                            <PlusIcon className="w-5 h-5" />
                            Add game manually
                        </span>
                    </Button>
                </div>

                {/* búsqueda en la wishlist */}
                <div className="w-full">
                    <SearchInput 
                        value={searchQuery} 
                        onChange={setSearchQuery} 
                        placeholder="Search in wishlist..." 
                    />
                </div>

                {/* order by */}
                <div className="flex flex-col gap-1.5 w-full">
                    <label className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">Order by</label>
                    <ActionMenu value={sortOption} onSelect={(val) => setSortOption(val as SortOption)}>
                        <ActionMenu.Button>{sortLabels[sortOption]}</ActionMenu.Button>
                        <ActionMenu.Overlay>
                            <ActionMenu.Item value="added-desc">Recently added</ActionMenu.Item>
                            <ActionMenu.Item value="updated-desc">Recently updated</ActionMenu.Item>
                            <ActionMenu.Item value="title-asc">Alphabetical (A-Z)</ActionMenu.Item>
                            <ActionMenu.Item value="title-desc">Alphabetical (Z-A)</ActionMenu.Item>
                        </ActionMenu.Overlay>
                    </ActionMenu>
                </div>

                <hr className="border-gray-800" />

                {/* título filters */}
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-black text-primary uppercase tracking-tighter">Filters</h2>
                    {hasActiveFilters && (
                        <button onClick={clearFilters} className="text-[10px] font-bold text-gray-300 hover:text-white uppercase transition-colors">
                            Reset
                        </button>
                    )}
                </div>

                {/* filtros desplegables */}
                <div className="flex flex-col gap-4">
                    {/* genre */}
                    <div className="flex flex-col gap-1.5 w-full">
                        <label className="text-[10px] font-bold text-gray-300 uppercase tracking-wider">Genre</label>
                        <ActionMenu value={genreFilter} onSelect={setGenreFilter}>
                            <ActionMenu.Button>
                                {genreFilter === 'all' ? 'All' : genreFilter}
                            </ActionMenu.Button>
                            <ActionMenu.Overlay>
                                <ActionMenu.Item value="all">All</ActionMenu.Item>
                                {availableGenres.length === 0 ? (
                                    <div className="px-4 py-3 text-xs text-gray-300 italic text-center">Genres not found</div>
                                ) : (
                                    availableGenres.map(g => (
                                        <ActionMenu.Item key={g} value={g}>{g}</ActionMenu.Item>
                                    ))
                                )}
                            </ActionMenu.Overlay>
                        </ActionMenu>
                    </div>

                    {/* platform */}
                    <div className="flex flex-col gap-1.5 w-full">
                        <label className="text-[10px] font-bold text-gray-300 uppercase tracking-wider">Platform</label>
                        <ActionMenu value={platformFilter} onSelect={setPlatformFilter} position="top">
                            <ActionMenu.Button>
                                {platformFilter === 'all' ? 'All' : platformFilter}
                            </ActionMenu.Button>
                            <ActionMenu.Overlay>
                                <ActionMenu.Item value="all">All</ActionMenu.Item>
                                {PLATFORM_LIST.map(p => (
                                    <ActionMenu.Item key={p} value={p}>{p}</ActionMenu.Item>
                                ))}
                            </ActionMenu.Overlay>
                        </ActionMenu>
                    </div>
                </div>

            </aside>

            {/* GRID */}
            <main className="flex-1 w-full">
                {filteredGames.length === 0 ? (
                    /* emptystate de filtros sin coincidencias en deseados */
                    <EmptyState 
                        title="Mission Failed"
                        message="No items found with these filters. Keep scouting!"
                        onClick={clearFilters}
                        clickText="Respawn Filters"
                    />
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 animate-in fade-in duration-500">
                        {filteredGames.map(game => (
                            <div key={game.id} className="flex flex-col gap-3 h-full">
                                {/* tarjeta sin detalles solo con cover y título */}
                                <div className="flex-1">
                                    <GameCard game={game} hideBadge={true} />
                                </div>
                                
                                {/* botones de acción debajo de la tarjeta */}
                                <div className="flex gap-2">
                                    <div className="flex-1">
                                        <Button variant="primary" onClick={() => handleMoveToLibrary(game.id)}>
                                            <div className="flex items-center justify-center gap-2 text-xs">
                                                <PlusIcon className="w-5 h-5" />
                                                Add to Library
                                            </div>
                                        </Button>
                                    </div>
                                    <div>
                                        <Button variant="danger" onClick={() => setGameToDelete(game)}>
                                        <div className="flex items-center justify-center">
                                            <TrashIcon className="w-4 h-4" />
                                        </div>
                                    </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
            {/* MODAL DE CONFIRMACIÓN PARA BPRRAR */}
            <Modal
                isOpen={gameToDelete !== null}
                onClose={() => setGameToDelete(null)}
                title="Remove from Wishlist"
                footerButtons={modalButtons}
            >
                <div className="space-y-4">
                    <p>Discard <span className="font-bold text-white">"{gameToDelete?.title}"</span> from your loot list?</p>
                    <p className="text-sm text-gray-400">No worries! You can always find this legendary item again using the search radar.</p>
                </div>
            </Modal>

        </div>
    );
}