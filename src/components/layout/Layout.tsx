import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';

export function Layout() {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            
            {/* main es el contenedor donde se va a cargar el contenido de cada página */}
            <main className="flex-grow container mx-auto px-4 py-8">
                <Outlet /> 
            </main>
            
            {/* aquí va a ir el footer*/}
        </div>
    );
}