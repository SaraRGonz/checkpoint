import { Router } from 'express';
import { searchGames, getGameDetails } from '../controllers/games.controller';

const router = Router();

router.get('/search', searchGames); // renderiza en /api/v1/games/search?q=...
router.get('/:id', getGameDetails); // renderiza en /api/v1/games/1234

export default router;