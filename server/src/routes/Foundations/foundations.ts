import { Router } from 'express';
import FoundationsController from '../../controllers/foundationsController';
import { checkJwt } from '../../middlewares/jwt';
import { checkRole } from '../../middlewares/role';
import storage from '../../config/multer';
import multer from 'multer';

const uploader = multer({
    storage
}).single('file');

class Foundations {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/api/foundations', [checkJwt], FoundationsController.getFoundations);
        this.router.get('/api/history/:id', [checkJwt], FoundationsController.history);
        this.router.get('/api/historyadmin', [checkJwt, checkRole('ADMIN')], FoundationsController.historyAdmin);
        this.router.get('/api/report', [checkJwt, checkRole('ADMIN')], FoundationsController.report);
        this.router.get('/api/ods', [checkJwt], FoundationsController.getOds);
        this.router.get('/api/cs', [checkJwt], FoundationsController.getCs);
        this.router.get('/api/clearpoints', [checkJwt, checkRole('ADMIN')], FoundationsController.deletePoints);
        this.router.post('/api/foundations', uploader, [checkJwt, checkRole('ADMIN')], FoundationsController.createFoundation);
        this.router.post('/api/foundations/donate/:id', [checkJwt], FoundationsController.donatePoints);
        this.router.post('/api/sendpoints', FoundationsController.sendPoints);
        this.router.put('/api/foundations/:id', [checkJwt, checkRole('ADMIN')], FoundationsController.updateFoundation);
        this.router.delete('/api/foundations/:id', [checkJwt, checkRole('ADMIN')], FoundationsController.deleteFoundation);
    }
}

const foundations = new Foundations();
export default foundations.router;