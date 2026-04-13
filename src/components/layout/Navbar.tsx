import { Link } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';

export function Navbar() {
    const { theme, toggleTheme } = useTheme();

    return (
        <nav className="bg-gray-900 text-white p-4 flex justify-between items-center">
            {/* logo al inicio */}
            <Link to="/" className="text-xl font-bold text-primary">
                Checkpoint
            </Link>
            
            {/* links de navegación */}
            <div className="flex gap-4">
                <Link to="/search" className="hover:text-primary">Search</Link>
                <Link to="/wishlist" className="hover:text-primary">Wishlist</Link>
                <Link to="/library" className="hover:text-primary">Library</Link>
                
                {/* botón del tema */}
                <button 
                    onClick={toggleTheme} 
                    className="ml-4 p-2 bg-gray-800 rounded text-sm"
                >
                    {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
                </button>
            </div>
        </nav>
    );
}