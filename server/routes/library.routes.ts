import { Router } from 'express';
import { getGames, createGame, updateGame, deleteGame } from '../controllers/library.controller';
import { z } from 'zod';
import { validate } from '../middleware/validate';

const router = Router();

// define los esquemas de zod
const createGameSchema = z.object({
    body: z.object({
        title: z.string().min(1, { message: 'Title is required' }),
        platform: z.string().min(1, { message: 'Platform is required' }),
        status: z.enum(['Wishlist', 'Queue', 'Playing', 'Completed', 'Dropped']),
        coverUrl: z.string().optional(),
        rawgId: z.number().optional(),
        genres: z.array(z.string()).optional(),
        releaseYear: z.number().optional()
    })
});

const updateGameSchema = z.object({
    body: z.object({
        status: z.enum(['Wishlist', 'Queue', 'Playing', 'Completed', 'Dropped']).optional(),
        platform: z.string().optional(),
        rating: z.number().min(1).max(5).optional(),
        review: z.string().optional()
    })
});

// define el CRUD y lo ata al controlador
// inyecta el middleware validate en las rutas que reciben datos
router.get('/', getGames);
router.post('/', validate(createGameSchema), createGame); 
router.put('/:id', validate(updateGameSchema), updateGame);
router.delete('/:id', deleteGame);

export default router;