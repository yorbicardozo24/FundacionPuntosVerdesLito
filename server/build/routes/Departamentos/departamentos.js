"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const departamentos_1 = __importDefault(require("../../controllers/departamentos"));
class Departamentos {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/api/departments', departamentos_1.default.getDepartments);
        this.router.get('/api/departments/:id', departamentos_1.default.getMunicipios);
    }
}
const departamentos = new Departamentos();
exports.default = departamentos.router;
