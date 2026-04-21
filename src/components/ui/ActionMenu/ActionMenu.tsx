import { useState, useRef, useEffect } from 'react';
import type { ReactNode } from 'react';
import { ActionMenuContext } from './ActionMenuContext';
import { ActionMenuButton } from './ActionMenuButton';
import { ActionMenuOverlay } from './ActionMenuOverlay';
import { ActionMenuItem } from './ActionMenuItem';
import { ActionMenuSearch } from './ActionMenuSearch';

interface ActionMenuProps {
    children: ReactNode;
    onSelect?: (value: string) => void;
    value?: string;
    position?: 'top' | 'bottom'; 
}

// el componente principal que envuelve todo y coordina el menú
export function ActionMenu({ children, onSelect, value, position = 'bottom' }: ActionMenuProps) {
    // estado local para saber si el menú flotante está desplegado o escondido
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    // referencia al contenedor HTML para poder detectar cuándo se hace clic dentro o fuera de él
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        
        // comprueba si el usuario hace clic fuera del menú
        function handleClickOutside(event: MouseEvent) {
            // si el menú existe y el elemento que recibe el clic no está dentro del menu lo cierra automáticamente
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        // le dice al navegador que escuche todos los clics de la página
        document.addEventListener('mousedown', handleClickOutside);
        // quita el listener cuando el componente desaparece para no dejar procesos fantasmas
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        if (!isOpen) setSearchQuery('');
    }, [isOpen]);

    return (
        // usa el provider para inyectar los datos y compartirlos con todos los hijos del menú
        <ActionMenuContext.Provider value={{ 
            isOpen, setIsOpen, onSelect, selectedValue: value, position,
            searchQuery, setSearchQuery // Pasar al provider
        }}>
            <div className="relative inline-block text-left w-full" ref={menuRef}>
                {children}
            </div>
        </ActionMenuContext.Provider>
    );
}

// asigna los subcomponentes directamente al principal para agruparlos lógicamente 
ActionMenu.Button = ActionMenuButton;
ActionMenu.Overlay = ActionMenuOverlay;
ActionMenu.Item = ActionMenuItem;
ActionMenu.Search = ActionMenuSearch;