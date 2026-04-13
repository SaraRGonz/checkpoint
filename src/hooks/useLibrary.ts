import { useContext } from 'react';
import { LibraryContext } from '../context/LibraryContext';

export function useLibrary() {
    // consume el contexto
    const context = useContext(LibraryContext);

    // comprobación de seguridad 
    // si context es undefined significa que se ha intentado llamar a useLibrary() 
    // en un componente que está fuera de las etiquetas <LibraryProvider>
    if (context === undefined) {
        throw new Error('useLibrary must be used within a LibraryProvider');
    }

    // si todo está bien devuelve los datos y funciones (games, addGame, etc.)
    return context;
}