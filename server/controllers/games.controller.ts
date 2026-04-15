import { Request, Response, NextFunction } from 'express';
import * as rawgService from '../services/rawg.service';

export const searchGames = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const query = req.query.q as string; // extrae ?q=zelda de la URL
        
        // manejo de error si falta el parámetro
        if (!query) {
            // crea el error y se lo pasa al middleware
            const err: any = new Error('Search parameter "q" is required');
            err.status = 400;
            err.code = 'BAD_REQUEST';
            return next(err);
        }

        const results = await rawgService.searchGames(query);
        res.status(200).json({ results, count: results.length });
        
    } catch (error: any) {
        // 502 Bad Gateway indica que el servidor ha fallado al comunicarse con otro servidor (RAWG)
        error.status = 502;
        error.code = 'BAD_GATEWAY';
        error.message = 'Failed to communicate with RAWG API';
        next(error);
    }
};

export const getGameDetails = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const game = await rawgService.getGameDetails(id as string);
        res.status(200).json(game);
    } catch (error: any) {
        error.status = 502;
        error.code = 'BAD_GATEWAY';
        error.message = 'Game not found or RAWG API communication error';
        next(error);
    }
};