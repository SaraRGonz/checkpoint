import { useLibrary } from '../../hooks/useLibrary';
import type { GameStatus } from '../../types/game';

export function HomeStats() {
    // obtiene todos los juegos para hacer cálculos globales
    const { games } = useLibrary();
    // filtra para quedarse solo con los juegos de la biblioteca sin contar los de wishlist
    const libraryGames = games.filter(g => g.status !== 'Wishlist');
    // calcula la cantidad total de juegos en biblioteca
    const total = libraryGames.length;

    // calcula cuántos juegos hay de cada estado y su porcentaje 
    const getStat = (status: GameStatus) => {
        const count = games.filter(g => g.status === status).length;
        // evita errores de división por cero si la biblioteca está vacía
        const percentage = total === 0 ? 0 : Math.round((count / total) * 100);
        return { count, percentage };
    };

    // define los estados exactos y el orden
    const statuses: GameStatus[] = ['Playing', 'Queue', 'Completed', 'Dropped'];

    return (
        <div className="h-full flex flex-col justify-center gap-8">
            <div className="text-center border-b border-gray-800 pb-6">
                <span className="text-5xl font-black text-text">{total}</span>
                <p className="text-[10px] uppercase tracking-[0.3em] text-text">Total Library</p>
            </div>

            <div className="space-y-6">
                {/* itera sobre los estados para dibujar la información */}
                {statuses.map(status => {
                    const { percentage } = getStat(status);
                    return (
                        <div key={status} className="space-y-2">
                            {/* encabezado numérico y textual del progreso */}
                            <div className="flex justify-between text-[10px] uppercase font-bold tracking-widest text-text">
                                <span>{status}</span>
                                <span>{percentage}%</span>
                            </div>
                            {/* contenedor trasero de la barra*/}
                            <div className="h-1.5 bg-gray-950 rounded-full overflow-hidden">
                                {/* barra de relleno principal con ancho en función del porcentaje */}
                                <div
                                    className="h-full bg-primary transition-all duration-1000"
                                    style={{ width: `${percentage}%` }}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}