import { useMemo, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { Game } from '../types/game';

export type SortOption = 'title-asc' | 'title-desc' | 'added-desc' | 'updated-desc';

export function useFilters(initialGames: Game[]) {
    const [searchParams, setSearchParams] = useSearchParams();

    // helpers para leer y escribir parámetros de forma limpia
    const getParam = (key: string, defaultVal: string) => searchParams.get(key) || defaultVal;
    
    const updateParam = (key: string, value: string, defaultVal: string) => {
        setSearchParams(prev => {
            if (value === defaultVal || value === '') {
                prev.delete(key);
            } else {
                prev.set(key, value);
            }
            return prev;
        }, { replace: true }); // replace: true evita crear un historial infinito al clickar filtros
    };

    // estados derivados de la URL
    const searchQuery = getParam('q', '');
    const setSearchQuery = (val: string) => updateParam('q', val, '');

    const sortOption = getParam('sort', 'added-desc') as SortOption;
    const setSortOption = (val: SortOption) => updateParam('sort', val, 'added-desc');

    const statusFilter = getParam('status', 'all');
    const setStatusFilter = (val: string) => updateParam('status', val, 'all');

    const genreFilter = getParam('genre', 'all');
    const setGenreFilter = (val: string) => updateParam('genre', val, 'all');

    const platformFilter = getParam('platform', 'all');
    const setPlatformFilter = (val: string) => updateParam('platform', val, 'all');

    const ratingFilter = getParam('rating', 'all');
    const setRatingFilter = (val: string) => updateParam('rating', val, 'all');

    // extrae los géneros únicos
    const availableGenres = useMemo(() => {
        const genres = new Set<string>();
        initialGames.forEach(game => {
            if (game.genres && game.genres.length > 0) {
                game.genres.forEach(g => {
                    const formatted = g.charAt(0).toUpperCase() + g.slice(1).toLowerCase();
                    genres.add(formatted);
                });
            }
        });
        return Array.from(genres).sort(); 
    }, [initialGames]);

    // extrae las plataformas únicas
    const availablePlatforms = useMemo(() => {
        const platforms = new Set<string>();
        initialGames.forEach(game => {
            if (game.platform && game.platform.trim() !== '') {
                platforms.add(game.platform);
            }
        });
        return Array.from(platforms).sort(); 
    }, [initialGames]);

    // filtra y después ordena los juegos
    const filteredGames = useMemo(() => {
        let result = initialGames;
        if (searchQuery) {
            result = result.filter(game => game.title.toLowerCase().includes(searchQuery.toLowerCase()));
        }
        if (statusFilter !== 'all') {
            result = result.filter(game => game.status === statusFilter);
        }
        if (genreFilter !== 'all') {
            result = result.filter(game => 
                game.genres?.some(g => g.toLowerCase() === genreFilter.toLowerCase())
            );
        }
        if (platformFilter !== 'all') {
            if (platformFilter === 'Not specified') {
                result = result.filter(game => !game.platform || game.platform.trim() === '');
            } else {
                result = result.filter(game => game.platform === platformFilter);
            }
        }
        if (ratingFilter !== 'all') {
            result = result.filter(game => game.rating === parseInt(ratingFilter, 10));
        }

        // ordenar
        result.sort((a, b) => {
            switch (sortOption) {
                case 'title-asc': 
                    return a.title.localeCompare(b.title);
                case 'title-desc': 
                    return b.title.localeCompare(a.title);
                case 'updated-desc': 
                    return new Date(b.updatedAt || 0).getTime() - new Date(a.updatedAt || 0).getTime();
                case 'added-desc':
                default:
                    return new Date(b.addedAt || 0).getTime() - new Date(a.addedAt || 0).getTime();
            }
        });

        return result;
    }, [initialGames, searchQuery, statusFilter, genreFilter, platformFilter, ratingFilter, sortOption]);

    // función para limpiar la URL entera
    const clearFilters = useCallback(() => {
        setSearchParams(new URLSearchParams(), { replace: true });
    }, [setSearchParams]);

    const hasActiveFilters = searchQuery !== '' || sortOption !== 'added-desc' || statusFilter !== 'all' || genreFilter !== 'all' || platformFilter !== 'all' || ratingFilter !== 'all';

    return {
        searchQuery, setSearchQuery,
        sortOption, setSortOption,
        statusFilter, setStatusFilter,
        genreFilter, setGenreFilter,
        platformFilter, setPlatformFilter,
        ratingFilter, setRatingFilter,
        filteredGames,
        availableGenres,
        availablePlatforms,
        clearFilters,
        hasActiveFilters
    };
}