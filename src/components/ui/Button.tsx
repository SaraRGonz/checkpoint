import type { ButtonHTMLAttributes } from 'react';

// al extender ButtonHTMLAttributes<HTMLButtonElement> el componente hereda todas las propiedades 
// que existen en un <button> normal de HTML (onClick, type, disabled, className, etc.)
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'danger';
}

const variantStyles = {
    primary: 'text-primarybutton-text bg-primarybutton-bg hover:primarybutton-bghover active:primarybutton-bgactive',
    secondary: 'text-secondarybutton-text bg-secondarybutton-bg hover:secondarybutton-bghover active:secondarybutton-bgactive',
    danger: 'text-dangerbutton-text bg-dangerbutton-bg hover:dangerbutton-bghover active:dangerbutton-bgactive',
}

export function Button({ 
    children, 
    variant = 'primary', 
    className = '',
    ...props
}: ButtonProps) {
    
    // estilos base de los botones 
    const baseStyles = 'px-4 py-2 rounded-md font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed';    // unión de estilo base y variante de color
    const finalClasses = `${baseStyles} ${variantStyles[variant]} ${className}`.trim();

    // inyecta {...props} directamente y react se encarga de asignar onClick, disabled, etc
    return (
        <button 
            className={finalClasses} 
            {...props} 
        >
            {children}
        </button>
    );
}