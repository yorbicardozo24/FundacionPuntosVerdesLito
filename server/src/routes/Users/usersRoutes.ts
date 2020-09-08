import { Router } from 'express';
import usersController from '../../controllers/usersControllers';

class UsersRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/api/users', usersController.listUsers);
        this.router.get('/api/users/:id', usersController.getUser);
        this.router.post('/api/users', usersController.createUser);
        this.router.put('/api/users/:id', usersController.putUser);
        this.router.delete('/api/users/:id', usersController.deleteUser);
    }
}

const usersRoutes = new UsersRoutes();
export default usersRoutes.router;