import { createContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Game } from '../types/game';
import * as libraryApi from '../api/library';
// le dice a TypeScript qué datos y funciones van a vivir dentro del contexto global
interface LibraryContextType {
    // la lista completa de juegos que el usuario ha guardado
    games: Game[];

    // las funciones devuelven una Promesa, ya que son peticiones de red (asíncronas)
    // función para añadir que usa Omit<Game, 'id'> porque el ID lo genera el servidor
    addGame: (game: Omit<Game, 'id'>) => Promise<string>; 
    
    // función para editar que recibe el ID del juego a cambiar y un Partial<Game> 
    updateGame: (id: string, updates: Partial<Game>) => Promise<void>;
    
    // función para borrar que solo necesita saber el ID único del juego a destruir
    deleteGame: (id: string) => Promise<void>;
    
    // estados para saber si la app está cargando o si ha habido un error
    isLoading: boolean;
    error: string | null; 
}

// createContext instancia el contexto de React
export const LibraryContext = createContext<LibraryContextType | undefined>(undefined);

// el componente proveedor es el componente físico que envuelve a toda la aplicación 
// todo lo que esté dentro de él ('children') puede acceder al estado y métodos de contexto
export function LibraryProvider({ children }: { children: ReactNode }) {
    
    // el estado local, la memoria de la app
    const [games, setGames] = useState<Game[]>([]);
    
    // estados para saber si la app está cargando o si ha habido un error
    // empiexza en true porque hay que traer los datos del server nada más arrancar
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // EFECTO DE LECTURA (GET) sustituye a la lectura del LocalStorage
    // se ejecuta al montar el componente para traer la biblioteca del servidor
    useEffect(() => {
        const loadGames = async () => {
            try {
                setIsLoading(true);
                setError(null);
                // el backend devuelve { data: Game[], total: number } y se tipa así
                const result = await libraryApi.getLibrary();
                // actualizamos la memoria de la app con los datos reales del servidor
                setGames(result.data);
            } catch (err: any) {
                // manejo de errores en caso de que falle la carga inicial
                setError(err.message || 'Error al cargar la biblioteca desde el servidor');
            } finally {
                setIsLoading(false);
            }
        };

        loadGames();
    }, []); 


    // MÉTODOS DE MUTACIÓN (POST, PUT, DELETE)

    // añadir juego (POST)
    const addGame = async (newGameData: Omit<Game, 'id'>) => {
        try {
            setError(null);
            // el servidor recibe los datos y devuelve el juego ya con su ID creado
            const newGame = await libraryApi.addGameToLibrary(newGameData);
            
            // actualiza el estado añadiendo a la lista el juego que ha confirmado el servidor
            setGames((prevGames) => [...prevGames, newGame]);
            return newGame.id;
        } catch (err: any) {
            setError(err.message || 'Error al añadir el juego');
            throw err; // lanza el error por si el componente quiere reaccionar
        } 
    };

    // actualizar juego (PUT)
    const updateGame = async (id: string, updates: Partial<Game>) => {
        try {
            setError(null);
            // avisa al servidor del cambio y devuelve el objeto juego actualizado
            const updatedGame = await libraryApi.updateGameInLibrary(id, updates);

            // .map() recorre el array. Si el ID coincide inyecta la respuesta del servidor (updatedGame)
            // si no coincide mantiene el juego original sin cambios
            setGames((prevGames) => 
                prevGames.map(game => game.id === id ? updatedGame : game)
            );
        } catch (err: any) {
            setError(err.message || 'Error al actualizar el juego');
            throw err;
        } 
    };

    // borrar juego (DELETE)
    const deleteGame = async (id: string) => {
        try {
            setError(null);
            // petición al servidor para eliminar el recurso físicamente
            await libraryApi.deleteGameFromLibrary(id);
            
            // si el servidor confirma el borrado usa .filter() para quitarlo de la lista local
            setGames((prevGames) => prevGames.filter(game => game.id !== id));
        } catch (err: any) {
            setError(err.message || 'Error al borrar el juego');
            throw err;
        } 
    };

    // renderizado del proveedor
    // en la propiedad 'value' se inyecta el estado y las funciones LibraryContextType
    // todos los componentes que estén dentro del <LibraryProvider> tienen acceso mediante useContext
    return (
        <LibraryContext.Provider value={{ games, addGame, updateGame, deleteGame, isLoading, error }}>
            {children}
        </LibraryContext.Provider>
    );
}