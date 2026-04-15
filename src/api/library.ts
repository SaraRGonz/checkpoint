import { fetchApi } from './client';
import type { Game } from '../types/game';

// obtener toda la biblioteca
export const getLibrary = () => {
    return fetchApi<{ data: Game[] }>('/library');
};

// añadir un juego
export const addGameToLibrary = (gameData: Omit<Game, 'id'>) => {
    return fetchApi<Game>('/library', {
        method: 'POST',
        body: JSON.stringify(gameData)
    });
};

// actualizar un juego
export const updateGameInLibrary = (id: string, updates: Partial<Game>) => {
    return fetchApi<Game>(`/library/${id}`, {
        method: 'PUT',
        body: JSON.stringify(updates)
    });
};

// borrar un juego
export const deleteGameFromLibrary = (id: string) => {
    return fetchApi(`/library/${id}`, { 
        method: 'DELETE' 
    });
};