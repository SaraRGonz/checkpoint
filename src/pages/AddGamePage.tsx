import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLibrary } from '../hooks/useLibrary';
import { Button } from '../components/ui/Button';
import { ErrorMessage } from '../components/ui/ErrorMessage';
import type { GameStatus } from '../types/game';
import { StatusSelector } from '../components/game/StatusSelector';
import { PLATFORM_LIST } from '../utils/constants';

export function AddGamePage() {
    // trae la función para añadir juegos del Contexto y la de navegar de Router
    const { addGame } = useLibrary();
    const navigate = useNavigate();

    // estados controlados para cada campo del formulario
    const [title, setTitle] = useState('');
    const [platform, setPlatform] = useState('PC');
    const [status, setStatus] = useState<GameStatus>('Backlog');
    
    // estado para manejar errores de validación
    const [error, setError] = useState<string | null>(null);

    // función que se ejecuta al enviar el formulario
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); // evita que la página se recargue 

        // validación básica
        if (title.trim() === '') {
            setError('The title is required.');
            return;
        }

        // si pasa la validación crea el objeto sin ID, el Contexto se lo pone
        try {
            // añade el await, el frontend espera a que el backend guarde el JSON
            const newGameId = await addGame({
                title,
                platform,
                status,
                coverUrl: 'https://coltonconcrete.co.uk/wp-content/uploads/2021/10/placeholder1.jpg', // placeholder de que no hay imagen
                genres: []
            });
            // redirige al usuario a la biblioteca una vez que se añade
            navigate(`/game/${newGameId}`);
        } catch (err) {
            // si el servidor está apagado o falla muestra el error sin cambiar de página
            setError('Error de red al guardar el juego.');
        }
    };

    return (
        <div className="max-w-2xl mx-auto bg-gray-800 p-8 rounded-lg border border-gray-700">
            <h1 className="text-3xl font-bold text-primary mb-6">Add Game Manually</h1>
            
            {/* si hay un error, muestra el componente ErrorMessage */}
            {error && <ErrorMessage message={error} />}

            <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* campo título */}
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">
                        Game Title *
                    </label>
                    <input
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full bg-gray-900 border border-gray-700 rounded-md p-3 text-white focus:border-primary focus:outline-none"
                        placeholder="e.g. Baldur's Gate III"
                    />
                </div>

                {/* campo plataforma */}
                <div>
                    <label htmlFor="platform" className="block text-sm font-medium text-gray-300 mb-2">
                        Platform
                    </label>
                    <select
                        id="platform"
                        value={platform}
                        onChange={(e) => setPlatform(e.target.value)}
                        className="w-full bg-gray-900 border border-gray-700 rounded-md p-3 text-white focus:border-primary focus:outline-none"
                    >
                        {PLATFORM_LIST.map((p) => (
                            <option key={p} value={p}>{p}</option>
                        ))}
                    </select>
                </div>

                {/* campo estado */}
                <StatusSelector 
                    value={status} 
                    onChange={setStatus} 
                />

                {/* botón de envío */}
                <div className="pt-4">
                    <Button type="submit" variant="primary">
                        Save Game
                    </Button>
                </div>
            </form>
        </div>
    );
}