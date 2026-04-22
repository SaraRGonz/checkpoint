import { fetchApi } from './client';
import type { SearchResponse } from '../types/rawg';

interface SearchFilters {
    platform?: string;
    genre?: string;
    year?: string;
}

// buscar juegos
export const searchGamesInRawg = (query: string, filters?: SearchFilters) => {
    const params = new URLSearchParams({ q: query });
    
    // solo añade los filtros a la URL si tienen un valor asignado
    if (filters?.platform) params.append('platform', filters.platform);
    if (filters?.genre) params.append('genre', filters.genre);
    if (filters?.year) params.append('year', filters.year);

    return fetchApi<SearchResponse>(`/games/search?${params.toString()}`);
};

// obtener detalles de un juego
export const getRawgGameDetails = (id: string) => {
    return fetchApi(`/games/${id}`);
};