import { Router } from 'express';
import usersController from '../../controllers/usersControllers';
import { checkJwt } from '../../middlewares/jwt';
import { checkRole } from '../../middlewares/role';

class UsersRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        // Get all users
        this.router.get('/api/users', [checkJwt, checkRole('ADMIN')], usersController.listUsers);

        // Get one user
        this.router.get('/api/users/:id', [checkJwt], usersController.getUser);

        // Create new user
        this.router.post('/api/users', usersController.createUser);

        // Edit user
        this.router.put('/api/users/:id',[checkJwt],  usersController.putUser);

        // Change password
        this.router.post('/api/users/password/:id', [checkJwt], usersController.changePasswordUser);

        // Delete user
        this.router.delete('/api/users/:id', [checkJwt, checkRole('ADMIN')], usersController.deleteUser);
    }
}

const usersRoutes = new UsersRoutes();
export default usersRoutes.router;