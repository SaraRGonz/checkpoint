import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

export function Layout() {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            
            {/* main es el contenedor donde se va a cargar el contenido de cada página */}
            <main className="grow container mx-auto px-4 py-8">
                <Outlet /> 
            </main>
            
            <Footer />
        </div>
    );
}