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
const database_1 = __importDefault(require("../database"));
class DepartmentsController {
    getDepartments(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const departamentos = yield database_1.default.query('SELECT * FROM departamentos');
                if (departamentos.length > 0) {
                    const departments = [];
                    for (let i = 0; i < departamentos.length; i++) {
                        departments.push({
                            code: departamentos[i].id,
                            name: departamentos[i].nombre
                        });
                    }
                    return res.json({ departments });
                }
            }
            catch (e) {
                return res.status(404).json({ message: 'Not Result' });
            }
            res.status(404).json({ message: 'Not Result' });
        });
    }
    getMunicipios(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const municipios = yield database_1.default.query('SELECT * FROM municipios WHERE departamento_id = ?', [id]);
                if (municipios.length > 0) {
                    const municipalities = [];
                    for (let i = 0; i < municipios.length; i++) {
                        municipalities.push({
                            code: municipios[i].id,
                            name: municipios[i].nombre
                        });
                    }
                    return res.json({ municipalities });
                }
            }
            catch (e) {
                return res.status(404).json({ message: 'Not Result' });
            }
            res.status(404).json({ message: 'Not Result' });
        });
    }
}
const departmentsController = new DepartmentsController();
exports.default = departmentsController;
