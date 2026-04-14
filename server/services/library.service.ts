import fs from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid'; // herramienta para crear IDs únicos
import { Game } from '../types/game';

// ruta al archivo JSON
const dataPath = path.join(__dirname, '../data/library.json');

// --- FUNCIONES INTERNAS ---
const getLibrary = async (): Promise<Game[]> => {
    try {
        const data = await fs.readFile(dataPath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        return []; // si el archivo no existe o falla, devuelve array vacío
    }
};

const saveLibrary = async (games: Game[]): Promise<void> => {
    // convierte el array a texto JSON con 2 espacios y lo guarda
    await fs.writeFile(dataPath, JSON.stringify(games, null, 2), 'utf-8');
};

// --- FUNCIONES EXPORTADAS (CRUD ) ---

export const getAllGames = async (): Promise<Game[]> => {
    return await getLibrary();
};

export const addGame = async (gameData: Omit<Game, 'id'>): Promise<Game> => {
    const games = await getLibrary();
    
    const newGame: Game = {
        ...gameData,
        id: uuidv4(), // le genera un ID seguro en el backend
        addedAt: new Date().toISOString()
    };
    
    games.push(newGame);
    await saveLibrary(games);
    return newGame;
};

export const updateGame = async (id: string, updates: Partial<Game>): Promise<Game | null> => {
    const games = await getLibrary();
    const index = games.findIndex(g => g.id === id);
    
    if (index === -1) return null; // si no encuentra el juego devuelve null

    // fusiona los datos viejos con los nuevos y actualiza la fecha
    games[index] = { ...games[index], ...updates, updatedAt: new Date().toISOString() };
    await saveLibrary(games);
    return games[index];
};

export const deleteGame = async (id: string): Promise<boolean> => {
    const games = await getLibrary();
    const filteredGames = games.filter(g => g.id !== id);
    
    if (games.length === filteredGames.length) return false; // no se borró nada
    
    await saveLibrary(filteredGames);
    return true; // borrado con éxito
};