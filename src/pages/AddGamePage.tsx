import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLibrary } from '../hooks/useLibrary';
import { Button } from '../components/ui/Button';
import { TagInput } from '../components/ui/TagInput';
import { ActionMenu } from '../components/ui/ActionMenu/ActionMenu';
import { STATUS_LIST, PLATFORM_LIST } from '../utils/constants';
import type { GameStatus } from '../types/game';
import { PlusIcon } from '../components/ui/Icons';
import placeholderImg from '../assets/placeholder.jpg';

// constante para la imagen por defecto
const DEFAULT_COVER_URL = placeholderImg;

export function AddGamePage() {
    const { addGame } = useLibrary();
    const navigate = useNavigate();

    // estado local para todos los campos 
    const [title, setTitle] = useState('');
    const [coverUrl, setCoverUrl] = useState(DEFAULT_COVER_URL);
    const [platform, setPlatform] = useState('PC');
    const [status, setStatus] = useState<GameStatus>('Queue');
    const [releaseYear, setReleaseYear] = useState<number | ''>('');
    const [genres, setGenres] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e?: React.SyntheticEvent) => {
        if (e) e.preventDefault(); // solo hace preventDefault si e existe

        // validación simple
        if (title.trim() === '') {
            setError('The title is required.');
            return;
        }

        // validación estricta de url si el usuario escribe algo en el input
        const finalCoverUrl = coverUrl.trim();
        if (finalCoverUrl !== '' && finalCoverUrl !== DEFAULT_COVER_URL) {
            try {
                // intenta crear un objeto url y si falla es que no tiene un formato válido
                const url = new URL(finalCoverUrl);
                // comprueba que sea un enlace web http o https
                if (url.protocol !== 'http:' && url.protocol !== 'https:') {
                    throw new Error('Invalid protocol');
                }
            } catch (_) {
                setError('Please enter a valid link for the image (e.g., https://...)');
                return; // bloquea el envío si no es válida
            }
        }

        try {
            // construye el objeto Omit<Game, 'id'> con todos los campos
            const newGameId = await addGame({
            title,
            coverUrl: coverUrl.trim() === '' ? DEFAULT_COVER_URL : coverUrl,
            platform,
            status,
            releaseYear: releaseYear === '' ? undefined : releaseYear, // evita enviar null
            genres,
        });
            
            // lleva a la GameDetailPage del nuevo juego
            navigate(`/game/${newGameId}`);
            
        } catch (err: any) {
            setError(err.message || 'Failed to save the game. Please try again.');
        }
    };

    return (
        <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
            
            {/* CABECERA */}
            <header className="flex justify-between items-center border-b border-gray-800 pb-6 gap-4">
                <h1 className="text-4xl font-black uppercase tracking-tighter text-text">
                    ADD NEW GAME
                </h1>
                
                <div className="flex gap-2">
                    {/* botón de guardar */}
                    <Button onClick={handleSubmit} variant="primary">
                        <span className="flex items-center justify-center gap-2">
                            <PlusIcon className="w-5 h-5" />
                            Create Game
                        </span>
                    </Button>
                    {/* botón de cancelar */}
                    <Button onClick={() => navigate('/library')} variant="danger">
                        <span className="flex items-center justify-center gap-2">
                            Cancel
                        </span>
                    </Button>
                </div>
            </header>

            {/* error message si lo hay */}
            {error && (
                <div className="bg-danger/10 border border-danger p-4 rounded-xl text-danger text-sm font-bold">
                    {error}
                </div>
            )}

            {/* CUERPO DEL FORMULARIO */}
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8 items-stretch">
                
                {/* columna izquierda portada */}
                <div className="relative flex flex-col justify-center h-full bg-gray-900/40 p-4 rounded-2xl border border-gray-800 shadow-xl">
                    <div className="relative rounded-2xl overflow-hidden border-2 border-gray-800 shadow-2xl aspect-3/4 w-full bg-gray-950">
                        <img 
                            src={coverUrl} 
                            alt="Cover Preview" 
                            className="w-full h-full object-cover transition-opacity" 
                            onError={(e) => e.currentTarget.src = DEFAULT_COVER_URL}
                        />
                    </div>
                    
                    {/* input para URL debajo de la preview */}
                    <div className="mt-4 space-y-1.5">
                        <label className="text-[10px] uppercase text-gray-300 font-bold mb-3 tracking-[0.2em]">Cover URL</label>
                        <input 
                            type="text"
                            value={coverUrl === DEFAULT_COVER_URL ? '' : coverUrl}
                            onChange={(e) => setCoverUrl(e.target.value)}
                            placeholder="https://..."
                            className="w-full bg-gray-950 border border-gray-700 text-gray-300 text-xs p-2 rounded outline-none focus:border-primary transition-colors placeholder:text-gray-300"
                        />
                    </div>
                </div>

                {/* columna derecha información base */}
                <div className="h-full bg-gray-900/40 p-8 rounded-2xl border border-gray-800 space-y-8 shadow-inner">
                    
                    {/* input de título */}
                    <div className="space-y-1.5 border-b border-gray-800 pb-6">
                        <label className="text-[11px] font-bold text-gray-300 uppercase tracking-widest mb-1">Title</label>
                        <input 
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="e.g. Baldur's Gate III"
                            className="w-full bg-transparent text-4xl font-black tracking-tighter text-gray-100 placeholder:text-gray-500 outline-none focus:border-primary border border-transparent focus:bg-gray-950 p-2 rounded-xl transition-all"
                        />
                    </div>

                    {/* SELECTORES */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* platform */}
                        <div className="flex flex-col gap-1.5 w-full">
                            <label className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">Platform</label>
                            <ActionMenu value={platform} onSelect={setPlatform}>
                                <ActionMenu.Button>{platform}</ActionMenu.Button>
                                <ActionMenu.Overlay>
                                    {PLATFORM_LIST.map(p => (
                                        <ActionMenu.Item key={p} value={p}>{p}</ActionMenu.Item>
                                    ))}
                                </ActionMenu.Overlay>
                            </ActionMenu>
                        </div>
                        {/* status */}
                        <div className="flex flex-col gap-1.5 w-full">
                            <label className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">Status</label>
                            <ActionMenu value={status} onSelect={(val) => setStatus(val as GameStatus)}>
                                <ActionMenu.Button>{status}</ActionMenu.Button>
                                <ActionMenu.Overlay>
                                    {STATUS_LIST.map(s => (
                                        <ActionMenu.Item key={s.value} value={s.value}>{s.label}</ActionMenu.Item>
                                    ))}
                                </ActionMenu.Overlay>
                            </ActionMenu>
                        </div>
                    </div>

                    {/* AÑO DE LANZAMIENTO */}
                    <div className="flex flex-col gap-1.5 w-full pt-4 border-t border-gray-800">
                        <label className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">Release Year</label>
                        <input 
                            type="number"
                            value={releaseYear}
                            onChange={(e) => setReleaseYear(e.target.value === '' ? '' : parseInt(e.target.value))}
                            placeholder="e.g. 2022"
                            className="bg-gray-950 border border-gray-700 text-text text-sm p-3 rounded-lg w-full outline-none focus:border-primary transition-all placeholder:text-gray-300"
                        />
                    </div>

                    {/* GÉNEROS */}
                    <div className="flex flex-col gap-1.5 w-full pt-4 border-t border-gray-800">
                        <label className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">Genres</label>
                        <TagInput 
                            tags={genres} 
                            onChange={setGenres} 
                        />
                    </div>

                </div>

            </form>
        </div>
    );
}