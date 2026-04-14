import { useNavigate } from 'react-router-dom';
import { useLibrary } from '../hooks/useLibrary';
import { useFilters } from '../hooks/useFilters';
import { GameCard } from '../components/ui/GameCard';
import { SearchInput } from '../components/ui/SearchInput';
import { EmptyState } from '../components/ui/EmptyState';
import { Button } from '../components/ui/Button';

export function LibraryPage() {
    // trae todos los juegos del estado global
    const { games } = useLibrary();
    const navigate = useNavigate();

    // pasa esos juegos a los Custom Hook de filtros
    const {
        filteredGames,
        searchQuery,
        setSearchQuery,
        statusFilter,
        setStatusFilter,
        clearFilters
    } = useFilters(games);

    // si la biblioteca global está vacía (0 juegos), mostramos el EmptyState
    if (games.length === 0) {
        return (
            <EmptyState
                title="Your library is looking a bit empty"
                message="It looks like you haven't added any games yet. Start exploring and build your collection!"
                clickText="Search Games"
                onClick={() => navigate('/search')}
            />
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <h1 className="text-3xl font-bold text-text">My library</h1>
                <Button onClick={() => navigate('/library/add')} variant="primary">
                    + Add manually
                </Button>
            </div>

            {/* BARRA DE HERRAMIENTAS (filtros y Búsqueda controlados) */}
            <div className="flex flex-col md:flex-row gap-4 bg-gray-800 p-4 rounded-lg border border-gray-700 items-center">
                <div className="flex-grow w-full">
                    <SearchInput
                        value={searchQuery}
                        onChange={setSearchQuery}
                        placeholder="Search in my collection..."
                    />
                </div>
                
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="bg-gray-900 border border-gray-700 rounded-md p-2 text-white focus:border-primary focus:outline-none w-full md:w-auto h-[42px]"
                >
                    <option value="all">All</option>
                    <option value="Backlog">Backlog</option>
                    <option value="Playing">Playing</option>
                    <option value="Completed">Completed</option>
                    <option value="Dropped">Dropped</option>
                </select>

                {/* solo muestra el botón de limpiar si hay algún filtro activo */}
                {(searchQuery !== '' || statusFilter !== 'all') && (
                    <button onClick={clearFilters} className="text-sm text-gray-400 hover:text-white whitespace-nowrap">
                        Clear filters
                    </button>
                )}
            </div>

            {/* GRID DE JUEGOS (muestra los filtrados, no los globales) */}
            {filteredGames.length === 0 ? (
                <div className="text-center py-12 text-gray-400 border-2 border-dashed border-gray-700 rounded-lg">
                    We couldn't find any games that match your search. Try exploring another path!
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredGames.map(game => (
                        <GameCard key={game.id} game={game} />
                    ))}
                </div>
            )}
        </div>
    );
}