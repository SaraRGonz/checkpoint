import type { GameStatus } from '../types/game';

export const STATUS_LIST: { value: GameStatus; label: string }[] = [
    { value: 'Wishlist', label: 'Wishlist' },
    { value: 'Queue', label: 'Queue' },
    { value: 'Playing', label: 'Playing' },
    { value: 'Completed', label: 'Completed' },
    { value: 'Dropped', label: 'Dropped' },
];

export const PLATFORM_LIST = [
    'PC',
    'PS5',
    'PS4',
    'Switch',
    'Xbox Series',
    'Xbox One',
    'Retro',
    'Other'
];