import dotenv from 'dotenv';

// carga las variables del archivo .env
dotenv.config();

// extrae y exporta las variables dando valores por defecto o lanzando errores si faltan
export const env = {
    PORT: process.env.PORT || 3000,
    RAWG_API_KEY: process.env.RAWG_API_KEY || ''
};

// lanza un error si no hfunciona la API KEY
if (!env.RAWG_API_KEY) {
    console.error('RAWG_API_KEY not found in .env file');
}