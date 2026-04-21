import { createContext, useContext } from 'react';

// datos y funciones que se van a compartir entre todos los componentes del menú
// para que no haya que ir pasándolos uno a uno como props
export interface ActionMenuContextProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    onSelect?: (value: string) => void;
    selectedValue?: string;
    position?: 'top' | 'bottom'; // hacia dónde se despliega el menú
    searchQuery: string;
    setSearchQuery: (query: string) => void;
}

// crea el contexto
// empieza vacío (undefined) pero el componente principal <ActionMenu> lo llena de datos reales
export const ActionMenuContext = createContext<ActionMenuContextProps | undefined>(undefined);

// hook personalizado para usar el contexto desde cualquier sub-componente
export function useActionMenu() {
    const context = useContext(ActionMenuContext);
    // si se intenta usar el hook en un botón u opción que no esté dentro de un <ActionMenu> da error
    if (!context) {
        throw new Error('ActionMenu sub-components must be used within the <ActionMenu> wrapper');
    }
    return context;
}