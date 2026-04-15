import { Request, Response, NextFunction } from 'express';
import * as libraryService from '../services/library.service';

export const getGames = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const games = await libraryService.getAllGames();
        res.status(200).json({ data: games, total: games.length });
    } catch (error) {
        next(error); 
    }
};
export const createGame = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const newGameData = req.body; // aquí vienen los datos del frontend
        const newGame = await libraryService.addGame(newGameData);
        res.status(201).json(newGame);
    } catch (error) {
        next(error);
    }
};

export const updateGame = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params; // saca el ID de la URL (/api/v1/library/1234)
        const updates = req.body;
        
        const updatedGame = await libraryService.updateGame(id as string, updates);
        
        if (!updatedGame) {
            return res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Game not found' } });
        }
        
        res.status(200).json(updatedGame);
    } catch (error) {
        next(error);
    }
};

export const deleteGame = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const success = await libraryService.deleteGame(id as string);
        
        if (!success) {
            return res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Game not found' } });
        }
        
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};