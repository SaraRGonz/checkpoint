import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLibrary } from '../hooks/useLibrary';
import { searchGamesInRawg } from '../api/games';
import { SearchInput } from '../components/ui/SearchInput';
import { GameCard } from '../components/game/GameCard';
import { Spinner } from '../components/ui/Spinner';
import { EmptyState } from '../components/ui/EmptyState';
import { Button } from '../components/ui/Button';
import { ActionMenu } from '../components/ui/ActionMenu/ActionMenu';
import { RAWG_PLATFORMS, RAWG_GENRES } from '../utils/rawgConstants';
import type { Game, GameStatus } from '../types/game';
import { PlusIcon, HeartIcon, SearchIcon } from '../components/ui/Icons';
import placeholderImg from '../assets/placeholder.jpg';
import { AddGameFromRawgModal } from '../components/game/AddGameFromRawgModal';

// generar últimos 50 años dinámicamente
const currentYear = new Date().getFullYear();
const YEARS = Array.from({ length: 50 }, (_, i) => (currentYear - i).toString());

export function SearchPage() {
    const navigate = useNavigate();
    const { addGame } = useLibrary();

    // estados de búsqueda
    const [query, setQuery] = useState('');
    const [platform, setPlatform] = useState('');
    const [genre, setGenre] = useState('');
    const [year, setYear] = useState('');

    const [selectedGame, setSelectedGame] = useState<Game | null>(null);
    const [modalStatus, setModalStatus] = useState<GameStatus>('Queue');

    const [results, setResults] = useState<Game[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [hasSearched, setHasSearched] = useState(false);

    // helpers para obtener el nombre a mostrar en el botón basándose en el id
    const selectedPlatformLabel = platform ? RAWG_PLATFORMS.find(p => p.id === platform)?.label : 'Any platform';
    const selectedGenreLabel = genre ? RAWG_GENRES.find(g => g.slug === genre)?.label : 'Any genre';

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!query.trim()) return;

        try {
            setIsLoading(true);
            setError(null);
            setHasSearched(true);
            
            // pasa los filtros a la función
            const data = await searchGamesInRawg(query, {
                platform: platform || undefined,
                genre: genre || undefined,
                year: year || undefined
            });
            
            const mappedResults: Game[] = data.results.map((rawg) => ({
                id: `rawg-${rawg.rawgId}`,
                rawgId: rawg.rawgId,
                title: rawg.title,
                coverUrl: rawg.coverUrl || placeholderImg,
                platform: undefined, 
                status: 'Wishlist', 
                releaseYear: rawg.releaseYear,
                genres: rawg.genres,
                rating: 0
            }));

            setResults(mappedResults);
        } catch (err: any) {
            setError(err.message || "¡Glitch in the system! We couldn't fetch those games.");
            setResults([]);
        } finally {
            setIsLoading(false);
        }
    };

    // abre el modal con la configuración inicial
    const openConfigureModal = (game: Game, targetStatus: GameStatus) => {
        setSelectedGame(game);
        setModalStatus(targetStatus);
    };

    // función que ejecuta el modal al confirmar
    const handleConfirmSave = async (gameData: Omit<Game, 'id'>, navigateToDetails: boolean) => {
        try {
            setIsSaving(true);
            const newGameId = await addGame(gameData);
            
            setSelectedGame(null); // Cierra el modal
            
            if (navigateToDetails) {
                navigate(`/game/${newGameId}`);
            } else {
                // Navegación dinámica según el status final seleccionado
                if (gameData.status === 'Wishlist') navigate('/wishlist');
                else navigate('/library');
            }
        } catch (err: any) {
            alert(err.message || 'Error saving the game. Try again.');
        } finally {
            setIsSaving(false);
        }
    };

    // función para limpiar la vista
    const resetSearch = () => {
        setQuery('');
        setPlatform('');
        setGenre('');
        setYear('');
        setHasSearched(false);
        setResults([]);
    };

    return (
        <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
            
            {/* CABECERA Y BUSCADOR */}
            <header className="bg-gray-900/40 p-6 md:p-8 rounded-2xl border border-gray-800 shadow-2xl flex flex-col gap-6">
                <div>
                    <h1 className="text-4xl font-black uppercase tracking-tighter text-primary mb-2">
                        RADAR SEARCH
                    </h1>
                    <p className="text-sm text-gray-200 font-medium">
                        Connect to the RAWG database. Calibrate your sensors and scan for new additions.
                    </p>
                </div>

                <form onSubmit={handleSearch} className="space-y-4">
                    {/* Buscador principal */}
                    <div className="flex flex-col md:flex-row gap-3">
                        <div className="grow text-text">
                            <SearchInput 
                                value={query} 
                                onChange={setQuery} 
                                placeholder="Type a game title (e.g. Cyberpunk 2077)..." 
                            />
                        </div>
                        <Button type="submit" variant="primary" disabled={isLoading || isSaving} className="h-12 px-8">
                            Search games
                        </Button>
                    </div>

                    {/* Filtros avanzados */}
                    <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-gray-800/50">
                        <span className="text-[10px] font-bold text-text uppercase tracking-widest mr-2">Filters:</span>
                        
                        <div className="w-48">
                            <ActionMenu value={platform} onSelect={setPlatform}>
                                <ActionMenu.Button>{selectedPlatformLabel}</ActionMenu.Button>
                                <ActionMenu.Overlay>
                                    <ActionMenu.Search />
                                    <ActionMenu.Item value="">Any platform</ActionMenu.Item>
                                    {RAWG_PLATFORMS.map(p => (
                                        <ActionMenu.Item key={p.id} value={p.id}>{p.label}</ActionMenu.Item>
                                    ))}
                                </ActionMenu.Overlay>
                            </ActionMenu>
                        </div>

                        <div className="w-48">
                            <ActionMenu value={genre} onSelect={setGenre}>
                                <ActionMenu.Button>{selectedGenreLabel}</ActionMenu.Button>
                                <ActionMenu.Overlay>
                                    <ActionMenu.Search />
                                    <ActionMenu.Item value="">Any genre</ActionMenu.Item>
                                    {RAWG_GENRES.map(g => (
                                        <ActionMenu.Item key={g.slug} value={g.slug}>{g.label}</ActionMenu.Item>
                                    ))}
                                </ActionMenu.Overlay>
                            </ActionMenu>
                        </div>

                        <div className="w-32">
                            <ActionMenu value={year} onSelect={setYear}>
                                <ActionMenu.Button>{year || 'Any year'}</ActionMenu.Button>
                                <ActionMenu.Overlay>
                                    <ActionMenu.Search />
                                    <ActionMenu.Item value="">Any year</ActionMenu.Item>
                                    {YEARS.map(y => (
                                        <ActionMenu.Item key={y} value={y}>{y}</ActionMenu.Item>
                                    ))}
                                </ActionMenu.Overlay>
                            </ActionMenu>
                        </div>
                    </div>
                </form>
            </header>

            {/* ESTADOS DE RED */}
            {error && (
                <div className="bg-danger/10 border border-danger p-4 rounded-xl text-danger text-sm font-bold text-center">
                    {error}
                </div>
            )}

            {(isLoading || isSaving) && (
                <div className="flex flex-col items-center justify-center py-24 gap-4">
                    <Spinner />
                    <p className="text-primary font-bold animate-pulse text-sm uppercase tracking-widest">
                        {isSaving ? 'Extracting to Database...' : 'Deep Scanning RAWG Network...'}
                    </p>
                </div>
            )}

            {/* RESULTADOS O EMPTYSTATES */}
            {!isLoading && !isSaving && !error && (
                <>
                    {hasSearched && results.length === 0 && (
                        <EmptyState 
                            variant="clean"
                            title="Signal Lost"
                            message={`No matches found for your query. Try adjusting the filters.`}
                            onClick={resetSearch}
                            clickText="Reset Radar"
                            onSecondaryClick={() => navigate('/library/add')}
                        />
                    )}

                    {!hasSearched && (
                        <EmptyState 
                            variant="clean"
                            title="Awaiting coordinates..."
                            message="Use the search bar and filters above to query millions of games from the RAWG API."
                            onSecondaryClick={() => navigate('/library/add')}
                            secondaryClickText="Can't find your game? Add game manually"
                            icon={ <SearchIcon className="w-16 h-16 text-primary" strokeWidth="1.5" /> }
                        />
                    )}

                    {results.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
                            {results.map(game => (
                                <div key={game.id} className="flex flex-col gap-3 h-full bg-gray-900/40 p-3 rounded-2xl border border-gray-800 shadow-xl group hover:border-gray-700 transition-colors">
                                    <div className="flex-1">
                                        <GameCard game={game} showDetails={false} disableLink={true} />
                                    </div>
    
                                    <div className="flex gap-2 items-stretch mt-auto opacity-90 group-hover:opacity-100 transition-opacity">
                                        <Button variant="primary" onClick={() => openConfigureModal(game, 'Queue')} className="flex-1 h-full px-2">
                                            <div className="flex items-center justify-center gap-1.5 text-xs py-1 h-full font-bold">
                                                <PlusIcon className="w-4 h-4 shrink-0" />
                                                <span>Library</span> 
                                            </div>
                                        </Button>

                                        <Button variant="secondary" onClick={() => openConfigureModal(game, 'Wishlist')} className="flex-1 h-full px-2">
                                            <div className="flex items-center justify-center gap-1.5 text-xs text-text py-1 h-full font-bold">
                                                <HeartIcon className="w-4 h-4 shrink-0" />
                                                <span>Wishlist</span>
                                            </div>
                                        </Button>
                                    </div>

                                </div>
                            ))}
                        </div>
                    )}
                </>
            )}
            {/* Modal de Configuración */}
            <AddGameFromRawgModal 
                isOpen={!!selectedGame}
                onClose={() => setSelectedGame(null)}
                game={selectedGame}
                initialPlatformId={platform}
                initialStatus={modalStatus}
                onSave={handleConfirmSave}
            />
        </div>
    ); // <-- Este es el final de la función SearchPage
}