import { Request, Response } from 'express';
import { validate } from 'class-validator';
import { User } from '../models/User';
import bcrypt from 'bcrypt';
import pool from '../database';

class UsersController {

    public async listUsers (req: Request, res: Response) {

        try {
            const users = await pool.query('SELECT * FROM users');

            if(users.length > 0) {
                return res.json({users});
            }
        } catch (e) {
            return res.status(404).json({message: 'Not Result'});
        }

        res.status(404).json({message: 'Not Result'});

    }

    public async getUser (req: Request, res: Response) {
        const { id } = req.params;

        try {
            const user = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
            if(user.length > 0) {
                return res.json({
                    name: user[0].name,
                    nit: user[0].nit,
                    email: user[0].email,
                    departments: user[0].departments,
                    city: user[0].city,
                });
            }
        } catch (e) {
            return res.status(404).json({message: 'Not Result'});
        }

        res.status(404).json({message: 'Not Result'});

    }

    public async createUser (req: Request, res: Response) {
        const { name, nit, email, password, image, role, points, departments, city } = req.body;

        let user = new User();
        user.name = name;
        user.nit = nit;
        user.email = email;

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        user.password = hashedPassword;
        user.image = image;
        user.role = role;
        user.points = points;
        user.departments = departments;
        user.city = city;

        // Validate
        const errors = await validate(user, { validationError: { target: false, value: false }});

        if (errors.length > 0) {
            return res.status(400).json(errors);
        }
        
        try {
            await pool.query('INSERT INTO users set ?', [user]);
        } catch(err) {
            if(err.code == 'ER_DUP_ENTRY') {
                return res.status(409).json({message: 'Email already exist'});
            }

            res.status(409).json({err});
        }

        // All ok
        res.status(201).json({message: 'Usuario creado correctamente'});

    }

    public async putUser (req: Request, res: Response) {
        let user = new User();
        const { id } = req.params;
        const { name, nit, password, image, role, points, departments, city } = req.body;

        try {

            const userResult = await pool.query('SELECT * FROM users WHERE id = ?', [id]);

            user.name = name;
            user.nit = nit;
            user.password = bcrypt.hashSync(password, 10);
            user.image = image;
            user.role = role;
            user.points = points;
            user.departments = departments;
            user.city = city;

        } catch (err) {
            return res.status(404).json({message: 'User not found'});
        }

        const errors = await validate(user, { validationError: { target: false, value: false }});
        if (errors.length > 0) {
            return res.status(400).json(errors);
        }

        // Try to save user
        try {
            const userUpdated = await pool.query('UPDATE users set ? WHERE id = ?', [user, id] );
            if(userUpdated.changedRows > 0) {
                return res.status(201).json({message: 'User updated'});
            }

        } catch (e) {
            return res.status(409).json({e});
        }

    }

    public async deleteUser (req: Request, res: Response) {
        const { id } = req.params;

        try {

            const user = await pool.query('DELETE FROM users WHERE id = ?', [id]);
            
            if(user.affectedRows > 0) {
                return res.status(201).json({message: 'User deleted'});
            }

        } catch(e) {
            return res.status(404).json({message: 'User not found'});
        }

        res.status(404).json({message: 'User not found'});
        
    }
}

const usersController = new UsersController();
export default usersController;
