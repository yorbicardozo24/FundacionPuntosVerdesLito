import { Request, Response, NextFunction } from 'express';
import pool from '../database';

export const checkRole = (roles:string) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const userId = res.locals.jwtPayLoad.userId;

        try {
            const user = await pool.query('SELECT * FROM users WHERE id = ?', [userId]);
            if(user.length > 0) {
                const role = user[0].role;

                if (roles == role) {
                    next();
                } else {
                    return res.status(401).json({message: 'Not Authorized'});
                }
            } else {
                return res.status(404).json({message: 'Not Result'});
            }
        } catch (e) {
            return res.status(401).json({message: 'Not Authorized'});
        }

    };
}