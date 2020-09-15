import { Router } from 'express';
import DepartmentsController from '../../controllers/departamentos';

class Departamentos {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/api/departments', DepartmentsController.getDepartments);
        this.router.get('/api/departments/:id', DepartmentsController.getMunicipios);
    }
}

const departamentos = new Departamentos();
export default departamentos.router;