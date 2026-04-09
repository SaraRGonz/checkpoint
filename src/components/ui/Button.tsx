import type { ReactNode } from 'react';

interface ButtonProps {
    children: ReactNode; // el texto del botón
    variant?: 'primary' | 'secondary' | 'danger'; // variantes de botones
    onClick?: () => void; // indica a TypeScript que es una función vacía (ej: guardar datos, cambiar color..)
    type?: 'button' | 'submit' | 'reset'; // distintos tipos de botón: estándar, submit para formularios y reset para borrar inputs de formularios
}

const variantStyles = {
    primary: 'text-primarybutton-text bg-primarybutton-bg hover:primarybutton-bghover active:primarybutton-bgactive',
    secondary: 'text-secondarybutton-text bg-secondarybutton-bg hover:secondarybutton-bghover active:secondarybutton-bgactive',
    danger: 'text-dangerbutton-text bg-dangerbutton-bg hover:dangerbutton-bghover active:dangerbutton-bgactive',
}

export function Button({ 
    children, 
    variant = 'primary', 
    onClick, 
    type = 'button' 
}: ButtonProps) {
    
    // estilos base de los botones 
    const baseStyles = 'px-4 py-2 rounded-md font-medium transition-colors duration-200';
    // unión de estilo base y variante de color
    const finalClasses = `${baseStyles} ${variantStyles[variant]}`;

    // genera el botón con las clases establecidas
    return (
        <button 
            type={type} 
            className={finalClasses} 
            onClick={onClick}
        >
            {children}
        </button>
    );
}