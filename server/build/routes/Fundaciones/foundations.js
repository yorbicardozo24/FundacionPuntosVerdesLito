"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const foundationsController_1 = __importDefault(require("../../controllers/foundationsController"));
class Foundations {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/api/departments', foundationsController_1.default.getFoundations);
    }
}
const foundations = new Foundations();
exports.default = foundations.router;
