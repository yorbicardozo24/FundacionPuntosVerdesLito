import { Router } from 'express';
import usersController from '../../controllers/usersControllers';
import { checkJwt } from '../../middlewares/jwt';
import { checkRole } from '../../middlewares/role';
import storage from '../../config/multer';
import multer from 'multer';

const uploader = multer({
    storage
}).single('file');

class UsersRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        // Get all users
        this.router.get('/api/users', [checkJwt, checkRole('ADMIN')], usersController.listUsers);

        // Get all admins
        this.router.get('/api/admins', [checkJwt, checkRole('ADMIN')], usersController.listAdmins);

        // Get one user
        this.router.get('/api/users/:id', [checkJwt], usersController.getUser);

        // Create new user
        this.router.post('/api/users', usersController.createUser);

        // Register user
        this.router.post('/api/users/register', uploader, usersController.registerUser);

        // Edit user
        this.router.put('/api/users/:id',[checkJwt],  usersController.putUser);

        // Edit user from ADMIN
        this.router.patch('/api/users/:id', [checkJwt, checkRole('ADMIN')], usersController.patchUser);

        // Change password
        this.router.post('/api/users/password/:id', [checkJwt], usersController.changePasswordUser);

        // Forget Password
        this.router.post('/api/users/forget-password', usersController.forgetPassword);

        // Forget Password Code
        this.router.post('/api/users/forget-password-code', usersController.forgetPasswordCode);

        // Change forget password
        this.router.post('/api/users/change-forget-password', usersController.changeForgetPassword);

        // Change status
        this.router.post('/api/users/status/:id', [checkJwt, checkRole('ADMIN')], usersController.changeStatus);

        // Delete user
        this.router.delete('/api/users/:id', [checkJwt, checkRole('ADMIN')], usersController.deleteUser);
    }
}

const usersRoutes = new UsersRoutes();
export default usersRoutes.router;