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
const bcrypt_1 = __importDefault(require("bcrypt"));
const database_1 = __importDefault(require("../database"));
class UsersController {
    listUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield database_1.default.query('SELECT * FROM users');
                if (users.length > 0) {
                    return res.json({ message: users });
                }
            }
            catch (err) {
                return res.status(404).json({ message: err });
            }
            res.status(404).json({ message: 'No se encontraron resultados.' });
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
                    });
                }
            }
            catch (err) {
                return res.status(404).json({ message: err });
            }
            res.status(404).json({ message: 'Usuario no encontrado.' });
        });
    }
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, nit, email, password, image, role, points, departments, city } = req.body;
            let user = new User_1.User();
            user.name = name;
            user.nit = nit;
            user.email = email;
            const salt = yield bcrypt_1.default.genSalt(10);
            const hashedPassword = yield bcrypt_1.default.hash(password, salt);
            user.password = hashedPassword;
            user.image = image;
            user.role = role;
            user.points = points;
            user.departments = departments;
            user.city = city;
            // Validate
            const errors = yield class_validator_1.validate(user, { validationError: { target: false, value: false } });
            if (errors.length > 0) {
                return res.status(400).json({ message: errors });
            }
            try {
                yield database_1.default.query('INSERT INTO users set ?', [user]);
            }
            catch (err) {
                if (err.code == 'ER_DUP_ENTRY') {
                    return res.status(409).json({ message: 'Ya hay un usuario con este email.' });
                }
                res.status(409).json({ message: err });
            }
            // All ok
            res.status(201).json({ message: 'Usuario creado correctamente' });
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
                res.status(400).json({ message: 'La contraseña actual y la nueva son requeridas!' });
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
            return res.status(409).json({ message: 'Usuario no encontrado.' });
        });
    }
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const user = yield database_1.default.query('DELETE FROM users WHERE id = ?', [id]);
                if (user.affectedRows > 0) {
                    return res.status(201).json({ message: 'Usuario eliminado correctamente.' });
                }
            }
            catch (err) {
                return res.status(404).json({ message: err });
            }
            res.status(404).json({ message: 'Usuario no encontrado.' });
        });
    }
}
const usersController = new UsersController();
exports.default = usersController;
