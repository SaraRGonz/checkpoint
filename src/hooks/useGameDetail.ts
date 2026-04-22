import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useLibrary } from './useLibrary';
import type { Game } from '../types/game';

export function useGameDetail() {
    const { id } = useParams<{ id: string }>();
    const { games, updateGame, isLoading } = useLibrary();
    
    const originalGame = games.find((g) => g.id === id);
    const [isEditing, setIsEditing] = useState(false);
    const [draft, setDraft] = useState<Game | undefined>(originalGame);

    // sincronizar draft cuando carga el juego original
    useEffect(() => {
        if (originalGame) setDraft(originalGame);
    }, [originalGame]);

    const toggleEdit = () => setIsEditing(!isEditing);

    const updateDraftField = (field: keyof Game, value: any) => {
        // usa 'prev' para asegurar que si se lanzan varios updates a la vez se encolen y no se sobreescriban entre ellos
        setDraft(prev => prev ? { ...prev, [field]: value } : undefined);
    };

    const saveChanges = async () => {
        if (draft && originalGame) {
            await updateGame(originalGame.id, { ...draft });
            setIsEditing(false);
        }
    };

    const discardChanges = () => {
        setDraft(originalGame);
        setIsEditing(false);
    };

    return {
        game: originalGame,
        draft,
        isEditing,
        isLoading,
        toggleEdit,
        updateDraftField,
        saveChanges,
        discardChanges
    };
}