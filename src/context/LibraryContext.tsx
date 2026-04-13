import { createContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Game } from '../types/game';


// le dice a TypeScript qué datos y funciones van a vivir dentro del contexto global
interface LibraryContextType {
    // La lista completa de juegos que el usuario ha guardado
    games: Game[];

    // función para añadir que usa Omit<Game, 'id'> porque cuando el usuario rellena el formulario 
    // el juego aún no tiene ID, se lo inventa la aplicación al guardarlo
    addGame: (game: Omit<Game, 'id'>) => void; 
    
    // función para editar que recibe el ID del juego a cambiar y un Partial<Game> 
    // si solo cambia la nota, le pasa { rating: 5 } y no todo el juego.
    updateGame: (id: string, updates: Partial<Game>) => void;
    
    // función para borrar que solo necesita saber el ID único del juego a destruir.
    deleteGame: (id: string) => void;
    
    // estados para saber si la app está cargando o si ha habido un error
    isLoading: boolean;
    error: string | null; 
}

// createContext instancia el contexto de React
// se utiliza 'undefined' como valor inicial porque al principio no hay datos, se inyectan en tiempo de ejecución
export const LibraryContext = createContext<LibraryContextType | undefined>(undefined);

// el componente proveedor es el componente físico que envuelve a toda la aplicación 
// todo lo que esté dentro de él ('children') puede acceder al estado y métodos de contexto
export function LibraryProvider({ children }: { children: ReactNode }) {
    
    // el estado local, la memoria de la app
    // games: la variable que guarda la lista actual
    // setGames: la única función capaz de modificar esa lista 
    // useState<Game[]>([]) es una lista de juegos y que arranca vacía []
    const [games, setGames] = useState<Game[]>([]);
    
    // añade los estados para la carga y los errores para cumplir con TypeScript
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // efecto de lectura
    // se ejecuta solo una vez al montar el componente debido al array de dependencias vacío []
    // recupera la colección persistida en localStorage de la sesión anterior
    useEffect(() => {
        setIsLoading(true); // avisa a la app que esta cargando
        
        // lee el string JSON almacenado en localStorage bajo la clave 'checkpoint-games'
        const savedGames = localStorage.getItem('checkpoint-games');
        
        if (savedGames) {
            try {
                // localStorage solo guarda texto puro
                // JSON.parse lo convierte en un array de objetos JavaScript y setGames lo mete en la memoria 
                setGames(JSON.parse(savedGames));
            } catch (error) {
                // manejo de errores en caso de que el JSON del localStorage esté malformado o corrupto
                console.error("Error reading saved games", error);
                setError("Could not load saved games.");
            }
        }
        setIsLoading(false); // termina de cargar
    }, []); 


    // efecto de escritura
    // se ejecuta cada vez que el estado 'games' se modifica
    // cada cambio persiste inmediatamente en localStorage
    useEffect(() => {
        // pasa el estado a un string JSON y lo guarda en el navegador, sobreescribiendo localStorage
        localStorage.setItem('checkpoint-games', JSON.stringify(games));
    }, [games]); 


    // métodos de mutación del estado

    // añadir juego
    const addGame = (newGameData: Omit<Game, 'id'>) => {
        // crea el juego completo uniendo los datos del formulario (...newGameData)
        // y le genera un identificador único usando crypto.randomUUID().
        const newGame: Game = {
            ...newGameData,
            id: crypto.randomUUID(),
        };
        
        // actualiza el estado, 'prevGames' representa la lista un milisegundo antes
        // devuelve un array nuevo con todos los juegos viejos (...prevGames) y mete el nuevo al final
        setGames((prevGames) => [...prevGames, newGame]);
    };

    // actualizar juego
    const updateGame = (id: string, updates: Partial<Game>) => {
        // .map() recorre el array. Si el ID coincide con el que se quiere editar, 
        // fusiona los datos viejos con los nuevos (...updates). Si no coincide, vuelve al original
        setGames((prevGames) => 
            prevGames.map(game => game.id === id ? { ...game, ...updates } : game)
        );
    };

    // borrar juego
    const deleteGame = (id: string) => {
        // usa .filter() para crear un array nuevo que excluye el juego con el ID que coincide con el parámetro (el juego borrado)
        setGames((prevGames) => prevGames.filter(game => game.id !== id));
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