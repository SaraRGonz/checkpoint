import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

export function useTheme() {
    // consume el contexto
    const context = useContext(ThemeContext);

    // comprobación de seguridad 
    // si context es undefined significa que se ha intentado llamar a useTheme() 
    // en un componente que está fuera de las etiquetas <ThemeProvider>
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    
    // si todo está bien devuelve los datos
    return context;
}