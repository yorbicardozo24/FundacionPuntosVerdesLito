import { Request, Response } from 'express';

import pool from '../database';

class UsersController {

    public async listUsers (req: Request, res: Response) {
        const users = await pool.query('SELECT * FROM users');
        res.json({
            users
        })
    }

    public async getUser (req: Request, res: Response) {
        const { id } = req.params;
        const user = await pool.query('SELECT * FROM users WHERE id = ?', [id]);

        if(user.length > 0) {
            return res.json(user[0]);
        }
        
        res.status(404).json({
            message: 'Usuario no existe'
        });
    }

    public async createUser (req: Request, res: Response) {
        await pool.query('INSERT INTO users set ?', [req.body]);
        res.json({
            message: 'Usuario creado correctamente'
        });
    }

    public async putUser (req: Request, res: Response) {
        const { id } = req.params;
        const user = await pool.query('UPDATE users set ? WHERE id = ?', [req.body, id] );

        if(user.changedRows > 0) {
            return res.json({
                message: 'Usuario actualizado correctamente'
            });
        }

        res.status(404).json({
            message: 'Usuario no actualizado o no existe'
        });
    
    }

    public async deleteUser (req: Request, res: Response) {
        const { id } = req.params;
        const user = await pool.query('DELETE FROM users WHERE id = ?', [id]);

        if(user.changedRows > 0) {
            return res.json({
                message: 'Usuario eliminado correctamente'
            });
        }
        
        res.status(404).json({
            message: 'Usuario no fue eliminado o no existe'
        });
    }
}

const usersController = new UsersController();
export default usersController;
