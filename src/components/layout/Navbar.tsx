import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';
import { motion } from 'framer-motion'; 
import { LogoIcon, HomeIcon, LibraryIcon, WishlistNavIcon, SearchNavIcon, AddGameIcon } from '../ui/Icons';

export function Navbar() {
    const { theme, toggleTheme } = useTheme();
    const location = useLocation();

    const isActive = (path: string) => location.pathname === path;

    return (
        <nav className="bg-background border-b border-gray-800 px-6 py-4 flex items-center justify-between">
            {/* IZQUIERDA LOGO */}
            <Link to="/" className="flex items-center gap-3 group">
                <div className="text-primary group-hover:scale-110 transition-transform">
                    <LogoIcon className="w-8 h-8" />
                </div>
                <span className="text-xl font-black tracking-tighter text-text uppercase">Checkpoint</span>
            </Link>

            {/* CENTRO NAVEGACIÓN */}
            <div className="hidden md:flex items-center bg-gray-900/40 border border-gray-700/50 rounded-full p-1 shadow-inner relative">
                <div className="flex items-center gap-1 relative">
                    <NavItem to="/" active={isActive('/')} label="Home" icon={HomeIcon} />
                    <NavItem to="/library" active={isActive('/library')} label="My Library" icon={LibraryIcon} />
                    <NavItem to="/wishlist" active={isActive('/wishlist')} label="Wishlist" icon={WishlistNavIcon} />
                    <NavItem to="/search" active={isActive('/search')} label="Search Games" icon={SearchNavIcon} />
                    <NavItem to="/library/add" active={isActive('/library/add')} label="Add Game" icon={AddGameIcon} />
                </div>
            </div>

            {/* DERECHA TOGGLE DE TEMA */}
            <button onClick={toggleTheme} className="p-2.5 rounded-full bg-gray-900 border border-gray-700 hover:border-primary text-accent transition-all">
                {theme === 'dark' ? "☀️" : "🌙"}
            </button>
        </nav>
    );
}

function NavItem({ to, active, label, icon: Icon }: { to: string; active: boolean; label: string; icon: React.ElementType }) {
    return (
        <Link 
            to={to}
            className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors duration-300 relative group ${
                active ? 'text-primary' : 'text-gray-400 hover:text-white'
            }`}
        >
            {/* foco que se desliza al seleccionar */}
            {active && (
                <motion.div
                    layoutId="active-pill"
                    className="absolute inset-0 bg-gray-800 rounded-full shadow-lg ring-1 ring-gray-700 z-0"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }} 
                />
            )}

            {/* Contenido icono y texto */}
            <div className="relative z-10 flex items-center gap-2">
                <div className={`w-6 h-6 rounded-full border flex items-center justify-center transition-colors ${
                    active ? 'border-primary' : 'border-gray-600'
                }`}>
                    <Icon className="w-3 h-3" />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest">{label}</span>
            </div>
        </Link>
    );
}