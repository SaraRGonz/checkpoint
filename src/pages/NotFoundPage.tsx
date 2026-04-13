import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button'; 

export function NotFoundPage() {
    return (
        <div className="flex flex-col items-center justify-center py-20 text-center">
            
            <h1 className="text-9xl font-extrabold text-primary mb-4">404</h1>
            
            <h2 className="text-3xl font-bold text-text mb-6">
                Oops! You've gone off the map.
            </h2>
            
            <p className="text-gray-400 max-w-md mb-10">
                It seems the page you're looking for doesn't exist, has been moved, or is in another dimension.
            </p>
            
            {/* el componente Link de React Router sustituye a la etiqueta <a> normal
                así se evita que el navegador recargue la página entera al hacer click */}
            <Link to="/">
                <Button variant="primary">
                    Back to base!
                </Button>
            </Link>
        </div>
    );
}