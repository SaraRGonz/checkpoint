import { env } from '../config/env'; // <-- Importamos la configuración

const API_KEY = env.RAWG_API_KEY;
const BASE_URL = 'https://api.rawg.io/api';

export const searchGames = async (query: string, platform?: string, genre?: string, year?: string) => {
    // busca juegos usando la API Key y limitando a 12 resultados por página
    let url = `${BASE_URL}/games?key=${API_KEY}&search=${encodeURIComponent(query)}&page_size=30`;
    
    if (platform) url += `&platforms=${platform}`;
    
    if (genre) url += `&genres=${genre}`;
    
    if (year) url += `&dates=${year}-01-01,${year}-12-31`;

    const response = await fetch(url);
    
    if (!response.ok) throw new Error('Error fetching data from RAWG API');
    
    const data = await response.json();
    
    // normaliza los resultados para que encajen con lo que espera el frontend
    return data.results.map((game: any) => ({
        rawgId: game.id,
        title: game.name,
        coverUrl: game.background_image,
        releaseYear: game.released ? parseInt(game.released.split('-')[0]) : undefined,
        genres: game.genres.map((g: any) => g.name)
    }));
};

export const getGameDetails = async (rawgId: string) => {
    const response = await fetch(`${BASE_URL}/games/${rawgId}?key=${API_KEY}`);
    
    if (!response.ok) throw new Error('Error fetching data from RAWG API');
    
    const data = await response.json();
    
    return {
        rawgId: data.id,
        title: data.name,
        coverUrl: data.background_image,
        releaseYear: data.released ? parseInt(data.released.split('-')[0]) : undefined,
        genres: data.genres.map((g: any) => g.name),
        description: data.description_raw // trae la descripción limpia sin etiquetas HTML
    };
};