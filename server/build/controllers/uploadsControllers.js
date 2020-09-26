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
const path_1 = __importDefault(require("path"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const database_1 = __importDefault(require("../database"));
const xlsx = require('node-xlsx');
class UploadsController {
    uploadExcel(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const filePath = path_1.default.resolve(req.file.path);
            const obj = xlsx.parse(filePath);
            let name = '';
            let nit = '';
            let email = '';
            let points = 0;
            let password = '';
            let role = 'USER';
            let status = false;
            for (let i = 5; i < obj[0].data.length; i++) {
                nit = obj[0].data[i][4];
                if (nit !== undefined) {
                    nit = nit.trim(); //Elimino los espacios
                    name = obj[0].data[i][5];
                    email = obj[0].data[i][12];
                    if (email !== undefined) {
                        email = email.trim();
                    }
                    else {
                        email = nit;
                    }
                    password = nit;
                    const salt = yield bcrypt_1.default.genSalt(10);
                    password = yield bcrypt_1.default.hash(password, salt);
                    points = Math.trunc(obj[0].data[i][11]);
                    try {
                        let user = yield database_1.default.query('SELECT * FROM users WHERE nit = ?', [nit]);
                        if (user.length > 0) {
                            points = user[0].points + points;
                            try {
                                yield database_1.default.query('UPDATE users set ? WHERE nit = ?', [{ points }, nit]);
                            }
                            catch (err) {
                                return res.status(404).json({ message: err });
                            }
                        }
                        else {
                            try {
                                yield database_1.default.query('INSERT INTO users set ?', [{ name, nit, email, password, role, points, status }]);
                            }
                            catch (err) {
                                return res.status(404).json({ message: err });
                            }
                        }
                    }
                    catch (err) {
                        return res.status(404).json({ message: err });
                    }
                }
            }
            return res.json({ message: 'Fichero subido correctamente' });
        });
    }
    uploadImage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const originalName = req.file.filename;
            // const filePath = 'http://localhost:3000/build/public/uploads/' + originalName;
            // const filePath = path.resolve(req.file.path);
            // try {
            //     await pool.query('UPDATE users set ? WHERE id = ?', [{image: originalName}, id]);
            // } catch (err) {
            //     return res.status(404).json({message: err});
            // }
            return res.status(200).json({ message: 'OK' });
        });
    }
}
const uploadsController = new UploadsController();
exports.default = uploadsController;
