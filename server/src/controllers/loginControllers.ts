import { Request, Response } from 'express';

import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';
import pool from '../database';

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
                    name: user[0].name,
                    last_name: user[0].last_name,
                    email: user[0].email
                }, 'fundacion-puntosVerdes/lito', { expiresIn: 60 * 60 * 24 * 1}); // Token expira en un día

                return res.json({
                    message: 'OK',
                    token,
                    userId: user[0].id,
                    role: user[0].role
                });
            }

        }

        return res.status(400).json({message: 'Email or password incorrect'});
        
    }
}

const loginController = new LoginController();
export default loginController;
