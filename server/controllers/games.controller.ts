import { Request, Response } from 'express';
import * as rawgService from '../services/rawg.service';

export const searchGames = async (req: Request, res: Response) => {
    try {
        const query = req.query.q as string; // extrae ?q=zelda de la URL
        
        // manejo de error estandarizado si falta el parámetro
        if (!query) {
            return res.status(400).json({ 
                error: { code: 'BAD_REQUEST', message: 'El parámetro de búsqueda "q" es obligatorio' } 
            });
        }

        const results = await rawgService.searchGames(query);
        res.status(200).json({ results, count: results.length });
        
    } catch (error) {
        // 502 Bad Gateway indica que el servidor ha fallado al comunicarse con otro servidor (RAWG)
        res.status(502).json({ 
            error: { code: 'BAD_GATEWAY', message: 'Error de comunicación con RAWG API' } 
        });
    }
};

export const getGameDetails = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const game = await rawgService.getGameDetails(id as string);
        res.status(200).json(game);
    } catch (error) {
        res.status(502).json({ 
            error: { code: 'BAD_GATEWAY', message: 'Juego no encontrado o error en RAWG' } 
        });
    }
};