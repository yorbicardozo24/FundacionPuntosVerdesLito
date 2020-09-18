import { Request, Response } from 'express';
import { Foundation } from '../models/Foundations';
import { validate } from 'class-validator';
import pool from '../database';

class FoundationsController {

    public async getFoundations (req: Request, res: Response) {

        try {
            const foundations = await pool.query('SELECT * FROM foundations');

            if(foundations.length > 0) {
                return res.json({foundations});
            }
        } catch (e) {
            return res.status(404).json({message: 'Not Result'});
        }

        res.status(404).json({message: 'Not Result'});
        
    }

    public async createFoundation (req: Request, res: Response) {
        const { name, description, image, points } = req.body;

        if(!(name && description && points)){
            return res.status(400).json({message: 'El nombre, descripción y puntos son requeridos!'});
        }

        let foundation = new Foundation();

        foundation = {name, description, image, points};

        // Validate
        const errors = await validate(foundation, { validationError: { target: false, value: false }});

        if (errors.length > 0) {
            return res.status(400).json({message: errors});
        }

        try {
            await pool.query('INSERT INTO foundations set ?', [foundation]);
        } catch (err) {
            return res.status(409).json({message: err});
        }

        return res.status(200).json({message: 'Fundación creada correctamente'});
    }

    public async updateFoundation (req: Request, res: Response) {
        const { id } = req.params;
        const { name, description, image, points } = req.body;

        if(!(name && description && points)){
            return res.status(400).json({message: 'El nombre, descripción y puntos son requeridos!'});
        }

        let foundation = new Foundation();

        foundation = {name, description, image, points};

        // Validate
        const errors = await validate(foundation, { validationError: { target: false, value: false }});

        if (errors.length > 0) {
            return res.status(400).json({message: errors});
        }

        try {
            await pool.query('UPDATE foundations set ? WHERE id = ?', [foundation, id]);
        } catch (err) {
            return res.status(409).json({message: err});
        }

        return res.status(200).json({message: 'Fundación actualizada correctamente'});
    }

    public async deleteFoundation (req: Request, res: Response) {
        const { id } = req.params;

        try {

            const foundation = await pool.query('DELETE FROM foundations WHERE id = ?', [id]);
            
            if(foundation.affectedRows > 0) {
                return res.status(201).json({message: 'Fundación eliminada correctamente.'});
            }

        } catch(err) {
            return res.status(404).json({message: err});
        }

        res.status(404).json({message: 'Fundación no encontrada.'});
    }

}

const foundationsController = new FoundationsController();
export default foundationsController;
