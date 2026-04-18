import { useLibrary } from '../hooks/useLibrary';
import { HomeColumn } from '../components/home/HomeColumn';
import { HomeGameItem } from '../components/home/HomeGameItem';
import { HomeStats } from '../components/home/HomeStats';

export function HomePage() {
    const { games } = useLibrary();

    // filtra los juegos que están en estado playing
    // los ordena por la fecha de última actualización y se queda con los 3 primeros
    const playing = games
        .filter(g => g.status === 'Playing')
        .sort((a, b) => new Date(b.updatedAt || 0).getTime() - new Date(a.updatedAt || 0).getTime())
        .slice(0, 3);

    // filtra los juegos que están en estado wishlist
    // los ordena por la fecha de añadido y se queda con los 3 primeros
    const wishlist = games
        .filter(g => g.status === 'Wishlist')
        .sort((a, b) => new Date(b.addedAt || 0).getTime() - new Date(a.addedAt || 0).getTime())
        .slice(0, 3);

    return (
        <div className="max-w-7xl mx-auto py-10 animate-in fade-in duration-700">


            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-stretch">
                {/* columna playing */}
                <HomeColumn title="Playing">
                    {/* si hay juegos activos los itera usando el componente HomeGameItem */}
                    {/* Empty State si el usuario no tiene juegos playing */}
                    {playing.length > 0 ? (
                        playing.map(game => <HomeGameItem key={game.id} game={game} />)
                    ) : (
                        <div className="h-full border-2 border-dashed border-gray-800 rounded-2xl flex items-center justify-center text-gray-600 uppercase text-xs font-bold">
                            You have no active sessions
                        </div>
                    )}
                </HomeColumn>

                {/* columna wishlist */}
                <HomeColumn title="Wishlist">
                    {/* si hay juegos activos los itera usando el componente HomeGameItem  */}
                    {/* Empty State si el usuario no tiene juegos wishlist */}
                    {wishlist.length > 0 ? (
                        wishlist.map(game => <HomeGameItem key={game.id} game={game} />)
                    ) : (
                        <div className="h-full border-2 border-dashed border-gray-800 rounded-2xl flex items-center justify-center text-gray-600 uppercase text-xs font-bold">
                            Scanner empty
                        </div>
                    )}
                </HomeColumn>

                {/* columna stats */}
                <HomeColumn title="Game Stats">
                    <HomeStats />
                </HomeColumn>
            </div>
        </div>
    );
}