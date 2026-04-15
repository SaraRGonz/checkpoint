import { fetchApi } from './client';

export interface RawgSearchResult {
    rawgId: number;
    title: string;
    coverUrl: string;
    releaseYear?: number;
    genres: string[];
}

export interface SearchResponse {
    results: RawgSearchResult[];
    count: number;
}

// buscar juegos
export const searchGamesInRawg = (query: string) => {
    return fetchApi<SearchResponse>(`/games/search?q=${encodeURIComponent(query)}`);
};

// obtener detalles de un juego
export const getRawgGameDetails = (id: string) => {
    return fetchApi(`/games/${id}`);
};