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
const class_validator_1 = require("class-validator");
const User_1 = require("../models/User");
const nodemailer_1 = __importDefault(require("nodemailer"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const database_1 = __importDefault(require("../database"));
const getenv = require('getenv');
const cloudinary = require("cloudinary").v2;
// cloudinary configuration
cloudinary.config({
    cloud_name: 'dviodignb',
    api_key: '457548693686971',
    api_secret: 'hOF30ijSIgivu1raTOi-Np_yhmQ'
});
class UsersController {
    listUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield database_1.default.query('SELECT * FROM users WHERE users.role = ? AND users.deleted = ?', ['USER', 0]);
                if (users.length > 0) {
                    const usersResults = [];
                    let status = false;
                    for (let i = 0; i < users.length; i++) {
                        if (users[i].status === 1) {
                            status = true;
                        }
                        else {
                            status = false;
                        }
                        usersResults.push({
                            id: users[i].id,
                            name: users[i].name,
                            email: users[i].email,
                            nit: users[i].nit,
                            departments: { code: users[i].departmentId, name: users[i].departmentName },
                            municipios: { code: users[i].municipioCode, name: users[i].municipioName },
                            points: users[i].points,
                            ncontacto: users[i].ncontacto,
                            role: users[i].role,
                            rut: users[i].rut,
                            status: status
                        });
                    }
                    return res.json({ message: usersResults });
                }
            }
            catch (err) {
                return res.status(400).json({ message: err });
            }
            return res.status(400).json({ message: 'No se encontraron resultados.' });
        });
    }
    listAdmins(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield database_1.default.query('SELECT * FROM users WHERE users.role = ? AND users.deleted = ?', ['ADMIN', 0]);
                if (users.length > 0) {
                    const usersResults = [];
                    let status = false;
                    for (let i = 0; i < users.length; i++) {
                        if (users[i].status === 1) {
                            status = true;
                        }
                        else {
                            status = false;
                        }
                        usersResults.push({
                            id: users[i].id,
                            name: users[i].name,
                            email: users[i].email,
                            nit: users[i].nit,
                            departments: { code: users[i].departmentId, name: users[i].departmentName },
                            municipios: { code: users[i].municipioCode, name: users[i].municipioName },
                            points: users[i].points,
                            ncontacto: users[i].ncontacto,
                            role: users[i].role,
                            rut: users[i].rut,
                            status: status
                        });
                    }
                    return res.json({ message: usersResults });
                }
            }
            catch (err) {
                return res.status(400).json({ message: err });
            }
            return res.status(400).json({ message: 'No se encontraron resultados.' });
        });
    }
    getUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const user = yield database_1.default.query('SELECT * FROM users WHERE id = ?', [id]);
                if (user.length > 0) {
                    return res.json({
                        name: user[0].name,
                        nit: user[0].nit,
                        email: user[0].email,
                        departments: { code: user[0].departmentId, name: user[0].departmentName },
                        municipios: { code: user[0].municipioCode, name: user[0].municipioName },
                        points: user[0].points,
                        image: user[0].image
                    });
                }
            }
            catch (err) {
                return res.status(400).json({ message: err });
            }
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        });
    }
    registerUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, nit, dv, email, password, tel, departmentCode, departmentName, municipioCode, municipioName } = req.body;
            let rut = req.file.path;
            if (!(name || nit || dv || email || password || tel || departmentCode || municipioCode || rut)) {
                return res.status(400).json({ message: 'Datos incompletos!' });
            }
            const nitCompleto = nit + '-' + dv;
            const salt = yield bcrypt_1.default.genSalt(10);
            const hashedPassword = yield bcrypt_1.default.hash(password, salt);
            try {
                const res = yield cloudinary.uploader.upload(rut);
                rut = res.secure_url;
            }
            catch (err) {
                return res.status(400).json({ message: err });
            }
            try {
                const user = yield database_1.default.query('SELECT * FROM users WHERE nit = ?', [nitCompleto]);
                if (user.length > 0) {
                    if (user[0].status === 0) {
                        try {
                            yield database_1.default.query('UPDATE users set ? WHERE id = ?', [{
                                    name,
                                    email,
                                    ncontacto: tel,
                                    password: hashedPassword,
                                    departmentId: departmentCode,
                                    departmentName: departmentName,
                                    municipioCode: municipioCode,
                                    rut,
                                    status: 1,
                                    municipioName: municipioName,
                                }, user[0].id]);
                        }
                        catch (err) {
                            if (err.code == 'ER_DUP_ENTRY') {
                                return res.status(400).json({ message: 'Ya hay un usuario con este email.' });
                            }
                            res.status(400).json({ message: err });
                        }
                        return res.status(200).json({ message: 'Usuario actualizado y activado correctamente' });
                    }
                    else {
                        return res.status(400).json({ message: 'Usuario ya se encuentra registrado y activo' });
                    }
                }
            }
            catch (err) {
                return res.status(400).json({ message: err });
            }
            try {
                yield database_1.default.query('INSERT INTO users set ?', [{
                        name,
                        nit: nitCompleto,
                        email,
                        password: hashedPassword,
                        role: 'USER',
                        status: 1,
                        departmentId: departmentCode,
                        departmentName: departmentName,
                        municipioCode: municipioCode,
                        municipioName: municipioName,
                        points: 0,
                        rut,
                        ncontacto: tel
                    }]);
            }
            catch (err) {
                if (err.code == 'ER_DUP_ENTRY') {
                    return res.status(400).json({ message: 'Ya hay un usuario con este email.' });
                }
                res.status(400).json({ message: err });
            }
            return res.status(200).json({ message: 'Usuario registrado y activo correctamente.' });
        });
    }
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { name, nit, email, ncontacto, password, role, points, departments, municipios } = req.body;
            if (points === undefined || points === null) {
                points = 0;
            }
            let user = new User_1.User();
            user.name = name;
            user.nit = nit;
            user.email = email;
            user.ncontacto = ncontacto;
            if (!password) {
                const salt = yield bcrypt_1.default.genSalt(10);
                const hashedPassword = yield bcrypt_1.default.hash(nit, salt);
                user.password = hashedPassword;
            }
            else {
                const salt = yield bcrypt_1.default.genSalt(10);
                const hashedPassword = yield bcrypt_1.default.hash(password, salt);
                user.password = hashedPassword;
            }
            user.role = role;
            user.points = points;
            user.departmentId = departments.code;
            user.departmentName = departments.name;
            user.municipioCode = municipios.code;
            user.municipioName = municipios.name;
            // Validate
            const errors = yield class_validator_1.validate(user, { validationError: { target: false, value: false } });
            if (errors.length > 0) {
                return res.status(400).json({ message: errors });
            }
            try {
                const foundation = yield database_1.default.query('SELECT * FROM foundations WHERE email = ? OR nit = ?', [email, nit]);
                if (foundation.length > 0) {
                    return res.status(400).json({ message: 'Ya hay un usuario con este email o nit.' });
                }
            }
            catch (err) {
                res.status(400).json({ message: err });
            }
            try {
                yield database_1.default.query('INSERT INTO users set ?', [user]);
            }
            catch (err) {
                if (err.code == 'ER_DUP_ENTRY') {
                    return res.status(400).json({ message: 'Ya hay un usuario con este email.' });
                }
                res.status(400).json({ message: err });
            }
            // All ok
            return res.status(201).json({ message: 'Usuario creado correctamente' });
        });
    }
    patchUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { name, nit, email, ncontacto, role, points, departments, municipios, userId } = req.body;
            let user = new User_1.User();
            user.name = name;
            user.nit = nit;
            user.email = email;
            user.ncontacto = ncontacto;
            user.role = role;
            user.points = points;
            user.departmentId = departments.code;
            user.departmentName = departments.name;
            user.municipioCode = municipios.code;
            user.municipioName = municipios.name;
            // Validate
            const errors = yield class_validator_1.validate(user, { validationError: { target: false, value: false } });
            if (errors.length > 0) {
                return res.status(400).json({ message: errors });
            }
            try {
                const foundation = yield database_1.default.query('SELECT * FROM foundations WHERE email = ? OR nit = ?', [email, nit]);
                if (foundation.length > 0) {
                    return res.status(400).json({ message: 'Ya hay un usuario con este email o nit.' });
                }
            }
            catch (err) {
                return res.status(400).json({ message: err });
            }
            try {
                const userFound = yield database_1.default.query('SELECT * FROM users WHERE id = ?', [id]);
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
            try {
                yield database_1.default.query('UPDATE users set ? WHERE id = ?', [user, id]);
            }
            catch (err) {
                if (err.code == 'ER_DUP_ENTRY') {
                    return res.status(409).json({ message: 'Ya hay un usuario con este email.' });
                }
                res.status(409).json({ message: err });
            }
            // All ok
            return res.status(201).json({ message: 'Usuario actualizado correctamente' });
        });
    }
    changeStatus(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { status } = req.body;
            try {
                yield database_1.default.query('UPDATE users set ? WHERE id = ?', [{ status }, id]);
            }
            catch (err) {
                return res.status(404).json({ message: err });
            }
            return res.status(201).json({ message: 'Usuario actualizado correctamente' });
        });
    }
    putUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = new User_1.UserData();
            const { id } = req.params;
            const { name, departments, municipios } = req.body;
            // Try to save user
            try {
                user.name = name;
                user.departmentId = departments.code;
                user.departmentName = departments.name;
                user.municipioCode = municipios.code;
                user.municipioName = municipios.name;
                const errors = yield class_validator_1.validate(user, { validationError: { target: false, value: false } });
                if (errors.length > 0) {
                    return res.status(400).json(errors);
                }
                const userUpdated = yield database_1.default.query('UPDATE users set ? WHERE id = ?', [user, id]);
                if (userUpdated.changedRows > 0) {
                    return res.status(201).json({ message: 'Usuario actualizado correctamente.' });
                }
            }
            catch (err) {
                return res.status(409).json({ message: err });
            }
            return res.status(409).json({ message: 'Usuario no encontrado.' });
        });
    }
    changePasswordUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let passwordData = new User_1.PasswordData();
            const { id } = req.params;
            const { oldpassword, newPassword } = req.body;
            if (!(oldpassword && newPassword)) {
                return res.status(400).json({ message: 'La contraseña actual y la nueva son requeridas!' });
            }
            try {
                const user = yield database_1.default.query('SELECT * FROM users WHERE id = ?', [id]);
                if (user.length > 0) {
                    const userPassword = user[0].password;
                    if (bcrypt_1.default.compareSync(oldpassword, userPassword)) {
                        const salt = yield bcrypt_1.default.genSalt(10);
                        passwordData.password = yield bcrypt_1.default.hash(newPassword, salt);
                        const passwordUpdated = yield database_1.default.query('UPDATE users set ? WHERE id = ?', [passwordData, id]);
                        if (passwordUpdated.changedRows > 0) {
                            return res.status(201).json({ message: 'Contraseña actualizada correctamente.' });
                        }
                    }
                    else {
                        return res.status(400).json({ message: 'Contraseña actual incorrecta.' });
                    }
                }
            }
            catch (err) {
                return res.status(409).json({ message: err });
            }
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        });
    }
    forgetPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email } = req.body;
            if (!(email)) {
                return res.status(400).json({ message: 'Email es requerido' });
            }
            try {
                const user = yield database_1.default.query('SELECT email FROM users WHERE email = ?', [email]);
                if (user.length > 0) {
                    const nRandom = Math.round(Math.random() * 999999);
                    try {
                        yield database_1.default.query('INSERT INTO forgetpassword set ?', [{ email, code: nRandom }]);
                    }
                    catch (err) {
                        return res.status(409).json({ message: err });
                    }
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
                                                        <td width="100%" style="padding:0px 0px 20px; text-align: center;"> ¿Olvidaste tu contraseña? copia el siguiente código para continuar: </td>
                                                    </tr>
                                                    <tr>
                                                        <td width="100%" style="color: #4AC440; text-align: center;"> <h2> ${nRandom} </h2></td>
                                                    </tr>
                                                    <tr>
                                                        <td width="100%" style="padding:30px 0px 20px; text-align: center;"> Si no has solicitado cambiar la contraseña por favor omite este mensaje. </td>
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
                            user: getenv('gmailemail'),
                            pass: getenv('gmailPassword')
                        }
                    });
                    const mailOptions = {
                        from: "'App Puntos Verdes' <apppuntosverdes@litoltda.com>",
                        to: email,
                        subject: 'Puntos Verdes - Cambio de contraseña',
                        html: contentHTML
                    };
                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            return res.status(400).json({ message: error });
                        }
                        else {
                            return res.status(201).json({ message: 'Código enviado correctamente.' });
                        }
                    });
                }
                else {
                    return res.status(404).json({ message: 'Usuario no encontrado.' });
                }
            }
            catch (err) {
                return res.status(409).json({ message: err });
            }
        });
    }
    forgetPasswordCode(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { code, email } = req.body;
            if (!(code || email)) {
                return res.status(400).json({ message: 'Código es requerido' });
            }
            try {
                const codeResult = yield database_1.default.query('SELECT * FROM forgetpassword WHERE email = ? AND code = ?', [email, code]);
                if (codeResult.length > 0) {
                    return res.status(201).json({ message: 'Código correcto.' });
                }
                else {
                    return res.status(400).json({ message: 'Código incorrecto.' });
                }
            }
            catch (err) {
                return res.status(409).json({ message: err });
            }
        });
    }
    changeForgetPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { code, email, password } = req.body;
            if (!(code || email || password)) {
                return res.status(400).json({ message: 'Datos inválidos.' });
            }
            try {
                yield database_1.default.query('DELETE FROM forgetpassword WHERE email = ? AND code = ?', [email, code]);
            }
            catch (err) {
                return res.status(409).json({ message: err });
            }
            try {
                const salt = yield bcrypt_1.default.genSalt(10);
                const hashedPassword = yield bcrypt_1.default.hash(password, salt);
                const user = yield database_1.default.query('UPDATE users set ? WHERE email = ?', [{ password: hashedPassword }, email]);
                if (user.changedRows > 0) {
                    return res.status(201).json({ message: 'Contraseña actualizada correctamente.' });
                }
            }
            catch (err) {
                return res.status(409).json({ message: err });
            }
        });
    }
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const user = yield database_1.default.query('UPDATE users SET ? WHERE id = ?', [{ deleted: 1 }, id]);
                if (user.changedRows > 0) {
                    return res.status(201).json({ message: 'Usuario eliminado correctamente.' });
                }
            }
            catch (err) {
                return res.status(404).json({ message: err });
            }
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        });
    }
}
const usersController = new UsersController();
exports.default = usersController;
