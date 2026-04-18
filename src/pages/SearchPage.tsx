import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLibrary } from '../hooks/useLibrary';
import { searchGamesInRawg } from '../api/games';
import { SearchInput } from '../components/ui/SearchInput';
import { GameCard } from '../components/game/GameCard';
import { Spinner } from '../components/ui/Spinner';
import { EmptyState } from '../components/ui/EmptyState';
import { Button } from '../components/ui/Button';
import type { Game, GameStatus } from '../types/game';

export function SearchPage() {
    const navigate = useNavigate();
    const { addGame } = useLibrary(); // trae la función del contexto

    const [query, setQuery] = useState('');
    const [results, setResults] = useState<Game[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false); // estado para cuando está guardando en la DB
    const [error, setError] = useState<string | null>(null);
    const [hasSearched, setHasSearched] = useState(false);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!query.trim()) return;

        try {
            setIsLoading(true);
            setError(null);
            setHasSearched(true);
            
            const data = await searchGamesInRawg(query);
            
            // mapea los resultados 
            // usa 'rawg-' en el id temporal para que React tenga una key única al renderizar
            const mappedResults: Game[] = data.results.map((rawg) => ({
                id: `rawg-${rawg.rawgId}`,
                rawgId: rawg.rawgId,
                title: rawg.title,
                coverUrl: rawg.coverUrl || 'https://coltonconcrete.co.uk/wp-content/uploads/2021/10/placeholder1.jpg',
                platform: 'PC', 
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

    // función para añadir a la base de datos y redirigir
    const handleSaveGame = async (game: Game, targetStatus: GameStatus) => {
        try {
            setIsSaving(true);
            
            // crea el objeto limpio sin el ID temporal de RAWG
            const newGameId = await addGame({
                title: game.title,
                coverUrl: game.coverUrl,
                platform: game.platform,
                status: targetStatus,
                releaseYear: game.releaseYear,
                genres: game.genres,
                rawgId: game.rawgId // guarda la referencia de RAWG
            });

            navigate(`/game/${newGameId}`);
            
        } catch (err: any) {
            alert(err.message || 'Error saving the game. Try again.');
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
            
            {/* CABECERA */}
            <header className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-gray-800 pb-6 gap-6">
                <div>
                    <h1 className="text-4xl font-black uppercase tracking-tighter text-text mb-2">
                        RADAR SEARCH
                    </h1>
                    <p className="text-sm text-gray-400 font-medium">
                        Connect to the RAWG database and scan for new additions to your collection.
                    </p>
                </div>

                {/* BUSCADOR */}
                <form onSubmit={handleSearch} className="flex gap-3 w-full md:w-100">
                    <div className="grow">
                        <SearchInput 
                            value={query} 
                            onChange={setQuery} 
                            placeholder="Type a game title..." 
                        />
                    </div>
                    <Button type="submit" variant="primary" disabled={isLoading || isSaving}>
                        Search
                    </Button>
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
                        {isSaving ? 'Saving to Database...' : 'Scanning RAWG Network...'}
                    </p>
                </div>
            )}

            {/* RESULTADOS O EMPTYSTATES */}
            {!isLoading && !isSaving && !error && (
                <>
                    {/* busca y no encuentra nada */}
                    {hasSearched && results.length === 0 && (
                        <EmptyState 
                            title="Signal Lost"
                            message={`No matches found for "${query}".`}
                            onClick={() => { setQuery(''); setHasSearched(false); }}
                            clickText="Clear Search"
                            onSecondaryClick={() => navigate('/library/add')}
                        />
                    )}

                    {/* reutiliza empty state para el estado iniciial */}
                    {!hasSearched && (
                        <EmptyState 
                            title="Awaiting coordinates..."
                            message="Use the search bar above to query millions of games from the RAWG API."
                            onSecondaryClick={() => navigate('/library/add')}
                            secondaryClickText="Add Manual Game"
                            icon={
                                <svg className="w-16 h-16 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            }
                        />
                    )}

                    {/* resultados encontrados */}
                    {results.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
                            {results.map(game => (
                                <div key={game.id} className="flex flex-col gap-3 h-full bg-gray-900/40 p-3 rounded-2xl border border-gray-800 shadow-xl">
                                    <div className="flex-1">
                                        <GameCard game={game} 
                                        showDetails={false}
                                        disableLink={true} />
                                    </div>
                                    
                                    {/* BOTONES */}
                                    <div className="flex gap-2 items-stretch mt-auto">
                                        
                                        <Button 
                                            variant="primary" 
                                            onClick={() => handleSaveGame(game, 'Backlog')} 
                                            className="flex-1 h-full px-2"
                                        >
                                            <div className="flex items-center justify-center gap-1.5 text-xs py-1 h-full">
                                                <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                                                </svg>
                                                <span className="leading-tight">Add to Library</span> 
                                            </div>
                                        </Button>

                                        <Button 
                                            variant="secondary" 
                                            onClick={() => handleSaveGame(game, 'Wishlist')} 
                                            className="flex-1 h-full px-2"
                                        >
                                            <div className="flex items-center justify-center gap-1.5 text-xs text-text py-1 h-full">
                                                <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                                </svg>
                                                <span className="leading-tight">Wishlist</span>
                                            </div>
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>
    );
}