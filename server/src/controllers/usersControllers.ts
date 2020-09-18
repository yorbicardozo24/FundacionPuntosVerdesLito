import { Request, Response } from 'express';
import { validate } from 'class-validator';
import { User, UserData, PasswordData } from '../models/User';
import bcrypt from 'bcrypt';
import pool from '../database';

class UsersController {

    public async listUsers (req: Request, res: Response) {

        try {
            const users = await pool.query('SELECT * FROM users');

            if(users.length > 0) {
                const usersResults: any[] = [];

                for(let i = 0; i < users.length; i++) {
                    usersResults.push({
                        id: users[i].id,
                        name: users[i].name,
                        email: users[i].email,
                        nit: users[i].nit,
                        departments: {code: users[i].departmentId, name: users[i].departmentName},
                        municipios: {code: users[i].municipioCode, name: users[i].municipioName},
                        points: users[i].points,
                        role: users[i].role
                    });
                }
                return res.json({message: usersResults});

            }
        } catch (err) {
            return res.status(404).json({message: err});
        }

        res.status(404).json({message: 'No se encontraron resultados.'});

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
                    departments: {code: user[0].departmentId, name: user[0].departmentName},
                    municipios: {code: user[0].municipioCode, name: user[0].municipioName},
                });
            }
        } catch (err) {
            return res.status(404).json({message: err});
        }

        res.status(404).json({message: 'Usuario no encontrado.'});

    }

    public async createUser (req: Request, res: Response) {
        const { name, nit, email, password, role, points, departments, municipios } = req.body;

        let user = new User();
        user.name = name;
        user.nit = nit;
        user.email = email;

        if(!password) {
            user.password = email;
        }else{
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            user.password = hashedPassword;
        }
        
        user.role = role;
        user.points = points;
        user.departmentId = departments.code;
        user.departmentName = departments.name;
        user.municipioCode = municipios.code;
        user.municipioName = municipios.name;

        // Validate
        const errors = await validate(user, { validationError: { target: false, value: false }});

        if (errors.length > 0) {
            return res.status(400).json({message: errors});
        }
        
        try {
            await pool.query('INSERT INTO users set ?', [user]);
        } catch(err) {
            if(err.code == 'ER_DUP_ENTRY') {
                return res.status(409).json({message: 'Ya hay un usuario con este email.'});
            }

            res.status(409).json({message: err});
        }

        // All ok
        res.status(201).json({message: 'Usuario creado correctamente'});

    }

    public async patchUser (req: Request, res: Response) {
        const { id } = req.params;
        const { name, nit, email, role, points, departments, municipios } = req.body;


        let user = new User();
        user.name = name;
        user.nit = nit;
        user.email = email;
        user.role = role;
        user.points = points;
        user.departmentId = departments.code;
        user.departmentName = departments.name;
        user.municipioCode = municipios.code;
        user.municipioName = municipios.name;

        // Validate
        const errors = await validate(user, { validationError: { target: false, value: false }});

        if (errors.length > 0) {
            return res.status(400).json({message: errors});
        }
        
        try {
            await pool.query('UPDATE users set ? WHERE id = ?', [user, id] );
        } catch(err) {
            if(err.code == 'ER_DUP_ENTRY') {
                return res.status(409).json({message: 'Ya hay un usuario con este email.'});
            }

            res.status(409).json({message: err});
        }

        // All ok
        res.status(201).json({message: 'Usuario actualizado correctamente'});

    }

    public async putUser (req: Request, res: Response) {
        let user = new UserData();
        const { id } = req.params;
        const { name, departments, municipios  } = req.body;

        // Try to save user
        try {
            user.name = name;
            user.departmentId = departments.code;
            user.departmentName = departments.name;
            user.municipioCode = municipios.code;
            user.municipioName = municipios.name;

            const errors = await validate(user, { validationError: { target: false, value: false }});
            if (errors.length > 0) {
                return res.status(400).json(errors);
            }

            const userUpdated = await pool.query('UPDATE users set ? WHERE id = ?', [user, id] );
            if(userUpdated.changedRows > 0) {
                return res.status(201).json({message: 'Usuario actualizado correctamente.'});
            }

        } catch (err) {
            return res.status(409).json({message: err});
        }

        return res.status(409).json({message: 'Usuario no encontrado.'});

    }

    public async changePasswordUser (req: Request, res: Response) {
        let passwordData = new PasswordData(); 
        const { id } = req.params;
        const { oldpassword, newPassword } = req.body;

        if (!(oldpassword && newPassword)) {
            return res.status(400).json({message: 'La contraseña actual y la nueva son requeridas!'});
        }

        try {

            const user = await pool.query('SELECT * FROM users WHERE id = ?', [id]);

            if (user.length > 0) {
                const userPassword = user[0].password;

                if (bcrypt.compareSync(oldpassword, userPassword)) {

                    const salt = await bcrypt.genSalt(10);
                    passwordData.password = await bcrypt.hash(newPassword, salt);

                    const passwordUpdated = await pool.query('UPDATE users set ? WHERE id = ?', [passwordData, id] );
                    
                    if(passwordUpdated.changedRows > 0) {
                        return res.status(201).json({message: 'Contraseña actualizada correctamente.'});
                    }
                }else{
                    return res.status(400).json({message: 'Contraseña actual incorrecta.'})
                }
            }

        } catch (err) {
            return res.status(409).json({message: err});
        }

        return res.status(409).json({message: 'Usuario no encontrado.'});
    } 

    public async deleteUser (req: Request, res: Response) {
        const { id } = req.params;

        try {

            const user = await pool.query('DELETE FROM users WHERE id = ?', [id]);
            
            if(user.affectedRows > 0) {
                return res.status(201).json({message: 'Usuario eliminado correctamente.'});
            }

        } catch(err) {
            return res.status(404).json({message: err});
        }

        res.status(404).json({message: 'Usuario no encontrado.'});
        
    }
}

const usersController = new UsersController();
export default usersController;
