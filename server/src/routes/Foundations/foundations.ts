import { Router } from 'express';
import FoundationsController from '../../controllers/foundationsController';
import { checkJwt } from '../../middlewares/jwt';
import { checkRole } from '../../middlewares/role';

class Foundations {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/api/foundations', [checkJwt], FoundationsController.getFoundations);
        this.router.post('/api/foundations', [checkJwt, checkRole('ADMIN')], FoundationsController.createFoundation);
        this.router.put('/api/foundations/:id', [checkJwt, checkRole('ADMIN')], FoundationsController.updateFoundation);
        this.router.delete('/api/foundations/:id', [checkJwt, checkRole('ADMIN')], FoundationsController.deleteFoundation);
    }
}

const foundations = new Foundations();
export default foundations.router;