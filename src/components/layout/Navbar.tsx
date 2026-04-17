import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';
import { motion } from 'framer-motion'; 

export function Navbar() {
    const { theme, toggleTheme } = useTheme();
    const location = useLocation();

    const isActive = (path: string) => location.pathname === path;

    return (
        <nav className="bg-background border-b border-gray-800 px-6 py-4 flex items-center justify-between">
            {/* IZQUIERDA LOGO */}
            <Link to="/" className="flex items-center gap-3 group">
                <div className="text-primary group-hover:scale-110 transition-transform">
                    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M6 12h4M8 10v4M15 11v.01M18 13v.01M21 15a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v6Z" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
                <span className="text-xl font-black tracking-tighter text-text uppercase">Checkpoint</span>
            </Link>

            {/* CENTRO NAVEGACIÓN */}
            <div className="hidden md:flex items-center bg-gray-900/40 border border-gray-700/50 rounded-full p-1 shadow-inner relative">
                <div className="flex items-center gap-1 relative">
                    <NavItem to="/" active={isActive('/')} label="Home">
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" strokeLinecap="round" strokeLinejoin="round" />
                        <polyline points="9 22 9 12 15 12 15 22" strokeLinecap="round" strokeLinejoin="round" />
                    </NavItem>
                    
                    <NavItem to="/library" active={isActive('/library')} label="My Library">
                        <path d="M18 6L6 18M6 6l12 12" />
                    </NavItem>

                    <NavItem to="/wishlist" active={isActive('/wishlist')} label="Wishlist">
                        <circle cx="12" cy="12" r="6" />
                    </NavItem>

                    <NavItem to="/search" active={isActive('/search')} label="Search Games">
                        <path d="M12 6l6 12H6z" />
                    </NavItem>

                    <NavItem to="/library/add" active={isActive('/library/add')} label="Add Game">
                        <rect x="6" y="6" width="12" height="12" rx="1" />
                    </NavItem>
                </div>
            </div>

            {/* DERECHA TOGGLE DE TEMA */}
            <button onClick={toggleTheme} className="p-2.5 rounded-full bg-gray-900 border border-gray-700 hover:border-primary text-accent transition-all">
                {theme === 'dark' ? "☀️" : "🌙"}
            </button>
        </nav>
    );
}

function NavItem({ to, active, label, children }: { to: string; active: boolean; label: string; children: React.ReactNode }) {
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
                    layoutId="active-pill" // id único para que framer motion sepa qué animar
                    className="absolute inset-0 bg-gray-800 rounded-full shadow-lg ring-1 ring-gray-700 z-0"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }} // Ajuste de movimiento
                />
            )}

            {/* Contenido icono y texto */}
            <div className="relative z-10 flex items-center gap-2">
                <div className={`w-6 h-6 rounded-full border flex items-center justify-center transition-colors ${
                    active ? 'border-primary' : 'border-gray-600'
                }`}>
                    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        {children}
                    </svg>
                </div>
                <span className="text-xs font-bold uppercase tracking-widest">{label}</span>
            </div>
        </Link>
    );
}