// define los 5 estados posibles 
export type GameStatus = 'Wishlist' | 'Queue' | 'Playing' | 'Completed' | 'Dropped';

export interface Game {
    id: string;
    rawgId?: number; // opcional porque si se añade a mano igual no tiene ID de RAWG
    title: string;
    coverUrl: string;
    platform?: string; 
    status: GameStatus; 
    rating?: number;
    review?: string;
    genres?: string[];
    releaseYear?: number;
    addedAt?: string;
    updatedAt?: string;
}