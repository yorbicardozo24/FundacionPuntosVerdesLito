import { Request, Response } from 'express';

import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';
import pool from '../database';
import config from '../config/config';

class LoginController {

    public async loginUser (req: Request, res: Response) {
        const { email, password } = req.body;

        if (!(email && password)) {
            return res.status(400).json({message: 'Usarname & password are requeried!'});
        }

        const user = await pool.query('SELECT * FROM users WHERE email = ?', [email]);

        if (user.length > 0) {
            const userPassword = user[0].password;

            if (bcrypt.compareSync(password, userPassword)) {
                
                // Creación del token
                let token = jsonwebtoken.sign({
                    userId: user[0].id,
                    name: user[0].name,
                    email: user[0].email
                }, config.jwtSecret, { expiresIn: '2h'});

                return res.json({ message: 'OK', userId: user[0].id, userName: user[0].name, token, userPoints: user[0].points, role: user[0].role });
            }

        }

        return res.status(404).json({message: 'Email or password incorrect'});
        
    }
}

const loginController = new LoginController();
export default loginController;
