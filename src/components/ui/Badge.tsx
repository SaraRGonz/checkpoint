import type { ReactNode } from 'react';

// interfaz de Badge con las variantes opcionales de los estados que maneja la app
interface BadgeProps {
    children: ReactNode; // el texto del badge
    variant?: 'default' | 'wishlist' | 'backlog' | 'playing' | 'completed' | 'dropped';
}

// colores de Tailwind para las distintas variantes de badge
const variantStyles = {
    default: 'bg-badge-bgdefault text-badge-default',
    wishlist: 'bg-badge-bgwishlist text-badge-wishlist',
    backlog: 'bg-badge-bgbacklog text-badge-backlog',
    playing: 'bg-badge-bgplaying text-badge-playing',
    completed: 'bg-badge-bgcompleted text-badge-completed',
    dropped: 'bg-badge-bgdropped text-badge-dropped'
}

// crea el componente con el valor 'default' por defecto
export function Badge({ children, variant = 'default' }: BadgeProps) {
    // estilo base de todos los badges: padding horizontal, padding vertical, border radius, font weight, display inline
    const baseStyles = 'px-2.5 py-0.5 rounded-sm text-s font-medium inline-block';

    // une el estilo base con el color de cada variante
    const finalClasses = `${baseStyles} ${variantStyles[variant]}`;

    // genera etiqueta HTML <span> con las clases finales
    return (
        <span className={finalClasses}>
            {children}
        </span>
    );
}