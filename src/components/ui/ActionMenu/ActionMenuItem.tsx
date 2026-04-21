import type { ReactNode } from 'react';
import { useActionMenu } from './ActionMenuContext';
import { CheckIcon } from '../Icons';

interface Props {
    value: string;
    children: ReactNode;
    selected?: boolean;
}

// representa cada una de las opciones clickables de la lista dentro del menú
export function ActionMenuItem({ value, children, selected }: Props) {
    // contexto para saber cuál es el valor global actual y cómo cerrarlo al terminar
    const { selectedValue, onSelect, setIsOpen, searchQuery } = useActionMenu();
    const matches = children?.toString().toLowerCase().includes(searchQuery.toLowerCase());

    if (!matches && searchQuery !== '') return null;

    // comprueba si esta opción concreta es la seleccionada para destacarla.
    const isSelected = selected || selectedValue === value;

    const handleClick = () => {
        // si el componente padre definió qué hacer al seleccionar algo (onSelect) le enviam el valor de la opción
        if (onSelect) onSelect(value);
        // siempre que se selecciona una opción el menú se esconde
        setIsOpen(false);
    };

    return (
        <button
            type="button"
            role="menuitem"
            onClick={handleClick}
            className="flex items-center w-full px-4 py-2.5 text-sm text-left transition-colors duration-150 text-gray-300 hover:bg-gray-700 hover:text-white group"
        >
            {/* espacio para el icono check */}
            <span className="w-5 mr-2 flex justify-center items-center">
                {/* si la opción está seleccionada pone el check */}
                {isSelected && (
                    <CheckIcon className="w-4 h-4 text-primary" />
                )}
            </span>
            {/* estilos de fuente si está seleccionada */}
            <span className={isSelected ? 'font-medium text-white' : ''}>
                {children}
            </span>
        </button>
    );
}