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
        let status = false;

        res.json({message: `${obj[0].data.length - 1} registros a procesar.`, count: obj[0].data.length - 1});

        for (let i = 1; i < obj[0].data.length; i++) {

            await pool.query('UPDATE count set ? WHERE id = ?', [{number: i}, 1]);

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
                points = obj[0].data[i][11];
                if(points > 0) {
                    points = Math.trunc(obj[0].data[i][11]);
                } else {
                    points = 0;
                }

                try {
                    let user = await pool.query('SELECT * FROM users WHERE nit = ?', [nit]);
                    if(user.length > 0) {
                        points = user[0].points + points;
                        await pool.query('UPDATE users set ? WHERE nit = ?', [{points}, nit]);
                    } else {
                        await pool.query('INSERT INTO users set ?', [{name, nit, email, password, role, points, status}]);
                    }
                } catch (err) {
                    return await pool.query('UPDATE count set ? WHERE id = ?', [{number: 0}, 1]);
                }
            }
        }
    }

    public async count (req: Request, res: Response) {

        try {
            const count =  await pool.query('SELECT * FROM count WHERE id = ?', [1]);
            return res.json({message: count[0].number});
        } catch (err) {
            return res.json({message: err});
        }
    
    }

    public async uploadImage (req: Request, res: Response) {
        const { id } = req.params;
        const originalName = req.file.filename;
        // const filePath = 'http://localhost:3000/build/public/uploads/' + originalName;
        // const filePath = path.resolve(req.file.path);

        // try {
        //     await pool.query('UPDATE users set ? WHERE id = ?', [{image: originalName}, id]);
        // } catch (err) {
        //     return res.status(404).json({message: err});
        // }

        return res.status(200).json({message: 'OK'});
    }
}

const uploadsController = new UploadsController();
export default uploadsController;
