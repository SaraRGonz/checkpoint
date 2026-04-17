import { Button } from './Button';

interface EmptyStateProps {
    title?: string;
    message?: string;
    onClick: () => void; 
    clickText?: string;
    onSecondaryClick?: () => void;
    secondaryClickText?: string;
}

export function EmptyState({ 
    title = 'Your library is looking a bit empty', 
    message = "It looks like you haven't added any games yet. Start exploring and build your collection!", 
    onClick,
    clickText = 'Search Games',
    onSecondaryClick,
    secondaryClickText = 'Add Manual Game'
}: EmptyStateProps) {
    return (
        <div className="flex flex-col items-center justify-center p-12 text-center bg-background rounded-lg border-2 border-dashed border-secondary">
            {/* icono svg de un fantasma */}
            <svg 
                className="w-24 h-24 text-accent mb-6" 
                viewBox="0 0 100 100" 
                fill="currentColor" 
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M50.3,87.7c-1.1,0-2.2-0.3-3.1-1l-10.1-7c-0.8-0.5-1.8-0.6-2.6-0.1l-8.8,5.2c-1.7,1-3.7,1-5.5,0c-1.7-1-2.7-2.7-2.7-4.7 V43.9c0-17.9,14.6-32.5,32.5-32.5s32.5,14.6,32.5,32.5v36.4c0,2-1,3.7-2.7,4.7c-1.7,1-3.7,1-5.4,0l-8.9-5.2 c-0.8-0.5-1.9-0.4-2.7,0.1l-9.3,6.8C52.5,87.4,51.4,87.7,50.3,87.7z M35.7,76.4c1.1,0,2.2,0.3,3.1,1l10.1,7c0.9,0.6,2,0.6,2.8,0 l9.3-6.8c1.7-1.3,4.1-1.4,6-0.3l8.9,5.2l0,0c0.8,0.4,1.7,0.4,2.4,0c0.8-0.4,1.2-1.2,1.2-2.1V43.9c0-16.3-13.2-29.5-29.5-29.5 S20.5,27.6,20.5,43.9v36.4c0,0.9,0.5,1.7,1.2,2.1c0.8,0.4,1.7,0.4,2.4,0l8.8-5.2C33.8,76.6,34.7,76.4,35.7,76.4z M35.9,54.1 c-4.9,0-8.8-4-8.8-8.8c0-4.9,4-8.8,8.8-8.8s8.8,4,8.8,8.8C44.7,50.1,40.7,54.1,35.9,54.1z M35.9,39.5c-3.2,0-5.8,2.6-5.8,5.8 c0,3.2,2.6,5.8,5.8,5.8s5.8-2.6,5.8-5.8C41.7,42.1,39.1,39.5,35.9,39.5z M64.3,54.1c-4.9,0-8.8-4-8.8-8.8c0-4.9,4-8.8,8.8-8.8 s8.8,4,8.8,8.8C73.1,50.1,69.2,54.1,64.3,54.1z M64.3,39.5c-3.2,0-5.8,2.6-5.8,5.8c0,3.2,2.6,5.8,5.8,5.8s5.8-2.6,5.8-5.8 C70.1,42.1,67.5,39.5,64.3,39.5z M32.4,30.6c0.1-0.1,5.8-7.2,13.8-7.7c0.8,0,1.5-0.8,1.4-1.6c0-0.8-0.7-1.4-1.6-1.4 c-9.3,0.5-15.7,8.5-16,8.8c-0.5,0.6-0.4,1.6,0.2,2.1c0.3,0.2,0.6,0.3,0.9,0.3C31.7,31.1,32.1,30.9,32.4,30.6z" />
            </svg>
            
            <h2 className="text-2xl font-bold text-text mb-2">{title}</h2>
            <p className="text-text max-w-md mb-8">{message}</p>
            
            {/* contenedor para los botones */}
            <div className="flex gap-4 items-center justify-center">
                <Button variant="primary" onClick={onClick}>
                    {clickText}
                </Button>
                
                {/* solo sale si onSecondaryClick existe */}
                {onSecondaryClick && (
                    <Button variant="secondary" onClick={onSecondaryClick}>
                        {secondaryClickText}
                    </Button>
                )}
            </div>
        </div>
    );
}
