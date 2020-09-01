import { Request, Response } from 'express';

class IndexController {

    public index (req: Request, res: Response) {
        res.json({
            text: 'Api is /api/users'
        })
    }
}

export const indexController = new IndexController();