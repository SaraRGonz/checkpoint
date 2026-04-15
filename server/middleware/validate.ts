import { Request, Response, NextFunction } from 'express';
import { ZodType, ZodError } from 'zod';

export const validate = (schema: ZodType<any, any, any>) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            // comprueba el body los params de la URL y las query strings
            await schema.parseAsync({
                body: req.body,
                query: req.query,
                params: req.params,
            });
            next(); // si todo está bien pasa al controlador
        } catch (error) {
            if (error instanceof ZodError) {
                // si hay un error se pasa en el formato estandar de la app
                return res.status(400).json({
                    error: {
                        code: 'VALIDATION_ERROR',
                        message: 'Invalid data provided',
                        details: error.issues.map((e: any) => ({ field: e.path.join('.'), message: e.message }))
                    }
                });
            }
            next(error);
        }
    };
};