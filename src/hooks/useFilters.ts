import { useState, useMemo, useCallback } from 'react';
import type { Game } from '../types/game';

export type SortOption = 'title-asc' | 'title-desc' | 'added-desc' | 'updated-desc';

export function useFilters(initialGames: Game[]) {
    
    // estados para los controles 
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [sortOption, setSortOption] = useState<SortOption>('added-desc');
    
    // filtros de los desplegables
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [genreFilter, setGenreFilter] = useState<string>('all');
    const [platformFilter, setPlatformFilter] = useState<string>('all');
    const [ratingFilter, setRatingFilter] = useState<string>('all');

    // extrae los géneros únicos de todos los juegos de la biblioteca que tenga el usuario
    const availableGenres = useMemo(() => {
        const genres = new Set<string>();
        initialGames.forEach(game => {
            if (game.genres && game.genres.length > 0) {
                game.genres.forEach(g => genres.add(g));
            }
        });
        return Array.from(genres).sort(); // los ordena alfabéticamente
    }, [initialGames]);

    // filtra y después ordena los juegos
    const filteredGames = useMemo(() => {
        // filtrar
        let result = initialGames.filter((game) => {
            const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesStatus = statusFilter === 'all' || game.status === statusFilter;
            const matchesGenre = genreFilter === 'all' || (game.genres && game.genres.includes(genreFilter));
            const matchesPlatform = platformFilter === 'all' || game.platform === platformFilter;
            const matchesRating = ratingFilter === 'all' || (game.rating && game.rating.toString() === ratingFilter);
            
            return matchesSearch && matchesStatus && matchesGenre && matchesPlatform && matchesRating;
        });

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
                    // si no hay fecha usa 0 para que no falle el parseo
                    return new Date(b.addedAt || 0).getTime() - new Date(a.addedAt || 0).getTime();
            }
        });

        return result;
    }, [initialGames, searchQuery, statusFilter, genreFilter, platformFilter, ratingFilter, sortOption]);

    // función para resetear todo de golpe
    const clearFilters = useCallback(() => {
        setSearchQuery('');
        setSortOption('added-desc');
        setStatusFilter('all');
        setGenreFilter('all');
        setPlatformFilter('all');
        setRatingFilter('all');
    }, []);

    // calcula si hay algún filtro activo para poner el botón de limpiar
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
        clearFilters,
        hasActiveFilters
    };
}