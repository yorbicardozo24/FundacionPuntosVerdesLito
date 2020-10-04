import { Request, Response } from 'express';
import { Donate, DonateHistory, Foundation, FoundationEdit } from '../models/Foundations';
import { validate } from 'class-validator';
import pool from '../database';

class FoundationsController {

    public async getFoundations (req: Request, res: Response) {

        try {
            const foundations = await pool.query(`
                SELECT 
                    foundations.id,
                    foundations.name,
                    foundations.nit,
                    foundations.email,
                    foundations.description,
                    foundations.points,
                    foundations.cs,
                    foundations.ods,
                    foundations.dpto as dptoId,
                    foundations.municipio as municipioId,
                    departamentos.nombre as dpto,
                    municipios.nombre as municipio,
                    foundations.image
                FROM foundations
                    INNER JOIN departamentos ON foundations.dpto = departamentos.id
                    INNER JOIN municipios ON foundations.municipio = municipios.id
            `);

            if(foundations.length > 0) {
                const foundationResult: any[] = [];
                for(let i = 0; i < foundations.length; i++) {
                    
                    let csJson = JSON.parse(foundations[i].cs);
                    let csResultByone = [];
                
                    for(let x = 0; x < csJson.length; x++) {
                        const csName =  await pool.query('SELECT * FROM cs WHERE code = ?', [csJson[x].code]);
                        for(let r = 0; r < csName.length; r++) {
                            csResultByone.push({
                                code: csName[r].code,
                                name: csName[r].name
                            });
                        }
                    }

                    let odsJson = JSON.parse(foundations[i].ods);
                    let odsResultByone = [];

                    for(let x = 0; x < odsJson.length; x++) {
                        const odsName =  await pool.query('SELECT * FROM ods WHERE code = ?', [odsJson[x].code]);
                        for(let r = 0; r < odsName.length; r++) {
                            odsResultByone.push({
                                code: odsName[r].code,
                                name: odsName[r].name
                            });
                        }
                    }

                    foundationResult.push({
                        id: foundations[i].id,
                        name: foundations[i].name,
                        email: foundations[i].email,
                        nit: foundations[i].nit,
                        description: foundations[i].description,
                        cs: csResultByone,
                        ods: odsResultByone,
                        departments: {code: foundations[i].dptoId, name: foundations[i].dpto},
                        municipios: {code: foundations[i].municipioId, name: foundations[i].municipio},
                        points: foundations[i].points,
                        image: foundations[i].image
                    });
                }
                return res.json({message: foundationResult});
            }
        } catch (err) {
            return res.status(404).json({message: err});
        }

        return res.status(404).json({message: 'Not Result'});
        
    }

    public async getOds (req: Request, res: Response) {
        try{
            const ods = await pool.query('SELECT * FROM ods');
            if(ods.length > 0) {
                return res.json({message: ods});
            }
        } catch (err) {
            return res.status(400).json({message: err});
        }

        return res.status(404).json({message: 'Not Result'});
    }

    public async getCs (req: Request, res: Response) {
        try {
            const cs = await pool.query('SELECT * FROM cs');
            if(cs.length > 0) {
                return res.json({message: cs});
            }
        } catch (err) {
            return res.status(400).json({message: err});
        }

        return res.status(404).json({message: 'Not Result'});
    }

    public async createFoundation (req: Request, res: Response) {
        const { name, description, points, nit, email, cs, ods, departmentCode, municipioCode } = req.body;
        if(!(req.file.path)) {
            return res.status(400).json({message: 'Datos incompletos!'});
        }
        const image = req.file.path;

        if(!(name && description && points && nit && email && cs && ods && departmentCode && municipioCode && image)){
            return res.status(400).json({message: 'Datos incompletos!'});
        }

        let foundation = new Foundation();

        foundation = {name, nit, email, description, image, points, cs, ods, dpto: departmentCode, municipio: municipioCode};

        // Validate
        const errors = await validate(foundation, { validationError: { target: false, value: false }});

        if (errors.length > 0) {
            return res.status(400).json({message: errors});
        }

        try {
            await pool.query('INSERT INTO foundations set ?', [foundation]);
        } catch (err) {
            if(err.code == 'ER_DUP_ENTRY') {
                return res.status(400).json({message: 'Ya hay un usuario con este email o nit.'});
            }
            return res.status(409).json({message: err});
        }

        return res.status(200).json({message: 'Fundación creada correctamente'});
    }

    public async updateFoundation (req: Request, res: Response) {
        const { id } = req.params;
        const { name, description, points, cs, ods, departments, municipios } = req.body;
        const csArray: any[] = [];
        for (const i of cs) {
          csArray.push({
            code: i.code
          });
        }
        const csString = JSON.stringify(csArray);

        const odsArray: any[] = [];
        for (const i of ods) {
          odsArray.push({
            code: i.code
          });
        }
        const odsString = JSON.stringify(odsArray);

        if(!(name || description || points || cs || ods || departments || municipios)){
            return res.status(400).json({message: 'Formulario incompleto!'});
        }

        let foundation = new FoundationEdit();

        foundation = { name, description, points, cs: csString, ods: odsString, dpto: departments.code, municipio: municipios.code };

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

    public async donatePoints (req: Request, res: Response) {
        const { id } = req.params;
        const { userId, points } = req.body;

        if(!(userId && points)){
            return res.status(400).json({message: 'UserId y puntos son requeridos!'});
        }

        try {
            const foundationPoints = await pool.query('SELECT * from foundations WHERE id = ?', [id]);
            if(foundationPoints.length > 0) {
                const user = await pool.query('SELECT * from users WHERE id = ?', [userId]);
                if(user.length > 0) {
                    if(points > user[0].points) {
                        return res.status(400).json({message: 'No tienes los suficientes puntos para donar.'});
                    } else {
                        let donate = new Donate();
                        donate.points = points + foundationPoints[0].points;

                        const newPoints = user[0].points - points;

                        let history = new DonateHistory();
                        history.foundationId = id;
                        history.userId = userId;
                        history.points = points;
        
                        try {
                            await pool.query('INSERT INTO historydonate set ?', [history]);
                        } catch (err) {
                            return res.status(409).json({message: err});
                        }

                        try {
                            await pool.query('UPDATE users set ? WHERE id = ?', [{points: newPoints}, userId]);
                        } catch (err) {
                            return res.status(409).json({message: err});
                        }
        
                        try {
                            await pool.query('UPDATE foundations set ? WHERE id = ?', [donate, id]);
                        } catch (err) {
                            return res.status(409).json({message: err});
                        }
                        
                        return res.json({message: 'Operación exitosa', points: newPoints});
                    }
                    
                } else {
                    return res.status(404).json({message: 'Usuario no encontrado.'});
                }
            }
        } catch (err) {
            return res.status(409).json({message: err});
        }

        return res.status(404).json({message: 'Fundación no encontrada.'});
        
    }

    public async history (req: Request, res: Response) {
        const { id } = req.params;

        try {
            const history = await pool.query('SELECT historydonate.fec, foundations.name, historydonate.points FROM historydonate INNER JOIN foundations ON foundationId = foundations.id WHERE historydonate.userId = ?', [id]);
            if(history.length > 0) {
                return res.json({history});
            }
        } catch (err) {
            return res.status(409).json({message: err});
        }

        return res.status(404).json({message: 'Not Result'});
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

        return res.status(404).json({message: 'Fundación no encontrada.'});
    }

}

const foundationsController = new FoundationsController();
export default foundationsController;
