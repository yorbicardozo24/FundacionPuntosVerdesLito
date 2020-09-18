import { Request, Response, NextFunction } from 'express';

import * as jwt from 'jsonwebtoken';
import config from '../config/config';

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
    const token = <string>req.headers['auth'];
    let jwtPayLoad;

    try {
        jwtPayLoad = <any>jwt.verify(token, config.jwtSecret);
        res.locals.jwtPayLoad = jwtPayLoad;
    } catch (e) {
        return res.status(401).json({message: 'Token Unauthorized'});
    }

    const { userId, name, email } = jwtPayLoad;

    const newToken = jwt.sign({ userId, name, email }, config.jwtSecret, { expiresIn: '8h' });
    res.setHeader('token', newToken);
    // Call next
    next();
};