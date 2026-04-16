import { useNavigate } from 'react-router-dom';
import { useLibrary } from '../hooks/useLibrary';
import { useFilters } from '../hooks/useFilters';
import type { SortOption } from '../hooks/useFilters';
import { GameCard } from '../components/game/GameCard';
import { SearchInput } from '../components/ui/SearchInput';
import { EmptyState } from '../components/ui/EmptyState';
import { Button } from '../components/ui/Button';
import { ActionMenu } from '../components/ui/ActionMenu/ActionMenu';
import { STATUS_LIST, PLATFORM_LIST } from '../utils/constants';

export function LibraryPage() {
    const { games } = useLibrary();
    const navigate = useNavigate();

    const {
        filteredGames,
        availableGenres,
        searchQuery, setSearchQuery,
        sortOption, setSortOption,
        statusFilter, setStatusFilter,
        genreFilter, setGenreFilter,
        platformFilter, setPlatformFilter,
        ratingFilter, setRatingFilter,
        clearFilters, hasActiveFilters
    } = useFilters(games);

    const sortLabels: Record<SortOption, string> = {
        'added-desc': 'Recently Added',
        'updated-desc': 'Recently Updated',
        'title-asc': 'Alphabetical (A-Z)',
        'title-desc': 'Alphabetical (Z-A)'
    };

    if (games.length === 0) {
        return (
            <EmptyState
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

                {/* 2. Búsqueda - Aseguramos que el contenedor no limite el ancho */}
                <div className="w-full">
                    <SearchInput 
                        value={searchQuery} 
                        onChange={setSearchQuery} 
                        placeholder="Search in library..." 
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

                {/* 5. Filtros Desplegables - Todos con el mismo ancho */}
                <div className="flex flex-col gap-4">
                    {/* Status */}
                    <div className="flex flex-col gap-1.5 w-full">
                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Status</label>
                        <ActionMenu value={statusFilter} onSelect={setStatusFilter}>
                            <ActionMenu.Button>
                                {statusFilter === 'all' ? 'All' : statusFilter}
                            </ActionMenu.Button>
                            <ActionMenu.Overlay>
                                <ActionMenu.Item value="all">All</ActionMenu.Item>
                                {STATUS_LIST.filter(s => s.value !== 'Wishlist').map(s => (
                                    <ActionMenu.Item key={s.value} value={s.value}>{s.label}</ActionMenu.Item>
                                ))}
                            </ActionMenu.Overlay>
                        </ActionMenu>
                    </div>

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

                    {/* Rating */}
                    <div className="flex flex-col gap-1.5 w-full">
                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Rating</label>
                        <ActionMenu value={ratingFilter} onSelect={setRatingFilter} position="top">
                            <ActionMenu.Button>
                                {ratingFilter === 'all' ? 'All' : `${ratingFilter} Stars`}
                            </ActionMenu.Button>
                            <ActionMenu.Overlay>
                                <ActionMenu.Item value="all">All</ActionMenu.Item>
                                {[5, 4, 3, 2, 1].map(stars => (
                                    <ActionMenu.Item key={stars} value={stars.toString()}>{stars} Stars</ActionMenu.Item>
                                ))}
                            </ActionMenu.Overlay>
                        </ActionMenu>
                    </div>
                </div>

            </aside>

            {/* grid */}
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
                            <GameCard key={game.id} game={game} />
                        ))}
                    </div>
                )}
            </main>

        </div>
    );
}