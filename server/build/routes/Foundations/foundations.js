"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const foundationsController_1 = __importDefault(require("../../controllers/foundationsController"));
const jwt_1 = require("../../middlewares/jwt");
const role_1 = require("../../middlewares/role");
const multer_1 = __importDefault(require("../../config/multer"));
const multer_2 = __importDefault(require("multer"));
const uploader = multer_2.default({
    storage: multer_1.default
}).single('file');
class Foundations {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/api/foundations', [jwt_1.checkJwt], foundationsController_1.default.getFoundations);
        this.router.get('/api/history/:id', [jwt_1.checkJwt], foundationsController_1.default.history);
        this.router.post('/api/foundations', uploader, [jwt_1.checkJwt, role_1.checkRole('ADMIN')], foundationsController_1.default.createFoundation);
        this.router.post('/api/foundations/donate/:id', [jwt_1.checkJwt], foundationsController_1.default.donatePoints);
        this.router.put('/api/foundations/:id', [jwt_1.checkJwt, role_1.checkRole('ADMIN')], foundationsController_1.default.updateFoundation);
        this.router.delete('/api/foundations/:id', [jwt_1.checkJwt, role_1.checkRole('ADMIN')], foundationsController_1.default.deleteFoundation);
    }
}
const foundations = new Foundations();
exports.default = foundations.router;
