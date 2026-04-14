import { Router } from 'express';
import { getGames, createGame, updateGame, deleteGame } from '../controllers/library.controller';

const router = Router();

// define el CRUD y lo ata al controlador
router.get('/', getGames);              // obtener todos
router.post('/', createGame);           // añadir nuevo
router.put('/:id', updateGame);         // actualizar por ID
router.delete('/:id', deleteGame);      // borrar por ID

export default router;