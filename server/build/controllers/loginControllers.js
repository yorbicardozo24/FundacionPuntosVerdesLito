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
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const database_1 = __importDefault(require("../database"));
const config_1 = __importDefault(require("../config/config"));
class LoginController {
    loginUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            if (!(email && password)) {
                return res.status(400).json({ message: 'Usarname & password are requeried!' });
            }
            const user = yield database_1.default.query('SELECT * FROM users WHERE email = ?', [email]);
            if (user.length > 0) {
                const userPassword = user[0].password;
                if (bcrypt_1.default.compareSync(password, userPassword)) {
                    // Creación del token
                    let token = jsonwebtoken_1.default.sign({
                        userId: user[0].id,
                        name: user[0].name,
                        email: user[0].email
                    }, config_1.default.jwtSecret, { expiresIn: '2h' });
                    return res.json({ message: 'OK', userId: user[0].id, userName: user[0].name, token, userPoints: user[0].points, role: user[0].role });
                }
            }
            return res.status(404).json({ message: 'Email or password incorrect' });
        });
    }
}
const loginController = new LoginController();
exports.default = loginController;
