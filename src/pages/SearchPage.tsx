import { useState } from 'react';
import { fetchApi } from '../api/client';
import { SearchInput } from '../components/ui/SearchInput';
import { GameCard } from '../components/ui/GameCard';
import { Spinner } from '../components/ui/Spinner';
import { ErrorMessage } from '../components/ui/ErrorMessage';
import { Button } from '../components/ui/Button';
import type { Game } from '../types/game';

// interfaz temporal para lo que devuelve el backend/proxy
interface RawgSearchResult {
    rawgId: number;
    title: string;
    coverUrl: string;
    releaseYear?: number;
    genres: string[];
}

interface SearchResponse {
    results: RawgSearchResult[];
    count: number;
}

export function SearchPage() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<Game[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [hasSearched, setHasSearched] = useState(false);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!query.trim()) return;

        try {
            setIsLoading(true);
            setError(null);
            setHasSearched(true);
            
            // llama al propio backend que hace de proxy hacia RAWG
            const data = await fetchApi<SearchResponse>(`/games/search?q=${encodeURIComponent(query)}`);
            
            // mapea los resultados de RAWG para que encajen con la interfaz 'Game'
            // y el componente GameCard pueda pintarlos sin errores
            const mappedResults: Game[] = data.results.map((rawg) => ({
                id: `rawg-${rawg.rawgId}`, // ID temporal para la vista
                rawgId: rawg.rawgId,
                title: rawg.title,
                coverUrl: rawg.coverUrl || 'https://via.placeholder.com/400x600?text=No+Cover',
                platform: 'Multiple', // dato genérico para la vista de búsqueda
                status: 'Wishlist', // dato genérico para la vista de búsqueda
                rating: 0
            }));

            setResults(mappedResults);
        } catch (err: any) {
            setError(err.message || "¡Glitch in the system! We couldn't fetch those games. Let's try that again.");
            setResults([]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-text mb-2">Search Games</h1>
                <p className="text-gray-400">Hunt down games in the RAWG database to level up your library.</p>
            </div>

            {/* formulario de búsqueda */}
            <form onSubmit={handleSearch} className="flex gap-4 max-w-2xl">
                <div className="flex-grow">
                    <SearchInput 
                        value={query} 
                        onChange={setQuery} 
                        placeholder="e.g., Baldur's Gate III..." 
                    />
                </div>
                <Button type="submit" variant="primary">
                    Buscar
                </Button>
            </form>

            {/* estados de red: Error */}
            {error && <ErrorMessage message={error} />}

            {/* estados de red: Loading */}
            {isLoading && (
                <div className="flex justify-center py-12">
                    <Spinner />
                </div>
            )}

            {/* resultados */}
            {!isLoading && !error && hasSearched && results.length === 0 && (
                <div className="text-center py-12 text-gray-400 border-2 border-dashed border-gray-700 rounded-lg">
                    Looks like a ghost town... We couldn't find any matches for "{query}".
                </div>
            )}

            {!isLoading && results.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {results.map(game => (
                        <GameCard 
                            key={game.id} 
                            game={game} 
                            showDetails={false} // desactiva la plataforma y el rating
                        />
                    ))}
                </div>
            )}
        </div>
    );
}