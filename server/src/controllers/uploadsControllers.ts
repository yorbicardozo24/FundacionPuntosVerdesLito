import { Request, Response } from 'express';
import path from 'path';
import bcrypt from 'bcrypt';
import pool from '../database';

const xlsx = require('node-xlsx');

class UploadsController {
    public async uploadExcel (req: Request, res: Response) {
        
        const filePath = path.resolve(req.file.path);
        const obj = xlsx.parse(filePath);
        
        let name = '';
        let nit = '';
        let email = '';
        let points = 0;
        let password = '';
        let role = 'USER';

        for (let i = 5; i < obj[0].data.length; i++) {

            nit = obj[0].data[i][4];

            if(nit !== undefined) {

                nit = nit.trim(); //Elimino los espacios
                name = obj[0].data[i][5];
                email = obj[0].data[i][12];
                if(email !== undefined){
                    email = email.trim();
                }else{
                    email = nit;
                }
                password = nit;
                const salt = await bcrypt.genSalt(10);
                password = await bcrypt.hash(password, salt);
                points = Math.trunc(obj[0].data[i][11]);

                try {
                    let user = await pool.query('SELECT * FROM users WHERE nit = ?', [nit]);
                    if(user.length > 0) {
                        points = user[0].points + points;
                        try {
                            await pool.query('UPDATE users set ? WHERE nit = ?', [{points}, nit]);
                        } catch (err) {
                            return res.status(404).json({message: err});
                        }
                    } else {
                        try {
                            await pool.query('INSERT INTO users set ?', [{name, nit, email, password, role, points}]);
                        } catch (err) {
                            return res.status(404).json({message: err});
                        }
                    }
                } catch (err) {
                    return res.status(404).json({message: err});
                }

            }
            
        }

        
        return res.json({message: 'Fichero subido correctamente'});
    }
}

const uploadsController = new UploadsController();
export default uploadsController;
