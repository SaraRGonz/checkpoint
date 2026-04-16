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

export function WishlistPage() {
    const { games, updateGame, deleteGame } = useLibrary();
    const navigate = useNavigate();

    // ESTADO PARA EL BORRADO: Guardamos el objeto del juego que se quiere borrar
    const [gameToDelete, setGameToDelete] = useState<Game | null>(null);

    // 1. Filtramos primero la colección global para quedarnos solo con la Wishlist
    const wishlistGames = games.filter(g => g.status === 'Wishlist');

    // 2. Le pasamos solo los juegos de la wishlist a nuestro motor de filtros
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
        'added-desc': 'Recently Added',
        'updated-desc': 'Recently Updated',
        'title-asc': 'Alphabetical (A-Z)',
        'title-desc': 'Alphabetical (Z-A)'
    };

    // Funciones para los botones de acción de cada tarjeta
    const handleMoveToLibrary = async (id: string) => {
        // Al añadir a la biblioteca desde la wishlist, por defecto lo mandamos al "Backlog"
        await updateGame(id, { status: 'Backlog' });
    };

    const handleDeleteConfirm = async () => {
        if (gameToDelete) {
            await deleteGame(gameToDelete.id);
            setGameToDelete(null); // Limpiamos el estado
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

    // Si no hay ningún juego en la wishlist
    if (wishlistGames.length === 0) {
        return (
            <EmptyState
                title="Your wishlist is empty"
                message="Discover new adventures and add them here to keep track of what you want to play next!"
                clickText="Discover Games"
                onClick={() => navigate('/search')}
            />
        );
    }

    return (
        <div className="flex flex-col lg:flex-row gap-8 items-start">
            
            {/* --- SIDEBAR --- */}
            <aside className="w-full lg:w-64 shrink-0 flex flex-col gap-6">
                
                {/* 1. Botones de Acción */}
                <div className="flex flex-col gap-3">
                    <Button variant="primary" onClick={() => navigate('/search')}>
                        <span className="flex items-center justify-center gap-2">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            Add game with RAWG
                        </span>
                    </Button>
                    <Button variant="secondary" onClick={() => navigate('/library/add')}>
                        <span className="flex items-center justify-center gap-2">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                            </svg>
                            Add Manual Game
                        </span>
                    </Button>
                </div>

                {/* 2. Búsqueda exclusiva para Wishlist */}
                <div className="w-full">
                    <SearchInput 
                        value={searchQuery} 
                        onChange={setSearchQuery} 
                        placeholder="Search in wishlist..." 
                    />
                </div>

                {/* 3. Order By */}
                <div className="flex flex-col gap-1.5 w-full">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Order by</label>
                    <ActionMenu value={sortOption} onSelect={(val) => setSortOption(val as SortOption)}>
                        <ActionMenu.Button>{sortLabels[sortOption]}</ActionMenu.Button>
                        <ActionMenu.Overlay>
                            <ActionMenu.Item value="added-desc">Recently Added</ActionMenu.Item>
                            <ActionMenu.Item value="updated-desc">Recently Updated</ActionMenu.Item>
                            <ActionMenu.Item value="title-asc">Alphabetical (A-Z)</ActionMenu.Item>
                            <ActionMenu.Item value="title-desc">Alphabetical (Z-A)</ActionMenu.Item>
                        </ActionMenu.Overlay>
                    </ActionMenu>
                </div>

                <hr className="border-gray-800" />

                {/* 4. Título Filters */}
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-black text-primary uppercase tracking-tighter">Filters</h2>
                    {hasActiveFilters && (
                        <button onClick={clearFilters} className="text-[10px] font-bold text-gray-500 hover:text-white uppercase transition-colors">
                            Reset
                        </button>
                    )}
                </div>

                {/* 5. Filtros Desplegables (Solo Genre y Platform) */}
                <div className="flex flex-col gap-4">
                    {/* Genre */}
                    <div className="flex flex-col gap-1.5 w-full">
                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Genre</label>
                        <ActionMenu value={genreFilter} onSelect={setGenreFilter}>
                            <ActionMenu.Button>
                                {genreFilter === 'all' ? 'All' : genreFilter}
                            </ActionMenu.Button>
                            <ActionMenu.Overlay>
                                <ActionMenu.Item value="all">All</ActionMenu.Item>
                                {availableGenres.length === 0 ? (
                                    <div className="px-4 py-3 text-xs text-gray-500 italic text-center">Genres not found</div>
                                ) : (
                                    availableGenres.map(g => (
                                        <ActionMenu.Item key={g} value={g}>{g}</ActionMenu.Item>
                                    ))
                                )}
                            </ActionMenu.Overlay>
                        </ActionMenu>
                    </div>

                    {/* Platform */}
                    <div className="flex flex-col gap-1.5 w-full">
                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Platform</label>
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

            {/* --- GRID --- */}
            <main className="flex-1 w-full">
                {filteredGames.length === 0 ? (
                    <div className="flex flex-col items-center justify-center p-12 text-center bg-gray-900/30 rounded-2xl border-2 border-dashed border-gray-800 min-h-100">
                        <p className="text-gray-500 font-medium">Mission Failed</p>
                        <p className="text-gray-500 font-medium">It seems no game survived your selection. Try a different strategy!</p>
                        <button onClick={clearFilters} className="mt-2 text-primary text-sm font-bold hover:underline">Respawn Filters</button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 animate-in fade-in duration-500">
                        {filteredGames.map(game => (
                            <div key={game.id} className="flex flex-col gap-3 h-full">
                                {/* Componente Tarjeta: sin detalles, solo cover y título */}
                                <div className="flex-1">
                                    <GameCard game={game} showDetails={false} />
                                </div>
                                
                                {/* Botones de acción debajo de la tarjeta */}
                                <div className="flex gap-2">
                                    <div className="flex-1">
                                        <Button variant="primary" onClick={() => handleMoveToLibrary(game.id)}>
                                            <div className="flex items-center justify-center gap-2 text-xs">
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                                                </svg>
                                                Add to Library
                                            </div>
                                        </Button>
                                    </div>
                                    <div>
                                        <Button variant="danger" onClick={() => setGameToDelete(game)}>
                                        <div className="flex items-center justify-center">
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </div>
                                    </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
            {/* --- MODAL DE CONFIRMACIÓN --- */}
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