import { createContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

// solo permite dos opciones oscuro o claro
type Theme = 'dark' | 'light';

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
    // inicializa el estado que por defecto es 'dark' a no ser que el usuario
    // lo haya cambiado antes y esté guardado en el localStorage
    const [theme, setTheme] = useState<Theme>(() => {
        const savedTheme = localStorage.getItem('checkpoint-theme');
        // si hay algo guardado y es 'light' o 'dark' lo usa. Si no, va a usar 'dark'
        return (savedTheme === 'light' || savedTheme === 'dark') ? savedTheme : 'dark';
    });

    // el efecto vigila la variable 'theme' y cuando cambia lo guarda en localStorage
    // y le pone o le quita la clase 'light' a la etiqueta <html> de la página web
    useEffect(() => {
        localStorage.setItem('checkpoint-theme', theme);
        
        const htmlElement = document.documentElement;
        if (theme === 'light') {
            htmlElement.classList.add('light');
        } else {
            htmlElement.classList.remove('light');
        }
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}