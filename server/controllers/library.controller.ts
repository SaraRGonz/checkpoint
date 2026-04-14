import { Request, Response } from 'express';
import * as libraryService from '../services/library.service';

export const getGames = async (req: Request, res: Response) => {
    try {
        const games = await libraryService.getAllGames();
        res.status(200).json({ data: games, total: games.length });
    } catch (error) {
        res.status(500).json({ error: { code: 'SERVER_ERROR', message: 'Error fetching library' } });
    }
};

export const createGame = async (req: Request, res: Response) => {
    try {
        const newGameData = req.body; // aquí vienen los datos del frontend
        
        // validación básica y error
        if (!newGameData.title || !newGameData.platform || !newGameData.status) {
            return res.status(400).json({ error: { code: 'BAD_REQUEST', message: 'Missing required fields' } });
        }

        const newGame = await libraryService.addGame(newGameData);
        res.status(201).json(newGame); // creado con éxito
    } catch (error) {
        res.status(500).json({ error: { code: 'SERVER_ERROR', message: 'Error adding game' } });
    }
};

export const updateGame = async (req: Request, res: Response) => {
    try {
        const { id } = req.params; // saca el ID de la URL (/api/v1/library/1234)
        const updates = req.body;
        
        const updatedGame = await libraryService.updateGame(id as string, updates);
        
        if (!updatedGame) {
            return res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Game not found' } });
        }
        
        res.status(200).json(updatedGame);
    } catch (error) {
        res.status(500).json({ error: { code: 'SERVER_ERROR', message: 'Error updating game' } });
    }
};

export const deleteGame = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const success = await libraryService.deleteGame(id as string);
        
        if (!success) {
            return res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Game not found' } });
        }
        
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: { code: 'SERVER_ERROR', message: 'Error deleting game' } });
    }
};