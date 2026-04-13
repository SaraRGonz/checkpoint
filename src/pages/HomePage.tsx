import { Link, useNavigate } from 'react-router-dom';
import { useLibrary } from '../hooks/useLibrary';
import { Button } from '../components/ui/Button';

export function HomePage() {
    // trae los juegos del contexto global
    const { games } = useLibrary();
    // hook de React Router para hacer redirecciones al hacer clic en buscar
    const navigate = useNavigate();

    // filtra los juegos para las columnas rápidas
    const playingGames = games.filter(g => g.status === 'Playing');
    const wishlistGames = games.filter(g => g.status === 'Wishlist');

    // calcula las estadísticas
    const totalGames = games.length;
    const completedGames = games.filter(g => g.status === 'Completed').length;
    
    // función segura para calcular el porcentaje sin dividir por cero
    const getPercentage = (count: number) => totalGames === 0 ? 0 : Math.round((count / totalGames) * 100);

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            
            {/* COLUMNA 1 JUGANDO ACTUALMENTE */}
            <section className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                <h2 className="text-xl font-bold text-primary mb-4">Playing</h2>
                <div className="space-y-3">
                    {playingGames.length === 0 ? (
                        <p className="text-sm text-gray-400">You aren't playing anything right now.</p>
                    ) : (
                        playingGames.map(game => (
                            <div key={game.id} className="p-3 bg-gray-900 rounded border border-gray-700">
                                {game.title}
                            </div>
                        ))
                    )}
                </div>
            </section>

            {/* COLUMNA 2 WISHLIST RÁPIDA */}
            <section className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                <h2 className="text-xl font-bold text-primary mb-4">Wishlist</h2>
                <div className="space-y-3">
                    {wishlistGames.length === 0 ? (
                        <p className="text-sm text-gray-400">Your wishlist is empty.</p>
                    ) : (
                        wishlistGames.slice(0, 3).map(game => ( // slice(0,3) para mostrar solo los 3 primeros
                            <div key={game.id} className="p-3 bg-gray-900 rounded border border-gray-700">
                                {game.title}
                            </div>
                        ))
                    )}
                </div>
                <div className="mt-4">
                    <Link to="/wishlist" className="text-sm text-secondary hover:underline">View all →</Link>
                </div>
            </section>

            {/* COLUMNA 3 ESTADÍSTICAS */}
            <section className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                <h2 className="text-xl font-bold text-primary mb-4">Stats</h2>
                <div className="space-y-4">
                    <div className="flex justify-between items-center border-b border-gray-700 pb-2">
                        <span className="text-gray-300">Completed</span>
                        <span className="font-bold">{getPercentage(completedGames)}%</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-gray-700 pb-2">
                        <span className="text-gray-300">Playing</span>
                        <span className="font-bold">{getPercentage(playingGames.length)}%</span>
                    </div>
                    <div className="pt-2 text-center text-gray-400">
                        Total in library: <span className="font-bold text-white">{totalGames}</span>
                    </div>
                </div>
            </section>

            {/* COLUMNA 4 BÚSQUEDA RÁPIDA */}
            <section className="bg-gray-800 p-6 rounded-lg border border-gray-700 flex flex-col items-center justify-center text-center">
                <h2 className="text-xl font-bold text-primary mb-4">Search</h2>
                <p className="text-sm text-gray-400 mb-6">Find new games to add to your collection.</p>
                <Button onClick={() => navigate('/search')} variant="primary">
                    Search
                </Button>
            </section>

        </div>
    );
}