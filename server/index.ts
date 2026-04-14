import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import libraryRoutes from './routes/library.routes';
import gamesRoutes from './routes/games.routes';

// cargar variables de entorno
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// middlewares globales
app.use(cors()); // permite peticiones desde el frontend
app.use(express.json()); // permite al servidor entender JSON en el body (para POST y PUT)

// ruta de prueba para comprobar que el servidor está vivo
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'ok', message: 'Checkpoint API is running' });
});

// conecta la ruta base /api/v1/library con el archivo de rutas
app.use('/api/v1/library', libraryRoutes);
app.use('/api/v1/games', gamesRoutes);

// arrancar el servidor
app.listen(PORT, () => {
    console.log(`Backend server on http://localhost:${PORT}`);
});