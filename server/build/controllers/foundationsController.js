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
const database_1 = __importDefault(require("../database"));
class FoundationsController {
    getFoundations(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const foundations = yield database_1.default.query('SELECT * FROM foundations');
                if (foundations.length > 0) {
                    return res.json({ foundations });
                }
            }
            catch (e) {
                return res.status(404).json({ message: 'Not Result' });
            }
            res.status(404).json({ message: 'Not Result' });
        });
    }
    createFoundation(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, description, image, points } = req.body;
            if (!(name && description && points)) {
                return res.status(400).json({ message: 'El nombre, descripción y puntos son requeridos!' });
            }
            let foundation = new Foundations_1.Foundation();
            foundation = { name, description, image, points };
            // Validate
            const errors = yield class_validator_1.validate(foundation, { validationError: { target: false, value: false } });
            if (errors.length > 0) {
                return res.status(400).json({ message: errors });
            }
            try {
                yield database_1.default.query('INSERT INTO foundations set ?', [foundation]);
            }
            catch (err) {
                return res.status(409).json({ message: err });
            }
            return res.status(200).json({ message: 'Fundación creada correctamente' });
        });
    }
    updateFoundation(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { name, description, image, points } = req.body;
            if (!(name && description && points)) {
                return res.status(400).json({ message: 'El nombre, descripción y puntos son requeridos!' });
            }
            let foundation = new Foundations_1.Foundation();
            foundation = { name, description, image, points };
            // Validate
            const errors = yield class_validator_1.validate(foundation, { validationError: { target: false, value: false } });
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
    deleteFoundation(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const foundation = yield database_1.default.query('DELETE FROM foundations WHERE id = ?', [id]);
                if (foundation.affectedRows > 0) {
                    return res.status(201).json({ message: 'Fundación eliminada correctamente.' });
                }
            }
            catch (err) {
                return res.status(404).json({ message: err });
            }
            res.status(404).json({ message: 'Fundación no encontrada.' });
        });
    }
}
const foundationsController = new FoundationsController();
exports.default = foundationsController;
