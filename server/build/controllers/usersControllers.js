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
                    return res.json({ users });
                }
            }
            catch (e) {
                return res.status(404).json({ message: 'Not Result' });
            }
            res.status(404).json({ message: 'Not Result' });
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
            catch (e) {
                return res.status(404).json({ message: 'Not Result' });
            }
            res.status(404).json({ message: 'Not Result' });
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
                return res.status(400).json(errors);
            }
            try {
                yield database_1.default.query('INSERT INTO users set ?', [user]);
            }
            catch (err) {
                if (err.code == 'ER_DUP_ENTRY') {
                    return res.status(409).json({ message: 'Email already exist' });
                }
                res.status(409).json({ err });
            }
            // All ok
            res.status(201).json({ message: 'Usuario creado correctamente' });
        });
    }
    putUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = new User_1.User();
            const { id } = req.params;
            const { name, nit, password, image, role, points, departments, city } = req.body;
            try {
                const userResult = yield database_1.default.query('SELECT * FROM users WHERE id = ?', [id]);
                user.name = name;
                user.nit = nit;
                user.password = bcrypt_1.default.hashSync(password, 10);
                user.image = image;
                user.role = role;
                user.points = points;
                user.departments = departments;
                user.city = city;
            }
            catch (err) {
                return res.status(404).json({ message: 'User not found' });
            }
            const errors = yield class_validator_1.validate(user, { validationError: { target: false, value: false } });
            if (errors.length > 0) {
                return res.status(400).json(errors);
            }
            // Try to save user
            try {
                const userUpdated = yield database_1.default.query('UPDATE users set ? WHERE id = ?', [user, id]);
                if (userUpdated.changedRows > 0) {
                    return res.status(201).json({ message: 'User updated' });
                }
            }
            catch (e) {
                return res.status(409).json({ e });
            }
        });
    }
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const user = yield database_1.default.query('DELETE FROM users WHERE id = ?', [id]);
                if (user.affectedRows > 0) {
                    return res.status(201).json({ message: 'User deleted' });
                }
            }
            catch (e) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(404).json({ message: 'User not found' });
        });
    }
}
const usersController = new UsersController();
exports.default = usersController;
