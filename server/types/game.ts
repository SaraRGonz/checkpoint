export type GameStatus = 'Wishlist' | 'Queue' | 'Playing' | 'Completed' | 'Dropped';

export interface Game {
    id: string;
    rawgId?: number;
    title: string;
    coverUrl: string;
    platform: string; 
    status: GameStatus; 
    rating?: number;
    review?: string;
    genres?: string[];
    releaseYear?: number;
    addedAt?: string;
    updatedAt?: string;
}