import { Request, Response, NextFunction } from 'express';

// express sabe que es un middleware de errores porque tiene 4 parámetros err, req, res y next
export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.error('Error handled by middleware:', err);

    const statusCode = err.status || 500;
    const code = err.code || 'SERVER_ERROR';
    const message = err.message || 'Internal server error';

    res.status(statusCode).json({
        error: { code, message }
    });
};