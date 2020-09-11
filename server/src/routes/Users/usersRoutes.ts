import { Router } from 'express';
import usersController from '../../controllers/usersControllers';
import { checkJwt } from '../../middlewares/jwt';

class UsersRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/api/users', [checkJwt], usersController.listUsers);
        this.router.get('/api/users/:id', [checkJwt], usersController.getUser);
        this.router.post('/api/users', [checkJwt], usersController.createUser);
        this.router.put('/api/users/:id',[checkJwt],  usersController.putUser);
        this.router.delete('/api/users/:id', [checkJwt], usersController.deleteUser);
    }
}

const usersRoutes = new UsersRoutes();
export default usersRoutes.router;