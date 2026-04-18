import type { ReactNode } from 'react';
import { Button } from './Button';
import { GhostIcon } from './Icons';

interface EmptyStateProps {
    title?: string;
    message?: string;
    onClick?: () => void; 
    clickText?: string;
    onSecondaryClick?: () => void;
    secondaryClickText?: string;
    icon?: ReactNode;
}

export function EmptyState({ 
    title = 'Your library is looking a bit empty', 
    message = "It looks like you haven't added any games yet. Start exploring and build your collection!", 
    onClick,
    clickText = 'Search Games',
    onSecondaryClick,
    secondaryClickText = 'Add Manual Game',
    icon
}: EmptyStateProps) {
    return (
        <div className="flex flex-col items-center justify-center p-12 text-center bg-background rounded-lg border-2 border-dashed border-secondary">
            {/* icono svg personalizado o el de un fantasma por defecto*/}
            <div className="mb-6">
                {icon ? (
                    icon
                ) : (
                    <GhostIcon className="w-24 h-24 text-accent" />
                )}
            </div>
            
            <h2 className="text-2xl font-bold text-text mb-2">{title}</h2>
            <p className="text-text max-w-md mb-8">{message}</p>
            
            {/* contenedor para los botones */}
            <div className="flex gap-4 items-center justify-center">
                {onClick && (
                    <Button variant="primary" onClick={onClick}>
                        {clickText}
                    </Button>
                )}
                
                {onSecondaryClick && (
                    <Button variant="secondary" onClick={onSecondaryClick}>
                        {secondaryClickText}
                    </Button>
                )}
            </div>
        </div>
    );
}
