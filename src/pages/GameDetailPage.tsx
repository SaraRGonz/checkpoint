import { useParams } from 'react-router-dom';

export function GameDetailPage() {
    // extrae el ID dinámico de la URL (ej: /game/1234 -> id será "1234")
    const { id } = useParams<{ id: string }>();

    return (
        <div>
            <h1 className="text-3xl font-bold text-text mb-6">Game details</h1>
            <p className="text-gray-400">Game data for ID: <span className="text-primary font-bold">{id}</span></p>
        </div>
    );
}