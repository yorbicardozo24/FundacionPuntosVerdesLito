"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Foundations_1 = require("../models/Foundations");
const class_validator_1 = require("class-validator");
const nodemailer_1 = __importDefault(require("nodemailer"));
const database_1 = __importDefault(require("../database"));
class FoundationsController {
    getFoundations(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const foundations = yield database_1.default.query(`
                SELECT 
                    foundations.id,
                    foundations.name,
                    foundations.nit,
                    foundations.email,
                    foundations.ncontacto,
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
                WHERE foundations.status = 1
            `);
                if (foundations.length > 0) {
                    const foundationResult = [];
                    for (let i = 0; i < foundations.length; i++) {
                        let csJson = JSON.parse(foundations[i].cs);
                        let csResultByone = [];
                        for (let x = 0; x < csJson.length; x++) {
                            const csName = yield database_1.default.query('SELECT * FROM cs WHERE code = ?', [csJson[x].code]);
                            for (let r = 0; r < csName.length; r++) {
                                csResultByone.push({
                                    code: csName[r].code,
                                    name: csName[r].name
                                });
                            }
                        }
                        let odsJson = JSON.parse(foundations[i].ods);
                        let odsResultByone = [];
                        for (let x = 0; x < odsJson.length; x++) {
                            const odsName = yield database_1.default.query('SELECT * FROM ods WHERE code = ?', [odsJson[x].code]);
                            for (let r = 0; r < odsName.length; r++) {
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
                            ncontacto: foundations[i].ncontacto,
                            nit: foundations[i].nit,
                            description: foundations[i].description,
                            cs: csResultByone,
                            ods: odsResultByone,
                            departments: { code: foundations[i].dptoId, name: foundations[i].dpto },
                            municipios: { code: foundations[i].municipioId, name: foundations[i].municipio },
                            points: foundations[i].points,
                            image: foundations[i].image
                        });
                    }
                    return res.json({ message: foundationResult });
                }
            }
            catch (err) {
                return res.status(404).json({ message: err });
            }
            return res.status(404).json({ message: 'Not Result' });
        });
    }
    getFoundation(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const foundations = yield database_1.default.query(`
                SELECT 
                    foundations.id,
                    foundations.name,
                    foundations.nit,
                    foundations.email,
                    foundations.ncontacto,
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
                WHERE foundations.status = 1 AND foundations.id = ?
            `, [id]);
                if (foundations.length > 0) {
                    const foundationResult = [];
                    for (let i = 0; i < foundations.length; i++) {
                        let csJson = JSON.parse(foundations[i].cs);
                        let csResultByone = [];
                        for (let x = 0; x < csJson.length; x++) {
                            const csName = yield database_1.default.query('SELECT * FROM cs WHERE code = ?', [csJson[x].code]);
                            for (let r = 0; r < csName.length; r++) {
                                csResultByone.push({
                                    code: csName[r].code,
                                    name: csName[r].name
                                });
                            }
                        }
                        let odsJson = JSON.parse(foundations[i].ods);
                        let odsResultByone = [];
                        for (let x = 0; x < odsJson.length; x++) {
                            const odsName = yield database_1.default.query('SELECT * FROM ods WHERE code = ?', [odsJson[x].code]);
                            for (let r = 0; r < odsName.length; r++) {
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
                            ncontacto: foundations[i].ncontacto,
                            nit: foundations[i].nit,
                            description: foundations[i].description,
                            cs: csResultByone,
                            ods: odsResultByone,
                            departments: { code: foundations[i].dptoId, name: foundations[i].dpto },
                            municipios: { code: foundations[i].municipioId, name: foundations[i].municipio },
                            points: foundations[i].points,
                            image: foundations[i].image
                        });
                    }
                    return res.json({ message: foundationResult });
                }
            }
            catch (err) {
                return res.status(404).json({ message: err });
            }
            return res.status(404).json({ message: 'Not Result' });
        });
    }
    getOds(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ods = yield database_1.default.query('SELECT * FROM ods');
                if (ods.length > 0) {
                    return res.json({ message: ods });
                }
            }
            catch (err) {
                return res.status(400).json({ message: err });
            }
            return res.status(404).json({ message: 'Not Result' });
        });
    }
    getCs(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cs = yield database_1.default.query('SELECT * FROM cs');
                if (cs.length > 0) {
                    return res.json({ message: cs });
                }
            }
            catch (err) {
                return res.status(400).json({ message: err });
            }
            return res.status(404).json({ message: 'Not Result' });
        });
    }
    createFoundation(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, description, points, nit, email, ncontacto, cs, ods, departmentCode, municipioCode } = req.body;
            if (!(name && description && points && nit && email && cs && ods && departmentCode && municipioCode)) {
                return res.status(400).json({ message: 'Datos incompletos!' });
            }
            try {
                const user = yield database_1.default.query('SELECT * FROM users WHERE email = ? OR nit = ?', [email, nit]);
                if (user.length > 0) {
                    return res.status(400).json({ message: 'Ya hay un usuario con este email o nit.' });
                }
            }
            catch (err) {
                res.status(400).json({ message: err });
            }
            let foundation = new Foundations_1.Foundation();
            foundation = { name, nit, email, description, ncontacto, points, cs, ods, dpto: departmentCode, municipio: municipioCode, status: 1 };
            // Validate
            const errors = yield class_validator_1.validate(foundation, { validationError: { target: false, value: false } });
            if (errors.length > 0) {
                return res.status(400).json({ message: errors });
            }
            try {
                yield database_1.default.query('INSERT INTO foundations set ?', [foundation]);
            }
            catch (err) {
                if (err.code == 'ER_DUP_ENTRY') {
                    return res.status(400).json({ message: 'Ya hay un usuario con este email o nit.' });
                }
                return res.status(409).json({ message: err });
            }
            return res.status(200).json({ message: 'Fundación creada correctamente' });
        });
    }
    updateFoundation(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { name, description, email, ncontacto, points, cs, ods, departments, municipios, userId } = req.body;
            const csArray = [];
            for (const i of cs) {
                csArray.push({
                    code: i.code
                });
            }
            const csString = JSON.stringify(csArray);
            const odsArray = [];
            for (const i of ods) {
                odsArray.push({
                    code: i.code
                });
            }
            const odsString = JSON.stringify(odsArray);
            if (!(name && description && email && points && cs && ods && departments && municipios)) {
                return res.status(400).json({ message: 'Formulario incompleto!' });
            }
            try {
                const user = yield database_1.default.query('SELECT * FROM users WHERE email = ?', [email]);
                if (user.length > 0) {
                    return res.status(400).json({ message: 'Ya hay un usuario con este email.' });
                }
            }
            catch (err) {
                res.status(400).json({ message: err });
            }
            let foundation = new Foundations_1.FoundationEdit();
            foundation = { name, description, email, ncontacto, points, cs: csString, ods: odsString, dpto: departments.code, municipio: municipios.code };
            // Validate
            const errors = yield class_validator_1.validate(foundation, { validationError: { target: false, value: false } });
            try {
                const userFound = yield database_1.default.query('SELECT * FROM foundations WHERE id = ?', [id]);
                if (userFound.length > 0) {
                    const userFoundPoint = userFound[0].points;
                    const userFoundName = userFound[0].name;
                    const pointsHistory = points - userFoundPoint;
                    try {
                        const user = yield database_1.default.query('SELECT * FROM users WHERE id = ?', [userId]);
                        if (user.length > 0) {
                            const userEmail = user[0].email;
                            try {
                                yield database_1.default.query('INSERT INTO historyadmin set ?', [{ user: userEmail, foundation: userFoundName, points: pointsHistory }]);
                            }
                            catch (err) {
                                return res.status(409).json({ message: err });
                            }
                        }
                    }
                    catch (err) {
                        return res.status(409).json({ message: err });
                    }
                }
            }
            catch (err) {
                return res.status(409).json({ message: err });
            }
            if (errors.length > 0) {
                return res.status(400).json({ message: errors });
            }
            try {
                yield database_1.default.query('UPDATE foundations set ? WHERE id = ?', [foundation, id]);
            }
            catch (err) {
                return res.status(409).json({ message: err });
            }
            return res.status(200).json({ message: 'Fundación actualizada correctamente' });
        });
    }
    donatePoints(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { userId, points } = req.body;
            if (!(userId && points)) {
                return res.status(400).json({ message: 'UserId y puntos son requeridos!' });
            }
            try {
                const foundationPoints = yield database_1.default.query('SELECT * from foundations WHERE id = ?', [id]);
                if (foundationPoints.length > 0) {
                    const user = yield database_1.default.query('SELECT * from users WHERE id = ?', [userId]);
                    if (user.length > 0) {
                        if (points > user[0].points) {
                            return res.status(400).json({ message: 'No tienes los suficientes puntos para donar.' });
                        }
                        else {
                            let donate = new Foundations_1.Donate();
                            donate.points = points + foundationPoints[0].points;
                            const newPoints = user[0].points - points;
                            let history = new Foundations_1.DonateHistory();
                            history.foundationId = id;
                            history.userId = userId;
                            history.points = points;
                            try {
                                yield database_1.default.query('INSERT INTO historydonate set ?', [history]);
                            }
                            catch (err) {
                                return res.status(409).json({ message: err });
                            }
                            try {
                                yield database_1.default.query('UPDATE users set ? WHERE id = ?', [{ points: newPoints }, userId]);
                            }
                            catch (err) {
                                return res.status(409).json({ message: err });
                            }
                            try {
                                yield database_1.default.query('UPDATE foundations set ? WHERE id = ?', [donate, id]);
                            }
                            catch (err) {
                                return res.status(409).json({ message: err });
                            }
                            return res.json({ message: 'Operación exitosa', points: newPoints });
                        }
                    }
                    else {
                        return res.status(404).json({ message: 'Usuario no encontrado.' });
                    }
                }
            }
            catch (err) {
                return res.status(409).json({ message: err });
            }
            return res.status(404).json({ message: 'Fundación no encontrada.' });
        });
    }
    history(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const history = yield database_1.default.query('SELECT historydonate.fec, foundations.name, historydonate.points FROM historydonate INNER JOIN foundations ON foundationId = foundations.id WHERE historydonate.userId = ?', [id]);
                if (history.length > 0) {
                    return res.json({ history });
                }
            }
            catch (err) {
                return res.status(409).json({ message: err });
            }
            return res.status(404).json({ message: 'Not Result' });
        });
    }
    historyAdmin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const history = yield database_1.default.query('SELECT * FROM historyadmin');
                if (history.length > 0) {
                    return res.json({ history });
                }
            }
            catch (err) {
                return res.status(409).json({ message: err });
            }
            return res.status(404).json({ message: 'Not Result' });
        });
    }
    report(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const history = yield database_1.default.query(`
                SELECT
                    historydonate.fec,
                    users.name as name,
                    users.nit as nit,
                    foundations.name as foundation,
                    historydonate.points
                FROM historydonate
                    INNER JOIN users ON userId = users.id
                    INNER JOIN foundations ON foundationId = foundations.id
            `);
                if (history.length > 0) {
                    return res.json({ history });
                }
            }
            catch (err) {
                return res.status(409).json({ message: err });
            }
            return res.status(404).json({ message: 'Not Result' });
        });
    }
    deleteFoundation(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const foundation = yield database_1.default.query('UPDATE foundations set ? WHERE id = ?', [{ status: 0 }, id]);
                if (foundation.affectedRows > 0) {
                    return res.status(201).json({ message: 'Fundación eliminada correctamente.' });
                }
            }
            catch (err) {
                return res.status(404).json({ message: err });
            }
            return res.status(404).json({ message: 'Fundación no encontrada.' });
        });
    }
    deletePoints(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield database_1.default.query('UPDATE users set ? WHERE role = ?', [{ points: 0 }, 'USER']);
                return res.status(201).json({ message: 'Puntos eliminados correctamente' });
            }
            catch (err) {
                return res.status(400).json({ message: err });
            }
        });
    }
    deletePointsByone(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                yield database_1.default.query('UPDATE foundations set ? WHERE id = ?', [{ points: 0 }, id]);
                return res.status(201).json({ message: 'Puntos eliminados correctamente' });
            }
            catch (err) {
                return res.status(400).json({ message: err });
            }
        });
    }
    sendPoints(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email } = req.body;
            try {
                const foundation = yield database_1.default.query('SELECT * FROM foundations WHERE email = ?', [email]);
                if (foundation.length > 0) {
                    const points = foundation[0].points.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                    let contentHTML = `
                <table width="100%" align="center" border="0" cellspacing="0" cellpadding="0" style="max-width:768px">
                    <tbody>
                        <tr>
                            <td>
                                <table width="100%" align="center" border="0" cellspacing="0" cellpadding="0" style="max-width:670px;border:solid 1px #dcdcdc">
                                    <tbody style="background-image: url(https://www.fundacionpuntosverdes.com/wp-content/uploads/2020/10/Asset-1.png);">
                                        <tr>
                                            <td style="text-align:center">
                                                <img src="https://www.fundacionpuntosverdes.com/wp-content/uploads/2020/10/e-mail-de-puntos-logo.png" style="width:100%;max-width:635px;padding:20px 0px 0px;border:0" alt="Pago exitoso" class="CToWUd">
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="padding:0px 10%">
                                                <table width="100%" align="center" cellspacing="0" cellpadding="0" border="0" style="max-width:500px;font-family:Lucida Sans Unicode,Lucida Grande,sans-serif;font-size:16px;line-height:1.3;color:#606060;">
                                                    <tbody>
                                                        <tr>
                                                            <td width="100%" style="padding-top: 25px;">
                                                                <h1>¡Hola!</h1>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td width="100%" style="padding:0px 0px 2px"> Gracias por pertenecer a los amigos del planeta. </td>
                                                        </tr>
                                                        <tr>
                                                            <td width="100%" style="padding:0px 0px 15px"> Tus puntos hasta hoy son: <span style="color: #4AC440"> ${points} Puntos verdes</span></td>
                                                        </tr>
                                                        <tr>
                                                            <td width="100%" style="padding:30px 0px 30px;"> Recuerda que puedes usar tus puntos para ayudar a diferentes causas sociales y ambientales de Colombia.</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                        <tr style="background-image: url(https://www.fundacionpuntosverdes.com/wp-content/uploads/2020/10/e-mail-de-puntos-footer-1.png);width: 100%;height: 94px;background-size: contain;background-position: right;background-repeat: no-repeat;">
                                            <td style="color: #ffffff; display: block; text-align: center; margin-top: 47px; font-family:Lucida Sans Unicode,Lucida Grande,sans-serif;">Copyrigth © 2020. All rigths Reserved. Fundación Puntos Verdes</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
                `;
                    const transporter = nodemailer_1.default.createTransport({
                        service: 'gmail',
                        auth: {
                            user: 'apppuntosverdes@gmail.com',
                            pass: 'Puntosverdesapp'
                        }
                    });
                    const mailOptions = {
                        from: "'App Puntos Verdes' <apppuntosverdes@litoltda.com>",
                        to: email,
                        subject: 'Puntos Verdes',
                        html: contentHTML
                    };
                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            return res.status(400).json({ message: error });
                        }
                        else {
                            return res.status(201).json({ message: 'Puntos enviados al email correctamente' });
                        }
                    });
                }
                else {
                    return res.status(404).json({ message: 'Email no encontrado' });
                }
            }
            catch (err) {
                return res.status(409).json({ message: err });
            }
        });
    }
}
const foundationsController = new FoundationsController();
exports.default = foundationsController;
