import { Router } from 'express';
import uploadsController from '../../controllers/uploadsControllers';
import { checkJwt } from '../../middlewares/jwt';
import { checkRole } from '../../middlewares/role';
import storage from '../../config/multer';
import multer from 'multer';

const uploader = multer({
    storage
}).single('file');

class UploadsRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.post('/api/upload/excel', uploader, [checkJwt, checkRole('ADMIN')], uploadsController.uploadExcel);
        this.router.post('/api/upload/image/:id', uploader, [checkJwt], uploadsController.uploadImage);
        this.router.get('/api/upload/count', [checkJwt, checkRole('ADMIN')], uploadsController.count);
    }
}

const uploadsRoutes = new UploadsRoutes();
export default uploadsRoutes.router;