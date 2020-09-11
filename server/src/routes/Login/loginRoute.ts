import { Router } from 'express';
import loginController from '../../controllers/loginControllers';

class LoginRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.post('/api/login', loginController.loginUser);
    }
}

const loginRoutes = new LoginRoutes();
export default loginRoutes.router;