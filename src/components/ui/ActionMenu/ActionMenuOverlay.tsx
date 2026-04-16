import type { ReactNode } from 'react';
import { useActionMenu } from './ActionMenuContext';

interface Props {
    children: ReactNode;
    'aria-label'?: string;
}

// contenedor tiene las opciones y aparece al hacer clic en el botón
export function ActionMenuOverlay({ children, 'aria-label': ariaLabel }: Props) {
    // extrae el estado para saber si debe mostrarlo y la posición para saber dónde ubicarlo
    const { isOpen, position } = useActionMenu();

    // si el menú está cerrado no se inserta en el HTML para ahorrar recursos del navegador
    if (!isOpen) return null;

    // elige las clases dependiendo de si se quiere que el menú se despliegue hacia arriba o hacia abajo
    const positionClasses = position === 'top' 
        ? 'bottom-full mb-2 origin-bottom-left' // Despliega hacia arriba
        : 'top-full mt-2 origin-top-left';      // Despliega hacia abajo (por defecto)

    return (
        <div
            className={`absolute z-50 w-full ${positionClasses} bg-gray-800 border border-gray-700 rounded-md shadow-xl outline-none animate-in fade-in zoom-in-95 duration-100 max-h-60 overflow-y-auto`}
            role="menu"
            aria-label={ariaLabel}
        >
            <div className="py-1" role="none">
                {children}
            </div>
        </div>
    );
}