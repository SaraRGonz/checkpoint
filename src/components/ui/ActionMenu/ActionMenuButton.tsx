import type { ReactNode } from 'react';
import { useActionMenu } from './ActionMenuContext';
import { ChevronDownIcon } from '../Icons';

interface Props {
    children: ReactNode;
}

// actúa como el botón visible que se pulsa para abrir o cerrar las opciones del menú
export function ActionMenuButton({ children }: Props) {
    // obtiene del contexto el estado actual (isOpen) y la función para cambiarlo
    const { isOpen, setIsOpen } = useActionMenu();

    return (
        <button
            type="button"
            // al clickar invierte el estado actual si está abierto se cierra y viceversa.
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex w-full items-center justify-between px-4 py-2 text-sm font-medium transition-colors duration-200 border rounded-md bg-gray-900 border-gray-700 text-gray-300 hover:border-primary hover:text-white focus:outline-none focus:ring-1 focus:ring-primary"
        >
            {/* span con truncate evita que un texto muy largo rompa visualmente el ancho del botón */}
            <span className="truncate">{children}</span>
            {/* icono de flecha decorativa hacia abajo para dar a entender que es un desplegable */}
            <ChevronDownIcon className="w-4 h-4 ml-2 shrink-0 text-gray-500" />
        </button>
    );
}