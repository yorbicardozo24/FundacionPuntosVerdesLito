import { Request, Response } from 'express';

import pool from '../database';

class DepartmentsController {

    public async getDepartments (req: Request, res: Response) {

        try {
            const departamentos = await pool.query('SELECT * FROM departamentos');

            if(departamentos.length > 0) {
                const departments: any[] = [];
                
                for(let i = 0; i < departamentos.length; i++) {
                    departments.push({
                        code: departamentos[i].id,
                        name: departamentos[i].nombre
                    });
                }
                
                return res.json({departments});
            }
        } catch (e) {
            return res.status(404).json({message: 'Not Result'});
        }

        return res.status(404).json({message: 'Not Result'});
        
    }

    public async getMunicipios (req: Request, res: Response) {
        const { id } = req.params;

        try {
            const municipios = await pool.query('SELECT * FROM municipios WHERE departamento_id = ?', [id]);

            if(municipios.length > 0) {
                const municipalities: any[] = [];

                for(let i = 0; i < municipios.length; i++) {
                    municipalities.push({
                        code: municipios[i].id,
                        name: municipios[i].nombre
                    });
                }
                return res.json({municipalities});
            }
        } catch (e) {
            return res.status(404).json({message: 'Not Result'});
        }

        return res.status(404).json({message: 'Not Result'});
    }
}

const departmentsController = new DepartmentsController();
export default departmentsController;
