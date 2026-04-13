import { useState, useMemo, useCallback } from 'react';
import type { Game } from '../types/game';

export function useFilters(initialGames: Game[]) {
    // estado local de filtrado
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState<string>('');

    // useMemo para optimizar cálculos ---
    // recibe una función de cálculo y un array de dependencias
    // solo vuelve a ejecutar el .filter() si cambia 'initialGames', 'statusFilter' o 'searchQuery'.
    const filteredGames = useMemo(() => {
        return initialGames.filter((game) => {
            // comprobación de estado
            const matchesStatus = statusFilter === 'all' || game.status === statusFilter;
            // comprobación de búsqueda por texto (ignorando mayúsculas/minúsculas)
            const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase());
            
            return matchesStatus && matchesSearch;
        });
    }, [initialGames, statusFilter, searchQuery]);

    // useCallback para optimizar funciones
    // memoriza la instancia de la función y como tiene un array de dependencias vacío [] 
    // la función se crea sola una vez al montar el hook y no se vuelve a instanciar en memoria
    // para evitar renders innecesarios en componentes hijos que reciban la función como prop
    const clearFilters = useCallback(() => {
        setStatusFilter('all');
        setSearchQuery('');
    }, []);

    // devuelve el estado, las funciones actualizadora, la lista filtrada y la función memorizada
    return {
        statusFilter,
        setStatusFilter,
        searchQuery,
        setSearchQuery,
        filteredGames,
        clearFilters
    };
}