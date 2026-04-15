import { fetchApi } from './client';
import type { SearchResponse } from '../types/rawg';

// buscar juegos
export const searchGamesInRawg = (query: string) => {
    return fetchApi<SearchResponse>(`/games/search?q=${encodeURIComponent(query)}`);
};

// obtener detalles de un juego
export const getRawgGameDetails = (id: string) => {
    return fetchApi(`/games/${id}`);
};