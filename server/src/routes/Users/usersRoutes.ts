import { Router } from 'express';
import usersController from '../../controllers/usersControllers';

class UsersRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/api/users', usersController.index);
    }
}

const usersRoutes = new UsersRoutes();
export default usersRoutes.router;